import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const appSource = await readFile(new URL("../src/App.jsx", import.meta.url), "utf8");
const contentSource = await readFile(new URL("../src/content.js", import.meta.url), "utf8");
const indexSource = await readFile(new URL("../index.html", import.meta.url), "utf8");

test("las imágenes de Obras se identifican como ilustrativas", () => {
  const homeStart = appSource.indexOf("function HomeObrasTeaser()");
  const homeEnd = appSource.indexOf("function AppDiagnosticMockup(", homeStart);
  const projectStart = appSource.indexOf("function ProjectCard(");
  const projectEnd = appSource.indexOf("function PortfolioPrep()", projectStart);
  const spanishWorksSource = `${appSource.slice(homeStart, homeEnd)}\n${appSource.slice(projectStart, projectEnd)}`;
  const labels = spanishWorksSource.match(/className="works-image-disclaimer"/g) ?? [];

  assert.equal(labels.length, 2);
  assert.match(spanishWorksSource, /<h2>Obras realizadas<\/h2>/);
  assert.match(appSource, /<h2>Completed projects<\/h2>/);
  assert.match(appSource, /<h2>Projetos realizados<\/h2>/);
  assert.doesNotMatch(appSource, /Obras reales, no ejemplos de manual|Industrial work, not theoretical examples|Trabalho industrial, não exemplos teóricos/);
  assert.match(spanishWorksSource, /Los casos, clientes y alcances corresponden a trabajos realizados; las imágenes son ilustrativas\./);
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
  assert.match(indexSource, /material técnico descargable, guías prácticas y acceso permanente/);
});

test("las imágenes de Recursos se identifican como ilustrativas y preservan el estado accesible", () => {
  assert.match(appSource, /className="resource-card-visual"/);
  assert.doesNotMatch(appSource, /className="resource-card-visual" aria-hidden="true"/);
  assert.match(appSource, /<img src=\{visual\} alt="" aria-hidden="true" loading="lazy" \/>/);
  assert.match(appSource, /className="resource-card-fallback" aria-hidden="true"/);
  assert.match(appSource, /className="visual-disclaimer">Imagen ilustrativa<\/span>/);
  assert.match(appSource, /className="resource-status">\{resource\.status\}<\/span>/);
});
