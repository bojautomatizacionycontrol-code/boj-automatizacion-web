import { readRuntimeAppSource } from "./helpers/runtime-app-source.mjs";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { commercialIdentity, offer } from "../src/content.js";
import { preservedNonRuntimeAnalyticsEvents } from "../src/app/preserved-analytics-inventory.js";

const appSource = await readRuntimeAppSource();

async function fileHash(path) {
  const source = await readFile(new URL(path, import.meta.url), "utf8");
  return createHash("sha256").update(source.replaceAll("\r\n", "\n")).digest("hex").toUpperCase();
}

test("backend de contacto y alineación comercial permanecen byte a byte", async () => {
  assert.equal(await fileHash("../api/contact.js"), "55E987AD98E485669F6A2A415EB3508794B4D004C06E035DA7C121AA97BE7C24");
  assert.equal(await fileHash("../COMMERCIAL_ALIGNMENT_V8_17_24.md"), "4D4CE1C89BDB88620D88FE6B0ED1A2789C22764135DAF9009848AA779CB0AFC7");
});

test("identidad precios garantía y URLs conservan la fuente aprobada", () => {
  assert.equal(commercialIdentity.seller, "Hexa Group Holding SAS");
  assert.equal(offer.course.price, "89 USD");
  assert.equal(offer.course.checkout.checkoutUrl, "https://pay.hotmart.com/P106348963R?off=srrm5ewf");
  assert.equal(offer.course.checkout.guaranteeDays, 7);
  assert.deepEqual(offer.app.proPlans.map(({ price, url }) => [price, url]), [
    ["49 USD", "https://pay.hotmart.com/C107081619V?off=yzyw7mys"],
    ["59 USD", "https://pay.hotmart.com/B107066308U?off=l23qsbj9"],
    ["89 USD", "https://pay.hotmart.com/P106348963R?off=srrm5ewf"],
    ["249 USD", "https://pay.hotmart.com/B107069067M?off=hea8bgc1"],
    ["549 USD", "https://pay.hotmart.com/Q107075095G?off=kbs1xzpq"],
  ]);
});

test("el inventario de eventos Analytics conserva nombres y multiplicidad", () => {
  const activeEvents = [...appSource.matchAll(/\btrack\("([^"]+)"/g)].map((match) => match[1]);
  assert.equal(activeEvents.length, 18);
  const events = [...activeEvents, ...preservedNonRuntimeAnalyticsEvents].sort();
  assert.deepEqual(events, [
    "app_trial_click", "app_trial_click", "app_trial_click", "app_trial_click", "app_trial_click", "app_trial_click", "app_trial_click",
    "begin_checkout", "begin_checkout", "contact_form_submit", "contact_form_submit", "contact_form_submit", "contact_form_submit",
    "course_checkout_click", "page_view", "plan_click", "plan_click", "plan_click", "thank_you_page_view",
  ].sort());
});
