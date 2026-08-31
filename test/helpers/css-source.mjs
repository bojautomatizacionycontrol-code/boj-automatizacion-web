import { readFile, stat } from "node:fs/promises";
import { readFileSync } from "node:fs";

export const cssEntrypointUrl = new URL("../../src/styles.css", import.meta.url);

const importPattern = /@import\s+["']([^"']+)["']\s*;/g;

export function cssModuleSpecifiers(entrySource) {
  return [...entrySource.matchAll(importPattern)].map((match) => match[1]);
}

export async function cssModuleUrls(entryUrl = cssEntrypointUrl) {
  const entrySource = await readFile(entryUrl, "utf8");
  return cssModuleSpecifiers(entrySource).map((specifier) => new URL(specifier, entryUrl));
}

export function cssModuleUrlsSync(entryUrl = cssEntrypointUrl) {
  const entrySource = readFileSync(entryUrl, "utf8");
  return cssModuleSpecifiers(entrySource).map((specifier) => new URL(specifier, entryUrl));
}

export async function readCssBundle(entryUrl = cssEntrypointUrl) {
  const moduleUrls = await cssModuleUrls(entryUrl);
  return (await Promise.all(moduleUrls.map((url) => readFile(url, "utf8")))).join("");
}

export function readCssBundleSync(entryUrl = cssEntrypointUrl) {
  return cssModuleUrlsSync(entryUrl).map((url) => readFileSync(url, "utf8")).join("");
}

export async function cssModuleStats(entryUrl = cssEntrypointUrl) {
  const moduleUrls = await cssModuleUrls(entryUrl);
  return Promise.all(moduleUrls.map(async (url) => ({ url, ...(await stat(url)) })));
}
