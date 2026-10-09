import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const routeSource = await readFile(new URL("../src/routes/course-solidworks.jsx", import.meta.url), "utf8");
const coursesSource = await readFile(new URL("../src/routes/courses-index.jsx", import.meta.url), "utf8");

test("SolidWorks presenta la oferta confirmada sin habilitar una compra sin enlace", () => {
  assert.match(routeSource, /Manual teórico-práctico \+ ejercicios y cuestionarios/);
  assert.match(routeSource, /price: "USD 29"/);
  assert.match(routeSource, /222 páginas/);
  assert.match(routeSource, /Soporte durante 30 días/);
  assert.match(routeSource, /respuesta dentro de 2 días hábiles/);
  assert.match(routeSource, /Ejercicios_NivelPrincipiante/);
  assert.match(routeSource, /<DeferredManualFlipbook images=\{manualPreviewImages\}/);
  assert.match(routeSource, /No incluye certificado/);
  assert.match(routeSource, /No incluye el software SolidWorks ni su licencia/);
  assert.match(routeSource, /className="mock-btn mock-btn-primary solidworks-purchase-pending" disabled/);
  assert.doesNotMatch(routeSource, /Programa en desarrollo|Inscripción aún no habilitada|Portada preliminar/);
});

test("el índice de cursos identifica la portada final y el material terminado", () => {
  assert.match(coursesSource, /status: "Material finalizado"/);
  assert.match(coursesSource, /"Portada final"/);
  assert.match(coursesSource, /actionLabel: "Ver material y precio"/);
  assert.doesNotMatch(coursesSource, /SolidWorks[^\n]{0,80}En desarrollo/);
});
