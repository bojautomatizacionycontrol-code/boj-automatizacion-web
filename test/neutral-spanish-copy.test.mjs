import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const appSource = await readFile(new URL("../src/App.jsx", import.meta.url), "utf8");
const contentSource = await readFile(new URL("../src/content.js", import.meta.url), "utf8");
const commercialSource = `${appSource}\n${contentSource}`;

const voseoTerms = [
  "acá",
  "accedé",
  "activá",
  "aprendé",
  "buscás",
  "cargá",
  "compará",
  "compartí",
  "completá",
  "comprendé",
  "conectá",
  "conservá",
  "contanos",
  "definí",
  "dependés",
  "diagnosticá",
  "diferenciá",
  "elegí",
  "empezá",
  "enfrentás",
  "entendé",
  "escribinos",
  "evitá",
  "extraé",
  "filtrá",
  "identificá",
  "indicá",
  "ingresá",
  "interpretá",
  "llegás",
  "localizá",
  "mirá",
  "necesitás",
  "observás",
  "ordená",
  "orientá",
  "pagás",
  "perdé",
  "podés",
  "profundizá",
  "querés",
  "recibís",
  "recorré",
  "reducí",
  "reducís",
  "revisá",
  "sabé",
  "sabés",
  "seguinos",
  "separás",
  "tenés",
  "trabajás",
  "usá",
  "verificá",
  "volvé",
  "vos",
];

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const voseoPattern = new RegExp(`(?<!\\p{L})(?:${voseoTerms.map(escapeRegExp).join("|")})(?!\\p{L})`, "giu");

test("el contenido comercial utiliza español neutro y evita el voseo", () => {
  assert.doesNotMatch(commercialSource, voseoPattern);
});

test("las expresiones comerciales regionales se presentan de forma universal", () => {
  const forbiddenPatterns = [
    /\b\d+\s*hs\b/iu,
    /\bEnviar email\b/iu,
    /\bA cotizar\b/iu,
    /\bcelular,\s*tablet\b/iu,
    /title:\s*"TRIAL"/u,
    /Funciona offline/iu,
  ];

  for (const pattern of forbiddenPatterns) {
    assert.doesNotMatch(commercialSource, pattern);
  }

  const expectedCopy = [
    "Prueba gratuita",
    "Probar gratis durante 48 horas",
    "correo electrónico",
    "teléfono móvil, la tableta o el navegador",
    "Precio personalizado",
    "Funciona sin conexión hasta 2 días",
    "Síguenos",
  ];

  for (const copy of expectedCopy) {
    assert.ok(commercialSource.includes(copy), `Falta la forma neutral esperada: ${copy}`);
  }
});

test("la neutralización conserva los mensajes técnicos centrales", () => {
  const expectedTechnicalCopy = [
    "Diagnostic Buffer",
    "HW Config Online",
    "STEP 7",
    "PROFIBUS",
    "BOJ S7-PLC PRO",
    "La app no se conecta directamente al PLC ni reemplaza STEP 7.",
  ];

  for (const copy of expectedTechnicalCopy) {
    assert.ok(commercialSource.includes(copy), `Falta el término técnico preservado: ${copy}`);
  }
});
