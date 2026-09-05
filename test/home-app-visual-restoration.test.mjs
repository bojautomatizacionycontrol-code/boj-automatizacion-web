import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { readRuntimeStylesSource } from "./helpers/runtime-app-source.mjs";

const homeSource = await readFile(new URL("../src/routes/home.jsx", import.meta.url), "utf8");
const stylesSource = await readRuntimeStylesSource();

const visualStart = homeSource.indexOf("function AppDiagnosticMockup(");
const visualEnd = homeSource.indexOf("function EnglishHomeHeroNavigator()", visualStart);
assert.ok(visualStart >= 0, "No se encontró AppDiagnosticMockup");
assert.ok(visualEnd > visualStart, "No se pudo delimitar AppDiagnosticMockup");
const visualSource = homeSource.slice(visualStart, visualEnd);

test("restaura una composición compacta con capturas vigentes en Home", () => {
  assert.match(homeSource, /import appEstadoCpuDesktop from "\.\.\/assets\/app-estado-cpu-desktop-v8-4-15\.jpg"/);
  assert.match(homeSource, /import appEstadoCpuMobile from "\.\.\/assets\/app-estado-cpu-mobile-v7-3\.png"/);
  assert.match(visualSource, /src=\{appEstadoCpuDesktop\}[\s\S]*?width="1672"[\s\S]*?height="941"/);
  assert.match(visualSource, /className="app-mobile-screen"[\s\S]*?src=\{appEstadoCpuMobile\}/);
  assert.match(visualSource, /src=\{appEstadoCpuMobile\}[\s\S]*?width="594"[\s\S]*?height="919"/);
  assert.doesNotMatch(
    visualSource,
    /appDiagnosticoGuiado|appSadDevicePreview|app-sad-device-preview|APP\.png|boj-s7-plc-real-capture/,
  );
});

test("el marco recupera la proporción histórica sin la franja negra", () => {
  assert.match(
    stylesSource,
    /\.app-product-stage\s*\{[^}]*box-sizing:\s*border-box;[^}]*width:\s*min\(100%,\s*797px\);[^}]*aspect-ratio:\s*797\s*\/\s*453;/,
  );
  assert.match(
    stylesSource,
    /\.app-desktop-screen img\s*\{[^}]*width:\s*100%;[^}]*height:\s*auto;[^}]*aspect-ratio:\s*1460\s*\/\s*675;[^}]*object-fit:\s*cover;[^}]*object-position:\s*center top;/,
  );
  assert.match(
    stylesSource,
    /\.app-desktop-frame\s*\{[^}]*position:\s*absolute;[^}]*top:\s*2%;[^}]*left:\s*0;[^}]*width:\s*87%;/,
  );
  assert.match(
    stylesSource,
    /\.app-mobile-frame\s*\{[^}]*top:\s*16%;[^}]*right:\s*5%;[^}]*width:\s*20\.7%;/,
  );
  assert.match(
    stylesSource,
    /\.app-mobile-screen\s*\{[^}]*overflow:\s*hidden;[^}]*border-radius:\s*20px;[^}]*background:\s*#0c141c;/,
  );
  assert.match(
    stylesSource,
    /\.app-mobile-screen img\s*\{[^}]*width:\s*135%;[^}]*max-width:\s*none;[^}]*height:\s*auto;[^}]*margin-left:\s*-17\.5%;[^}]*background:\s*#0c141c;/,
  );
  assert.match(
    stylesSource,
    /@media \(max-width:\s*760px\)\s*\{[\s\S]*?\.app-mobile-frame\s*\{[^}]*top:\s*10%;[^}]*right:\s*2%;[^}]*width:\s*clamp\(104px,\s*23vw,\s*124px\);/,
  );
  assert.match(
    stylesSource,
    /@media \(max-width:\s*430px\)\s*\{[\s\S]*?\.app-product-stage\s*\{[^}]*aspect-ratio:\s*797\s*\/\s*500;[\s\S]*?\.app-mobile-frame\s*\{[^}]*width:\s*96px;[^}]*top:\s*8%;[^}]*right:\s*0;/,
  );
});
