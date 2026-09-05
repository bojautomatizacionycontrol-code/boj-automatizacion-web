import { readRuntimeAppSource } from "./helpers/runtime-app-source.mjs";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { tiaCourse } from "../src/content.js";
import {
  englishServices,
  englishTiaCourse,
  portugueseServices,
  portugueseTiaCourse,
} from "../src/i18n.js";

const appSource = await readRuntimeAppSource();

function sourceBetween(startMarker, endMarker) {
  const start = appSource.indexOf(startMarker);
  const end = appSource.indexOf(endMarker, start);
  assert.notEqual(start, -1, `No se encontró el inicio: ${startMarker}`);
  assert.notEqual(end, -1, `No se encontró el final: ${endMarker}`);
  return appSource.slice(start, end);
}

function assertOrdered(source, markers) {
  let previous = -1;
  for (const marker of markers) {
    const position = source.indexOf(marker);
    assert.ok(position > previous, `Falta o está fuera de orden: ${marker}`);
    previous = position;
  }
}

test("Servicios mantiene en EN y PT el mismo orden visual alternado de español", () => {
  const pages = [
    sourceBetween("function EnglishServicesPage()", "function EnglishProjectsPage"),
    sourceBetween("function PortugueseServicesPage()", "function PortugueseProjectsPage"),
  ];
  const markers = [
    "services-areas-section",
    "services-main-section",
    "services-field-section",
    "services-secondary-section",
    "services-workflow-section",
    "services-redesign-cta",
  ];

  for (const page of pages) {
    assertOrdered(page, markers);
    assert.deepEqual(
      [...page.matchAll(/data-surface="(light|dark)"/g)].map((match) => match[1]),
      ["light", "dark", "light", "dark", "light", "dark"],
    );
    assert.match(page, /\.secondary\.map/);
  }
  assert.equal(englishServices.secondary.length, 3);
  assert.equal(portugueseServices.secondary.length, 3);
  for (const service of [...englishServices.secondary, ...portugueseServices.secondary]) {
    assert.equal(typeof service.text, "string");
    assert.equal(service.applications.length, 4);
  }
});

test("App reutiliza la galería real y todos los bloques comerciales de español en EN y PT", () => {
  const pages = [
    sourceBetween("function EnglishAppPage()", "function PortugueseAppHeroDiagnosticPreview()"),
    sourceBetween("function PortugueseAppPage()", "function AppRoutes"),
  ];

  for (const page of pages) {
    assertOrdered(page, [
      "AppHeroDiagnosticPreview",
      "S7ProofStrip",
      "AppQuickCommercialAccess",
      "app-pro-positioning-section",
      "app-pro-problems-how-section",
      "app-pro-includes-section",
      "app-pro-real-language-section",
      "app-pro-plans-section",
      "LocalizedAppObjection",
      "app-pro-value-row-section",
      "app-pro-trust-section",
      "S7Testimonials",
      "app-pro-faq-section",
    ]);
    assert.match(page, /LocalizedAppPlanGuide/);
    assert.match(page, /<AppRealViewGallery/);
    assert.equal(page.match(/href=\{plan\.url\}/g)?.length, 1);
  }

  const preview = sourceBetween("const appHeroPreviewCopy =", "const appQuickAccessCopy =");
  assert.match(preview, /src=\{appEstadoCpuDesktop\}/);
  assert.match(preview, /src=\{appEstadoCpuMobile\}/);
  assert.doesNotMatch(preview, /appSadDevicePreview|app-hero-diagnostic-preview-screen--device-composite/);
  assert.doesNotMatch(preview, /appResultadoDiagnostico|app-hero-diagnostic-preview-focus/);
  assert.match(appSource, /const appRealViewCopyByLanguage = \{/);
  assert.match(appSource, /const englishAppRealViews = localizeAppRealViews\("en"\)/);
  assert.match(appSource, /const portugueseAppRealViews = localizeAppRealViews\("pt"\)/);
  assert.equal((appSource.match(/<AppRealViewGallery/g) || []).length, 3);
  assert.doesNotMatch(appSource, /englishApp\.views\.map|portugueseApp\.views\.map/);
});

test("TIA Portal conserva la landing completa y traducida en los tres idiomas", () => {
  const englishPage = sourceBetween("function EnglishTiaCoursePage()", "function PortugueseTiaCoursePage()");
  const portuguesePage = sourceBetween("function PortugueseTiaCoursePage()", "function InfoBlock");

  assert.match(englishPage, /course=\{englishTiaCourse\}/);
  assert.match(englishPage, /afterHero=\{<CoursePreparationStrip language="en" \/>\}/);
  assert.match(portuguesePage, /course=\{portugueseTiaCourse\}/);
  assert.match(portuguesePage, /afterHero=\{<CoursePreparationStrip language="pt" \/>\}/);
  assert.doesNotMatch(`${englishPage}${portuguesePage}`, /heroPrimary|heroSecondary|whatsappUrl|Consultar disponibilidade|Ask about availability/);

  for (const translatedCourse of [englishTiaCourse, portugueseTiaCourse]) {
    for (const key of ["audience", "modules", "learnItems", "benefits", "outcomes", "avoidMistakes", "difference"]) {
      assert.equal(translatedCourse[key].length, tiaCourse[key].length, `${key} debe conservar la misma estructura`);
    }
  }
});

test("el curso S7 comparte las catorce secciones y tres CTA de compra en EN y PT", () => {
  const landing = sourceBetween("function LocalizedS7SalesLanding(", "function EnglishS7CoursePage()");
  assertOrdered(landing, [
    "<Hero",
    "S7ProofStrip",
    "s7-sales-learning",
    "s7-sales-includes",
    "s7-sales-program",
    "s7-sales-audience",
    "s7-sales-instructor",
    "s7-sales-offer",
    "LocalizedS7MethodStrip",
    "s7-sales-problem",
    "s7-sales-mistakes-light",
    "S7Testimonials",
    "s7-sales-faq",
    "s7-sales-final-cta",
  ]);
  assert.equal(landing.match(/href=\{checkoutUrl\}/g)?.length, 2);
  assert.equal(landing.match(/href: checkoutUrl/g)?.length, 1);
  assert.match(landing, /data-language=\{language\}/);
  assert.match(landing, /data-surface="dark"/);
  assert.match(landing, /data-surface="light"/);

  assert.match(appSource, /LocalizedS7SalesLanding language="en" courseCopy=\{englishS7Course\}/);
  assert.match(appSource, /LocalizedS7SalesLanding language="pt" courseCopy=\{portugueseS7Course\}/);
});

test("Contacto agrega los mismos caminos de decisión y cierre útil en EN y PT", () => {
  const englishPage = sourceBetween("function EnglishContactPage()", "const portugueseContactServices");
  const portuguesePage = sourceBetween("function PortugueseContactPage()", "function GraciasPage()");

  for (const [page, language] of [[englishPage, "en"], [portuguesePage, "pt"]]) {
    assert.match(page, new RegExp(`<LocalizedContactDecisionGrid language="${language}" \\/>`));
    assert.match(page, new RegExp(`<LocalizedContactQuickServices language="${language}" \\/>`));
    assert.ok(page.indexOf("LocalizedContactDecisionGrid") < page.indexOf('className="contact-grid"'));
    assert.ok(page.indexOf('className="contact-grid"') < page.indexOf("LocalizedContactQuickServices"));
  }
});
