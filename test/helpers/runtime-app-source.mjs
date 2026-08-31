import { readFile, readdir } from "node:fs/promises";
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

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
]);

export async function readRuntimeAppSource() {
  return (await Promise.all(runtimeSourceFiles.map((file) => readFile(join(sourceDirectory, file), "utf8")))).join("\n");
}

export function readRuntimeAppSourceSync() {
  return runtimeSourceFiles.map((file) => readFileSync(join(sourceDirectory, file), "utf8")).join("\n");
}

export async function readRuntimeStylesSource() {
  const modules = (await readdir(join(sourceDirectory, "styles")))
    .filter((file) => file.endsWith(".css"))
    .sort();
  return (await Promise.all([
    readFile(join(sourceDirectory, "styles.css"), "utf8"),
    ...modules.map((file) => readFile(join(sourceDirectory, "styles", file), "utf8")),
  ])).join("\n");
}

export function readRuntimeStylesSourceSync() {
  const modules = readdirSync(join(sourceDirectory, "styles"))
    .filter((file) => file.endsWith(".css"))
    .sort();
  return [
    readFileSync(join(sourceDirectory, "styles.css"), "utf8"),
    ...modules.map((file) => readFileSync(join(sourceDirectory, "styles", file), "utf8")),
  ].join("\n");
}
