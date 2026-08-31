import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

import { readCssBundle } from "./helpers/css-source.mjs";

const appSource = await readFile(new URL("../src/App.jsx", import.meta.url), "utf8");
const stylesSource = await readCssBundle();

const sourceBetween = (startMarker, endMarker) => {
  const start = appSource.indexOf(startMarker);
  const end = appSource.indexOf(endMarker, start);
  assert.notEqual(start, -1, `No se encontró el inicio: ${startMarker}`);
  assert.notEqual(end, -1, `No se encontró el final: ${endMarker}`);
  return appSource.slice(start, end);
};

test("TIA Portal informa que está en preparación y no ofrece botones de consulta", () => {
  const pageSource = sourceBetween("function TiaCoursePage()", "const coursePreparationCopy = {");
  const statusSource = sourceBetween("const coursePreparationCopy = {", "const courseLandingCopy = {");
  const landingSource = sourceBetween("function CourseLanding(", "function AppPage()");

  assert.match(pageSource, /afterHero=\{<CoursePreparationStrip \/>\}/);
  assert.doesNotMatch(pageSource, /whatsappUrl|mailtoUrl|Comprar o consultar curso|Consultar por el curso/);
  assert.match(statusSource, /CURSO EN PREPARACIÓN/);
  assert.match(statusSource, /La inscripción todavía no está habilitada/);
  assert.match(landingSource, /ctas = \[\]/);
  assert.match(landingSource, /ctas\.length > 0/);
  assert.match(landingSource, /afterHero=\{afterHero\}/);
});

test("la tarjeta lateral de TIA completa el espacio con información del programa", () => {
  const visualSource = sourceBetween("const tiaCourseVisualCopy = {", "function ClientLogoBand()");
  const tiaVisualSource = visualSource.slice(visualSource.indexOf('className="course-side-visual tia"'));

  assert.match(tiaVisualSource, /tia-course-side-copy/);
  assert.match(visualSource, /PROGRAMA EN DESARROLLO/);
  assert.match(visualSource, /Una base ordenada para trabajar en TIA Portal/);
  assert.match(tiaVisualSource, /course\?\.learnItems\?\.slice\(0, 3\)/);
  assert.doesNotMatch(tiaVisualSource, /ladder-lines|status-cluster/);
});

test("el hero español de App usa una captura guiada sin porcentajes probabilísticos", async () => {
  const previewSource = sourceBetween('const appHeroPreviewCopy = {', 'const appQuickAccessCopy = {');

  await access(new URL("../src/assets/app-diagnostico-guiado.jpg", import.meta.url));
  assert.match(appSource, /import appDiagnosticoGuiado from "\.\/assets\/app-diagnostico-guiado\.jpg"/);
  assert.match(previewSource, /src=\{appDiagnosticoGuiado\}/);
  assert.doesNotMatch(previewSource, /appSadDevicePreview|app-hero-diagnostic-preview-screen--device-composite/);
  assert.doesNotMatch(previewSource, /app-hero-diagnostic-preview-focus/);
  assert.match(stylesSource, /\.app-hero-diagnostic-preview-screen img\s*\{[\s\S]*?object-fit:\s*cover;/);
});

test("el hero de App no activa las capturas históricas con semántica probabilística", () => {
  const previewSource = sourceBetween('const appHeroPreviewCopy = {', 'const appQuickAccessCopy = {');

  assert.match(appSource, /import appProHeroLaptopVisual from "\.\/assets\/hero-app\.jpg"/);
  assert.doesNotMatch(appSource, /app-pro-hero-background-v2|app-sad-device-preview|app-panel-principal-diagnostico|app-resultado-diagnostico|app-hipotesis-priorizadas|assets\/app-carousel/);
  assert.doesNotMatch(previewSource, /clipPath|app-hero-device-silhouette/);
});

test("el nuevo estado y la información lateral tienen adaptación móvil", () => {
  assert.match(stylesSource, /\.course-preparation-strip-copy\s*\{[\s\S]*?grid-template-columns:/);
  assert.match(stylesSource, /@media \(max-width: 760px\)[\s\S]*?\.course-preparation-strip-copy\s*\{[\s\S]*?grid-template-columns:\s*1fr;/);
  assert.match(stylesSource, /\.tia-course-side-copy li\s*\{[\s\S]*?grid-template-columns:\s*auto minmax\(0, 1fr\);/);
});
