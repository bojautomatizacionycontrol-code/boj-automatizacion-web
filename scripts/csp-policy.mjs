import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

import { getRouteMetadata, publicRoutePaths } from "../src/route-metadata.js";

export const CSP_HEADER_NAME = "Content-Security-Policy";
export const CSP_HEADER_SOURCE = "/(.*)";

export const REQUIRED_CSP_DIRECTIVES = Object.freeze([
  "default-src",
  "base-uri",
  "object-src",
  "frame-ancestors",
  "frame-src",
  "script-src",
  "script-src-attr",
  "style-src",
  "style-src-attr",
  "img-src",
  "font-src",
  "connect-src",
  "form-action",
  "manifest-src",
  "worker-src",
]);

// Inventory physically demonstrated by index.html and the production bundle.
// Vercel Analytics and /api/contact remain same-origin. The Google origins are
// limited to the stylesheet, font files and their explicit preconnect hints.
export const CSP_SOURCE_INVENTORY = Object.freeze({
  externalStyles: Object.freeze(["https://fonts.googleapis.com"]),
  externalFonts: Object.freeze(["https://fonts.gstatic.com"]),
  externalPreconnects: Object.freeze([
    "https://fonts.googleapis.com",
    "https://fonts.gstatic.com",
  ]),
  reactStylePropertyReason:
    "Three React object-position values are assigned through element.style properties, not inline CSS text.",
});

const ALLOWED_EXTERNAL_SOURCES = new Set([
  ...CSP_SOURCE_INVENTORY.externalStyles,
  ...CSP_SOURCE_INVENTORY.externalFonts,
  ...CSP_SOURCE_INVENTORY.externalPreconnects,
]);

export function serializeJsonLd(value) {
  return JSON.stringify(value).replaceAll("<", "\\u003c");
}

export function sha256Source(value) {
  const digest = createHash("sha256").update(value, "utf8").digest("base64");
  return `'sha256-${digest}'`;
}

export function getJsonLdHashSources() {
  return Object.freeze(
    [...new Set(
      publicRoutePaths
        .map((route) => getRouteMetadata(route).jsonLd)
        .filter(Boolean)
        .map((jsonLd) => sha256Source(serializeJsonLd(jsonLd)))
    )].sort()
  );
}

export function getCspDirectives() {
  const jsonLdHashes = getJsonLdHashSources();
  return Object.freeze([
    Object.freeze(["default-src", "'self'"]),
    Object.freeze(["base-uri", "'self'"]),
    Object.freeze(["object-src", "'none'"]),
    Object.freeze(["frame-ancestors", "'none'"]),
    Object.freeze(["frame-src", "'none'"]),
    Object.freeze(["script-src", "'self'", ...jsonLdHashes]),
    Object.freeze(["script-src-attr", "'none'"]),
    Object.freeze(["style-src", "'self'", ...CSP_SOURCE_INVENTORY.externalStyles]),
    Object.freeze(["style-src-attr", "'none'"]),
    Object.freeze(["img-src", "'self'"]),
    Object.freeze(["font-src", "'self'", ...CSP_SOURCE_INVENTORY.externalFonts]),
    Object.freeze(["connect-src", "'self'"]),
    Object.freeze(["form-action", "'self'"]),
    Object.freeze(["manifest-src", "'none'"]),
    Object.freeze(["worker-src", "'none'"]),
  ]);
}

export function buildContentSecurityPolicy() {
  return getCspDirectives()
    .map(([directive, ...sources]) => `${directive} ${sources.join(" ")}`)
    .join("; ");
}

export function parseContentSecurityPolicy(policy) {
  if (typeof policy !== "string" || !policy.trim()) {
    throw new Error("CSP: política ausente");
  }

  const directives = new Map();
  for (const segment of policy.split(";")) {
    const tokens = segment.trim().split(/\s+/).filter(Boolean);
    if (tokens.length === 0) continue;
    const [name, ...sources] = tokens;
    if (!/^[a-z][a-z0-9-]*$/.test(name)) {
      throw new Error(`CSP: directiva inválida ${name}`);
    }
    if (directives.has(name)) {
      throw new Error(`CSP: directiva duplicada ${name}`);
    }
    if (sources.length === 0) {
      throw new Error(`CSP: directiva sin valor ${name}`);
    }
    directives.set(name, sources);
  }
  return directives;
}

function sameMembers(actual, expected) {
  return actual.length === expected.length && actual.every((value) => expected.includes(value));
}

export function validateContentSecurityPolicy(policy) {
  const directives = parseContentSecurityPolicy(policy);
  for (const required of REQUIRED_CSP_DIRECTIVES) {
    if (!directives.has(required)) throw new Error(`CSP: falta ${required}`);
  }

  for (const [directive, sources] of directives) {
    if (sources.includes("'unsafe-eval'")) {
      throw new Error(`CSP: unsafe-eval prohibido en ${directive}`);
    }
    if (sources.some((source) => source.includes("*"))) {
      throw new Error(`CSP: comodín prohibido en ${directive}`);
    }
    for (const source of sources.filter((value) => /^https?:\/\//.test(value))) {
      if (!ALLOWED_EXTERNAL_SOURCES.has(source)) {
        throw new Error(`CSP: origen externo no autorizado ${source}`);
      }
    }
  }

  if (directives.get("script-src").includes("'unsafe-inline'")) {
    throw new Error("CSP: unsafe-inline prohibido en script-src");
  }
  if (directives.get("style-src").includes("'unsafe-inline'")) {
    throw new Error("CSP: unsafe-inline debe limitarse a style-src-attr");
  }
  if (!sameMembers(directives.get("style-src-attr"), ["'none'"])) {
    throw new Error("CSP: style-src-attr debe permanecer bloqueado");
  }

  const actualHashes = directives.get("script-src").filter((source) => source.startsWith("'sha256-"));
  const expectedHashes = [...getJsonLdHashSources()];
  if (!sameMembers(actualHashes, expectedHashes)) {
    throw new Error("CSP: hashes JSON-LD incorrectos o incompletos");
  }

  const expected = buildContentSecurityPolicy();
  if (policy !== expected) {
    throw new Error("CSP: política divergente del inventario determinista");
  }
  return directives;
}

export function getConfiguredCsp(vercelConfig) {
  const matches = (vercelConfig.headers || [])
    .flatMap((rule) => (rule.headers || []).map((header) => ({ source: rule.source, ...header })))
    .filter((header) => header.key?.toLowerCase() === CSP_HEADER_NAME.toLowerCase());
  if (matches.length !== 1) {
    throw new Error(`CSP: se esperaba un único header; actual=${matches.length}`);
  }
  if (matches[0].source !== CSP_HEADER_SOURCE) {
    throw new Error(`CSP: cobertura global inválida ${matches[0].source}`);
  }
  return matches[0].value;
}

export function validateVercelCspConfig(vercelConfig) {
  const policy = getConfiguredCsp(vercelConfig);
  validateContentSecurityPolicy(policy);
  return policy;
}

function extractInlineScripts(html) {
  return [...html.matchAll(/<script\b(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/gi)]
    .map((match) => ({ attributes: match[1], content: match[2] }));
}

export async function validateBuiltCsp(generatedPaths, vercelConfig) {
  if (!Array.isArray(generatedPaths) || generatedPaths.length !== publicRoutePaths.length + 1) {
    throw new Error(`CSP-BUILD: se esperaban 35 rutas + 404; actual=${generatedPaths?.length ?? 0}`);
  }

  const config = vercelConfig || JSON.parse(
    await readFile(new URL("../vercel.json", import.meta.url), "utf8")
  );
  const policy = validateVercelCspConfig(config);
  const expectedHashes = new Set(getJsonLdHashSources());
  const observedHashes = new Set();
  let inlineScriptCount = 0;

  for (const filePath of generatedPaths) {
    const html = await readFile(filePath, "utf8");
    for (const script of extractInlineScripts(html)) {
      inlineScriptCount += 1;
      if (!/\bid="boj-route-jsonld"/.test(script.attributes) ||
          !/\btype="application\/ld\+json"/.test(script.attributes)) {
        throw new Error(`CSP-BUILD: script inline no inventariado en ${filePath}`);
      }
      const hash = sha256Source(script.content);
      if (!policy.includes(hash)) {
        throw new Error(`CSP-BUILD: hash ausente para ${filePath}`);
      }
      observedHashes.add(hash);
    }
  }

  if (inlineScriptCount !== expectedHashes.size ||
      !sameMembers([...observedHashes], [...expectedHashes])) {
    throw new Error(
      `CSP-BUILD: inventario JSON-LD divergente; scripts=${inlineScriptCount} hashes=${observedHashes.size}`
    );
  }

  return Object.freeze({
    generatedFiles: generatedPaths.length,
    inlineScripts: inlineScriptCount,
    hashes: observedHashes.size,
  });
}

const directInvocation = process.argv[1]
  ? pathToFileURL(resolve(process.argv[1])).href === import.meta.url
  : false;
if (directInvocation) {
  console.log(buildContentSecurityPolicy());
}
