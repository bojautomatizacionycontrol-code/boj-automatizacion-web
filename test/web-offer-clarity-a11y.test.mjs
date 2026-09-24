import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const [appSource, appPageSource, courseSource, i18nSource, flipbookSource] = await Promise.all([
  readFile(new URL("../src/App.jsx", import.meta.url), "utf8"),
  readFile(new URL("../src/routes/app.jsx", import.meta.url), "utf8"),
  readFile(new URL("../src/routes/course-s7.jsx", import.meta.url), "utf8"),
  readFile(new URL("../src/i18n.js", import.meta.url), "utf8"),
  readFile(new URL("../src/components/DeferredManualFlipbook.jsx", import.meta.url), "utf8"),
]);

test("la FAQ distingue el acceso permanente al curso del mes incluido de APP PRO", () => {
  assert.match(courseSource, /El curso conserva su acceso permanente/);
  assert.match(courseSource, /La licencia de APP PRO incluida finaliza al cumplirse el mes/);
  assert.doesNotMatch(courseSource, /permanece disponible según las condiciones de entrega definidas/);
});

test("las FAQ inglesa y portuguesa incluyen las tres opciones con curso", () => {
  assert.match(i18nSource, /The Course \+ 1-month PRO App bundle, Professional and Business include permanent access/);
  assert.match(i18nSource, /O pacote Curso \+ App PRO por 1 mês, Profissional e Empresarial incluem acesso permanente/);
  assert.match(i18nSource, /Monthly subscription and One-time monthly license include the PRO App only/);
  assert.match(i18nSource, /Assinatura Mensal e a licença mensal avulsa incluem somente o App PRO/);
});

test("los grupos con nombre accesible tienen un rol reconocido", () => {
  assert.match(appSource, /className="mock-footer-contact" role="group" aria-label=/);
  assert.match(appSource, /className="floating-contact" role="group" aria-label=/);
  assert.match(flipbookSource, /data-deferred-manual-flipbook=""\s+role="group"\s+aria-label=/);
  assert.equal((appPageSource.match(/className="app-pro-positioning-route" role="group" aria-label=/g) || []).length, 3);
});

test("la prueba social no afirma una cantidad de fallas sin respaldo visible", () => {
  assert.match(appPageSource, /title: "Diagnóstico con evidencia"/);
  assert.doesNotMatch(appPageSource, /Miles de fallas/);
});
