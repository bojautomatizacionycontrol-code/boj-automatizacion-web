import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = async (path) => readFile(new URL(path, import.meta.url), "utf8");

test("el recorrido del curso usa solo capturas vigentes y ofrece controles accesibles", async () => {
  const [tour, course] = await Promise.all([
    source("../src/components/AppTourPreview.jsx"),
    source("../src/routes/course-s7.jsx"),
  ]);
  for (const capture of [
    "app-seleccion-sintoma-v8-17-24.jpg",
    "app-verificacion-guiada-v8-17-24.jpg",
    "app-registro-intervencion-v8-17-24.jpg",
  ]) assert.ok(tour.includes(capture), `Falta ${capture}`);
  assert.doesNotMatch(tour, /app-resultado-diagnostico\.jpg/);
  assert.match(tour, /prefers-reduced-motion: reduce/);
  assert.match(tour, /IntersectionObserver/);
  assert.match(tour, /setPlaying\(false\);\s*setActive/);
  assert.match(course, /<AppTourPreview language=/);
});

test("los testimonios muestran una sola tarjeta y el método no repite números", async () => {
  const [shared, course, services] = await Promise.all([
    source("../src/routes/shared.jsx"),
    source("../src/routes/course-s7.jsx"),
    source("../src/routes/services.jsx"),
  ]);
  assert.match(shared, /<figure className="s7-testimonial-card is-active">/);
  assert.doesNotMatch(shared, /items\.map\(\(item, index\)/);
  assert.match(shared, /prefers-reduced-motion: reduce/);
  assert.match(shared, /onFocusCapture=\{\(\) => setManuallyPaused\(true\)\}/);
  assert.doesNotMatch(course, /s7-method-num/);
  assert.doesNotMatch(services, /services-engagement-number/);
});
