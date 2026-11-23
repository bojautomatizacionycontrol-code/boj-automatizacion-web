import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = fileURLToPath(new URL("../../", import.meta.url));
const routes = { es: "/obras", en: "/en/projects", pt: "/pt/projetos" };
let runtimePromise;

async function runtime() {
  if (!runtimePromise) {
    runtimePromise = (async () => {
      // Vite resolves the real JSX, import.meta.glob, CSS and photograph imports.
      // Middleware mode with HMR disabled does not open a listening server.
      const server = await createServer({
        root,
        logLevel: "silent",
        server: { middlewareMode: true, hmr: false },
      });
      return { server };
    })();
  }
  return runtimePromise;
}

export async function getActualWorkProjects(language) {
  const { server } = await runtime();
  const { getWorkProjects } = await server.ssrLoadModule("/src/works-content.js");
  return getWorkProjects(language);
}

export async function renderActualWorksPage(language) {
  const { server } = await runtime();
  const { default: ServicesRoutes } = await server.ssrLoadModule("/src/routes/services.jsx");
  return renderToStaticMarkup(React.createElement(ServicesRoutes, { route: routes[language] }));
}

export async function renderActualLedesmaCase(language, project) {
  const { server } = await runtime();
  const { LedesmaCase } = await server.ssrLoadModule("/src/routes/ledesma-case.jsx");
  return renderToStaticMarkup(React.createElement(LedesmaCase, { project, language }));
}

export async function closeWorksSsrRuntime() {
  if (!runtimePromise) return;
  const { server } = await runtimePromise;
  await server.close();
  runtimePromise = undefined;
}
