import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const appSource = await readFile(new URL("../src/routes/app.jsx", import.meta.url), "utf8");
const stylesSource = await readFile(new URL("../src/styles/pages/130-app-commercial.css", import.meta.url), "utf8");

const sourceBetween = (startMarker, endMarker) => {
  const start = appSource.indexOf(startMarker);
  const end = appSource.indexOf(endMarker, start);
  assert.notEqual(start, -1, `No se encontró el inicio: ${startMarker}`);
  assert.notEqual(end, -1, `No se encontró el final: ${endMarker}`);
  return appSource.slice(start, end);
};

const sha256 = (buffer) => createHash("sha256").update(buffer).digest("hex");

const jpegDimensions = (buffer) => {
  assert.equal(buffer.readUInt16BE(0), 0xffd8, "JPEG inválido");
  let offset = 2;

  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const marker = buffer[offset + 1];
    if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
      return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
    }

    if (marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7)) {
      offset += 2;
      continue;
    }

    const length = buffer.readUInt16BE(offset + 2);
    assert.ok(length >= 2, "Segmento JPEG inválido");
    offset += length + 2;
  }

  throw new Error("No se encontraron dimensiones JPEG");
};

const galleryAssets = [
  {
    name: "app-seleccion-sintoma-v8-17-24.jpg",
    width: 1000,
    height: 455,
    bytes: 78842,
    hash: "429002eec633daf39ad6021ae20e2557513ed9a8b30c51ef14b95978ee8832e3",
  },
  {
    name: "app-verificacion-guiada-v8-17-24.jpg",
    width: 1460,
    height: 675,
    bytes: 91007,
    hash: "52257773d6f5b37f3205c56d33d5f1be8b55e46ba99c4d840dbf1e605933fa96",
  },
  {
    name: "app-registro-intervencion-v8-17-24.jpg",
    width: 1000,
    height: 390,
    bytes: 24489,
    hash: "35902d16f510a5b8a33e4eae2f8cf72837ee5ee4b6dee066b59d4e3a0b8cb669",
  },
];

test("protege las tres capturas reales vigentes y su presupuesto", async () => {
  let totalBytes = 0;

  for (const expected of galleryAssets) {
    const url = new URL(`../src/assets/${expected.name}`, import.meta.url);
    const buffer = await readFile(url);
    const details = await stat(url);

    assert.deepEqual(jpegDimensions(buffer), { width: expected.width, height: expected.height }, expected.name);
    assert.equal(details.size, expected.bytes, expected.name);
    assert.equal(sha256(buffer), expected.hash, expected.name);
    assert.ok(details.size <= 100000, `${expected.name} supera 100 kB`);
    totalBytes += details.size;
  }

  assert.ok(totalBytes <= 200000, `La galería supera 200 kB: ${totalBytes}`);
});

test("la galería usa ids estables y localiza el copy sin depender de índices", () => {
  const dataSource = sourceBetween("const appRealViews = [", "const appTrialPlan =");
  const ids = [...dataSource.matchAll(/id: "([^"]+)"/g)].map((match) => match[1]);

  assert.deepEqual(ids.slice(0, 3), ["symptom-entry", "guided-verification", "intervention-record"]);
  assert.equal(new Set(ids.slice(0, 3)).size, 3);
  assert.match(dataSource, /appRealViewCopyByLanguage\[language\]\[item\.id\]/);
  assert.match(dataSource, /localizeAppRealViews\("en"\)/);
  assert.match(dataSource, /localizeAppRealViews\("pt"\)/);
  assert.doesNotMatch(appSource, /englishApp\.views\.map|portugueseApp\.views\.map/);
});

test("muestra una sola imagen activa y tres selectores accesibles", () => {
  const gallerySource = sourceBetween("function AppRealViewGallery(", "function AppRealViewDialogNavigation(");

  assert.equal((gallerySource.match(/<img/g) || []).length, 1);
  assert.match(gallerySource, /const \[activeId, setActiveId\] = useState/);
  assert.match(gallerySource, /src=\{activeView\.image\}/);
  assert.match(gallerySource, /width=\{activeView\.width\}/);
  assert.match(gallerySource, /height=\{activeView\.height\}/);
  assert.match(gallerySource, /loading="lazy"/);
  assert.match(gallerySource, /decoding="async"/);
  assert.match(gallerySource, /onClick=\{\(\) => onOpen\(activeView\)\}/);
  assert.match(gallerySource, /aria-controls=\{viewerId\}/);
  assert.match(gallerySource, /aria-pressed=\{item\.id === activeView\.id\}/);
  assert.match(gallerySource, /onClick=\{\(\) => setActiveId\(item\.id\)\}/);
  assert.equal((appSource.match(/<AppRealViewGallery/g) || []).length, 3);
});

test("conserva un diálogo por idioma y permite recorrer las tres capturas", () => {
  const navigationSource = sourceBetween("function AppRealViewDialogNavigation(", "function AppPage()");

  assert.equal((appSource.match(/<AccessibleDialog/g) || []).length, 3);
  assert.equal((appSource.match(/<AppRealViewDialogNavigation/g) || []).length, 3);
  assert.doesNotMatch(sourceBetween("function AppRealViewGallery(", "function AppRealViewDialogNavigation("), /AccessibleDialog|createPortal/);
  assert.match(navigationSource, /selectOffset\(-1\)/);
  assert.match(navigationSource, /selectOffset\(1\)/);
  assert.match(navigationSource, /aria-live="polite"/);
});

test("protege foco, tamaño táctil, contain y contraste del visor ampliado", () => {
  assert.match(stylesSource, /\.app-pro-page \.app-pro-real-viewer-frame img\s*\{[\s\S]*?object-fit:\s*contain;/);
  assert.match(stylesSource, /\.app-pro-page \.app-pro-real-selector button:focus-visible/);
  assert.match(stylesSource, /\.app-pro-lightbox-navigation button\s*\{[\s\S]*?width:\s*44px;[\s\S]*?height:\s*44px;/);
  assert.match(stylesSource, /\.app-pro-lightbox-copy\s*\{[\s\S]*?background:[\s\S]*?#06101a[\s\S]*?color:\s*#ffffff;/);
  assert.match(stylesSource, /@media \(max-width: 760px\)[\s\S]*?\.app-pro-page \.app-pro-real-selector button\s*\{[\s\S]*?min-height:\s*76px;/);
});
