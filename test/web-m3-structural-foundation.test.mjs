import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { readCssBundle } from "./helpers/css-source.mjs";

const normalizeLf = (value) => value.replaceAll("\r\n", "\n").replaceAll("\r", "\n");
const sha256 = (value) => createHash("sha256").update(normalizeLf(value)).digest("hex");

const [mainSource, appSource, manifestSource, deferredSource, manualSource, stylesSource] = await Promise.all([
  readFile(new URL("../src/main.jsx", import.meta.url), "utf8"),
  readFile(new URL("../src/App.jsx", import.meta.url), "utf8"),
  readFile(new URL("../src/routes/manifest.jsx", import.meta.url), "utf8"),
  readFile(new URL("../src/components/DeferredManualFlipbook.jsx", import.meta.url), "utf8"),
  readFile(new URL("../src/components/ManualFlipbook.jsx", import.meta.url), "utf8"),
  readCssBundle(),
]);

test("mantiene el CSS modularizado byte-equivalente al cierre WEB-M2", () => {
  assert.equal(
    sha256(stylesSource),
    "e995f8d894b14711d838f8b3aebea312061b389ebe31ae166ea079e11ab89a5a"
  );
  assert.match(mainSource, /import "\.\/styles\.css";[\s\S]*import "\.\/audit\.css";[\s\S]*import "\.\/m1-accessibility\.css";/);
  assert.doesNotMatch(mainSource, /commercial-impact\.css/);
});

test("conserva ocho familias de ruta dinámicas sin volver a importar páginas desde el entry", () => {
  assert.equal((manifestSource.match(/:\s*\(\) => import\("\.\//g) || []).length, 8);
  assert.doesNotMatch(mainSource, /\.\/routes\/(?:home|services|courses-index|course-s7|course-tia|app|resources|compliance)\.jsx/);
  assert.match(mainSource, /loadRouteComponent\(initialRoute\)/);
  assert.match(mainSource, /hydrateRoot\(rootElement, tree/);
  assert.match(manifestSource, /getDerivedStateFromProps\(props, state\)[\s\S]*props\.route === state\.route[\s\S]*failed: false, route: props\.route/);
  assert.match(manifestSource, /<RouteChunkBoundary route=\{route\}>/);
  assert.doesNotMatch(manifestSource, /<RouteChunkBoundary key=/);
});

test("difiere ManualFlipbook hasta intersección real o activación y conserva dimensiones", () => {
  assert.match(deferredSource, /import\("\.\/ManualFlipbook\.jsx"\)/);
  assert.match(deferredSource, /new window\.IntersectionObserver/);
  assert.match(deferredSource, /entry\.isIntersecting && entry\.intersectionRatio > 0/);
  assert.match(deferredSource, /rootMargin: "0px", threshold: 0/);
  assert.match(deferredSource, /onClick=\{onActivate\}/);
  assert.match(deferredSource, /data-intrinsic-width=\{dimensions\.width\}[\s\S]*data-intrinsic-height=\{dimensions\.height\}/);
  assert.match(deferredSource, /hostRef\.current\?\.contains\(activeElement\)/);
  assert.match(deferredSource, /restoreFocusAfterLoadRef[\s\S]*querySelector\("\.s7-flip-page"\)\?\.focus/);
  assert.match(manualSource, /width=\{imageDimensions\.width\}[\s\S]*height=\{imageDimensions\.height\}/);
  assert.match(manualSource, /returnFocusAfterZoomRef[\s\S]*requestAnimationFrame[\s\S]*pageButtonRef\.current\?\.focus/);
  assert.match(manualSource, /ref=\{pageButtonRef\}[\s\S]*<AccessibleDialog[\s\S]*onClose=\{closeZoom\}/);
  assert.doesNotMatch(deferredSource, /requestIdleCallback|setTimeout|onPointerEnter|onFocusCapture/);
});

test("captura fallos de prefetch y evita un page_view transitorio del sentinel 404", () => {
  assert.match(appSource, /import \{ startTransition,[^}]+\} from "react"/);
  assert.equal((appSource.match(/startTransition\(\(\) => setRoute\(getRoute\(\)\)\)/g) || []).length, 2);
  assert.match(appSource, /function preloadRouteSafely\(route\)[\s\S]*preloadRouteFamily\(route\)\.catch/);
  assert.equal((appSource.match(/preloadRouteSafely\(url\.pathname\)/g) || []).length, 2);
  assert.match(appSource, /if \(route === "\/__boj_not_found__"\) return;[\s\S]*track\("page_view"/);
});

test("elimina el archivo monolítico residual del grafo y del repositorio", async () => {
  await assert.rejects(readFile(new URL("../src/app/legacy-components.jsx", import.meta.url), "utf8"), /ENOENT/);
});
