import { useCallback, useEffect, useRef, useState } from "react";

let manualFlipbookPromise;

function loadManualFlipbook() {
  if (!manualFlipbookPromise) {
    manualFlipbookPromise = import("./ManualFlipbook.jsx").catch((error) => {
      manualFlipbookPromise = null;
      throw error;
    });
  }
  return manualFlipbookPromise;
}

function ManualFlipbookPlaceholder({ images, pages, variant, orientation, altPrefix, language, onActivate }) {
  if (!images.length) return null;
  const pageLabel = language === "en" ? "Page" : language === "pt" ? "Página" : "Página";
  const activateLabel = language === "en"
    ? "load interactive viewer"
    : language === "pt"
      ? "carregar visualizador interativo"
      : "cargar visor interactivo";
  const caption = pages[0]?.label || `${pageLabel} 1`;
  const dimensions = orientation === "landscape"
    ? { width: 1474, height: 588 }
    : { width: 1100, height: 1556 };

  return (
    <div className={`s7-flip s7-flip-${variant} s7-flip-${orientation}`} aria-label={caption}>
      <div className="s7-flip-stage">
        <button type="button" className="s7-flip-page" onClick={onActivate} aria-label={`${caption}: ${activateLabel}`}>
          <img
            src={images[0]}
            alt={`${altPrefix} — ${caption}`}
            width={dimensions.width}
            height={dimensions.height}
            loading="lazy"
            decoding="async"
          />
        </button>
      </div>
      <div className="s7-flip-bar">
        <span className="s7-flip-caption">{caption}</span>
        <span className="s7-flip-counter">1 / {images.length}</span>
      </div>
    </div>
  );
}

function DeferredManualFlipbook({
  images,
  pages,
  variant = "full",
  orientation = "portrait",
  altPrefix = "Vista previa del manual",
  language = "es",
}) {
  const hostRef = useRef(null);
  const mountedRef = useRef(true);
  const openOnLoadRef = useRef(false);
  const restoreFocusRef = useRef(false);
  const [Flipbook, setFlipbook] = useState(null);
  const [openOnLoad, setOpenOnLoad] = useState(false);
  const enhance = useCallback(() => {
    void loadManualFlipbook()
      .then((module) => {
        if (!mountedRef.current) return;
        const activeElement = document.activeElement;
        restoreFocusRef.current = Boolean(
          !openOnLoadRef.current && activeElement && hostRef.current?.contains(activeElement)
        );
        setFlipbook(() => module.default);
      })
      .catch(() => {
        // La vista previa útil permanece disponible si falla el chunk interactivo.
      });
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    const element = hostRef.current;
    let observer;
    let idleHandle;
    let timeout;
    if (element && "IntersectionObserver" in window) {
      observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          enhance();
        }
      }, { rootMargin: "600px" });
      observer.observe(element);
    } else if ("requestIdleCallback" in window) {
      idleHandle = window.requestIdleCallback(enhance, { timeout: 3000 });
    } else {
      timeout = window.setTimeout(enhance, 3000);
    }
    return () => {
      mountedRef.current = false;
      observer?.disconnect();
      if (idleHandle !== undefined) window.cancelIdleCallback(idleHandle);
      if (timeout !== undefined) window.clearTimeout(timeout);
    };
  }, [enhance]);

  useEffect(() => {
    if (!Flipbook || !restoreFocusRef.current) return;
    restoreFocusRef.current = false;
    hostRef.current?.querySelector(".s7-flip-page")?.focus({ preventScroll: true });
  }, [Flipbook]);

  const props = { images, pages, variant, orientation, altPrefix, language };
  const activate = () => {
    openOnLoadRef.current = true;
    setOpenOnLoad(true);
    enhance();
  };
  return (
    <div ref={hostRef} className="s7-flip-deferred" onPointerEnter={enhance} onFocusCapture={enhance}>
      {Flipbook
        ? <Flipbook {...props} initialZoom={openOnLoad} />
        : <ManualFlipbookPlaceholder {...props} onActivate={activate} />}
    </div>
  );
}

export default DeferredManualFlipbook;
