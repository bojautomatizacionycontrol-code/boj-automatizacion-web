import { readRuntimeAppSource, readRuntimeStylesSource } from "./helpers/runtime-app-source.mjs";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const appSource = await readRuntimeAppSource();
const stylesSource = await readRuntimeStylesSource();
const offerStart = appSource.indexOf('<section className="s7-sales-section s7-sales-offer"');
const offerEnd = appSource.indexOf("<S7MethodStrip />", offerStart);
const offerSource = appSource.slice(offerStart, offerEnd);

test("la oferta acerca compra y garantía al precio antes del detalle", () => {
  const summaryIndex = offerSource.indexOf('className="s7-sales-offer-summary"');
  const productIndex = offerSource.indexOf('className="s7-sales-offer-product"', summaryIndex);
  const purchaseIndex = offerSource.indexOf('className="s7-sales-offer-purchase"', productIndex);
  const priceIndex = offerSource.indexOf('className="s7-sales-offer-price"', purchaseIndex);
  const primaryActionIndex = offerSource.indexOf('className="s7-sales-offer-primary-action"', priceIndex);
  const primaryCtaIndex = offerSource.indexOf('<PurchaseCTA source="offer"', primaryActionIndex);
  const contentIndex = offerSource.indexOf('className="s7-sales-offer-content"', priceIndex);
  const processIndex = offerSource.indexOf('className="s7-sales-offer-process"', contentIndex);
  const decisionIndex = offerSource.indexOf('className="s7-sales-offer-decision"', processIndex);
  const anchorIndex = offerSource.indexOf('className="s7-sales-offer-anchor"', decisionIndex);

  assert.ok(summaryIndex < productIndex);
  assert.ok(productIndex < purchaseIndex);
  assert.ok(purchaseIndex < priceIndex);
  assert.ok(priceIndex < primaryActionIndex);
  assert.ok(primaryActionIndex < primaryCtaIndex);
  assert.ok(primaryCtaIndex < contentIndex);
  assert.ok(contentIndex < processIndex);
  assert.ok(processIndex < decisionIndex);
  assert.ok(decisionIndex < anchorIndex);
  assert.match(offerSource, /Contenido de la oferta/);
  assert.match(offerSource, /Todo lo que recibes/);
  assert.match(offerSource, /Compra y acceso/);
  assert.match(offerSource, /Cómo funciona/);
});

test("la oferta agrupa todo el contenido vigente sin duplicarlo ni eliminarlo", () => {
  assert.match(offerSource, /<h4>Formación técnica<\/h4>[\s\S]*offerIncludes\.slice\(0, 5\)/);
  assert.match(offerSource, /<h4>App PRO incluida<\/h4>[\s\S]*offerIncludes\.slice\(5\)/);
  assert.equal(offerSource.match(/offerIncludes\.slice/g)?.length, 2);
  assert.equal(offerSource.match(/<PurchaseCTA source="offer"/g)?.length, 1);
  assert.match(offerSource, /Comprar curso \+ APP PRO/);
  assert.match(offerSource, /Probar APP durante 14 días/);
});

test("el panel usa una tarjeta principal y una lectura secundaria más plana", () => {
  const clarityStylesStart = stylesSource.indexOf("/* Curso S7: panel de oferta con jerarquía y columnas equilibradas. */");
  const clarityStylesEnd = stylesSource.indexOf('/* Botón deshabilitado del estado "preview" del checkout. */', clarityStylesStart);
  const clarityStyles = stylesSource.slice(clarityStylesStart, clarityStylesEnd);

  assert.notEqual(clarityStylesStart, -1);
  assert.notEqual(clarityStylesEnd, -1);
  assert.match(clarityStyles, /\.s7-sales-offer-panel\s*\{[\s\S]*?grid-template-columns:\s*minmax\(0, 1fr\);[\s\S]*?grid-template-areas:\s*none;[\s\S]*?background:\s*transparent;[\s\S]*?box-shadow:\s*none;/);
  assert.match(clarityStyles, /\.s7-sales-offer-panel > \.s7-sales-offer-summary,[\s\S]*?\.s7-sales-offer-panel > \.s7-sales-offer-decision\s*\{\s*grid-area:\s*auto;/);
  assert.match(clarityStyles, /\.s7-sales-offer-summary\s*\{[\s\S]*?grid-template-columns:\s*minmax\(0, 1\.08fr\) minmax\(360px, 0\.92fr\);/);
  assert.match(clarityStyles, /\.s7-sales-offer-process \.s7-sales-howto\s*\{[\s\S]*?grid-template-columns:\s*repeat\(3, minmax\(0, 1fr\)\);/);
  assert.match(clarityStyles, /@media \(max-width: 900px\)[\s\S]*?\.s7-sales-offer-summary\s*\{[\s\S]*?grid-template-columns:\s*1fr;/);
  assert.match(clarityStyles, /@media \(max-width: 760px\)[\s\S]*?\.s7-sales-offer-groups\s*\{[\s\S]*?grid-template-columns:\s*1fr;[\s\S]*?\.s7-sales-offer-process \.s7-sales-howto\s*\{[\s\S]*?grid-template-columns:\s*1fr;/);
});
