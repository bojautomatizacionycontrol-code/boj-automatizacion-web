import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { createRetryableModuleLoader } from "../src/deferred-module-loader.js";

const [
  deferredManualSource,
  manualSource,
  appRouteSource,
  mainSource,
  manifestSource,
] = await Promise.all([
  readFile(new URL("../src/components/DeferredManualFlipbook.jsx", import.meta.url), "utf8"),
  readFile(new URL("../src/components/ManualFlipbook.jsx", import.meta.url), "utf8"),
  readFile(new URL("../src/routes/app.jsx", import.meta.url), "utf8"),
  readFile(new URL("../src/main.jsx", import.meta.url), "utf8"),
  readFile(new URL("../src/routes/manifest.jsx", import.meta.url), "utf8"),
]);

const manualFallbackSource = deferredManualSource.slice(
  deferredManualSource.indexOf("function ManualFlipbookPlaceholder("),
  deferredManualSource.indexOf("function ManualFlipbookCommit("),
);

test("el flipbook mantiene el chunk fuera del render hasta activación o intersección real", () => {
  assert.match(deferredManualSource, /createRetryableModuleLoader\(\(\) => import\("\.\/ManualFlipbook\.jsx"\)\)/);
  assert.match(deferredManualSource, /new window\.IntersectionObserver/);
  assert.match(deferredManualSource, /entry\.isIntersecting && entry\.intersectionRatio > 0/);
  assert.match(deferredManualSource, /rootMargin: "0px", threshold: 0/);
  assert.match(deferredManualSource, /loadState !== "idle"/);
  assert.match(deferredManualSource, /enhance\(\{ open: true \}\)/);
  assert.doesNotMatch(deferredManualSource, /requestIdleCallback|setTimeout|onPointerEnter|onFocusCapture/);
  assert.doesNotMatch(deferredManualSource, /\blazy\(|<Suspense/);
});

test("el placeholder no solicita imágenes y sigue siendo activable con teclado o clic", () => {
  assert.match(manualFallbackSource, /data-deferred-manual-flipbook=""/);
  assert.match(manualFallbackSource, /<button[\s\S]*type="button"[\s\S]*onClick=\{onActivate\}/);
  assert.match(manualFallbackSource, /className="visually-hidden"/);
  assert.doesNotMatch(manualFallbackSource, /<img\b|\bsrc=/);
});

test("los diálogos conservan la primitiva fiable dentro de chunks de ruta ya diferidos", () => {
  assert.match(manualSource, /from "\.\.\/AccessibleDialog\.jsx"/);
  assert.match(appRouteSource, /from "\.\.\/AccessibleDialog\.jsx"/);
  assert.equal((appRouteSource.match(/<AccessibleDialog/g) || []).length, 3);
  assert.match(manifestSource, /app:\s*\(\) => import\("\.\/app\.jsx"\)/);
  assert.doesNotMatch(mainSource, /AccessibleDialog/);
});

test("las dimensiones y el foco del flipbook permanecen protegidos", () => {
  const imageTags = manualSource.match(/<img[\s\S]*?\/>/g) || [];
  assert.equal(imageTags.length, 3);
  for (const imageTag of imageTags) {
    assert.match(imageTag, /width=\{imageDimensions\.width\}/);
    assert.match(imageTag, /height=\{imageDimensions\.height\}/);
  }
  assert.match(manualSource, /returnFocusAfterZoomRef[\s\S]*pageButtonRef\.current\?\.focus/);
  assert.match(deferredManualSource, /restoreFocusAfterLoadRef[\s\S]*querySelector\("\.s7-flip-page"\)\?\.focus/);
});

test("el port no altera la arquitectura de ocho rutas ni hydrateRoot", () => {
  assert.equal((manifestSource.match(/:\s*\(\) => import\("\.\//g) || []).length, 8);
  assert.match(mainSource, /loadRouteComponent\(initialRoute\)/);
  assert.match(mainSource, /hydrateRoot\(rootElement, tree/);
});

test("el loader contiene un rechazo local y permite reintentar sin degradar la ruta", async () => {
  let attempts = 0;
  const resolvedModule = { default: "visor" };
  const load = createRetryableModuleLoader(async () => {
    attempts += 1;
    if (attempts === 1) throw new Error("chunk temporalmente no disponible");
    return resolvedModule;
  });

  await assert.rejects(load(), /chunk temporalmente no disponible/);
  assert.equal(attempts, 1);
  assert.equal(await load(), resolvedModule);
  assert.equal(await load(), resolvedModule);
  assert.equal(attempts, 2);
  assert.match(deferredManualSource, /\.catch\(\(\) => \{[\s\S]*setLoadState\("error"\)/);
  assert.match(deferredManualSource, /role="status"/);
});
