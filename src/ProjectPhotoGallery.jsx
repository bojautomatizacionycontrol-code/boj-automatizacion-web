import { lazy, Suspense, useCallback, useState } from "react";
import "./ProjectPhotoGallery.css";

const ProjectPhotoDialog = lazy(() => import("./ProjectPhotoDialog.jsx"));

/**
 * Keeps the caller's existing project markup and opens its photos in-page.
 * children receives openPhoto(index); each photo has src, alt and optional caption.
 */
export function ProjectPhotoGallery({ photos = [], language = "es", children }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const validPhotos = photos.filter((photo) => photo?.src);
  const total = validPhotos.length;
  const isOpen = activeIndex !== null && total > 0;
  const visibleIndex = Math.min(activeIndex ?? 0, Math.max(0, total - 1));
  const photo = validPhotos[visibleIndex];

  const openPhoto = useCallback((index = 0) => {
    if (!total) return;
    const requested = Number.isInteger(index) ? index : 0;
    setActiveIndex(Math.max(0, Math.min(requested, total - 1)));
  }, [total]);

  const close = useCallback(() => setActiveIndex(null), []);

  const move = useCallback((offset) => {
    if (total < 2) return;
    setActiveIndex((index) => {
      const current = Math.min(index ?? 0, total - 1);
      return (current + offset + total) % total;
    });
  }, [total]);

  const handleKeyDown = useCallback((event) => {
    if (total < 2 || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    }
  }, [move, total]);

  return (
    <>
      {typeof children === "function" ? children(openPhoto) : children}
      {isOpen ? (
        <Suspense fallback={null}>
          <ProjectPhotoDialog
            photo={photo}
            index={visibleIndex}
            total={total}
            language={language}
            onClose={close}
            onMove={move}
            onDialogKeyDown={handleKeyDown}
          />
        </Suspense>
      ) : null}
    </>
  );
}

export default ProjectPhotoGallery;
