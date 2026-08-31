import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { readCssBundle } from "./helpers/css-source.mjs";

const appSource = await readFile(new URL("../src/App.jsx", import.meta.url), "utf8");
const stylesSource = await readCssBundle();

const servicesStart = appSource.indexOf("function ServicesPage()");
const servicesEnd = appSource.indexOf("function ServicePrimaryCard", servicesStart);
const servicesSource = appSource.slice(servicesStart, servicesEnd);

test("servicios abre con una propuesta clara y una orientacion inicial", () => {
  assert.ok(servicesStart >= 0 && servicesEnd > servicesStart);
  assert.match(servicesSource, /eyebrow="Servicios industriales"/);
  assert.match(servicesSource, /title="Diagnóstico e ingeniería para resolver fallas y sostener la operación"/);
  assert.match(servicesSource, /href:\s*"\/servicios#areas-de-servicio"/);
  assert.match(servicesSource, /className="services-intake-card"/);
  assert.match(servicesSource, /¿Qué está pasando en planta\?/);
  assert.match(servicesSource, /Falla o parada/);
  assert.match(servicesSource, /Equipo involucrado/);
  assert.match(servicesSource, /Evidencia disponible/);
  assert.equal(servicesSource.match(/className="services-intake-card"/g)?.length, 1);
});

test("la pagina ordena decision, alcance y evidencia antes del cierre comercial", () => {
  const orderedMarkers = [
    "services-areas-section",
    "services-main-section",
    "services-field-section",
    "services-secondary-section",
    "services-workflow-section",
    "services-redesign-cta",
  ];

  const positions = orderedMarkers.map((marker) => servicesSource.indexOf(marker));
  positions.forEach((position, index) => {
    assert.notEqual(position, -1, `Falta el bloque ${orderedMarkers[index]}`);
  });
  positions.slice(1).forEach((position, index) => {
    assert.ok(positions[index] < position, `${orderedMarkers[index]} debe preceder a ${orderedMarkers[index + 1]}`);
  });
});

test("las seis secciones comerciales alternan superficies claras y oscuras", () => {
  const expectedSurfaces = [
    ["services-areas-section", "light"],
    ["services-main-section", "dark"],
    ["services-field-section", "light"],
    ["services-secondary-section", "dark"],
    ["services-workflow-section", "light"],
    ["services-redesign-cta", "dark"],
  ];

  for (const [className, surface] of expectedSurfaces) {
    assert.match(
      servicesSource,
      new RegExp(`<section className="[^"]*${className}[^"]*"[^>]*data-surface="${surface}"`),
    );
  }

  assert.deepEqual(
    [...servicesSource.matchAll(/data-surface="(light|dark)"/g)].map((match) => match[1]),
    ["light", "dark", "light", "dark", "light", "dark"],
  );
});

test("la reorganizacion conserva los servicios vigentes y elimina las obras destacadas", () => {
  [
    "serviceWorkflowCards",
    "servicesAreaCards",
    "mainServiceCards",
    "servicesExperienceCards",
    "secondaryServiceCards",
  ].forEach((collection) => {
    assert.equal(servicesSource.match(new RegExp(`${collection}\\.map`, "g"))?.length, 1);
  });

  assert.doesNotMatch(appSource, /const servicesFeaturedWorks =/);
  assert.doesNotMatch(servicesSource, /services-works-section|Obras e intervenciones destacadas/);
  assert.equal(servicesSource.match(/services-workflow-section/g)?.length, 1);
  assert.match(servicesSource, /Solicitar diagnóstico/);
  assert.match(servicesSource, /whatsappUrl\(/);
  assert.match(servicesSource, /href="\/contacto"/);
});

test("el hero opcional y la tarjeta de orientacion tienen layout responsive", () => {
  assert.match(appSource, /function Hero\(\{ image, eyebrow, title, subtitle, primary, secondary, note, aside \}\)/);
  assert.match(appSource, /boj-hero-inner--with-aside/);
  assert.match(stylesSource, /\.services-redesign-page \.boj-hero-inner--with-aside/);
  assert.match(stylesSource, /\.services-intake-card/);
  assert.match(
    stylesSource,
    /\.services-redesign-page \.boj-hero-inner--with-aside\s*\{[\s\S]*?width: min\(calc\(100% - 72px\), 1240px\);[\s\S]*?margin-inline: auto;/,
  );
  assert.match(stylesSource, /@media \(max-width: 900px\)/);
  assert.match(
    stylesSource,
    /@media \(max-width: 900px\)[\s\S]*?\.services-redesign-page \.boj-hero-inner--with-aside\s*\{[\s\S]*?width: min\(calc\(100% - 32px\), 720px\);/,
  );
  assert.match(stylesSource, /@media \(max-width: 640px\)/);
  assert.match(
    stylesSource,
    /@media \(max-width: 640px\)[\s\S]*?\.services-redesign-page \.boj-hero-inner--with-aside\s*\{[\s\S]*?width: min\(calc\(100% - 28px\), 560px\);/,
  );
});
