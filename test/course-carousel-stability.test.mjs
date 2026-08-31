import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { readCssBundle } from "./helpers/css-source.mjs";

const stylesSource = await readCssBundle();

test("el carrusel del manual reserva una altura estable para todas sus leyendas", () => {
  assert.match(
    stylesSource,
    /\.s7-sales-include-course \.s7-flip-card \.s7-flip-bar\s*\{[\s\S]*?min-height:\s*66px;/,
  );
  assert.match(
    stylesSource,
    /\.s7-sales-include-course \.s7-flip-card \.s7-flip-caption\s*\{[\s\S]*?flex:\s*1 1 0;/,
  );
});

test("el anclaje de contenido del curso conserva espacio bajo el encabezado fijo", () => {
  assert.match(
    stylesSource,
    /#curso-s7-incluye,\s*#curso-s7-compra\s*\{[\s\S]*?scroll-margin-top:\s*84px;/,
  );
});
