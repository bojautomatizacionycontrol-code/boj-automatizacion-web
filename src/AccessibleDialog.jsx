import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  createFocusLayer,
  getFocusableElements,
  handleEscapeKey,
  lockPageScroll,
  restoreFocusFromLayer,
  setElementsInert,
  trapTabKey,
} from "./accessibility.js";

export default function AccessibleDialog({
  open,
  onClose,
  labelledBy,
  ariaLabel,
  className,
  panelClassName,
  children,
  onDialogKeyDown,
}) {
  const dialogRef = useRef(null);
  const returnFocusRef = useRef(null);
  const onCloseRef = useRef(onClose);
  const onDialogKeyDownRef = useRef(onDialogKeyDown);
  onCloseRef.current = onClose;
  onDialogKeyDownRef.current = onDialogKeyDown;

  useEffect(() => {
    if (!open) return undefined;

    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusLayer = createFocusLayer();
    const restoreScroll = lockPageScroll();
    const restoreBackground = setElementsInert([document.getElementById("root")]);
    const animationFrame = window.requestAnimationFrame(() => {
      const initialFocus =
        dialogRef.current?.querySelector("[data-dialog-initial-focus]") ||
        getFocusableElements(dialogRef.current)[0] ||
        dialogRef.current;
      initialFocus?.focus({ preventScroll: true });
    });

    const handleKeyDown = (event) => {
      if (handleEscapeKey(event, () => onCloseRef.current?.())) return;

      onDialogKeyDownRef.current?.(event);
      trapTabKey(event, dialogRef.current, dialogRef.current);
    };

    const containFocus = (event) => {
      if (!dialogRef.current?.contains(event.target)) {
        (getFocusableElements(dialogRef.current)[0] || dialogRef.current)?.focus({ preventScroll: true });
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusin", containFocus);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", containFocus);
      restoreBackground();
      restoreScroll();
      restoreFocusFromLayer(focusLayer, returnFocusRef.current);
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      ref={dialogRef}
      className={className}
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      aria-label={labelledBy ? undefined : ariaLabel}
      tabIndex={-1}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onCloseRef.current?.();
      }}
    >
      <div className={panelClassName}>{children}</div>
    </div>,
    document.body,
  );
}
