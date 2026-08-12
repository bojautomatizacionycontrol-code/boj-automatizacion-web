import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const appSource = await readFile(new URL("../src/App.jsx", import.meta.url), "utf8");
const vercelConfig = JSON.parse(await readFile(new URL("../vercel.json", import.meta.url), "utf8"));

test("/contact redirige permanentemente a la ruta canónica /contacto", () => {
  const redirect = vercelConfig.redirects.find(({ source }) => source === "/contact");

  assert.deepEqual(redirect, {
    source: "/contact",
    destination: "/contacto",
    permanent: true,
  });
});

test("Institucional enlaza al contacto sin abrir una pestaña externa", () => {
  const start = appSource.indexOf('<article className="app-pro-institutional">');
  const end = appSource.indexOf("</article>", start);
  const source = appSource.slice(start, end);

  assert.notEqual(start, -1);
  assert.notEqual(end, -1);
  assert.match(source, /href="\/contacto"/);
  assert.doesNotMatch(source, /target="_blank"/);
  assert.doesNotMatch(source, /href=\{appProductUrl\}/);
});
