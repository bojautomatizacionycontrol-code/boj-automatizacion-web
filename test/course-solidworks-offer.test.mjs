import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const routeSource = await readFile(new URL("../src/routes/course-solidworks.jsx", import.meta.url), "utf8");
const coursesSource = await readFile(new URL("../src/routes/courses-index.jsx", import.meta.url), "utf8");
const contentSource = await readFile(new URL("../src/content.js", import.meta.url), "utf8");
const i18nSource = await readFile(new URL("../src/i18n.js", import.meta.url), "utf8");

test("SolidWorks presenta la oferta confirmada y habilita el checkout oficial de Hotmart", () => {
  assert.match(routeSource, /Manual teórico-práctico \+ ejercicios y cuestionarios/);
  assert.match(routeSource, /price: "USD 29"/);
  assert.match(routeSource, /222 páginas/);
  assert.match(routeSource, /Soporte durante 30 días/);
  assert.match(routeSource, /respuesta dentro de 2 días hábiles/);
  assert.match(routeSource, /Ejercicios_NivelPrincipiante/);
  assert.match(routeSource, /<DeferredManualFlipbook images=\{manualPreviewImages\}/);
  assert.match(routeSource, /No incluye certificado/);
  assert.match(routeSource, /No incluye el software SolidWorks ni su licencia/);
  assert.match(routeSource, /const solidworksCheckoutUrl = "https:\/\/pay\.hotmart\.com\/P108131947K";/);
  assert.equal(routeSource.match(/href=\{solidworksCheckoutUrl\} target="_blank" rel="noopener noreferrer"/g)?.length, 2);
  assert.match(routeSource, /purchaseAction: "Comprar ahora en Hotmart"/);
  assert.match(routeSource, /purchaseAction: "Buy now on Hotmart"/);
  assert.match(routeSource, /purchaseAction: "Comprar agora na Hotmart"/);
  assert.doesNotMatch(routeSource, /solidworks-purchase-pending|disabled|en preparación|being prepared|em preparação|enlace próximamente|link coming soon|link em breve/);
  assert.doesNotMatch(routeSource, /Programa en desarrollo|Inscripción aún no habilitada|Portada preliminar/);
});

test("el índice de cursos identifica la portada final y el material terminado", () => {
  assert.match(coursesSource, /status: "Material finalizado"/);
  assert.match(coursesSource, /"Portada final"/);
  assert.match(coursesSource, /actionLabel: "Ver material y precio"/);
  assert.doesNotMatch(coursesSource, /SolidWorks[^\n]{0,80}En desarrollo/);
});

test("los menús usan el nombre corto del curso de SolidWorks en los tres idiomas", () => {
  assert.match(contentSource, /label: "SolidWorks principiante", path: "\/cursos\/solidworks"/);
  assert.doesNotMatch(contentSource, /SolidWorks principiante — Material finalizado/);
  assert.match(i18nSource, /label: "SolidWorks beginner", path: "\/en\/courses\/solidworks"/);
  assert.match(i18nSource, /label: "SolidWorks iniciante", path: "\/pt\/cursos\/solidworks"/);
  assert.doesNotMatch(i18nSource, /SolidWorks beginner — Material completed|SolidWorks iniciante — Material finalizado/);
});
