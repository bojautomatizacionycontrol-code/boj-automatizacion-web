import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const appSource = await readFile(new URL("../src/App.jsx", import.meta.url), "utf8");

test("el método BOJ y el problema aparecen después de la oferta comercial", () => {
  const offerIndex = appSource.indexOf('className="s7-sales-section s7-sales-offer" id="curso-s7-compra"');
  const methodIndex = appSource.indexOf("<S7MethodStrip />");
  const problemIndex = appSource.indexOf('className="s7-sales-section s7-sales-dark s7-sales-problem"');
  const mistakesIndex = appSource.indexOf('className="s7-sales-section s7-sales-mistakes s7-sales-mistakes-light"');

  assert.notEqual(offerIndex, -1);
  assert.notEqual(methodIndex, -1);
  assert.notEqual(problemIndex, -1);
  assert.notEqual(mistakesIndex, -1);
  assert.ok(offerIndex < methodIndex, "El Método BOJ debe seguir al bloque comercial");
  assert.ok(methodIndex < problemIndex, "Qué problema resuelve debe seguir al Método BOJ");
  assert.ok(problemIndex < mistakesIndex, "Ambos bloques deben preceder a la sección de errores");
  assert.equal(appSource.match(/<S7MethodStrip \/>/g)?.length, 1);
  assert.equal(appSource.match(/className="s7-sales-section s7-sales-dark s7-sales-problem"/g)?.length, 1);
});

test("la landing del curso alterna superficies claras y oscuras sin reordenar su contenido", () => {
  const landingStart = appSource.indexOf('function S7SalesLanding({ course, eyebrow })');
  const landingEnd = appSource.indexOf("function TiaCoursePage()", landingStart);
  const landingSource = appSource.slice(landingStart, landingEnd);
  const surfaceMarkers = [
    ['s7-sales-learning" data-surface="dark"', "dark"],
    ['id="curso-s7-incluye" data-surface="light"', "light"],
    ['className="s7-sales-confidence" data-surface="dark"', "dark"],
    ['id="curso-s7-programa" data-surface="light"', "light"],
    ['s7-sales-audience" data-surface="dark"', "dark"],
    ['s7-sales-instructor" data-surface="light"', "light"],
    ['id="curso-s7-compra" data-surface="dark"', "dark"],
    ["<S7MethodStrip />", "light"],
    ['s7-sales-problem" data-surface="dark"', "dark"],
    ['s7-sales-mistakes-light" data-surface="light"', "light"],
    ['<S7Testimonials background="dark" />', "dark"],
    ['s7-sales-faq" data-surface="light"', "light"],
    ['s7-sales-final-cta" data-surface="dark"', "dark"],
  ];
  let previousIndex = -1;

  for (const [marker] of surfaceMarkers) {
    const markerIndex = landingSource.indexOf(marker);
    assert.ok(markerIndex > previousIndex, `Falta o está fuera de orden: ${marker}`);
    previousIndex = markerIndex;
  }

  surfaceMarkers.forEach(([, surface], index) => {
    if (index > 0) assert.notEqual(surface, surfaceMarkers[index - 1][1]);
  });
});
