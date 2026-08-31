import assert from "node:assert/strict";
import { access, mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import test from "node:test";

import { getRouteMetadata, publicRoutePaths } from "../src/route-metadata.js";
import { outputFileForRoute, validateRouteHtml, validateStaticShellAssets } from "../scripts/generate-route-html.mjs";
import {
  buildManifestAssetMap,
  createStaticShellRenderer,
  extractStaticShell,
  getSameDocumentFragmentIds,
  injectStaticShell,
  rewriteStaticShellAssets,
  STATIC_SHELL_END,
  STATIC_SHELL_START,
  validateStaticShellHtml,
} from "../scripts/render-static-shell.mjs";

const representativeAppMarkup = `
<a class="skip-link" href="#main-content">Skip</a>
<header class="site-header"><a href="/"><img src="/src/assets/logo.png" alt="BOJ" /></a><nav class="main-nav"><a href="/">Home</a><a href="/servicios">Services</a><a href="/cursos">Courses</a><a href="/app">App</a><a href="/contacto">Contact</a></nav></header>
<main id="main-content" tabindex="-1"><div class="services-redesign-page"><section class="boj-hero"><picture><source srcSet="/src/assets/hero.webp 640w"/><img src="/src/assets/hero.jpg" fetchPriority="high" alt=""/></picture><div><h1>Diagnóstico industrial específico</h1><p class="boj-hero-subtitle">Una introducción útil y suficientemente extensa que identifica esta página incluso cuando JavaScript no se ejecuta.</p><a href="/fixture#areas-de-servicio">Ver áreas</a></div></section><section id="areas-de-servicio" class="services-areas"><div><h2>Qué podemos resolver</h2><p>Diagnóstico de PLC, redes industriales y sistemas de control con evidencia suficiente para definir el próximo paso técnico.</p></div><article>Este detalle posterior y pesado no pertenece al shell mínimo.</article></section></div></main>
<footer class="site-footer"><nav><a href="/recursos-tecnicos">Resources</a></nav></footer>`;

const fixtureManifest = {
  logo: { src: "src/assets/logo.png", file: "assets/logo-abcdefgh.png" },
  heroWebp: { src: "src/assets/hero.webp", file: "assets/hero-abcdefgh.webp" },
  heroJpg: { src: "src/assets/hero.jpg", file: "assets/hero-abcdefgh.jpg" },
};

test("extrae del propio React un shell acotado, identificable y sin una segunda fuente de copy", () => {
  const source = extractStaticShell(representativeAppMarkup, "/fixture");
  assert.equal(source.h1, "Diagnóstico industrial específico");
  assert.match(source.intro, /identifica esta página/);
  assert.match(source.markup, new RegExp(STATIC_SHELL_START));
  assert.match(source.markup, new RegExp(STATIC_SHELL_END));
  assert.match(source.markup, /<section id="areas-de-servicio" class="services-areas"><h2>Qué podemos resolver<\/h2><p>Diagnóstico de PLC/);
  assert.doesNotMatch(source.markup, /detalle posterior y pesado/);
  assert.deepEqual(source.fragments, ["areas-de-servicio"]);
  assert.match(source.markup, /<main id="main-content" tabindex="-1"><div class="services-redesign-page"><section class="boj-hero"/);
  assert.match(source.markup, /<\/section><\/div><\/main>/);
  assert.match(source.markup, /<noscript><footer/);

  const rewritten = rewriteStaticShellAssets(source.markup, fixtureManifest);
  assert.doesNotMatch(rewritten, /\/src\/assets\//);
  assert.match(rewritten, /\/assets\/hero-abcdefgh\.webp 640w/);
  const html = injectStaticShell('<html><body><div id="root"></div><script type="module" src="/assets/index-abcdefgh.js"></script></body></html>', rewritten);
  const result = validateStaticShellHtml(html, { ...source, route: "/fixture" });
  assert.equal(result.h1, source.h1);
  assert.deepEqual(result.fragments, ["main-content", "areas-de-servicio"]);
  assert.ok(result.internalLinks >= 5);
  assert.ok(result.bytes < 16_000);
});

test("rechaza manifest ambiguo, assets fuente sin resolver y shells divergentes", () => {
  assert.throws(
    () => buildManifestAssetMap({ one: { src: "src/assets/a.png", file: "assets/a-11111111.png" }, two: { src: "src/assets/a.png", file: "assets/a-22222222.png" } }),
    /asset ambiguo/
  );
  assert.throws(
    () => rewriteStaticShellAssets('<img src="/src/assets/missing.png" />', fixtureManifest),
    /sin resolver/
  );
  const source = extractStaticShell(representativeAppMarkup, "/fixture");
  const rewritten = rewriteStaticShellAssets(source.markup, fixtureManifest);
  const html = injectStaticShell('<div id="root"></div>', rewritten);
  assert.throws(
    () => validateStaticShellHtml(html, { ...source, h1: "Otro H1", route: "/fixture" }),
    /H1 divergente/
  );
  const missingFragmentTarget = html.replace(/<section id="areas-de-servicio"[\s\S]*?<\/section>/, "");
  assert.throws(
    () => validateStaticShellHtml(missingFragmentTarget, { ...source, route: "/fixture" }),
    /destino #areas-de-servicio/
  );
  assert.throws(
    () => extractStaticShell(representativeAppMarkup.replace(/<section id="areas-de-servicio"[\s\S]*?<\/section>/, ""), "/fixture"),
    /destino #areas-de-servicio/
  );
  assert.throws(() => injectStaticShell('<div id="root">ocupado</div>', rewritten), /#root vacío/);
});

test("el renderer productivo exige el manifest físico aunque los unitarios inyecten un fixture", async () => {
  const directory = await mkdtemp(join(tmpdir(), "boj-web-m3-no-manifest-"));
  try {
    await assert.rejects(createStaticShellRenderer(directory), /manifest físico obligatorio ausente/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("el build presente conserva 35 rutas físicas y 404 con cuerpo no-JS verificable", async (context) => {
  const outDir = resolve("dist");
  try {
    await access(join(outDir, ".vite", "manifest.json"));
  } catch {
    context.skip("dist no está presente; npm run build ejecuta esta validación como gate obligatorio");
    return;
  }

  const samples = ["/", "/servicios", "/cursos/s7-300-400", "/app", "/en/services", "/en/app", "/pt/servicos", "/pt/app"];
  for (const route of publicRoutePaths) {
    const html = await readFile(outputFileForRoute(outDir, route), "utf8");
    validateRouteHtml(html, getRouteMetadata(route));
    assert.equal((html.match(new RegExp(STATIC_SHELL_START, "g")) || []).length, 1, route);
    assert.equal((html.match(/<h1\b/g) || []).length, 1, route);
    assert.match(html, /<nav\b[^>]*class="[^"]*\bmain-nav\b/, route);
    assert.doesNotMatch(html, /\/src\/assets\//, route);
    const shellStart = html.indexOf(STATIC_SHELL_START);
    const shellEnd = html.indexOf(STATIC_SHELL_END, shellStart) + STATIC_SHELL_END.length;
    const shell = html.slice(shellStart, shellEnd);
    for (const id of getSameDocumentFragmentIds(shell, route)) {
      assert.equal((shell.match(new RegExp(`\\sid="${id}"`, "g")) || []).length, 1, `${route}#${id}`);
    }
    await validateStaticShellAssets(html, outDir);
    if (samples.includes(route)) {
      assert.match(html, /<p\b[^>]*class="[^"]*\bboj-hero-subtitle\b/, route);
    }
  }

  const notFound = await readFile(join(outDir, "404.html"), "utf8");
  assert.match(notFound, /<h1[^>]*>Página no encontrada<\/h1>/);
  assert.match(notFound, /<meta name="robots" content="noindex, follow" \/>/);
  assert.doesNotMatch(notFound, /rel="canonical"|data-boj-route-alternate|boj-route-jsonld/);
  assert.equal(publicRoutePaths.length, 35);
});
