import assert from "node:assert/strict";
import test from "node:test";

import { courses, navItems, offer, technicalResources, tiaCourse } from "../src/content.js";
import { englishNavItems, englishTiaCourse, portugueseNavItems, portugueseTiaCourse } from "../src/i18n.js";
import { getRouteMetadata } from "../src/route-metadata.js";

const tiaRoutes = ["/cursos/tia-portal", "/en/courses/tia-portal", "/pt/cursos/tia-portal"];

test("la navegación publica los rótulos TIA exactos en ES EN PT", () => {
  assert.equal(navItems.find(({ path }) => path === "/cursos").children[1].label, "TIA Portal S7-1200/1500 — Próximamente");
  assert.equal(englishNavItems.find(({ path }) => path === "/en/courses").children[1].label, "TIA Portal S7-1200/1500 — Upcoming");
  assert.equal(portugueseNavItems.find(({ path }) => path === "/pt/cursos").children[1].label, "TIA Portal S7-1200/1500 — Em preparação");
});

test("H1 title description OG y WebPage declaran futuro sin inscripción", () => {
  for (const title of [tiaCourse.title, englishTiaCourse.title, portugueseTiaCourse.title]) {
    assert.match(title, /Próximamente|Upcoming|Em preparação/);
  }
  for (const route of tiaRoutes) {
    const metadata = getRouteMetadata(route);
    assert.match(`${metadata.title} ${metadata.description}`, /Próximamente|futuro|Upcoming|upcoming|Em preparação|preparação/);
    assert.match(metadata.description, /inscripción|Enrollment|inscrições/);
    assert.equal(metadata.ogType, "website");
    const serialized = JSON.stringify(metadata.jsonLd);
    assert.match(serialized, /WebPage/);
    assert.doesNotMatch(serialized, /"Course"|"Offer"|"Product"|priceCurrency|hotmart/i);
  }
});

test("la fuente legacy de cursos también identifica TIA como futura", () => {
  const legacyTia = courses.find((course) => course.id === "tia");
  assert.match(`${legacyTia.title} ${legacyTia.shortTitle} ${legacyTia.mode} ${legacyTia.learn}`, /Próximamente|futuro|preparación|previsto/i);
  assert.match(legacyTia.mode, /inscripción todavía no habilitada/i);
});

test("el recurso TIA sigue disponible y separado del curso futuro", () => {
  const resource = technicalResources.find(({ id }) => id === "tia-portal");
  assert.equal(resource.status, "Recurso informativo disponible");
  assert.doesNotMatch(`${resource.title} ${resource.subtitle} ${resource.description}`, /Próximamente|Upcoming|Em preparação/);
  const metadata = getRouteMetadata("/recursos-tecnicos/tia-portal");
  assert.doesNotMatch(`${metadata.title} ${metadata.description}`, /Próximamente|Upcoming|Em preparação/);
});

test("TIA no aparece en ofertas App precios ni checkout", () => {
  const commercial = JSON.stringify(offer);
  assert.doesNotMatch(commercial, /TIA Portal|S7-1200|S7-1500/i);
  for (const route of tiaRoutes) {
    const serialized = JSON.stringify(getRouteMetadata(route));
    assert.doesNotMatch(serialized, /pay\.hotmart\.com|checkout|price/i);
  }
});
