import { readRuntimeAppSource } from "./helpers/runtime-app-source.mjs";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { getRouteMetadata } from "../src/route-metadata.js";
import { closeWorksSsrRuntime, getActualWorkProjects, renderActualWorksPage } from "./helpers/works-ssr.mjs";

const appSource = await readRuntimeAppSource();
const contentSource = await readFile(new URL("../src/content.js", import.meta.url), "utf8");
const indexSource = await readFile(new URL("../index.html", import.meta.url), "utf8");

test.after(closeWorksSsrRuntime);

test("Obras identifica las fotografías reales y conserva el alcance en los tres idiomas", async () => {
  const projectStart = appSource.indexOf("function ProjectCard(");
  const projectEnd = appSource.indexOf("function PortfolioPrep(", projectStart);
  const cardSource = appSource.slice(projectStart, projectEnd);
  assert.ok(/project\.realPhoto \? copy\.realPhoto : copy\.illustration/.test(cardSource), "Una ilustración no debe recibir automáticamente la etiqueta de foto real");

  const expectedCopy = {
    es: { title: "Obras y trabajos realizados en entornos industriales", photo: "Fotografía real", illustration: "Imagen ilustrativa", telemetry: "Tableros de telemetría para estaciones de GNC" },
    en: { title: "Engineering and automation work completed in real plants", photo: "Actual project photograph", illustration: "Illustrative image", telemetry: "Telemetry panels for CNG filling stations" },
    pt: { title: "Trabalhos de engenharia e automação realizados em plantas reais", photo: "Fotografia real", illustration: "Imagem ilustrativa", telemetry: "Painéis de telemetria para postos de GNV" },
  };

  for (const [language, copy] of Object.entries(expectedCopy)) {
    const projects = await getActualWorkProjects(language);
    const html = await renderActualWorksPage(language);
    assert.ok(html.includes(copy.title), `${language}: título localizado`);
    assert.ok(html.includes(copy.telemetry), `${language}: caso de telemetría localizado`);
    assert.equal((html.match(/class="works-image-disclaimer"/g) || []).length, projects.length - 1, `${language}: cada ficha común debe identificar su fotografía`);
    assert.equal(html.split(`class="works-image-disclaimer">${copy.photo}`).length - 1, projects.length - 1, `${language}: etiquetas de fotografías reales`);
    assert.ok(!html.includes(copy.illustration), `${language}: las fotografías de campo no deben presentarse como ilustraciones`);

    for (const project of projects) {
      assert.ok(project.realPhoto && project.photo, `${language}: fotografía real asignada a ${project.title}`);
      assert.ok(project.photoAlt?.trim().length > 10, `${language}: descripción accesible de ${project.title}`);
    }
    assert.equal(projects[1].client, "Pluspetrol", `${language}: nombre del cliente confirmado`);
    assert.equal(projects.filter((project) => project.client === "GASNOR").length, 2, `${language}: banco y telemetría son obras distintas`);
    assert.ok(/100/.test(projects[8].intervention), `${language}: cantidad aproximada de tableros`);
    assert.ok(/two(?: field)? teams|dos equipos|duas equipes/i.test(projects[8].result), `${language}: instalación atribuida a los otros equipos de trabajo`);
    assert.ok(/auxiliares|auxiliary/.test(projects[3].description), `${language}: alcance en servicios auxiliares`);
  }

  assert.doesNotMatch(appSource, /Obras reales, no ejemplos de manual|Industrial work, not theoretical examples|Trabalho industrial, não exemplos teóricos/);
  assert.ok(!cardSource.includes("Imagen real (de services-works)"));
});

test("el curso se describe sin limitar el material a dos PDF", () => {
  for (const source of [appSource, contentSource, indexSource]) {
    assert.doesNotMatch(source, /dos PDF descargables/i);
    assert.doesNotMatch(source, /Dos manuales técnicos descargables/);
  }

  assert.match(appSource, /material técnico descargable, guías prácticas/);
  assert.match(contentSource, /Material técnico descargable en PDF con acceso permanente/);
  assert.doesNotMatch(indexSource, /"@type": "Course"|"@type": "Offer"/);
  const courseJsonLd = getRouteMetadata("/cursos/s7-300-400").jsonLd;
  assert.ok(courseJsonLd["@graph"].some((node) => node["@type"] === "Course"));
});

test("las imágenes de Recursos se identifican como ilustrativas y preservan el estado accesible", () => {
  assert.match(appSource, /className="resource-card-visual"/);
  assert.doesNotMatch(appSource, /className="resource-card-visual" aria-hidden="true"/);
  assert.match(appSource, /<img src=\{visual\} alt="" aria-hidden="true" width=\{dimensions\.width\} height=\{dimensions\.height\} loading="lazy" decoding="async" \/>/);
  assert.match(appSource, /className="resource-card-fallback" aria-hidden="true"/);
  assert.match(appSource, /className="visual-disclaimer">Imagen ilustrativa<\/span>/);
  assert.match(appSource, /className="resource-status">\{resource\.status\}<\/span>/);
});
