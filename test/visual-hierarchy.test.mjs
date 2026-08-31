import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { readCssBundle } from "./helpers/css-source.mjs";

const appSource = await readFile(new URL("../src/App.jsx", import.meta.url), "utf8");
const technicalRoutesSource = await readFile(new URL("../src/TechnicalRoutes.jsx", import.meta.url), "utf8");
const styleSource = await readCssBundle();

test("Cursos diferencia visuales ilustrativos y disponibilidad", () => {
  const illustrativeLabels = `${appSource}\n${technicalRoutesSource}`.match(/className="visual-disclaimer">Imagen ilustrativa/g) ?? [];

  assert.equal(illustrativeLabels.length, 2);
  assert.match(appSource, /className="course-status-badge"/);
  assert.match(appSource, /course\.upcoming \? "Próximamente" : "Disponible"/);
  assert.match(styleSource, /\.course-status-badge\s*\{/);
  assert.match(styleSource, /\.course-available-visual \.visual-disclaimer/);
  assert.match(styleSource, /\.resource-card-visual \.visual-disclaimer/);
});

test("Obras prioriza tres casos y mantiene accesible el archivo completo", () => {
  assert.match(appSource, /const featuredProjects = projects\.slice\(0, 3\);/);
  assert.match(appSource, /const additionalProjects = projects\.slice\(3\);/);
  assert.match(appSource, /<details className="works-archive">/);
  assert.match(appSource, /Ver \{additionalProjects\.length\} obras adicionales/);
  assert.match(appSource, /index=\{index \+ featuredProjects\.length \+ 1\}/);
  assert.match(styleSource, /\.works-archive > summary\s*\{/);
  assert.match(styleSource, /content-visibility:\s*auto/);
});
