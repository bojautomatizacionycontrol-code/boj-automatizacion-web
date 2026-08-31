import assert from "node:assert/strict";
import test from "node:test";

import {
  createFocusLayer,
  focusHashTarget,
  focusPageTarget,
  handleEscapeKey,
  lockPageScroll,
  restoreFocusFromLayer,
  setElementsInert,
  trapTabKey,
} from "../src/accessibility.js";

const originalWindow = globalThis.window;
const originalDocument = globalThis.document;

function focusable(name, { visible = true } = {}) {
  return {
    name,
    isConnected: true,
    closest: () => null,
    getClientRects: () => visible ? [{}] : [],
    focus(options) {
      document.activeElement = this;
      this.focusOptions = options;
    },
  };
}

function keyboardEvent(key, shiftKey = false) {
  return {
    key,
    shiftKey,
    defaultPrevented: false,
    preventDefault() {
      this.defaultPrevented = true;
    },
  };
}

function installDom() {
  const scrollCalls = [];
  globalThis.document = {
    activeElement: null,
    body: {
      dataset: {},
      style: {
        overflow: "auto",
        position: "",
        top: "",
        left: "",
        right: "",
        width: "",
        paddingRight: "2px",
      },
    },
    documentElement: { clientWidth: 980 },
    getElementById: () => null,
  };
  globalThis.window = {
    scrollX: 12,
    scrollY: 34,
    innerWidth: 1000,
    location: { hash: "" },
    history: {
      pushState(_state, _title, hash) {
        window.location.hash = hash;
      },
    },
    getComputedStyle: () => ({ visibility: "visible", display: "block" }),
    matchMedia: () => ({ matches: false }),
    scrollTo: (options) => scrollCalls.push(options),
  };
  return scrollCalls;
}

test.after(() => {
  globalThis.window = originalWindow;
  globalThis.document = originalDocument;
});

test("Tab y Shift+Tab se envuelven dentro del contenedor", () => {
  installDom();
  const first = focusable("first");
  const last = focusable("last");
  const container = { querySelectorAll: () => [first, last] };

  document.activeElement = last;
  const forward = keyboardEvent("Tab");
  assert.equal(trapTabKey(forward, container), true);
  assert.equal(forward.defaultPrevented, true);
  assert.equal(document.activeElement, first);

  const backward = keyboardEvent("Tab", true);
  assert.equal(trapTabKey(backward, container), true);
  assert.equal(backward.defaultPrevented, true);
  assert.equal(document.activeElement, last);
});

test("Escape ejecuta el cierre y evita la acción por defecto", () => {
  installDom();
  let closes = 0;
  const escape = keyboardEvent("Escape");
  assert.equal(handleEscapeKey(escape, () => { closes += 1; }), true);
  assert.equal(escape.defaultPrevented, true);
  assert.equal(closes, 1);
  assert.equal(handleEscapeKey(keyboardEvent("Enter"), () => { closes += 1; }), false);
  assert.equal(closes, 1);
});

test("scroll lock anidado restaura estilos y posición una sola vez", () => {
  const scrollCalls = installDom();
  const releaseOuter = lockPageScroll();
  const releaseInner = lockPageScroll();
  assert.equal(document.body.style.position, "fixed");
  assert.equal(document.body.style.top, "-34px");
  assert.equal(document.body.style.paddingRight, "20px");
  assert.equal(document.body.dataset.scrollLocked, "true");

  releaseOuter();
  assert.equal(document.body.style.position, "fixed");
  releaseInner();
  assert.equal(document.body.style.position, "");
  assert.equal(document.body.style.overflow, "auto");
  assert.equal(document.body.style.paddingRight, "2px");
  assert.equal("scrollLocked" in document.body.dataset, false);
  assert.deepEqual(scrollCalls, [{ left: 12, top: 34, behavior: "auto" }]);
});

test("inert anidado y capas de foco restauran sólo al disparador superior visible", () => {
  installDom();
  const attributes = new Map();
  const background = {
    inert: false,
    getAttribute: (name) => attributes.get(name) ?? null,
    setAttribute: (name, value) => attributes.set(name, value),
    removeAttribute: (name) => attributes.delete(name),
  };
  const releaseOuter = setElementsInert([background]);
  const releaseInner = setElementsInert([background]);
  assert.equal(background.inert, true);
  assert.equal(attributes.get("aria-hidden"), "true");
  releaseOuter();
  assert.equal(background.inert, true);
  releaseInner();
  assert.equal(background.inert, false);
  assert.equal(attributes.has("aria-hidden"), false);

  const lower = createFocusLayer();
  const upper = createFocusLayer();
  const trigger = focusable("trigger");
  assert.equal(restoreFocusFromLayer(lower, trigger), false);
  assert.equal(document.activeElement, null);
  assert.equal(restoreFocusFromLayer(upper, trigger), true);
  assert.equal(document.activeElement, trigger);

  const desktopClose = createFocusLayer();
  const hiddenToggle = focusable("hidden-toggle", { visible: false });
  assert.equal(restoreFocusFromLayer(desktopClose, hiddenToggle, { requireVisible: true }), false);
  assert.equal(document.activeElement, trigger);
});

test("el CTA por hash desplaza y enfoca el destino sin dejar tabindex permanente", () => {
  installDom();
  const attributes = new Map();
  let blurHandler;
  const target = {
    id: "consulta-tecnica",
    matches: () => false,
    setAttribute: (name, value) => attributes.set(name, value),
    removeAttribute: (name) => attributes.delete(name),
    scrollIntoView(options) { this.scrollOptions = options; },
    focus(options) { document.activeElement = this; this.focusOptions = options; },
    addEventListener: (_name, handler) => { blurHandler = handler; },
  };
  document.getElementById = (id) => id === target.id ? target : null;

  assert.equal(focusHashTarget("#consulta-tecnica", { updateHistory: true }), true);
  assert.equal(document.activeElement, target);
  assert.deepEqual(target.scrollOptions, { behavior: "smooth", block: "start" });
  assert.equal(attributes.get("tabindex"), "-1");
  assert.equal(window.location.hash, "#consulta-tecnica");
  blurHandler();
  assert.equal(attributes.has("tabindex"), false);

  window.matchMedia = () => ({ matches: true });
  assert.equal(focusPageTarget(target), true);
  assert.equal(target.scrollOptions.behavior, "auto");
});
