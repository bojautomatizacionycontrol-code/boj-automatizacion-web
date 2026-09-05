import { readRuntimeAppSource } from "./helpers/runtime-app-source.mjs";
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import {
  buildContentSecurityPolicy,
  CSP_HEADER_NAME,
  CSP_HEADER_SOURCE,
  getConfiguredCsp,
  getJsonLdHashSources,
  parseContentSecurityPolicy,
  serializeJsonLd,
  sha256Source,
  validateBuiltCsp,
  validateContentSecurityPolicy,
  validateVercelCspConfig,
} from "../scripts/csp-policy.mjs";
import { getRouteMetadata, publicRoutePaths } from "../src/route-metadata.js";

const appSource = await readRuntimeAppSource();
const contentSource = await readFile(new URL("../src/content.js", import.meta.url), "utf8");
const indexSource = await readFile(new URL("../index.html", import.meta.url), "utf8");
const packageSource = await readFile(new URL("../package.json", import.meta.url), "utf8");
const vercelConfig = JSON.parse(await readFile(new URL("../vercel.json", import.meta.url), "utf8"));

function mutatePolicy(policy, directive, transform) {
  const parsed = parseContentSecurityPolicy(policy);
  parsed.set(directive, transform([...parsed.get(directive)]));
  return [...parsed]
    .map(([name, sources]) => `${name} ${sources.join(" ")}`)
    .join("; ");
}

test("configura una CSP enforce global, exacta y sintácticamente válida", () => {
  const policy = validateVercelCspConfig(vercelConfig);
  assert.equal(getConfiguredCsp(vercelConfig), buildContentSecurityPolicy());
  const cspRules = vercelConfig.headers.filter((rule) =>
    rule.headers.some((header) => header.key.toLowerCase() === CSP_HEADER_NAME.toLowerCase())
  );
  assert.equal(cspRules.length, 1);
  assert.equal(cspRules[0].source, CSP_HEADER_SOURCE);
  assert.equal(cspRules[0].headers.filter((header) => header.key === CSP_HEADER_NAME).length, 1);
  assert.doesNotMatch(policy, /report-uri|report-to/i);
});

test("mantiene cada directiva en su allowlist mínima demostrada", () => {
  const directives = validateContentSecurityPolicy(buildContentSecurityPolicy());
  assert.deepEqual(directives.get("default-src"), ["'self'"]);
  assert.deepEqual(directives.get("base-uri"), ["'self'"]);
  assert.deepEqual(directives.get("object-src"), ["'none'"]);
  assert.deepEqual(directives.get("frame-ancestors"), ["'none'"]);
  assert.deepEqual(directives.get("frame-src"), ["'none'"]);
  assert.deepEqual(directives.get("script-src-attr"), ["'none'"]);
  assert.deepEqual(directives.get("style-src"), ["'self'", "https://fonts.googleapis.com"]);
  assert.deepEqual(directives.get("style-src-attr"), ["'none'"]);
  assert.deepEqual(directives.get("img-src"), ["'self'"]);
  assert.deepEqual(directives.get("font-src"), ["'self'", "https://fonts.gstatic.com"]);
  assert.deepEqual(directives.get("connect-src"), ["'self'"]);
  assert.deepEqual(directives.get("form-action"), ["'self'"]);
  assert.deepEqual(directives.get("manifest-src"), ["'none'"]);
  assert.deepEqual(directives.get("worker-src"), ["'none'"]);
  assert.doesNotMatch(buildContentSecurityPolicy(), /unsafe-inline|unsafe-eval|\*/);
});

test("genera 34 hashes JSON-LD exactos y deterministas desde las 35 rutas", () => {
  const expected = publicRoutePaths
    .map((route) => getRouteMetadata(route).jsonLd)
    .filter(Boolean)
    .map((jsonLd) => sha256Source(serializeJsonLd(jsonLd)));
  const hashes = [...getJsonLdHashSources()];
  assert.equal(publicRoutePaths.length, 35);
  assert.equal(expected.length, 34);
  assert.equal(hashes.length, 34);
  assert.equal(new Set(expected).size, 34);
  assert.deepEqual(hashes, [...expected].sort());
  assert.deepEqual(getJsonLdHashSources(), getJsonLdHashSources());
  assert.equal(serializeJsonLd(getRouteMetadata("/").jsonLd), JSON.stringify(getRouteMetadata("/").jsonLd));
});

test("clasifica las propiedades React sin abrir style-src-attr y mantiene dormantes integraciones no usadas", () => {
  assert.equal((appSource.match(/style=\{\{/g) || []).length, 0);
  assert.doesNotMatch(appSource, /style=\{\{ objectPosition: item\.position \}\}/);
  assert.equal((appSource.match(/className="app-pro-real-view-image"/g) || []).length, 1);
  assert.equal((appSource.match(/<AppRealViewGallery/g) || []).length, 3);
  assert.doesNotMatch(appSource, /<style\b|dangerouslySetInnerHTML/);
  assert.doesNotMatch(indexSource, /fonts\.googleapis\.com|fonts\.gstatic\.com/);
  assert.match(indexSource, /<link rel="preload" href="\/src\/assets\/fonts\/geist-latin\.woff2" as="font" type="font\/woff2" crossorigin \/>/);
  assert.match(appSource, /fetch\("\/api\/contact"/);
  assert.match(appSource, /<Analytics \/>/);
  assert.doesNotMatch(packageSource, /@vercel\/speed-insights/);
  assert.match(appSource, /ga4Id: ""/);
  assert.match(appSource, /metaPixelId: ""/);
  assert.match(contentSource, /demoVideoUrl: ""/);
  assert.doesNotMatch(
    buildContentSecurityPolicy(),
    /googletagmanager|facebook\.net|hotmart|siemens|linkedin|vercel-scripts|vercel\.live/
  );
});

test("rechaza ausencia, unsafe-eval, comodines, hash incorrecto y origen no autorizado", () => {
  const policy = buildContentSecurityPolicy();
  assert.throws(() => validateContentSecurityPolicy(""), /ausente/);
  assert.throws(
    () => validateContentSecurityPolicy(
      mutatePolicy(policy, "script-src", (sources) => [...sources, "'unsafe-eval'"])
    ),
    /unsafe-eval/
  );
  assert.throws(
    () => validateContentSecurityPolicy(
      mutatePolicy(policy, "img-src", (sources) => [...sources, "*"])
    ),
    /comodín/
  );
  assert.throws(
    () => validateContentSecurityPolicy(
      mutatePolicy(policy, "script-src", (sources) =>
        sources.map((source) => source.startsWith("'sha256-") ? "'sha256-AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA='" : source)
      )
    ),
    /hashes JSON-LD/
  );
  assert.throws(
    () => validateContentSecurityPolicy(
      mutatePolicy(policy, "connect-src", (sources) => [...sources, "https://untrusted.example"])
    ),
    /origen externo no autorizado/
  );
});

test("certifica los bytes inline físicos y detecta un hash postbuild alterado", async () => {
  const directory = await mkdtemp(join(tmpdir(), "boj-csp-build-"));
  try {
    const paths = [];
    for (const route of publicRoutePaths) {
      const jsonLd = getRouteMetadata(route).jsonLd;
      const filePath = join(directory, `${paths.length}.html`);
      const block = jsonLd
        ? `<script id="boj-route-jsonld" type="application/ld+json">${serializeJsonLd(jsonLd)}</script>`
        : "";
      await writeFile(filePath, `<!doctype html><html><head>${block}</head></html>`, "utf8");
      paths.push(filePath);
    }
    const notFoundPath = join(directory, "404.html");
    await writeFile(notFoundPath, "<!doctype html><html><head></head></html>", "utf8");
    paths.push(notFoundPath);

    const result = await validateBuiltCsp(paths, vercelConfig);
    assert.deepEqual(result, { generatedFiles: 36, inlineScripts: 34, hashes: 34 });

    const first = await readFile(paths[0], "utf8");
    await writeFile(paths[0], first.replace("</script>", " </script>"), "utf8");
    await assert.rejects(validateBuiltCsp(paths, vercelConfig), /hash ausente/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
