import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const appSource = await readFile(new URL("../src/App.jsx", import.meta.url), "utf8");
const i18nSource = await readFile(new URL("../src/i18n.js", import.meta.url), "utf8");

const sourceBetween = (source, startMarker, endMarker) => {
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker, start);
  assert.notEqual(start, -1, `No se encontró el inicio: ${startMarker}`);
  assert.notEqual(end, -1, `No se encontró el final: ${endMarker}`);
  return source.slice(start, end);
};

test("el hero de la portada ofrece tres rutas internas claras", () => {
  const navigatorSource = sourceBetween(appSource, "function HomeHeroNavigator()", "function CourseHeroPreview()");

  const routes = [
    ["Servicios industriales", "/servicios"],
    ["Capacitación técnica", "/cursos"],
    ["Probar App BOJ S7-PLC", "/app"],
  ];

  for (const [title, href] of routes) {
    assert.match(navigatorSource, new RegExp(`title: "${title}"[\\s\\S]*?href: "${href}"`));
  }

  assert.equal((navigatorSource.match(/href:/g) ?? []).length, 3);
  assert.match(navigatorSource, /<nav aria-label="Accesos a las soluciones principales">/);
  assert.match(navigatorSource, /<a href=\{path\.href\} key=\{path\.href\}>/);
  assert.doesNotMatch(navigatorSource, /target=|pay\.hotmart\.com/);
});

test("el bloque redundante de tres tarjetas ya no se renderiza en ningún idioma", () => {
  const removedHeadings = [
    "Servicios, formación y herramientas para mantenimiento industrial",
    "Services, training and tools for industrial maintenance",
    "Serviços, formação e ferramentas para manutenção industrial",
  ];

  for (const heading of removedHeadings) {
    assert.doesNotMatch(appSource, new RegExp(heading));
  }

  assert.doesNotMatch(appSource, /data-home-section="worklines"|homeWorkLines|\.workLines\.map/);
  assert.doesNotMatch(i18nSource, /workLines:/);
});

test("inglés y portugués conservan los mismos tres recorridos en el hero", () => {
  const translatedRoutes = [
    ["Industrial services", "/en/services"],
    ["Technical training", "/en/courses"],
    ["Try the BOJ S7-PLC App", "/en/app"],
    ["Serviços industriais", "/pt/servicos"],
    ["Capacitação técnica", "/pt/cursos"],
    ["Testar o App BOJ S7-PLC", "/pt/app"],
  ];

  for (const [title, href] of translatedRoutes) {
    assert.match(i18nSource, new RegExp(`title: "${title}"[\\s\\S]*?href: "${href}"`));
  }
});
