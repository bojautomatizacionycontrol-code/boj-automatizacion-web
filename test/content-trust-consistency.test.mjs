import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const appSource = await readFile(new URL("../src/App.jsx", import.meta.url), "utf8");
const contentSource = await readFile(new URL("../src/content.js", import.meta.url), "utf8");
const indexSource = await readFile(new URL("../index.html", import.meta.url), "utf8");

test("las imágenes de Obras se identifican como ilustrativas", () => {
  const labels = appSource.match(/className="works-image-disclaimer"/g) ?? [];

  assert.equal(labels.length, 2);
  assert.match(appSource, /Los casos, clientes y alcances corresponden a trabajos realizados; las imágenes son ilustrativas\./);
  assert.match(appSource, /alt=\{`Imagen ilustrativa para \$\{project\.title\}`\}/);
  assert.doesNotMatch(appSource, /Imagen real \(de services-works\)/);
});

test("el curso se describe sin limitar el material a dos PDF", () => {
  for (const source of [appSource, contentSource, indexSource]) {
    assert.doesNotMatch(source, /dos PDF descargables/i);
    assert.doesNotMatch(source, /Dos manuales técnicos descargables/);
  }

  assert.match(appSource, /material técnico descargable, guías prácticas/);
  assert.match(contentSource, /Material técnico descargable en PDF con acceso permanente/);
  assert.match(indexSource, /material técnico descargable, guías prácticas y acceso permanente/);
});

test("las imágenes de Recursos son decorativas de forma consistente", () => {
  assert.match(appSource, /className="resource-card-visual" aria-hidden="true"/);
  assert.doesNotMatch(appSource, /aria-hidden=\{!visual\}/);
});
