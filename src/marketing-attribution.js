const CAMPAIGN_KEYS = ["utm_source", "utm_medium", "utm_campaign"];
const CAMPAIGN_VALUE = /^[a-z][a-z0-9_-]{0,47}$/i;

// Solo códigos de campaña, nunca correos, identificadores de usuario ni la URL de origen.
export function readCampaign(search) {
  const incoming = new URLSearchParams(search);
  const campaign = new URLSearchParams();

  for (const key of CAMPAIGN_KEYS) {
    const values = incoming.getAll(key);
    if (values.length !== 1 || !CAMPAIGN_VALUE.test(values[0])) return null;
    campaign.set(key, values[0].toLowerCase());
  }

  return campaign;
}

export function keepCampaignOnSite(to, currentSearch) {
  const campaign = readCampaign(currentSearch);
  if (!campaign) return to;

  const destination = new URL(to, "https://www.bojautomatizacion.com");
  if (CAMPAIGN_KEYS.some((key) => destination.searchParams.has(key))) return to;
  for (const [key, value] of campaign) destination.searchParams.set(key, value);
  return `${destination.pathname}${destination.search}${destination.hash}`;
}

export function addCampaignToHotmart(checkoutUrl, currentSearch) {
  const campaign = readCampaign(currentSearch);
  if (!campaign) return checkoutUrl;

  let checkout;
  try {
    checkout = new URL(checkoutUrl);
  } catch {
    return checkoutUrl;
  }
  if (checkout.protocol !== "https:" || checkout.hostname !== "pay.hotmart.com") return checkoutUrl;
  for (const [key, value] of campaign) checkout.searchParams.set(key, value);
  return checkout.toString();
}
