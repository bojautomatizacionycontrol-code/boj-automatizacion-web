import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const appSource = await readFile(new URL("../src/App.jsx", import.meta.url), "utf8");
const dialogSource = await readFile(new URL("../src/AccessibleDialog.jsx", import.meta.url), "utf8");
const utilitySource = await readFile(new URL("../src/accessibility.js", import.meta.url), "utf8");
const flipbookSource = appSource.slice(appSource.indexOf("function ManualFlipbook("), appSource.indexOf("const s7TestimonialsCopy"));

test("lightboxes y visor reutilizan una única primitiva con portal y nombre", () => {
  assert.equal((appSource.match(/<AccessibleDialog/g) || []).length, 4);
  assert.doesNotMatch(appSource, /createPortal|role="dialog"/);
  assert.match(dialogSource, /createPortal\(/);
  assert.match(dialogSource, /role="dialog"/);
  assert.match(dialogSource, /aria-modal="true"/);
  assert.match(dialogSource, /aria-labelledby=\{labelledBy\}/);
  assert.match(dialogSource, /aria-label=\{labelledBy \? undefined : ariaLabel\}/);
});

test("la primitiva implementa foco inicial trap Escape retorno inert y cleanup", () => {
  assert.match(dialogSource, /data-dialog-initial-focus/);
  assert.match(dialogSource, /handleEscapeKey\(event, \(\) => onCloseRef\.current\?\.\(\)\)/);
  assert.match(dialogSource, /trapTabKey\(event, dialogRef\.current, dialogRef\.current\)/);
  assert.match(dialogSource, /setElementsInert\(\[document\.getElementById\("root"\)\]\)/);
  assert.match(dialogSource, /lockPageScroll\(\)/);
  assert.match(dialogSource, /restoreFocusFromLayer\(focusLayer, returnFocusRef\.current\)/);
  assert.match(dialogSource, /removeEventListener\("keydown", handleKeyDown\)/);
  assert.match(dialogSource, /removeEventListener\("focusin", containFocus\)/);
  assert.match(utilitySource, /const inertState = new WeakMap\(\)/);
  assert.match(utilitySource, /createFocusLayer/);
});

test("las flechas del manual sólo se procesan dentro del diálogo abierto", () => {
  assert.doesNotMatch(flipbookSource, /window\.addEventListener\("keydown"/);
  assert.match(flipbookSource, /onDialogKeyDown=\{handleDialogKeyDown\}/);
  assert.match(flipbookSource, /event\.key === "ArrowLeft"/);
  assert.match(flipbookSource, /event\.key === "ArrowRight"/);
  assert.match(flipbookSource, /ariaLabel=\{`\$\{copy\.enlarge\}: \$\{caption\}`\}/);
});
