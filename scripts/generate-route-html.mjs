import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

import {
  getRouteMetadata,
  publicRoutePaths,
  SITE_ORIGIN,
} from "../src/route-metadata.js";
import { serializeJsonLd } from "./csp-policy.mjs";

export const ROUTE_METADATA_START = "<!-- BOJ_ROUTE_METADATA_START -->";
export const ROUTE_METADATA_END = "<!-- BOJ_ROUTE_METADATA_END -->";
export const ROOT_SHELL = '<div id="root"></div>';

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export function renderRouteMetadataFragment(metadata) {
  const lines = [
    ROUTE_METADATA_START,
    `    <meta name="description" content="${escapeHtml(metadata.description)}" />`,
    `    <meta name="robots" content="${metadata.robots}" />`,
    `    <meta property="og:type" content="${metadata.ogType}" />`,
    `    <meta property="og:locale" content="${metadata.locale}" />`,
    `    <meta property="og:title" content="${escapeHtml(metadata.title)}" />`,
    `    <meta property="og:description" content="${escapeHtml(metadata.description)}" />`,
    `    <meta property="og:image" content="${escapeHtml(metadata.image)}" />`,
    `    <meta property="og:image:type" content="${metadata.imageType}" />`,
    `    <meta property="og:image:width" content="${metadata.imageWidth}" />`,
    `    <meta property="og:image:height" content="${metadata.imageHeight}" />`,
    `    <meta property="og:image:alt" content="${escapeHtml(metadata.imageAlt)}" />`,
    `    <meta name="twitter:title" content="${escapeHtml(metadata.title)}" />`,
    `    <meta name="twitter:description" content="${escapeHtml(metadata.description)}" />`,
    `    <meta name="twitter:image" content="${escapeHtml(metadata.image)}" />`,
    `    <meta name="twitter:image:alt" content="${escapeHtml(metadata.imageAlt)}" />`,
  ];

  if (metadata.canonical) {
    lines.push(`    <meta property="og:url" content="${escapeHtml(metadata.canonical)}" />`);
    lines.push(`    <link rel="canonical" href="${escapeHtml(metadata.canonical)}" />`);
  }

  for (const alternate of metadata.alternates) {
    lines.push(
      `    <link rel="alternate" hreflang="${alternate.hreflang}" href="${escapeHtml(alternate.href)}" data-boj-route-alternate />`
    );
  }

  lines.push(`    <title>${escapeHtml(metadata.title)}</title>`);

  if (metadata.jsonLd) {
    lines.push(`    <script id="boj-route-jsonld" type="application/ld+json">${serializeJsonLd(metadata.jsonLd)}</script>`);
  }

  lines.push(ROUTE_METADATA_END);
  return lines.join("\n");
}

function replaceDocumentLanguage(html, lang) {
  const pattern = /<html\b([^>]*)\blang="[^"]*"([^>]*)>/i;
  if (!pattern.test(html)) throw new Error("SEO-BUILD: falta lang en <html>");
  return html.replace(pattern, `<html$1lang="${lang}"$2>`);
}

export function injectRouteMetadata(template, metadata) {
  const start = template.indexOf(ROUTE_METADATA_START);
  const end = template.indexOf(ROUTE_METADATA_END);
  if (start === -1 || end === -1 || end < start) {
    throw new Error("SEO-BUILD: marcadores de metadata ausentes o inválidos");
  }
  if (template.indexOf(ROUTE_METADATA_START, start + ROUTE_METADATA_START.length) !== -1) {
    throw new Error("SEO-BUILD: marcador inicial duplicado");
  }
  if (template.indexOf(ROUTE_METADATA_END, end + ROUTE_METADATA_END.length) !== -1) {
    throw new Error("SEO-BUILD: marcador final duplicado");
  }

  const afterEnd = end + ROUTE_METADATA_END.length;
  const withMetadata =
    template.slice(0, start) +
    renderRouteMetadataFragment(metadata) +
    template.slice(afterEnd);
  return replaceDocumentLanguage(withMetadata, metadata.lang);
}

function occurrences(value, pattern) {
  return [...value.matchAll(pattern)].length;
}

function requireExactOccurrence(html, literal, label) {
  const count = html.split(literal).length - 1;
  if (count !== 1) {
    throw new Error(`SEO-BUILD: ${label} debe aparecer exactamente una vez; actual=${count}`);
  }
}

function validateBuildYear(buildYear) {
  if (!Number.isInteger(buildYear) || buildYear < 2024 || buildYear > 9999) {
    throw new Error(`PRERENDER-BUILD: año inválido ${buildYear}`);
  }
}

export function validatePrerenderMarkup(markup, route) {
  if (typeof markup !== "string" || !markup.trim()) {
    throw new Error(`PRERENDER-BUILD: markup vacío en ${route}`);
  }
  if (/<(?:html|head|body)\b/i.test(markup) || /\bid="root"/i.test(markup)) {
    throw new Error(`PRERENDER-BUILD: documento o root anidado en ${route}`);
  }
  if (/<script\b/i.test(markup)) {
    throw new Error(`PRERENDER-BUILD: script inline fuera del inventario CSP en ${route}`);
  }
  if (/<style\b/i.test(markup) || /\sstyle\s*=/i.test(markup)) {
    throw new Error(`PRERENDER-BUILD: estilo inline incompatible con CSP en ${route}`);
  }
  if (/\broute-loading\b/.test(markup) || /<!--\$!-->/.test(markup) || /<template\b[^>]*\bdata-(?:msg|digest)=/i.test(markup)) {
    throw new Error(`PRERENDER-BUILD: Suspense emitió el fallback en ${route}`);
  }

  const mainCount = occurrences(markup, /<main\b/gi);
  const footerCount = occurrences(markup, /<footer\b/gi);
  const headingCount = occurrences(markup, /<h1\b/gi);
  if (mainCount !== 1) {
    throw new Error(`PRERENDER-BUILD: ${route} debe contener un main; actual=${mainCount}`);
  }
  if (footerCount !== 1) {
    throw new Error(`PRERENDER-BUILD: ${route} debe contener un footer; actual=${footerCount}`);
  }
  if (headingCount < 1) {
    throw new Error(`PRERENDER-BUILD: ${route} debe contener al menos un h1`);
  }

  for (const [index, match] of [...markup.matchAll(/<img\b[^>]*>/gi)].entries()) {
    const image = match[0];
    for (const attribute of ["width", "height"]) {
      const value = image.match(new RegExp(`\\s${attribute}="([^"]+)"`, "i"))?.[1];
      if (!value || !/^\d+$/.test(value) || Number(value) <= 0) {
        throw new Error(
          `PRERENDER-BUILD: imagen ${index + 1} sin ${attribute} intrínseco válido en ${route}`
        );
      }
    }
  }

  const visibleText = markup
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:#\d+|#x[\da-f]+|[a-z]+);/gi, "x")
    .replace(/\s+/g, " ")
    .trim();
  if (visibleText.length < 80) {
    throw new Error(`PRERENDER-BUILD: contenido insuficiente en ${route}; caracteres=${visibleText.length}`);
  }
}

export function normalizeRootTemplate(template) {
  const emptyRootCount = template.split(ROOT_SHELL).length - 1;
  if (emptyRootCount === 1) return template;
  if (emptyRootCount > 1) {
    throw new Error(`PRERENDER-BUILD: root vacío duplicado; actual=${emptyRootCount}`);
  }

  const openingPattern = /<div id="root" data-boj-route="[^"]+" data-boj-build-year="\d{4}">/g;
  const openings = [...template.matchAll(openingPattern)];
  if (openings.length !== 1) {
    throw new Error(`PRERENDER-BUILD: se esperaba un único root generado; actual=${openings.length}`);
  }
  const opening = openings[0];
  const openingEnd = opening.index + opening[0].length;
  const bodyEnd = template.indexOf("</body>", openingEnd);
  if (bodyEnd === -1) throw new Error("PRERENDER-BUILD: cierre de body ausente después del root");
  const rootEnd = template.lastIndexOf("</div>", bodyEnd);
  if (rootEnd < openingEnd) throw new Error("PRERENDER-BUILD: cierre del root generado ausente");

  return template.slice(0, opening.index) + ROOT_SHELL + template.slice(rootEnd + "</div>".length);
}

function rootOpening(route, buildYear) {
  validateBuildYear(buildYear);
  return `<div id="root" data-boj-route="${escapeHtml(route)}" data-boj-build-year="${buildYear}">`;
}

export function injectPrerenderedRoot(template, route, buildYear, markup) {
  validatePrerenderMarkup(markup, route);
  const normalizedTemplate = normalizeRootTemplate(template);
  requireExactOccurrence(normalizedTemplate, ROOT_SHELL, `root vacío ${route}`);
  return normalizedTemplate.replace(ROOT_SHELL, `${rootOpening(route, buildYear)}${markup}</div>`);
}

export function extractPrerenderedMarkup(html, route, buildYear) {
  const opening = rootOpening(route, buildYear);
  requireExactOccurrence(html, opening, `root prerenderizado ${route}`);
  const openingIndex = html.indexOf(opening);
  const openingEnd = openingIndex + opening.length;
  const bodyEnd = html.indexOf("</body>", openingEnd);
  if (bodyEnd === -1) throw new Error(`PRERENDER-BUILD: cierre de body ausente en ${route}`);
  const rootEnd = html.lastIndexOf("</div>", bodyEnd);
  if (rootEnd < openingEnd) throw new Error(`PRERENDER-BUILD: cierre del root ausente en ${route}`);
  return html.slice(openingEnd, rootEnd);
}

export function validatePrerenderedRouteHtml(html, metadata, route, buildYear) {
  validateRouteHtml(html, metadata);
  const markup = extractPrerenderedMarkup(html, route, buildYear);
  validatePrerenderMarkup(markup, route);
  return markup;
}

export function validateRouteHtml(html, metadata) {
  requireExactOccurrence(html, `<html lang="${metadata.lang}">`, `lang ${metadata.route}`);
  requireExactOccurrence(html, `<title>${escapeHtml(metadata.title)}</title>`, `title ${metadata.route}`);
  requireExactOccurrence(
    html,
    `<meta name="description" content="${escapeHtml(metadata.description)}" />`,
    `description ${metadata.route}`
  );
  requireExactOccurrence(html, `<meta name="robots" content="${metadata.robots}" />`, `robots ${metadata.route}`);
  requireExactOccurrence(
    html,
    `<meta property="og:title" content="${escapeHtml(metadata.title)}" />`,
    `og:title ${metadata.route}`
  );
  requireExactOccurrence(
    html,
    `<meta property="og:description" content="${escapeHtml(metadata.description)}" />`,
    `og:description ${metadata.route}`
  );
  requireExactOccurrence(
    html,
    `<meta property="og:image" content="${escapeHtml(metadata.image)}" />`,
    `og:image ${metadata.route}`
  );
  requireExactOccurrence(
    html,
    `<meta property="og:image:type" content="${metadata.imageType}" />`,
    `og:image:type ${metadata.route}`
  );
  requireExactOccurrence(
    html,
    `<meta property="og:image:width" content="${metadata.imageWidth}" />`,
    `og:image:width ${metadata.route}`
  );
  requireExactOccurrence(
    html,
    `<meta property="og:image:height" content="${metadata.imageHeight}" />`,
    `og:image:height ${metadata.route}`
  );
  requireExactOccurrence(
    html,
    `<meta property="og:image:alt" content="${escapeHtml(metadata.imageAlt)}" />`,
    `og:image:alt ${metadata.route}`
  );
  requireExactOccurrence(
    html,
    `<meta name="twitter:image" content="${escapeHtml(metadata.image)}" />`,
    `twitter:image ${metadata.route}`
  );
  requireExactOccurrence(
    html,
    `<meta name="twitter:image:alt" content="${escapeHtml(metadata.imageAlt)}" />`,
    `twitter:image:alt ${metadata.route}`
  );

  if (metadata.canonical) {
    requireExactOccurrence(
      html,
      `<link rel="canonical" href="${escapeHtml(metadata.canonical)}" />`,
      `canonical ${metadata.route}`
    );
    requireExactOccurrence(
      html,
      `<meta property="og:url" content="${escapeHtml(metadata.canonical)}" />`,
      `og:url ${metadata.route}`
    );
    if (metadata.route !== "/" && html.includes('<link rel="canonical" href="https://www.bojautomatizacion.com/" />')) {
      throw new Error(`SEO-BUILD: ${metadata.route} heredó el canonical de la portada`);
    }
  } else if (occurrences(html, /<link\s+rel="canonical"/g) !== 0) {
    throw new Error(`SEO-BUILD: ${metadata.route} no debe declarar canonical`);
  }

  const alternateCount = occurrences(html, /data-boj-route-alternate/g);
  if (alternateCount !== metadata.alternates.length) {
    throw new Error(
      `SEO-BUILD: hreflang ${metadata.route} esperado=${metadata.alternates.length} actual=${alternateCount}`
    );
  }
  for (const alternate of metadata.alternates) {
    requireExactOccurrence(
      html,
      `hreflang="${alternate.hreflang}" href="${escapeHtml(alternate.href)}"`,
      `hreflang ${alternate.hreflang} ${metadata.route}`
    );
  }

  const jsonLdMatches = [...html.matchAll(/<script id="boj-route-jsonld" type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (metadata.jsonLd) {
    if (jsonLdMatches.length !== 1) throw new Error(`SEO-BUILD: JSON-LD inválido en ${metadata.route}`);
    const parsed = JSON.parse(jsonLdMatches[0][1]);
    if (JSON.stringify(parsed) !== JSON.stringify(metadata.jsonLd)) {
      throw new Error(`SEO-BUILD: JSON-LD divergente en ${metadata.route}`);
    }
  } else if (jsonLdMatches.length !== 0) {
    throw new Error(`SEO-BUILD: ${metadata.route} no debe declarar JSON-LD`);
  }

  const moduleEntrypoints = [...html.matchAll(/<script\b[^>]*type="module"[^>]*src="(\/assets\/[^"]+)"[^>]*><\/script>/g)];
  if (moduleEntrypoints.length !== 1) {
    throw new Error(
      `SEO-BUILD: ${metadata.route} debe conservar exactamente un entrypoint SPA; actual=${moduleEntrypoints.length}`
    );
  }
  if (occurrences(html, /<meta\s+name="description"/g) !== 1) {
    throw new Error(`SEO-BUILD: description duplicada en ${metadata.route}`);
  }
  if (occurrences(html, /<meta\s+name="robots"/g) !== 1) {
    throw new Error(`SEO-BUILD: robots duplicado en ${metadata.route}`);
  }
  if (occurrences(html, /<meta\s+property="og:image"/g) !== 1) {
    throw new Error(`SEO-BUILD: og:image duplicada en ${metadata.route}`);
  }
  if (occurrences(html, /<meta\s+name="twitter:image"/g) !== 1) {
    throw new Error(`SEO-BUILD: twitter:image duplicada en ${metadata.route}`);
  }
  if (occurrences(html, /<title>/g) !== 1) {
    throw new Error(`SEO-BUILD: title duplicado en ${metadata.route}`);
  }
}

function localAssetPath(value) {
  if (value.startsWith(`${SITE_ORIGIN}/`)) return new URL(value).pathname;
  return value.startsWith("/") ? new URL(value, SITE_ORIGIN).pathname : null;
}

function validateBodyAssetReference(reference) {
  if (!reference || /^(?:undefined|null)$/i.test(reference)) {
    throw new Error(`PRERENDER-BUILD: referencia de asset vacía o indefinida: ${reference}`);
  }
  if (reference.startsWith("//") || reference.includes("/src/") || reference.includes(".prerender")) {
    throw new Error(`PRERENDER-BUILD: referencia de asset no publicable: ${reference}`);
  }
  if (reference.startsWith(`${SITE_ORIGIN}/`)) return;
  if (reference.startsWith("/")) return;
  throw new Error(`PRERENDER-BUILD: asset relativo, embebido o externo prohibido: ${reference}`);
}

export async function validateBuiltAssets(html, outDir) {
  const moduleEntrypoints = [...html.matchAll(/<script\b[^>]*type="module"[^>]*src="([^"]+)"[^>]*><\/script>/g)]
    .map((match) => match[1]);
  if (moduleEntrypoints.length !== 1) {
    throw new Error(`SEO-BUILD: se esperaba un único entrypoint de módulo; actual=${moduleEntrypoints.length}`);
  }

  const stylesheets = [...html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g)]
    .map((match) => match[1])
    .filter((href) => href.startsWith("/"));
  if (stylesheets.length !== 1) {
    throw new Error(`SEO-BUILD: se esperaba una única hoja de estilo compilada; actual=${stylesheets.length}`);
  }

  const localReferences = new Set([...moduleEntrypoints, ...stylesheets]);
  for (const match of html.matchAll(/<link\b[^>]*rel="(?:icon|apple-touch-icon)"[^>]*href="([^"]+)"[^>]*>/g)) {
    localReferences.add(match[1]);
  }
  for (const match of html.matchAll(/<meta\b[^>]*(?:property="og:image"|name="twitter:image")[^>]*content="([^"]+)"[^>]*>/g)) {
    localReferences.add(match[1]);
  }
  const bodyReferences = new Set();
  for (const match of html.matchAll(/<(?:img|source|video)\b[^>]*\s(?:src|poster)="([^"]*)"[^>]*>/gi)) {
    bodyReferences.add(match[1]);
  }
  for (const match of html.matchAll(/\bsrcset="([^"]+)"/gi)) {
    for (const candidate of match[1].split(",")) {
      const reference = candidate.trim().split(/\s+/)[0];
      if (reference) bodyReferences.add(reference);
    }
  }
  for (const reference of bodyReferences) {
    validateBodyAssetReference(reference);
    localReferences.add(reference);
  }

  for (const reference of localReferences) {
    const pathname = localAssetPath(reference);
    if (!pathname) continue;
    const relativePath = decodeURIComponent(pathname).replace(/^\/+/, "");
    if (!relativePath || relativePath.includes("..")) {
      throw new Error(`SEO-BUILD: referencia de asset inválida: ${reference}`);
    }
    const assetPath = join(outDir, relativePath);
    const asset = await stat(assetPath).catch(() => null);
    if (!asset?.isFile()) {
      throw new Error(`SEO-BUILD: asset referenciado inexistente: ${reference}`);
    }
  }
}

export async function validateFingerprintAssets(outDir) {
  const assetsDir = join(outDir, "assets");
  const entries = await readdir(assetsDir, { withFileTypes: true });
  if (!entries.length) throw new Error("WEB-M2: dist/assets no puede estar vacío");
  const fingerprintPattern = /-[A-Za-z0-9_-]{8,}\.[A-Za-z0-9]+$/;
  for (const entry of entries) {
    if (!entry.isFile() || !fingerprintPattern.test(entry.name)) {
      throw new Error(`WEB-M2: asset no inmutable o sin fingerprint: ${entry.name}`);
    }
  }
  return entries.map((entry) => entry.name);
}

export function outputFileForRoute(outDir, route) {
  if (route === "/") return join(outDir, "index.html");
  return join(outDir, `${route.slice(1)}.html`);
}

export async function generateRouteHtml(outDir = resolve("dist"), options = {}) {
  const { renderRoute, buildYear } = options;
  if (typeof renderRoute !== "function") {
    throw new Error("PRERENDER-BUILD: falta renderRoute(route, buildYear)");
  }
  validateBuildYear(buildYear);
  const templatePath = join(outDir, "index.html");
  const template = normalizeRootTemplate(await readFile(templatePath, "utf8"));
  await validateFingerprintAssets(outDir);
  await validateBuiltAssets(template, outDir);
  const pendingWrites = [];

  for (const route of publicRoutePaths) {
    const metadata = getRouteMetadata(route);
    const markup = await renderRoute(route, buildYear);
    const html = injectPrerenderedRoot(injectRouteMetadata(template, metadata), route, buildYear, markup);
    validatePrerenderedRouteHtml(html, metadata, route, buildYear);
    await validateBuiltAssets(html, outDir);
    const destination = outputFileForRoute(outDir, route);
    pendingWrites.push({ destination, html });
  }

  const notFoundRoute = "/__boj_not_found__";
  const notFoundMetadata = getRouteMetadata(notFoundRoute);
  const notFoundMarkup = await renderRoute(notFoundRoute, buildYear);
  const notFoundHtml = injectPrerenderedRoot(
    injectRouteMetadata(template, notFoundMetadata),
    notFoundRoute,
    buildYear,
    notFoundMarkup
  );
  validatePrerenderedRouteHtml(notFoundHtml, notFoundMetadata, notFoundRoute, buildYear);
  await validateBuiltAssets(notFoundHtml, outDir);
  const notFoundPath = join(outDir, "404.html");
  pendingWrites.push({ destination: notFoundPath, html: notFoundHtml });

  // No se publica una matriz parcial si alguna ruta falla durante render o validación.
  for (const { destination, html } of pendingWrites) {
    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, html, "utf8");
  }

  return pendingWrites.map(({ destination }) => destination);
}

const invokedPath = process.argv[1] ? pathToFileURL(resolve(process.argv[1])).href : "";
if (invokedPath === import.meta.url) {
  throw new Error("PRERENDER-BUILD: ejecutá `npm run build` para generar cliente, SSR y rutas");
}
