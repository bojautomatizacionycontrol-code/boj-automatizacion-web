import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { hotmartLinks } from "../src/hotmart-links.js";
import { publicRoutePaths } from "../src/route-metadata.js";
import { readRuntimeAppSource, readRuntimeStylesSource } from "./helpers/runtime-app-source.mjs";

const [appShellSource, complianceSource, stylesSource, appSource, alignmentDocument] = await Promise.all([
  readFile(new URL("../src/App.jsx", import.meta.url), "utf8"),
  readFile(new URL("../src/routes/compliance.jsx", import.meta.url), "utf8"),
  readRuntimeStylesSource(),
  readRuntimeAppSource(),
  readFile(new URL("../COMMERCIAL_ALIGNMENT_V8_17_24.md", import.meta.url), "utf8"),
]);

const sliceBetween = (source, start, end) => {
  const from = source.indexOf(start);
  assert.notEqual(from, -1, `No se encontró el inicio: ${start}`);
  const to = source.indexOf(end, from + start.length);
  assert.notEqual(to, -1, `No se encontró el final: ${end}`);
  return source.slice(from, to);
};

const purchaseActionsSource = sliceBetween(appShellSource, "function PurchaseActions(", "function MainFooter(");

test("los destinos oficiales de Hotmart son una fuente única y no llevan parámetros sensibles", () => {
  assert.deepEqual(hotmartLinks, {
    refundRequestUrl: "https://refund.hotmart.com/",
    refundTrackingUrl: "https://refund.hotmart.com/tracking",
    subscriptionManagementUrl: "https://consumer.hotmart.com/main",
    subscriptionCancellationHelpUrl: "https://help.hotmart.com/es/article/115002183968/como-cancelar-mi-suscripcion",
    hotmartBuyerSupportUrl: "https://help.hotmart.com/es/contact-us?subject=bought-and-need-help",
  });
  assert.equal(Object.isFrozen(hotmartLinks), true);
  for (const url of Object.values(hotmartLinks)) {
    assert.match(url, /^https:\/\/[a-z.]+hotmart\.com\//);
    assert.doesNotMatch(url, /token|key|secret|session|\d{6,}\?|off=/i);
  }
  // Los componentes importan la fuente única en lugar de repetir URL literales.
  for (const source of [appShellSource, complianceSource]) {
    assert.doesNotMatch(source, /https:\/\/(refund|consumer|help)\.hotmart\.com/);
    assert.match(source, /import \{ hotmartLinks \} from "\.\.?\/(?:\.\.\/)?hotmart-links\.js";/);
  }
});

test("el shell global muestra los dos botones exactos con enlaces reales en todas las rutas", () => {
  // El pie global (y con él las gestiones de compra) se renderiza fuera del RouteOutlet, en toda ruta y en el 404.
  assert.match(appShellSource, /<\/main>\s*<Footer language=\{language\} buildYear=\{buildYear\} \/>/);
  assert.match(appShellSource, /function Footer\(\{ language, buildYear \}\) \{[\s\S]*?<PurchaseActions language=\{language\} \/>\s*<MainFooter language=\{language\} buildYear=\{buildYear\} \/>/);
  assert.ok(publicRoutePaths.length >= 38);

  assert.match(
    purchaseActionsSource,
    /<a className="purchase-action-link" href=\{hotmartLinks\.refundRequestUrl\} target="_blank" rel="noopener noreferrer">\s*BOTÓN DE ARREPENTIMIENTO\s*<\/a>/
  );
  assert.match(
    purchaseActionsSource,
    /<a className="purchase-action-link" href=\{hotmartLinks\.subscriptionManagementUrl\} target="_blank" rel="noopener noreferrer">\s*BOTÓN DE BAJA DE SERVICIO\s*<\/a>/
  );
  assert.equal((purchaseActionsSource.match(/BOTÓN DE ARREPENTIMIENTO/g) || []).length, 1);
  assert.equal((purchaseActionsSource.match(/BOTÓN DE BAJA DE SERVICIO/g) || []).length, 1);

  // Sin handlers, sin javascript:, sin mailto ni rutas internas inexistentes como destino de los botones.
  assert.doesNotMatch(purchaseActionsSource, /onClick|javascript:|<button|<form|<details|<dialog/);
  assert.doesNotMatch(purchaseActionsSource, /purchase-action-link" href=\{`mailto:/);
  assert.doesNotMatch(appSource, /href="\/arrepentimiento"|href="\/baja"|href="\/reembolso"|href="\/cancelacion"/);

  // Aclaración junto a la baja y soportes diferenciados.
  assert.match(
    appShellSource,
    /cancelNote: "Aplica a la Suscripción Mensual con renovación automática\. Las licencias de pago único vencen al finalizar su plazo y no tienen renovación automática\.",/
  );
  assert.match(purchaseActionsSource, /href=\{hotmartLinks\.refundTrackingUrl\} target="_blank" rel="noopener noreferrer">\{copy\.tracking\}/);
  assert.match(purchaseActionsSource, /href=\{hotmartLinks\.hotmartBuyerSupportUrl\} target="_blank" rel="noopener noreferrer">\{copy\.hotmartSupport\}/);
  assert.match(purchaseActionsSource, /href=\{`mailto:\$\{contact\.email\}`\}>\{copy\.bojSupport\}/);
  assert.match(appShellSource, /intro: "Las compras de BOJ S7-PLC se procesan en Hotmart y cada trámite se realiza en su plataforma\. Abrir un enlace no envía ninguna solicitud a BOJ\.",/);
  assert.doesNotMatch(purchaseActionsSource, /BOJ recibe|solicitud enviada|revoca/);
});

test("los legales enlazan solicitud, seguimiento, cancelación y soportes sin usarlos como sinónimos", () => {
  const terms = sliceBetween(complianceSource, "  terms: {", "  licenses: {");
  const licenses = sliceBetween(complianceSource, "  licenses: {", "  refunds: {");
  const refunds = sliceBetween(complianceSource, "  refunds: {", "function LegalPage(");

  // Términos.
  const subscription = sliceBetween(terms, '"Suscripción, cancelación y vigencia"', '"Licencia mensual de pago único"');
  assert.match(subscription, /producto Hotmart 8278808\) es la única oferta que se renueva automáticamente/);
  assert.match(subscription, /La cancelación se realiza desde la cuenta de comprador en Hotmart/);
  assert.match(subscription, /<HotmartLink href=\{hotmartLinks\.subscriptionManagementUrl\}>portal del comprador<\/HotmartLink>/);
  assert.match(subscription, /<HotmartLink href=\{hotmartLinks\.subscriptionCancellationHelpUrl\}>instrucciones oficiales de Hotmart<\/HotmartLink>/);
  assert.match(subscription, /no revoca de inmediato el período ya pagado/);
  assert.match(subscription, /Cancelar la renovación es un trámite distinto de solicitar un reembolso/);
  assert.match(subscription, /pagos únicos sin renovación automática/);
  const warranty = sliceBetween(terms, '"Garantía y reembolsos"', '"Idioma"');
  assert.match(warranty, /<HotmartLink href=\{hotmartLinks\.refundRequestUrl\}>portal de reembolsos de Hotmart<\/HotmartLink>/);
  assert.match(warranty, /<HotmartLink href=\{hotmartLinks\.refundTrackingUrl\}>seguimiento de reembolsos de Hotmart<\/HotmartLink>/);
  assert.match(warranty, /cancelar la renovación no equivale a solicitar un reembolso/);

  // Licencias.
  const duration = sliceBetween(licenses, '"Duración, renovación y cancelación"', '"Dispositivos y funcionamiento sin conexión"');
  assert.match(duration, /<HotmartLink href=\{hotmartLinks\.subscriptionManagementUrl\}>portal del comprador<\/HotmartLink>\) evita cobros futuros y mantiene el acceso hasta el final del período ya pagado/);
  assert.match(duration, /Es un pago único sin renovación automática/);
  assert.match(duration, /Profesional y Empresarial también vencen al finalizar su plazo y no se renuevan automáticamente/);
  const chargeback = sliceBetween(licenses, '"Reembolso o contracargo"', '"Soporte e idioma"');
  assert.match(chargeback, /el backend de BOJ recibe y valida el evento correspondiente, se revoca el acceso vinculado a esa compra/);
  assert.match(chargeback, /Abrir el portal de reembolsos o el portal del comprador no modifica por sí mismo ninguna licencia/);

  // Reembolsos.
  const cancellation = sliceBetween(refunds, '"Cancelación no es reembolso"', '"Cómo solicitarlo"');
  assert.match(cancellation, /<HotmartLink href=\{hotmartLinks\.subscriptionManagementUrl\}>portal del comprador de Hotmart<\/HotmartLink>/);
  assert.match(cancellation, /no devuelve automáticamente el pago/);
  const howTo = sliceBetween(refunds, '"Cómo solicitarlo"', '"Suscripción y Mensual"');
  assert.match(howTo, /La solicitud autónoma de reembolso se inicia en el\{" "\}\s*<HotmartLink href=\{hotmartLinks\.refundRequestUrl\}>portal de reembolsos de Hotmart<\/HotmartLink>/);
  assert.match(howTo, /<HotmartLink href=\{hotmartLinks\.refundTrackingUrl\}>seguimiento de reembolsos de Hotmart<\/HotmartLink>/);
  assert.match(howTo, /<HotmartLink href=\{hotmartLinks\.hotmartBuyerSupportUrl\}>soporte de Hotmart para compradores<\/HotmartLink>/);
  assert.match(howTo, /El soporte de BOJ \(<a href=\{`mailto:\$\{contact\.email\}`\}>\{contact\.email\}<\/a>\) brinda ayuda técnica y de acceso, pero no sustituye el trámite formal de reembolso/);
  assert.doesNotMatch(howTo, /o mediante el soporte de BOJ/);
  assert.ok(howTo.indexOf("hotmartLinks.refundRequestUrl") < howTo.indexOf("mailto:"), "el portal de reembolsos precede al correo de soporte");

  // Sin promesas no verificadas ni sinónimos.
  assert.doesNotMatch(complianceSource, /reembolso automático|aprobación automática|número de protocolo|plazo garantizado de devolución|cumplimiento (legal|jurídico) certificado/i);
  assert.match(complianceSource, /function HotmartLink\(\{ href, children \}\) \{[\s\S]*?target="_blank" rel="noopener noreferrer"/);
});

test("las gestiones de compra se ven en móvil y escritorio con foco visible", () => {
  assert.match(stylesSource, /\.purchase-actions \{[^}]*background: #f3f7fa;[^}]*color: #071421;/);
  assert.match(stylesSource, /\.purchase-action-link \{[^}]*border: 1\.5px solid #006b93;[^}]*background: #ffffff;[^}]*color: #006b93;/);
  assert.match(stylesSource, /\.purchase-action-link:hover \{[^}]*background: #006b93;[^}]*color: #ffffff;/);
  assert.match(stylesSource, /\.purchase-action-link:focus-visible,\s*\.purchase-actions-support a:focus-visible \{[^}]*outline: 3px solid #071421;/);
  assert.match(stylesSource, /@media \(max-width: 760px\) \{\s*\.purchase-actions-list \{\s*grid-template-columns: minmax\(0, 1fr\);/);
  assert.doesNotMatch(stylesSource, /\.purchase-action[a-z-]*[^{]*\{[^}]*display:\s*none/);
  assert.doesNotMatch(stylesSource, /\.purchase-action[a-z-]*[^{]*\{[^}]*visibility:\s*hidden/);
});

test("el documento de alineación registra el cierre de gestiones de compra sin certificar cumplimiento", () => {
  const start = alignmentDocument.indexOf("## Gestiones de compra en Hotmart (5 de septiembre de 2026)");
  assert.notEqual(start, -1, "falta la sección fechada de gestiones de compra");
  const section = alignmentDocument.slice(start);
  for (const productId of ["7942906", "8271939", "8273294", "8275980", "8278808"]) assert.match(section, new RegExp(productId));
  for (const url of Object.values(hotmartLinks)) assert.ok(section.includes(url), url);
  assert.match(section, /Reembolso y cancelación de renovación son trámites distintos/);
  assert.match(section, /no sustituye el trámite formal de reembolso/);
  assert.match(section, /BOJ no crea formularios/);
  assert.match(section, /revisión jurídica profesional sigue pendiente/);
  assert.doesNotMatch(alignmentDocument, /cumplimiento legal certificado/i);
});
