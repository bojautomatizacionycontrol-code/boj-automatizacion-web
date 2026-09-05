import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  cssEntrypointUrl,
  cssModuleSpecifiers,
  cssModuleStats,
  readCssBundle,
} from "./helpers/css-source.mjs";

const normalizeLf = (value) => value.replaceAll("\r\n", "\n").replaceAll("\r", "\n");
const sha256 = (value) => createHash("sha256").update(normalizeLf(value)).digest("hex").toUpperCase();

const baseline = Object.freeze({
  normalizedBytes: 504796,
  sha256: "E6E15CDE3B993875928E7075721ACD820058BF2448E87E08580268225575714E",
});

const expectedModules = Object.freeze([
  "./styles/foundation/00-tokens.css",
  "./styles/pages/10-home-legacy.css",
  "./styles/foundation/20-base-layout-navigation.css",
  "./styles/components/30-shared-controls-hero.css",
  "./styles/components/40-shared-sections-cards.css",
  "./styles/pages/50-route-resources-services.css",
  "./styles/pages/60-heavy-course-app-works-contact.css",
  "./styles/layout/70-footer-floating-contact.css",
  "./styles/responsive/80-foundation-routes.css",
  "./styles/pages/90-home-premium.css",
  "./styles/pages/100-services.css",
  "./styles/pages/110-courses-index.css",
  "./styles/pages/120-app-foundation.css",
  "./styles/pages/130-app-commercial.css",
  "./styles/components/140-sitewide-alignment.css",
  "./styles/pages/150-services-authority.css",
  "./styles/pages/160-course-s7.css",
  "./styles/components/170-cross-route-conversion.css",
  "./styles/layout/180-route-shells.css",
  "./styles/components/190-commercial-shared.css",
  "./styles/pages/200-course-commerce.css",
  "./styles/layout/210-footer-refinement.css",
  "./styles/pages/220-app-decisions.css",
  "./styles/pages/230-services-decisions.css",
  "./styles/pages/240-contact-decisions.css",
  "./styles/components/250-multilingual.css",
  "./styles/pages/260-app-positioning.css",
  "./styles/pages/270-home-app-guided.css",
]);

test("el manifiesto declara módulos semánticos una sola vez y en orden estable", async () => {
  const entrySource = await readFile(cssEntrypointUrl, "utf8");
  const specifiers = cssModuleSpecifiers(entrySource);

  assert.deepEqual(specifiers, expectedModules);
  assert.equal(new Set(specifiers).size, specifiers.length);
  assert.match(specifiers.join("\n"), /styles\/foundation\//);
  assert.match(specifiers.join("\n"), /styles\/layout\//);
  assert.match(specifiers.join("\n"), /styles\/components\//);
  assert.match(specifiers.join("\n"), /styles\/responsive\//);
  assert.match(specifiers.join("\n"), /styles\/pages\//);

  const executableCss = entrySource
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/@import\s+["'][^"']+["']\s*;/g, "")
    .trim();
  assert.equal(executableCss, "", "styles.css debe seguir siendo sólo un manifiesto ordenado");
});

test("concatenar los módulos reconstruye byte a byte el baseline visual vigente", async () => {
  const bundle = await readCssBundle();

  assert.equal(Buffer.byteLength(normalizeLf(bundle)), baseline.normalizedBytes);
  assert.equal(sha256(bundle), baseline.sha256);
});

test("todos los módulos existen, contienen CSS y no anidan nuevos imports", async () => {
  const stats = await cssModuleStats();
  assert.equal(stats.length, expectedModules.length);

  for (const { url, size } of stats) {
    assert.ok(size > 0, `${url.pathname} no puede estar vacío`);
    assert.doesNotMatch(await readFile(url, "utf8"), /@import\s/i, `${url.pathname} debe ser una hoja terminal`);
  }
});

test("la capa general conserva audit y accesibilidad como overrides finales", async () => {
  const mainSource = await readFile(new URL("../src/main.jsx", import.meta.url), "utf8");
  const baseIndex = mainSource.indexOf('import "./styles.css";');
  const auditIndex = mainSource.indexOf('import "./audit.css";');
  const accessibilityIndex = mainSource.indexOf('import "./m1-accessibility.css";');

  assert.ok(baseIndex >= 0);
  assert.ok(baseIndex < auditIndex);
  assert.ok(auditIndex < accessibilityIndex);
});
