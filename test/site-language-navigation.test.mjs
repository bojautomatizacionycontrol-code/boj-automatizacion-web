import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { offer } from "../src/content.js";
import {
  englishApp,
  englishNavItems,
  languageRoutePairs,
  portugueseApp,
  portugueseNavItems,
} from "../src/i18n.js";
import { getRouteMetadata } from "../src/route-metadata.js";

const appSource = await readFile(new URL("../src/App.jsx", import.meta.url), "utf8");
const indexSource = await readFile(new URL("../index.html", import.meta.url), "utf8");
const sitemapSource = await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8");
const i18nSource = await readFile(new URL("../src/i18n.js", import.meta.url), "utf8");
const stylesSource = await readFile(new URL("../src/styles.css", import.meta.url), "utf8");

const expectedPairs = [
  ["/", "/en", "/pt"],
  ["/inicio", "/en", "/pt"],
  ["/servicios", "/en/services", "/pt/servicos"],
  ["/cursos", "/en/courses", "/pt/cursos"],
  ["/cursos/s7-300-400", "/en/courses/s7-300-400", "/pt/cursos/s7-300-400"],
  ["/cursos/tia-portal", "/en/courses/tia-portal", "/pt/cursos/tia-portal"],
  ["/app", "/en/app", "/pt/app"],
  ["/obras", "/en/projects", "/pt/projetos"],
  ["/contacto", "/en/contact", "/pt/contato"],
];

test("publica rutas inglesas y portuguesas equivalentes sin mover las rutas españolas", () => {
  assert.deepEqual(languageRoutePairs.map(({ es, en, pt }) => [es, en, pt]), expectedPairs);
  assert.deepEqual(englishNavItems.map(({ path }) => path), [
    "/en",
    "/en/services",
    "/en/courses",
    "/en/app",
    "/en/projects",
    "/en/contact",
  ]);
  assert.deepEqual(portugueseNavItems.map(({ path }) => path), [
    "/pt",
    "/pt/servicos",
    "/pt/cursos",
    "/pt/app",
    "/pt/projetos",
    "/pt/contato",
  ]);

  for (const [, englishPath, portuguesePath] of expectedPairs) {
    assert.match(appSource, new RegExp(`"${englishPath.replaceAll("/", "\\/")}"`));
    assert.match(appSource, new RegExp(`"${portuguesePath.replaceAll("/", "\\/")}"`));
  }
});

test("el selector ofrece ES, EN y PT, persiste la elección y no fuerza una redirección", () => {
  const suggestionStart = appSource.indexOf("function LanguageSuggestion");
  const suggestionEnd = appSource.indexOf("function HeroAction", suggestionStart);
  const suggestionSource = appSource.slice(suggestionStart, suggestionEnd);

  assert.match(appSource, /function LanguageSwitcher/);
  assert.match(appSource, /hrefLang="es"/);
  assert.match(appSource, /hrefLang="en"/);
  assert.match(appSource, /hrefLang="pt-BR"/);
  assert.match(appSource, /boj-site-language/);
  assert.match(suggestionSource, /window\.navigator\.languages\?\.\[0\]/);
  assert.match(suggestionSource, /English version available/);
  assert.match(suggestionSource, /Versão em português disponível/);
  assert.match(suggestionSource, /normalizedLanguage\.startsWith\("pt"\)/);
  assert.match(suggestionSource, /Continue in Spanish/);
  assert.doesNotMatch(suggestionSource, /location\.(?:assign|replace)|history\.replaceState/);
  assert.doesNotMatch(suggestionSource, /fetch\(|sendBeacon\(|XMLHttpRequest/);
});

test("mantiene el selector visible en el extremo derecho del encabezado", () => {
  const headerStart = appSource.indexOf("function Header(");
  const headerEnd = appSource.indexOf("function LanguageSwitcher", headerStart);
  const headerSource = appSource.slice(headerStart, headerEnd);
  const desktopActions = headerSource.slice(
    headerSource.indexOf('<div className="header-actions">'),
    headerSource.indexOf('<div className="mobile-header-controls">'),
  );
  const mobileControls = headerSource.slice(headerSource.indexOf('<div className="mobile-header-controls">'));

  assert.ok(desktopActions.indexOf("routeAction.label") < desktopActions.indexOf("<LanguageSwitcher"));
  assert.match(mobileControls, /<LanguageSwitcher route=\{route\} language=\{language\} \/>/);
  assert.match(mobileControls, /className="nav-toggle"/);
  assert.doesNotMatch(headerSource.slice(headerSource.indexOf('<div className="mobile-nav-actions">'), headerSource.indexOf("</nav>")), /LanguageSwitcher/);
  assert.match(stylesSource, /\.mobile-header-controls\s*\{[\s\S]*?display:\s*none/);
  assert.match(stylesSource, /@media \(max-width: 1100px\)[\s\S]*?\.site-header \.mobile-header-controls\s*\{[\s\S]*?display:\s*flex/);
});

test("recuerda una elección explícita en inglés o portugués sin redirigir por idioma del navegador", () => {
  const appStart = appSource.indexOf("function App()");
  const appEnd = appSource.indexOf("function RouteView", appStart);
  const appComponentSource = appSource.slice(appStart, appEnd);

  assert.match(appComponentSource, /savedLanguage === "en" \|\| savedLanguage === "pt"/);
  assert.match(appComponentSource, /const savedHome = `\/\$\{savedLanguage\}`/);
  assert.doesNotMatch(appComponentSource, /navigator\.language|navigator\.languages/);
});

test("actualiza idioma, metadatos, canonical y hreflang por ruta", () => {
  assert.match(appSource, /document\.documentElement\.lang = language === "pt" \? "pt-BR" : language/);
  assert.match(appSource, /meta\[property="og:locale"\]/);
  assert.match(appSource, /meta\[name="twitter:title"\]/);
  assert.match(appSource, /meta\[name="twitter:description"\]/);
  assert.match(appSource, /link\[rel="alternate"\]\[hreflang\]/);

  assert.deepEqual(getRouteMetadata("/app").alternates.map(({ hreflang }) => hreflang), [
    "es",
    "en",
    "pt-BR",
    "x-default",
  ]);
  assert.deepEqual(getRouteMetadata("/terminos").alternates, []);

  assert.match(indexSource, /rel="alternate" hreflang="es" href="https:\/\/www\.bojautomatizacion\.com\/"/);
  assert.match(indexSource, /rel="alternate" hreflang="en" href="https:\/\/www\.bojautomatizacion\.com\/en"/);
  assert.match(indexSource, /rel="alternate" hreflang="pt-BR" href="https:\/\/www\.bojautomatizacion\.com\/pt"/);
  assert.match(indexSource, /rel="alternate" hreflang="x-default"/);

  for (const [, englishPath, portuguesePath] of expectedPairs) {
    assert.ok(sitemapSource.includes(`<loc>https://www.bojautomatizacion.com${englishPath}</loc>`));
    assert.ok(sitemapSource.includes(`<loc>https://www.bojautomatizacion.com${portuguesePath}</loc>`));
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
  const landingStart = appSource.indexOf("function LocalizedS7SalesLanding(");
  const landingEnd = appSource.indexOf("function EnglishS7CoursePage()", landingStart);
  const landingSource = appSource.slice(landingStart, landingEnd);
  const copyStart = appSource.indexOf("const localizedS7SalesCopy = {");
  const copyEnd = appSource.indexOf("function LocalizedS7MethodStrip", copyStart);
  const copySource = appSource.slice(copyStart, copyEnd);

  assert.equal(offer.course.price, "89 USD");
  assert.equal(offer.course.checkout.checkoutUrl, "https://pay.hotmart.com/P106348963R?off=srrm5ewf");
  assert.match(pageSource, /LocalizedS7SalesLanding language="en" courseCopy=\{englishS7Course\}/);
  assert.match(landingSource, /const checkoutUrl = offer\.course\.checkout\.checkoutUrl/);
  assert.equal(landingSource.match(/href=\{checkoutUrl\}/g)?.length, 2);
  assert.equal(landingSource.match(/href: checkoutUrl/g)?.length, 1);
  assert.match(copySource, /One-time payment/);
  assert.match(copySource, /Permanent course access/);
  assert.match(copySource, /1 month of BOJ S7-PLC PRO/i);
  assert.match(copySource, /Course materials are currently available in Spanish/);
  assert.match(copySource, /Course language: Spanish/);
  assert.doesNotMatch(`${pageSource}${landingSource}${copySource}`, /priceValidUntil|promotion/i);
});

test("la versión portuguesa toma precios y href de la fuente comercial vigente", () => {
  const sourcePlans = [
    offer.app.trialPlan,
    ...offer.app.proPlans.filter(({ title }) => title !== "Curso + licencia"),
  ];
  const matrix = sourcePlans.map((plan) => ({
    sourceTitle: plan.title,
    portugueseTitle: portugueseApp.planCopy[plan.title].title,
    price: portugueseApp.planCopy[plan.title].price || plan.price,
    href: plan.url,
  }));

  assert.deepEqual(matrix, [
    { sourceTitle: "Prueba gratuita", portugueseTitle: "Teste gratuito", price: "Gratuito", href: "https://app.bojautomatizacion.com/" },
    { sourceTitle: "Suscripción mensual", portugueseTitle: "Assinatura mensal", price: "49 USD", href: "https://pay.hotmart.com/C107081619V?off=yzyw7mys" },
    { sourceTitle: "Mensual de pago único", portugueseTitle: "Licença mensal de pagamento único", price: "59 USD", href: "https://pay.hotmart.com/B107066308U?off=l23qsbj9" },
    { sourceTitle: "Profesional", portugueseTitle: "Profissional", price: "249 USD", href: "https://pay.hotmart.com/B107069067M?off=hea8bgc1" },
    { sourceTitle: "Empresarial", portugueseTitle: "Empresarial", price: "549 USD", href: "https://pay.hotmart.com/Q107075095G?off=kbs1xzpq" },
  ]);

  const pageStart = appSource.indexOf("function PortugueseAppPage()");
  const pageEnd = appSource.indexOf("function PortugueseS7CoursePage()", pageStart);
  const pageSource = appSource.slice(pageStart, pageEnd);
  assert.match(pageSource, /const pricingCards = \[appTrialPlan, \.\.\.appLicensePlans\]/);
  assert.equal(pageSource.match(/href=\{plan\.url\}/g)?.length, 1);
  assert.match(pageSource, /language: "pt"/);
  assert.doesNotMatch(i18nSource, /pay\.hotmart\.com/);
});

test("la landing portuguesa conserva la oferta y los tres CTA del curso, con aviso de idioma", () => {
  const pageStart = appSource.indexOf("function PortugueseS7CoursePage()");
  const pageEnd = appSource.indexOf("function PortugueseProjectsPage()", pageStart);
  const pageSource = appSource.slice(pageStart, pageEnd);
  const landingStart = appSource.indexOf("function LocalizedS7SalesLanding(");
  const landingEnd = appSource.indexOf("function EnglishS7CoursePage()", landingStart);
  const landingSource = appSource.slice(landingStart, landingEnd);
  const copyStart = appSource.indexOf("const localizedS7SalesCopy = {");
  const copyEnd = appSource.indexOf("function LocalizedS7MethodStrip", copyStart);
  const copySource = appSource.slice(copyStart, copyEnd);

  assert.equal(offer.course.price, "89 USD");
  assert.equal(offer.course.checkout.checkoutUrl, "https://pay.hotmart.com/P106348963R?off=srrm5ewf");
  assert.match(pageSource, /LocalizedS7SalesLanding language="pt" courseCopy=\{portugueseS7Course\}/);
  assert.match(landingSource, /const checkoutUrl = offer\.course\.checkout\.checkoutUrl/);
  assert.equal(landingSource.match(/href=\{checkoutUrl\}/g)?.length, 2);
  assert.equal(landingSource.match(/href: checkoutUrl/g)?.length, 1);
  assert.match(copySource, /Pagamento único/);
  assert.match(copySource, /Acesso permanente/);
  assert.match(copySource, /conteúdo do curso está disponível em espanhol/i);
  assert.match(copySource, /Idioma do curso: espanhol/);
  assert.doesNotMatch(`${pageSource}${landingSource}${copySource}`, /priceValidUntil|promoção vencida/i);
});
