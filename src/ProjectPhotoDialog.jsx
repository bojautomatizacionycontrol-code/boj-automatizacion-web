import { useId } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import AccessibleDialog from "./AccessibleDialog.jsx";

const copyByLanguage = {
  es: {
    title: "Fotografías de la obra",
    close: "Cerrar",
    previous: "Anterior",
    next: "Siguiente",
    navigation: "Navegación de fotografías",
    counter: (current, total) => `Foto ${current} de ${total}`,
  },
  en: {
    title: "Project photographs",
    close: "Close",
    previous: "Previous",
    next: "Next",
    navigation: "Photograph navigation",
    counter: (current, total) => `Photo ${current} of ${total}`,
  },
  pt: {
    title: "Fotografias do projeto",
    close: "Fechar",
    previous: "Anterior",
    next: "Seguinte",
    navigation: "Navegação de fotografias",
    counter: (current, total) => `Foto ${current} de ${total}`,
  },
};

export default function ProjectPhotoDialog({ photo, index, total, language, onClose, onMove, onDialogKeyDown }) {
  const headingId = useId();
  const copy = copyByLanguage[language] || copyByLanguage.es;

  return (
    <AccessibleDialog
      open
      onClose={onClose}
      labelledBy={headingId}
      className="project-photo-lightbox"
      panelClassName="project-photo-lightbox-panel"
      onDialogKeyDown={onDialogKeyDown}
    >
      <header className="project-photo-lightbox-header">
        <div>
          <h2 id={headingId}>{copy.title}</h2>
          <p className="project-photo-lightbox-counter" role="status" aria-live="polite" aria-atomic="true">
            {copy.counter(index + 1, total)}
          </p>
        </div>
        <button
          type="button"
          className="project-photo-lightbox-close"
          onClick={onClose}
          data-dialog-initial-focus
        >
          <X size={20} aria-hidden="true" />
          <span>{copy.close}</span>
        </button>
      </header>
      <figure className="project-photo-lightbox-figure">
        <div className="project-photo-lightbox-stage">
          <img
            key={photo.src}
            className="project-photo-lightbox-image"
            src={photo.src}
            alt={photo.alt || photo.caption || ""}
            decoding="async"
          />
        </div>
        {photo.caption ? (
          <figcaption className="project-photo-lightbox-caption">{photo.caption}</figcaption>
        ) : null}
      </figure>
      {total > 1 ? (
        <div className="project-photo-lightbox-navigation" role="group" aria-label={copy.navigation}>
          <button type="button" onClick={() => onMove(-1)}>
            <ChevronLeft size={19} aria-hidden="true" />
            <span>{copy.previous}</span>
          </button>
          <button type="button" onClick={() => onMove(1)}>
            <span>{copy.next}</span>
            <ChevronRight size={19} aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </AccessibleDialog>
  );
}
