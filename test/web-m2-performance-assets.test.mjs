import { readRuntimeAppSource, readRuntimeStylesSource } from "./helpers/runtime-app-source.mjs";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdir, mkdtemp, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

import { renderRouteMetadataFragment, validateFingerprintAssets } from "../scripts/generate-route-html.mjs";
import {
  getRouteMetadata,
  getSocialImageFamily,
  publicRoutePaths,
  SOCIAL_IMAGE_HEIGHT,
  SOCIAL_IMAGE_TYPE,
  SOCIAL_IMAGE_WIDTH,
} from "../src/route-metadata.js";

const root = fileURLToPath(new URL("..", import.meta.url));
const appSource = await readRuntimeAppSource();
const indexSource = await readFile(join(root, "index.html"), "utf8");
const contentSource = await readFile(join(root, "src", "content.js"), "utf8");
const stylesSource = await readRuntimeStylesSource();
const vercelConfig = JSON.parse(await readFile(join(root, "vercel.json"), "utf8"));

function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

function jpegDimensions(buffer) {
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
}

const originalFallbacks = Object.freeze({
  "hero-app.jpg": "b985c4c7cdd28e5d8bfe0701cc1f5ca6717a78072fa03d530ffc4de67f4e05d4",
  "hero-contacto.jpg": "41ca7a0cb893f696a8b1ac0eebd9371a5856348a7cf1ce3e9e2af673c2771e58",
  "hero-curso-s7.jpg": "bf16aaf1961ce85734b2d04145021241aab9dcfa439e45e7338b68a6ebb1bc2b",
  "hero-curso-tia.jpg": "3fc7365da3723ec33724a0e28752ef0ac987720142464108f757e3a3f1d0933a",
  "hero-cursos.jpg": "665588074ef45641223caffa9b4bcc1df60ef5309d23c03b770bf2a0ca50fad2",
  "hero-inicio.jpg": "7b4e04519c090a9d205cd4554c4f0b81fbf8ae5656c03cbe9efe3a0ad81dfea8",
  "hero-obras.jpg": "dee354628c83460914c72cc7d9be0523568b0e8e2f3cc9cd18cdc39c587954fa",
  "hero-recursos.jpg": "95517873b983d35675352a9019041cb10d636ed52185c3e55b756d6013fed8b6",
  "hero-servicios.jpg": "a81b162d9523b78a0ffce4a444ce2c54c3dc443cc6f99e4e6b6ad100f7cb700d",
  "course-s7-400.jpg": "03d69156e7a93cd29aa4c3685b3043ffc124316ba00692c0323c2d339bfd6f3f",
  "course-tia-portal.jpg": "7f933c05bdf5b26e7965c03bcd69188a970564fcbda2c21733584c945bc502d2",
  "boj-logo-real-cropped.png": "c07e214f651bd93e2c7b316836d4a843d50eee81e310c63e643681cef9ab36e1",
  "walter-boj-avatar-field.jpeg": "0c3c32e90e5740b2c2fc72c63f2e38841615167cc506659f84afe963f85254f1",
  "boj-favicon.png": "8bd9caad436f885ee853bd8434aa6b9e6d96b5759809f2b34c3327b94d24952c",
});

test("preserva los originales y entrega el inventario responsive AVIF/WebP completo", async () => {
  for (const [name, expectedHash] of Object.entries(originalFallbacks)) {
    assert.equal(sha256(await readFile(join(root, "src", "assets", name))), expectedHash, name);
  }

  const files = (await readdir(join(root, "src", "assets", "m2"))).sort();
  assert.equal(files.length, 68);
  assert.equal(files.filter((name) => name.endsWith(".avif")).length, 33);
  assert.equal(files.filter((name) => name.endsWith(".webp")).length, 35);
  for (const file of files) assert.ok((await stat(join(root, "src", "assets", "m2", file))).size > 0, file);

  for (const stem of ["hero-app", "hero-contacto", "hero-curso-s7", "hero-curso-tia", "hero-cursos", "hero-inicio", "hero-obras", "hero-recursos", "hero-servicios"]) {
    for (const width of [640, 960, 1672]) {
      assert.ok(files.includes(`${stem}-${width}.avif`));
      assert.ok(files.includes(`${stem}-${width}.webp`));
    }
  }
  assert.match(appSource, /<picture className="m2-picture">/);
  assert.match(appSource, /type=\{`image\/\$\{format\}`\}/);
  assert.match(appSource, /srcSet=\{getM2SourceSet\(spec, format\)\}/);
  assert.match(appSource, /width=\{spec\.width\}[\s\S]*height=\{spec\.height\}[\s\S]*sizes=\{resolvedSizes\}/);
});

test("reserva aspecto, prioriza sólo el hero y difiere fondos fuera del viewport", () => {
  assert.equal((appSource.match(/fetchPriority="high"/g) || []).length, 1);
  assert.match(appSource, /className="boj-hero-bg"[\s\S]{0,180}loading="eager"[\s\S]{0,80}fetchPriority="high"/);
  assert.match(appSource, /const heroM2Spec = \(stem\) => \(\{[\s\S]{0,120}width: 1672,[\s\S]{0,60}height: 941/);
  assert.match(appSource, /\[heroInicio, heroM2Spec\("hero-inicio"\)\]/);
  assert.match(appSource, /stem: "course-s7-400"[\s\S]{0,180}sizes: "\(max-width: 760px\) 100vw, 35vw"/);
  assert.doesNotMatch(appSource, /src=\{plantVisual\} alt="" aria-hidden="true" \/>/);
  assert.ok((appSource.match(/src=\{plantVisual\} alt="" aria-hidden="true" width="800" height="531" loading="lazy" decoding="async"/g) || []).length >= 6);
  assert.match(appSource, /src=\{manualPreviewImages\[0\]\}[^>]+width="1100" height="1556" decoding="async"/);
  assert.match(appSource, /src=\{appDiagnosticoGuiado\}[\s\S]{0,140}width="1474"[\s\S]{0,80}height="588"[\s\S]{0,80}decoding="async"/);
});

test("reduce el favicon más de 80 por ciento y mantiene cada variante por debajo de 50 KB", async () => {
  const originalSize = (await stat(join(root, "src", "assets", "boj-favicon.png"))).size;
  assert.equal(originalSize, 279194);
  const names = ["favicon.svg", "favicon-16x16.png", "favicon-32x32.png", "favicon-48x48.png", "apple-touch-icon-180x180.png"];
  for (const name of names) {
    const size = (await stat(join(root, "public", name))).size;
    assert.ok(size <= 50_000, `${name}: ${size}`);
    assert.ok(1 - size / originalSize >= 0.8, `${name}: reducción insuficiente`);
  }
  assert.match(indexSource, /href="\/favicon\.svg" sizes="any"/);
  assert.match(indexSource, /href="\/favicon-32x32\.png" sizes="32x32"/);
  assert.match(indexSource, /href="\/favicon-16x16\.png" sizes="16x16"/);
  assert.match(indexSource, /href="\/apple-touch-icon-180x180\.png" sizes="180x180"/);
  assert.doesNotMatch(indexSource, /href="\/src\/assets\/boj-favicon\.png"/);
});

test("asigna seis familias OG 1200x630 y metadata social completa sin duplicados", async () => {
  assert.equal(SOCIAL_IMAGE_WIDTH, 1200);
  assert.equal(SOCIAL_IMAGE_HEIGHT, 630);
  assert.equal(SOCIAL_IMAGE_TYPE, "image/jpeg");
  const families = new Set();
  const images = new Set();
  for (const route of publicRoutePaths) {
    const metadata = getRouteMetadata(route);
    families.add(getSocialImageFamily(route));
    images.add(metadata.image);
    assert.equal(metadata.imageWidth, 1200);
    assert.equal(metadata.imageHeight, 630);
    assert.equal(metadata.imageType, "image/jpeg");
    assert.ok(metadata.imageAlt.length > 8);
    const fragment = renderRouteMetadataFragment(metadata);
    assert.equal((fragment.match(/property="og:image"/g) || []).length, 1);
    assert.equal((fragment.match(/name="twitter:image"/g) || []).length, 1);
    assert.match(fragment, /property="og:image:type" content="image\/jpeg"/);
    assert.match(fragment, /property="og:image:width" content="1200"/);
    assert.match(fragment, /property="og:image:height" content="630"/);
    assert.match(fragment, /name="twitter:image:alt"/);
  }
  assert.deepEqual([...families].sort(), ["app", "contact", "course", "institutional", "resources", "services"]);
  assert.equal(images.size, 6);
  for (const image of images) {
    const path = join(root, "public", new URL(image).pathname.slice(1));
    const buffer = await readFile(path);
    assert.deepEqual(jpegDimensions(buffer), { width: 1200, height: 630 }, path);
  }
});

test("retira Inter, conserva Geist y reemplaza sólo el enlace oficial WinCC", () => {
  assert.doesNotMatch(indexSource, /fonts\.googleapis\.com|fonts\.gstatic\.com/);
  assert.match(indexSource, /rel="preload" href="\/src\/assets\/fonts\/geist-latin\.woff2" as="font" type="font\/woff2" crossorigin/);
  assert.match(stylesSource, /@font-face\s*\{[^}]*font-family:\s*"Geist";[^}]*font-weight:\s*100 900;[^}]*font-display:\s*swap;[^}]*geist-latin\.woff2/);
  assert.doesNotMatch(indexSource, /family=Inter|Inter:wght/);
  assert.doesNotMatch(stylesSource, /["']Inter["']/);
  assert.match(contentSource, /href: "https:\/\/www\.siemens\.com\/en-us\/products\/simatic-hmi\/wincc-unified-engineering\/"/);
  assert.doesNotMatch(contentSource, /wincc-tia-portal\.html/);
});

test("aplica caché inmutable sólo a fingerprints y conserva públicos y HTML revalidables", async () => {
  const immutable = vercelConfig.headers.find((rule) => rule.headers.some((header) => header.value?.includes("immutable")));
  const revalidable = vercelConfig.headers.find((rule) => rule.headers.some((header) => header.value?.includes("must-revalidate")));
  assert.equal(immutable.source, "/assets/(.*-[A-Za-z0-9_-]{8,}\\.[A-Za-z0-9]+)");
  assert.deepEqual(immutable.headers, [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }]);
  assert.equal(revalidable.source, "/((?!assets/|api(?:/|$)).*)");
  assert.deepEqual(revalidable.headers, [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }]);
  assert.equal(await stat(join(root, "public", "assets")).then(() => true, () => false), false);

  const directory = await mkdtemp(join(tmpdir(), "boj-m2-assets-"));
  try {
    await mkdir(join(directory, "assets"));
    await writeFile(join(directory, "assets", "index-abcd1234.js"), "export {};", "utf8");
    assert.deepEqual(await validateFingerprintAssets(directory), ["index-abcd1234.js"]);
    await writeFile(join(directory, "assets", "mutable.js"), "export {};", "utf8");
    await assert.rejects(validateFingerprintAssets(directory), /sin fingerprint/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("mantiene CSP y suma sólo hardening compatible de bajo riesgo", () => {
  const global = vercelConfig.headers.find((rule) => rule.source === "/(.*)");
  const values = Object.fromEntries(global.headers.map(({ key, value }) => [key, value]));
  assert.ok(values["Content-Security-Policy"]);
  assert.equal(values["X-Content-Type-Options"], "nosniff");
  assert.equal(values["Referrer-Policy"], "strict-origin-when-cross-origin");
  assert.equal(values["Permissions-Policy"], "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()");
  assert.equal(values["Strict-Transport-Security"], "max-age=63072000; includeSubDomains; preload");
  assert.equal(global.headers.length, 5);
  assert.equal(Object.values(values).filter((value) => value.includes("immutable")).length, 0);
});
