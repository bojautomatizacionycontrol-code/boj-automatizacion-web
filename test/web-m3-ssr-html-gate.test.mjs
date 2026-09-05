import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";

import {
  getRouteMetadata,
  publicRoutePaths,
} from "../src/route-metadata.js";
import {
  generateRouteHtml,
  getSameDocumentFragmentIds,
  outputFileForRoute,
  renderRouteMetadataFragment,
  SSR_HTML_DOCUMENT_BUDGET,
  SSR_HTML_MATRIX_BUDGET,
  validateHtmlBudgets,
  validatePrerenderMarkup,
} from "../scripts/generate-route-html.mjs";
import { verifyPrerenderedHtmlBuild } from "../scripts/verify-web-m3-build.mjs";

function templateFor(metadata = getRouteMetadata("/")) {
  return `<!doctype html>
<html lang="es">
  <head>
${renderRouteMetadataFragment(metadata)}
    <link rel="icon" href="/favicon-fixture.png" />
    <link rel="stylesheet" href="/assets/index-fixture-abcd1234.css" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" crossorigin src="/assets/index-fixture-abcd1234.js"></script>
  </body>
</html>`;
}

function prerenderFixture(route, buildYear) {
  return `<a class="skip-link" href="#main-content">Saltar al contenido principal</a>` +
    `<header><nav aria-label="Navegación principal">` +
    `<a href="/">Inicio</a><a href="/servicios">Servicios</a><a href="/cursos">Cursos</a>` +
    `<a href="/app">App</a><a href="/contacto">Contacto</a></nav></header>` +
    `<main id="main-content"><h1>Contenido técnico de ${route}</h1>` +
    `<p>Diagnóstico industrial, automatización y formación técnica con información útil disponible antes de ejecutar JavaScript.</p>` +
    `<a href="#detalle-tecnico">Ver detalle técnico</a>` +
    `<section id="detalle-tecnico"><h2>Detalle técnico verificable</h2>` +
    `<p>Información semántica suficiente para identificar el destino del enlace incluso sin JavaScript.</p></section>` +
    `<img src="/assets/fixture-body-abcd1234.webp" alt="" width="640" height="480" />` +
    `</main><footer><nav aria-label="Navegación del footer"><a href="/recursos-tecnicos">Recursos</a></nav>` +
    `© ${buildYear} BOJ Automatización y Control</footer>`;
}

async function createGeneratedFixture() {
  const directory = await mkdtemp(join(tmpdir(), "boj-web-m3-ssr-gate-"));
  await writeFile(join(directory, "index.html"), templateFor(), "utf8");
  await mkdir(join(directory, "assets"), { recursive: true });
  await writeFile(join(directory, "assets", "index-fixture-abcd1234.js"), "export {};", "utf8");
  await writeFile(
    join(directory, "assets", "index-fixture-abcd1234.css"),
    'body { background-image: url("./css-fixture-abcd1234.webp"); }',
    "utf8"
  );
  await writeFile(join(directory, "assets", "css-fixture-abcd1234.webp"), "fixture", "utf8");
  await writeFile(join(directory, "assets", "fixture-body-abcd1234.webp"), "fixture", "utf8");
  await writeFile(join(directory, "favicon-fixture.png"), "fixture", "utf8");

  const socialImages = new Set(
    [...publicRoutePaths, "/__boj_not_found__"]
      .map((route) => new URL(getRouteMetadata(route).image).pathname.replace(/^\/+/, ""))
  );
  for (const image of socialImages) {
    const imagePath = join(directory, image);
    await mkdir(dirname(imagePath), { recursive: true });
    await writeFile(imagePath, "fixture", "utf8");
  }

  const generated = await generateRouteHtml(directory, {
    renderRoute: async (route, year) => prerenderFixture(route, year),
    buildYear: 2026,
  });
  return { directory, generated };
}

test("valida fail-closed cada fragmento propio, único y semántico del SSR completo", () => {
  const valid = prerenderFixture("/servicios", 2026)
    .replace('href="#detalle-tecnico"', 'href="/servicios#detalle-t%C3%A9cnico"')
    .replace('id="detalle-tecnico"', 'id="detalle-técnico"');

  const result = validatePrerenderMarkup(valid, "/servicios");
  assert.deepEqual(result.fragments, ["main-content", "detalle-técnico"]);
  assert.deepEqual(getSameDocumentFragmentIds(valid, "/servicios"), result.fragments);
  assert.ok(result.internalLinks >= 5);

  const differentQuery = valid
    .replace('href="/servicios#detalle-t%C3%A9cnico"', 'href="/servicios?preview=1#ausente"')
    .replace(' id="detalle-técnico"', "");
  assert.deepEqual(getSameDocumentFragmentIds(differentQuery, "/servicios"), ["main-content"]);
  validatePrerenderMarkup(differentQuery, "/servicios");

  const crossDocument = valid
    .replace('href="/servicios#detalle-t%C3%A9cnico"', 'href="/app#destino-remoto"')
    .replace(' id="detalle-técnico"', "");
  assert.deepEqual(getSameDocumentFragmentIds(crossDocument, "/servicios"), ["main-content"]);
  validatePrerenderMarkup(crossDocument, "/servicios");

  assert.throws(
    () => validatePrerenderMarkup(valid.replace('id="detalle-técnico"', 'id="otro-destino"'), "/servicios"),
    /destino #detalle-técnico.*actual=0/
  );
  assert.throws(
    () => validatePrerenderMarkup(
      valid.replace("</section>", '<span id="detalle-técnico">Duplicado semántico</span></section>'),
      "/servicios"
    ),
    /destino #detalle-técnico.*actual=2/
  );
  assert.throws(
    () => validatePrerenderMarkup(
      valid.replace(/<section id="detalle-técnico">[\s\S]*?<\/section>/, '<span id="detalle-técnico"></span>'),
      "/servicios"
    ),
    /semántico insuficiente/
  );
  assert.throws(
    () => validatePrerenderMarkup(valid.replace("#detalle-t%C3%A9cnico", "#"), "/servicios"),
    /fragmento vacío/
  );
  assert.throws(
    () => validatePrerenderMarkup(valid.replace("#detalle-t%C3%A9cnico", "#%E0%A4%A"), "/servicios"),
    /fragmento inválido/
  );
});

test("exige estructura no-JS útil: main identificado, H1 único, navegación y cinco destinos internos", () => {
  const valid = prerenderFixture("/servicios", 2026);
  validatePrerenderMarkup(valid, "/servicios");

  assert.throws(
    () => validatePrerenderMarkup(valid.replace(' id="main-content"', ""), "/servicios"),
    /main#main-content/
  );
  assert.throws(
    () => validatePrerenderMarkup(valid.replace("</h1>", "</h1><h1>Duplicado</h1>"), "/servicios"),
    /exactamente un h1/
  );
  assert.throws(
    () => validatePrerenderMarkup(valid.replace(/<nav\b[\s\S]*?<\/nav>/g, "<div>Navegación removida</div>"), "/servicios"),
    /header|navegación enlazada/
  );
  assert.throws(
    () => validatePrerenderMarkup(
      valid.replace(/<nav\b[\s\S]*?<\/nav>/, '<nav><a href="/">Inicio</a></nav>'),
      "/servicios"
    ),
    /enlaces internos insuficientes/
  );
  assert.throws(
    () => validatePrerenderMarkup(valid.replace("<h1", "<h1 hidden"), "/servicios"),
    /ocultar el h1/
  );
  assert.throws(
    () => validatePrerenderMarkup(valid.replace('id="detalle-tecnico"', 'id="detalle-tecnico" aria-hidden="true"'), "/servicios"),
    /destino #detalle-tecnico está oculto/
  );
  assert.throws(
    () => validatePrerenderMarkup(valid.replace('href="/contacto"', 'href="/fake-no-publicable"'), "/servicios"),
    /enlace interno sin destino publicable/
  );
  validatePrerenderMarkup(
    valid.replace('href="/contacto"', 'href="/descargas/manual-tecnico.pdf" download'),
    "/servicios"
  );
  assert.throws(
    () => validatePrerenderMarkup(valid.replace("<main", '<!--$?--><template id="B:0"></template><main'), "/servicios"),
    /Suspense/
  );
});

test("aplica presupuestos HTML por documento y para la matriz completa", () => {
  const result = validateHtmlBudgets([
    { label: "a.html", html: "contenido útil" },
    { label: "b.html", html: "otro contenido útil" },
  ]);
  assert.equal(result.count, 2);

  assert.throws(
    () => validateHtmlBudgets([{ label: "grande.html", html: "x".repeat(SSR_HTML_DOCUMENT_BUDGET.raw + 1) }]),
    /grande\.html excede presupuesto HTML/
  );
  const matrix = Array.from({ length: 16 }, (_, index) => ({
    label: `${index}.html`,
    html: "x".repeat(Math.min(95_000, SSR_HTML_DOCUMENT_BUDGET.raw - 1)),
  }));
  assert.ok(matrix.reduce((sum, item) => sum + item.html.length, 0) > SSR_HTML_MATRIX_BUDGET.raw);
  assert.throws(() => validateHtmlBudgets(matrix), /matriz \d+\+404 excede presupuesto HTML/);
});

test("verifica la matriz física 38+404, assets, CSP, 404 y presupuestos como un único gate", async () => {
  const { directory, generated } = await createGeneratedFixture();
  try {
    assert.equal(generated.length, 39);
    const verified = await verifyPrerenderedHtmlBuild(directory);
    assert.equal(verified.files, 39);
    assert.equal(verified.fragments, 78);
    assert.equal(verified.budgets.count, 39);
    assert.equal(verified.csp.generatedFiles, 39);
    assert.equal(verified.csp.inlineScripts, 37);
    assert.equal(verified.csp.hashes, 37);

    const contactoPath = outputFileForRoute(directory, "/contacto");
    const contacto = await readFile(contactoPath, "utf8");
    await rm(contactoPath);
    await assert.rejects(verifyPrerenderedHtmlBuild(directory), /matriz HTML distinta de 38\+404/);
    await writeFile(contactoPath, contacto, "utf8");

    const unexpectedPath = join(directory, "inesperado.html");
    await writeFile(unexpectedPath, contacto, "utf8");
    await assert.rejects(verifyPrerenderedHtmlBuild(directory), /sobrantes=inesperado\.html/);
    await rm(unexpectedPath);

    const notFoundPath = join(directory, "404.html");
    const notFound = await readFile(notFoundPath, "utf8");
    await writeFile(
      notFoundPath,
      notFound.replace("</head>", '<meta content="https://www.bojautomatizacion.com/404.html" property="og:url" /></head>'),
      "utf8"
    );
    await assert.rejects(verifyPrerenderedHtmlBuild(directory), /no debe declarar og:url/);
    await writeFile(notFoundPath, notFound, "utf8");

    const bodyAssetPath = join(directory, "assets", "fixture-body-abcd1234.webp");
    await rm(bodyAssetPath);
    await assert.rejects(verifyPrerenderedHtmlBuild(directory), /asset referenciado inexistente/);
    await writeFile(bodyAssetPath, "fixture", "utf8");

    const indexPath = join(directory, "index.html");
    const indexHtml = await readFile(indexPath, "utf8");
    await writeFile(
      indexPath,
      indexHtml.replace("</head>", '<meta content="duplicada" name="description" /></head>'),
      "utf8"
    );
    await assert.rejects(verifyPrerenderedHtmlBuild(directory), /description duplicada/);
    await writeFile(indexPath, indexHtml, "utf8");

    await writeFile(
      indexPath,
      indexHtml.replace("</body>", '<script src="/assets/duplicate.js" type="module"></script></body>'),
      "utf8"
    );
    await assert.rejects(verifyPrerenderedHtmlBuild(directory), /entrypoint SPA/);
    await writeFile(indexPath, indexHtml, "utf8");

    await writeFile(
      indexPath,
      indexHtml.replace("</head>", '<link href="/assets/missing-preload.js" rel="modulepreload" /></head>'),
      "utf8"
    );
    await assert.rejects(verifyPrerenderedHtmlBuild(directory), /asset referenciado inexistente/);
    await writeFile(indexPath, indexHtml, "utf8");

    const stylesheetPath = join(directory, "assets", "index-fixture-abcd1234.css");
    const stylesheet = await readFile(stylesheetPath, "utf8");
    await writeFile(stylesheetPath, 'body { background: url("./missing-css-abcd1234.webp"); }', "utf8");
    await assert.rejects(verifyPrerenderedHtmlBuild(directory), /asset CSS referenciado inexistente/);
    await writeFile(stylesheetPath, stylesheet, "utf8");

    await writeFile(indexPath, indexHtml.replace("</body>", "<script>bad()</script></body>"), "utf8");
    await assert.rejects(verifyPrerenderedHtmlBuild(directory), /CSP-BUILD: script inline no inventariado/);
    await writeFile(indexPath, indexHtml, "utf8");

    const appPath = outputFileForRoute(directory, "/app");
    const appHtml = await readFile(appPath, "utf8");
    await writeFile(
      appPath,
      appHtml.replace("</body>", `<!--${"x".repeat(SSR_HTML_DOCUMENT_BUDGET.raw)}--></body>`),
      "utf8"
    );
    await assert.rejects(verifyPrerenderedHtmlBuild(directory), /app\.html excede presupuesto HTML/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
