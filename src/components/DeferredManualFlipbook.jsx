import { useCallback, useEffect, useId, useRef, useState } from "react";

import { createRetryableModuleLoader } from "../deferred-module-loader.js";

const loadManualFlipbook = createRetryableModuleLoader(() => import("./ManualFlipbook.jsx"));

const loadCopy = {
  es: {
    activate: "cargar visor interactivo",
    loading: "Cargando visor interactivo…",
    error: "No se pudo cargar el visor. Selecciona para reintentar.",
  },
  en: {
    activate: "load interactive viewer",
    loading: "Loading interactive viewer…",
    error: "The viewer could not be loaded. Activate to try again.",
  },
  pt: {
    activate: "carregar visualizador interativo",
    loading: "Carregando visualizador interativo…",
    error: "Não foi possível carregar o visualizador. Ative para tentar novamente.",
  },
};

function ManualFlipbookPlaceholder({
  images,
  pages,
  variant,
  orientation,
  altPrefix,
  language,
  observerRef,
  onActivate,
  loadState,
  statusId,
}) {
  if (!images.length) return null;
  const pageLabel = language === "en" ? "Page" : "Página";
  const copy = loadCopy[language] || loadCopy.es;
  const caption = pages[0]?.label || `${pageLabel} 1`;
  const dimensions = orientation === "landscape"
    ? { width: 1474, height: 588 }
    : { width: 1100, height: 1556 };
  const status = loadState === "loading"
    ? copy.loading
    : loadState === "error"
      ? copy.error
      : "";

  return (
    <div
      ref={observerRef}
      className={`s7-flip s7-flip-${variant} s7-flip-${orientation}`}
      data-deferred-manual-flipbook=""
      aria-label={caption}
    >
      <div className="s7-flip-stage">
        <button
          type="button"
          className="s7-flip-page"
          data-intrinsic-width={dimensions.width}
          data-intrinsic-height={dimensions.height}
          onClick={onActivate}
          aria-label={`${altPrefix} — ${caption}: ${copy.activate}`}
          aria-describedby={status ? statusId : undefined}
          aria-busy={loadState === "loading" ? "true" : undefined}
        >
          <span className="visually-hidden">{copy.activate}</span>
        </button>
      </div>
      <div className="s7-flip-bar">
        <span className="s7-flip-caption">{caption}</span>
        <span className="s7-flip-counter">1 / {images.length}</span>
        {status ? <span id={statusId} className="s7-flip-load-status" role="status">{status}</span> : null}
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
  const placeholderRef = useRef(null);
  const mountedRef = useRef(false);
  const loadingRef = useRef(false);
  const restoreFocusAfterLoadRef = useRef(false);
  const statusId = useId();
  const [Flipbook, setFlipbook] = useState(null);
  const [loadState, setLoadState] = useState("idle");
  const [openOnLoad, setOpenOnLoad] = useState(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const enhance = useCallback(({ open = false } = {}) => {
    if (open) {
      restoreFocusAfterLoadRef.current = false;
      setOpenOnLoad(true);
    } else {
      const activeElement = document.activeElement;
      restoreFocusAfterLoadRef.current = Boolean(activeElement && hostRef.current?.contains(activeElement));
    }
    if (Flipbook || loadingRef.current) return;

    loadingRef.current = true;
    setLoadState("loading");
    void loadManualFlipbook()
      .then((module) => {
        if (!mountedRef.current) return;
        setFlipbook(() => module.default);
        setLoadState("loaded");
      })
      .catch(() => {
        if (!mountedRef.current) return;
        restoreFocusAfterLoadRef.current = false;
        setOpenOnLoad(false);
        setLoadState("error");
      })
      .finally(() => {
        loadingRef.current = false;
      });
  }, [Flipbook]);

  useEffect(() => {
    if (Flipbook || loadState !== "idle" || typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return undefined;
    }
    const placeholder = placeholderRef.current;
    if (!placeholder) return undefined;

    const observer = new window.IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting && entry.intersectionRatio > 0)) {
        observer.disconnect();
        enhance();
      }
    }, { root: null, rootMargin: "0px", threshold: 0 });

    observer.observe(placeholder);
    return () => observer.disconnect();
  }, [enhance, Flipbook, loadState]);

  useEffect(() => {
    if (!Flipbook || !restoreFocusAfterLoadRef.current) return;
    restoreFocusAfterLoadRef.current = false;
    hostRef.current?.querySelector(".s7-flip-page")?.focus({ preventScroll: true });
  }, [Flipbook]);

  const props = { images, pages, variant, orientation, altPrefix, language };
  return (
    <div ref={hostRef} className="s7-flip-deferred">
      {Flipbook ? (
        <Flipbook {...props} initialZoom={openOnLoad} />
      ) : (
        <ManualFlipbookPlaceholder
          {...props}
          observerRef={placeholderRef}
          onActivate={() => enhance({ open: true })}
          loadState={loadState}
          statusId={statusId}
        />
      )}
    </div>
  );
}

export default DeferredManualFlipbook;
