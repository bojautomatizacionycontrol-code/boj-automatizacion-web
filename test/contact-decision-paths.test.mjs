import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const appSource = await readFile(new URL("../src/App.jsx", import.meta.url), "utf8");
const stylesSource = await readFile(new URL("../src/styles.css", import.meta.url), "utf8");

test("Contacto presenta tres caminos de decisión claros", () => {
  assert.match(appSource, /const contactDecisionPaths = \[/);
  assert.match(appSource, /title: "Falla o línea detenida"/);
  assert.match(appSource, /title: "Proyecto, migración o tablero"/);
  assert.match(appSource, /title: "Curso, App PRO o licencias"/);
  assert.match(appSource, /aria-label="Tipos de consulta"/);
});

test("la urgencia deriva a WhatsApp y las demás consultas al formulario", () => {
  assert.match(appSource, /action: "Priorizar por WhatsApp"[\s\S]*?external: true/);
  assert.equal((appSource.match(/href: "#consulta-tecnica"/g) || []).length, 2);
  assert.match(appSource, /className="contact-grid" id="consulta-tecnica"/);
});

test("el envío existente y los campos obligatorios permanecen intactos", () => {
  assert.match(appSource, /await sendContactForm\(\{ \.\.\.form, subject:/);
  assert.match(appSource, /<input name="name"[^>]*required/);
  assert.match(appSource, /<input name="email" type="email"[^>]*required/);
  assert.match(appSource, /name="message"[\s\S]*?required/);
});

test("los caminos tienen foco visible y adaptación móvil", () => {
  assert.match(stylesSource, /\.contact-route-grid\s*\{[\s\S]*?grid-template-columns: repeat\(3, minmax\(0, 1fr\)\)/);
  assert.match(stylesSource, /\.contact-route-card:focus-visible\s*\{/);
  assert.match(stylesSource, /@media \(max-width: 820px\)[\s\S]*?\.contact-route-grid\s*\{[\s\S]*?grid-template-columns: 1fr/);
  assert.match(stylesSource, /@media \(prefers-reduced-motion: reduce\)/);
});
