import { useEffect, useRef, useState } from "react";
import { ArrowRight, ScanSearch, X } from "lucide-react";

import AccessibleDialog from "../AccessibleDialog.jsx";

const manualFlipbookCopy = {
  es: { previous: "Anterior", next: "Siguiente", enlarge: "Ampliar", close: "Cerrar vista ampliada", pages: "Páginas del manual", goTo: "Ir a la página", page: "Página" },
  en: { previous: "Previous", next: "Next", enlarge: "Enlarge", close: "Close enlarged view", pages: "Manual pages", goTo: "Go to page", page: "Page" },
  pt: { previous: "Anterior", next: "Próxima", enlarge: "Ampliar", close: "Fechar visualização ampliada", pages: "Páginas do manual", goTo: "Ir para a página", page: "Página" },
};

function ManualFlipbook({ images, pages, variant = "full", orientation = "portrait", altPrefix = "Vista previa del manual", language = "es", initialZoom = false }) {
  const total = images.length;
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(initialZoom);
  const pageButtonRef = useRef(null);
  const returnFocusAfterZoomRef = useRef(false);
  const copy = manualFlipbookCopy[language] || manualFlipbookCopy.es;
  const imageDimensions = orientation === "landscape"
    ? { width: 1474, height: 588 }
    : { width: 1100, height: 1556 };
  const go = (target) => setIndex((current) => (target + total) % total || 0);
  const closeZoom = () => {
    returnFocusAfterZoomRef.current = true;
    setZoom(false);
  };

  useEffect(() => {
    if (zoom || !returnFocusAfterZoomRef.current) return undefined;
    returnFocusAfterZoomRef.current = false;
    const animationFrame = window.requestAnimationFrame(() => {
      pageButtonRef.current?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(animationFrame);
  }, [zoom]);

  if (!total) return null;
  const caption = pages[index]?.label || `${copy.page} ${index + 1}`;
  const handleDialogKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      go(index + 1);
    }
  };

  return (
    <div className={`s7-flip s7-flip-${variant} s7-flip-${orientation}`}>
      <div className="s7-flip-stage">
        {total > 1 ? (
          <button type="button" className="s7-flip-nav s7-flip-prev" onClick={() => go(index - 1)} aria-label={copy.previous}>
            <ArrowRight size={variant === "card" ? 20 : 24} />
          </button>
        ) : null}
        <button ref={pageButtonRef} type="button" className="s7-flip-page" onClick={() => setZoom(true)} aria-label={`${copy.enlarge}: ${caption}`}>
          <img
            src={images[index]}
            alt={`${altPrefix} — ${caption}`}
            width={imageDimensions.width}
            height={imageDimensions.height}
            loading="lazy"
            decoding="async"
          />
          <span className="s7-flip-zoom" aria-hidden="true">
            <ScanSearch size={16} /> {copy.enlarge}
          </span>
        </button>
        {total > 1 ? (
          <button type="button" className="s7-flip-nav s7-flip-next" onClick={() => go(index + 1)} aria-label={copy.next}>
            <ArrowRight size={variant === "card" ? 20 : 24} />
          </button>
        ) : null}
      </div>
      <div className="s7-flip-bar">
        <span className="s7-flip-caption">{caption}</span>
        <span className="s7-flip-counter">{index + 1} / {total}</span>
      </div>
      {variant === "full" ? (
        <div className="s7-flip-thumbs" role="tablist" aria-label={copy.pages}>
          {images.map((image, i) => (
            <button
              key={image}
              type="button"
              className={`s7-flip-thumb${i === index ? " active" : ""}`}
              onClick={() => setIndex(i)}
              aria-label={`${copy.goTo} ${i + 1}`}
              aria-selected={i === index}
              role="tab"
            >
              <img
                src={image}
                alt=""
                width={imageDimensions.width}
                height={imageDimensions.height}
                loading="lazy"
                decoding="async"
              />
            </button>
          ))}
        </div>
      ) : null}

      <AccessibleDialog
        open={zoom}
        onClose={closeZoom}
        ariaLabel={`${copy.enlarge}: ${caption}`}
        className={`s7-flip-lightbox s7-flip-${orientation}`}
        panelClassName="s7-flip-lightbox-inner"
        onDialogKeyDown={handleDialogKeyDown}
      >
        <button
          type="button"
          className="s7-flip-lightbox-close"
          onClick={closeZoom}
          aria-label={copy.close}
          data-dialog-initial-focus
        >
          <X size={20} />
        </button>
        {total > 1 ? (
          <button type="button" className="s7-flip-nav s7-flip-prev" onClick={() => go(index - 1)} aria-label={copy.previous}>
            <ArrowRight size={26} />
          </button>
        ) : null}
        <img
          src={images[index]}
          alt={`${altPrefix} — ${caption}`}
          width={imageDimensions.width}
          height={imageDimensions.height}
          decoding="async"
        />
        {total > 1 ? (
          <button type="button" className="s7-flip-nav s7-flip-next" onClick={() => go(index + 1)} aria-label={copy.next}>
            <ArrowRight size={26} />
          </button>
        ) : null}
        <span className="s7-flip-lightbox-caption">{caption} · {index + 1} / {total}</span>
      </AccessibleDialog>
    </div>
  );
}

export default ManualFlipbook;
