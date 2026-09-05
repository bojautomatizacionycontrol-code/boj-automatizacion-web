import { readRuntimeAppSource } from "./helpers/runtime-app-source.mjs";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { buildContentSecurityPolicy } from "../scripts/csp-policy.mjs";
import { preservedNonRuntimeAnalyticsEvents } from "../src/app/preserved-analytics-inventory.js";
import {
  commercialIdentity,
  courses,
  navItems,
  offer,
  technicalResources,
  tiaCourse,
} from "../src/content.js";
import {
  englishNavItems,
  englishTiaCourse,
  portugueseNavItems,
  portugueseTiaCourse,
} from "../src/i18n.js";
import {
  getRouteMetadata,
  indexableRoutePaths,
  publicRoutePaths,
} from "../src/route-metadata.js";

const normalizeLf = (value) => value.replaceAll("\r\n", "\n").replaceAll("\r", "\n");
const sha256 = (value) => createHash("sha256").update(normalizeLf(value)).digest("hex").toUpperCase();

async function sourceFile(path) {
  return normalizeLf(await readFile(new URL(path, import.meta.url), "utf8"));
}

async function fileHash(path) {
  return sha256(await sourceFile(path));
}

function sourceBlock(source, startMarker, endMarker) {
  const start = source.indexOf(startMarker);
  assert.notEqual(start, -1, `No se encontró el inicio: ${startMarker}`);
  const end = endMarker ? source.indexOf(endMarker, start + startMarker.length) : source.length;
  assert.notEqual(end, -1, `No se encontró el final: ${endMarker}`);
  return source.slice(start, end);
}

const [appSource, shellSource, sharedEagerSource, complianceSource, tiaSource, contentSource, routeSource, vercelSource, mainSource, packageSource, buildSource] = await Promise.all([
  readRuntimeAppSource(),
  sourceFile("../src/App.jsx"),
  sourceFile("../src/app/shared-eager.jsx"),
  sourceFile("../src/routes/compliance.jsx"),
  sourceFile("../src/routes/course-tia.jsx"),
  sourceFile("../src/content.js"),
  sourceFile("../src/route-metadata.js"),
  sourceFile("../vercel.json"),
  sourceFile("../src/main.jsx"),
  sourceFile("../package.json"),
  sourceFile("../scripts/build.mjs"),
]);
const vercelConfig = JSON.parse(vercelSource);

const protectedFileHashes = {
  "../api/contact.js": "55E987AD98E485669F6A2A415EB3508794B4D004C06E035DA7C121AA97BE7C24",
  "../COMMERCIAL_ALIGNMENT_V8_17_24.md": "7B82BEBD9C24A68C061E0DB0F5BA845476712E1703E7A5FA6D260EB53D82F8CA",
  "../src/AccessibleDialog.jsx": "2248CAAEEC74167D3714EF73E1C1495564547FDD829D7CD52B6FD8BEB567BFD8",
  "../src/accessibility.js": "59DEFB57B8006063543B5282EE57FC7A0FF215050ADCA714389E4FE62F78B892",
  "../src/i18n.js": "B17FBCE573031D949BEAEB4097BB13C666E00233609D1BD32F76E6B28FDD3FC0",
  "../src/m1-accessibility.css": "65A5411E4EFDE3DD5231779640AC34D1DB032CB622A12A0E44DD7CDA8B98DA87",
  "../src/app/preserved-analytics-inventory.js": "1EC89D5816FB33278F5A9724CF9AB909687845763DBE05581753086ACE781149",
  "../scripts/csp-policy.mjs": "696D7C2CB8A01960612C132D94D5B8266D3BB19C2108199BBB72C1042E5931D7",
  "../public/sitemap.xml": "86F382CCE4BDD71655A5DC52E902136C0E3BDF011CBD1273AEEAD0E8DFFDBEA0",
  "../public/robots.txt": "928DAC7480C646B5F7E1285CF8DC5E8A529EF5AD728F724FFB110AA6E3AB8FAB",
  "../package-lock.json": "9B6B206FDF31963376A261C207D9F11D7319DC2A00DC82582583A7F91897FCC5",
  "./contact-decision-paths.test.mjs": "A3455113BA19591BC447E39F1E29F41D8A2979B5FB2A775091DFBA4BEFA0061D",
  "./site-language-navigation.test.mjs": "42345C58E8F35826B68CDA763121859169E626CFE1DFE84A56F4EB84C4042349",
  "./web-m1-accessibility-behavior.test.mjs": "DA4F6F57CF72D2973F89525947DC415822B8DE7A51341291927FA922082D36CB",
  "./web-m1-accessible-dialog.test.mjs": "C8BE063490D2941FE0FE5CB13601933BBA02EC91A02F1F434449777F647C19FE",
  "./web-m1-accessible-navigation.test.mjs": "22B28DD4A72E694E9F7450F336B0510FD7628486B8791DC15CB7B5002A6166C0",
  "./web-m1-contact-accessibility.test.mjs": "B275449C88F3E67E5F1B21EA612F56A3B130D877A6478B958690B2000BB954BF",
  "./web-m1-protected-invariants.test.mjs": "D4E20FFEFB5553473C87C0BBF1FA06257C7153153A9E31ED6F7314A4B3DB8889",
  "./web-m1-tia-future-state.test.mjs": "75CD071DBA0F5182FF97E89D0C4A9B41254889F7732B94C031B6358FD16A1E31",
  "./web-m1-visual-accessibility.test.mjs": "1772545D1BC68F4E9D0015B40D47D8657AFBF22079FCFFB1E18F8896FAD68CA3",
};

test("archivos de backend seguridad rutas base y WEB-M1 permanecen exactos", async () => {
  for (const [path, expectedHash] of Object.entries(protectedFileHashes)) {
    assert.equal(await fileHash(path), expectedHash, path);
  }
});

test("la entrada WEB-M3 hidrata el prerender sin relajar las protecciones previas", () => {
  assert.match(mainSource, /hydrateRoot\(rootElement, tree/);
  assert.match(mainSource, /createRoot\(rootElement\)\.render\(tree\)/);
  assert.match(mainSource, /rootElement\.dataset\.bojRoute/);
  assert.match(mainSource, /loadRouteComponent\(initialRoute\)/);
  assert.match(packageSource, /"build": "node scripts\/build\.mjs"/);
  assert.equal((buildSource.match(/await viteBuild\(\{/g) || []).length, 2);
  assert.match(buildSource, /ssr: join\(rootDir, "src", "entry-server\.jsx"\)/);
  assert.match(buildSource, /await rm\(prerenderDir, \{ recursive: true, force: true \}\)/);
});

test("contenido comercial fiscal legal y de App conserva los bloques aprobados", () => {
  for (const [startMarker, endMarker, expectedHash] of [
    ["export const contact = {", "export const commercialIdentity", "61031A78D06801F4F2FACF1632193B218266204A4BD887853708123BE34845EC"],
    ["export const commercialIdentity = Object.freeze({", "export const navItems", "5A90B0CB06A2845AF190CB323A0F6DD1AEEE2B39E638755DD4701A9E7172465C"],
    ["export const tiaCourse = {", "export const appHero", "F083DAEF6B0F97123E20AA689F52F25351D5AE1FD10C14BD83C0DD01B43B46D9"],
    ["export const appHero = {", "export const technicalResources", "2E7158704F2630FDCD67924C8F6667563C4A044147182E71C2C854E2B979E8E3"],
    ["export const offer = {", "", "59CC64F553E13AEB0ECDE32AE9187F27626FC0C992CAA94056CFE0075282EB88"],
  ]) {
    assert.equal(sha256(sourceBlock(contentSource, startMarker, endMarker)), expectedHash, startMarker);
  }

  assert.equal(commercialIdentity.seller, "Hexa Group Holding SAS");
  assert.equal(commercialIdentity.owner, "Walter Adrián Boj");
  assert.equal(commercialIdentity.taxStatus, "Responsable Inscripto");
  assert.equal(
    commercialIdentity.invoicing,
    "Factura electrónica y factura E para exportaciones, según corresponda"
  );
  assert.equal(offer.course.price, "89 USD");
  assert.equal(offer.course.checkout.guaranteeDays, 7);
  assert.equal(offer.course.checkout.checkoutUrl, "https://pay.hotmart.com/P106348963R?off=srrm5ewf");
  assert.deepEqual(offer.app.proPlans.map(({ price, url }) => [price, url]), [
    ["49 USD", "https://pay.hotmart.com/C107081619V?off=yzyw7mys"],
    ["59 USD", "https://pay.hotmart.com/B107066308U?off=l23qsbj9"],
    ["89 USD", "https://pay.hotmart.com/P106348963R?off=srrm5ewf"],
    ["249 USD", "https://pay.hotmart.com/B107069067M?off=hea8bgc1"],
    ["549 USD", "https://pay.hotmart.com/Q107075095G?off=kbs1xzpq"],
  ]);
  for (const plan of offer.app.proPlans.filter(({ contract }) => contract)) {
    assert.match(plan.contract.warranty, /7 días/);
  }
});

test("technicalResources sólo admite cambiar el href oficial de WinCC", () => {
  const block = sourceBlock(contentSource, "export const technicalResources = [", "export const projects = [");
  const winccHref = /(label: "Siemens WinCC en TIA Portal",\s*href:\s*)"([^"]+)"/g;
  const matches = [...block.matchAll(winccHref)];
  assert.equal(matches.length, 1);

  const url = new URL(matches[0][2]);
  assert.equal(url.protocol, "https:");
  assert.ok(url.hostname === "siemens.com" || url.hostname.endsWith(".siemens.com"));

  const withUrlSentinel = block.replace(winccHref, '$1"__WEB_M2_WINCC_URL__"');
  assert.equal(
    sha256(withUrlSentinel),
    "4F6C8672D17470CD1D4781A56155AAC937E2C632FBBD48CA5573BE26217CC204"
  );
});

test("Analytics contacto encabezado legal y wrappers TIA conservan sus bloques", () => {
  for (const [source, startMarker, endMarker, expectedHash] of [
    [shellSource, "const ANALYTICS = {", "let analyticsBootstrapped", "EF666E0300C7D1CB178A06B96DCD41A2BA007694E0DF93DFBB335545EFC30437"],
    [sharedEagerSource, "function track(", "function whatsappUrl", "4D35DA98A35C6066A4D4C088A2EC4C64BB039FD618F1B42A04721D8C2E6B98D8"],
    [shellSource, "function initAnalytics", "function getRoute", "29ECFCDA94234F06FECD57B00FEC61FE1976498E547242EBC2C78F1AE1D6BD9A"],
    [shellSource, "function Header(", "function LanguageSwitcher(", "3B3E8AF45039AF070B64B0350D7B02A5FD13CC3998AC42E141A4DAAA99C6C147"],
    [tiaSource, "function TiaCoursePage(", "const coursePreparationCopy", "9719C62AA8D2E1AEA14C61822189459BCF403493C249D4FD251FFF43631BEFA2"],
    [tiaSource, "function EnglishTiaCoursePage(", "function PortugueseTiaCoursePage(", "882A4BA3C741D20FFB20A4FC8FED9D536A81680337C114F15428A0CB99BBA2B4"],
    [tiaSource, "function PortugueseTiaCoursePage(", "function InfoBlock", "9689C6EDE8F0C09422D32051365C9B621CB2DA824934C2A62CB0156314841B5A"],
    [complianceSource, "function EnglishContactForm(", "function EnglishContactPage(", "752F9FD389C967F59AAFB2881856345247BE9F0D7E5467B78EA5DE052A7D09C5"],
    [complianceSource, "function PortugueseContactForm(", "function PortugueseContactPage(", "CFA0269E18B56A065C901F7B531916725E827C97344F8B680BBEFDCEA1B87D5F"],
    [complianceSource, "function ContactForm(", "const legalContent", "4AA70FE49BD12F6B09B36D27C93924A8F85142E123EC7019E4D2CCD51A946637"],
    [complianceSource, "const legalContent = {", "function ContactLine(", "FBE4254312D0D77DB58F4B0428DF8192D35045CD2443B2CA0E497B6FEEB39C4D"],
  ]) {
    assert.equal(sha256(sourceBlock(source, startMarker, endMarker)), expectedHash, startMarker);
  }

  const normalizedAppSource = normalizeLf(appSource);
  const transportStart = normalizedAppSource.indexOf("async function sendContactForm");
  const transportEnd = normalizedAppSource.indexOf("\n}\n", transportStart) + 2;
  assert.ok(transportStart >= 0 && transportEnd > transportStart);
  assert.equal(
    sha256(normalizedAppSource.slice(transportStart, transportEnd)),
    "6B40DD2E08229E5EDA129227CBB6F4380682464F25DCA2452C68C65009C86D0E"
  );

  const activeEvents = [...normalizedAppSource.matchAll(/\btrack\("([^"]+)"/g)].map((match) => match[1]).sort();
  assert.equal(activeEvents.length, 18);
  assert.equal(sha256(activeEvents.join("\n")), "45ED069A8354DDE0EA38C9E85EFCE8B5A7B76E90817AEE5A0A6C01339C2ADEE6");
  const events = [...activeEvents, ...preservedNonRuntimeAnalyticsEvents].sort();
  assert.equal(events.length, 19);
  assert.equal(sha256(events.join("\n")), "06FB5CC516F2ED1E3A8D1F7EA92977B90DD3B674BA95BC17FE36277C71C28E25");
});

test("rutas schema CSP y redirects permanecen dentro del contrato vigente", () => {
  assert.equal(
    sha256(sourceBlock(contentSource, "export const contact = {", "export const commercialIdentity")),
    "61031A78D06801F4F2FACF1632193B218266204A4BD887853708123BE34845EC"
  );

  assert.equal(
    sha256(sourceBlock(routeSource, "export const publicRoutePaths = Object.freeze(", "function canonicalPath(")),
    "3E61300BEBC1D36E23DC766D23958A06DBFF9A85F8908F6CF78F1F0FA12258A4"
  );
  assert.equal(
    sha256(sourceBlock(routeSource, "const appRouteSet = new Set(", "function getNotFoundMetadata(")),
    "9B7D7830C471D1698E1BB1C8176D4D606ED59A0A212FDEBC937EA350A3B1AECA"
  );
  assert.equal(publicRoutePaths.length, 35);
  assert.equal(indexableRoutePaths.length, 34);

  const cspHeaders = (vercelConfig.headers || []).flatMap((rule) =>
    (rule.headers || [])
      .filter(({ key }) => key.toLowerCase() === "content-security-policy")
      .map(({ value }) => ({ source: rule.source, value }))
  );
  assert.deepEqual(cspHeaders, [{ source: "/(.*)", value: buildContentSecurityPolicy() }]);
  assert.equal(vercelConfig.cleanUrls, true);
  assert.equal(vercelConfig.trailingSlash, false);
  assert.deepEqual(vercelConfig.redirects, [
    { source: "/inicio", destination: "/", permanent: true },
    { source: "/contact", destination: "/contacto", permanent: true },
    {
      source: "/(.*)",
      has: [{ type: "host", value: "bojautomatizacion.com" }],
      destination: "https://www.bojautomatizacion.com/$1",
      permanent: true,
    },
  ]);
});

test("TIA permanece presente como contenido futuro pero sin oferta ni inicio", () => {
  const tiaRoutes = ["/cursos/tia-portal", "/en/courses/tia-portal", "/pt/cursos/tia-portal"];
  for (const title of [tiaCourse.title, englishTiaCourse.title, portugueseTiaCourse.title]) {
    assert.match(title, /Próximamente|Upcoming|Em preparação/);
  }
  for (const route of tiaRoutes) {
    const metadata = getRouteMetadata(route);
    assert.equal(metadata.ogType, "website");
    assert.deepEqual(metadata.jsonLd["@graph"].map((node) => node["@type"]), ["WebPage"]);
    assert.equal("checkout" in metadata, false);
    assert.equal("price" in metadata, false);
    assert.doesNotMatch(JSON.stringify(metadata), /pay\.hotmart\.com/i);
  }

  assert.match(navItems.find(({ path }) => path === "/cursos").children[1].label, /Próximamente/);
  assert.match(englishNavItems.find(({ path }) => path === "/en/courses").children[1].label, /Upcoming/);
  assert.match(portugueseNavItems.find(({ path }) => path === "/pt/cursos").children[1].label, /Em preparação/);
  assert.match(courses.find(({ id }) => id === "tia").mode, /inscripción todavía no habilitada/i);
  assert.equal(technicalResources.find(({ id }) => id === "tia-portal").status, "Recurso informativo disponible");
  assert.doesNotMatch(JSON.stringify(offer), /TIA Portal|S7-1200|S7-1500/i);
});
