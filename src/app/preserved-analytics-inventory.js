// WEB-M1 counted one event inside LandingContactForm even though HomePage had
// already stopped rendering that legacy form. WEB-M3 removes the unreachable
// JSX from the runtime graph but preserves its audited Analytics contract here.
export const preservedNonRuntimeAnalyticsEvents = Object.freeze([
  "contact_form_submit",
]);
