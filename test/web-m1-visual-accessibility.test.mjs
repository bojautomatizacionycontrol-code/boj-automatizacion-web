import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const appSource = await readFile(new URL("../src/App.jsx", import.meta.url), "utf8");
const baseCss = await readFile(new URL("../src/styles.css", import.meta.url), "utf8");
const auditCss = await readFile(new URL("../src/audit.css", import.meta.url), "utf8");
const m1Css = await readFile(new URL("../src/m1-accessibility.css", import.meta.url), "utf8");

function luminance(hex) {
  const rgb = hex.match(/[a-f\d]{2}/gi).map((part) => Number.parseInt(part, 16) / 255);
  const linear = rgb.map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrast(a, b) {
  const [bright, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (bright + 0.05) / (dark + 0.05);
}

test("publica skip link y un main único enfocable", () => {
  assert.match(appSource, /className="skip-link" href="#main-content"/);
  assert.equal((appSource.match(/id="main-content"/g) || []).length, 1);
  assert.match(appSource, /<main id="main-content" tabIndex=\{-1\}>/);
});

test("usa un patrón focus-visible dual y compatible con colores forzados", () => {
  assert.doesNotMatch(`${baseCss}\n${auditCss}\n${m1Css}`, /outline:\s*none/i);
  assert.match(m1Css, /:focus-visible/);
  assert.match(m1Css, /outline: 3px solid #23d6ff/);
  assert.match(m1Css, /box-shadow: 0 0 0 6px #05283a/);
  assert.match(m1Css, /@media \(forced-colors: active\)/);
  assert.match(m1Css, /outline: 3px solid Highlight/);
  assert.ok(contrast("23d6ff", "05283a") >= 3);
  assert.ok(contrast("05283a", "ffffff") >= 3);
});

test("contraste, targets y estados superan los mínimos focales", () => {
  assert.ok(contrast("107d2b", "ffffff") >= 4.5);
  assert.ok(contrast("0b6f98", "ffffff") >= 4.5);
  assert.ok(contrast("0b6f98", "f3f7fb") >= 4.5);
  assert.ok(contrast("baf7df", "061f2e") >= 4.5);
  assert.ok(contrast("ffd0d0", "061f2e") >= 4.5);
  assert.match(m1Css, /\.language-switcher a[\s\S]*?min-width: 24px[\s\S]*?min-height: 24px/);
  assert.match(m1Css, /\.header-action\)[\s\S]*?min-height: 44px/);
  assert.match(m1Css, /\[aria-invalid="true"\]/);
  assert.match(m1Css, /\.form-feedback\.success/);
  assert.match(m1Css, /\.form-feedback\.error/);
  assert.match(m1Css, /\[aria-invalid="true"\]:focus-visible[\s\S]*?box-shadow: 0 0 0 6px #05283a/);
  assert.match(m1Css, /\.app-pro-real-view-trigger:focus-visible[\s\S]*?outline-offset: -6px/);
  assert.match(m1Css, /\.s7-flip-card \.s7-flip-nav:active:not\(:disabled\)[\s\S]*?translateY\(-50%\)/);
  assert.match(m1Css, /\.s7-flip-lightbox-inner[\s\S]*?overflow: visible/);
  assert.match(m1Css, /\.s7-flip-lightbox-inner[\s\S]*?width: min\(640px, calc\(100vw - 2rem\)\)/);
  assert.match(m1Css, /\.s7-flip-lightbox-inner \.s7-flip-prev[\s\S]*?left: 0\.5rem/);
  assert.match(m1Css, /\.s7-flip-lightbox-inner \.s7-flip-next[\s\S]*?right: 0\.5rem/);
  assert.match(m1Css, /\.s7-flip-lightbox-inner \.s7-flip-lightbox-close[\s\S]*?right: 0\.5rem/);
});

test("movimiento reducido, H1 y grilla de cinco planes quedan normalizados", () => {
  assert.match(m1Css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?scroll-behavior: auto !important/);
  assert.match(m1Css, /animation-duration: 0\.01ms !important/);
  assert.match(m1Css, /grid-template-columns: repeat\(6, minmax\(0, 1fr\)\) !important/);
  assert.match(m1Css, /nth-last-child\(2\)[\s\S]*?span 3/);
  assert.match(appSource, /className="nowrap-technical-token">S7-300\/400/);
  assert.match(m1Css, /@media \(max-width: 430px\)[\s\S]*?\.s7-sales-page > \.boj-hero \.boj-hero-title/);
});

test("corrige saltos evitables de encabezado sin cambiar sus textos", () => {
  assert.match(appSource, /<h2 className="s7-sales-kicker">Qué vas a aprender<\/h2>/);
  assert.match(appSource, /<h2 className="s7-sales-kicker">\{copy\.learningKicker\}<\/h2>/);
  assert.match(appSource, /<section className="article-section"[\s\S]*?<h2>\{section\.title\}<\/h2>/);
  assert.match(appSource, /<h2>Documentación, soporte técnico y referencias del fabricante<\/h2>/);
  assert.equal((appSource.match(/<article className="gracias-step">\s*<h2>/g) || []).length, 3);
  assert.equal((appSource.match(/<h2>\{footerCopy\./g) || []).length, 3);
});
