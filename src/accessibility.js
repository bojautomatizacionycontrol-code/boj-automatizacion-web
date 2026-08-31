const FOCUSABLE_SELECTOR = [
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "details > summary:first-of-type",
  "[contenteditable='true']",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

let scrollLockCount = 0;
let scrollLockRestore = null;
const inertState = new WeakMap();
const focusLayerStack = [];

export function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

export function getFocusableElements(container) {
  if (!container) return [];
  return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter((element) => {
    if (element.closest("[inert], [aria-hidden='true']")) return false;
    const style = window.getComputedStyle(element);
    return style.visibility !== "hidden" && style.display !== "none" && element.getClientRects().length > 0;
  });
}

export function handleEscapeKey(event, onEscape) {
  if (event.key !== "Escape") return false;
  event.preventDefault();
  onEscape?.();
  return true;
}

export function trapTabKey(event, container, fallback = container) {
  if (event.defaultPrevented || event.key !== "Tab") return false;

  const focusable = getFocusableElements(container);
  if (!focusable.length) {
    event.preventDefault();
    fallback?.focus({ preventScroll: true });
    return true;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus({ preventScroll: true });
    return true;
  }
  if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus({ preventScroll: true });
    return true;
  }
  return false;
}

export function lockPageScroll() {
  scrollLockCount += 1;
  if (scrollLockCount > 1) {
    let released = false;
    return () => {
      if (released) return;
      released = true;
      scrollLockCount -= 1;
      if (scrollLockCount === 0) scrollLockRestore?.();
    };
  }

  const body = document.body;
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;
  const scrollbarWidth = Math.max(0, window.innerWidth - document.documentElement.clientWidth);
  const previous = {
    overflow: body.style.overflow,
    position: body.style.position,
    top: body.style.top,
    left: body.style.left,
    right: body.style.right,
    width: body.style.width,
    paddingRight: body.style.paddingRight,
  };

  body.dataset.scrollLocked = "true";
  body.style.overflow = "hidden";
  body.style.position = "fixed";
  body.style.top = `-${scrollY}px`;
  body.style.left = `-${scrollX}px`;
  body.style.right = "0";
  body.style.width = "100%";
  if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

  scrollLockRestore = () => {
    Object.assign(body.style, previous);
    delete body.dataset.scrollLocked;
    window.scrollTo({ left: scrollX, top: scrollY, behavior: "auto" });
    scrollLockRestore = null;
  };

  let released = false;
  return () => {
    if (released) return;
    released = true;
    scrollLockCount -= 1;
    if (scrollLockCount === 0) scrollLockRestore?.();
  };
}

export function setElementsInert(elements) {
  const targets = elements.filter(Boolean);

  targets.forEach((element) => {
    const current = inertState.get(element);
    if (current) {
      current.count += 1;
      return;
    }
    inertState.set(element, {
      count: 1,
      inert: element.inert,
      ariaHidden: element.getAttribute("aria-hidden"),
    });
    element.inert = true;
    element.setAttribute("aria-hidden", "true");
  });

  let released = false;
  return () => {
    if (released) return;
    released = true;
    targets.forEach((element) => {
      const state = inertState.get(element);
      if (!state) return;
      state.count -= 1;
      if (state.count > 0) return;
      element.inert = state.inert;
      if (state.ariaHidden === null) element.removeAttribute("aria-hidden");
      else element.setAttribute("aria-hidden", state.ariaHidden);
      inertState.delete(element);
    });
  };
}

export function createFocusLayer() {
  const token = Symbol("focus-layer");
  focusLayerStack.push(token);
  let released = false;
  return {
    isTop: () => focusLayerStack.at(-1) === token,
    release: () => {
      if (released) return;
      released = true;
      const index = focusLayerStack.indexOf(token);
      if (index >= 0) focusLayerStack.splice(index, 1);
    },
  };
}

export function restoreFocusFromLayer(focusLayer, target, { requireVisible = false } = {}) {
  const shouldRestore = focusLayer.isTop();
  focusLayer.release();
  const targetIsVisible = !requireVisible || (target?.getClientRects?.().length ?? 0) > 0;
  if (!shouldRestore || !target?.isConnected || !targetIsVisible) return false;
  target.focus({ preventScroll: true });
  return true;
}

export function focusPageTarget(target, { updateHistory = false } = {}) {
  if (!target) return false;
  let temporaryTabIndex = false;
  if (!target.matches("a, button, input, select, textarea, summary, [tabindex]")) {
    target.setAttribute("tabindex", "-1");
    temporaryTabIndex = true;
  }
  target.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
  target.focus({ preventScroll: true });
  if (temporaryTabIndex) {
    target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
  }
  if (updateHistory && target.id) {
    const hash = `#${encodeURIComponent(target.id)}`;
    if (window.location.hash !== hash) window.history.pushState(null, "", hash);
  }
  return true;
}

export function focusHashTarget(hash, options) {
  if (!hash?.startsWith("#") || hash.length === 1) return false;
  let id;
  try {
    id = decodeURIComponent(hash.slice(1));
  } catch {
    return false;
  }
  return focusPageTarget(document.getElementById(id), options);
}
