import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const appSource = await readFile(new URL("../src/App.jsx", import.meta.url), "utf8");
const stylesSource = await readFile(new URL("../src/styles.css", import.meta.url), "utf8");

const sourceBetween = (startMarker, endMarker) => {
  const start = appSource.indexOf(startMarker);
  const end = appSource.indexOf(endMarker, start);
  assert.notEqual(start, -1, `No se encontró el inicio: ${startMarker}`);
  assert.notEqual(end, -1, `No se encontró el final: ${endMarker}`);
  return appSource.slice(start, end);
};

test("TIA Portal informa que está en preparación y no ofrece botones de consulta", () => {
  const pageSource = sourceBetween("function TiaCoursePage()", "function CoursePreparationStrip()");
  const statusSource = sourceBetween("function CoursePreparationStrip()", "function CourseLanding(");
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
  const visualSource = sourceBetween("function CourseVisual(", "function ClientLogoBand()");
  const tiaVisualSource = visualSource.slice(visualSource.indexOf('className="course-side-visual tia"'));

  assert.match(tiaVisualSource, /tia-course-side-copy/);
  assert.match(tiaVisualSource, /PROGRAMA EN DESARROLLO/);
  assert.match(tiaVisualSource, /Una base ordenada para trabajar en TIA Portal/);
  assert.match(tiaVisualSource, /course\?\.learnItems\?\.slice\(0, 3\)/);
  assert.doesNotMatch(tiaVisualSource, /ladder-lines|status-cluster/);
});

test("el hero español de App usa la composición adjunta sin deformarla", async () => {
  const previewSource = sourceBetween("function AppHeroDiagnosticPreview()", "function AppQuickCommercialAccess()");

  await access(new URL("../src/assets/app-sad-device-preview.png", import.meta.url));
  assert.match(appSource, /import appSadDevicePreview from "\.\/assets\/app-sad-device-preview\.png"/);
  assert.match(previewSource, /src=\{appSadDevicePreview\}/);
  assert.match(previewSource, /app-hero-diagnostic-preview-screen--device-composite/);
  assert.doesNotMatch(previewSource, /app-hero-diagnostic-preview-focus/);
  assert.match(stylesSource, /\.app-hero-diagnostic-preview-screen--device-composite img\s*\{[\s\S]*?object-fit:\s*contain;/);
});

test("el hero de App elimina el fondo claro sin alterar la captura", () => {
  const previewSource = sourceBetween("function AppHeroDiagnosticPreview()", "function AppQuickCommercialAccess()");
  const compositeStyles = stylesSource.slice(
    stylesSource.lastIndexOf(".app-hero-diagnostic-preview-screen--device-composite {"),
    stylesSource.indexOf(".app-hero-diagnostic-preview-focus")
  );

  assert.match(previewSource, /clipPath id="app-hero-device-silhouette" clipPathUnits="objectBoundingBox"/);
  assert.equal((previewSource.match(/<rect /g) ?? []).length, 2);
  assert.match(compositeStyles, /background:\s*transparent;/);
  assert.match(compositeStyles, /clip-path:\s*url\("#app-hero-device-silhouette"\);/);
  assert.doesNotMatch(compositeStyles, /background:\s*#e9f7fb;/);
});

test("el nuevo estado y la información lateral tienen adaptación móvil", () => {
  assert.match(stylesSource, /\.course-preparation-strip-copy\s*\{[\s\S]*?grid-template-columns:/);
  assert.match(stylesSource, /@media \(max-width: 760px\)[\s\S]*?\.course-preparation-strip-copy\s*\{[\s\S]*?grid-template-columns:\s*1fr;/);
  assert.match(stylesSource, /\.tia-course-side-copy li\s*\{[\s\S]*?grid-template-columns:\s*auto minmax\(0, 1fr\);/);
});
