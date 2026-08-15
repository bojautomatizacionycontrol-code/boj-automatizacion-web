import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
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

test("el encabezado adapta su CTA sin agregar checkouts nuevos", () => {
  const headerSource = sourceBetween("function Header({ route })", "function HeroAction");

  assert.match(headerSource, /route === "\/app"[\s\S]*?label: "Ver planes PRO", href: "#planes-pro"/);
  assert.match(headerSource, /route === "\/cursos\/s7-300-400"[\s\S]*?label: "Ver curso y precio", href: "#curso-s7-compra"/);
  assert.match(headerSource, /route === "\/contacto"[\s\S]*?label: "Completar consulta", href: "#consulta-tecnica"/);
  assert.match(headerSource, /label: "Solicitar diagnóstico"/);
  assert.doesNotMatch(headerSource, /pay\.hotmart\.com/);
  assert.equal(headerSource.match(/\{routeAction\.label\}/g)?.length, 2);
});

test("inicio ofrece tres caminos claros dentro del hero", () => {
  const navigatorSource = sourceBetween("function HomeHeroNavigator()", "function CourseHeroPreview()");
  const homeSource = sourceBetween("function HomeLandingRedesign()", "function HomeClientStrip()");

  const expectedPaths = [
    ["Resolver una falla", "/servicios"],
    ["Formar al equipo", "/cursos"],
    ["Probar BOJ S7-PLC", "/app"],
  ];

  for (const [label, href] of expectedPaths) {
    assert.ok(navigatorSource.includes(label), `Falta el acceso: ${label}`);
    assert.ok(navigatorSource.includes(`href: "${href}"`), `Falta el href interno: ${href}`);
  }

  assert.match(homeSource, /aside=\{<HomeHeroNavigator \/>\}/);
  assert.doesNotMatch(navigatorSource, /target="_blank"|pay\.hotmart\.com/);
});

test("App muestra una demostración real y precios antes de la explicación extensa", () => {
  const appPageSource = sourceBetween("function AppPage()", "function WorksPage()");
  const previewSource = sourceBetween("function AppHeroDiagnosticPreview()", "function AppQuickCommercialAccess()");
  const quickAccessSource = sourceBetween("function AppQuickCommercialAccess()", "function HomePage()");

  assert.match(appPageSource, /image=\{appProHeroLaptopVisual\}/);
  assert.match(appPageSource, /aside=\{<AppHeroDiagnosticPreview \/>\}/);
  assert.match(previewSource, /appResultadoDiagnostico/);
  assert.match(previewSource, /Síntoma/);
  assert.match(previewSource, /Hipótesis/);
  assert.match(previewSource, /Verificación/);

  const proofStrip = appPageSource.indexOf("<S7ProofStrip />");
  const quickAccess = appPageSource.indexOf("<AppQuickCommercialAccess />");
  const positioning = appPageSource.indexOf('className="app-pro-positioning-section"');
  assert.ok(proofStrip < quickAccess && quickAccess < positioning);

  assert.match(quickAccessSource, /\{appTrialPlan\.price\} · 48 horas/);
  assert.match(quickAccessSource, /\{subscription\.price\} por mes/);
  assert.match(quickAccessSource, /Desde \{oneTime\.price\}/);
  assert.match(quickAccessSource, /href="#planes-pro"/);
  assert.match(quickAccessSource, /href=\{appProductUrl\}/);
  assert.doesNotMatch(quickAccessSource, /pay\.hotmart\.com/);
});

test("el recorrido comercial muestra los planes antes de las objeciones y evita repetir el Trial", () => {
  const appPageSource = sourceBetween("function AppPage()", "function WorksPage()");
  const realViews = appPageSource.indexOf('className="app-pro-real-language-section"');
  const plans = appPageSource.indexOf('className="app-pro-plans-section"');
  const objection = appPageSource.indexOf('className="app-pro-dark-section app-pro-objection-section"');
  const testimonials = appPageSource.indexOf('<S7Testimonials background="dark" />');

  assert.ok(realViews < plans && plans < objection && objection < testimonials);
  assert.equal(appPageSource.match(/className="app-pro-plans-section"/g)?.length, 1);
  assert.doesNotMatch(appPageSource, /app-pro-trial-section|trial-48|source: "trial_section"/);

  assert.match(appPageSource, /label: "Probar gratis durante 48 horas"[\s\S]*?href: appProductUrl/);
  assert.match(appPageSource, /<AppQuickCommercialAccess \/>/);
  assert.match(appPageSource, /const pricingCards = \[appTrialPlan, \.\.\.appLicensePlans\];/);
});

test("la consulta final de inicio usa el formulario interno", () => {
  const homeSource = sourceBetween("function HomeLandingRedesign()", "function HomeClientStrip()");
  const finalCtaStart = homeSource.indexOf('className="mock-final-cta"');
  const finalCtaSource = homeSource.slice(finalCtaStart);

  assert.notEqual(finalCtaStart, -1);
  assert.match(finalCtaSource, /href="\/contacto"[\s\S]*?Enviar consulta técnica/);
  assert.doesNotMatch(finalCtaSource, /mailtoUrl|mailto:/);
});

test("el curso se diferencia con una vista previa sin alterar sus checkouts", () => {
  const previewSource = sourceBetween("function CourseHeroPreview()", "function AppHeroDiagnosticPreview()");
  const salesSource = sourceBetween("function S7SalesLanding", "function AppPage()");

  assert.match(previewSource, /manualPreviewImages\[0\]/);
  assert.match(previewSource, /\{offer\.course\.price\}/);
  assert.match(previewSource, /Pago único · Acceso permanente al curso/);
  assert.match(previewSource, /1 mes de BOJ S7-PLC PRO/);
  assert.doesNotMatch(previewSource, /href=|pay\.hotmart\.com/);
  assert.match(salesSource, /aside=\{<CourseHeroPreview \/>\}/);
});

test("el sistema visual nuevo es responsive, accesible y respeta movimiento reducido", () => {
  const requiredPatterns = [
    /\.home-hero-navigator a:focus-visible/,
    /\.app-pro-quick-access-link:focus-visible/,
    /@media \(max-width: 980px\)[\s\S]*?\.app-pro-page > \.boj-hero \.boj-hero-inner--with-aside/,
    /@media \(max-width: 560px\)[\s\S]*?\.app-hero-diagnostic-preview-stages\s*\{[\s\S]*?grid-template-columns:\s*repeat\(3, minmax\(0, 1fr\)\);/,
    /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.app-hero-diagnostic-preview-focus\s*\{[\s\S]*?animation:\s*none;/,
  ];

  for (const pattern of requiredPatterns) {
    assert.match(stylesSource, pattern);
  }

  assert.ok(appSource.includes("Síguenos"));
  assert.doesNotMatch(appSource, />Seguinos</);
});
