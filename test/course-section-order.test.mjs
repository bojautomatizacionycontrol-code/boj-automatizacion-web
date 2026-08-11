import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const appSource = await readFile(new URL("../src/App.jsx", import.meta.url), "utf8");

test("el método BOJ y el problema aparecen después de la oferta comercial", () => {
  const offerIndex = appSource.indexOf('className="s7-sales-section s7-sales-offer" id="curso-s7-compra"');
  const methodIndex = appSource.indexOf("<S7MethodStrip />");
  const problemIndex = appSource.indexOf('className="s7-sales-section s7-sales-problem"');
  const mistakesIndex = appSource.indexOf('className="s7-sales-section s7-sales-dark s7-sales-mistakes"');

  assert.notEqual(offerIndex, -1);
  assert.notEqual(methodIndex, -1);
  assert.notEqual(problemIndex, -1);
  assert.notEqual(mistakesIndex, -1);
  assert.ok(offerIndex < methodIndex, "El Método BOJ debe seguir al bloque comercial");
  assert.ok(methodIndex < problemIndex, "Qué problema resuelve debe seguir al Método BOJ");
  assert.ok(problemIndex < mistakesIndex, "Ambos bloques deben preceder a la sección de errores");
  assert.equal(appSource.match(/<S7MethodStrip \/>/g)?.length, 1);
  assert.equal(appSource.match(/className="s7-sales-section s7-sales-problem"/g)?.length, 1);
});
