import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { offer } from "../src/content.js";
import { englishApp, portugueseApp } from "../src/i18n.js";
import { routeMetadata } from "../src/route-metadata.js";

const readSource = (relativePath) =>
  readFileSync(fileURLToPath(new URL(relativePath, import.meta.url)), "utf8");

test("la prueba de 14 días es coherente en planes, rutas y metadatos", () => {
  assert.equal(offer.app.trialPlan.meta, "14 días · En línea · Funciones limitadas");
  assert.match(offer.app.trialPlan.button, /14 días/);
  assert.equal(englishApp.planCopy["Prueba gratuita"].meta, "14 days · Online · Limited features");
  assert.equal(portugueseApp.planCopy["Prueba gratuita"].meta, "14 dias · Online · Recursos limitados");
  assert.match(routeMetadata["/app"].description, /prueba inicial de 14 días/);

  const appPage = readSource("../src/routes/app.jsx");
  const coursePage = readSource("../src/routes/course-s7.jsx");
  const compliancePage = readSource("../src/routes/compliance.jsx");
  assert.doesNotMatch(appPage, /\b48(?: horas| hours|-hour)\b/);
  assert.doesNotMatch(coursePage, /\b48(?: horas| hours|-hour)\b/);
  assert.match(compliancePage, /Las nuevas pruebas gratuitas duran 14 días desde su activación/);
  assert.match(compliancePage, /Las nuevas pruebas duran 14 días desde su activación/);
});

test("el plazo de respuesta de consultas sigue siendo independiente de la prueba", () => {
  assert.equal(readSource("../src/content.js").includes('responseTime: "Dentro de 48 horas hábiles"'), true);
});
