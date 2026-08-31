import { readRuntimeAppSource } from "./helpers/runtime-app-source.mjs";
import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
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
  extractPrerenderedMarkup,
  injectRouteMetadata,
  injectPrerenderedRoot,
  normalizeRootTemplate,
  outputFileForRoute,
  renderRouteMetadataFragment,
  ROOT_SHELL,
  ROUTE_METADATA_END,
  ROUTE_METADATA_START,
  validateBuiltAssets,
  validatePrerenderMarkup,
  validatePrerenderedRouteHtml,
  validateRouteHtml,
} from "../scripts/generate-route-html.mjs";
import { serializeJsonLd as serializeBuildJsonLd } from "../scripts/csp-policy.mjs";
import { serializeJsonLd as serializeClientJsonLd } from "../src/json-ld.js";
import {
  getRouteFamily,
  routeFamilies,
  routeFamilyByPath,
} from "../src/routes/route-families.js";

const sitemapSource = await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8");
const appSource = await readRuntimeAppSource();
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

function prerenderFixture(route, buildYear) {
  return `<a class="skip-link" href="#main-content">Saltar al contenido principal</a>` +
    `<header><nav aria-label="Navegación principal"><a href="/">BOJ</a></nav></header>` +
    `<main id="main-content"><h1>Contenido técnico de ${route}</h1>` +
    `<p>Diagnóstico industrial, automatización y formación técnica con información útil disponible antes de ejecutar JavaScript.</p></main>` +
    `<footer>© ${buildYear} BOJ Automatización y Control</footer>`;
}

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

test("genera 35 HTML prerenderizados y 404 con el mismo entrypoint hidratable", async () => {
  const directory = await mkdtemp(join(tmpdir(), "boj-route-html-"));
  try {
    await writeFile(join(directory, "index.html"), templateFor(), "utf8");
    await mkdir(join(directory, "assets"), { recursive: true });
    await writeFile(join(directory, "assets", "index-fixture-abcd1234.js"), "export {};", "utf8");
    await writeFile(join(directory, "assets", "index-fixture-abcd1234.css"), "body {}", "utf8");
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
    const buildYear = 2026;
    const generated = await generateRouteHtml(directory, {
      renderRoute: async (route, year) => prerenderFixture(route, year),
      buildYear,
    });
    assert.equal(generated.length, 36);

    for (const route of publicRoutePaths) {
      const html = await readFile(outputFileForRoute(directory, route), "utf8");
      const metadata = getRouteMetadata(route);
      validatePrerenderedRouteHtml(html, metadata, route, buildYear);
      assert.equal(extractPrerenderedMarkup(html, route, buildYear), prerenderFixture(route, buildYear));
      assert.match(html, new RegExp(`data-boj-route="${route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
      assert.match(html, /src="\/assets\/index-fixture-abcd1234\.js"/);
    }

    const notFound = await readFile(join(directory, "404.html"), "utf8");
    validatePrerenderedRouteHtml(
      notFound,
      getRouteMetadata("/__boj_not_found__"),
      "/__boj_not_found__",
      buildYear
    );
    assert.match(notFound, /<meta name="robots" content="noindex, follow" \/>/);
    assert.doesNotMatch(notFound, /rel="canonical"|data-boj-route-alternate|boj-route-jsonld/);

    const firstPass = await Promise.all(generated.map((path) => readFile(path, "utf8")));
    const regenerated = await generateRouteHtml(directory, {
      renderRoute: async (route, year) => prerenderFixture(route, year),
      buildYear,
    });
    const secondPass = await Promise.all(regenerated.map((path) => readFile(path, "utf8")));
    assert.deepEqual(secondPass, firstPass);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("mapea las 35 rutas públicas a chunks exactos y reserva compliance para el 404", () => {
  const mappedPublicRoutes = Object.keys(routeFamilyByPath)
    .filter((route) => route !== "/inicio")
    .sort();
  assert.deepEqual(mappedPublicRoutes, [...publicRoutePaths].sort());
  assert.deepEqual(
    Object.fromEntries(Object.entries(routeFamilies).map(([family, routes]) => [family, routes.length])),
    { home: 4, services: 6, coursesIndex: 3, courseS7: 3, courseTia: 3, app: 3, resources: 6, compliance: 8 }
  );
  for (const [route, family] of Object.entries(routeFamilyByPath)) {
    assert.equal(getRouteFamily(route), family, route);
  }
  for (const route of ["/__boj_not_found__", "/cursos/desconocido", "/en/courses/unknown", "/recursos-tecnicos/desconocido"]) {
    assert.equal(getRouteFamily(route), "compliance", route);
  }
});

test("serializa JSON-LD igual en prerender y navegación cliente", () => {
  for (const route of [...publicRoutePaths, "/__boj_not_found__"]) {
    const jsonLd = getRouteMetadata(route).jsonLd;
    if (jsonLd) assert.equal(serializeClientJsonLd(jsonLd), serializeBuildJsonLd(jsonLd), route);
  }
  const unsafe = { value: "</script><script>alert(1)</script>" };
  assert.equal(serializeClientJsonLd(unsafe), serializeBuildJsonLd(unsafe));
  assert.doesNotMatch(serializeClientJsonLd(unsafe), /</);
});

test("rechaza root inútil, fallback de Suspense y contenido inline incompatible con CSP", () => {
  const validMarkup = prerenderFixture("/app", 2026);
  validatePrerenderMarkup(validMarkup, "/app");
  const html = injectPrerenderedRoot(templateFor(), "/app", 2026, validMarkup);
  assert.equal(normalizeRootTemplate(html), templateFor());

  assert.throws(() => validatePrerenderMarkup("", "/app"), /markup vacío/);
  assert.throws(
    () => validatePrerenderMarkup(validMarkup.replace("<main", '<div class="route-loading"></div><main'), "/app"),
    /Suspense/
  );
  assert.throws(
    () => validatePrerenderMarkup(validMarkup.replace("<main", '<!--$!--><template data-msg="suspended"></template><main'), "/app"),
    /Suspense/
  );
  assert.throws(
    () => validatePrerenderMarkup(validMarkup.replace("<h1", '<h1 style="color:red"'), "/app"),
    /estilo inline/
  );
  assert.throws(
    () => validatePrerenderMarkup(validMarkup.replace("</main>", "<script>bad()</script></main>"), "/app"),
    /script inline/
  );
  assert.throws(
    () => validatePrerenderMarkup(validMarkup.replace(/<h1[\s\S]*?<\/h1>/, ""), "/app"),
    /h1/
  );
  validatePrerenderMarkup(
    validMarkup.replace("</main>", '<img src="/assets/fixture.webp" alt="" width="640" height="480" /></main>'),
    "/app"
  );
  assert.throws(
    () => validatePrerenderMarkup(validMarkup.replace("</main>", '<img src="/assets/fixture.webp" alt="" height="480" /></main>'), "/app"),
    /sin width intrínseco válido/
  );
  assert.throws(
    () => validatePrerenderMarkup(validMarkup.replace("</main>", '<img src="/assets/fixture.webp" alt="" width="640" height="0" /></main>'), "/app"),
    /sin height intrínseco válido/
  );
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
    await assert.rejects(
      validateBuiltAssets(valid.replace(ROOT_SHELL, '<div id="root"><main><img src="/assets/missing-body-abcd1234.webp" alt="" /></main></div>'), directory),
      /asset referenciado inexistente/
    );
    for (const invalidReference of [
      "assets/relative-abcd1234.webp",
      "https://cdn.example.com/external.webp",
      "data:image/webp;base64,AAAA",
      "/src/assets/source.webp",
      "/.prerender/leak.webp",
      "undefined",
    ]) {
      await assert.rejects(
        validateBuiltAssets(
          valid.replace(ROOT_SHELL, `<div id="root"><main><img src="${invalidReference}" alt="" /></main></div>`),
          directory
        ),
        /asset relativo|asset no publicable|asset vacía/
      );
    }
    await assert.rejects(
      validateBuiltAssets(
        valid.replace(ROOT_SHELL, '<div id="root"><main><picture><source srcset="/assets/index-fixture-abcd1234.css 1x, assets/relative.webp 2x" /></picture></main></div>'),
        directory
      ),
      /asset relativo/
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
