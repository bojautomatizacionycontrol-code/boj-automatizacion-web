import { commercialIdentity, contact, offer } from "./content.js";
import { languageRoutePairs } from "./i18n.js";

export const SITE_ORIGIN = "https://www.bojautomatizacion.com";

const homeMetadata = Object.freeze({
  title: "BOJ Automatización y Control | PLC Siemens, diagnóstico y mantenimiento industrial",
  description:
    "Automatización industrial en Tucumán y Argentina: PLC Siemens, diagnóstico de fallas, PROFIBUS, PROFINET, TIA Portal, cursos técnicos y app para mantenimiento industrial.",
});

export const routeMetadata = Object.freeze({
  "/": homeMetadata,
  "/inicio": homeMetadata,
  "/servicios": {
    title: "Servicios de automatización industrial y diagnóstico | BOJ",
    description:
      "Servicios técnicos para planta: PLC Siemens, diagnóstico de fallas, redes PROFIBUS/PROFINET, migraciones, instrumentación, tableros y puesta en marcha en Argentina.",
  },
  "/cursos": {
    title: "Cursos técnicos PLC Siemens y TIA Portal | BOJ",
    description:
      "Cursos técnicos aplicados de diagnóstico en PLC Siemens S7-300/400, STEP 7 Classic y TIA Portal para mantenimiento industrial en Argentina.",
  },
  "/cursos/s7-300-400": {
    title: "Curso diagnóstico industrial PLC Siemens S7-300/400 | BOJ",
    description:
      "Curso aplicado de diagnóstico industrial en PLC Siemens S7-300/400 con STEP 7 Classic, Diagnostic Buffer, HW Config Online, PROFIBUS y fallas reales de planta.",
  },
  "/cursos/tia-portal": {
    title: "Curso TIA Portal S7-1200/1500 | BOJ",
    description:
      "Curso introductorio de TIA Portal para PLC Siemens S7-1200/1500: hardware, variables, LAD, carga, monitoreo online y diagnóstico básico.",
  },
  "/app": {
    title: "BOJ S7-PLC PRO | App de diagnóstico PLC Siemens S7-300/400",
    description:
      "BOJ S7-PLC PRO es una herramienta web de asistencia técnica para diagnóstico orientativo en PLC Siemens S7-300/400, con una prueba inicial de 48 horas y licencias PRO.",
  },
  "/recursos-tecnicos": {
    title: "Recursos técnicos Siemens | STEP 7, TIA Portal, MicroWIN y WinCC | BOJ",
    description:
      "Biblioteca técnica sobre STEP 7 SIMATIC Manager, TIA Portal, MicroWIN, LOGO Soft Comfort, WinCC, PLC Siemens, PROFIBUS, PROFINET y mantenimiento industrial.",
  },
  "/recursos-tecnicos/simatic-manager": {
    title: "STEP 7 SIMATIC Manager | PLC Siemens S7-300/400 | BOJ",
    description:
      "Recurso técnico sobre STEP 7 SIMATIC Manager para PLC Siemens S7-300 y S7-400: hardware, Diagnostic Buffer, PROFIBUS, diagnóstico online y mantenimiento industrial.",
  },
  "/recursos-tecnicos/tia-portal": {
    title: "STEP 7 TIA Portal | PLC Siemens S7-1200/1500 | BOJ",
    description:
      "Recurso técnico sobre TIA Portal para PLC Siemens S7-1200/1500, HMI WinCC, PROFINET, drives, diagnóstico online, puesta en marcha y mantenimiento industrial.",
  },
  "/recursos-tecnicos/microwin": {
    title: "STEP 7 MicroWIN | PLC Siemens S7-200 | BOJ",
    description:
      "Recurso técnico sobre STEP 7 MicroWIN para PLC Siemens S7-200, máquinas compactas, automatismos simples y mantenimiento de equipos legacy.",
  },
  "/recursos-tecnicos/logo-soft-comfort": {
    title: "LOGO! Soft Comfort | Relés inteligentes Siemens LOGO | BOJ",
    description:
      "Recurso técnico sobre LOGO! Soft Comfort para relés inteligentes Siemens LOGO, bombeo, iluminación, automatismos simples y control horario.",
  },
  "/recursos-tecnicos/wincc": {
    title: "SIMATIC WinCC | HMI SCADA Siemens | BOJ",
    description:
      "Recurso técnico sobre SIMATIC WinCC, HMI, SCADA, alarmas, tendencias, operación de procesos, visualización de variables y mantenimiento industrial.",
  },
  "/obras": {
    title: "Obras y trabajos realizados | BOJ Automatización",
    description:
      "Casos reales de automatización industrial, ingeniería, PLC Siemens, HMI, SCADA, tableros, migraciones, instrumentación y puesta en marcha.",
  },
  "/contacto": {
    title: "Contacto técnico | BOJ Automatización y Control",
    description:
      "Contacto técnico en Ciudad Autónoma de Buenos Aires, Argentina, para automatización industrial, diagnóstico de fallas, cursos PLC Siemens, TIA Portal y PROFIBUS.",
  },
  "/privacidad": {
    title: "Política de privacidad | BOJ Automatización y Control",
    description: "Información sobre datos personales, formularios, analítica y derechos de privacidad en el sitio de BOJ.",
  },
  "/terminos": {
    title: "Términos y condiciones | BOJ Automatización y Control",
    description: "Condiciones generales de uso del sitio, contratación de servicios y acceso a productos digitales BOJ.",
  },
  "/licencias": {
    title: "Condiciones de licencia | BOJ S7-PLC PRO",
    description: "Condiciones de acceso y uso de BOJ S7-PLC PRO y de las licencias incluidas con cursos y planes.",
  },
  "/reembolsos": {
    title: "Política de reembolsos | BOJ Automatización y Control",
    description: "Condiciones de garantía y reembolso aplicables a cursos y productos digitales comercializados por Hotmart.",
  },
  "/gracias": {
    title: "Procesando tu operación | BOJ Automatización y Control",
    description: "Estado de tu operación: acceso al material y activación de BOJ S7-PLC PRO.",
  },
  "/en": {
    title: "BOJ Automation and Control | Siemens PLC diagnostics and engineering",
    description:
      "Industrial automation, Siemens PLC troubleshooting, technical training and BOJ S7-PLC diagnostic support for maintenance teams.",
  },
  "/en/services": {
    title: "Industrial automation and diagnostics services | BOJ",
    description:
      "Technical services for Siemens PLCs, HMI, SCADA, PROFIBUS, PROFINET, migrations, instrumentation and industrial commissioning.",
  },
  "/en/courses": {
    title: "Siemens PLC technical training | BOJ",
    description:
      "Applied online training for industrial diagnostics with Siemens S7-300/400, STEP 7 Classic and TIA Portal.",
  },
  "/en/courses/s7-300-400": {
    title: "Siemens S7-300/400 industrial diagnostics course | BOJ",
    description:
      "Applied Siemens S7-300/400 diagnostics course with STEP 7 Classic, Diagnostic Buffer, HW Config Online, PROFIBUS and field cases.",
  },
  "/en/courses/tia-portal": {
    title: "TIA Portal S7-1200/1500 course | BOJ",
    description:
      "Upcoming introductory TIA Portal training for Siemens S7-1200/1500 PLC systems, online diagnostics and industrial maintenance.",
  },
  "/en/app": {
    title: "BOJ S7-PLC PRO | Siemens S7-300/400 diagnostics app",
    description:
      "Guided first-line diagnostic support for Siemens S7-300/400 systems, with prioritized technical hypotheses and field verification steps.",
  },
  "/en/projects": {
    title: "Industrial automation projects | BOJ",
    description:
      "Selected industrial engineering, Siemens PLC, HMI, SCADA, migration and commissioning projects completed by BOJ.",
  },
  "/en/contact": {
    title: "Technical contact | BOJ Automation and Control",
    description:
      "Contact BOJ for industrial diagnostics, Siemens PLC automation, technical training and BOJ S7-PLC licensing.",
  },
  "/pt": {
    title: "BOJ Automação e Controle | Diagnóstico e engenharia de PLC Siemens",
    description:
      "Automação industrial, diagnóstico de falhas em PLC Siemens, formação técnica e suporte BOJ S7-PLC para equipes de manutenção.",
  },
  "/pt/servicos": {
    title: "Serviços de automação e diagnóstico industrial | BOJ",
    description:
      "Serviços técnicos para PLC Siemens, IHM, SCADA, PROFIBUS, PROFINET, migrações, instrumentação e comissionamento industrial.",
  },
  "/pt/cursos": {
    title: "Cursos técnicos de PLC Siemens | BOJ",
    description:
      "Formação online aplicada em diagnóstico industrial com Siemens S7-300/400, STEP 7 Classic e TIA Portal.",
  },
  "/pt/cursos/s7-300-400": {
    title: "Curso de diagnóstico industrial Siemens S7-300/400 | BOJ",
    description:
      "Curso aplicado de diagnóstico Siemens S7-300/400 com STEP 7 Classic, Diagnostic Buffer, HW Config Online, PROFIBUS e casos de campo. Conteúdo em espanhol.",
  },
  "/pt/cursos/tia-portal": {
    title: "Curso TIA Portal S7-1200/1500 | BOJ",
    description:
      "Próximo curso introdutório de TIA Portal para PLC Siemens S7-1200/1500, diagnóstico online e manutenção industrial.",
  },
  "/pt/app": {
    title: "BOJ S7-PLC PRO | App de diagnóstico Siemens S7-300/400",
    description:
      "Suporte guiado de primeira linha para diagnosticar sistemas Siemens S7-300/400, com hipóteses técnicas priorizadas e verificações em campo.",
  },
  "/pt/projetos": {
    title: "Projetos de automação industrial | BOJ",
    description:
      "Projetos selecionados de engenharia industrial, PLC Siemens, IHM, SCADA, migração e comissionamento realizados pela BOJ.",
  },
  "/pt/contato": {
    title: "Contato técnico | BOJ Automação e Controle",
    description:
      "Entre em contato com a BOJ para diagnóstico industrial, automação com PLC Siemens, formação técnica e licenças BOJ S7-PLC.",
  },
});

export const publicRoutePaths = Object.freeze(
  Object.keys(routeMetadata).filter((route) => route !== "/inicio")
);

export const indexableRoutePaths = Object.freeze(
  publicRoutePaths.filter((route) => route !== "/gracias")
);

const indexableRouteSet = new Set(indexableRoutePaths);
const appRouteSet = new Set(["/app", "/en/app", "/pt/app"]);
const s7CourseRouteSet = new Set([
  "/cursos/s7-300-400",
  "/en/courses/s7-300-400",
  "/pt/cursos/s7-300-400",
]);
function canonicalPath(route) {
  return route === "/inicio" ? "/" : route;
}

function absoluteUrl(route) {
  return `${SITE_ORIGIN}${route === "/" ? "/" : route}`;
}

export function getRouteLanguage(route) {
  if (route === "/en" || route.startsWith("/en/")) return "en";
  if (route === "/pt" || route.startsWith("/pt/")) return "pt";
  return "es";
}

export function getLocalizedPath(route, language) {
  if (route === "/inicio" && language === "es") return "/";
  const normalizedLanguage = language === "pt-BR" ? "pt" : language;
  const pair = languageRoutePairs.find((item) => Object.values(item).includes(route));
  if (pair) return pair[normalizedLanguage];
  return normalizedLanguage === "es" ? "/" : `/${normalizedLanguage}`;
}

export function getRouteAlternates(route) {
  const pair = languageRoutePairs.find((item) => Object.values(item).includes(route));
  if (!pair) return [];
  return [
    { hreflang: "es", href: absoluteUrl(pair.es === "/inicio" ? "/" : pair.es) },
    { hreflang: "en", href: absoluteUrl(pair.en) },
    { hreflang: "pt-BR", href: absoluteUrl(pair.pt) },
    { hreflang: "x-default", href: absoluteUrl(pair.es === "/inicio" ? "/" : pair.es) },
  ];
}

function sellerNode() {
  return {
    "@type": "Organization",
    "@id": `${SITE_ORIGIN}/#seller`,
    name: commercialIdentity.seller,
    legalName: commercialIdentity.seller,
    email: commercialIdentity.institutionalEmail,
    telephone: "+543815327469",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Culpina 63, piso 5°, departamento C",
      addressLocality: "Ciudad Autónoma de Buenos Aires",
      addressRegion: "Ciudad Autónoma de Buenos Aires",
      addressCountry: "AR",
    },
    description: `${commercialIdentity.seller} es vendedor y facturador.`,
  };
}

function ownerNode() {
  return {
    "@type": "Person",
    "@id": `${SITE_ORIGIN}/#owner`,
    name: commercialIdentity.owner,
    description: `${commercialIdentity.owner} es titular de ${commercialIdentity.ownedBrands}.`,
    sameAs: [contact.linkedin],
  };
}

function brandNode() {
  return {
    "@type": "Brand",
    "@id": `${SITE_ORIGIN}/#brand`,
    name: contact.brand,
    url: `${SITE_ORIGIN}/`,
    sameAs: [contact.linktree],
  };
}

function webPageNode(metadata) {
  return {
    "@type": "WebPage",
    "@id": `${metadata.canonical}#webpage`,
    url: metadata.canonical,
    name: metadata.title,
    description: metadata.description,
    inLanguage: metadata.lang,
    isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
  };
}

export function getRouteJsonLd(route, metadata) {
  if (!metadata.indexable) return null;

  const graph = [];
  if (route === "/") {
    graph.push(sellerNode());
    graph.push(ownerNode());
    graph.push(brandNode());
    graph.push({
      "@type": "WebSite",
      "@id": `${SITE_ORIGIN}/#website`,
      url: `${SITE_ORIGIN}/`,
      name: contact.brand,
      inLanguage: ["es", "en", "pt-BR"],
    });
  }

  graph.push(webPageNode(metadata));

  if (appRouteSet.has(route)) {
    graph.push({
      "@type": ["SoftwareApplication", "Product"],
      "@id": `${metadata.canonical}#software`,
      name: "BOJ S7-PLC PRO",
      url: metadata.canonical,
      description: metadata.description,
      inLanguage: metadata.lang,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web browser",
      brand: { "@type": "Brand", name: "BOJ S7-PLC" },
      creator: { "@id": `${SITE_ORIGIN}/#owner` },
    });
  }

  if (s7CourseRouteSet.has(route)) {
    graph.push({
      "@type": "Course",
      "@id": `${metadata.canonical}#course`,
      name: metadata.title,
      url: metadata.canonical,
      description: metadata.description,
      inLanguage: "es",
      provider: { "@id": `${SITE_ORIGIN}/#owner` },
      hasCourseInstance: {
        "@type": "CourseInstance",
        instructor: { "@id": `${SITE_ORIGIN}/#owner` },
      },
      offers: {
        "@type": "Offer",
        price: String(offer.course.priceValue),
        priceCurrency: "USD",
        category: "Paid",
        url: offer.course.checkout.checkoutUrl,
        seller: { "@id": `${SITE_ORIGIN}/#seller` },
      },
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

function getNotFoundMetadata(route) {
  const language = getRouteLanguage(route);
  const lang = language === "pt" ? "pt-BR" : language;
  const localized = language === "en"
    ? {
        title: "Page not found | BOJ Automation and Control",
        description: "The requested page does not exist on the BOJ website.",
      }
    : language === "pt"
      ? {
          title: "Página não encontrada | BOJ Automação e Controle",
          description: "A página solicitada não existe no site da BOJ.",
        }
      : {
          title: "Página no encontrada | BOJ Automatización y Control",
          description: "La página solicitada no existe en el sitio de BOJ.",
        };

  return {
    route,
    ...localized,
    lang,
    locale: lang === "en" ? "en_US" : lang === "pt-BR" ? "pt_BR" : "es_AR",
    ogType: "website",
    imageAlt: lang === "en"
      ? "BOJ Automation and Control — Siemens S7 PLC diagnostics"
      : lang === "pt-BR"
        ? "BOJ Automação e Controle — diagnóstico de falhas em PLC Siemens S7"
        : "BOJ Automatización y Control — diagnóstico de fallas en PLC Siemens S7",
    canonical: null,
    robots: "noindex, follow",
    indexable: false,
    alternates: [],
    jsonLd: null,
  };
}

export function getRouteMetadata(route) {
  const normalizedRoute = route.length > 1 ? route.replace(/\/+$/, "") : route;
  const base = routeMetadata[normalizedRoute];
  if (!base) return getNotFoundMetadata(normalizedRoute);

  const path = canonicalPath(normalizedRoute);
  const language = getRouteLanguage(path);
  const lang = language === "pt" ? "pt-BR" : language;
  const indexable = indexableRouteSet.has(path) || normalizedRoute === "/inicio";
  const metadata = {
    route: path,
    ...base,
    lang,
    locale: lang === "en" ? "en_US" : lang === "pt-BR" ? "pt_BR" : "es_AR",
    ogType: appRouteSet.has(path) ? "product" : "website",
    imageAlt: lang === "en"
      ? "BOJ Automation and Control — Siemens S7 PLC diagnostics"
      : lang === "pt-BR"
        ? "BOJ Automação e Controle — diagnóstico de falhas em PLC Siemens S7"
        : "BOJ Automatización y Control — diagnóstico de fallas en PLC Siemens S7",
    canonical: absoluteUrl(path),
    robots: indexable ? "index, follow" : "noindex, follow",
    indexable,
    alternates: getRouteAlternates(normalizedRoute),
  };
  metadata.jsonLd = getRouteJsonLd(path, metadata);
  return metadata;
}
