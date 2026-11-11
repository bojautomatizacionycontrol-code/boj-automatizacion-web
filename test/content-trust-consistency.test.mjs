import { readRuntimeAppSource } from "./helpers/runtime-app-source.mjs";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { getRouteMetadata } from "../src/route-metadata.js";

const appSource = await readRuntimeAppSource();
const contentSource = await readFile(new URL("../src/content.js", import.meta.url), "utf8");
const indexSource = await readFile(new URL("../index.html", import.meta.url), "utf8");

test("las imágenes de Obras se identifican como ilustrativas", () => {
  const worksStart = appSource.indexOf("function WorksPage()");
  const worksEnd = appSource.indexOf("function ProjectCard(", worksStart);
  const projectStart = appSource.indexOf("function ProjectCard(");
  const projectEnd = appSource.indexOf("function PortfolioPrep()", projectStart);
  const spanishWorksSource = `${appSource.slice(worksStart, worksEnd)}\n${appSource.slice(projectStart, projectEnd)}`;
  const labels = spanishWorksSource.match(/className="works-image-disclaimer"/g) ?? [];

  assert.equal(labels.length, 1);
  assert.match(spanishWorksSource, /title="Obras y trabajos realizados en entornos industriales"/);
  assert.match(appSource, /title="Engineering and automation work completed in real plants"/);
  assert.match(appSource, /title="Trabalhos de engenharia e automação realizados em plantas reais"/);
  assert.doesNotMatch(appSource, /Obras reales, no ejemplos de manual|Industrial work, not theoretical examples|Trabalho industrial, não exemplos teóricos/);
  assert.match(spanishWorksSource, /alt=\{`Imagen ilustrativa para \$\{project\.title\}`\}/);
  assert.doesNotMatch(spanishWorksSource, /Imagen real \(de services-works\)/);
});

test("el curso se describe sin limitar el material a dos PDF", () => {
  for (const source of [appSource, contentSource, indexSource]) {
    assert.doesNotMatch(source, /dos PDF descargables/i);
    assert.doesNotMatch(source, /Dos manuales técnicos descargables/);
  }

  assert.match(appSource, /material técnico descargable, guías prácticas/);
  assert.match(contentSource, /Material técnico descargable en PDF con acceso permanente/);
  assert.doesNotMatch(indexSource, /"@type": "Course"|"@type": "Offer"/);
  const courseJsonLd = getRouteMetadata("/cursos/s7-300-400").jsonLd;
  assert.ok(courseJsonLd["@graph"].some((node) => node["@type"] === "Course"));
});

test("las imágenes de Recursos se identifican como ilustrativas y preservan el estado accesible", () => {
  assert.match(appSource, /className="resource-card-visual"/);
  assert.doesNotMatch(appSource, /className="resource-card-visual" aria-hidden="true"/);
  assert.match(appSource, /<img src=\{visual\} alt="" aria-hidden="true" width=\{dimensions\.width\} height=\{dimensions\.height\} loading="lazy" decoding="async" \/>/);
  assert.match(appSource, /className="resource-card-fallback" aria-hidden="true"/);
  assert.match(appSource, /className="visual-disclaimer">Imagen ilustrativa<\/span>/);
  assert.match(appSource, /className="resource-status">\{resource\.status\}<\/span>/);
});
