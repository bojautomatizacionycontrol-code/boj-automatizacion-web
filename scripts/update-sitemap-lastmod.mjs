import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { getRouteFamily } from "../src/routes/route-families.js";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const sitemapPath = fileURLToPath(new URL("../public/sitemap.xml", import.meta.url));

// Cada familia de ruta se considera modificada cuando cambia su módulo de página.
export const familySources = Object.freeze({
  home: ["src/routes/home.jsx"],
  services: ["src/routes/services.jsx"],
  coursesIndex: ["src/routes/courses-index.jsx"],
  courseS7: ["src/routes/course-s7.jsx"],
  courseTia: ["src/routes/course-tia.jsx"],
  app: ["src/routes/app.jsx"],
  resources: ["src/routes/resources.jsx"],
  compliance: ["src/routes/compliance.jsx"],
});

function lastCommitDate(files) {
  const output = execFileSync("git", ["log", "-1", "--format=%cs", "--", ...files], {
    cwd: projectRoot,
    encoding: "utf8",
  }).trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(output)) {
    throw new Error(`SITEMAP: no se pudo obtener la fecha de ${files.join(", ")}`);
  }
  return output;
}

export function withLastmod(sitemapSource, dateForRoute) {
  return sitemapSource.replace(
    /<url><loc>([^<]+)<\/loc>(?:<lastmod>[^<]*<\/lastmod>)?/g,
    (match, loc) => `<url><loc>${loc}</loc><lastmod>${dateForRoute(new URL(loc).pathname)}</lastmod>`
  );
}

export function updateSitemapLastmod() {
  const dates = new Map();
  const dateForRoute = (route) => {
    const family = getRouteFamily(route);
    if (!dates.has(family)) dates.set(family, lastCommitDate(familySources[family]));
    return dates.get(family);
  };
  const source = readFileSync(sitemapPath, "utf8");
  const updated = withLastmod(source, dateForRoute);
  writeFileSync(sitemapPath, updated);
  return { changed: updated !== source, families: Object.fromEntries(dates) };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const result = updateSitemapLastmod();
  console.log(`SITEMAP: lastmod ${result.changed ? "actualizado" : "sin cambios"}`);
  for (const [family, date] of Object.entries(result.families)) console.log(`  ${family}: ${date}`);
}
