import { readRuntimeAppSource, readRuntimeStylesSource } from "./helpers/runtime-app-source.mjs";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { commercialIdentity, contact, offer } from "../src/content.js";

const appSource = await readRuntimeAppSource();
const contentSource = await readFile(new URL("../src/content.js", import.meta.url), "utf8");
const i18nSource = await readFile(new URL("../src/i18n.js", import.meta.url), "utf8");
const indexSource = await readFile(new URL("../index.html", import.meta.url), "utf8");
const stylesSource = await readRuntimeStylesSource();
const legalStylesSource = await readFile(new URL("../src/audit.css", import.meta.url), "utf8");
const reviewSource = await readFile(new URL("../COMMERCIAL_ALIGNMENT_V8_17_24.md", import.meta.url), "utf8");

const publicTextCorpus = [appSource, contentSource, i18nSource, indexSource].join("\n");

const exactDiagnosticCopy = {
  es: "Hipótesis priorizadas según la evidencia disponible y su peso relativo.",
  en: "Hypotheses prioritized according to the available evidence and its relative weight.",
  pt: "Hipóteses priorizadas conforme às evidências disponíveis e ao seu peso relativo.",
};

const exactLanguageDisclosure = {
  es: "Interfaz disponible en seis idiomas. El contenido técnico especializado y los documentos legales se proporcionan actualmente en español.",
  en: "Interface available in six languages. Specialized technical content and legal documents are currently provided in Spanish.",
  pt: "Interface disponível em seis idiomas. O conteúdo técnico especializado e os documentos legais são fornecidos atualmente em espanhol.",
};

const expectedOffers = [
  {
    title: "Suscripción mensual",
    price: "49 USD",
    url: "https://pay.hotmart.com/C107081619V?off=yzyw7mys",
    contract: {
      checkoutName: "Suscripción Mensual BOJ S7-PLC PRO",
      duration: "Mensual mientras la suscripción permanezca activa",
      devices: "1 dispositivo",
      renewal: "Renovación automática mensual hasta cancelación",
      course: "No incluido",
      offline: "Hasta 2 días desde la última validación en línea correcta",
      warranty: "7 días para la transacción inicial de adhesión, según el proceso de Hotmart",
      cancellation: "La cancelación desde la cuenta de comprador en Hotmart evita cobros futuros y mantiene el acceso hasta el final del período ya pagado.",
    },
  },
  {
    title: "Mensual de pago único",
    price: "59 USD",
    url: "https://pay.hotmart.com/B107066308U?off=l23qsbj9",
    contract: {
      checkoutName: "Licencia Mensual BOJ S7-PLC PRO",
      duration: "1 mes calendario",
      devices: "1 dispositivo",
      renewal: "Sin renovación automática",
      course: "No incluido",
      offline: "Hasta 2 días desde la última validación en línea correcta",
      warranty: "7 días, según el proceso de Hotmart",
      cancellation: "No aplica: es un pago único sin renovación automática.",
    },
  },
  {
    title: "Profesional",
    price: "249 USD",
    url: "https://pay.hotmart.com/B107069067M?off=hea8bgc1",
    contract: {
      checkoutName: "Licencia Profesional BOJ S7-PLC PRO + Curso",
      duration: "6 meses",
      devices: "Hasta 2 dispositivos",
      renewal: "Sin renovación automática",
      course: "Incluido con acceso permanente",
      offline: "Hasta 2 días desde la última validación en línea correcta",
      warranty: "7 días, según el proceso de Hotmart",
      cancellation: "No aplica: es un pago único sin renovación automática.",
    },
  },
  {
    title: "Empresarial",
    price: "549 USD",
    url: "https://pay.hotmart.com/Q107075095G?off=kbs1xzpq",
    contract: {
      checkoutName: "Licencia Empresarial BOJ S7-PLC PRO + Curso",
      duration: "6 meses",
      devices: "Hasta 10 dispositivos",
      renewal: "Sin renovación automática",
      course: "Incluido con acceso permanente",
      offline: "Hasta 7 días desde la última validación en línea correcta",
      warranty: "7 días, según el proceso de Hotmart",
      cancellation: "No aplica: es un pago único sin renovación automática.",
    },
  },
];

test("publica la semántica diagnóstica aprobada en español, inglés y portugués", () => {
  for (const copy of Object.values(exactDiagnosticCopy)) {
    assert.ok(publicTextCorpus.includes(copy), `Falta la frase diagnóstica exacta: ${copy}`);
  }

  assert.doesNotMatch(publicTextCorpus, /\b(probabilidad|probability|probabilidade)\b/i);
  assert.doesNotMatch(publicTextCorpus, /\branking\s+de\s+causas\b/i);
  assert.doesNotMatch(publicTextCorpus, /\bpossible causes ordered\b/i);
  assert.doesNotMatch(publicTextCorpus, /\bpossíveis causas ordenadas\b/i);
});

test("deja fuera del build las capturas históricas con porcentajes o causas probables", () => {
  const inactiveVisuals = [
    "./assets/APP.png",
    "./assets/boj-s7-plc-real-capture.png",
    "./assets/app-pro-hero-background-v2.jpg",
    "app-sad-device-preview.png",
    "app-panel-principal-diagnostico.jpg",
    "app-resultado-diagnostico.jpg",
    "app-hipotesis-priorizadas.jpg",
    "assets/app-carousel",
    "app-pro-real-capture.png",
    "app-boj-s7-plc-pro-dashboard.png",
    "app-pro-hero-exact.png",
    "app-pro-hero-background.png",
    "app-pro-hero-laptop.jpg",
  ];

  for (const visual of inactiveVisuals) {
    assert.ok(!appSource.includes(visual), `La captura histórica sigue activa: ${visual}`);
  }

  assert.match(appSource, /import appDiagnosticoGuiado from "\.\.\/assets\/app-diagnostico-guiado\.jpg"/);
  assert.match(appSource, /const s7AppCarousel = \[[\s\S]*?image: appDiagnosticoGuiado[\s\S]*?\];/);
  assert.match(appSource, /"!\.\.\/assets\/services-works\/panel app\.png"/);
  assert.match(appSource, /"!\.\.\/assets\/services-works\/panel app 2\.png"/);
  for (const activeVisual of [
    "app-seleccion-sintoma-v8-17-24.jpg",
    "app-verificacion-guiada-v8-17-24.jpg",
    "app-registro-intervencion-v8-17-24.jpg",
  ]) {
    assert.ok(appSource.includes(activeVisual), `Falta la captura vigente: ${activeVisual}`);
  }
  assert.match(stylesSource, /\.app-pro-page \.app-pro-real-gallery\s*\{/);
  assert.match(stylesSource, /\.app-pro-page \.app-pro-real-selector button\[aria-pressed="true"\]/);
});

test("muestra la divulgación lingüística exacta antes de cada grilla de compra", () => {
  const pageRanges = [
    ["function AppPage()", "function EnglishAppHeroDiagnosticPreview()", exactLanguageDisclosure.es, 'id="planes-pro"'],
    ["function EnglishAppPage()", "function PortugueseAppHeroDiagnosticPreview()", exactLanguageDisclosure.en, 'id="en-pro-plans"'],
    ["function PortugueseAppPage()", "function AppRoutes", exactLanguageDisclosure.pt, 'id="pt-planos-pro"'],
  ];

  for (const [startMarker, endMarker, disclosure, plansMarker] of pageRanges) {
    const start = appSource.indexOf(startMarker);
    const end = appSource.indexOf(endMarker, start);
    const pageSource = appSource.slice(start, end);
    const disclosurePosition = pageSource.indexOf(disclosure);
    const plansPosition = pageSource.indexOf(plansMarker);

    assert.notEqual(start, -1, `No se encontró ${startMarker}`);
    assert.notEqual(end, -1, `No se encontró ${endMarker}`);
    assert.notEqual(disclosurePosition, -1, `Falta la divulgación: ${disclosure}`);
    assert.notEqual(plansPosition, -1, `No se encontró ${plansMarker}`);
    assert.ok(disclosurePosition < plansPosition, "La divulgación debe aparecer antes de la compra");
  }

  assert.match(appSource, /className="app-pro-language-disclosure"/);
  assert.match(stylesSource, /\.app-pro-language-card \.app-pro-language-disclosure\s*\{[\s\S]*?overflow-wrap:\s*anywhere;/);
});

test("centraliza las cuatro ofertas verificadas sin alterar precios ni checkouts", () => {
  const actualOffers = offer.app.proPlans
    .filter(({ title }) => title !== "Curso + licencia")
    .map(({ title, price, url, contract }) => ({ title, price, url, contract }));

  assert.deepEqual(actualOffers, expectedOffers);
  assert.equal(new Set(actualOffers.map(({ url }) => url)).size, 4);
});

test("publica identidad comercial ratificada en los tres documentos y conserva privacidad separada", () => {
  const expectedIdentity = {
    seller: "Hexa Group Holding SAS",
    taxId: "30-71955124-2",
    owner: "Walter Adrián Boj",
    ownedBrands: "BOJ Automatización y BOJ S7-PLC",
    authorization: "Comercialización autorizada por el titular",
    brand: "BOJ Automatización y Control",
    product: "BOJ S7-PLC",
    address: "Culpina 63, piso 5°, departamento C, Ciudad Autónoma de Buenos Aires, Argentina",
    institutionalEmail: "contacto@hexagroup.com.ar",
    supportEmail: "contacto@bojautomatizacion.com",
    phone: "+54 9 381 532-7469",
    hours: "Lunes a viernes de 09:00 a 17:00, hora de Argentina, excepto feriados",
    responseTime: "Dentro de 48 horas hábiles",
    website: "www.bojautomatizacion.com",
    taxStatus: "Responsable Inscripto",
    invoicing: "Factura electrónica y factura E para exportaciones, según corresponda",
    supportOwner: "Walter Adrián Boj",
  };

  assert.deepEqual(commercialIdentity, expectedIdentity);
  assert.equal(Object.isFrozen(commercialIdentity), true);
  assert.equal(contact.location, commercialIdentity.address);
  assert.equal(contact.whatsappDisplay, commercialIdentity.phone);
  assert.equal(contact.whatsappNumber, "5493815327469");
  assert.equal(appSource.match(/showCommercialIdentity:\s*true/g)?.length, 3);
  assert.match(appSource, /<strong>Vendedor y facturador:<\/strong> \{commercialIdentity\.seller\}/);
  assert.match(appSource, /La comercialización[\s\S]*?está autorizada por el titular/);
  assert.match(appSource, /className="legal-business-facts"/);
  assert.match(appSource, /commercialIdentity\.institutionalEmail/);
  assert.match(appSource, /commercialIdentity\.supportEmail/);
  assert.match(appSource, /commercialIdentity\.taxStatus/);
  assert.match(appSource, /commercialIdentity\.invoicing/);
  // Decisión del titular (5 de septiembre de 2026): se publica la identificación básica del vendedor.
  assert.match(appSource, /<dt>CUIT<\/dt><dd>\{commercialIdentity\.taxId\}<\/dd>/);
  assert.match(appSource, /<dt>Marca comercial<\/dt><dd>\{commercialIdentity\.brand\}<\/dd>/);
  assert.match(appSource, /<dt>Producto asociado<\/dt><dd>\{commercialIdentity\.product\}<\/dd>/);
  assert.equal(commercialIdentity.taxId, "30-71955124-2");
  assert.doesNotMatch(publicTextCorpus, /Ingresos Brutos|\bCBU\b|ficha de proveedor|960\/D|Data Fiscal|arca\.gob\.ar/i);
  assert.doesNotMatch(publicTextCorpus, /contrato exclusivo firmado|autorización exclusiva/i);

  const privacyStart = appSource.indexOf("  privacy: {");
  const privacyEnd = appSource.indexOf("  terms: {", privacyStart);
  const privacySource = appSource.slice(privacyStart, privacyEnd);
  assert.match(privacySource, /updated: "5 de septiembre de 2026"/);
  assert.match(privacySource, /No vendemos datos personales/);
  // Decisión del titular (5 de septiembre de 2026): Privacidad identifica al responsable del tratamiento sin la ficha comercial completa.
  assert.match(privacySource, /\["Responsable del tratamiento", `\$\{commercialIdentity\.seller\}, CUIT \$\{commercialIdentity\.taxId\}, con nombre comercial \$\{commercialIdentity\.brand\}\. Domicilio: \$\{commercialIdentity\.address\}\. Contacto: \$\{commercialIdentity\.supportEmail\}\.`\]/);
  assert.doesNotMatch(privacySource, /showCommercialIdentity|commercialIdentity\.(taxStatus|invoicing|product|supportOwner)/);

  assert.doesNotMatch(appSource, /Lunes a viernes de 8:00 a 18:00|Respondemos normalmente dentro/);
  assert.doesNotMatch(publicTextCorpus, /\+54 381 5327469|\+543815327469|9:00 a 16:00/);
  assert.match(indexSource, /"telephone": "\+5493815327469"/);
  assert.match(indexSource, /"taxID": "30-71955124-2"/);
  assert.match(indexSource, /"streetAddress": "Culpina 63, piso 5°, departamento C"/);
  assert.equal((indexSource.match(/"Ciudad Autónoma de Buenos Aires"/g) || []).length, 2);
  assert.match(appSource, /<dd>\{commercialIdentity\.hours\}<\/dd>/);
  assert.equal((appSource.match(/Respondemos dentro de 48 horas hábiles/g) || []).length, 2);
  assert.match(legalStylesSource, /\.legal-business-facts\s*\{[\s\S]*?grid-template-columns:\s*minmax\(190px,/);
  assert.match(legalStylesSource, /@media \(max-width: 760px\)[\s\S]*?\.legal-business-facts\s*\{[\s\S]*?grid-template-columns:\s*minmax\(0, 1fr\);/);
});

test("distingue el efecto del reembolso según el contenido real de cada oferta", () => {
  assert.match(appSource, /\["Suscripción y Mensual", "Si Hotmart aprueba el reembolso, se revoca la licencia BOJ S7-PLC PRO vinculada a esa compra\. Estas dos ofertas no incluyen curso ni materiales; la licencia mensual de pago único tampoco incluye acceso permanente\."\]/);
  assert.match(appSource, /\["Profesional y Empresarial", "Si Hotmart aprueba el reembolso, se revocan la licencia BOJ S7-PLC PRO y el acceso permanente al curso y sus materiales vinculados a esa compra\."\]/);
  assert.doesNotMatch(appSource, /Una vez aprobado, se revoca el acceso al curso, al material técnico y a la licencia PRO incluida/);

  const appOffers = offer.app.proPlans.filter(({ title }) => title !== "Curso + licencia");
  assert.deepEqual(appOffers.map(({ contract }) => contract.course), [
    "No incluido",
    "No incluido",
    "Incluido con acceso permanente",
    "Incluido con acceso permanente",
  ]);
  assert.doesNotMatch(JSON.stringify(appOffers), /TIA Portal|S7-1200|S7-1500/i);
});

test("actualiza los tres documentos comerciales y conserva el contrato técnico", () => {
  assert.equal(appSource.match(/showAppOffers:\s*true/g)?.length, 3);
  assert.match(appSource, /Ofertas BOJ S7-PLC PRO publicadas/);
  assert.match(appSource, /La prueba gratuita dura 48 horas/);
  assert.match(appSource, /La cancelación se realiza desde la cuenta de comprador en Hotmart/);
  assert.equal((appSource.match(/El alcance técnico de BOJ S7-PLC PRO se limita a sistemas Siemens S7-300\/400 compatibles\./g) || []).length, 2);
  assert.match(appSource, /no se conecta al PLC, no controla equipos/);
  assert.match(appSource, /refund\.hotmart\.com/);
  assert.match(appSource, /Su vigencia es de un mes calendario\./);
  assert.match(appSource, /fecha y hora UTC equivalente del mes siguiente/);
  assert.match(appSource, /La activación posterior en un dispositivo no reinicia ni extiende el plazo/);
  assert.equal(appSource.match(/updated: "30 de agosto de 2026"/g), null);
  assert.equal(appSource.match(/updated: "5 de septiembre de 2026"/g)?.length, 4);
  assert.match(legalStylesSource, /\.legal-offer-grid\s*\{[\s\S]*?grid-template-columns:\s*repeat\(2,/);
  assert.match(legalStylesSource, /@media \(max-width: 760px\)[\s\S]*?\.legal-offer-grid\s*\{[\s\S]*?grid-template-columns:\s*minmax\(0, 1fr\);/);
});

test("registra v8.17.24, la evidencia externa y la aprobación provisional sin simular una verificación local", () => {
  const approvalMarker = "APROBACIÓN PROVISIONAL DEL PROPIETARIO REGISTRADA — REVISIÓN JURÍDICA PROFESIONAL PENDIENTE";
  const exactHotmartDescription = "Licencia Mensual BOJ S7-PLC PRO para 1 dispositivo. Vigencia: un mes calendario. Pago único, sin renovación automática, sin curso ni acceso permanente.";

  assert.ok(reviewSource.includes(approvalMarker));
  assert.doesNotMatch(publicTextCorpus, new RegExp(approvalMarker));
  assert.doesNotMatch(publicTextCorpus, /\b(?:30 días|30 days|30 dias)\b/i);
  assert.match(contentSource, /Pago único · 1 mes calendario · Sin renovación automática · 1 dispositivo/);
  assert.match(i18nSource, /One-time payment · 1 calendar month · No automatic renewal · 1 device/);
  assert.match(i18nSource, /Pagamento único · 1 mês-calendário · Sem renovação automática · 1 dispositivo/);
  assert.match(reviewSource, /^# Alineación comercial con BOJ S7-PLC v8\.17\.24/m);
  assert.doesNotMatch(reviewSource, /v8\.17\.23/);
  assert.match(reviewSource, /## Evidencia local del repositorio/);
  assert.match(reviewSource, /## Evidencia externa de Hotmart/);
  assert.match(reviewSource, /ninguna prueba local del repositorio pretende sustituirla/);
  assert.match(reviewSource, /## Aprobación provisional del propietario/);
  assert.match(reviewSource, /sin dictamen jurídico profesional previo/);
  assert.doesNotMatch(reviewSource, /revisad[oa] por (?:un )?abogad[oa]|revisión jurídica profesional completada/i);
  assert.ok(reviewSource.includes(exactHotmartDescription));
  assert.match(reviewSource, /El primer intento histórico[\s\S]*?no persistió/);
  assert.match(reviewSource, /segundo y último intento autorizado[\s\S]*?una sola vez el botón \*\*Guardar\*\*/);
  assert.match(reviewSource, /No hubo un tercer guardado/);
  assert.match(reviewSource, /Producto `8271939`, checkout `B107066308U`, oferta `l23qsbj9`, precio USD 59, pago único y garantía de 7 días/);
  assert.match(reviewSource, /make_interval\(months => 1\)/);
  assert.match(reviewSource, /2023-01-31 14:30:45 \| 2023-02-28 14:30:45 \| 28 días/);
  assert.match(reviewSource, /2024-01-31 14:30:45 \| 2024-02-29 14:30:45 \| 29 días/);
  assert.match(reviewSource, /2024-02-29 14:30:45 \| 2024-03-29 14:30:45 \| 29 días/);
  assert.match(reviewSource, /cuenta Hotmart personal pendiente de migración[\s\S]*?riesgo administrativo aceptado/);
});
