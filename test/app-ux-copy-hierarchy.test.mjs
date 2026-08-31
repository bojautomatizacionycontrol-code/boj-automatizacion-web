import { readRuntimeStylesSourceSync } from "./helpers/runtime-app-source.mjs";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const testDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(testDir, "..");
const appSource = fs.readFileSync(path.join(rootDir, "src", "routes", "app.jsx"), "utf8");
const stylesSource = readRuntimeStylesSourceSync();

test("App PRO presents the approved editorial hierarchy", () => {
  const appPageStart = appSource.indexOf("function AppPage()");
  const appPageEnd = appSource.indexOf("function EnglishAppHeroDiagnosticPreview()", appPageStart);
  const appPageSource = appSource.slice(appPageStart, appPageEnd);
  const expectedCopy = [
    "DIAGNÓSTICO EN CAMPO",
    "Identifica el tipo de falla y ordena la búsqueda antes de intervenir el equipo.",
    "FLUJO DE TRABAJO",
    "Del síntoma a una hipótesis priorizada y una verificación concreta en campo.",
    "HERRAMIENTAS DE DIAGNÓSTICO",
    "Un entorno práctico para consultar, contrastar y documentar el diagnóstico desde el navegador.",
    "LICENCIAS Y MODALIDADES",
    "Compara la renovación, la duración, los dispositivos y el uso sin conexión antes de elegir.",
  ];

  for (const copy of expectedCopy) {
    assert.ok(appPageSource.includes(copy), `Missing approved App PRO copy: ${copy}`);
  }

  assert.equal(
    (appPageSource.match(/className="app-pro-section-kicker"/g) ?? []).length,
    4,
    "The App PRO page must expose four section kickers",
  );
  assert.equal(
    (appPageSource.match(/className="app-pro-panel-heading"/g) ?? []).length,
    2,
    "The two operational panels must share the same heading structure",
  );
});

test("App PRO hierarchy styles remain responsive and motion-safe", () => {
  const requiredSelectors = [
    ".app-pro-section-kicker {",
    ".app-pro-section-kicker::before {",
    ".app-pro-panel-heading {",
    ".app-pro-includes-section .app-pro-include-card:hover {",
    "@media (max-width: 1180px)",
    "@media (max-width: 760px)",
    "@media (prefers-reduced-motion: reduce)",
  ];

  for (const selector of requiredSelectors) {
    assert.ok(stylesSource.includes(selector), `Missing App PRO hierarchy style: ${selector}`);
  }

  assert.match(
    stylesSource,
    /@media \(max-width: 1180px\)[\s\S]*?\.app-pro-panel-heading\s*\{[\s\S]*?min-height:\s*0;/,
    "Stacked panels must release the desktop heading height",
  );
  assert.match(
    stylesSource,
    /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.app-pro-includes-section \.app-pro-include-card:hover\s*\{[\s\S]*?transform:\s*none;/,
    "Reduced-motion users must not receive the hover translation",
  );
});
