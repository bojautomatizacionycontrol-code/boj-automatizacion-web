import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { withLastmod } from "../scripts/update-sitemap-lastmod.mjs";

const sitemapSource = await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8");

test("cada URL del sitemap publica un lastmod ISO válido y no futuro", () => {
  const entries = [...sitemapSource.matchAll(/<url>(.*?)<\/url>/g)].map((match) => match[1]);
  assert.ok(entries.length >= 30);
  const today = new Date().toISOString().slice(0, 10);
  for (const entry of entries) {
    const lastmod = entry.match(/<lastmod>(\d{4}-\d{2}-\d{2})<\/lastmod>/);
    assert.ok(lastmod, `sin lastmod: ${entry}`);
    assert.ok(lastmod[1] <= today, `lastmod futuro: ${entry}`);
    assert.match(entry, /^<loc>[^<]+<\/loc><lastmod>[^<]+<\/lastmod><priority>[^<]+<\/priority>$/);
  }
});

test("withLastmod inserta o reemplaza la fecha sin tocar loc ni priority", () => {
  const input = [
    '<url><loc>https://www.bojautomatizacion.com/</loc><priority>1.0</priority></url>',
    '<url><loc>https://www.bojautomatizacion.com/app</loc><lastmod>2020-01-01</lastmod><priority>0.8</priority></url>',
  ].join("\n");
  const output = withLastmod(input, (route) => (route === "/" ? "2026-09-05" : "2026-08-30"));
  assert.equal(
    output,
    [
      '<url><loc>https://www.bojautomatizacion.com/</loc><lastmod>2026-09-05</lastmod><priority>1.0</priority></url>',
      '<url><loc>https://www.bojautomatizacion.com/app</loc><lastmod>2026-08-30</lastmod><priority>0.8</priority></url>',
    ].join("\n")
  );
});
