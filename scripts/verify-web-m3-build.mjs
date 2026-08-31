import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

const ROUTE_ENTRIES = Object.freeze([
  "src/routes/home.jsx",
  "src/routes/services.jsx",
  "src/routes/courses-index.jsx",
  "src/routes/course-s7.jsx",
  "src/routes/course-tia.jsx",
  "src/routes/app.jsx",
  "src/routes/resources.jsx",
  "src/routes/compliance.jsx",
]);

const ENTRY_BUDGET = Object.freeze({ raw: 300_000, gzip: 95_000 });
const ROUTE_INITIAL_BUDGET = Object.freeze({ raw: 370_000, gzip: 110_000 });
const CSS_BUDGET = Object.freeze({ raw: 400_000, gzip: 70_000 });

function requireRecord(manifest, key) {
  const record = manifest[key];
  if (!record?.file) throw new Error(`WEB-M3-BUDGET: falta entrada de manifiesto ${key}`);
  return record;
}

function collectStaticFiles(manifest, key, files = new Set()) {
  const record = requireRecord(manifest, key);
  if (files.has(record.file)) return files;
  files.add(record.file);
  for (const importedKey of record.imports || []) collectStaticFiles(manifest, importedKey, files);
  return files;
}

async function measureFiles(outDir, files) {
  let raw = 0;
  let gzip = 0;
  for (const file of files) {
    const content = await readFile(join(outDir, file));
    raw += content.length;
    gzip += gzipSync(content).length;
  }
  return { raw, gzip };
}

function enforceBudget(label, actual, budget) {
  if (actual.raw > budget.raw || actual.gzip > budget.gzip) {
    throw new Error(
      `WEB-M3-BUDGET: ${label} excede presupuesto ` +
      `raw=${actual.raw}/${budget.raw} gzip=${actual.gzip}/${budget.gzip}`
    );
  }
}

export async function verifyWebM3Build(outDir) {
  const manifest = JSON.parse(await readFile(join(outDir, ".vite", "manifest.json"), "utf8"));
  const entry = requireRecord(manifest, "index.html");
  if (!entry.isEntry) throw new Error("WEB-M3-BUDGET: index.html no identifica el entrypoint cliente");
  if (entry.dynamicImports?.length !== ROUTE_ENTRIES.length) {
    throw new Error(
      `WEB-M3-BUDGET: familias dinámicas esperadas=${ROUTE_ENTRIES.length} actual=${entry.dynamicImports?.length || 0}`
    );
  }
  for (const routeEntry of ROUTE_ENTRIES) {
    if (!entry.dynamicImports.includes(routeEntry)) {
      throw new Error(`WEB-M3-BUDGET: ${routeEntry} dejó de ser import dinámico del entrypoint`);
    }
    if (!requireRecord(manifest, routeEntry).isDynamicEntry) {
      throw new Error(`WEB-M3-BUDGET: ${routeEntry} dejó de compilar como chunk dinámico`);
    }
  }

  const entryFiles = collectStaticFiles(manifest, "index.html");
  const entrySize = await measureFiles(outDir, entryFiles);
  enforceBudget("entrypoint", entrySize, ENTRY_BUDGET);

  const routeSizes = [];
  for (const routeEntry of ROUTE_ENTRIES) {
    const files = collectStaticFiles(manifest, routeEntry);
    const size = await measureFiles(outDir, files);
    enforceBudget(routeEntry, size, ROUTE_INITIAL_BUDGET);
    routeSizes.push({ routeEntry, ...size });
  }

  const courseEntry = requireRecord(manifest, "src/routes/course-s7.jsx");
  const manualEntryKey = "src/components/ManualFlipbook.jsx";
  const manualEntry = requireRecord(manifest, manualEntryKey);
  if (!manualEntry.isDynamicEntry || !courseEntry.dynamicImports?.includes(manualEntryKey)) {
    throw new Error("WEB-M3-BUDGET: ManualFlipbook debe permanecer como chunk diferido del curso S7");
  }
  if (collectStaticFiles(manifest, "src/routes/course-s7.jsx").has(manualEntry.file)) {
    throw new Error("WEB-M3-BUDGET: ManualFlipbook entró en la carga inicial del curso S7");
  }

  const cssFiles = entry.css || [];
  if (cssFiles.length !== 1) {
    throw new Error(`WEB-M3-BUDGET: se esperaba un CSS global para prerender; actual=${cssFiles.length}`);
  }
  const cssSize = await measureFiles(outDir, cssFiles);
  enforceBudget("CSS global", cssSize, CSS_BUDGET);

  const largestRoute = routeSizes.reduce((largest, current) =>
    current.gzip > largest.gzip ? current : largest
  );
  return {
    entry: entrySize,
    largestRoute,
    css: cssSize,
    routeChunks: ROUTE_ENTRIES.length,
    manualChunk: manualEntry.file,
  };
}
