import { readRuntimeStylesSource } from "./helpers/runtime-app-source.mjs";
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

const styles = await readRuntimeStylesSource()
const marker = "/* App PRO: composición equilibrada para problemas y funcionamiento */"
const layoutStart = styles.lastIndexOf(marker)

test("la composición final de problemas y funcionamiento prevalece en la cascada", () => {
  assert.notEqual(layoutStart, -1, "falta el bloque visual final de App PRO")
  assert.ok(
    layoutStart > styles.lastIndexOf(".app-pro-problems-how-grid", layoutStart - 1),
    "el bloque final debe aparecer después de todas las definiciones previas de la grilla",
  )
})

test("escritorio usa paneles parejos, seis problemas en tres filas y tres pasos verticales", () => {
  const layout = styles.slice(layoutStart)

  assert.match(
    layout,
    /\.app-pro-problems-how-grid\s*\{[^}]*grid-template-columns:\s*minmax\(0, 1\.08fr\) minmax\(360px, 0\.92fr\)/s,
  )
  assert.match(
    layout,
    /\.app-pro-problem-grid\s*\{[^}]*grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\)[^}]*grid-template-rows:\s*repeat\(3, minmax\(0, 1fr\)\)/s,
  )
  assert.match(
    layout,
    /\.app-pro-how-steps\s*\{[^}]*grid-template-columns:\s*1fr[^}]*grid-template-rows:\s*repeat\(3, minmax\(0, 1fr\)\)/s,
  )
  assert.match(layout, /\.app-pro-how-step-wrap \.app-pro-step-arrow\s*\{\s*display:\s*none;/s)
})

test("tablet y móvil mantienen una composición explícita sin depender de reglas antiguas", () => {
  const layout = styles.slice(layoutStart)

  assert.match(layout, /@media \(max-width: 1180px\)[\s\S]*?\.app-pro-problems-how-grid\s*\{\s*grid-template-columns:\s*1fr;/)
  assert.match(layout, /@media \(max-width: 760px\)[\s\S]*?\.app-pro-problem-grid,[\s\S]*?\.app-pro-how-steps\s*\{\s*grid-template-columns:\s*1fr;/)
  assert.match(layout, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.app-pro-problem-grid \.app-pro-problem-item\s*\{\s*transition:\s*none;/)
})
