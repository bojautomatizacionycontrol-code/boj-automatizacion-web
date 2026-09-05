import { readRuntimeAppSource, readRuntimeStylesSource } from "./helpers/runtime-app-source.mjs";
import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const appSource = await readRuntimeAppSource();
const stylesSource = await readRuntimeStylesSource();

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
  const landingSource = sourceBetween("function CourseLanding(", "function EnglishTiaCoursePage()");

  assert.match(pageSource, /afterHero=\{<CoursePreparationStrip \/>\}/);
  assert.doesNotMatch(pageSource, /whatsappUrl|mailtoUrl|Comprar o consultar curso|Consultar por el curso/);
  assert.match(statusSource, /CURSO EN PREPARACIÓN/);
  assert.match(statusSource, /La inscripción todavía no está habilitada/);
  assert.match(landingSource, /ctas = \[\]/);
  assert.match(landingSource, /ctas\.length > 0/);
  assert.match(landingSource, /afterHero=\{afterHero\}/);
});

test("la tarjeta lateral de TIA completa el espacio con información del programa", () => {
  const visualSource = sourceBetween("const tiaCourseVisualCopy = {", "function CourseTiaRoutes");
  const tiaVisualSource = visualSource.slice(visualSource.indexOf('className="course-side-visual tia"'));

  assert.match(tiaVisualSource, /tia-course-side-copy/);
  assert.match(visualSource, /PROGRAMA EN DESARROLLO/);
  assert.match(visualSource, /Una base ordenada para trabajar en TIA Portal/);
  assert.match(tiaVisualSource, /course\?\.learnItems\?\.slice\(0, 3\)/);
  assert.doesNotMatch(tiaVisualSource, /ladder-lines|status-cluster/);
});

test("el hero español de App usa la composición de dispositivos con capturas vigentes sin porcentajes probabilísticos", async () => {
  const previewSource = sourceBetween('const appHeroPreviewCopy = {', 'const appQuickAccessCopy = {');

  await access(new URL("../src/assets/app-estado-cpu-desktop-v8-4-15.jpg", import.meta.url));
  await access(new URL("../src/assets/app-estado-cpu-mobile-v7-3.png", import.meta.url));
  assert.match(appSource, /import appEstadoCpuDesktop from "\.\.\/assets\/app-estado-cpu-desktop-v8-4-15\.jpg"/);
  assert.match(previewSource, /src=\{appEstadoCpuDesktop\}[\s\S]*?width="1672"[\s\S]*?height="941"[\s\S]*?loading="eager"/);
  assert.match(previewSource, /className="app-mobile-screen"[\s\S]*?src=\{appEstadoCpuMobile\}[\s\S]*?width="594"[\s\S]*?height="919"/);
  assert.doesNotMatch(previewSource, /appSadDevicePreview|app-hero-diagnostic-preview-screen--device-composite|appDiagnosticoGuiado/);
  assert.doesNotMatch(previewSource, /app-hero-diagnostic-preview-focus|fetchPriority|%/);
  assert.match(stylesSource, /\.app-hero-devices \.app-product-stage\s*\{[^}]*width:\s*min\(100%, 720px\);[^}]*margin-inline:\s*auto;/);
  assert.match(stylesSource, /\.app-pro-page > \.boj-hero \.boj-hero-inner--with-aside\s*\{[^}]*grid-template-columns:\s*minmax\(0, 1fr\) minmax\(360px, 0\.92fr\);/);
  assert.doesNotMatch(stylesSource, /app-hero-diagnostic-preview/);
});

test("el hero de App no activa las capturas históricas con semántica probabilística", () => {
  const previewSource = sourceBetween('const appHeroPreviewCopy = {', 'const appQuickAccessCopy = {');

  assert.match(appSource, /import appProHeroLaptopVisual from "\.\.\/assets\/hero-app\.jpg"/);
  assert.doesNotMatch(appSource, /app-pro-hero-background-v2|app-sad-device-preview|app-panel-principal-diagnostico|app-resultado-diagnostico|app-hipotesis-priorizadas|assets\/app-carousel/);
  assert.doesNotMatch(previewSource, /clipPath|app-hero-device-silhouette/);
});

test("el nuevo estado y la información lateral tienen adaptación móvil", () => {
  assert.match(stylesSource, /\.course-preparation-strip-copy\s*\{[\s\S]*?grid-template-columns:/);
  assert.match(stylesSource, /@media \(max-width: 760px\)[\s\S]*?\.course-preparation-strip-copy\s*\{[\s\S]*?grid-template-columns:\s*1fr;/);
  assert.match(stylesSource, /\.tia-course-side-copy li\s*\{[\s\S]*?grid-template-columns:\s*auto minmax\(0, 1fr\);/);
});
