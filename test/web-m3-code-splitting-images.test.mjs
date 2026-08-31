import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const appSource = await readFile(new URL("../src/App.jsx", import.meta.url), "utf8");
const flipbookSource = await readFile(new URL("../src/ManualFlipbook.jsx", import.meta.url), "utf8");
const deferredDialogSource = await readFile(new URL("../src/DeferredAccessibleDialog.jsx", import.meta.url), "utf8");
const technicalRoutesSource = await readFile(new URL("../src/TechnicalRoutes.jsx", import.meta.url), "utf8");
const manualFallbackSource = appSource.slice(
  appSource.indexOf("function ManualFlipbookFallback("),
  appSource.indexOf("function DeferredManualFlipbook("),
);
const deferredManualSource = appSource.slice(
  appSource.indexOf("function DeferredManualFlipbook("),
  appSource.indexOf("const technicalRoutePrimitives"),
);

async function readJpegDimensions(url) {
  const image = await readFile(url);
  assert.equal(image.readUInt16BE(0), 0xffd8, `${url.pathname} no es JPEG`);

  const startOfFrameMarkers = new Set([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf]);
  let offset = 2;
  while (offset < image.length) {
    if (image[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    while (image[offset] === 0xff) offset += 1;
    const marker = image[offset];
    offset += 1;
    if (marker === 0xd8 || marker === 0x01) continue;
    if (marker === 0xd9 || marker === 0xda) break;
    const segmentLength = image.readUInt16BE(offset);
    if (startOfFrameMarkers.has(marker)) {
      return {
        width: image.readUInt16BE(offset + 5),
        height: image.readUInt16BE(offset + 3),
      };
    }
    offset += segmentLength;
  }

  throw new Error(`No se encontró SOF en ${url.pathname}`);
}

test("ManualFlipbook y los diálogos se cargan fuera del bundle crítico", () => {
  assert.match(appSource, /lazy\(\(\) => import\("\.\/ManualFlipbook\.jsx"\)\)/);
  assert.match(deferredManualSource, /<Suspense fallback=\{<ManualFlipbookFallback \{\.\.\.props\} \/>\}>/);
  assert.doesNotMatch(appSource, /function ManualFlipbook\(/);
  assert.match(appSource, /from "\.\/DeferredAccessibleDialog\.jsx"/);
  assert.match(deferredDialogSource, /lazy\(\(\) => import\("\.\/AccessibleDialog\.jsx"\)\)/);
  assert.match(deferredDialogSource, /if \(!open\) return null/);
});

test("el flipbook no solicita imágenes ni su chunk antes de entrar al viewport", () => {
  assert.match(manualFallbackSource, /data-deferred-manual-flipbook=""/);
  assert.match(manualFallbackSource, /className="s7-flip-stage"/);
  assert.match(manualFallbackSource, /className="s7-flip-page"/);
  assert.doesNotMatch(manualFallbackSource, /<img\b|\bsrc=/);

  assert.match(deferredManualSource, /const placeholderRef = useRef\(null\)/);
  assert.match(deferredManualSource, /const \[shouldLoad, setShouldLoad\] = useState\(false\)/);
  assert.match(deferredManualSource, /if \(!\("IntersectionObserver" in window\)\) \{[\s\S]*?setShouldLoad\(true\)/);
  assert.match(deferredManualSource, /new window\.IntersectionObserver/);
  assert.match(deferredManualSource, /entry\.isIntersecting && entry\.intersectionRatio > 0/);
  assert.match(deferredManualSource, /rootMargin: "0px", threshold: 0/);
  assert.match(deferredManualSource, /observer\.observe\(placeholder\)/);
  assert.match(deferredManualSource, /return \(\) => observer\.disconnect\(\)/);
  assert.match(deferredManualSource, /if \(!shouldLoad\) \{[\s\S]*?observerRef=\{placeholderRef\}/);
});

test("la biblioteca técnica se separa como grupo de rutas coherente", () => {
  assert.match(appSource, /lazy\(\(\) => import\("\.\/TechnicalRoutes\.jsx"\)\)/);
  assert.match(appSource, /route === "\/recursos-tecnicos" \|\| route\.startsWith\("\/recursos-tecnicos\/"\)/);
  assert.match(appSource, /<LazyTechnicalRoutes route=\{route\} primitives=\{technicalRoutePrimitives\} \/>/);
  assert.match(appSource, /heroImage: heroRecursos,[\s\S]*?heroPrimary:[\s\S]*?heroSecondary:/);
  assert.doesNotMatch(technicalRoutesSource, /from "\.\/App\.jsx"/);
  assert.match(technicalRoutesSource, /route === "\/recursos-tecnicos"/);
  assert.match(technicalRoutesSource, /<TechnicalArticlePage route=\{route\} primitives=\{primitives\} \/>/);
});

test("cada imagen interna del flipbook declara sus dimensiones intrínsecas", () => {
  const imageTags = flipbookSource.match(/<img[\s\S]*?\/>/g) || [];
  assert.equal(imageTags.length, 3);
  for (const tag of imageTags) {
    assert.match(tag, /width=\{[^}]+\}/);
    assert.match(tag, /height=\{[^}]+\}/);
  }
  assert.match(appSource, /manualPreviewDimensions = manualPreviewImages\.map\(\(\) => \(\{ width: 1100, height: 1556 \}\)\)/);
  assert.match(appSource, /image: appDiagnosticoGuiado, width: 1474, height: 588/);
});

test("los valores declarados coinciden con los píxeles físicos de los JPEG", async () => {
  const manualFiles = Array.from({ length: 8 }, (_, index) =>
    new URL(`../src/assets/manual-preview/manual-${String(index + 1).padStart(2, "0")}.jpg`, import.meta.url));
  for (const file of manualFiles) {
    assert.deepEqual(await readJpegDimensions(file), { width: 1100, height: 1556 });
  }

  assert.deepEqual(
    await readJpegDimensions(new URL("../src/assets/app-diagnostico-guiado.jpg", import.meta.url)),
    { width: 1474, height: 588 },
  );

  const homeProjectFiles = [
    "Generador industrial — para Generador WEG BT40.jpg",
    "Sistema contra incendios industrial — bombas, cañerías, válvulas.jpg",
    "Evaporador  equipo de proceso — para Evaporador CALSA.jpg",
  ];
  for (const file of homeProjectFiles) {
    assert.deepEqual(
      await readJpegDimensions(new URL(`../src/assets/services-works/${file}`, import.meta.url)),
      { width: 1280, height: 960 },
    );
  }

  const homeProjectsSource = appSource.slice(
    appSource.indexOf("function HomeObrasTeaser()"),
    appSource.indexOf("function AppDiagnosticMockup", appSource.indexOf("function HomeObrasTeaser()")),
  );
  assert.match(homeProjectsSource, /const featured = projects\.slice\(0, 3\)/);
  assert.match(homeProjectsSource, /width="1280"[\s\S]*?height="960"[\s\S]*?loading="lazy"[\s\S]*?decoding="async"/);
});
