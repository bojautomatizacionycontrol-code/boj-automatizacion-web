import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

import { navItems } from "../src/content.js";
import { englishNavItems, languageRoutePairs, portugueseNavItems } from "../src/i18n.js";
import { getRouteMetadata, getSocialImageFamily } from "../src/route-metadata.js";
import { getRouteFamily } from "../src/routes/route-families.js";

const routes = [
  "/servicios/copiloto-de-turbinas",
  "/en/services/turbine-copilot",
  "/pt/servicos/copiloto-de-turbinas",
];

test("Copiloto tiene rutas B2B propias sin reemplazar la App S7-PLC", () => {
  assert.deepEqual(
    languageRoutePairs.find((pair) => pair.es === routes[0]),
    { es: routes[0], en: routes[1], pt: routes[2] }
  );

  for (const [index, items] of [navItems, englishNavItems, portugueseNavItems].entries()) {
    const services = items.find((item) => item.children?.some((child) => child.path === routes[index]));
    assert.ok(services, `Falta entrada de Servicios para ${routes[index]}`);
    assert.ok(items.some((item) => item.path === ["/app", "/en/app", "/pt/app"][index]));
  }

  for (const route of routes) {
    assert.equal(getRouteFamily(route), "copilot");
    assert.equal(getSocialImageFamily(route), "services");
    assert.match(getRouteMetadata(route).title, /Copilot|Copiloto/);
  }
});

test("Copiloto identifica las capturas como demostración y evita promesas no verificadas", async () => {
  const source = await readFile(new URL("../src/routes/copilot.jsx", import.meta.url), "utf8");
  assert.match(source, /No representa una instalación de cliente/);
  assert.match(source, /does not acquire live signals/);
  assert.match(source, /no adquiere señales en tiempo real/);
  assert.match(source, /não adquire sinais em tempo real/);
  assert.match(source, /El alcance y la cotización se acuerdan por separado/);
  assert.doesNotMatch(source, /Hotmart|checkout|precio fijo|implantad[oa] en una semana/i);

  for (const filename of [
    "copiloto-demo-estado-planta.png",
    "copiloto-demo-ficha-instrumento.png",
    "copiloto-demo-busqueda-documental.png",
  ]) {
    const asset = await stat(new URL(`../src/assets/${filename}`, import.meta.url));
    assert.ok(asset.size > 10_000 && asset.size < 250_000, `${filename}: tamaño fuera de rango`);
  }
});
