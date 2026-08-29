import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const appSource = await readFile(new URL("../src/App.jsx", import.meta.url), "utf8");
const stylesSource = await readFile(new URL("../src/styles.css", import.meta.url), "utf8");

test("la guía de decisión enlaza internamente a los cuatro planes pagos vigentes", () => {
  const expectedTargets = {
    "Suscripción mensual": "plan-subscription-monthly",
    "Mensual de pago único": "plan-monthly-one-time",
    Profesional: "plan-professional",
    Empresarial: "plan-company",
  };

  for (const [title, target] of Object.entries(expectedTargets)) {
    assert.match(appSource, new RegExp(`"${title}": "${target}"`));
    assert.match(appSource, new RegExp(`target: appPlanCardIds(?:\\["${title}"\\]|\\.${title})`));
  }

  assert.match(appSource, /href=\{`#\$\{option\.target\}`\}/);
  assert.match(appSource, /id=\{appPlanCardIds\[plan\.title\]\}/);
  const appPageStart = appSource.indexOf("function AppPage()");
  const guideStart = appSource.indexOf('<nav className="app-pro-plan-guide"', appPageStart);
  const guideEnd = appSource.indexOf('<div className="app-pro-plan-grid">', guideStart);
  assert.doesNotMatch(
    appSource.slice(guideStart, guideEnd),
    /pay\.hotmart\.com|target="_blank"/
  );
});

test("la orientación comercial mantiene los derechos exactos de cada plan", () => {
  assert.match(appSource, /Uso continuo/);
  assert.match(appSource, /Pagas mes a mes y la licencia se renueva hasta que la canceles\./);
  assert.match(appSource, /Trabajo puntual/);
  assert.match(appSource, /Un mes calendario de acceso sin renovación automática\./);
  assert.match(appSource, /Seis meses, dos dispositivos y curso incluido\./);
  assert.match(appSource, /Seis meses, diez dispositivos y curso incluido\./);
});

test("la franja de confianza usa sólo hechos verificados y no altera checkouts", () => {
  const confidenceStart = appSource.indexOf('<ul className="app-pro-purchase-confidence"');
  const confidenceEnd = appSource.indexOf("</ul>", confidenceStart);
  const confidenceSource = appSource.slice(confidenceStart, confidenceEnd);

  assert.notEqual(confidenceStart, -1);
  assert.match(confidenceSource, /Compra gestionada por Hotmart/);
  assert.match(confidenceSource, /Precio y modalidad visibles antes de confirmar/);
  assert.match(confidenceSource, /Activación con el correo electrónico utilizado en la compra/);
  assert.doesNotMatch(confidenceSource, /garantiz|reembolso|descuento|pay\.hotmart\.com/iu);
  assert.match(appSource, /href=\{plan\.url\}/);
});

test("la guía conserva foco visible, responsive y movimiento reducido", () => {
  assert.match(stylesSource, /\.app-pro-plan-guide li > a:focus-visible/);
  assert.match(stylesSource, /\.app-pro-plan-card:focus-visible/);
  assert.match(stylesSource, /scroll-margin-top: 104px/);
  assert.match(stylesSource, /@media \(max-width: 980px\)[\s\S]*grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(stylesSource, /@media \(max-width: 600px\)[\s\S]*grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(stylesSource, /@media \(max-width: 600px\)[\s\S]*\.app-pro-plan-guide li > a > small\s*\{[\s\S]*display: none/);
  assert.match(stylesSource, /@media \(max-width: 360px\)[\s\S]*grid-template-columns: 1fr/);
  assert.match(stylesSource, /@media \(prefers-reduced-motion: reduce\)/);
});
