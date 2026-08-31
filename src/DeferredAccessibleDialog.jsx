import { lazy, Suspense } from "react";

const AccessibleDialog = lazy(() => import("./AccessibleDialog.jsx"));

export default function DeferredAccessibleDialog({ open, ...props }) {
  if (!open) return null;

  return (
    <Suspense fallback={null}>
      <AccessibleDialog open {...props} />
    </Suspense>
  );
}
