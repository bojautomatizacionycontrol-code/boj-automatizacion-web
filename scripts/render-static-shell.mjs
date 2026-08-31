import { PassThrough } from "node:stream";
import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";

import { createServer } from "vite";

export const STATIC_SHELL_START = "<!-- BOJ_STATIC_SHELL_START -->";
export const STATIC_SHELL_END = "<!-- BOJ_STATIC_SHELL_END -->";
const STATIC_SITE_ORIGIN = "https://www.bojautomatizacion.com";

function exactOccurrences(value, literal) {
  return value.split(literal).length - 1;
}

function extractElementFrom(markup, tagName, elementStart, label) {
  const tagPattern = new RegExp(`<\\/?${tagName}\\b[^>]*>`, "gi");
  tagPattern.lastIndex = elementStart;
  let depth = 0;
  let match;
  while ((match = tagPattern.exec(markup))) {
    depth += match[0].startsWith(`</`) ? -1 : 1;
    if (depth === 0) return markup.slice(elementStart, tagPattern.lastIndex);
  }

  throw new Error(`WEB-M3: <${tagName}> sin cierre para ${label}`);
}

function extractElement(markup, tagName, marker) {
  const markerIndex = markup.indexOf(marker);
  if (markerIndex === -1) {
    throw new Error(`WEB-M3: no se encontró ${marker}`);
  }

  const elementStart = markup.lastIndexOf(`<${tagName}`, markerIndex);
  if (elementStart === -1) {
    throw new Error(`WEB-M3: no se encontró <${tagName}> para ${marker}`);
  }
  return extractElementFrom(markup, tagName, elementStart, marker);
}

function stripMarkup(value) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replace(/\s+/g, " ")
    .trim();
}

function extractText(markup, pattern, label) {
  const matches = [...markup.matchAll(pattern)];
  if (matches.length !== 1) {
    throw new Error(`WEB-M3: ${label} debe aparecer exactamente una vez; actual=${matches.length}`);
  }
  return stripMarkup(matches[0][1]);
}

function extractHeroWrapper(main, hero) {
  const mainOpenEnd = main.indexOf(">") + 1;
  const heroStart = main.indexOf(hero, mainOpenEnd);
  if (mainOpenEnd === 0 || heroStart === -1) {
    throw new Error("WEB-M3: el hero no pertenece al main inicial");
  }

  const sourcePrefix = main.slice(mainOpenEnd, heroStart);
  const prefix = sourcePrefix.replace(/<!--[\s\S]*?-->/g, "");
  const openingTags = [...prefix.matchAll(/<([a-z][a-z0-9-]*)\b[^>]*>/gi)];
  const unexplained = prefix.replace(/<([a-z][a-z0-9-]*)\b[^>]*>/gi, "").trim();
  if (unexplained) {
    throw new Error(`WEB-M3: contenido inesperado antes del hero: ${stripMarkup(unexplained).slice(0, 80)}`);
  }

  const voidElements = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"]);
  const wrapperNames = openingTags
    .map((match) => match[1].toLowerCase())
    .filter((tagName) => !voidElements.has(tagName));
  const suffix = wrapperNames.reverse().map((tagName) => `</${tagName}>`).join("");
  return { prefix, suffix };
}

function escapePattern(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function idOccurrences(markup, id) {
  return [...markup.matchAll(new RegExp(`\\sid="${escapePattern(id)}"`, "g"))];
}

function extractElementById(markup, id) {
  const matches = idOccurrences(markup, id);
  if (matches.length !== 1) {
    throw new Error(`WEB-M3: destino #${id} debe aparecer exactamente una vez; actual=${matches.length}`);
  }
  const elementStart = markup.lastIndexOf("<", matches[0].index);
  const openingEnd = markup.indexOf(">", matches[0].index) + 1;
  const opening = markup.slice(elementStart, openingEnd);
  const tagName = opening.match(/^<([a-z][a-z0-9-]*)\b/i)?.[1]?.toLowerCase();
  if (!tagName) throw new Error(`WEB-M3: elemento inválido para #${id}`);
  return {
    tagName,
    opening,
    markup: extractElementFrom(markup, tagName, elementStart, `#${id}`),
    end: null,
  };
}

function meaningfulParagraph(markup) {
  const paragraphs = [...markup.matchAll(/<p\b[^>]*>[\s\S]*?<\/p>/gi)]
    .map((match) => ({ markup: match[0], text: stripMarkup(match[0]), index: match.index }));
  return paragraphs.find((paragraph) => paragraph.text.length >= 40)
    || paragraphs.sort((left, right) => right.text.length - left.text.length)[0]
    || null;
}

function semanticFragmentSummary(renderedAppHtml, id) {
  const target = extractElementById(renderedAppHtml, id);
  const targetStart = renderedAppHtml.indexOf(target.markup);
  target.end = targetStart + target.markup.length;
  const isHeading = /^h[1-6]$/.test(target.tagName);
  let summary;

  if (isHeading) {
    const following = renderedAppHtml.slice(target.end, target.end + 4_000);
    const paragraph = meaningfulParagraph(following);
    summary = `${target.markup}${paragraph ? paragraph.markup : ""}`;
  } else {
    const heading = target.markup.match(/<h[1-6]\b[^>]*>[\s\S]*?<\/h[1-6]>/i)?.[0] || "";
    const paragraph = meaningfulParagraph(target.markup);
    summary = `${target.opening}${heading}${paragraph ? paragraph.markup : ""}</${target.tagName}>`;
  }

  if (stripMarkup(summary).length < 24) {
    throw new Error(`WEB-M3: destino #${id} no aporta contenido semántico suficiente`);
  }
  return summary;
}

function decodeHtmlAttribute(value) {
  return value.replaceAll("&amp;", "&").replaceAll("&quot;", '"');
}

export function getSameDocumentFragmentIds(markup, route) {
  const current = new URL(route, STATIC_SITE_ORIGIN);
  const ids = [];
  for (const match of markup.matchAll(/\bhref="([^"]+)"/g)) {
    const href = decodeHtmlAttribute(match[1]);
    let target;
    try {
      target = new URL(href, current);
    } catch {
      continue;
    }
    if (target.origin !== current.origin || target.pathname !== current.pathname || !target.hash) continue;
    let id;
    try {
      id = decodeURIComponent(target.hash.slice(1));
    } catch (error) {
      throw new Error(`WEB-M3: fragmento inválido en ${route}: ${target.hash}`, { cause: error });
    }
    if (id && !ids.includes(id)) ids.push(id);
  }
  return ids;
}

export function buildManifestAssetMap(manifest) {
  const assets = new Map();
  for (const entry of Object.values(manifest)) {
    if (!entry?.src || !entry?.file) continue;
    const source = `/${entry.src.replace(/^\/+/, "")}`;
    const output = `/${entry.file.replace(/^\/+/, "")}`;
    const previous = assets.get(source);
    if (previous && previous !== output) {
      throw new Error(`WEB-M3: asset ambiguo en manifest: ${source}`);
    }
    assets.set(source, output);
  }
  if (!assets.size) throw new Error("WEB-M3: manifest de assets vacío");
  return assets;
}

export function rewriteStaticShellAssets(markup, manifest) {
  const assets = manifest instanceof Map ? manifest : buildManifestAssetMap(manifest);
  let rewritten = markup;
  for (const [source, output] of [...assets].sort(([left], [right]) => right.length - left.length)) {
    rewritten = rewritten.replaceAll(source, output);
  }
  if (rewritten.includes("/src/assets/")) {
    const unresolved = rewritten.match(/\/src\/assets\/[^\s"',)]+/)?.[0] || "/src/assets/";
    throw new Error(`WEB-M3: asset del shell sin resolver: ${unresolved}`);
  }
  return rewritten;
}

export function extractStaticShell(renderedAppHtml, route = "/") {
  const skipLink = extractElement(renderedAppHtml, "a", 'class="skip-link"');
  const header = extractElement(renderedAppHtml, "header", 'class="site-header"');
  const main = extractElement(renderedAppHtml, "main", 'id="main-content"');
  const mainOpening = main.match(/^<main\b[^>]*>/i)?.[0];
  if (!mainOpening) throw new Error("WEB-M3: apertura de main inválida");
  const hero = extractElement(renderedAppHtml, "section", 'class="boj-hero"');
  const footer = extractElement(renderedAppHtml, "footer", 'class="site-footer');
  const heroWrapper = extractHeroWrapper(main, hero);
  const h1 = extractText(hero, /<h1\b[^>]*>([\s\S]*?)<\/h1>/g, "H1 del hero");
  const intro = extractText(
    hero,
    /<p\b[^>]*class="[^"]*\bboj-hero-subtitle\b[^"]*"[^>]*>([\s\S]*?)<\/p>/g,
    "introducción del hero"
  );

  const fragmentSummaries = new Map();
  const composeMarkup = () => [
      STATIC_SHELL_START,
      skipLink,
      header,
      `${mainOpening}${heroWrapper.prefix}${hero}${[...fragmentSummaries.values()].join("\n")}${heroWrapper.suffix}</main>`,
      // La navegación completa del footer sólo se parsea cuando JavaScript está
      // desactivado. Con JavaScript activo no genera layout ni solicitudes y el
      // montaje de React reemplaza el shell completo.
      `<noscript>${footer}</noscript>`,
      STATIC_SHELL_END,
    ].join("\n");

  for (let iteration = 0; iteration < 20; iteration += 1) {
    const markup = composeMarkup();
    const missing = getSameDocumentFragmentIds(markup, route)
      .filter((id) => idOccurrences(markup, id).length === 0);
    if (!missing.length) {
      return Object.freeze({ markup, h1, intro, fragments: Object.freeze([...fragmentSummaries.keys()]) });
    }
    for (const id of missing) {
      if (!fragmentSummaries.has(id)) fragmentSummaries.set(id, semanticFragmentSummary(renderedAppHtml, id));
    }
  }
  throw new Error(`WEB-M3: no convergió la resolución de fragmentos en ${route}`);
}

export function injectStaticShell(template, shellMarkup) {
  const rootPlaceholder = '<div id="root"></div>';
  if (exactOccurrences(template, rootPlaceholder) !== 1) {
    throw new Error("WEB-M3: #root vacío debe aparecer exactamente una vez antes del prerender");
  }
  if (exactOccurrences(shellMarkup, STATIC_SHELL_START) !== 1 || exactOccurrences(shellMarkup, STATIC_SHELL_END) !== 1) {
    throw new Error("WEB-M3: marcadores del shell ausentes o duplicados");
  }
  return template.replace(rootPlaceholder, `<div id="root">\n${shellMarkup}\n    </div>`);
}

export function validateStaticShellHtml(html, expected) {
  if (exactOccurrences(html, STATIC_SHELL_START) !== 1 || exactOccurrences(html, STATIC_SHELL_END) !== 1) {
    throw new Error(`WEB-M3: shell ausente o duplicado en ${expected.route}`);
  }
  const start = html.indexOf(STATIC_SHELL_START);
  const end = html.indexOf(STATIC_SHELL_END, start) + STATIC_SHELL_END.length;
  const shell = html.slice(start, end);

  const shellBytes = Buffer.byteLength(shell);
  if (shellBytes > 16_000) {
    throw new Error(`WEB-M3: shell excesivo en ${expected.route}; bytes=${shellBytes}`);
  }
  if (shell.includes("/src/assets/")) {
    throw new Error(`WEB-M3: ${expected.route} conserva assets de desarrollo`);
  }
  if (/<script\b/i.test(shell)) {
    throw new Error(`WEB-M3: ${expected.route} agregó script dentro del shell`);
  }
  if (!/<header\b[^>]*class="[^"]*\bsite-header\b/i.test(shell)) {
    throw new Error(`WEB-M3: ${expected.route} no conserva el encabezado esencial`);
  }
  if (!/<nav\b[^>]*class="[^"]*\bmain-nav\b/i.test(shell)) {
    throw new Error(`WEB-M3: ${expected.route} no conserva la navegación principal`);
  }
  if (!/<noscript><footer\b[^>]*class="[^"]*\bsite-footer\b/i.test(shell)) {
    throw new Error(`WEB-M3: ${expected.route} no conserva navegación ampliada sin JavaScript`);
  }
  if ((shell.match(/<main\b[^>]*\bid="main-content"[^>]*>/g) || []).length !== 1) {
    throw new Error(`WEB-M3: main inicial inválido en ${expected.route}`);
  }

  const h1 = extractText(shell, /<h1\b[^>]*>([\s\S]*?)<\/h1>/g, `H1 ${expected.route}`);
  const intro = extractText(
    shell,
    /<p\b[^>]*class="[^"]*\bboj-hero-subtitle\b[^"]*"[^>]*>([\s\S]*?)<\/p>/g,
    `introducción ${expected.route}`
  );
  if (h1 !== expected.h1 || h1.length < 12) {
    throw new Error(`WEB-M3: H1 divergente o insuficiente en ${expected.route}`);
  }
  if (intro !== expected.intro || intro.length < 40) {
    throw new Error(`WEB-M3: introducción divergente o insuficiente en ${expected.route}`);
  }

  const fragmentIds = getSameDocumentFragmentIds(shell, expected.route);
  for (const id of fragmentIds) {
    const target = extractElementById(shell, id);
    if (stripMarkup(target.markup).length < 12) {
      throw new Error(`WEB-M3: destino semántico insuficiente para #${id} en ${expected.route}`);
    }
  }

  const internalLinks = [...shell.matchAll(/\bhref="(\/[^"#][^"]*)"/g)].map((match) => match[1]);
  if (new Set(internalLinks).size < 5) {
    throw new Error(`WEB-M3: enlaces internos insuficientes en ${expected.route}`);
  }
  const priorityImages = [...shell.matchAll(/\bfetchPriority="high"/g)].length;
  if (priorityImages !== 1) {
    throw new Error(`WEB-M3: ${expected.route} debe conservar una imagen prioritaria; actual=${priorityImages}`);
  }

  return { h1, intro, internalLinks: new Set(internalLinks).size, fragments: fragmentIds, bytes: shellBytes };
}

async function renderReactApp(renderToPipeableStream, createElement, App, route) {
  globalThis.window.location.pathname = route;
  return new Promise((resolveMarkup, rejectMarkup) => {
    const output = new PassThrough();
    let markup = "";
    let renderError = null;
    let settled = false;
    output.setEncoding("utf8");
    output.on("data", (chunk) => { markup += chunk; });
    output.on("error", rejectMarkup);
    output.on("end", () => {
      if (settled) return;
      settled = true;
      if (renderError) rejectMarkup(renderError);
      else resolveMarkup(markup);
    });

    const stream = renderToPipeableStream(createElement(App), {
      onAllReady() {
        if (renderError) {
          settled = true;
          rejectMarkup(renderError);
          stream.abort();
          return;
        }
        stream.pipe(output);
      },
      onShellError(error) {
        if (settled) return;
        settled = true;
        rejectMarkup(error);
      },
      onError(error) {
        renderError ||= error;
      },
    });
  });
}

export async function createStaticShellRenderer(outDir = resolve("dist")) {
  const previousNodeEnv = process.env.NODE_ENV;
  const hadWindow = Object.hasOwn(globalThis, "window");
  const previousWindow = globalThis.window;
  process.env.NODE_ENV = "production";
  globalThis.window = {
    location: {
      pathname: "/",
      search: "",
      hash: "",
      origin: "https://www.bojautomatizacion.com",
    },
  };
  let vite = null;
  const restoreGlobals = () => {
    if (hadWindow) globalThis.window = previousWindow;
    else delete globalThis.window;
    if (previousNodeEnv === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = previousNodeEnv;
  };
  try {
    const [{ createElement }, { renderToPipeableStream }] = await Promise.all([
      import("react"),
      import("react-dom/server"),
    ]);
    const manifestPath = join(outDir, ".vite", "manifest.json");
    const manifestSource = await readFile(manifestPath, "utf8").catch((error) => {
      throw new Error(`WEB-M3: manifest físico obligatorio ausente en ${manifestPath}`, { cause: error });
    });
    const manifestAssets = buildManifestAssetMap(JSON.parse(manifestSource));
    vite = await createServer({
      root: resolve("."),
      appType: "custom",
      logLevel: "silent",
      optimizeDeps: { noDiscovery: true, include: [] },
      server: { middlewareMode: true },
    });
    const loaded = await vite.ssrLoadModule("/src/App.jsx");
    if (typeof loaded.default !== "function") throw new Error("WEB-M3: App.jsx no exporta un componente válido");
    const App = loaded.default;
    return {
      async render(route) {
        const renderedApp = await renderReactApp(renderToPipeableStream, createElement, App, route);
        const sourceShell = extractStaticShell(renderedApp, route);
        return Object.freeze({
          ...sourceShell,
          markup: rewriteStaticShellAssets(sourceShell.markup, manifestAssets),
          route,
        });
      },
      async close() {
        await vite.close();
        restoreGlobals();
      },
    };
  } catch (error) {
    if (vite) await vite.close();
    restoreGlobals();
    throw error;
  }
}
