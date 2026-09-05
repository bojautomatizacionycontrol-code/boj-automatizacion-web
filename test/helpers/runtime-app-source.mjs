import { readFile } from "node:fs/promises";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { readCssBundle, readCssBundleSync } from "./css-source.mjs";

const testDirectory = dirname(dirname(fileURLToPath(import.meta.url)));
const sourceDirectory = join(testDirectory, "..", "src");

const runtimeSourceFiles = Object.freeze([
  "app/shared-eager.jsx",
  "components/ManualFlipbook.jsx",
  "components/DeferredManualFlipbook.jsx",
  "json-ld.js",
  "routes/compliance.jsx",
  "routes/shared.jsx",
  "App.jsx",
  "routes/home.jsx",
  "routes/services.jsx",
  "routes/courses-index.jsx",
  "routes/course-s7.jsx",
  "routes/course-tia.jsx",
  "routes/app.jsx",
  "routes/resources.jsx",
  "routes/manifest.jsx",
  "routes/route-families.js",
  "routes/founder-block.jsx",
  "routes/works-images.jsx",
]);

export async function readRuntimeAppSource() {
  return (await Promise.all(runtimeSourceFiles.map((file) => readFile(join(sourceDirectory, file), "utf8")))).join("\n");
}

export function readRuntimeAppSourceSync() {
  return runtimeSourceFiles.map((file) => readFileSync(join(sourceDirectory, file), "utf8")).join("\n");
}

export async function readRuntimeStylesSource() {
  return readCssBundle();
}

export function readRuntimeStylesSourceSync() {
  return readCssBundleSync();
}
