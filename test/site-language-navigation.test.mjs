import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { offer } from "../src/content.js";
import { englishApp, englishNavItems, languageRoutePairs } from "../src/i18n.js";

const appSource = await readFile(new URL("../src/App.jsx", import.meta.url), "utf8");
const indexSource = await readFile(new URL("../index.html", import.meta.url), "utf8");
const sitemapSource = await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8");
const i18nSource = await readFile(new URL("../src/i18n.js", import.meta.url), "utf8");

const expectedPairs = [
  ["/", "/en"],
  ["/inicio", "/en"],
  ["/servicios", "/en/services"],
  ["/cursos", "/en/courses"],
  ["/cursos/s7-300-400", "/en/courses/s7-300-400"],
  ["/cursos/tia-portal", "/en/courses/tia-portal"],
  ["/app", "/en/app"],
  ["/obras", "/en/projects"],
  ["/contacto", "/en/contact"],
];

test("publica rutas inglesas equivalentes sin mover las rutas españolas", () => {
  assert.deepEqual(languageRoutePairs.map(({ es, en }) => [es, en]), expectedPairs);
  assert.deepEqual(englishNavItems.map(({ path }) => path), [
    "/en",
    "/en/services",
    "/en/courses",
    "/en/app",
    "/en/projects",
    "/en/contact",
  ]);

  for (const [, englishPath] of expectedPairs) {
    assert.match(appSource, new RegExp(`"${englishPath.replaceAll("/", "\\/")}"`));
  }
});

test("el selector ofrece ES y EN, persiste la elección y no fuerza una redirección", () => {
  const suggestionStart = appSource.indexOf("function LanguageSuggestion");
  const suggestionEnd = appSource.indexOf("function HeroAction", suggestionStart);
  const suggestionSource = appSource.slice(suggestionStart, suggestionEnd);

  assert.match(appSource, /function LanguageSwitcher/);
  assert.match(appSource, /hrefLang="es"/);
  assert.match(appSource, /hrefLang="en"/);
  assert.match(appSource, /boj-site-language/);
  assert.match(suggestionSource, /window\.navigator\.languages\?\.\[0\]/);
  assert.match(suggestionSource, /English version available/);
  assert.match(suggestionSource, /Continue in Spanish/);
  assert.doesNotMatch(suggestionSource, /location\.(?:assign|replace)|history\.replaceState/);
  assert.doesNotMatch(suggestionSource, /fetch\(|sendBeacon\(|XMLHttpRequest/);
});

test("recuerda una elección explícita en inglés sin redirigir por idioma del navegador", () => {
  const appStart = appSource.indexOf("function App()");
  const appEnd = appSource.indexOf("const KNOWN_ROUTES", appStart);
  const appComponentSource = appSource.slice(appStart, appEnd);

  assert.match(appComponentSource, /savedLanguage === "en"/);
  assert.match(appComponentSource, /window\.history\.replaceState\(null, "", "\/en"\)/);
  assert.doesNotMatch(appComponentSource, /navigator\.language|navigator\.languages/);
});

test("actualiza idioma, metadatos, canonical y hreflang por ruta", () => {
  assert.match(appSource, /document\.documentElement\.lang = language/);
  assert.match(appSource, /meta\[property="og:locale"\]/);
  assert.match(appSource, /meta\[name="twitter:title"\]/);
  assert.match(appSource, /meta\[name="twitter:description"\]/);
  assert.match(appSource, /link\[rel="alternate"\]\[hreflang=/);

  assert.match(indexSource, /rel="alternate" hreflang="es" href="https:\/\/www\.bojautomatizacion\.com\/"/);
  assert.match(indexSource, /rel="alternate" hreflang="en" href="https:\/\/www\.bojautomatizacion\.com\/en"/);
  assert.match(indexSource, /rel="alternate" hreflang="x-default"/);

  for (const [, englishPath] of expectedPairs) {
    assert.ok(sitemapSource.includes(`<loc>https://www.bojautomatizacion.com${englishPath}</loc>`));
  }
});

test("la versión inglesa toma precios y href de la fuente comercial vigente", () => {
  const sourcePlans = [
    offer.app.trialPlan,
    ...offer.app.proPlans.filter(({ title }) => title !== "Curso + licencia"),
  ];
  const matrix = sourcePlans.map((plan) => ({
    sourceTitle: plan.title,
    englishTitle: englishApp.planCopy[plan.title].title,
    price: englishApp.planCopy[plan.title].price || plan.price,
    href: plan.url,
  }));

  assert.deepEqual(matrix, [
    { sourceTitle: "Prueba gratuita", englishTitle: "Free trial", price: "Free", href: "https://app.bojautomatizacion.com/" },
    { sourceTitle: "Suscripción mensual", englishTitle: "Monthly subscription", price: "49 USD", href: "https://pay.hotmart.com/C107081619V?off=yzyw7mys" },
    { sourceTitle: "Mensual de pago único", englishTitle: "One-time monthly license", price: "59 USD", href: "https://pay.hotmart.com/B107066308U?off=l23qsbj9" },
    { sourceTitle: "Profesional", englishTitle: "Professional", price: "249 USD", href: "https://pay.hotmart.com/B107069067M?off=hea8bgc1" },
    { sourceTitle: "Empresarial", englishTitle: "Business", price: "549 USD", href: "https://pay.hotmart.com/Q107075095G?off=kbs1xzpq" },
  ]);

  const englishAppStart = appSource.indexOf("function EnglishAppPage()");
  const englishAppEnd = appSource.indexOf("function EnglishS7CoursePage()", englishAppStart);
  const englishAppSource = appSource.slice(englishAppStart, englishAppEnd);
  assert.match(englishAppSource, /const pricingCards = \[appTrialPlan, \.\.\.appLicensePlans\]/);
  assert.equal(englishAppSource.match(/href=\{plan\.url\}/g)?.length, 1);
  assert.doesNotMatch(i18nSource, /pay\.hotmart\.com/);
});

test("la landing inglesa del curso conserva precio, oferta y tres CTA al checkout único", () => {
  const pageStart = appSource.indexOf("function EnglishS7CoursePage()");
  const pageEnd = appSource.indexOf("function EnglishProjectsPage()", pageStart);
  const pageSource = appSource.slice(pageStart, pageEnd);

  assert.equal(offer.course.price, "89 USD");
  assert.equal(offer.course.checkout.checkoutUrl, "https://pay.hotmart.com/P106348963R?off=srrm5ewf");
  assert.match(pageSource, /const checkoutUrl = offer\.course\.checkout\.checkoutUrl/);
  assert.equal(pageSource.match(/href=\{checkoutUrl\}/g)?.length, 2);
  assert.equal(pageSource.match(/href: checkoutUrl/g)?.length, 1);
  assert.match(pageSource, /One-time payment/);
  assert.match(pageSource, /Permanent course access/);
  assert.match(pageSource, /one month of BOJ S7-PLC PRO/i);
  assert.match(pageSource, /Course materials are currently available in Spanish/);
  assert.match(pageSource, /COURSE CONTENT IN SPANISH/);
  assert.doesNotMatch(pageSource, /priceValidUntil|promotion/i);
});
