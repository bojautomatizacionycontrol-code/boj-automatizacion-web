import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.jsx";
import { loadRouteComponent } from "./routes/manifest.jsx";
import "./styles.css";
import "./styles/commercial-impact.css";
import "./audit.css";
import "./m1-accessibility.css";

// Compatibilidad con enlaces antiguos de hash-routing (#/ruta). ANTES de montar
// React: si la URL trae un hash de RUTA legacy, lo convierte a una URL limpia con
// history.replaceState (sin recarga). No toca anclas intra-página (#planes-pro,
// #servicios-principales, etc.), conserva y combina los query strings, y no genera
// bucles (tras el replaceState el hash de ruta desaparece y no vuelve a entrar).
function migrateLegacyHash() {
  const hash = window.location.hash;
  if (!hash.startsWith("#/")) return; // solo hashes de RUTA; anclas "#ancla" intactas

  const rest = hash.slice(1); // p.ej. "/servicios" o "/servicios?x=1"
  const qIndex = rest.indexOf("?");
  let path = qIndex === -1 ? rest : rest.slice(0, qIndex);
  const hashQuery = qIndex === -1 ? "" : rest.slice(qIndex + 1);

  if (path === "/inicio") path = "/"; // home canónico en /
  if (path.length > 1 && path.endsWith("/")) path = path.replace(/\/+$/, "");

  // Combinar el query actual (?...) con el que pudiera venir dentro del hash.
  // Ante conflicto de clave, prevalece el valor del hash legacy.
  const params = new URLSearchParams(window.location.search);
  if (hashQuery) {
    for (const [key, value] of new URLSearchParams(hashQuery)) {
      params.set(key, value);
    }
  }
  const qs = params.toString();
  window.history.replaceState(null, "", path + (qs ? `?${qs}` : ""));
}

migrateLegacyHash();

function normalizedBrowserRoute() {
  let route = window.location.pathname || "/";
  if (route.length > 1 && route.endsWith("/")) route = route.replace(/\/+$/, "");
  return route;
}

async function bootstrap() {
  const rootElement = document.getElementById("root");
  const prerenderedRoute = rootElement.dataset.bojRoute;
  const browserRoute = normalizedBrowserRoute();
  const legacyRouteMismatch = Boolean(
    rootElement.hasChildNodes() &&
    prerenderedRoute &&
    prerenderedRoute !== "/__boj_not_found__" &&
    prerenderedRoute !== browserRoute
  );
  const initialRoute = legacyRouteMismatch || !prerenderedRoute ? browserRoute : prerenderedRoute;
  const buildYear = Number(rootElement.dataset.bojBuildYear) || new Date().getFullYear();
  const InitialRouteComponent = await loadRouteComponent(initialRoute);
  const tree = (
    <React.StrictMode>
      <App initialRoute={initialRoute} initialRouteComponent={InitialRouteComponent} buildYear={buildYear} />
    </React.StrictMode>
  );

  if (rootElement.hasChildNodes() && !legacyRouteMismatch) {
    hydrateRoot(rootElement, tree, {
      onRecoverableError(error) {
        console.error("WEB-M3 hydration recovery", error);
      },
    });
    return;
  }

  if (legacyRouteMismatch) rootElement.replaceChildren();
  createRoot(rootElement).render(tree);
}

bootstrap().catch((error) => {
  console.error("WEB-M3 bootstrap failed", error);
});
