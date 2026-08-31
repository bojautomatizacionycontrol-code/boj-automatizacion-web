import { createHash } from "node:crypto";
import { readFile, rm } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { build as viteBuild } from "vite";

import { validateBuiltCsp } from "./csp-policy.mjs";
import { generateRouteHtml } from "./generate-route-html.mjs";
import { verifyWebM3Build } from "./verify-web-m3-build.mjs";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));

export function resolveBuildYear(environment = process.env, now = new Date()) {
  const configuredYear = environment.BOJ_BUILD_YEAR;
  if (configuredYear !== undefined) {
    if (!/^\d{4}$/.test(configuredYear)) {
      throw new Error("WEB-M3: BOJ_BUILD_YEAR debe contener exactamente cuatro dígitos");
    }
    const year = Number(configuredYear);
    if (year < 2024 || year > 9999) {
      throw new Error(`WEB-M3: BOJ_BUILD_YEAR fuera de rango: ${configuredYear}`);
    }
    return year;
  }
  return now.getUTCFullYear();
}

export async function buildSite({ rootDir = projectRoot, environment = process.env } = {}) {
  const outDir = join(rootDir, "dist");
  const prerenderDir = join(rootDir, ".prerender");
  const serverEntry = join(prerenderDir, "entry-server.mjs");
  const configFile = join(rootDir, "vite.config.js");
  const buildYear = resolveBuildYear(environment);

  await rm(prerenderDir, { recursive: true, force: true });
  try {
    await viteBuild({
      root: rootDir,
      configFile,
    });

    await viteBuild({
      root: rootDir,
      configFile,
      build: {
        ssr: join(rootDir, "src", "entry-server.jsx"),
        outDir: prerenderDir,
        emptyOutDir: true,
        copyPublicDir: false,
        rollupOptions: {
          output: {
            entryFileNames: "entry-server.mjs",
            chunkFileNames: "chunks/[name]-[hash].mjs",
            assetFileNames: "assets/[name]-[hash][extname]",
          },
        },
      },
    });

    const serverDigest = createHash("sha256")
      .update(await readFile(serverEntry))
      .digest("hex");
    const serverModule = await import(`${pathToFileURL(serverEntry).href}?v=${serverDigest}`);
    if (typeof serverModule.renderRoute !== "function") {
      throw new Error("WEB-M3: el bundle SSR no exporta renderRoute(route, buildYear)");
    }

    const generated = await generateRouteHtml(outDir, {
      renderRoute: serverModule.renderRoute,
      buildYear,
    });
    const csp = await validateBuiltCsp(generated);
    const performance = await verifyWebM3Build(outDir);

    console.log(`SEO_ROUTE_HTML: ${generated.length - 1} routes + 404`);
    console.log(`PRERENDER_BUILD: ${generated.length} HTML útiles, year=${buildYear}`);
    console.log(`CSP_BUILD: ${csp.generatedFiles} HTML, ${csp.inlineScripts} JSON-LD, ${csp.hashes} hashes`);
    console.log(
      `WEB_M3_BUDGET: entry=${performance.entry.raw}/${performance.entry.gzip}B ` +
      `max=${performance.largestRoute.routeEntry}:${performance.largestRoute.raw}/${performance.largestRoute.gzip}B ` +
      `css=${performance.css.raw}/${performance.css.gzip}B chunks=${performance.routeChunks}+manual`
    );
    return { generated, buildYear, csp, performance };
  } finally {
    await rm(prerenderDir, { recursive: true, force: true });
  }
}

const directInvocation = process.argv[1]
  ? pathToFileURL(resolve(process.argv[1])).href === import.meta.url
  : false;

if (directInvocation) {
  await buildSite();
}
