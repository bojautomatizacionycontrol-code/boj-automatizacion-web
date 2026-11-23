import { readRuntimeAppSource, readRuntimeStylesSource } from "./helpers/runtime-app-source.mjs";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { closeWorksSsrRuntime, getActualWorkProjects, renderActualWorksPage } from "./helpers/works-ssr.mjs";

const appSource = await readRuntimeAppSource();
const styleSource = await readRuntimeStylesSource();
test.after(closeWorksSsrRuntime);

test("Cursos diferencia visuales ilustrativos y disponibilidad", () => {
  const illustrativeLabels = appSource.match(/className="visual-disclaimer">Imagen ilustrativa/g) ?? [];

  assert.equal(illustrativeLabels.length, 1);
  assert.match(appSource, /course\.path === "\/cursos\/solidworks" \? "Portada final" : "Imagen ilustrativa"/);
  assert.match(appSource, /status: "Material finalizado"/);
  assert.match(appSource, /actionLabel: "Ver material y precio"/);
  assert.match(appSource, /className="course-status-badge"/);
  assert.match(appSource, /course\.upcoming \? "Próximamente" : "Disponible"/);
  assert.match(styleSource, /\.course-status-badge\s*\{/);
  assert.match(styleSource, /\.course-available-visual \.visual-disclaimer/);
  assert.match(styleSource, /\.resource-card-visual \.visual-disclaimer/);
});

test("Obras prioriza tres casos y mantiene accesible el archivo completo en cada idioma", async () => {
  for (const language of ["es", "en", "pt"]) {
    const projects = await getActualWorkProjects(language);
    const html = await renderActualWorksPage(language);
    const archiveStart = html.indexOf('<details class="works-archive">');
    const archiveEnd = html.indexOf("</details>", archiveStart);
    assert.ok(archiveStart > 0 && archiveEnd > archiveStart, `${language}: archivo nativo desplegable y cerrado inicialmente`);
    const featured = html.slice(0, archiveStart);
    const archive = html.slice(archiveStart, archiveEnd);
    assert.equal((featured.match(/<article\b/g) || []).length, 3, `${language}: exactamente tres casos destacados`);
    assert.equal((archive.match(/<article\b/g) || []).length, projects.length - 3, `${language}: todas las otras obras quedan en el archivo`);
    assert.ok(archive.includes("<summary>"), `${language}: el archivo conserva activación nativa por teclado`);
    const expectedSummary = language === "en" ? `View ${projects.length - 3} additional projects` : language === "pt" ? `Ver ${projects.length - 3} projetos adicionais` : `Ver ${projects.length - 3} obras adicionales`;
    assert.ok(archive.includes(expectedSummary), `${language}: contador y texto localizados del archivo`);
    for (const project of projects.slice(0, 3)) assert.ok(featured.includes(project.title), `${language}: caso destacado ${project.title}`);
    for (const project of projects.slice(3)) assert.ok(archive.includes(project.title), `${language}: caso adicional ${project.title}`);
    assert.ok(featured.includes('class="portfolio-prep"') && featured.includes('class="works-grid"'), `${language}: conserva los bloques visuales actuales`);
  }
  assert.match(styleSource, /\.works-archive > summary\s*\{/);
  assert.match(styleSource, /content-visibility:\s*auto/);
});
