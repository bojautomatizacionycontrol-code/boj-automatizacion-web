import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { offer } from "../src/content.js";

const appSource = await readFile(new URL("../src/App.jsx", import.meta.url), "utf8");

const expectedPlanUrls = new Map([
  ["Mensual", "https://pay.hotmart.com/B107066308U?off=pwoeyow0"],
  ["Profesional", "https://pay.hotmart.com/B107069067M?off=il4qpdnn"],
  ["Empresarial", "https://pay.hotmart.com/Q107075095G?off=p9gw4o5m"],
]);

test("asocia cada plan PRO con su checkout oficial", () => {
  const actualPlanUrls = new Map(offer.app.proPlans.map(({ title, url }) => [title, url]));

  assert.deepEqual(actualPlanUrls, expectedPlanUrls);
});

test("el listado de planes renderiza exclusivamente la URL propia del plan", () => {
  const listStart = appSource.indexOf("{pricingCards.map((plan) => (");
  const listEnd = appSource.indexOf('<article className="app-pro-institutional">', listStart);
  const planListSource = appSource.slice(listStart, listEnd);

  assert.notEqual(listStart, -1);
  assert.notEqual(listEnd, -1);
  assert.equal(planListSource.match(/href=\{plan\.url\}/g)?.length, 1);
  assert.doesNotMatch(planListSource, /href=\{appProductUrl\}/);
});

test("preserva Trial, Institucional y el checkout del curso", () => {
  assert.equal(offer.app.productUrl, "https://app.bojautomatizacion.com/");
  assert.equal(offer.app.trialPlan.url, "https://app.bojautomatizacion.com/");
  assert.equal(offer.course.checkout.checkoutUrl, "https://pay.hotmart.com/P106348963R");
  assert.equal(offer.course.checkout.status, "live");

  const institutionalStart = appSource.indexOf('<article className="app-pro-institutional">');
  const institutionalEnd = appSource.indexOf("</article>", institutionalStart);
  const institutionalSource = appSource.slice(institutionalStart, institutionalEnd);

  assert.notEqual(institutionalStart, -1);
  assert.notEqual(institutionalEnd, -1);
  assert.match(institutionalSource, /href=\{appProductUrl\}/);
  assert.match(institutionalSource, /Consultar condiciones/);
});
