import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const appSource = await readFile(new URL("../src/App.jsx", import.meta.url), "utf8");
const stylesSource = await readFile(new URL("../src/styles.css", import.meta.url), "utf8");

test("el hero explica qué hace la app y su relación con STEP 7", () => {
  const expectedCopy = [
    "ASISTENCIA DE DIAGNÓSTICO EN CAMPO",
    "Antes de conectar STEP 7, sabé qué buscar.",
    "Ingresá los síntomas, LEDs y condiciones que observás en el tablero.",
    "La app no se conecta directamente al PLC ni reemplaza STEP 7.",
    "Orienta el diagnóstico inicial y prepara una intervención con mayor criterio.",
  ];

  for (const copy of expectedCopy) {
    assert.ok(appSource.includes(copy), `Falta el mensaje aprobado: ${copy}`);
  }

  assert.doesNotMatch(appSource, /Identificá la falla en minutos/);
});

test("presenta una sola explicación en dos etapas antes del flujo operativo", () => {
  const proofStrip = appSource.indexOf("<S7ProofStrip />", appSource.indexOf("function AppPage"));
  const positioningStart = appSource.indexOf('<section className="app-pro-positioning-section"', proofStrip);
  const positioningEnd = appSource.indexOf('<section className="app-pro-problems-how-section">', positioningStart);
  const positioningSource = appSource.slice(positioningStart, positioningEnd);

  assert.notEqual(proofStrip, -1);
  assert.notEqual(positioningStart, -1);
  assert.notEqual(positioningEnd, -1);
  assert.ok(proofStrip < positioningStart && positioningStart < positioningEnd);
  assert.equal(appSource.match(/className="app-pro-positioning-section"/g)?.length, 1);

  const expectedCopy = [
    "DOS ETAPAS, UN MISMO DIAGNÓSTICO",
    "Orientá la falla primero. Profundizá sólo cuando haga falta.",
    "Orientación con BOJ S7-PLC",
    "Diagnóstico con STEP 7",
    "BOJ S7-PLC orienta.",
    "STEP 7 confirma.",
    "El técnico decide.",
  ];

  for (const copy of expectedCopy) {
    assert.ok(positioningSource.includes(copy), `Falta la explicación aprobada: ${copy}`);
  }

  assert.equal(positioningSource.match(/className="app-pro-positioning-card /g)?.length, 2);
  assert.doesNotMatch(positioningSource, /pay\.hotmart\.com|target="_blank"|href=/);
});

test("el bloque mantiene una composición responsive y sin movimiento obligatorio", () => {
  const requiredPatterns = [
    /\.app-pro-positioning-grid\s*\{[\s\S]*?grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\)/,
    /\.app-pro-positioning-card\s*\{[\s\S]*?min-width:\s*0;/,
    /@media \(max-width: 900px\)[\s\S]*?\.app-pro-positioning-grid\s*\{[\s\S]*?grid-template-columns:\s*1fr;/,
    /@media \(max-width: 600px\)[\s\S]*?\.app-pro-positioning-card\s*\{/,
    /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.app-pro-positioning-card:hover\s*\{[\s\S]*?transform:\s*none;/,
  ];

  for (const pattern of requiredPatterns) {
    assert.match(stylesSource, pattern);
  }
});
