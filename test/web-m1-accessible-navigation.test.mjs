import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const appSource = await readFile(new URL("../src/App.jsx", import.meta.url), "utf8");
const utilitySource = await readFile(new URL("../src/accessibility.js", import.meta.url), "utf8");
const headerSource = appSource.slice(appSource.indexOf("function Header("), appSource.indexOf("function LanguageSwitcher("));

test("el control móvil expone estado, destino y etiquetas dinámicas en ES EN PT", () => {
  assert.match(headerSource, /<button[\s\S]*?className="nav-toggle"[\s\S]*?type="button"/);
  assert.match(headerSource, /id="site-primary-navigation"/);
  assert.match(headerSource, /aria-controls="site-primary-navigation"/);
  assert.match(headerSource, /aria-expanded=\{open\}/);
  assert.match(headerSource, /aria-label=\{open \? headerCopy\.closeMenuLabel : headerCopy\.menuLabel\}/);
  for (const label of ["Abrir menú", "Cerrar menú", "Open menu", "Close menu", "Abrir menu", "Fechar menu"]) {
    assert.ok(headerSource.includes(label), `falta etiqueta ${label}`);
  }
});

test("el drawer contiene foco, responde a Escape y restaura el disparador", () => {
  assert.match(headerSource, /navRef\.current\?\.querySelector\("a\[href\]"\)/);
  assert.match(headerSource, /handleEscapeKey\(event, \(\) => setOpen\(false\)\)/);
  assert.match(headerSource, /trapTabKey\(event, headerRef\.current, toggleRef\.current\)/);
  assert.match(headerSource, /document\.addEventListener\("focusin", containFocus\)/);
  assert.match(headerSource, /visibleReturnTarget = toggleRef\.current\?\.getClientRects\(\)\.length/);
  assert.match(headerSource, /navRef\.current\?\.querySelector\("a\[href\]"\) \|\| headerRef\.current\?\.querySelector\("\.brand"\)/);
  assert.match(headerSource, /restoreFocusFromLayer\(focusLayer, visibleReturnTarget, \{ requireVisible: true \}\)/);
  assert.match(headerSource, /removeEventListener\("keydown", handleKeyDown\)/);
  assert.match(headerSource, /removeEventListener\("focusin", containFocus\)/);
});

test("el drawer inmoviliza el fondo y cierra por ruta idioma y viewport", () => {
  assert.match(headerSource, /setElementsInert\(background\)/);
  assert.match(headerSource, /lockPageScroll\(\)/);
  assert.match(headerSource, /\[language, route\]/);
  assert.match(headerSource, /matchMedia\("\(min-width: 1101px\)"\)/);
  assert.equal((headerSource.match(/onSelect=\{closeMenu\}/g) || []).length, 2);
  assert.match(headerSource, /handleRouteAction/);
  assert.match(headerSource, /focusHashTarget\(routeAction\.href, \{ updateHistory: true \}\)/);
});

test("el helper compartido evita saltos y respeta movimiento reducido", () => {
  assert.match(utilitySource, /scrollLockCount/);
  assert.match(utilitySource, /body\.style\.position = "fixed"/);
  assert.match(utilitySource, /window\.scrollTo\(\{ left: scrollX, top: scrollY, behavior: "auto" \}\)/);
  assert.match(utilitySource, /prefers-reduced-motion: reduce/);
  assert.match(utilitySource, /behavior: prefersReducedMotion\(\) \? "auto" : "smooth"/);
  assert.match(utilitySource, /target\.addEventListener\("blur"[\s\S]*?removeAttribute\("tabindex"\)/);
});
