import { readRuntimeAppSource } from "./helpers/runtime-app-source.mjs";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { offer } from "../src/content.js";
import { getRouteMetadata } from "../src/route-metadata.js";

const appSource = await readRuntimeAppSource();
const spanishAppPageStart = appSource.indexOf("function AppPage()");
const spanishAppPageEnd = appSource.indexOf("function EnglishAppHeroDiagnosticPreview()", spanishAppPageStart);
const spanishAppPageSource = appSource.slice(spanishAppPageStart, spanishAppPageEnd);

const expectedPlanMatrix = [
  {
    title: "Suscripción mensual",
    price: "49 USD",
    meta: "Por mes · Renovación automática hasta cancelación · 1 dispositivo",
    url: "https://pay.hotmart.com/C107081619V?off=yzyw7mys",
  },
  {
    title: "Mensual de pago único",
    price: "59 USD",
    meta: "Pago único · 1 mes calendario · Sin renovación automática · 1 dispositivo",
    url: "https://pay.hotmart.com/B107066308U?off=l23qsbj9",
  },
  {
    title: "Curso + licencia",
    price: "89 USD",
    meta: "Pago único · Curso permanente · App PRO por 1 mes · 1 dispositivo",
    url: "https://pay.hotmart.com/P106348963R?off=srrm5ewf",
  },
  {
    title: "Profesional",
    price: "249 USD",
    meta: "Pago único · 6 meses · 2 dispositivos · App PRO + Curso",
    url: "https://pay.hotmart.com/B107069067M?off=hea8bgc1",
  },
  {
    title: "Empresarial",
    price: "549 USD",
    meta: "Pago único · 6 meses · 10 dispositivos · App PRO + Curso",
    url: "https://pay.hotmart.com/Q107075095G?off=kbs1xzpq",
  },
];

const expectedAppGridTitles = [
  "Prueba gratuita",
  "Suscripción mensual",
  "Mensual de pago único",
  "Profesional",
  "Empresarial",
];

test("preserva las cinco ofertas pagas con precio, modalidad y checkout exactos", () => {
  const actualPlanMatrix = offer.app.proPlans.map(({ title, price, meta, url }) => ({ title, price, meta, url }));

  assert.deepEqual(actualPlanMatrix, expectedPlanMatrix);
  assert.equal(new Set(actualPlanMatrix.map(({ title }) => title)).size, 5);
  assert.equal(new Set(actualPlanMatrix.map(({ url }) => url)).size, 5);
});

test("mantiene las prestaciones indicadas para cada opción", () => {
  const plans = new Map(offer.app.proPlans.map((plan) => [plan.title, plan]));

  assert.deepEqual(plans.get("Suscripción mensual").bullets, [
    "Sin curso",
    "1 dispositivo",
    "Renovación automática hasta cancelación",
    "Funciona sin conexión hasta 2 días",
    "Acceso completo a diagnósticos PRO",
  ]);
  assert.deepEqual(plans.get("Mensual de pago único").bullets, [
    "Sin curso",
    "1 dispositivo",
    "Sin renovación automática",
    "Funciona sin conexión hasta 2 días",
    "Acceso completo a diagnósticos PRO",
  ]);
  assert.deepEqual(plans.get("Curso + licencia").bullets, [
    "Curso con acceso permanente",
    "App PRO por 1 mes",
    "1 dispositivo",
    "Funciona sin conexión hasta 2 días",
    "Acceso completo a diagnósticos PRO",
  ]);
  assert.deepEqual(plans.get("Profesional").bullets, [
    "Incluye app PRO",
    "Incluye el curso con acceso permanente",
    "Funciona sin conexión hasta 2 días",
    "Ideal para uso profesional recurrente",
  ]);
  assert.deepEqual(plans.get("Empresarial").bullets, [
    "Incluye app PRO",
    "Incluye el curso con acceso permanente",
    "Funciona sin conexión hasta 7 días",
    "Pensado para equipos técnicos y empresas",
  ]);
});

test("separa Curso + licencia de la grilla principal y publica una única franja de capacitación", () => {
  const appGridTitles = [
    offer.app.trialPlan.title,
    ...offer.app.proPlans.filter(({ title }) => title !== "Curso + licencia").map(({ title }) => title),
  ];

  assert.deepEqual(appGridTitles, expectedAppGridTitles);
  assert.equal(appGridTitles.length, 5);
  assert.doesNotMatch(appGridTitles.join("\n"), /Curso \+ licencia/);
  assert.match(
    appSource,
    /const appLicensePlans = appProPlans\.filter\(\(\{ title \}\) => title !== "Curso \+ licencia"\);/
  );
  assert.match(appSource, /const pricingCards = \[appTrialPlan, \.\.\.appLicensePlans\];/);

  const trainingStart = spanishAppPageSource.indexOf('<aside className="app-pro-training-strip"');
  const institutionalStart = spanishAppPageSource.indexOf('<article className="app-pro-institutional">', trainingStart);
  const trainingSource = spanishAppPageSource.slice(trainingStart, institutionalStart);

  assert.notEqual(trainingStart, -1);
  assert.notEqual(institutionalStart, -1);
  assert.equal(spanishAppPageSource.match(/className="app-pro-training-strip"/g)?.length, 1);
  assert.match(trainingSource, /FORMACIÓN TÉCNICA/);
  assert.match(trainingSource, /¿También necesitas formación\?/);
  assert.match(
    trainingSource,
    /Curso Diagnóstico S7-300\/400 con acceso permanente \+ 1 mes de BOJ S7-PLC PRO\./
  );
  assert.match(trainingSource, /\{offer\.course\.price\} · Pago único/);
  assert.match(trainingSource, /Ver curso y contenidos/);
  assert.match(trainingSource, /href="\/cursos\/s7-300-400"/);
  assert.doesNotMatch(trainingSource, /target="_blank"|pay\.hotmart\.com/);
});

test("el listado renderiza exclusivamente la URL propia de cada plan", () => {
  const listStart = spanishAppPageSource.indexOf("{pricingCards.map((plan) => (");
  const listEnd = spanishAppPageSource.indexOf('<article className="app-pro-institutional">', listStart);
  const planListSource = spanishAppPageSource.slice(listStart, listEnd);

  assert.notEqual(listStart, -1);
  assert.notEqual(listEnd, -1);
  assert.equal(planListSource.match(/href=\{plan\.url\}/g)?.length, 1);
  assert.doesNotMatch(planListSource, /href=\{appProductUrl\}/);
});

test("actualiza el curso a 89 USD, pago único y su oferta exacta", () => {
  assert.equal(offer.course.price, "89 USD");
  assert.equal(offer.course.priceValue, 89);
  assert.equal(offer.course.checkout.checkoutUrl, "https://pay.hotmart.com/P106348963R?off=srrm5ewf");
  assert.equal(offer.course.checkout.appMonths, 1);
  assert.equal(offer.course.checkout.devices, 1);
  assert.equal("promotionEndsAt" in offer.course, false);
  assert.match(appSource, /Pago único · curso con acceso permanente/);
  assert.doesNotMatch(appSource, /Precio de lanzamiento/);
  const courseSchema = getRouteMetadata("/cursos/s7-300-400").jsonLd["@graph"]
    .find((node) => node["@type"] === "Course");
  assert.equal(courseSchema.offers.price, "89");
  assert.equal(courseSchema.offers.url, "https://pay.hotmart.com/P106348963R?off=srrm5ewf");
  assert.equal("priceValidUntil" in courseSchema.offers, false);
  assert.equal(appSource.match(/<PurchaseCTA\b/g)?.length, 2);
  assert.equal(appSource.match(/href: purchaseTarget\.href/g)?.length, 1);
});

test("preserva la prueba gratuita y deriva Institucional al contacto", () => {
  assert.deepEqual(offer.app.trialPlan, {
    title: "Prueba gratuita",
    price: "Gratis",
    meta: "48 horas · En línea · Funciones limitadas",
    text: "Prueba inicial para conocer el flujo de diagnóstico de BOJ S7-PLC PRO antes de activar una licencia paga.",
    bullets: [
      "Acceso gratuito durante 48 horas",
      "Funciona sólo en línea",
      "Algunas funciones limitadas",
      "Ideal para conocer la herramienta",
    ],
    button: "Probar gratis durante 48 horas",
    url: "https://app.bojautomatizacion.com/",
  });
  assert.equal(offer.app.productUrl, "https://app.bojautomatizacion.com/");

  const institutionalStart = spanishAppPageSource.indexOf('<article className="app-pro-institutional">');
  const institutionalEnd = spanishAppPageSource.indexOf("</article>", institutionalStart);
  const institutionalSource = spanishAppPageSource.slice(institutionalStart, institutionalEnd);

  assert.notEqual(institutionalStart, -1);
  assert.notEqual(institutionalEnd, -1);
  assert.match(institutionalSource, /href="\/contacto"/);
  assert.doesNotMatch(institutionalSource, /href=\{appProductUrl\}/);
  assert.doesNotMatch(institutionalSource, /target="_blank"/);
  assert.match(institutionalSource, /Consultar condiciones/);
});
