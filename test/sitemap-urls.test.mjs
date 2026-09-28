import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { getRouteMetadata, indexableRoutePaths, SITE_ORIGIN } from "../src/route-metadata.js";

const sitemapSource = await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8");

test("el sitemap enumera una sola vez las 40 rutas públicas indexables con sus URL canónicas", () => {
  const entries = [...sitemapSource.matchAll(/<url>(.*?)<\/url>/g)].map((match) => match[1]);
  assert.equal(entries.length, 40);
  assert.equal(entries.length, indexableRoutePaths.length);
  assert.ok(sitemapSource.startsWith('<?xml version="1.0" encoding="UTF-8"?>'));
  assert.ok(sitemapSource.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'));

  const urls = entries.map((entry) => {
    assert.match(entry, /^<loc>https:\/\/www\.bojautomatizacion\.com\/[^<]*<\/loc><priority>[^<]+<\/priority>$/);
    return entry.match(/<loc>([^<]+)<\/loc>/)[1];
  });
  assert.equal(new Set(urls).size, urls.length);
  assert.deepEqual(
    new Set(urls),
    new Set(indexableRoutePaths.map((route) => getRouteMetadata(route).canonical))
  );
  assert.ok(urls.every((url) => url.startsWith(`${SITE_ORIGIN}/`)));
});

test("el sitemap omite fechas que no se pueden verificar por URL", () => {
  assert.doesNotMatch(sitemapSource, /<lastmod>/);
});
