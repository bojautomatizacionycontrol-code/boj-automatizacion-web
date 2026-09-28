import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const app = await readFile(new URL("../src/routes/app.jsx", import.meta.url), "utf8");
const courses = await readFile(new URL("../src/routes/courses-index.jsx", import.meta.url), "utf8");
const resources = await readFile(new URL("../src/routes/resources.jsx", import.meta.url), "utf8");

test("la página de la app distingue guía, evidencia online y verificación en campo", () => {
  assert.match(app, /title="Diagnóstico guiado para PLC Siemens S7-300\/400"/);
  assert.match(app, /La app no lee datos ni envía comandos al PLC/);
  assert.match(app, /STEP 7 aporta evidencia online/);
  assert.doesNotMatch(app, /STEP 7 (?:confirma|confirms)|O STEP 7 confirma/);
});

test("el ejemplo PROFIBUS explica la incertidumbre y enlaza la guía correspondiente", () => {
  assert.match(app, /BF activo: una sospecha aún no es una causa/);
  assert.match(app, /La segunda captura muestra una etapa real de la app/);
  assert.match(app, /evidencia insuficiente/);
  assert.match(app, /La app no detecta ni confirma por sí sola el componente averiado/);
  assert.match(app, /href="\/recursos-tecnicos\/bf-profibus-dp"/);
});

test("curso y biblioteca ofrecen enlaces contextuales a la app sin confundirla con STEP 7", () => {
  assert.match(courses, /course\.path === "\/cursos\/s7-300-400"[\s\S]*?<a href="\/app">app de diagnóstico guiado para S7-300\/400<\/a>/);
  assert.match(resources, /Guías de diagnóstico[\s\S]*?<a href="\/app">app de diagnóstico guiado BOJ S7-PLC PRO<\/a>/);
});
