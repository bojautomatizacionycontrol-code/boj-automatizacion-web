import { useState } from "react";
import { ArrowRight, ScanSearch, X } from "lucide-react";
import AccessibleDialog from "./DeferredAccessibleDialog.jsx";

const manualFlipbookCopy = {
  es: { previous: "Anterior", next: "Siguiente", enlarge: "Ampliar", close: "Cerrar vista ampliada", pages: "Páginas del manual", goTo: "Ir a la página", page: "Página" },
  en: { previous: "Previous", next: "Next", enlarge: "Enlarge", close: "Close enlarged view", pages: "Manual pages", goTo: "Go to page", page: "Page" },
  pt: { previous: "Anterior", next: "Próxima", enlarge: "Ampliar", close: "Fechar visualização ampliada", pages: "Páginas do manual", goTo: "Ir para a página", page: "Página" },
};

function imageAt(images, dimensions, index) {
  const image = images[index];
  const intrinsic = dimensions?.[index];
  return {
    src: image,
    width: intrinsic?.width,
    height: intrinsic?.height,
  };
}

export default function ManualFlipbook({
  images,
  dimensions,
  pages,
  variant = "full",
  orientation = "portrait",
  altPrefix = "Vista previa del manual",
  language = "es",
}) {
  const total = images.length;
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const copy = manualFlipbookCopy[language] || manualFlipbookCopy.es;
  const go = (target) => setIndex((current) => (target + total) % total || 0);

  if (!total) return null;
  const caption = pages[index]?.label || `${copy.page} ${index + 1}`;
  const currentImage = imageAt(images, dimensions, index);
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
        <button type="button" className="s7-flip-page" onClick={() => setZoom(true)} aria-label={`${copy.enlarge}: ${caption}`}>
          <img
            src={currentImage.src}
            alt={`${altPrefix} — ${caption}`}
            width={currentImage.width}
            height={currentImage.height}
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
          {images.map((image, imageIndex) => {
            const thumbnail = imageAt(images, dimensions, imageIndex);
            return (
              <button
                key={image}
                type="button"
                className={`s7-flip-thumb${imageIndex === index ? " active" : ""}`}
                onClick={() => setIndex(imageIndex)}
                aria-label={`${copy.goTo} ${imageIndex + 1}`}
                aria-selected={imageIndex === index}
                role="tab"
              >
                <img
                  src={thumbnail.src}
                  alt=""
                  width={thumbnail.width}
                  height={thumbnail.height}
                  loading="lazy"
                  decoding="async"
                />
              </button>
            );
          })}
        </div>
      ) : null}

      <AccessibleDialog
        open={zoom}
        onClose={() => setZoom(false)}
        ariaLabel={`${copy.enlarge}: ${caption}`}
        className={`s7-flip-lightbox s7-flip-${orientation}`}
        panelClassName="s7-flip-lightbox-inner"
        onDialogKeyDown={handleDialogKeyDown}
      >
        <button
          type="button"
          className="s7-flip-lightbox-close"
          onClick={() => setZoom(false)}
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
          src={currentImage.src}
          alt={`${altPrefix} — ${caption}`}
          width={currentImage.width}
          height={currentImage.height}
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
