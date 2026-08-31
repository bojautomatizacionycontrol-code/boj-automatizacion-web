import { readRuntimeStylesSource } from "./helpers/runtime-app-source.mjs";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const appSource = await readFile(new URL("../src/routes/app.jsx", import.meta.url), "utf8");
const stylesSource = await readRuntimeStylesSource();

test("el hero explica qué hace la app y su relación con STEP 7", () => {
  const expectedCopy = [
    "ASISTENCIA DE DIAGNÓSTICO EN CAMPO",
    "Antes de conectar STEP 7, identifica qué debes revisar.",
    "Ingresa los síntomas, los LEDs y las condiciones que observas en el panel de control.",
    "La app no se conecta directamente al PLC ni reemplaza STEP 7.",
    "Orienta el diagnóstico inicial y prepara una intervención con mayor criterio.",
  ];

  for (const copy of expectedCopy) {
    assert.ok(appSource.includes(copy), `Falta el mensaje aprobado: ${copy}`);
  }

  assert.doesNotMatch(appSource, /Identificá la falla en minutos/);
});

test("presenta una explicación integrada en dos etapas antes del flujo operativo", () => {
  const appPageStart = appSource.indexOf("function AppPage");
  const appPageEnd = appSource.indexOf("function EnglishAppHeroDiagnosticPreview", appPageStart);
  const appPageSource = appSource.slice(appPageStart, appPageEnd);
  const proofStrip = appPageSource.indexOf("<S7ProofStrip />");
  const quickAccess = appPageSource.indexOf("<AppQuickCommercialAccess />", proofStrip);
  const positioningStart = appPageSource.indexOf('<section className="app-pro-positioning-section"', proofStrip);
  const positioningEnd = appPageSource.indexOf('<section className="app-pro-problems-how-section">', positioningStart);
  const positioningSource = appPageSource.slice(positioningStart, positioningEnd);

  assert.notEqual(proofStrip, -1);
  assert.notEqual(quickAccess, -1);
  assert.notEqual(positioningStart, -1);
  assert.notEqual(positioningEnd, -1);
  assert.ok(proofStrip < quickAccess && quickAccess < positioningStart && positioningStart < positioningEnd);
  assert.equal(appPageSource.match(/className="app-pro-positioning-section"/g)?.length, 1);

  const expectedCopy = [
    "DOS ETAPAS, UN MISMO DIAGNÓSTICO",
    "Orienta el diagnóstico primero. Profundiza sólo cuando sea necesario.",
    "Orientación con BOJ S7-PLC",
    "Diagnóstico con STEP 7",
    "El técnico evalúa la evidencia antes de intervenir.",
    "BOJ S7-PLC orienta.",
    "STEP 7 confirma.",
    "El técnico decide.",
  ];

  for (const copy of expectedCopy) {
    assert.ok(positioningSource.includes(copy), `Falta la explicación aprobada: ${copy}`);
  }

  assert.equal(positioningSource.match(/className="app-pro-positioning-route-step"/g)?.length, 2);
  assert.equal(positioningSource.match(/className="app-pro-positioning-route-decision"/g)?.length, 1);
  assert.doesNotMatch(positioningSource, /app-pro-positioning-card/);
  assert.doesNotMatch(positioningSource, /pay\.hotmart\.com|target="_blank"|href=/);
});

test("el recorrido integrado mantiene una composición responsive", () => {
  const requiredPatterns = [
    /\.app-pro-positioning-route\s*\{[\s\S]*?grid-template-columns:\s*minmax\(0, 1fr\) auto minmax\(0, 1fr\)/,
    /\.app-pro-positioning-route-step,[\s\S]*?min-width:\s*0;/,
    /@media \(max-width: 760px\)[\s\S]*?\.app-pro-positioning-route\s*\{[\s\S]*?grid-template-columns:\s*1fr;/,
    /@media \(max-width: 760px\)[\s\S]*?\.app-pro-positioning-route-arrow\s*\{[\s\S]*?transform:\s*rotate\(90deg\);/,
  ];

  for (const pattern of requiredPatterns) {
    assert.match(stylesSource, pattern);
  }
});
