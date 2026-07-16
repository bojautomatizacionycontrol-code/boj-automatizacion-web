import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";
import "./audit.css";

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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
