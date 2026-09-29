import assert from "node:assert/strict";
import test from "node:test";

import { offer } from "../src/content.js";
import {
  addCampaignToHotmart,
  keepCampaignOnSite,
  readCampaign,
} from "../src/marketing-attribution.js";

const campaign = "?utm_source=LinkedIn&utm_medium=Organic&utm_campaign=curso_s7_inicio";
const checkouts = [offer.course.checkout.checkoutUrl, ...offer.app.proPlans.map((plan) => plan.url)];

test("la campaña usa únicamente tres códigos válidos y no transmite otros parámetros", () => {
  assert.deepEqual([...readCampaign(`${campaign}&email=cliente%40ejemplo.com&gclid=123`)], [
    ["utm_source", "linkedin"],
    ["utm_medium", "organic"],
    ["utm_campaign", "curso_s7_inicio"],
  ]);
  assert.equal(readCampaign("?utm_source=cliente%40ejemplo.com&utm_medium=email&utm_campaign=curso_s7"), null);
  assert.equal(readCampaign("?utm_source=linkedin&utm_medium=organic"), null);
  assert.equal(readCampaign(`${campaign}&utm_source=otra`), null);
});

test("la campaña continúa entre páginas sin perder consulta ni ancla de destino", () => {
  assert.equal(
    keepCampaignOnSite("/app?plan=pro#precios", campaign),
    "/app?plan=pro&utm_source=linkedin&utm_medium=organic&utm_campaign=curso_s7_inicio#precios",
  );
  assert.equal(keepCampaignOnSite("/app", ""), "/app");
  assert.equal(keepCampaignOnSite("/app?utm_source=otra", campaign), "/app?utm_source=otra");
});

test("las cinco ofertas conservan su ID y off; solo los enlaces de campaña añaden UTM", () => {
  for (const checkout of checkouts) {
    assert.equal(addCampaignToHotmart(checkout, ""), checkout);
    const tracked = new URL(addCampaignToHotmart(checkout, `${campaign}&email=cliente%40ejemplo.com`));
    const original = new URL(checkout);
    assert.equal(tracked.origin, original.origin);
    assert.equal(tracked.pathname, original.pathname);
    assert.equal(tracked.searchParams.get("off"), original.searchParams.get("off"));
    assert.equal(tracked.searchParams.get("utm_source"), "linkedin");
    assert.equal(tracked.searchParams.get("utm_medium"), "organic");
    assert.equal(tracked.searchParams.get("utm_campaign"), "curso_s7_inicio");
    assert.equal(tracked.searchParams.get("email"), null);
    assert.equal(tracked.searchParams.get("gclid"), null);
  }
  assert.equal(addCampaignToHotmart("https://example.com/?off=x", campaign), "https://example.com/?off=x");
});
