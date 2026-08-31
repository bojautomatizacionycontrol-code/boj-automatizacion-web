import { readRuntimeAppSource } from "./helpers/runtime-app-source.mjs";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

const appSource = (await readRuntimeAppSource()).replaceAll("\r\n", "\n");
const cssSource = await readFile(new URL("../src/m1-accessibility.css", import.meta.url), "utf8");

function sha256(value) {
  return createHash("sha256").update(value.replaceAll("\r\n", "\n")).digest("hex").toUpperCase();
}

test("los CTA ES EN PT terminan en un título visible y enfocable", () => {
  for (const [id, title] of [
    ["consulta-tecnica", "Cuéntanos el caso"],
    ["en-contact-form", "Tell us about your case"],
    ["pt-formulario-contato", "Conte-nos sobre seu caso"],
  ]) {
    assert.match(appSource, new RegExp(`<h2 id="${id}" tabIndex=\\{-1\\}>${title}`));
    assert.ok(appSource.includes(`href: "#${id}"`) || appSource.includes(`href: headerCopy.contactAnchor`));
    assert.ok(cssSource.includes(`#${id}`));
  }
  assert.doesNotMatch(appSource, /className="contact-grid" id="consulta-tecnica"/);
  assert.match(cssSource, /scroll-margin-top: 7rem/);
});

test("campos y errores tienen semántica accesible y autocompletado", () => {
  assert.ok((appSource.match(/autoComplete="name"/g) || []).length >= 3);
  assert.ok((appSource.match(/autoComplete="organization"/g) || []).length >= 3);
  assert.ok((appSource.match(/autoComplete="email"/g) || []).length >= 3);
  assert.ok((appSource.match(/autoComplete="tel"/g) || []).length >= 3);
  assert.match(appSource, /function ContactErrorSummary/);
  assert.match(appSource, /role="alert" tabIndex=\{-1\}/);
  assert.ok((appSource.match(/aria-invalid=\{Boolean\(errors\./g) || []).length >= 9);
  assert.ok((appSource.match(/aria-describedby=\{errors\./g) || []).length >= 9);
  assert.match(appSource, /role=\{status === "error" \? "alert" : "status"\}/);
  assert.match(cssSource, /\[aria-invalid="true"\]/);
});

test("cada formulario ofrece un enlace neutral de privacidad", () => {
  assert.equal((appSource.match(/className="form-privacy-note"/g) || []).length, 3);
  assert.equal((appSource.match(/href="\/privacidad"/g) || []).length >= 3, true);
  assert.match(appSource, /privacy policy \(Spanish\)/);
  assert.match(appSource, /política de privacidade \(em espanhol\)/);
});

test("el transporte de contacto permanece byte-equivalente al baseline", () => {
  const start = appSource.indexOf("async function sendContactForm");
  const end = appSource.indexOf("\n}\n", start) + 2;
  assert.equal(sha256(appSource.slice(start, end)), "6B40DD2E08229E5EDA129227CBB6F4380682464F25DCA2452C68C65009C86D0E");
});
