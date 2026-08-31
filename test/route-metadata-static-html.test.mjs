import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import {
  getRouteMetadata,
  indexableRoutePaths,
  publicRoutePaths,
  routeMetadata,
  SITE_ORIGIN,
} from "../src/route-metadata.js";
import {
  generateRouteHtml,
  injectRouteMetadata,
  outputFileForRoute,
  renderRouteMetadataFragment,
  ROUTE_METADATA_END,
  ROUTE_METADATA_START,
  validateBuiltAssets,
  validateRouteHtml,
} from "../scripts/generate-route-html.mjs";
import {
  STATIC_SHELL_END,
  STATIC_SHELL_START,
} from "../scripts/render-static-shell.mjs";

const sitemapSource = await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8");
const appSource = await readFile(new URL("../src/App.jsx", import.meta.url), "utf8");
const vercelConfig = JSON.parse(await readFile(new URL("../vercel.json", import.meta.url), "utf8"));

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

function fixtureStaticShell(route) {
  const h1 = route === "/__boj_not_found__" ? "Página no encontrada" : `Contenido útil para ${route}`;
  const intro = `Introducción suficientemente descriptiva y estable para identificar la ruta física ${route} sin ejecutar JavaScript.`;
  return {
    route,
    h1,
    intro,
    markup: `${STATIC_SHELL_START}
<a class="skip-link" href="#main-content">Saltar al contenido</a>
<header class="site-header"><nav class="main-nav"><a href="/">Inicio</a><a href="/servicios">Servicios</a><a href="/cursos">Cursos</a><a href="/app">App</a><a href="/contacto">Contacto</a></nav></header>
<main id="main-content"><section class="boj-hero"><img src="/assets/shell-fixture-abcd1234.png" alt="" fetchPriority="high" /><h1>${h1}</h1><p class="boj-hero-subtitle">${intro}</p></section></main>
<noscript><footer class="site-footer"><nav><a href="/recursos-tecnicos">Recursos</a></nav></footer></noscript>
${STATIC_SHELL_END}`,
  };
}

const fixtureStaticShellRenderer = {
  render: async (route) => fixtureStaticShell(route),
};

test("inventaría 34 rutas indexables y una ruta transaccional noindex", () => {
  assert.equal(indexableRoutePaths.length, 34);
  assert.equal(publicRoutePaths.length, 35);
  assert.equal(new Set(indexableRoutePaths).size, 34);
  assert.equal(new Set(publicRoutePaths).size, 35);
  assert.ok(!publicRoutePaths.includes("/inicio"));
  assert.ok(publicRoutePaths.includes("/gracias"));
  assert.equal(getRouteMetadata("/gracias").robots, "noindex, follow");

  const sitemapRoutes = [...sitemapSource.matchAll(/<loc>(.*?)<\/loc>/g)]
    .map((match) => new URL(match[1]).pathname)
    .sort();
  assert.deepEqual(sitemapRoutes, [...indexableRoutePaths].sort());
});

test("produce metadata original completa y canonical propio para cada ruta", () => {
  for (const route of publicRoutePaths) {
    const metadata = getRouteMetadata(route);
    assert.equal(metadata.route, route);
    assert.ok(metadata.title.length > 10, route);
    assert.ok(metadata.description.length > 20, route);
    assert.equal(metadata.canonical, `${SITE_ORIGIN}${route === "/" ? "/" : route}`);
    assert.equal(metadata.robots, route === "/gracias" ? "noindex, follow" : "index, follow");
    assert.ok(["es", "en", "pt-BR"].includes(metadata.lang));
    assert.ok(!metadata.canonical.includes("vercel.app"));
    if (route !== "/") assert.notEqual(metadata.canonical, `${SITE_ORIGIN}/`);
  }

  assert.deepEqual(routeMetadata["/"], routeMetadata["/inicio"]);
});

test("limita hreflang a los ocho grupos comerciales realmente equivalentes", () => {
  const localizedRoutes = publicRoutePaths.filter((route) => getRouteMetadata(route).alternates.length > 0);
  assert.equal(localizedRoutes.length, 24);

  for (const route of localizedRoutes) {
    const alternates = getRouteMetadata(route).alternates;
    assert.deepEqual(alternates.map(({ hreflang }) => hreflang), ["es", "en", "pt-BR", "x-default"]);
    assert.equal(new Set(alternates.map(({ href }) => href)).size, 3);
    for (const { href } of alternates) {
      const alternateRoute = new URL(href).pathname;
      assert.equal(getRouteMetadata(alternateRoute).alternates.length, 4);
    }
  }

  for (const route of ["/privacidad", "/terminos", "/licencias", "/reembolsos", "/recursos-tecnicos"]) {
    assert.deepEqual(getRouteMetadata(route).alternates, []);
  }
});

test("emite JSON-LD relevante sin ofertas, ratings ni curso global", () => {
  const courseRoutes = new Set([
    "/cursos/s7-300-400",
    "/en/courses/s7-300-400",
    "/pt/cursos/s7-300-400",
  ]);
  for (const route of indexableRoutePaths) {
    const jsonLd = getRouteMetadata(route).jsonLd;
    assert.equal(jsonLd["@context"], "https://schema.org");
    assert.ok(Array.isArray(jsonLd["@graph"]));
    assert.doesNotMatch(JSON.stringify(jsonLd), /aggregateRating|review|certification/);
    assert.ok(jsonLd["@graph"].some((node) => node["@type"] === "WebPage"));
    if (courseRoutes.has(route)) {
      const course = jsonLd["@graph"].find((node) => node["@type"] === "Course");
      assert.equal(course.offers.price, "89");
      assert.equal(course.offers.priceCurrency, "USD");
      assert.equal(course.offers.url, "https://pay.hotmart.com/P106348963R?off=srrm5ewf");
    } else {
      assert.doesNotMatch(JSON.stringify(jsonLd), /"Offer"|"Course"/);
    }
  }

  const homeGraph = getRouteMetadata("/").jsonLd["@graph"];
  const seller = homeGraph.find((node) => node["@id"] === `${SITE_ORIGIN}/#seller`);
  const owner = homeGraph.find((node) => node["@id"] === `${SITE_ORIGIN}/#owner`);
  const brand = homeGraph.find((node) => node["@id"] === `${SITE_ORIGIN}/#brand`);
  assert.equal(seller.legalName, "Hexa Group Holding SAS");
  assert.equal(seller.alternateName, undefined);
  assert.equal(seller.sameAs, undefined);
  assert.equal(owner.name, "Walter Adrián Boj");
  assert.deepEqual(owner.sameAs, ["https://www.linkedin.com/in/adrianboj4/"]);
  assert.equal(brand.name, "BOJ Automatización y Control");
  assert.deepEqual(brand.sameAs, ["https://linktr.ee/bojautomatizacionycontrol"]);
  assert.ok(homeGraph.some((node) => node["@type"] === "WebSite"));

  for (const route of ["/app", "/en/app", "/pt/app"]) {
    const software = getRouteMetadata(route).jsonLd["@graph"]
      .find((node) => Array.isArray(node["@type"]));
    assert.deepEqual(software["@type"], ["SoftwareApplication", "Product"]);
    assert.equal(software.name, "BOJ S7-PLC PRO");
    assert.deepEqual(software.creator, { "@id": `${SITE_ORIGIN}/#owner` });
    assert.equal(software.provider, undefined);
  }

  for (const route of courseRoutes) {
    const course = getRouteMetadata(route).jsonLd["@graph"].find((node) => node["@type"] === "Course");
    assert.deepEqual(course.provider, { "@id": `${SITE_ORIGIN}/#owner` });
    assert.equal(course.instructor, undefined);
    assert.deepEqual(course.hasCourseInstance, {
      "@type": "CourseInstance",
      instructor: { "@id": `${SITE_ORIGIN}/#owner` },
    });
    assert.deepEqual(course.offers.seller, { "@id": `${SITE_ORIGIN}/#seller` });
  }

  for (const route of ["/privacidad", "/terminos", "/licencias", "/reembolsos"]) {
    assert.deepEqual(getRouteMetadata(route).jsonLd["@graph"].map((node) => node["@type"]), ["WebPage"]);
  }
  assert.equal(getRouteMetadata("/gracias").jsonLd, null);
});

test("genera 35 shells físicos y 404 con el mismo entrypoint SPA", async () => {
  const directory = await mkdtemp(join(tmpdir(), "boj-route-html-"));
  try {
    await writeFile(join(directory, "index.html"), templateFor(), "utf8");
    await mkdir(join(directory, "assets"), { recursive: true });
    await writeFile(join(directory, "assets", "index-fixture-abcd1234.js"), "export {};", "utf8");
    await writeFile(join(directory, "assets", "index-fixture-abcd1234.css"), "body {}", "utf8");
    await writeFile(join(directory, "assets", "shell-fixture-abcd1234.png"), "fixture", "utf8");
    await writeFile(join(directory, "favicon-fixture.png"), "fixture", "utf8");
    await writeFile(join(directory, "og-institutional-1200x630.jpg"), "fixture", "utf8");
    const generated = await generateRouteHtml(directory, { staticShellRenderer: fixtureStaticShellRenderer });
    assert.equal(generated.length, 36);

    for (const route of publicRoutePaths) {
      const html = await readFile(outputFileForRoute(directory, route), "utf8");
      const metadata = getRouteMetadata(route);
      validateRouteHtml(html, metadata);
      assert.match(html, /src="\/assets\/index-fixture-abcd1234\.js"/);
      assert.match(html, /BOJ_STATIC_SHELL_START/);
      assert.equal((html.match(/<h1\b/g) || []).length, 1);
    }

    const notFound = await readFile(join(directory, "404.html"), "utf8");
    assert.match(notFound, /<meta name="robots" content="noindex, follow" \/>/);
    assert.doesNotMatch(notFound, /rel="canonical"|data-boj-route-alternate|boj-route-jsonld/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("los controles negativos rechazan metadata raíz, lang, duplicados y JSON-LD corruptos", () => {
  const metadata = getRouteMetadata("/en/app");
  const valid = injectRouteMetadata(templateFor(), metadata);
  validateRouteHtml(valid, metadata);

  assert.throws(
    () => validateRouteHtml(valid.replace(metadata.canonical, `${SITE_ORIGIN}/`), metadata),
    /canonical|og:url/
  );
  assert.throws(() => validateRouteHtml(valid.replace('lang="en"', 'lang="es"'), metadata), /lang/);
  assert.throws(
    () => validateRouteHtml(valid.replace("</head>", '<meta name="description" content="duplicada" /></head>'), metadata),
    /description duplicada/
  );
  assert.throws(
    () => validateRouteHtml(valid.replace('"@context":"https://schema.org"', '"@context":INVALID'), metadata),
    /JSON/
  );
  assert.throws(
    () => validateRouteHtml(valid.replace(/<script type="module"[^>]*><\/script>/, ""), metadata),
    /entrypoint SPA/
  );
  assert.throws(
    () => validateRouteHtml(valid.replace("</body>", '<script type="module" src="/assets/duplicate.js"></script></body>'), metadata),
    /entrypoint SPA/
  );
  assert.throws(
    () => validateRouteHtml(valid.replace(/\s*<link rel="alternate"[^>]+data-boj-route-alternate \/>/, ""), metadata),
    /hreflang/
  );

  const thanksMetadata = getRouteMetadata("/gracias");
  const thanks = injectRouteMetadata(templateFor(), thanksMetadata);
  assert.throws(
    () => validateRouteHtml(thanks.replace("noindex, follow", "index, follow"), thanksMetadata),
    /robots/
  );
});

test("rechaza assets compilados faltantes y entrypoints duplicados", async () => {
  const directory = await mkdtemp(join(tmpdir(), "boj-route-assets-"));
  try {
    await mkdir(join(directory, "assets"), { recursive: true });
    await writeFile(join(directory, "assets", "index-fixture-abcd1234.js"), "export {};", "utf8");
    await writeFile(join(directory, "assets", "index-fixture-abcd1234.css"), "body {}", "utf8");
    await writeFile(join(directory, "favicon-fixture.png"), "fixture", "utf8");
    await writeFile(join(directory, "og-institutional-1200x630.jpg"), "fixture", "utf8");
    const valid = templateFor();
    await validateBuiltAssets(valid, directory);
    await assert.rejects(
      validateBuiltAssets(valid.replace("/assets/index-fixture-abcd1234.css", "/assets/missing.css"), directory),
      /asset referenciado inexistente/
    );
    await assert.rejects(
      validateBuiltAssets(valid.replace("</body>", '<script type="module" src="/assets/duplicate.js"></script></body>'), directory),
      /único entrypoint/
    );
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("la SPA consume el manifiesto y Vercel prioriza archivos limpios sin catch-all", () => {
  assert.match(appSource, /getRouteMetadata\(route\)/);
  assert.doesNotMatch(appSource, /const routeMeta\s*=/);
  assert.equal(vercelConfig.cleanUrls, true);
  assert.equal(vercelConfig.trailingSlash, false);
  assert.equal("rewrites" in vercelConfig, false);
  assert.deepEqual(vercelConfig.redirects, [
    { source: "/inicio", destination: "/", permanent: true },
    { source: "/contact", destination: "/contacto", permanent: true },
  ]);
  assert.equal((templateFor().match(new RegExp(ROUTE_METADATA_START, "g")) || []).length, 1);
  assert.equal((templateFor().match(new RegExp(ROUTE_METADATA_END, "g")) || []).length, 1);
});
