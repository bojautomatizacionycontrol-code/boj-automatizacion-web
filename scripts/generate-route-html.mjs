import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

import {
  getRouteMetadata,
  publicRoutePaths,
  SITE_ORIGIN,
} from "../src/route-metadata.js";
import { serializeJsonLd, validateBuiltCsp } from "./csp-policy.mjs";

export const ROUTE_METADATA_START = "<!-- BOJ_ROUTE_METADATA_START -->";
export const ROUTE_METADATA_END = "<!-- BOJ_ROUTE_METADATA_END -->";

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
    `    <meta property="og:image:alt" content="${escapeHtml(metadata.imageAlt)}" />`,
    `    <meta name="twitter:title" content="${escapeHtml(metadata.title)}" />`,
    `    <meta name="twitter:description" content="${escapeHtml(metadata.description)}" />`,
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
    `<meta property="og:image:alt" content="${escapeHtml(metadata.imageAlt)}" />`,
    `og:image:alt ${metadata.route}`
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
  if (occurrences(html, /<title>/g) !== 1) {
    throw new Error(`SEO-BUILD: title duplicado en ${metadata.route}`);
  }
}

function localAssetPath(value) {
  if (value.startsWith(`${SITE_ORIGIN}/`)) return new URL(value).pathname;
  return value.startsWith("/") ? value : null;
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

export function outputFileForRoute(outDir, route) {
  if (route === "/") return join(outDir, "index.html");
  return join(outDir, `${route.slice(1)}.html`);
}

export async function generateRouteHtml(outDir = resolve("dist")) {
  const templatePath = join(outDir, "index.html");
  const template = await readFile(templatePath, "utf8");
  await validateBuiltAssets(template, outDir);
  const generated = [];

  for (const route of publicRoutePaths) {
    const metadata = getRouteMetadata(route);
    const html = injectRouteMetadata(template, metadata);
    validateRouteHtml(html, metadata);
    const destination = outputFileForRoute(outDir, route);
    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, html, "utf8");
    generated.push(destination);
  }

  const notFoundMetadata = getRouteMetadata("/__boj_not_found__");
  const notFoundHtml = injectRouteMetadata(template, notFoundMetadata);
  validateRouteHtml(notFoundHtml, notFoundMetadata);
  const notFoundPath = join(outDir, "404.html");
  await writeFile(notFoundPath, notFoundHtml, "utf8");
  generated.push(notFoundPath);

  return generated;
}

const invokedPath = process.argv[1] ? pathToFileURL(resolve(process.argv[1])).href : "";
if (invokedPath === import.meta.url) {
  const generated = await generateRouteHtml();
  const csp = await validateBuiltCsp(generated);
  console.log(`SEO_ROUTE_HTML: ${generated.length - 1} routes + 404`);
  console.log(`CSP_BUILD: ${csp.generatedFiles} HTML, ${csp.inlineScripts} JSON-LD, ${csp.hashes} hashes`);
}
