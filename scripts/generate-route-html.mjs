import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { gzipSync } from "node:zlib";

import {
  getRouteMetadata,
  publicRoutePaths,
  SITE_ORIGIN,
} from "../src/route-metadata.js";
import { serializeJsonLd } from "./csp-policy.mjs";

export const ROUTE_METADATA_START = "<!-- BOJ_ROUTE_METADATA_START -->";
export const ROUTE_METADATA_END = "<!-- BOJ_ROUTE_METADATA_END -->";
export const ROOT_SHELL = '<div id="root"></div>';
// #40 conserva el SSR completo e hidratable. Estos techos parten del artefacto
// auditado (74.416 B por documento; 1.115.044 B la matriz) y detectan deriva sin
// convertirlo en el shell mínimo de #41.
export const SSR_HTML_DOCUMENT_BUDGET = Object.freeze({ raw: 96_000, gzip: 18_000 });
export const SSR_HTML_MATRIX_BUDGET = Object.freeze({ raw: 1_300_000, gzip: 300_000 });

const NOT_FOUND_ROUTE = "/__boj_not_found__";
const VOID_ELEMENTS = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input", "link",
  "meta", "param", "source", "track", "wbr",
]);

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

function escapePattern(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function decodeHtmlAttribute(value) {
  return value.replace(/&(?:#(\d+)|#x([\da-f]+)|(amp|quot|apos|lt|gt));/gi, (entity, decimal, hexadecimal, named) => {
    if (decimal) return String.fromCodePoint(Number(decimal));
    if (hexadecimal) return String.fromCodePoint(Number.parseInt(hexadecimal, 16));
    return { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">" }[named.toLowerCase()];
  });
}

function stripMarkup(value) {
  return decodeHtmlAttribute(value.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeDocumentPath(pathname) {
  let normalized = pathname || "/";
  normalized = normalized.replace(/\/index\.html$/i, "/");
  normalized = normalized.replace(/\.html$/i, "");
  if (normalized.length > 1) normalized = normalized.replace(/\/+$/, "");
  return normalized || "/";
}

function documentUrlForRoute(route) {
  return new URL(route === NOT_FOUND_ROUTE ? "/404.html" : route, SITE_ORIGIN);
}

function parseTagAttributes(source) {
  const name = source.match(/^<\s*[^\s/>]+/)?.[0] || "";
  const attributes = new Map();
  const pattern = /([^\s"'<>\/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  pattern.lastIndex = name.length;
  let match;
  while ((match = pattern.exec(source))) {
    const attributeName = match[1].toLowerCase();
    const value = decodeHtmlAttribute(match[2] ?? match[3] ?? match[4] ?? "");
    const values = attributes.get(attributeName) || [];
    values.push(value);
    attributes.set(attributeName, values);
  }
  return attributes;
}

function openingTags(markup, tagName = null) {
  const pattern = tagName
    ? new RegExp(`<${escapePattern(tagName)}\\b[^>]*>`, "gi")
    : /<([a-z][a-z0-9:-]*)\b[^>]*>/gi;
  return [...markup.matchAll(pattern)].map((match) => ({
    index: match.index,
    source: match[0],
    tagName: (tagName || match[1]).toLowerCase(),
    attributes: parseTagAttributes(match[0]),
  }));
}

function attributeValues(tag, name) {
  return tag.attributes.get(name.toLowerCase()) || [];
}

function attributeValue(tag, name) {
  const values = attributeValues(tag, name);
  return values.length === 1 ? values[0] : null;
}

function hasAttribute(tag, name) {
  return tag.attributes.has(name.toLowerCase());
}

function attributeEquals(tag, name, expected) {
  return attributeValues(tag, name).some((value) => value.toLowerCase() === expected.toLowerCase());
}

function relIncludes(tag, expected) {
  return attributeValues(tag, "rel").some((value) =>
    value.toLowerCase().split(/\s+/).includes(expected.toLowerCase())
  );
}

function isExplicitlyHidden(tag) {
  return hasAttribute(tag, "hidden") || hasAttribute(tag, "inert") || attributeEquals(tag, "aria-hidden", "true");
}

function anchorHrefs(markup) {
  return openingTags(markup, "a")
    .flatMap((tag) => attributeValues(tag, "href"));
}

export function getSameDocumentFragmentIds(markup, route) {
  const current = documentUrlForRoute(route);
  const currentPath = normalizeDocumentPath(current.pathname);
  const ids = [];

  for (const href of anchorHrefs(markup)) {
    if (!href.includes("#")) continue;
    let target;
    try {
      target = new URL(href, current);
    } catch (error) {
      throw new Error(`PRERENDER-BUILD: enlace con fragmento inválido en ${route}: ${href}`, { cause: error });
    }
    if (target.origin !== current.origin ||
        normalizeDocumentPath(target.pathname) !== currentPath ||
        target.search !== current.search) continue;

    const rawFragment = href.slice(href.indexOf("#") + 1);
    if (!rawFragment) {
      throw new Error(`PRERENDER-BUILD: fragmento vacío en ${route}`);
    }
    let id;
    try {
      id = decodeURIComponent(target.hash.slice(1));
    } catch (error) {
      throw new Error(`PRERENDER-BUILD: fragmento inválido en ${route}: ${target.hash}`, { cause: error });
    }
    if (!id) throw new Error(`PRERENDER-BUILD: fragmento vacío en ${route}`);
    if (!ids.includes(id)) ids.push(id);
  }

  return ids;
}

function idOccurrences(markup, id) {
  return openingTags(markup).flatMap((tag) =>
    attributeValues(tag, "id")
      .filter((value) => value === id)
      .map(() => tag)
  );
}

function extractElementFrom(markup, tagName, elementStart, label) {
  if (VOID_ELEMENTS.has(tagName)) {
    const end = markup.indexOf(">", elementStart);
    if (end === -1) throw new Error(`PRERENDER-BUILD: <${tagName}> incompleto para ${label}`);
    return markup.slice(elementStart, end + 1);
  }

  const tagPattern = new RegExp(`<\\/?${escapePattern(tagName)}\\b[^>]*>`, "gi");
  tagPattern.lastIndex = elementStart;
  let depth = 0;
  let match;
  while ((match = tagPattern.exec(markup))) {
    if (match[0].startsWith("</")) depth -= 1;
    else if (!/\/>$/.test(match[0])) depth += 1;
    if (depth === 0) return markup.slice(elementStart, tagPattern.lastIndex);
  }
  throw new Error(`PRERENDER-BUILD: <${tagName}> sin cierre para ${label}`);
}

function extractElementsByTag(markup, tagName) {
  const openingPattern = new RegExp(`<${escapePattern(tagName)}\\b[^>]*>`, "gi");
  const elements = [];
  let match;
  while ((match = openingPattern.exec(markup))) {
    const element = extractElementFrom(markup, tagName, match.index, `<${tagName}>`);
    elements.push(element);
    openingPattern.lastIndex = match.index + element.length;
  }
  return elements;
}

function extractElementById(markup, id) {
  const matches = idOccurrences(markup, id);
  if (matches.length !== 1) {
    throw new Error(`PRERENDER-BUILD: destino #${id} debe aparecer exactamente una vez; actual=${matches.length}`);
  }

  const target = matches[0];
  if (isExplicitlyHidden(target)) {
    throw new Error(`PRERENDER-BUILD: destino #${id} está oculto y no es semánticamente navegable`);
  }
  return extractElementFrom(markup, target.tagName, target.index, `#${id}`);
}

function validateSameDocumentFragments(markup, route) {
  const fragments = getSameDocumentFragmentIds(markup, route);
  for (const id of fragments) {
    const target = extractElementById(markup, id);
    if (stripMarkup(target).length < 12) {
      throw new Error(`PRERENDER-BUILD: destino semántico insuficiente para #${id} en ${route}`);
    }
  }
  return fragments;
}

function internalLinkDestinations(markup, route) {
  const current = documentUrlForRoute(route);
  const publicDestinations = new Set(publicRoutePaths.map(normalizeDocumentPath));
  const destinations = new Set();
  for (const href of anchorHrefs(markup)) {
    if (!href.trim() || href.trim().startsWith("#")) continue;
    let target;
    try {
      target = new URL(href, current);
    } catch {
      continue;
    }
    if (target.origin !== current.origin || !/^https?:$/.test(target.protocol)) continue;
    const lastSegment = target.pathname.split("/").pop() || "";
    const extension = lastSegment.match(/\.([a-z0-9]+)$/i)?.[1]?.toLowerCase();
    if ((extension && extension !== "html") || target.pathname.startsWith("/api/")) continue;
    const destination = normalizeDocumentPath(target.pathname);
    if (!publicDestinations.has(destination)) {
      throw new Error(`PRERENDER-BUILD: enlace interno sin destino publicable en ${route}: ${href}`);
    }
    destinations.add(destination);
  }
  return destinations;
}

function htmlSize(html) {
  const content = Buffer.from(html);
  return Object.freeze({ raw: content.length, gzip: gzipSync(content).length });
}

function enforceHtmlBudget(label, actual, budget) {
  if (actual.raw > budget.raw || actual.gzip > budget.gzip) {
    throw new Error(
      `PRERENDER-BUILD: ${label} excede presupuesto HTML ` +
      `raw=${actual.raw}/${budget.raw} gzip=${actual.gzip}/${budget.gzip}`
    );
  }
}

export function validateHtmlBudgets(documents) {
  if (!Array.isArray(documents) || !documents.length) {
    throw new Error("PRERENDER-BUILD: matriz HTML vacía");
  }
  let raw = 0;
  let gzip = 0;
  let largest = null;
  for (const document of documents) {
    if (typeof document?.html !== "string" || !document.label) {
      throw new Error("PRERENDER-BUILD: documento HTML inválido para presupuesto");
    }
    const size = htmlSize(document.html);
    enforceHtmlBudget(document.label, size, SSR_HTML_DOCUMENT_BUDGET);
    raw += size.raw;
    gzip += size.gzip;
    if (!largest || size.gzip > largest.gzip) largest = { label: document.label, ...size };
  }
  const total = { raw, gzip };
  enforceHtmlBudget(`matriz ${documents.length - 1}+404`, total, SSR_HTML_MATRIX_BUDGET);
  return Object.freeze({ count: documents.length, total: Object.freeze(total), largest: Object.freeze(largest) });
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
  if (/\broute-loading\b/.test(markup) ||
      /<!--\$(?:!|\?)-->/.test(markup) ||
      openingTags(markup, "template").some((tag) =>
        attributeValues(tag, "id").some((id) => /^B:\d+$/i.test(id)) ||
        hasAttribute(tag, "data-msg") ||
        hasAttribute(tag, "data-digest")
      )) {
    throw new Error(`PRERENDER-BUILD: Suspense emitió el fallback en ${route}`);
  }

  const mains = openingTags(markup, "main");
  const headers = openingTags(markup, "header");
  const footers = openingTags(markup, "footer");
  const headings = openingTags(markup, "h1");
  const mainContentCount = mains.filter((tag) =>
    attributeValues(tag, "id").length === 1 && attributeValue(tag, "id") === "main-content"
  ).length;
  if (mains.length !== 1) {
    throw new Error(`PRERENDER-BUILD: ${route} debe contener un main; actual=${mains.length}`);
  }
  if (mainContentCount !== 1) {
    throw new Error(`PRERENDER-BUILD: ${route} debe conservar main#main-content; actual=${mainContentCount}`);
  }
  if (headers.length !== 1) {
    throw new Error(`PRERENDER-BUILD: ${route} debe contener un header; actual=${headers.length}`);
  }
  if (footers.length !== 1) {
    throw new Error(`PRERENDER-BUILD: ${route} debe contener un footer; actual=${footers.length}`);
  }
  if (headings.length !== 1) {
    throw new Error(`PRERENDER-BUILD: ${route} debe contener exactamente un h1; actual=${headings.length}`);
  }
  for (const [label, tag] of [["main", mains[0]], ["header", headers[0]], ["footer", footers[0]], ["h1", headings[0]]]) {
    if (isExplicitlyHidden(tag)) {
      throw new Error(`PRERENDER-BUILD: ${route} no puede ocultar el ${label} semántico`);
    }
  }
  const headerMarkup = extractElementFrom(markup, "header", headers[0].index, "<header>");
  const headerNavigations = openingTags(headerMarkup, "nav");
  if (!headerNavigations.some((navigation) =>
    !isExplicitlyHidden(navigation) && anchorHrefs(extractElementFrom(headerMarkup, "nav", navigation.index, "<nav>"))
      .some((href) => href.trim())
  )) {
    throw new Error(`PRERENDER-BUILD: ${route} debe conservar navegación enlazada`);
  }

  for (const [index, image] of openingTags(markup, "img").entries()) {
    for (const attribute of ["width", "height"]) {
      const value = attributeValue(image, attribute);
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

  const fragments = validateSameDocumentFragments(markup, route);
  const internalLinks = internalLinkDestinations(markup, route);
  if (internalLinks.size < 5) {
    throw new Error(
      `PRERENDER-BUILD: enlaces internos insuficientes en ${route}; destinos=${internalLinks.size}`
    );
  }

  return Object.freeze({
    fragments: Object.freeze(fragments),
    internalLinks: internalLinks.size,
    visibleText: visibleText.length,
  });
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
  const metaTags = openingTags(html, "meta");
  const linkTags = openingTags(html, "link");
  const scriptTags = openingTags(html, "script");
  const metaCount = (attribute, value) => metaTags.filter((tag) => attributeEquals(tag, attribute, value)).length;
  const canonicalTags = linkTags.filter((tag) => relIncludes(tag, "canonical"));
  const ogUrlTags = metaTags.filter((tag) => attributeEquals(tag, "property", "og:url"));

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
    if (canonicalTags.length !== 1 || attributeValue(canonicalTags[0], "href") !== metadata.canonical) {
      throw new Error(`SEO-BUILD: canonical inválido o duplicado en ${metadata.route}`);
    }
    if (ogUrlTags.length !== 1 || attributeValue(ogUrlTags[0], "content") !== metadata.canonical) {
      throw new Error(`SEO-BUILD: og:url inválido o duplicado en ${metadata.route}`);
    }
  } else {
    if (canonicalTags.length !== 0) {
      throw new Error(`SEO-BUILD: ${metadata.route} no debe declarar canonical`);
    }
    if (ogUrlTags.length !== 0) {
      throw new Error(`SEO-BUILD: ${metadata.route} no debe declarar og:url`);
    }
  }

  const alternateCount = linkTags.filter((tag) => hasAttribute(tag, "data-boj-route-alternate")).length;
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

  const jsonLdTags = scriptTags.filter((tag) => attributeEquals(tag, "id", "boj-route-jsonld"));
  const jsonLdMatches = [...html.matchAll(/<script id="boj-route-jsonld" type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (metadata.jsonLd) {
    if (jsonLdTags.length !== 1 ||
        !attributeEquals(jsonLdTags[0], "type", "application/ld+json") ||
        jsonLdMatches.length !== 1) {
      throw new Error(`SEO-BUILD: JSON-LD inválido en ${metadata.route}`);
    }
    const parsed = JSON.parse(jsonLdMatches[0][1]);
    if (JSON.stringify(parsed) !== JSON.stringify(metadata.jsonLd)) {
      throw new Error(`SEO-BUILD: JSON-LD divergente en ${metadata.route}`);
    }
  } else if (jsonLdTags.length !== 0 || jsonLdMatches.length !== 0) {
    throw new Error(`SEO-BUILD: ${metadata.route} no debe declarar JSON-LD`);
  }

  const moduleEntrypoints = scriptTags.filter((tag) => attributeEquals(tag, "type", "module"));
  if (moduleEntrypoints.length !== 1 ||
      !/^\/assets\/[^/?#]+$/.test(attributeValue(moduleEntrypoints[0], "src") || "")) {
    throw new Error(
      `SEO-BUILD: ${metadata.route} debe conservar exactamente un entrypoint SPA; actual=${moduleEntrypoints.length}`
    );
  }
  if (metaCount("name", "description") !== 1) {
    throw new Error(`SEO-BUILD: description duplicada en ${metadata.route}`);
  }
  if (metaCount("name", "robots") !== 1) {
    throw new Error(`SEO-BUILD: robots duplicado en ${metadata.route}`);
  }
  if (metaCount("property", "og:image") !== 1) {
    throw new Error(`SEO-BUILD: og:image duplicada en ${metadata.route}`);
  }
  if (metaCount("name", "twitter:image") !== 1) {
    throw new Error(`SEO-BUILD: twitter:image duplicada en ${metadata.route}`);
  }
  if (openingTags(html, "title").length !== 1) {
    throw new Error(`SEO-BUILD: title duplicado en ${metadata.route}`);
  }
}

function localAssetPath(value, basePathname = "/") {
  let target;
  try {
    target = new URL(value, new URL(basePathname, SITE_ORIGIN));
  } catch {
    return null;
  }
  return target.origin === SITE_ORIGIN && /^https?:$/.test(target.protocol) ? target.pathname : null;
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
  const scripts = openingTags(html, "script");
  const links = openingTags(html, "link");
  const metas = openingTags(html, "meta");
  const moduleEntrypoints = scripts
    .filter((tag) => attributeEquals(tag, "type", "module"))
    .map((tag) => attributeValue(tag, "src"));
  if (moduleEntrypoints.length !== 1 || !moduleEntrypoints[0]) {
    throw new Error(`SEO-BUILD: se esperaba un único entrypoint de módulo; actual=${moduleEntrypoints.length}`);
  }
  validateBodyAssetReference(moduleEntrypoints[0]);

  const stylesheets = links
    .filter((tag) => relIncludes(tag, "stylesheet"))
    .map((tag) => attributeValue(tag, "href"))
    .filter((href) => href && localAssetPath(href));
  if (stylesheets.length !== 1) {
    throw new Error(`SEO-BUILD: se esperaba una única hoja de estilo compilada; actual=${stylesheets.length}`);
  }

  const localReferences = new Set([...moduleEntrypoints, ...stylesheets]);
  for (const tag of links) {
    if (relIncludes(tag, "icon") || relIncludes(tag, "apple-touch-icon") ||
        relIncludes(tag, "preload") || relIncludes(tag, "modulepreload")) {
      const reference = attributeValue(tag, "href");
      if (!reference) throw new Error("SEO-BUILD: link de asset sin href único");
      validateBodyAssetReference(reference);
      localReferences.add(reference);
    }
  }
  for (const tag of metas) {
    if (attributeEquals(tag, "property", "og:image") || attributeEquals(tag, "name", "twitter:image")) {
      const reference = attributeValue(tag, "content");
      if (!reference) throw new Error("SEO-BUILD: imagen social sin content único");
      localReferences.add(reference);
    }
  }
  const bodyReferences = new Set();
  for (const tagName of ["img", "source", "video", "audio", "track", "embed"]) {
    for (const tag of openingTags(html, tagName)) {
      for (const attribute of ["src", "poster"]) {
        for (const reference of attributeValues(tag, attribute)) bodyReferences.add(reference);
      }
    }
  }
  for (const tag of openingTags(html)) {
    for (const srcset of attributeValues(tag, "srcset")) {
      for (const candidate of srcset.split(",")) {
        const reference = candidate.trim().split(/\s+/)[0];
        if (reference) bodyReferences.add(reference);
      }
    }
  }
  for (const tag of openingTags(html, "object")) {
    for (const reference of attributeValues(tag, "data")) bodyReferences.add(reference);
  }
  for (const reference of bodyReferences) {
    validateBodyAssetReference(reference);
    localReferences.add(reference);
  }

  const verifiedAssets = new Map();
  for (const reference of localReferences) {
    const pathname = localAssetPath(reference);
    if (!pathname) continue;
    let relativePath;
    try {
      relativePath = decodeURIComponent(pathname).replace(/^\/+/, "");
    } catch (error) {
      throw new Error(`SEO-BUILD: referencia de asset inválida: ${reference}`, { cause: error });
    }
    if (!relativePath || relativePath.includes("..")) {
      throw new Error(`SEO-BUILD: referencia de asset inválida: ${reference}`);
    }
    const assetPath = join(outDir, relativePath);
    const asset = await stat(assetPath).catch(() => null);
    if (!asset?.isFile()) {
      throw new Error(`SEO-BUILD: asset referenciado inexistente: ${reference}`);
    }
    verifiedAssets.set(reference, assetPath);
  }

  for (const stylesheet of stylesheets) {
    const stylesheetPath = verifiedAssets.get(stylesheet);
    const stylesheetUrl = `/${relative(outDir, stylesheetPath).replaceAll("\\", "/")}`;
    const css = await readFile(stylesheetPath, "utf8");
    for (const match of css.matchAll(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^)'"\s][^)]*?))\s*\)/gi)) {
      const reference = (match[1] ?? match[2] ?? match[3] ?? "").trim();
      if (!reference || reference.startsWith("#") || /^data:/i.test(reference)) continue;
      if (/^(?:undefined|null)$/i.test(reference) || reference.startsWith("//") ||
          reference.includes("/src/") || reference.includes(".prerender")) {
        throw new Error(`PRERENDER-BUILD: referencia CSS no publicable: ${reference}`);
      }
      const pathname = localAssetPath(reference, stylesheetUrl);
      if (!pathname) throw new Error(`PRERENDER-BUILD: asset CSS externo prohibido: ${reference}`);
      let cssRelativePath;
      try {
        cssRelativePath = decodeURIComponent(pathname).replace(/^\/+/, "");
      } catch (error) {
        throw new Error(`SEO-BUILD: referencia CSS inválida: ${reference}`, { cause: error });
      }
      const cssAssetPath = resolve(outDir, cssRelativePath);
      const outside = relative(resolve(outDir), cssAssetPath);
      if (!cssRelativePath || outside.startsWith("..") || resolve(outDir) === cssAssetPath) {
        throw new Error(`SEO-BUILD: referencia CSS inválida: ${reference}`);
      }
      const cssAsset = await stat(cssAssetPath).catch(() => null);
      if (!cssAsset?.isFile()) {
        throw new Error(`SEO-BUILD: asset CSS referenciado inexistente: ${reference}`);
      }
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
    pendingWrites.push({ route, destination, html });
  }

  const notFoundRoute = NOT_FOUND_ROUTE;
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
  pendingWrites.push({ route: notFoundRoute, destination: notFoundPath, html: notFoundHtml });

  const expectedHtmlCount = publicRoutePaths.length + 1;
  if (pendingWrites.length !== expectedHtmlCount ||
      new Set(pendingWrites.map(({ destination }) => destination)).size !== expectedHtmlCount) {
    throw new Error(
      `PRERENDER-BUILD: matriz incompleta o duplicada; esperada=${expectedHtmlCount} actual=${pendingWrites.length}`
    );
  }
  validateHtmlBudgets(
    pendingWrites.map(({ route, html }) => ({ label: route === NOT_FOUND_ROUTE ? "404.html" : route, html }))
  );

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
