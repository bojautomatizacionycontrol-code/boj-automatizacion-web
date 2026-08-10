import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const appSource = await readFile(new URL("../src/App.jsx", import.meta.url), "utf8");
const styleSource = await readFile(new URL("../src/styles.css", import.meta.url), "utf8");

const workLinesBlock = appSource.match(
  /const homeWorkLines = \[(?<content>[\s\S]*?)\n\];/,
)?.groups?.content;

test("la portada ofrece tres rutas internas claras", () => {
  assert.ok(workLinesBlock, "No se encontró homeWorkLines");

  const routes = [
    ["Servicios industriales", "/servicios", "Ver servicios"],
    ["Capacitación técnica", "/cursos", "Ver cursos"],
    ["Herramientas digitales", "/app", "Conocer la app"],
  ];

  for (const [title, href, cta] of routes) {
    assert.match(workLinesBlock, new RegExp(`title: "${title}"[\\s\\S]*?href: "${href}"[\\s\\S]*?cta: "${cta}"`));
  }

  assert.equal((workLinesBlock.match(/href:/g) ?? []).length, 3);
  assert.equal((workLinesBlock.match(/cta:/g) ?? []).length, 3);
});

test("las rutas se renderizan como enlaces accesibles sin navegación externa", () => {
  assert.match(appSource, /<a className="mock-work-card" href=\{item\.href\} key=\{item\.title\}>/);
  assert.match(appSource, /className="mock-work-card-cta"/);
  assert.match(appSource, /<ArrowRight size=\{17\} aria-hidden="true" \/>/);
  assert.doesNotMatch(appSource, /<a className="mock-work-card"[^>]*target=/);
  assert.match(styleSource, /\.mock-work-card:focus-visible\s*\{/);
  assert.match(styleSource, /\.mock-work-card-cta\s*\{[\s\S]*?min-height:\s*44px;/);
  assert.match(styleSource, /@media \(prefers-reduced-motion: reduce\)/);
});
