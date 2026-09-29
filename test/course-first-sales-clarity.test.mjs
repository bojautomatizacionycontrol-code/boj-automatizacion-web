import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const courseSource = await readFile(new URL("../src/routes/course-s7.jsx", import.meta.url), "utf8");
const appSource = await readFile(new URL("../src/routes/app.jsx", import.meta.url), "utf8");

function section(source, start, end) {
  const first = source.indexOf(start);
  assert.notEqual(first, -1, `No se encontró el inicio: ${start}`);
  const last = source.indexOf(end, first + start.length);
  assert.notEqual(last, -1, `No se encontró el final: ${end}`);
  return source.slice(first, last);
}

const heroPreview = section(courseSource, "function CourseHeroPreview()", "function S7CoursePage()");
const landing = section(courseSource, "function S7SalesLanding({ course, eyebrow })", "const localizedS7SalesCopy =");
const hero = section(landing, "<Hero", "<S7ProofStrip />");
const courseCard = section(landing, 'className="s7-sales-include-card s7-sales-include-course"', 'className="s7-sales-include-card s7-sales-include-app"');
const appCard = section(landing, 'className="s7-sales-include-card s7-sales-include-app"', "{/* Slot del video demo");
const spanishApp = section(appSource, "function AppPage()", "function EnglishAppHeroDiagnosticPreview()");

test("el primer pantallazo distingue el formato PDF permanente de la licencia temporal", () => {
  assert.match(hero, /autoguiad[oa][\s\S]*PDF/i);
  assert.match(hero, /(?:1|un) mes[\s\S]*BOJ S7-PLC PRO/i);
  assert.match(hero, /(?:1|un) dispositivo/i);

  assert.match(heroPreview, /PDF/i);
  assert.match(heroPreview, /Acceso permanente al curso/i);
  assert.match(heroPreview, /App PRO[\s\S]*(?:1|un) mes/i);
  assert.match(heroPreview, /(?:1|un) dispositivo/i);
});

test("el cuerpo explica qué aporta cada parte de la compra sin prometer una conexión de la app al PLC", () => {
  assert.match(courseCard, /PDF/i);
  assert.match(courseCard, /autoguiad[oa]/i);
  assert.match(appCard, /no se conecta[\s\S]*PLC/i);
  assert.match(appCard, /ni controla[\s\S]*PLC/i);
});

test("la formación se presenta antes de la guía de planes y de los precios de la app", () => {
  const trainingIndex = spanishApp.indexOf('className="app-pro-training-strip"');
  const guideIndex = spanishApp.indexOf('className="app-pro-plan-guide"');
  const cardsIndex = spanishApp.indexOf('className="app-pro-plan-grid"');
  assert.ok(trainingIndex >= 0 && guideIndex >= 0 && cardsIndex >= 0);
  assert.ok(trainingIndex < guideIndex, "El curso debe aparecer antes de la guía de elección");
  assert.ok(trainingIndex < cardsIndex, "El curso debe aparecer antes de los precios de la app");

  const trainingStrip = section(spanishApp, 'className="app-pro-training-strip"', 'className="app-pro-institutional"');
  assert.match(trainingStrip, /PDF/i);
  assert.match(trainingStrip, /acceso permanente/i);
  assert.match(trainingStrip, /(?:1|un) mes/i);
  assert.match(trainingStrip, /(?:1|un) dispositivo/i);
  assert.match(trainingStrip, /href="\/cursos\/s7-300-400"/);
});

test("la comparación de la app no presenta el PDF del curso como un producto inferior", () => {
  const objection = section(spanishApp, 'className="app-pro-dark-section app-pro-objection-section"', 'className="app-pro-value-row-section"');
  assert.doesNotMatch(objection, /Una tabla\s*\/\s*PDF/i);
  assert.match(objection, /Listado estático/i);
  assert.match(objection, /curso[\s\S]*app|app[\s\S]*curso/i);
});

test("la venta del curso no atribuye ahorros monetarios sin evidencia", () => {
  assert.doesNotMatch(landing, /(?:hora de l[ií]nea parada|parada de m[aá]quina)[\s\S]{0,130}(?:cuesta|costar|vale)[\s\S]{0,80}(?:m[aá]s que|curso|formaci[oó]n)/i);
  assert.doesNotMatch(landing, /m[oó]dulo cambiado a ciegas[\s\S]{0,90}(?:vale|cuesta|costar)/i);
});
