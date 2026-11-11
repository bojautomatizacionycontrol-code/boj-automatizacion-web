import { readRuntimeAppSource, readRuntimeStylesSource } from "./helpers/runtime-app-source.mjs";
import assert from "node:assert/strict";
import test from "node:test";

const appSource = await readRuntimeAppSource();
const stylesSource = await readRuntimeStylesSource();
const trainingStart = appSource.indexOf("const inCompanyTrainingCopy =");
const trainingEnd = appSource.indexOf("function AppDiagnosticMockup(", trainingStart);
const trainingSource = appSource.slice(trainingStart, trainingEnd);

test("Inicio reemplaza el teaser de obras por dos capacitaciones In Company reales", () => {
  assert.match(trainingSource, /function HomeInCompanyTraining\(\{ language = "es" \}\)/);
  assert.match(trainingSource, /title: "Capacitaciones In Company"/);
  assert.match(trainingSource, /client: "Papelera de Tucumán"/);
  assert.match(trainingSource, /Diagnóstico y resolución de fallas en PLC Siemens S7-300 y S7-400/);
  assert.match(trainingSource, /client: "Zíngaras"/);
  assert.match(trainingSource, /Diagnóstico de fallas en electricidad industrial/);
  assert.match(trainingSource, /contribuir a reducir pérdidas asociadas a tiempos excesivos de parada/);
  assert.equal((trainingSource.match(/className=\{`home-in-company-card/g) || []).length, 1);
  assert.doesNotMatch(trainingSource, /works-image-disclaimer|Imagen ilustrativa|Illustrative image|Imagem ilustrativa/);
});

test("las fotos, descripciones y CTA conservan paridad en español, inglés y portugués", () => {
  assert.match(appSource, /papelera-tucuman-capacitacion-plc-s7-grupo\.jpg/);
  assert.match(appSource, /zingaras-capacitacion-electricidad-industrial-grupo\.jpg/);
  assert.match(trainingSource, /Grupo de cinco personas en Papelera de Tucumán/);
  assert.match(trainingSource, /Grupo de siete personas en Zíngaras/);
  assert.match(trainingSource, /title: "In-company training"/);
  assert.match(trainingSource, /title: "Treinamentos In Company"/);
  assert.match(trainingSource, /cta: "Consultar capacitación para mi empresa"/);
  assert.match(trainingSource, /cta: "Ask about training for my company"/);
  assert.match(trainingSource, /cta: "Consultar treinamento para minha empresa"/);
  assert.match(trainingSource, /proof: "Capacitación In Company"/);
  assert.match(trainingSource, /proof: "In-company training"/);
  assert.match(trainingSource, /proof: "Treinamento In Company"/);
  assert.equal((trainingSource.match(/ctaAria:/g) || []).length, 3);
  assert.match(trainingSource, /aria-label=\{copy\.ctaAria\}/);
  assert.equal((appSource.match(/<HomeInCompanyTraining(?: language="(?:en|pt)")? \/>/g) || []).length, 3);
});

test("las dos fotos se sirven responsivamente y la grilla pasa de dos columnas a una", () => {
  assert.match(appSource, /stem: "in-company-papelera-tucuman"[\s\S]{0,220}widths: \[640, 960, 1280\]/);
  assert.match(appSource, /stem: "in-company-zingaras"[\s\S]{0,220}widths: \[640, 960, 1280\]/);
  assert.match(stylesSource, /\.home-in-company-grid\s*\{[\s\S]*?grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(stylesSource, /\.home-in-company-media\s*\{[\s\S]*?aspect-ratio:\s*16 \/ 9/);
  assert.match(stylesSource, /@media \(max-width: 900px\)[\s\S]*?\.home-in-company-grid\s*\{[\s\S]*?grid-template-columns:\s*1fr/);
});

test("la transición hacia testimonios evita el doble espaciado y conserva una separación sutil", () => {
  assert.match(stylesSource, /\.mock-home > \.home-in-company\s*\{[\s\S]*?padding-bottom:\s*32px/);
  assert.match(stylesSource, /\.mock-home > \.home-in-company \+ \.s7-testimonials\s*\{[\s\S]*?padding-top:\s*40px/);
  assert.match(stylesSource, /\.mock-home > \.home-in-company \+ \.s7-testimonials::before\s*\{[\s\S]*?linear-gradient\(90deg, transparent, rgba\(8, 126, 170, 0\.28\), transparent\)/);
  assert.match(stylesSource, /@media \(max-width: 540px\)[\s\S]*?\.mock-home > \.home-in-company\s*\{[\s\S]*?padding-bottom:\s*24px[\s\S]*?\.mock-home > \.home-in-company \+ \.s7-testimonials\s*\{[\s\S]*?padding-top:\s*30px/);
});
