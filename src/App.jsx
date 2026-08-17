import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Analytics } from "@vercel/analytics/react";
import { track as trackVercelEvent } from "@vercel/analytics";
import {
  ArrowRight,
  Brain,
  Building2,
  Cable,
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  CircuitBoard,
  Clock,
  ClipboardCheck,
  Cpu,
  ExternalLink,
  Factory,
  FileSearch,
  Gauge,
  GraduationCap,
  Globe,
  Landmark,
  Mail,
  MapPin,
  Menu,
  MonitorCog,
  Network,
  Phone,
  RefreshCcw,
  Rocket,
  ScanSearch,
  Settings,
  ShieldCheck,
  Smartphone,
  TriangleAlert,
  Users,
  WifiOff,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import {
  appAudience,
  appCapabilities,
  appComparison,
  appDiagnosticModules,
  appHero,
  appPlantBenefits,
  appRealCases,
  authorityHighlights,
  clientLogoSlots,
  contact,
  contactChecklist,
  courses,
  homeHighlights,
  methodSteps,
  navItems,
  offer,
  projects,
  s7Course,
  s7ProofClients,
  s7ManualPages,
  s7Testimonials,
  metodoBojSteps,
  servicePrinciples,
  services,
  technicalResources,
  tiaCourse,
  trustSignals,
  whyBoj,
} from "./content.js";
import {
  englishApp,
  englishCourses,
  englishHome,
  englishNavItems,
  englishProjects,
  englishS7Course,
  englishServices,
  languageRoutePairs,
  portugueseApp,
  portugueseCourses,
  portugueseHome,
  portugueseNavItems,
  portugueseProjects,
  portugueseS7Course,
  portugueseServices,
} from "./i18n.js";
import bojLogo from "./assets/boj-logo-real-cropped.png";
import appScreenshot from "./assets/APP.png";
import appRealCapture from "./assets/boj-s7-plc-real-capture.png";
import appProHeroLaptopVisual from "./assets/app-pro-hero-background-v2.jpg";
import appPanelPrincipalDiagnostico from "./assets/app-panel-principal-diagnostico.jpg";
import appResultadoDiagnostico from "./assets/app-resultado-diagnostico.jpg";
import appSadDevicePreview from "./assets/app-sad-device-preview.png";
import appDiagnosticoGuiado from "./assets/app-diagnostico-guiado.jpg";
import appHipotesisPriorizadas from "./assets/app-hipotesis-priorizadas.jpg";
import walterBojAvatar from "./assets/walter-boj-avatar-field.jpeg";
import heroIndustrialCover from "./assets/boj-hero-industrial-cover-v4.jpg";
import heroInicio from "./assets/hero-inicio.jpg";
import heroServicios from "./assets/hero-servicios.jpg";
import heroCursos from "./assets/hero-cursos.jpg";
import heroCursoS7 from "./assets/hero-curso-s7.jpg";
import heroCursoTia from "./assets/hero-curso-tia.jpg";
import heroObras from "./assets/hero-obras.jpg";
import heroRecursos from "./assets/hero-recursos.jpg";
import heroContacto from "./assets/hero-contacto.jpg";
import courseS7400Visual from "./assets/course-s7-400.jpg";
import s7IncludePlc400Visual from "./assets/services-works/PLC400.jpg";
import s7IncludeAppPanelVisual from "./assets/services-works/panel app 2.png";
import courseTiaPortalVisual from "./assets/course-tia-portal.jpg";
import step7ManagerVisual from "./assets/11.png";
import step7HwConfigVisual from "./assets/12.png";
import step7LadderVisual from "./assets/13.png";
import step7ClassicVisual from "./assets/siemens-software-step7-basic.jpg";
import tiaPortalResourceVisual from "./assets/TIA_Portal_1.png";
import microWinResourceVisual from "./assets/MicroWin-1.png";
import logoSoftComfortResourceVisual from "./assets/Logo comfort - 1.jpg";
import winccResourceVisual from "./assets/WinCC-1.jfif";
import plcCabinetVisual from "./assets/old-site/07-0852e6d5.jpg";
import panelDiagnosticVisual from "./assets/old-site/panel-diagnostic-optimized.jpg";
import step7Visual from "./assets/old-site/25-58d80e46.jpg";
import engineeringVisual from "./assets/old-site/29-255f90e7.jpg";
import plantVisual from "./assets/old-site/35-47edf350.jpg";
import aerialPlantVisual from "./assets/old-site/43-00658318.jpg";

const serviceWorkImageModules = import.meta.glob("./assets/services-works/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
});

const manualPreviewModules = import.meta.glob("./assets/manual-preview/*.jpg", {
  eager: true,
  import: "default",
});
const manualPreviewImages = Object.keys(manualPreviewModules)
  .sort()
  .map((key) => manualPreviewModules[key]);

const appCarouselModules = import.meta.glob("./assets/app-carousel/*.jpg", {
  eager: true,
  import: "default",
});
const appCarouselImages = Object.keys(appCarouselModules)
  .sort()
  .map((key) => appCarouselModules[key]);

// ───────────────────────────────────────────────────────────────────────────
// Analítica / tracking de conversión.
// Para ACTIVAR: completa los IDs abajo. Mientras estén vacíos, todo es no-op
// seguro (no carga scripts, no rompe nada). track() sirve aunque no haya IDs.
// GA4 → mide tráfico y embudo. Meta Pixel → remarketing al 95% que no compra.
const ANALYTICS = {
  ga4Id: "", // p.ej. "G-XXXXXXXXXX"
  metaPixelId: "", // p.ej. "1234567890123456"
};

function track(event, params = {}) {
  if (typeof window === "undefined") return;
  try {
    trackVercelEvent(event, params);
    if (typeof window.gtag === "function") window.gtag("event", event, params);
    if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event, ...params });
    if (typeof window.fbq === "function") window.fbq("trackCustom", event, params);
  } catch (_) {
    /* el tracking nunca debe romper la UI */
  }
}

let analyticsBootstrapped = false;
function initAnalytics() {
  if (analyticsBootstrapped || typeof document === "undefined") return;
  analyticsBootstrapped = true;

  if (ANALYTICS.ga4Id) {
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS.ga4Id}`;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", ANALYTICS.ga4Id);
  }

  if (ANALYTICS.metaPixelId) {
    /* eslint-disable */
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", ANALYTICS.metaPixelId);
    window.fbq("track", "PageView");
    /* eslint-enable */
  }
}

const getServiceWorkImage = (fileNames) => {
  const candidates = Array.isArray(fileNames) ? fileNames : [fileNames];

  for (const fileName of candidates) {
    const image = serviceWorkImageModules[`./assets/services-works/${fileName}`];
    if (image) return image;
  }

  return "";
};

const icons = {
  ArrowRight,
  Brain,
  Building2,
  Cable,
  CalendarCheck,
  CheckCircle2,
  CircuitBoard,
  Clock,
  ClipboardCheck,
  Cpu,
  ExternalLink,
  Factory,
  FileSearch,
  Gauge,
  GraduationCap,
  Globe,
  Landmark,
  Mail,
  MapPin,
  MonitorCog,
  Network,
  Phone,
  RefreshCcw,
  Rocket,
  ScanSearch,
  Settings,
  ShieldCheck,
  Smartphone,
  TriangleAlert,
  Users,
  WifiOff,
  Wrench,
  Zap,
};

const quickServices = [
  "Diagnóstico de fallas",
  "Automatización industrial",
  "Cursos técnicos",
  "Capacitaciones in-company",
  "Migraciones",
  "Redes industriales",
  "App de diagnóstico",
];

const contactDecisionPaths = [
  {
    eyebrow: "Urgencia en planta",
    title: "Falla o línea detenida",
    description:
      "Si la producción está afectada, comparte el síntoma, el equipo involucrado y la prioridad. Coordinamos la disponibilidad y el siguiente paso.",
    action: "Priorizar por WhatsApp",
    icon: "TriangleAlert",
    tone: "urgent",
    href: whatsappUrl(
      "Hola, necesito consultar por una falla o línea detenida. El equipo involucrado y el síntoma son:",
    ),
    external: true,
  },
  {
    eyebrow: "Ingeniería",
    title: "Proyecto, migración o tablero",
    description:
      "Cuéntanos cuál es la instalación actual, el alcance y el objetivo para organizar una primera revisión técnica sin perder contexto.",
    action: "Completar formulario",
    icon: "Wrench",
    tone: "project",
    href: "#consulta-tecnica",
  },
  {
    eyebrow: "Formación y software",
    title: "Curso, App PRO o licencias",
    description:
      "Indica si buscas formación, acceso individual o una solución para un equipo técnico y te orientaremos hacia la opción adecuada.",
    action: "Completar formulario",
    icon: "GraduationCap",
    tone: "training",
    href: "#consulta-tecnica",
  },
];

const projectVisuals = [
  plantVisual,
  plcCabinetVisual,
  panelDiagnosticVisual,
  aerialPlantVisual,
  engineeringVisual,
  step7Visual,
];

// Imagen ilustrativa (de services-works) por obra, en el mismo orden que `projects`.
const projectWorkImageFiles = [
  "Generador industrial — para Generador WEG BT40.jpg",
  "Sistema contra incendios industrial — bombas, cañerías, válvulas.jpg",
  "Evaporador  equipo de proceso — para Evaporador CALSA.jpg",
  "Turbina o generador industrial — para Generadores Siemens TG3TG4.jpg",
  "Motocompresor industrial — para Compresores TGN.jpg",
  "Planta de agua  bombeo industrial — bombas, cañerías, tratamiento.jpg",
  "envolvedora-papel.jpg",
  "envasadora.jpg",
];

const courseVisuals = {
  s7: step7HwConfigVisual,
  tia: plcCabinetVisual,
};

const resourceVisuals = {
  simaticManager: [step7HwConfigVisual, step7ManagerVisual, step7LadderVisual],
  tiaPortal: [tiaPortalResourceVisual],
  microWin: [microWinResourceVisual],
  logoSoftComfort: [logoSoftComfortResourceVisual],
  wincc: [winccResourceVisual],
};

const homeTrustIndicators = [
  {
    icon: "ShieldCheck",
    value: "10+",
    label: "años de experiencia",
  },
  {
    icon: "Cpu",
    value: "PLC",
    label: "Siemens",
  },
  {
    icon: "Network",
    value: "PROFIBUS /",
    label: "PROFINET",
  },
  {
    icon: "Phone",
    value: "Soporte técnico",
    label: "especializado",
  },
];

const specializationBadges = [
  { icon: "Zap", label: "Energía" },
  { icon: "Factory", label: "Oil & Gas" },
  { icon: "CircuitBoard", label: "Alimentos" },
  { icon: "Gauge", label: "Papel" },
  { icon: "Building2", label: "Procesos" },
];

const landingServices = [
  {
    icon: "FileSearch",
    title: "Diagnóstico de fallas",
    text: "Análisis y detección precisa de fallas en sistemas de control, potencia, redes e instrumentación.",
  },
  {
    icon: "RefreshCcw",
    title: "Migración de sistemas",
    text: "Actualización de plataformas PLC, HMI y redes industriales con criterios de continuidad operativa.",
  },
  {
    icon: "MonitorCog",
    title: "Programación PLC y HMI",
    text: "Desarrollo de software industrial en Siemens S7, TIA Portal, Step 7 Classic y soluciones HMI.",
  },
  {
    icon: "Network",
    title: "Redes industriales",
    text: "Configuración, diagnóstico y mantenimiento de redes PROFIBUS, PROFINET y Ethernet industrial.",
  },
  {
    icon: "Gauge",
    title: "Instrumentación y señales",
    text: "Integración y diagnóstico de señales digitales, analógicas, 4-20 mA, sensores y actuadores.",
  },
  {
    icon: "ClipboardCheck",
    title: "Ingeniería y puesta en marcha",
    text: "Ingeniería aplicada, FAT, SAT, asistencia en planta y soporte técnico especializado.",
  },
];

const landingCourses = [
  {
    title: "Diagnóstico de PLC Siemens S7-300/400",
    text: "Curso práctico orientado a mantenimiento industrial, diagnóstico de fallas reales y resolución de problemas en planta.",
    image: step7HwConfigVisual,
    path: "/cursos/s7-300-400",
  },
  {
    title: "TIA Portal y PLC S7-1200/1500",
    text: "Programación aplicada, estructuras de bloques, HMI, señales y comunicación industrial.",
    image: tiaPortalResourceVisual,
    path: "/cursos/tia-portal",
  },
  {
    title: "Redes industriales y variadores",
    text: "Diagnóstico de PROFIBUS, PROFINET, variadores de frecuencia y fallas de comunicación.",
    image: plcCabinetVisual,
    path: "/cursos",
  },
];

const landingProjects = [
  {
    title: "Modernización de planta de tratamiento de líquidos",
    text: "Migración de sistemas, integración HMI y red industrial.",
    image: plantVisual,
  },
  {
    title: "Sistema de control para compresores de gas",
    text: "PLC Siemens, variadores, comunicación industrial y soporte en planta.",
    image: aerialPlantVisual,
  },
  {
    title: "Automatización de línea de producción",
    text: "Control de procesos, instrumentación, señales y supervisión operativa.",
    image: engineeringVisual,
  },
  {
    title: "Puesta en marcha en planta de alimentos",
    text: "Ingeniería, programación, FAT/SAT y asistencia técnica en sitio.",
    image: panelDiagnosticVisual,
  },
];

const homeProblems = [
  { icon: "ShieldCheck", text: "Máquinas detenidas\nsin causa clara" },
  { icon: "Wrench", text: "Fallas SF / BF /\nSTOP en PLC Siemens" },
  { icon: "Network", text: "Errores en redes\nPROFIBUS / PROFINET" },
  { icon: "RefreshCcw", text: "Migración de\nsistemas obsoletos" },
  { icon: "Gauge", text: "Señales analógicas\ne instrumentación" },
  { icon: "GraduationCap", text: "Capacitación para\npersonal de mantenimiento" },
];

const homeTechSpecialties = [
  {
    icon: "CircuitBoard",
    title: "PLC Siemens",
    text: "S7-300 / S7-400 / S7-1200 / S7-1500",
  },
  {
    icon: "MonitorCog",
    title: "Software de ingeniería",
    text: "STEP 7 Classic / TIA Portal / WinCC",
  },
  {
    icon: "Network",
    title: "Redes industriales",
    text: "PROFIBUS / PROFINET",
  },
  {
    icon: "Gauge",
    title: "Accionamientos e instrumentación",
    text: "Variadores / señales analógicas / instrumentación",
  },
  {
    icon: "ClipboardCheck",
    title: "Diagnóstico en planta",
    text: "Soporte técnico / análisis de fallas / verificación",
  },
];

const homeClientNames = [
  "YPF",
  "Ledesma",
  "Generación Mediterránea",
  "TGN",
  "CALSA",
  "GETSA",
];

const servicesAreaCards = [
  {
    icon: "FileSearch",
    title: "Diagnóstico de fallas",
    text: "Análisis técnico y búsqueda de causa raíz",
  },
  {
    icon: "Settings",
    title: "Automatización industrial",
    text: "PLC, HMI, SCADA y puesta en marcha",
  },
  {
    icon: "RefreshCcw",
    title: "Migraciones",
    text: "Actualización de sistemas y plataformas",
  },
  {
    icon: "Network",
    title: "Redes industriales",
    text: "PROFIBUS, PROFINET y comunicación",
  },
  {
    icon: "Gauge",
    title: "Instrumentación y señales",
    text: "Sensores, 4-20 mA y señales de campo",
  },
  {
    icon: "Zap",
    title: "Electricidad y tableros",
    text: "Tableros, protecciones y fuerza",
  },
];

const serviceWorkflowCards = [
  {
    icon: "FileSearch",
    title: "Diagnóstico con evidencia",
    text: "Relevamos síntomas, estado del sistema y condiciones de campo antes de intervenir.",
  },
  {
    icon: "ClipboardCheck",
    title: "Decisión técnica clara",
    text: "Priorizamos causa probable, riesgo operativo y próximo paso técnico.",
  },
  {
    icon: "ShieldCheck",
    title: "Intervención orientada a continuidad",
    text: "Buscamos reducir paradas, evitar cambios innecesarios y sostener la operación.",
  },
];

const servicesExperienceCards = [
  {
    icon: "Zap",
    title: "Oil & Gas / Energía",
    text: "Sistemas críticos, generación, compresión, tableros y continuidad operativa.",
  },
  {
    icon: "Factory",
    title: "Alimentos y procesos",
    text: "Puesta en marcha, control de proceso, señales y soporte a producción.",
  },
  {
    icon: "Settings",
    title: "Papel / Manufactura",
    text: "Automatización, variadores, diagnóstico y mejoras en líneas industriales.",
  },
  {
    icon: "Gauge",
    title: "Tratamiento de agua / Servicios industriales",
    text: "Control, instrumentación, bombas, tableros y sistemas auxiliares.",
  },
  {
    icon: "ClipboardCheck",
    title: "Ingeniería y puesta en marcha",
    text: "Validación en campo, pruebas SAT, documentación y asistencia técnica.",
  },
];

const mainServiceCards = [
  {
    icon: "FileSearch",
    title: "Diagnóstico de fallas industriales",
    description:
      "Detección y análisis de fallas para reducir paradas, separar causa probable y evitar cambios innecesarios.",
    applications: [
      "PLC Siemens S5, S7-200, S7-300, S7-400, S7-1200 y S7-1500",
      "TIA Portal y STEP 7 Classic",
      "Señales digitales y analógicas",
      "Lógica secuencial, PID y variadores",
    ],
    result: "Diagnóstico claro, causa raíz identificada y plan de acción con evidencia.",
    when: "Ante paradas repetitivas, fallas intermitentes o falta de criterio técnico.",
  },
  {
    icon: "Settings",
    title: "Automatización industrial",
    description: "Diseño, modificación y puesta en marcha de sistemas de control.",
    applications: [
      "PLC Siemens y otras marcas",
      "HMI / SCADA",
      "Variadores / servomotores",
      "Lógica, secuencias y seguridad",
    ],
    result: "Sistema estable, funcional y listo para producir con menor dependencia externa.",
    when: "Cuando hay nuevas funciones, mejoras o falta de flexibilidad en el sistema actual.",
  },
  {
    icon: "RefreshCcw",
    title: "Migraciones",
    description: "Actualización y migración de sistemas antiguos hacia plataformas modernas.",
    applications: [
      "Migración Siemens S5 a S7/TIA",
      "Migración S7-300/400 a S7-1200/1500",
      "Migraciones PLC y HMI",
      "Backups y documentación técnica",
    ],
    result: "Sistema actualizado, documentado y preparado para el largo plazo.",
    when: "Cuando hay equipos obsoletos, falta de repuestos, software antiguo o riesgo operativo.",
  },
  {
    icon: "Network",
    title: "Redes industriales",
    description:
      "Diseño, instalación y diagnóstico de redes industriales que conectan PLC, HMI, drives y periferia distribuida.",
    applications: [
      "PROFIBUS DP",
      "PROFINET",
      "Ethernet industrial",
      "Diagnóstico de nodos, conectores y comunicación PLC-HMI-Drive",
    ],
    result: "Redes estables, seguras y con comunicación confiable.",
    when: "Ante fallas de comunicación, BF, nodos perdidos, latencias o necesidad de expandir la red.",
  },
];

const secondaryServiceCards = [
  {
    icon: "Gauge",
    title: "Instrumentación y señales de campo",
    text: "Diagnóstico e integración de señales de campo para que el PLC lea el proceso de forma confiable.",
    applications: ["4-20 mA / 0-10 V", "Sensores y transmisores", "Presión, temperatura, nivel y caudal", "Escalado de señales", "Fallas de cableado y lazo"],
  },
  {
    icon: "Cable",
    title: "Electricidad industrial y tableros",
    text: "Relevamiento, diagnóstico y mejora de tableros de control, fuerza, mando, protecciones y conexionado de campo.",
    applications: ["Tableros de control y fuerza", "MCC", "Arranques de motores", "Protecciones", "Ordenamiento y documentación"],
  },
  {
    icon: "GraduationCap",
    title: "Capacitación técnica industrial",
    text: "Formación práctica para técnicos, instrumentistas, electricistas, ingenieros y mantenimiento que necesitan actuar frente a equipos reales.",
    applications: ["PLC Siemens", "Diagnóstico de fallas", "Redes industriales", "TIA Portal y STEP 7 Classic", "Señales analógicas y variadores", "Cursos in-company y grabados"],
  },
];

const coursesTrainingBenefits = [
  {
    icon: "Factory",
    title: "Casos reales de planta",
    text: "Enfoque aplicado a fallas, síntomas y diagnóstico.",
  },
  {
    icon: "FileSearch",
    title: "Menos teoría aislada",
    text: "Más criterio técnico para actuar en campo.",
  },
  {
    icon: "ClipboardCheck",
    title: "Contenido usable",
    text: "PDFs técnicos, guías y secuencia clara de análisis.",
  },
];

const coursesAvailableCards = [
  {
    icon: "ClipboardCheck",
    image: courseS7400Visual,
    title: "Diagnóstico y resolución de fallas en PLC Siemens S7-300/400",
    label: "Diagnóstico S7-300/400",
    path: "/cursos/s7-300-400",
    quickFacts: [
      { icon: "Gauge", title: "Nivel", text: "Intermedio técnico" },
      { icon: "MonitorCog", title: "Formato", text: "Material técnico en PDF, guías y casos reales" },
      { icon: "FileSearch", title: "Enfoque", text: "Fallas CPU, BF/SF, señales, red, hardware y criterio de diagnóstico" },
    ],
    bullets: [
      "Diagnosticar estados CPU (STOP, SF/BF) y señales críticas.",
      "Diferenciar fallas de campo, de programa, de red y de hardware.",
      "Reducir prueba y error con una secuencia clara de diagnóstico.",
      "Respaldar decisiones técnicas con evidencia online y de campo.",
    ],
  },
  {
    icon: "MonitorCog",
    image: courseTiaPortalVisual,
    title: "Introducción a TIA Portal con PLC S7-1200/1500",
    label: "TIA Portal S7-1200/1500",
    path: "/cursos/tia-portal",
    upcoming: true,
    quickFacts: [
      { icon: "Gauge", title: "Nivel", text: "Inicial aplicado" },
      { icon: "MonitorCog", title: "Formato", text: "Material técnico en PDF y práctico" },
      { icon: "FileSearch", title: "Enfoque", text: "Proyectos, hardware, variables, programación básica y monitoreo online" },
    ],
    bullets: [
      "Comprender la estructura de hardware, variables y monitoreo online.",
      "Crear y organizar proyectos, cargar al PLC y monitorear señales.",
      "Evitar errores frecuentes al migrar de STEP 7 Classic a TIA Portal.",
      "Preparar una base sólida para proyectos reales con PLC Siemens.",
    ],
  },
];

const featuredProjects = projects.slice(0, 3);
const additionalProjects = projects.slice(3);

const coursesLearningBlocks = [
  {
    icon: "FileSearch",
    text: "Interpretar fallas con más criterio técnico.",
  },
  {
    icon: "ClipboardCheck",
    text: "Ordenar un diagnóstico sin depender de prueba y error.",
  },
  {
    icon: "Cpu",
    text: "Comprender mejor PLC, señales, red y hardware.",
  },
  {
    icon: "Factory",
    text: "Trabajar con un enfoque más aplicable a planta.",
  },
];

const appProductUrl = offer.app.productUrl;

const appDiagnosticFlow = [
  {
    icon: "FileSearch",
    title: "Ingreso de síntomas",
    text: "Estados de CPU, LEDs, red, módulos, señales y comportamiento observado en campo.",
  },
  {
    icon: "ClipboardCheck",
    title: "Hipótesis técnicas",
    text: "La app ordena posibles causas según la evidencia ingresada y las prioridades de diagnóstico.",
  },
  {
    icon: "ShieldCheck",
    title: "Guía de verificación",
    text: "Obtén pasos sugeridos para verificar PLC, red, hardware y condiciones de campo.",
  },
];

const appProIncludes = [
  {
    icon: "FileSearch",
    title: "Diagnóstico por LEDs y síntomas",
    text: "Interpretación de estados y síntomas típicos.",
  },
  {
    icon: "ClipboardCheck",
    title: "Hipótesis técnicas priorizadas",
    text: "Causas posibles ordenadas por probabilidad.",
  },
  {
    icon: "ShieldCheck",
    title: "Guía de verificación paso a paso",
    text: "Pasos claros para verificar en campo.",
  },
  {
    icon: "Cpu",
    title: "Orientada a S7-300/400",
    text: "Foco en CPU y módulos Siemens clásicos.",
  },
  {
    icon: "MonitorCog",
    title: "Interfaz web instalable",
    text: "Acceso desde navegador y posibilidad de instalación en dispositivos compatibles.",
  },
  {
    icon: "Settings",
    title: "Apoyo para técnicos y empresas",
    text: "Estandariza diagnóstico y reduce improvisación.",
  },
];

const appProblemItems = [
  { icon: "Cpu", title: "CPU en STOP", text: "CPU detenida sin causa clara." },
  { icon: "Zap", title: "SF / BF activos", text: "Alarmas del sistema o de comunicación activas." },
  { icon: "Network", title: "Fallas de red PROFIBUS", text: "Pérdida de comunicación o equipos no visibles." },
  { icon: "CircuitBoard", title: "Módulos y señales", text: "Módulos sin respuesta, fallas de E/S o señales inconsistentes." },
  { icon: "RefreshCcw", title: "Fallas intermitentes", text: "Comportamientos que aparecen y desaparecen." },
  { icon: "Clock", title: "Bajo presión de producción", text: "Diagnóstico rápido cuando el tiempo es crítico." },
];

const appHowItWorks = [
  {
    icon: "ClipboardCheck",
    title: "Ingresas el síntoma",
    text: "Carga lo que observas en el PLC y en campo.",
  },
  {
    icon: "Brain",
    title: "La app ordena hipótesis",
    text: "Recibes causas probables organizadas por prioridad.",
  },
  {
    icon: "CheckCircle2",
    title: "Verificas en campo",
    text: "Sigues una guía paso a paso para validar la causa probable.",
  },
];

const appLanguages = ["Español", "English", "Português", "Deutsch", "Français", "Italiano"];

const appRealViews = [
  {
    title: "Panel principal de diagnóstico",
    text: "Vista general del entorno de diagnóstico, síntomas, LEDs y resultados activos.",
    image: appPanelPrincipalDiagnostico,
    position: "center top",
  },
  {
    title: "Resultado orientativo y acciones sugeridas",
    text: "Hipótesis principal, evidencias consideradas, pruebas recomendadas y validación posterior.",
    image: appResultadoDiagnostico,
    position: "center top",
  },
  {
    title: "Subflujos guiados y diagnóstico por etapas",
    text: "Asistencia paso a paso para aislar fallas en módulos, IM, base y comunicación.",
    image: appDiagnosticoGuiado,
    position: "center top",
  },
  {
    title: "Hipótesis técnicas priorizadas",
    text: "Ordenamiento de causas probables según LEDs, red, módulos y evidencia ingresada.",
    image: appHipotesisPriorizadas,
    position: "center top",
  },
];

// Carrusel de capturas de la app para el cuadro 2 de "Qué incluye".
// appCarouselImages ordenado por nombre: [0]=01-panel-principal, [1]=02-resultado,
// [2]=03-hipotesis, [3]=04-estado-cpu. Mostramos primero las que mejor encuadran.
const s7AppCarousel = [
  { label: "Diagnóstico por estado de CPU y LEDs", image: appCarouselImages[3] },
  { label: "Resultado orientativo y acciones sugeridas", image: appCarouselImages[1] },
  { label: "Hipótesis técnicas priorizadas", image: appCarouselImages[2] },
  { label: "Panel principal de diagnóstico", image: appCarouselImages[0] },
];

const appTrialPlan = offer.app.trialPlan;

const appProPlans = offer.app.proPlans;
const appLicensePlans = appProPlans.filter(({ title }) => title !== "Curso + licencia");

const appPlanCardIds = {
  "Prueba gratuita": "plan-trial",
  "Suscripción mensual": "plan-subscription-monthly",
  "Mensual de pago único": "plan-monthly-one-time",
  "Profesional": "plan-professional",
  "Empresarial": "plan-company",
};

const appPlanDecisionGuide = [
  {
    context: "Uso continuo",
    title: "Suscripción mensual",
    detail: "Pagas mes a mes y la licencia se renueva hasta que la canceles.",
    target: appPlanCardIds["Suscripción mensual"],
  },
  {
    context: "Trabajo puntual",
    title: "Mensual de pago único",
    detail: "Un mes de acceso sin renovación automática.",
    target: appPlanCardIds["Mensual de pago único"],
  },
  {
    context: "Uso profesional",
    title: "Profesional",
    detail: "Seis meses, dos dispositivos y curso incluido.",
    target: appPlanCardIds.Profesional,
  },
  {
    context: "Equipo técnico",
    title: "Empresarial",
    detail: "Seis meses, diez dispositivos y curso incluido.",
    target: appPlanCardIds.Empresarial,
  },
];

const appAudienceProfiles = [
  { icon: "Wrench", text: "Técnicos de mantenimiento industrial" },
  { icon: "Gauge", text: "Instrumentistas y electricistas de planta" },
  { icon: "Cpu", text: "Automatistas y programadores PLC" },
  { icon: "Factory", text: "Empresas con sistemas Siemens S7-300/400" },
  { icon: "GraduationCap", text: "Centros de formación técnica" },
];

const appAvailabilityItems = [
  { icon: "Globe", title: "Web", text: "Acceso inmediato desde navegador, sin instalación obligatoria." },
  { icon: "Smartphone", title: "Instalable", text: "Acceso directo desde dispositivo compatible para uso más cómodo." },
  { icon: "WifiOff", title: "Sin conexión según el plan", text: "La disponibilidad sin conexión varía según la licencia contratada." },
];

const appTrustMetrics = [
  { icon: "Clock", title: "+15 años", text: "Experiencia en automatización, mantenimiento y diagnóstico industrial." },
  { icon: "Cpu", title: "PLC Siemens", text: "Foco técnico en S7-300/400 y fallas reales de planta." },
  { icon: "ShieldCheck", title: "Miles de fallas", text: "Resueltas y analizadas en entornos industriales." },
  { icon: "ClipboardCheck", title: "Metodología probada", text: "Criterio aplicado en campo para reducir prueba y error." },
];

const appFaqItems = [
  {
    question: "¿Qué incluye la prueba gratuita?",
    answer: "La prueba gratuita permite utilizar BOJ S7-PLC PRO durante 48 horas. Funciona sólo en línea y algunas funciones pueden estar limitadas.",
  },
  {
    question: "¿La app se puede instalar?",
    answer: "Sí. En dispositivos compatibles puede instalarse como aplicación web para acceder más rápido desde el escritorio o la pantalla de inicio.",
  },
  {
    question: "¿Necesito instalar algo para usarla?",
    answer: "No. También puede usarse desde el navegador ingresando a app.bojautomatizacion.com.",
  },
  {
    question: "¿La app funciona sin conexión?",
    answer: "Depende del plan. La prueba gratuita funciona sólo en línea. Suscripción mensual, Mensual de pago único, Curso + licencia y Profesional permiten usarla sin conexión hasta 2 días. Empresarial permite usarla sin conexión hasta 7 días.",
  },
  {
    question: "¿Cuántos dispositivos puedo usar?",
    answer: "Depende del plan. Suscripción mensual, Mensual de pago único y Curso + licencia incluyen 1 dispositivo; Profesional incluye 2 dispositivos y Empresarial incluye 10 dispositivos.",
  },
  {
    question: "¿Qué planes incluyen curso?",
    answer: "Curso + licencia, Profesional y Empresarial incluyen el curso con acceso permanente. Suscripción mensual y Mensual de pago único incluyen solo la app PRO.",
  },
  {
    question: "¿Necesito conectar la app directamente al PLC?",
    answer: "No. La app trabaja con la información que carga el usuario: estado de CPU, LEDs, síntomas, fallas de red, módulos y condiciones observadas en campo.",
  },
  {
    question: "¿La app reemplaza al técnico?",
    answer: "No. BOJ S7-PLC PRO es una herramienta de asistencia técnica. Ayuda a ordenar hipótesis y verificaciones, pero las conclusiones deben ser evaluadas por personal calificado.",
  },
  {
    question: "¿Sirve para Siemens S7-300 y S7-400?",
    answer: "Sí. Está orientada al diagnóstico de sistemas Siemens S7-300/400, especialmente estados de CPU, LEDs, PROFIBUS, módulos y señales asociadas.",
  },
  {
    question: "¿Puedo usarla desde cualquier dispositivo?",
    answer: "Puede usarse desde dispositivos compatibles con navegador moderno. La cantidad de dispositivos habilitados depende del plan contratado.",
  },
  {
    question: "¿Hay planes para empresas o centros de formación?",
    answer: "Sí. Instituciones, empresas y centros de formación pueden solicitar condiciones especiales según cantidad de usuarios, licencias o programa de capacitación.",
  },
];

const routeMeta = {
  "/inicio": {
    title: "BOJ Automatización y Control | PLC Siemens, diagnóstico y mantenimiento industrial",
    description:
      "Automatización industrial en Tucumán y Argentina: PLC Siemens, diagnóstico de fallas, PROFIBUS, PROFINET, TIA Portal, cursos técnicos y app para mantenimiento industrial.",
  },
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
      "Contacto técnico en San Miguel de Tucumán, Argentina, para automatización industrial, diagnóstico de fallas, cursos PLC Siemens, TIA Portal y PROFIBUS.",
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
};

function getRoute() {
  let path = window.location.pathname || "/";
  if (path.length > 1 && path.endsWith("/")) path = path.replace(/\/+$/, ""); // sin slash final salvo raíz
  return path;
}

function getRouteLanguage(route) {
  if (route === "/en" || route.startsWith("/en/")) return "en";
  if (route === "/pt" || route.startsWith("/pt/")) return "pt";
  return "es";
}

function getLocalizedPath(route, language) {
  if (route === "/inicio" && language === "es") return "/";
  const pair = languageRoutePairs.find((item) => Object.values(item).includes(route));
  if (pair) return pair[language];
  return language === "es" ? "/" : `/${language}`;
}

function setLanguagePreference(language) {
  try {
    window.localStorage.setItem("boj-site-language", language);
  } catch {
    // El selector funciona aunque el navegador bloquee almacenamiento local.
  }
}

function whatsappUrl(message = "Hola, escribo desde la web de BOJ Automatización y Control para realizar una consulta técnica.") {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function mailtoUrl(subject, body) {
  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

async function sendContactForm(payload) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || "No se pudo enviar la consulta.");
  return result;
}

function Icon({ name, size = 22, className = "" }) {
  const Component = icons[name] || Wrench;
  return <Component size={size} className={className} aria-hidden="true" />;
}

function App() {
  const [route, setRoute] = useState(getRoute);
  const language = getRouteLanguage(route);

  useEffect(() => {
    if (route !== "/" && route !== "/inicio") return;
    let savedLanguage = null;
    try {
      savedLanguage = window.localStorage.getItem("boj-site-language");
    } catch {
      return;
    }
    if (savedLanguage === "en" || savedLanguage === "pt") {
      const savedHome = `/${savedLanguage}`;
      window.history.replaceState(null, "", savedHome);
      setRoute(savedHome);
    }
  }, []);

  useEffect(() => {
    const onPopState = () => setRoute(getRoute());
    window.addEventListener("popstate", onPopState);

    const navigate = (to) => {
      const current = window.location.pathname + window.location.search + window.location.hash;
      if (to !== current) window.history.pushState(null, "", to);
      setRoute(getRoute());
    };

    // Interceptor de clics: convierte enlaces internos same-origin en navegación
    // SPA (History API). Deja pasar sin interceptar: clics ya prevenidos, botón no
    // izquierdo o con Ctrl/Meta/Shift/Alt, target distinto de _self, descargas,
    // href de ancla intra-página (#...), protocolos no http(s) (mailto/tel/…) y
    // enlaces de otro origin (app.bojautomatizacion.com, WhatsApp, Siemens, etc.).
    const onClick = (event) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      const anchor = target && target.closest ? target.closest("a") : null;
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return; // anclas intra-página, sin cambio
      let url;
      try {
        url = new URL(anchor.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return; // externos
      if (url.protocol !== "http:" && url.protocol !== "https:") return; // mailto/tel/javascript
      event.preventDefault();
      navigate(url.pathname + url.search + url.hash);
    };
    document.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("popstate", onPopState);
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    track("page_view", { page_path: route });
  }, [route]);

  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-BR" : language;
  }, [language]);

  useEffect(() => {
    const meta = routeMeta[route] || routeMeta["/inicio"];
    document.title = meta.title;

    const setMeta = (selector, attribute, content) => {
      const element = document.querySelector(selector);
      if (element) element.setAttribute(attribute, content);
    };

    setMeta('meta[name="description"]', "content", meta.description);
    setMeta('meta[property="og:title"]', "content", meta.title);
    setMeta('meta[property="og:description"]', "content", meta.description);
    setMeta('meta[property="og:locale"]', "content", language === "en" ? "en_US" : language === "pt" ? "pt_BR" : "es_AR");
    setMeta('meta[name="twitter:title"]', "content", meta.title);
    setMeta('meta[name="twitter:description"]', "content", meta.description);
    setMeta('meta[name="robots"]', "content", isKnownRoute(route) ? "index, follow" : "noindex, follow");

    // canonical y og:url por ruta, con dominio de PRODUCCIÓN fijo (nunca
    // location.origin, para no emitir canonical hacia URLs de Preview). Home = "/".
    const canonicalUrl = "https://www.bojautomatizacion.com" + (route === "/inicio" ? "/" : route);
    setMeta('link[rel="canonical"]', "href", canonicalUrl);
    setMeta('meta[property="og:url"]', "content", canonicalUrl);

    const spanishPath = getLocalizedPath(route, "es");
    const englishPath = getLocalizedPath(route, "en");
    const portuguesePath = getLocalizedPath(route, "pt");
    const alternates = [
      ["es", spanishPath],
      ["en", englishPath],
      ["pt-BR", portuguesePath],
      ["x-default", spanishPath],
    ];
    alternates.forEach(([hreflang, path]) => {
      let alternate = document.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`);
      if (!alternate) {
        alternate = document.createElement("link");
        alternate.setAttribute("rel", "alternate");
        alternate.setAttribute("hreflang", hreflang);
        document.head.appendChild(alternate);
      }
      alternate.setAttribute("href", `https://www.bojautomatizacion.com${path}`);
    });
  }, [language, route]);

  return (
    <>
      <Header route={route} language={language} />
      <main>
        <RouteView route={route} />
      </main>
      <Footer language={language} />
      <FloatingContact language={language} />
      <LanguageSuggestion route={route} language={language} />
      <Analytics />
    </>
  );
}

const KNOWN_ROUTES = new Set([
  "/",
  "/inicio",
  "/servicios",
  "/cursos",
  "/cursos/s7-300-400",
  "/cursos/tia-portal",
  "/app",
  "/recursos-tecnicos",
  "/obras",
  "/contacto",
  "/privacidad",
  "/terminos",
  "/licencias",
  "/reembolsos",
  "/en",
  "/en/services",
  "/en/courses",
  "/en/courses/s7-300-400",
  "/en/courses/tia-portal",
  "/en/app",
  "/en/projects",
  "/en/contact",
  "/pt",
  "/pt/servicos",
  "/pt/cursos",
  "/pt/cursos/s7-300-400",
  "/pt/cursos/tia-portal",
  "/pt/app",
  "/pt/projetos",
  "/pt/contato",
]);

// Fuente única de rutas conocidas (incluye la validación de los 5 slugs de recursos
// contra technicalResources). La usan RouteView (despacho) y el efecto de metadatos
// (toggle de robots index/noindex).
function isKnownRoute(route) {
  if (KNOWN_ROUTES.has(route)) return true;
  if (route.startsWith("/recursos-tecnicos/")) return technicalResources.some((item) => item.path === route);
  return false;
}

function RouteView({ route }) {
  if (route === "/" || route === "/inicio") return <HomePage />;
  if (route === "/servicios") return <ServicesPage />;
  if (route === "/cursos") return <CoursesPage />;
  if (route === "/cursos/s7-300-400") return <S7CoursePage />;
  if (route === "/cursos/tia-portal") return <TiaCoursePage />;
  if (route === "/app") return <AppPage />;
  if (route === "/recursos-tecnicos") return <TechnicalResourcesPage />;
  if (route.startsWith("/recursos-tecnicos/")) return <TechnicalArticlePage route={route} />;
  if (route === "/obras") return <WorksPage />;
  if (route === "/contacto") return <ContactPage />;
  if (route === "/privacidad") return <LegalPage type="privacy" />;
  if (route === "/terminos") return <LegalPage type="terms" />;
  if (route === "/licencias") return <LegalPage type="licenses" />;
  if (route === "/reembolsos") return <LegalPage type="refunds" />;
  if (route === "/en") return <EnglishHomePage />;
  if (route === "/en/services") return <EnglishServicesPage />;
  if (route === "/en/courses") return <EnglishCoursesPage />;
  if (route === "/en/courses/s7-300-400") return <EnglishS7CoursePage />;
  if (route === "/en/courses/tia-portal") return <EnglishTiaCoursePage />;
  if (route === "/en/app") return <EnglishAppPage />;
  if (route === "/en/projects") return <EnglishProjectsPage />;
  if (route === "/en/contact") return <EnglishContactPage />;
  if (route === "/pt") return <PortugueseHomePage />;
  if (route === "/pt/servicos") return <PortugueseServicesPage />;
  if (route === "/pt/cursos") return <PortugueseCoursesPage />;
  if (route === "/pt/cursos/s7-300-400") return <PortugueseS7CoursePage />;
  if (route === "/pt/cursos/tia-portal") return <PortugueseTiaCoursePage />;
  if (route === "/pt/app") return <PortugueseAppPage />;
  if (route === "/pt/projetos") return <PortugueseProjectsPage />;
  if (route === "/pt/contato") return <PortugueseContactPage />;
  // /gracias despacha pero NO integra KNOWN_ROUTES: así hereda robots
  // "noindex, follow" (post-compra, fuera de sitemap y sin enlaces internos).
  if (route === "/gracias") return <GraciasPage />;
  if (route.startsWith("/en")) return <EnglishNotFound />;
  if (route.startsWith("/pt")) return <PortugueseNotFound />;
  return <NotFound />;
}

// NotFound client-side (no es un HTTP 404 real: Vercel responde index.html). El
// efecto de metadatos le aplica robots "noindex, follow".
function NotFound() {
  return (
    <PageShell
      eyebrow="Error 404"
      title="Página no encontrada"
      subtitle="La página que buscas no existe o cambió de dirección. Vuelve al inicio para continuar navegando."
      heroPrimary={{ label: "Volver al inicio", href: "/" }}
    >
      <p className="notfound-help">
        ¿Buscabas algo puntual? Ir a <a href="/servicios">Servicios</a>, <a href="/cursos">Cursos</a>, <a href="/app">la App</a> o <a href="/contacto">Contacto</a>.
      </p>
    </PageShell>
  );
}

function EnglishNotFound() {
  return (
    <PageShell
      eyebrow="Error 404"
      title="Page not found"
      subtitle="The page you requested does not exist or has moved. Return to the English home page to continue."
      heroPrimary={{ label: "Back to home", href: "/en" }}
    />
  );
}

function PortugueseNotFound() {
  return (
    <PageShell
      eyebrow="Erro 404"
      title="Página não encontrada"
      subtitle="A página solicitada não existe ou mudou de endereço. Volte ao início em português para continuar."
      heroPrimary={{ label: "Voltar ao início", href: "/pt" }}
    />
  );
}

function Header({ route, language }) {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);
  const headerCopy = {
    es: {
      homePath: "/",
      homeLabel: "Ir a inicio",
      navLabel: "Navegación principal",
      menuLabel: "Abrir menú",
      diagnosticLabel: "Solicitar diagnóstico",
      diagnosticMessage: "Hola, escribo desde la web de BOJ Automatización y Control para solicitar un diagnóstico industrial.",
      plansLabel: "Ver planes PRO",
      plansAnchor: "#planes-pro",
      courseLabel: "Ver curso y precio",
      courseAnchor: "#curso-s7-compra",
      contactLabel: "Completar consulta",
      contactAnchor: "#consulta-tecnica",
    },
    en: {
      homePath: "/en",
      homeLabel: "Go to home",
      navLabel: "Main navigation",
      menuLabel: "Open menu",
      diagnosticLabel: "Request diagnostics",
      diagnosticMessage: "Hello, I am contacting BOJ to request support with an industrial diagnostics case.",
      plansLabel: "View PRO plans",
      plansAnchor: "#en-pro-plans",
      courseLabel: "View course and price",
      courseAnchor: "#en-course-purchase",
      contactLabel: "Send an inquiry",
      contactAnchor: "#en-contact-form",
    },
    pt: {
      homePath: "/pt",
      homeLabel: "Ir para o início",
      navLabel: "Navegação principal",
      menuLabel: "Abrir menu",
      diagnosticLabel: "Solicitar diagnóstico",
      diagnosticMessage: "Olá, estou entrando em contato com a BOJ para solicitar suporte em um caso de diagnóstico industrial.",
      plansLabel: "Ver planos PRO",
      plansAnchor: "#pt-planos-pro",
      courseLabel: "Ver curso e preço",
      courseAnchor: "#pt-compra-curso",
      contactLabel: "Enviar uma consulta",
      contactAnchor: "#pt-formulario-contato",
    },
  }[language];
  const items = language === "en" ? englishNavItems : language === "pt" ? portugueseNavItems : navItems;
  const defaultAction = {
    label: headerCopy.diagnosticLabel,
    href: whatsappUrl(headerCopy.diagnosticMessage),
  };
  const routeAction =
    ["/app", "/en/app", "/pt/app"].includes(route)
      ? { label: headerCopy.plansLabel, href: headerCopy.plansAnchor }
      : ["/cursos/s7-300-400", "/en/courses/s7-300-400", "/pt/cursos/s7-300-400"].includes(route)
        ? { label: headerCopy.courseLabel, href: headerCopy.courseAnchor }
        : ["/contacto", "/en/contact", "/pt/contato"].includes(route)
          ? { label: headerCopy.contactLabel, href: headerCopy.contactAnchor }
          : defaultAction;

  return (
    <header className="site-header">
      <a className="brand" href={headerCopy.homePath} onClick={closeMenu} aria-label={headerCopy.homeLabel}>
        <BrandLogo />
      </a>

      <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label={headerCopy.navLabel}>
        {items.map((item) => {
          const active =
            route === item.path ||
            (item.children && route.startsWith(`${item.path}/`)) ||
            (item.path === "/recursos-tecnicos" && route.startsWith("/recursos-tecnicos"));
          return (
            <div className="nav-item" key={item.path}>
              <a
                className={active ? "active" : ""}
                href={item.path}
                onClick={closeMenu}
              >
                {item.label}
                {item.children ? <ChevronDown size={14} /> : null}
              </a>
              {item.children ? (
                <div className="submenu">
                  {item.children.map((child) => (
                    <a
                      key={child.path}
                      className={route === child.path ? "active" : ""}
                      href={child.path}
                      onClick={closeMenu}
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
        <div className="mobile-nav-actions">
          <a
            className="header-action solid"
            href={routeAction.href}
            onClick={closeMenu}
          >
            {routeAction.label}
          </a>
        </div>
      </nav>

      <div className="header-actions">
        <a
          className="header-action solid"
          href={routeAction.href}
          onClick={closeMenu}
        >
          {routeAction.label}
        </a>
        <LanguageSwitcher route={route} language={language} />
      </div>

      <div className="mobile-header-controls">
        <LanguageSwitcher route={route} language={language} />
        <button
          className="nav-toggle"
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={headerCopy.menuLabel}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}

function LanguageSwitcher({ route, language, onSelect }) {
  const spanishPath = getLocalizedPath(route, "es");
  const englishPath = getLocalizedPath(route, "en");
  const portuguesePath = getLocalizedPath(route, "pt");

  const chooseLanguage = (nextLanguage) => {
    setLanguagePreference(nextLanguage);
    onSelect?.();
  };

  return (
    <nav className="language-switcher" aria-label={language === "en" ? "Choose language" : language === "pt" ? "Escolher idioma" : "Elegir idioma"}>
      <Globe size={15} aria-hidden="true" />
      <a
        className={language === "es" ? "active" : ""}
        href={spanishPath}
        hrefLang="es"
        lang="es"
        aria-current={language === "es" ? "page" : undefined}
        aria-label="Ver sitio en español"
        onClick={() => chooseLanguage("es")}
      >
        ES
      </a>
      <span aria-hidden="true">/</span>
      <a
        className={language === "en" ? "active" : ""}
        href={englishPath}
        hrefLang="en"
        lang="en"
        aria-current={language === "en" ? "page" : undefined}
        aria-label="View site in English"
        onClick={() => chooseLanguage("en")}
      >
        EN
      </a>
      <span aria-hidden="true">/</span>
      <a
        className={language === "pt" ? "active" : ""}
        href={portuguesePath}
        hrefLang="pt-BR"
        lang="pt-BR"
        aria-current={language === "pt" ? "page" : undefined}
        aria-label="Ver site em português"
        onClick={() => chooseLanguage("pt")}
      >
        PT
      </a>
    </nav>
  );
}

function LanguageSuggestion({ route, language }) {
  const [visible, setVisible] = useState(false);
  const [suggestedLanguage, setSuggestedLanguage] = useState("en");

  useEffect(() => {
    if (language !== "es") {
      setLanguagePreference(language);
      setVisible(false);
      return;
    }

    let savedLanguage = null;
    try {
      savedLanguage = window.localStorage.getItem("boj-site-language");
    } catch {
      // La detección sigue siendo opcional cuando no hay almacenamiento local.
    }
    if (savedLanguage) return;

    const browserLanguage = window.navigator.languages?.[0] || window.navigator.language || "es";
    const normalizedLanguage = browserLanguage.toLowerCase();
    if (normalizedLanguage.startsWith("pt")) {
      setSuggestedLanguage("pt");
      setVisible(true);
    } else if (!normalizedLanguage.startsWith("es")) {
      setSuggestedLanguage("en");
      setVisible(true);
    }
  }, [language]);

  if (!visible || language !== "es") return null;

  const suggestion = suggestedLanguage === "pt"
    ? {
        title: "Versão em português disponível",
        text: "Prefere acessar a BOJ em português?",
        action: "Ver em português",
        continue: "Continuar em espanhol",
        ariaLabel: "Sugestão de idioma português",
        dismissLabel: "Fechar sugestão de idioma",
      }
    : {
        title: "English version available",
        text: "Would you prefer to view BOJ in English?",
        action: "View in English",
        continue: "Continue in Spanish",
        ariaLabel: "Language suggestion",
        dismissLabel: "Dismiss language suggestion",
      };

  const continueInSpanish = () => {
    setLanguagePreference("es");
    setVisible(false);
  };

  return (
    <aside className="language-suggestion" role="status" aria-label={suggestion.ariaLabel}>
      <div className="language-suggestion-icon" aria-hidden="true">
        <Globe size={20} />
      </div>
      <div>
        <strong>{suggestion.title}</strong>
        <p>{suggestion.text}</p>
      </div>
      <div className="language-suggestion-actions">
        <a href={getLocalizedPath(route, suggestedLanguage)} onClick={() => setLanguagePreference(suggestedLanguage)}>
          {suggestion.action}
        </a>
        <button type="button" onClick={continueInSpanish}>{suggestion.continue}</button>
      </div>
      <button className="language-suggestion-close" type="button" onClick={continueInSpanish} aria-label={suggestion.dismissLabel}>
        <X size={17} />
      </button>
    </aside>
  );
}

function HeroAction({ action, variant }) {
  if (!action) return null;
  const extra = action.external ? { target: "_blank", rel: "noreferrer" } : {};
  return (
    <a className={`mock-btn ${variant}`} href={action.href} onClick={action.onClick} {...extra}>
      {action.label} <ArrowRight size={18} />
    </a>
  );
}

// Hero unificado para toda la web: misma altura, estructura y tipografia.
function Hero({ image, eyebrow, title, subtitle, primary, secondary, note, aside }) {
  const content = (
    <>
      {eyebrow ? <p className="boj-hero-eyebrow">{eyebrow}</p> : null}
      <h1 className="boj-hero-title">{title}</h1>
      {subtitle ? <p className="boj-hero-subtitle">{subtitle}</p> : null}
      {primary || secondary ? (
        <div className="boj-hero-actions">
          <HeroAction action={primary} variant="mock-btn-primary" />
          <HeroAction action={secondary} variant="mock-btn-outline" />
        </div>
      ) : null}
      {note ? (
        <p className="boj-hero-note">
          <ShieldCheck size={16} aria-hidden="true" />
          <span>{note}</span>
        </p>
      ) : null}
    </>
  );

  return (
    <section className="boj-hero">
      {image ? <img className="boj-hero-bg" src={image} alt="" aria-hidden="true" /> : null}
      <div className="boj-hero-shade" aria-hidden="true" />
      <div className={`mock-home-container boj-hero-inner${aside ? " boj-hero-inner--with-aside" : ""}`}>
        {aside ? (
          <>
            <div className="boj-hero-copy">{content}</div>
            <div className="boj-hero-aside">{aside}</div>
          </>
        ) : content}
      </div>
    </section>
  );
}

function HomeHeroNavigator() {
  const paths = [
    {
      icon: "TriangleAlert",
      title: "Servicios industriales",
      text: "Diagnóstico y asistencia para recuperar la operación.",
      href: "/servicios",
    },
    {
      icon: "GraduationCap",
      title: "Capacitación técnica",
      text: "Capacitación aplicada a problemas reales de planta.",
      href: "/cursos",
    },
    {
      icon: "MonitorCog",
      title: "Probar App BOJ S7-PLC",
      text: "Una guía digital para ordenar síntomas e hipótesis.",
      href: "/app",
    },
  ];

  return (
    <div className="home-hero-navigator">
      <span className="home-hero-navigator-eyebrow">ELIGE TU PUNTO DE ENTRADA</span>
      <h2>¿Qué necesitas resolver?</h2>
      <nav aria-label="Accesos a las soluciones principales">
        {paths.map((path) => (
          <a href={path.href} key={path.href}>
            <span className="home-hero-navigator-icon">
              <Icon name={path.icon} size={21} />
            </span>
            <span>
              <strong>{path.title}</strong>
              <small>{path.text}</small>
            </span>
            <ArrowRight size={17} aria-hidden="true" />
          </a>
        ))}
      </nav>
    </div>
  );
}

function CourseHeroPreview() {
  return (
    <aside className="course-hero-preview" aria-label="Vista previa de la oferta del curso">
      <div className="course-hero-preview-media">
        <img src={manualPreviewImages[0]} alt="Portada del manual de diagnóstico S7-300/400" />
        <span>Manual técnico profesional</span>
      </div>
      <div className="course-hero-preview-copy">
        <span>CURSO + APP PRO</span>
        <strong>{offer.course.price}</strong>
        <small>Pago único · Acceso permanente al curso</small>
        <ul>
          <li><CheckCircle2 size={15} aria-hidden="true" /> Método de diagnóstico aplicado</li>
          <li><CheckCircle2 size={15} aria-hidden="true" /> 1 mes de BOJ S7-PLC PRO</li>
        </ul>
      </div>
    </aside>
  );
}

function AppHeroDiagnosticPreview() {
  const stages = [
    { label: "Síntoma", value: "CPU STOP + BF" },
    { label: "Hipótesis", value: "Red o nodo remoto" },
    { label: "Verificación", value: "Evidencia priorizada" },
  ];

  return (
    <aside className="app-hero-diagnostic-preview" aria-label="Ejemplo visual del flujo de diagnóstico de BOJ S7-PLC PRO">
      <div className="app-hero-diagnostic-preview-head">
        <span>FLUJO REAL DE LA HERRAMIENTA</span>
        <small><span aria-hidden="true" /> CASO GUIADO</small>
      </div>
      <div className="app-hero-diagnostic-preview-screen app-hero-diagnostic-preview-screen--device-composite">
        <svg className="app-hero-diagnostic-preview-clip" aria-hidden="true" focusable="false">
          <defs>
            <clipPath id="app-hero-device-silhouette" clipPathUnits="objectBoundingBox">
              <rect x="0.0276" y="0.0199" width="0.8632" height="0.8234" rx="0.022" ry="0.039" />
              <rect x="0.7403" y="0.181" width="0.2119" height="0.7616" rx="0.031" ry="0.053" />
            </clipPath>
          </defs>
        </svg>
        <img
          src={appSadDevicePreview}
          alt="BOJ S7-PLC PRO en una computadora y un teléfono con el diagnóstico guiado visible"
        />
      </div>
      <ol className="app-hero-diagnostic-preview-stages">
        {stages.map((stage, index) => (
          <li key={stage.label}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <small>{stage.label}</small>
              <strong>{stage.value}</strong>
            </div>
          </li>
        ))}
      </ol>
    </aside>
  );
}

function AppQuickCommercialAccess() {
  const subscription = appLicensePlans.find(({ title }) => title === "Suscripción mensual");
  const oneTime = appLicensePlans.find(({ title }) => title === "Mensual de pago único");

  return (
    <section className="app-pro-quick-access" aria-labelledby="app-pro-quick-access-title">
      <div className="mock-home-container app-pro-quick-access-inner">
        <div className="app-pro-quick-access-heading">
          <span>EMPIEZA SIN COMPLICACIONES</span>
          <h2 id="app-pro-quick-access-title">Prueba el flujo y elige la licencia cuando estés listo.</h2>
        </div>
        <dl className="app-pro-quick-access-facts">
          <div>
            <dt>Prueba gratuita</dt>
            <dd>{appTrialPlan.price} · 48 horas</dd>
          </div>
          <div>
            <dt>Suscripción</dt>
            <dd>{subscription.price} por mes</dd>
          </div>
          <div>
            <dt>Pago único</dt>
            <dd>Desde {oneTime.price}</dd>
          </div>
        </dl>
        <div className="app-pro-quick-access-actions">
          <a
            className="mock-btn mock-btn-primary"
            href={appProductUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => track("app_trial_click", { source: "quick_access" })}
          >
            Probar gratis <ExternalLink size={16} />
          </a>
          <a className="app-pro-quick-access-link" href="#planes-pro">
            Ver planes y precios <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  return <HomeLandingRedesign />;
}

function HomeLandingRedesign() {
  return (
    <div className="mock-home">
      <Hero
        image={heroInicio}
        eyebrow="Automatización y diagnóstico industrial"
        title="Diagnóstico de fallas y automatización industrial en PLC Siemens"
        subtitle="Más de 15 años resolviendo fallas, paradas y puestas en marcha en planta. Servicios de automatización, un curso aplicado de diagnóstico y la app BOJ S7-PLC para mantenimiento industrial."
        primary={{ label: "Solicitar diagnóstico", href: whatsappUrl("Hola, escribo desde la web de BOJ para solicitar un diagnóstico industrial.") }}
        secondary={{ label: "Ver cursos", href: "/cursos" }}
        aside={<HomeHeroNavigator />}
      />

      <HomeClientStrip />

      <section className="mock-section mock-problems" data-home-section="problems">
        <div className="mock-home-container">
          <h2>Problemas que resolvemos.</h2>
          <p className="mock-problems-subtitle">
            Partimos del síntoma real: CPU detenida, SF/BF, red inestable, señales dudosas o equipos que dejaron de responder.
          </p>
          <div className="mock-problems-grid">
            {homeProblems.map((problem) => (
              <article className="mock-problem-item" key={problem.text}>
                <Icon name={problem.icon} size={36} />
                <span>{problem.text}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mock-tech-strip" data-home-section="tech">
        <div className="mock-home-container">
          <h2>Especialización técnica.</h2>
          <p className="mock-tech-subtitle">Tecnologías y áreas en las que trabajamos.</p>
          <div className="mock-tech-grid">
            {homeTechSpecialties.map((item) => (
              <article className="mock-tech-card" key={item.title}>
                <Icon name={item.icon} size={48} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mock-section mock-app" data-home-section="app">
        <div className="mock-home-container mock-app-grid">
          <div className="mock-app-copy">
            <h2>BOJ S7-PLC</h2>
            <p>
              App web para ordenar el diagnóstico de fallas en Siemens S7-300/400: síntomas, LEDs, hipótesis técnicas y guía de verificación.
            </p>
            <ul>
              <li>Ingreso de síntomas</li>
              <li>Hipótesis técnicas</li>
              <li>Guía de verificación</li>
            </ul>
            <a className="mock-btn mock-btn-primary" href="/app">
              Conocer la app <ArrowRight size={18} />
            </a>
          </div>
          <AppDiagnosticMockup />
        </div>
      </section>

      <HomeObrasTeaser />

      <section className="mock-final-cta" data-home-section="cta">
        <img src={plantVisual} alt="" aria-hidden="true" />
        <div className="mock-final-overlay" aria-hidden="true" />
        <div className="mock-home-container mock-final-content">
          <h2>¿Tienes una falla, una máquina detenida o necesitas formar a tu equipo?</h2>
          <p>Podemos ayudarte con diagnóstico, automatización y formación técnica aplicada.</p>
          <div className="mock-final-actions">
            <a
              className="mock-btn mock-btn-whatsapp"
              href={whatsappUrl("Hola, necesito consultar por una falla, máquina parada o capacitación técnica.")}
            >
              <Phone size={18} /> Contactar por WhatsApp
            </a>
            <a
              className="mock-btn mock-btn-outline"
              href="/contacto"
            >
              <Mail size={18} /> Enviar consulta técnica
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function HomeClientStrip() {
  return (
    <section className="mock-clients" data-home-section="clients">
      <div className="mock-home-container mock-clients-inner">
        <p className="mock-clients-label">Trabajos realizados para</p>
        <ul className="mock-clients-list">
          {homeClientNames.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
        <a className="mock-clients-link" href="/obras">
          Ver proyectos realizados <ArrowRight size={15} />
        </a>
      </div>
    </section>
  );
}

function HomeObrasTeaser() {
  const featured = projects.slice(0, 3);
  return (
    <section className="mock-section mock-obras" data-home-section="obras">
      <div className="mock-home-container">
        <h2>Obras realizadas</h2>
        <p className="mock-obras-subtitle">
          Ingeniería, programación, migraciones y puesta en marcha en plantas industriales. Los casos, clientes y alcances corresponden a trabajos realizados; las imágenes son ilustrativas.
        </p>
        <div className="mock-obras-grid">
          {featured.map((project, index) => (
            <article className="mock-obras-card" key={project.title}>
              <div className="mock-obras-media">
                <img src={getServiceWorkImage(projectWorkImageFiles[index]) || projectVisuals[index]} alt={`Imagen ilustrativa para ${project.title}`} loading="lazy" />
                <span className="works-image-disclaimer">Imagen ilustrativa</span>
                <span className="mock-obras-client">{project.client}</span>
              </div>
              <div className="mock-obras-body">
                <span className="mock-obras-year">{project.year}</span>
                <h3>{project.title}</h3>
                <p>{project.result}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mock-obras-cta">
          <a className="mock-btn mock-btn-primary" href="/obras">
            Ver todos los proyectos <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

function AppDiagnosticMockup({ language = "es" }) {
  const visualCopy = language === "en"
    ? {
        figure: "Real BOJ S7-PLC views on a computer and mobile phone",
        desktop: "Real BOJ S7-PLC view with CPU state diagnostics",
        mobileFrame: "Mobile view of BOJ S7-PLC",
        mobile: "Mobile BOJ S7-PLC view with CPU LED diagnostics",
      }
    : language === "pt"
      ? {
          figure: "Imagens reais do BOJ S7-PLC em computador e celular",
          desktop: "Imagem real do BOJ S7-PLC com diagnóstico pelo estado da CPU",
          mobileFrame: "Visualização móvel do BOJ S7-PLC",
          mobile: "Visualização móvel do BOJ S7-PLC com diagnóstico por LEDs da CPU",
        }
      : {
          figure: "Capturas reales de BOJ S7-PLC en computadora y teléfono móvil",
          desktop: "Captura real de BOJ S7-PLC con diagnóstico por estado de CPU",
          mobileFrame: "Vista mobile de BOJ S7-PLC",
          mobile: "Vista mobile de BOJ S7-PLC con diagnóstico por LEDs de CPU",
        };
  return (
    <figure className="mock-app-visual real-app-capture app-product-composition" aria-label={visualCopy.figure}>
      <div className="app-product-stage">
        <div className="app-desktop-frame">
          <div className="app-desktop-toolbar" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="real-app-screen app-desktop-screen">
            <img
              src={appRealCapture}
              alt={visualCopy.desktop}
              loading="lazy"
            />
          </div>
          <div className="app-laptop-base" aria-hidden="true" />
        </div>
        <div className="app-mobile-frame" aria-label={visualCopy.mobileFrame}>
          <div className="app-mobile-speaker" aria-hidden="true" />
          <img
            src={appScreenshot}
            alt={visualCopy.mobile}
            loading="lazy"
          />
        </div>
      </div>
    </figure>
  );
}

function LandingSectionHeader({ title, text }) {
  return (
    <div className="landing-section-header">
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

function SpecializationStrip() {
  return (
    <section className="specialization-strip">
      <div className="home-container">
        <h2>Especialistas en diagnóstico, automatización y mantenimiento industrial</h2>
        <div className="specialization-badges" aria-label="Sectores industriales">
          {specializationBadges.map((badge) => (
            <span key={badge.label}>
              <Icon name={badge.icon} size={20} />
              {badge.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceHomeCard({ service }) {
  return (
    <article className="service-home-card">
      <Icon name={service.icon} size={54} />
      <h3>{service.title}</h3>
      <p>{service.text}</p>
      <a href="/servicios" aria-label={`Ver detalle de ${service.title}`}>
        <ArrowRight size={20} />
      </a>
    </article>
  );
}

function CourseHomeCard({ course }) {
  return (
    <article className="course-home-card">
      <figure>
        <img src={course.image} alt="" loading="lazy" />
      </figure>
      <div>
        <span className="course-mode">
          <MonitorCog size={15} /> Curso en línea
        </span>
        <h3>{course.title}</h3>
        <p>{course.text}</p>
        <a href={`#${course.path}`}>
          Ver programa <ArrowRight size={17} />
        </a>
      </div>
    </article>
  );
}

function AcademyCard() {
  return (
    <article className="academy-home-card">
      <GraduationCap size={48} />
      <h3>Academia técnica BOJ</h3>
      <p>Formación aplicada a mantenimiento, diagnóstico y automatización real de planta.</p>
      <ul>
        <li>Cursos en línea y presenciales</li>
        <li>Materiales y recursos exclusivos</li>
        <li>Certificados de participación</li>
      </ul>
      <a className="home-btn primary" href="/cursos">
        Ver programas <ArrowRight size={18} />
      </a>
    </article>
  );
}

function AppHomeSection() {
  return (
    <section className="landing-section app-home">
      <div className="home-container app-home-grid">
        <div className="app-home-copy">
          <span className="section-badge">APP</span>
          <h2>App BOJ S7-PLC</h2>
          <h3>Asistencia técnica para diagnóstico orientativo</h3>
          <p>
            Herramienta digital para apoyar tareas de mantenimiento en sistemas Siemens S7-300/400 mediante criterios técnicos, síntomas ingresados y lógica de diagnóstico guiado.
          </p>
          <a className="home-btn secondary" href="/app">
            Conocer la app <ArrowRight size={18} />
          </a>
        </div>
        <AppProScreenshot />
      </div>
    </section>
  );
}

function AppProScreenshot() {
  return <AppDiagnosticMockup />;
}

function ProjectHomeCard({ project }) {
  return (
    <article className="project-home-card">
      <figure>
        <img src={project.image} alt="" loading="lazy" />
      </figure>
      <div>
        <h3>{project.title}</h3>
        <p>{project.text}</p>
        <a href="/obras">
          Ver detalle <ArrowRight size={17} />
        </a>
      </div>
    </article>
  );
}

function HomeContactSection() {
  return (
    <section className="landing-section contact-home">
      <div className="home-container contact-home-grid">
        <div className="contact-info-card">
          <h2>Contacto</h2>
          <ContactLine icon="MapPin" label="Ubicación" value={contact.location} />
          <ContactLine icon="Mail" label="Correo electrónico" value={contact.email} href={`mailto:${contact.email}`} />
          <ContactLine
            icon="Phone"
            label="WhatsApp"
            value={contact.whatsappDisplay}
            href={whatsappUrl("Hola, escribo desde la web de BOJ para realizar una consulta técnica.")}
          />
          <ContactLine icon="Clock" label="Atención" value="Lunes a viernes de 8:00 a 18:00" />
        </div>
        <LandingContactForm />
      </div>
    </section>
  );
}

function LandingContactForm() {
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("sending");
    setFeedback("");
    const data = new FormData(event.currentTarget);
    try {
      await sendContactForm({
        name: data.get("name") || "",
        email: data.get("email") || "",
        subject: data.get("subject") || "Consulta desde la web BOJ",
        message: data.get("message") || "",
        website: data.get("website") || "",
      });
      event.currentTarget.reset();
      setStatus("success");
      setFeedback("Consulta enviada. Respondemos normalmente dentro de 48 horas hábiles.");
      track("contact_form_submit", { location: "home" });
    } catch (error) {
      setStatus("error");
      setFeedback(error.message || "No se pudo enviar. También puede escribirnos por WhatsApp.");
    }
  }

  return (
    <form className="landing-contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <input name="name" placeholder="Nombre completo" required />
        <input name="email" type="email" placeholder="Correo electrónico" required />
      </div>
      <input name="subject" placeholder="Asunto" required />
      <textarea name="message" rows="5" placeholder="Mensaje" required />
      <input className="form-honeypot" name="website" tabIndex="-1" autoComplete="off" aria-hidden="true" />
      <button className="home-btn primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Enviando…" : "Enviar mensaje"} <ArrowRight size={18} />
      </button>
      {feedback ? <p className={`form-feedback ${status}`} role="status">{feedback}</p> : null}
    </form>
  );
}

function ServicesPage() {
  const scrollToServiceDetails = (event) => {
    event.preventDefault();
    document.getElementById("areas-de-servicio")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="services-redesign-page">
      <Hero
        image={heroServicios}
        eyebrow="Servicios industriales"
        title="Diagnóstico e ingeniería para resolver fallas y sostener la operación"
        subtitle="PLC, HMI, SCADA, redes, tableros e instrumentación. Relevamos el problema, ordenamos la causa probable y definimos el próximo paso técnico con evidencia de campo."
        primary={{ label: "Solicitar diagnóstico", href: whatsappUrl("Hola, escribo desde la web de BOJ para solicitar un diagnóstico industrial.") }}
        secondary={{ label: "Ver qué podemos resolver", href: "/servicios#areas-de-servicio", onClick: scrollToServiceDetails }}
        aside={(
          <aside className="services-intake-card" aria-label="Datos útiles para iniciar un diagnóstico">
            <p className="services-intake-eyebrow">Para orientar el primer contacto</p>
            <h2>¿Qué está pasando en planta?</h2>
            <ul>
              <li>
                <span>01</span>
                <div>
                  <strong>Falla o parada</strong>
                  <p>PLC, HMI, red, señal o accionamiento.</p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <strong>Equipo involucrado</strong>
                  <p>Marca, modelo y sector del proceso.</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <strong>Evidencia disponible</strong>
                  <p>Fotos, alarmas, backup o descripción breve.</p>
                </div>
              </li>
            </ul>
            <p className="services-intake-note">
              <ClipboardCheck size={18} aria-hidden="true" />
              <span>Con esos datos podemos ordenar alcance, riesgo y próximo paso técnico.</span>
            </p>
          </aside>
        )}
      />

      <section className="services-redesign-section services-areas-section" id="areas-de-servicio" data-surface="light">
        <div className="mock-home-container">
          <div className="services-section-heading services-area-heading">
            <h2>Qué necesitas resolver</h2>
            <p>Elige el punto de entrada más cercano al problema actual.</p>
          </div>
          <div className="services-area-grid">
            {servicesAreaCards.map((card) => (
              <article className="services-area-card" key={card.title}>
                <Icon name={card.icon} size={30} />
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-redesign-section services-main-section" id="servicios-principales" data-surface="dark">
        <div className="mock-home-container">
          <div className="services-section-heading services-main-heading">
            <h2>Cómo podemos intervenir</h2>
            <p>Alcance, aplicaciones y resultado esperado de cada servicio principal.</p>
          </div>
          <div className="services-main-grid">
            {mainServiceCards.map((service) => (
              <ServicePrimaryCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="services-field-section" data-surface="light">
        <div className="mock-home-container">
          <div className="services-section-heading services-field-heading">
            <h2>Experiencia en campo industrial</h2>
            <p>
              Intervenciones realizadas en plantas y procesos donde la continuidad operativa, el diagnóstico
              rápido y la puesta en marcha segura son críticos.
            </p>
          </div>
          <div className="services-field-grid">
            {servicesExperienceCards.map((card) => (
              <article className="services-field-card" key={card.title}>
                <Icon name={card.icon} size={30} />
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-redesign-section services-secondary-section" data-surface="dark">
        <div className="mock-home-container">
          <div className="services-section-heading services-secondary-heading">
            <h2>Servicios complementarios</h2>
            <p>Soporte técnico para señales, tableros y formación aplicada al mantenimiento industrial.</p>
          </div>
          <div className="services-secondary-grid">
            {secondaryServiceCards.map((service) => (
              <ServiceSecondaryCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="services-workflow-section" data-surface="light">
        <div className="mock-home-container">
          <div className="services-section-heading services-workflow-heading">
            <h2>Un método para intervenir con criterio</h2>
            <p>Del síntoma al próximo paso técnico, con evidencia, alcance claro y una intervención acorde al riesgo.</p>
          </div>
          <div className="services-workflow-grid">
            {serviceWorkflowCards.map((card) => (
              <article className="services-workflow-card" key={card.title}>
                <Icon name={card.icon} size={26} />
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-redesign-cta" data-surface="dark">
        <img src={plantVisual} alt="" aria-hidden="true" />
        <div className="services-redesign-cta-overlay" aria-hidden="true" />
        <div className="mock-home-container services-redesign-cta-content">
          <h2>Cuando una falla, migración o mejora requiere criterio técnico</h2>
          <p>
            La consulta puede iniciar con el síntoma, el PLC involucrado, fotos del tablero o una
            descripción breve del proceso. La respuesta inicial ordena alcance, riesgo y próximo paso técnico.
          </p>
          <div className="services-redesign-actions">
            <a
              className="mock-btn mock-btn-whatsapp"
              href={whatsappUrl("Hola, escribo desde la web de BOJ para consultar por un servicio técnico industrial.")}
            >
              <Phone size={18} /> Consultar por WhatsApp
            </a>
            <a className="mock-btn mock-btn-outline" href="/contacto">
              Ir a contacto <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function ServicePrimaryCard({ service }) {
  return (
    <article className="services-primary-card">
      <div className="services-primary-head">
        <span>
          <Icon name={service.icon} size={34} />
        </span>
        <div>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </div>
      </div>
      <div className="services-primary-body">
        <ServiceInfoBlock title="Aplicaciones">
          <ul>
            {service.applications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </ServiceInfoBlock>
        <ServiceInfoBlock title="Resultado esperado">
          <p>{service.result}</p>
        </ServiceInfoBlock>
        <ServiceInfoBlock title="Cuándo conviene consultar">
          <p>{service.when}</p>
        </ServiceInfoBlock>
      </div>
      <a
        className="services-consult-link"
        href={whatsappUrl(`Hola, escribo desde la web de BOJ para consultar por ${service.title}.`)}
      >
        Consultar este servicio <ArrowRight size={16} />
      </a>
    </article>
  );
}

function ServiceInfoBlock({ title, children }) {
  return (
    <div className="services-info-block">
      <h4>{title}</h4>
      {children}
    </div>
  );
}

function ServiceSecondaryCard({ service }) {
  return (
    <article className="services-secondary-card">
      <div>
        <Icon name={service.icon} size={28} />
        <h3>{service.title}</h3>
      </div>
      <p>{service.text}</p>
      <ul>
        {service.applications.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

function CoursesPage() {
  const scrollToCourses = (event) => {
    event.preventDefault();
    document.getElementById("cursos-disponibles")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="courses-redesign-page">
      <Hero
        image={heroCursos}
        eyebrow="Cursos"
        title="Cursos técnicos Siemens orientados a diagnóstico real de planta"
        subtitle="Formación aplicada para técnicos, instrumentistas, electricistas e ingenieros que necesitan diagnosticar, programar y actuar con criterio frente a fallas reales."
        primary={{ label: "Ver cursos disponibles", href: "/cursos", onClick: scrollToCourses }}
        secondary={{ label: "Consultar capacitación", href: whatsappUrl("Hola, escribo desde la web de BOJ para consultar por capacitación técnica industrial.") }}
      />

      <section className="courses-light-section">
        <div className="mock-home-container">
          <div className="courses-section-heading courses-section-heading-dark">
            <h2>Formación pensada para mantenimiento industrial</h2>
          </div>
          <div className="courses-benefit-grid">
            {coursesTrainingBenefits.map((item) => (
              <article className="courses-benefit-card" key={item.title}>
                <Icon name={item.icon} size={28} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="courses-available-section" id="cursos-disponibles">
        <div className="mock-home-container">
          <div className="courses-section-heading">
            <h2>Cursos disponibles</h2>
          </div>
          <div className="courses-available-list">
            {coursesAvailableCards.map((course) => (
              <CourseAvailableCard key={course.label} course={course} />
            ))}
          </div>
        </div>
      </section>

      <section className="courses-light-section courses-learning-section">
        <div className="mock-home-container">
          <div className="courses-section-heading courses-section-heading-dark">
            <h2>Qué aprende el alumno</h2>
          </div>
          <div className="courses-learning-grid">
            {coursesLearningBlocks.map((item) => (
              <article className="courses-learning-card" key={item.text}>
                <Icon name={item.icon} size={26} />
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="courses-final-cta">
        <div className="mock-home-container courses-final-cta-content">
          <h2>¿Buscas formación técnica para ti o para tu equipo?</h2>
          <p>
            Podemos orientarte según el nivel del grupo, el tipo de planta y el problema que necesitan resolver.
          </p>
          <div className="courses-actions">
            <a
              className="mock-btn mock-btn-primary"
              href={whatsappUrl("Hola, escribo desde la web de BOJ para consultar por capacitación técnica industrial.")}
            >
              Consultar capacitación <ArrowRight size={18} />
            </a>
            <a className="mock-btn mock-btn-outline" href="/cursos/s7-300-400">
              Ver curso S7-300/400 <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function CourseAvailableCard({ course }) {
  return (
    <article className="course-available-card">
      <div className="course-available-content">
        <div className="course-available-title-row">
          <span>
            <Icon name={course.icon} size={30} />
          </span>
          <h3>{course.title}</h3>
        </div>
        <div className="course-quick-facts">
          {course.quickFacts.map((fact) => (
            <div key={`${course.label}-${fact.title}`}>
              <Icon name={fact.icon} size={18} />
              <p>
                <strong>{fact.title}:</strong> {fact.text}
              </p>
            </div>
          ))}
        </div>
        <ul className="course-available-bullets">
          {course.bullets.map((item) => (
            <li key={item}>
              <CheckCircle2 size={16} />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="course-available-visual">
        <img src={course.image} alt="" aria-hidden="true" loading="lazy" />
        <div aria-hidden="true" />
        <span className="visual-disclaimer">Imagen ilustrativa</span>
        <strong>{course.label}</strong>
        <span className="course-status-badge">
          {course.upcoming ? "Próximamente" : "Disponible"}
        </span>
        <a className="mock-btn mock-btn-primary" href={course.path}>
          {course.upcoming ? "Ver adelanto" : "Ver curso"} <ArrowRight size={18} />
        </a>
      </div>
    </article>
  );
}

function S7CoursePage() {
  return <S7SalesLanding course={s7Course} eyebrow="Curso aplicado" />;
}

function S7ProofStrip() {
  return (
    <section className="s7-proof">
      <div className="s7-sales-container s7-proof-inner">
        <p className="s7-proof-label">
          <Factory size={17} aria-hidden="true" />
          Un método nacido en planta, no en un aula. Trabajos reales para:
        </p>
        <ul className="s7-proof-list">
          {s7ProofClients.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
        <a className="s7-proof-link" href="/obras">
          Ver obras reales <ArrowRight size={15} />
        </a>
      </div>
    </section>
  );
}

function S7MethodStrip() {
  return (
    <section className="s7-sales-section s7-method" data-surface="light">
      <div className="s7-sales-container">
        <div className="s7-sales-section-heading">
          <p className="s7-sales-kicker">El Método BOJ</p>
          <h2>Del síntoma a la causa probable, con evidencia. No con prueba y error.</h2>
          <p className="s7-method-lead">
            La misma secuencia que aplico en planta hace más de 15 años, ordenada para que la uses cuando la
            máquina está parada y la presión es alta.
          </p>
        </div>
        <div className="s7-method-grid">
          {metodoBojSteps.map((step, index) => (
            <div className="s7-method-step-wrap" key={step.num}>
              <article className="s7-method-step">
                <span className="s7-method-num">{step.num}</span>
                <span className="s7-method-icon">
                  <Icon name={step.icon} size={26} />
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
              {index < metodoBojSteps.length - 1 ? (
                <span className="s7-method-arrow" aria-hidden="true">
                  <ArrowRight size={22} />
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ManualFlipbook({ images, pages, variant = "full", orientation = "portrait", altPrefix = "Vista previa del manual" }) {
  const total = images.length;
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const go = (target) => setIndex((current) => (target + total) % total || 0);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "ArrowLeft") setIndex((c) => (c - 1 + total) % total);
      else if (event.key === "ArrowRight") setIndex((c) => (c + 1) % total);
      else if (event.key === "Escape") setZoom(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  useEffect(() => {
    if (!zoom) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [zoom]);

  if (!total) return null;
  const caption = pages[index]?.label || `Página ${index + 1}`;

  return (
    <div className={`s7-flip s7-flip-${variant} s7-flip-${orientation}`}>
      <div className="s7-flip-stage">
        <button type="button" className="s7-flip-nav s7-flip-prev" onClick={() => go(index - 1)} aria-label="Anterior">
          <ArrowRight size={variant === "card" ? 20 : 24} />
        </button>
        <button type="button" className="s7-flip-page" onClick={() => setZoom(true)} aria-label={`Ampliar: ${caption}`}>
          <img src={images[index]} alt={`${altPrefix} — ${caption}`} loading="lazy" />
          <span className="s7-flip-zoom" aria-hidden="true">
            <ScanSearch size={16} /> Ampliar
          </span>
        </button>
        <button type="button" className="s7-flip-nav s7-flip-next" onClick={() => go(index + 1)} aria-label="Siguiente">
          <ArrowRight size={variant === "card" ? 20 : 24} />
        </button>
      </div>
      <div className="s7-flip-bar">
        <span className="s7-flip-caption">{caption}</span>
        <span className="s7-flip-counter">{index + 1} / {total}</span>
      </div>
      {variant === "full" ? (
        <div className="s7-flip-thumbs" role="tablist" aria-label="Páginas del manual">
          {images.map((image, i) => (
            <button
              key={image}
              type="button"
              className={`s7-flip-thumb${i === index ? " active" : ""}`}
              onClick={() => setIndex(i)}
              aria-label={`Ir a la página ${i + 1}`}
              aria-selected={i === index}
              role="tab"
            >
              <img src={image} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      ) : null}

      {zoom
        ? createPortal(
            <div className={`s7-flip-lightbox s7-flip-${orientation}`} role="dialog" aria-modal="true" onClick={() => setZoom(false)}>
              <div className="s7-flip-lightbox-inner" onClick={(event) => event.stopPropagation()}>
                <button type="button" className="s7-flip-lightbox-close" onClick={() => setZoom(false)} aria-label="Cerrar vista ampliada">
                  <X size={20} />
                </button>
                <button type="button" className="s7-flip-nav s7-flip-prev" onClick={() => go(index - 1)} aria-label="Anterior">
                  <ArrowRight size={26} />
                </button>
                <img src={images[index]} alt={`${altPrefix} — ${caption}`} />
                <button type="button" className="s7-flip-nav s7-flip-next" onClick={() => go(index + 1)} aria-label="Siguiente">
                  <ArrowRight size={26} />
                </button>
                <span className="s7-flip-lightbox-caption">{caption} · {index + 1} / {total}</span>
              </div>
            </div>,
            document.body
          )
        : null}
    </div>
  );
}

function S7Testimonials({ background = "light" }) {
  const initials = (name) =>
    name
      .split(" ")
      .filter((part) => part && !part.endsWith("."))
      .slice(-2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();

  return (
    <section className={`s7-sales-section s7-testimonials s7-testimonials-${background}`} data-surface={background}>
      <div className="s7-sales-container">
        <div className="s7-sales-centered-heading">
          <p className="s7-sales-kicker">Lo que dicen los técnicos</p>
          <h2>Resultados reales en planta, no promesas.</h2>
        </div>
        <div className="s7-testimonials-grid">
          {s7Testimonials.map((item) => (
            <figure className="s7-testimonial-card" key={item.name}>
              <span className="s7-testimonial-mark" aria-hidden="true">“</span>
              <blockquote>{item.quote}</blockquote>
              <figcaption>
                <span className="s7-testimonial-avatar" aria-hidden="true">{initials(item.name)}</span>
                <span className="s7-testimonial-id">
                  <strong>{item.name}</strong>
                  <em>{item.role}</em>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

// Zona de compra parametrizada de la landing S7: única fuente del destino
// comercial. El corte a Hotmart (bloque 3B) se hace editando SOLO
// offer.course.checkout (status "live" + checkoutUrl), sin tocar JSX.
// En "pending" se renderiza el CTA vigente sin cambios; "preview" muestra un
// botón deshabilitado para revisar el estado futuro en un Preview.
function purchaseCtaTarget() {
  const checkout = offer.course.checkout;
  const hasCheckoutUrl = typeof checkout.checkoutUrl === "string" && checkout.checkoutUrl.trim() !== "";
  // live sin checkoutUrl NO es live: cae al CTA vigente (nunca un href vacío).
  const isCheckoutLive = checkout.status === "live" && hasCheckoutUrl;
  // Los claims finales exigen además la validación E2E del flujo (3B); abrir el
  // checkout en una prueba controlada NO exige flowValidated.
  const isCheckoutFlowValidated = isCheckoutLive && checkout.flowValidated === true;
  return {
    isLive: isCheckoutLive,
    isPreview: checkout.status === "preview",
    isFlowValidated: isCheckoutFlowValidated,
    href: isCheckoutLive ? checkout.checkoutUrl : whatsappUrl(offer.course.purchaseMessage),
    trackPayload: (source) => ({
      item: "curso_s7_app_pro",
      value: offer.course.priceValue,
      currency: offer.course.priceCurrency,
      source,
      ...(isCheckoutLive ? { payment: "hotmart" } : {}),
    }),
  };
}

function PurchaseCTA({ source, className, children }) {
  const target = purchaseCtaTarget();
  if (target.isPreview) {
    return (
      <span className={`${className} is-disabled`} aria-disabled="true">
        Pago disponible próximamente
      </span>
    );
  }
  return (
    <a
      className={className}
      href={target.href}
      target="_blank"
      rel="noreferrer"
      onClick={() => track("begin_checkout", target.trackPayload(source))}
    >
      {target.isLive ? offer.course.checkout.ctaLabel : children}
    </a>
  );
}

function S7SalesLanding({ course, eyebrow }) {
  const purchaseTarget = purchaseCtaTarget();
  const heroPurchaseAction = purchaseTarget.isPreview
    ? { label: "Pago disponible próximamente", href: "#", onClick: (event) => event.preventDefault() }
    : {
        label: purchaseTarget.isLive
          ? offer.course.checkout.ctaLabel
          : `Empezar ahora — Curso + App PRO · ${offer.course.price}`,
        href: purchaseTarget.href,
        external: true,
        onClick: () => track("begin_checkout", purchaseTarget.trackPayload("hero")),
      };
  // "Pago seguro · Acceso inmediato" solo con el flujo Hotmart validado E2E
  // (flowValidated). En pending, preview o live sin validar: copy neutral.
  const guaranteeNote = purchaseTarget.isFlowValidated
    ? "Pago seguro · Acceso inmediato · Garantía de 7 días"
    : "Garantía de 7 días · Acceso digital";
  const scrollToCourseSection = (event, sectionId) => {
    event.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const problemCards = [
    {
      icon: "Zap",
      title: "Fallas reales",
      text: "Situaciones habituales que enfrentas todos los días en planta.",
    },
    {
      icon: "MonitorCog",
      title: "Decisiones con criterio",
      text: "Evidencia, síntomas y pasos correctos para diagnosticar.",
    },
    {
      icon: "Clock",
      title: "Menos prueba y error",
      text: "Ordena la búsqueda y reduce los tiempos de máquina detenida.",
    },
    {
      icon: "ShieldCheck",
      title: "Enfocado en campo",
      text: "Herramientas y métodos que funcionan donde realmente se necesitan.",
    },
    {
      icon: "Network",
      title: "Relación entre síntomas, LEDs, red, módulos y señales",
      text: "Conecta las piezas y comprende el sistema completo.",
    },
    {
      icon: "ClipboardCheck",
      title: "Uso de la app PRO como apoyo",
      text: "Ayuda a ordenar hipótesis y verificaciones durante el diagnóstico.",
    },
  ];

  const learningCards = [
    {
      icon: "Cable",
      title: "Perder el miedo a conectarte al PLC",
      text: "Buenas prácticas para entrar online con STEP 7 / SIMATIC Manager, leer hardware y diagnosticar sin intervenir a ciegas.",
    },
    {
      icon: "MonitorCog",
      title: "Leer hardware online con STEP 7 / SIMATIC Manager",
      text: "Comprende el sistema con criterio profesional.",
    },
    {
      icon: "Cpu",
      title: "Interpretar estados RUN/STOP/SF/BF",
      text: "Qué significan realmente y qué acción tomar.",
    },
    {
      icon: "ClipboardCheck",
      title: "Usar Diagnostic Buffer con criterio técnico",
      text: "Extrae, filtra y analiza los eventos relevantes.",
    },
    {
      icon: "Network",
      title: "Diagnosticar PROFIBUS DP",
      text: "Fallas típicas en red, esclavos y comunicación.",
    },
    {
      icon: "CircuitBoard",
      title: "Diferenciar falla de campo, red, módulo o lógica",
      text: "Localiza el origen del problema sin perder tiempo.",
    },
    {
      icon: "Brain",
      title: "Construir una hipótesis defendible",
      text: "Antes de intervenir, define qué debes verificar.",
    },
    {
      icon: "RefreshCcw",
      title: "Reducir prueba y error cuando la máquina está parada",
      text: "Método sistemático para diagnosticar rápido y bien.",
    },
  ];

  const courseIncludes = [
    {
      title: "Método BOJ de diagnóstico industrial",
      text: "Secuencia práctica para ordenar síntomas, LEDs, eventos, red, módulos y señales antes de intervenir el PLC.",
    },
    {
      title: "Material técnico aplicado",
      text: "Guías estructuradas con criterio de campo para estudiar, consultar y usar como apoyo durante diagnósticos reales.",
    },
    {
      title: "Casos de falla y razonamiento técnico",
      text: "Situaciones típicas de STOP, SF/BF, PROFIBUS, módulos, señales y fallas intermitentes explicadas desde la lógica de mantenimiento.",
    },
    {
      title: "STEP 7 Classic / SIMATIC Manager",
      text: "Criterio para conectarse, leer HW Config Online, revisar Diagnostic Buffer y analizar el sistema sin intervenir a ciegas.",
    },
  ];

  const appIncludes = [
    "Diagnóstico por síntomas, LEDs, red, módulos y señales",
    "Hipótesis técnicas priorizadas",
    "Guía paso a paso",
    "Uso sin conexión hasta 2 días",
    "Acceso desde navegador e instalación como app",
  ];

  const appHighlights = [
    { icon: "CalendarCheck", label: "1 mes de acceso" },
    { icon: "Smartphone", label: "1 dispositivo" },
  ];

  const audienceItems = [
    { icon: "Wrench", title: "Técnicos de mantenimiento industrial" },
    { icon: "Settings", title: "Automatistas y programadores PLC" },
    { icon: "Zap", title: "Electricistas de planta" },
    { icon: "Gauge", title: "Instrumentistas" },
    { icon: "Building2", title: "Empresas con PLC Siemens S7-300/400" },
    { icon: "GraduationCap", title: "Centros de formación técnica" },
  ];

  const offerIncludes = [
    "Curso aplicado de diagnóstico S7-300/400",
    "Método BOJ de diagnóstico industrial",
    "Material técnico aplicado y guías técnicas",
    "Casos de falla y razonamiento técnico",
    "STEP 7 Classic / SIMATIC Manager / HW Config / Diagnostic Buffer",
    "1 mes de BOJ S7-PLC PRO",
    "Uso sin conexión hasta 2 días",
  ];

  const mistakes = [
    "Perder tiempo con prueba y error.",
    "Cambiar módulos sin hipótesis clara.",
    "Interpretar mal LEDs y estados.",
    "No detectar fallas de red PROFIBUS.",
    "No registrar síntomas y evidencia.",
    "Agravar el problema por intervenir sin criterio.",
  ];

  const courseFaqItems = [
    {
      question: "¿Qué recibo exactamente al comprar?",
      answer: "Recibes un conjunto profesional de recursos de diagnóstico: material técnico estructurado, documentos PDF de consulta, método de análisis, casos de fallas reales y 1 mes de acceso a BOJ S7-PLC PRO.",
    },
    {
      question: "¿El curso incluye la APP PRO?",
      answer: "Sí. La compra incluye el curso Diagnóstico S7-300/400 y 1 mes de acceso a BOJ S7-PLC PRO.",
    },
    {
      question: "¿Por cuánto tiempo tengo la APP PRO?",
      answer: "Incluye 1 mes de APP PRO para 1 dispositivo. Cuando finaliza el mes, puedes renovarla si quieres seguir utilizándola.",
    },
    {
      question: "¿Sirve para S7-300 y S7-400?",
      answer: "Sí. Está orientado a diagnóstico de sistemas Siemens S7-300/400, especialmente CPU, LEDs, Diagnostic Buffer, PROFIBUS, módulos, señales y fallas de campo.",
    },
    {
      question: "¿Me ayuda a conectarme al PLC con más seguridad?",
      answer: "Sí. El curso te ayuda a entender qué mirar antes y durante una conexión online: estado de CPU, hardware, Diagnostic Buffer, red, módulos y señales. No reemplaza los procedimientos de seguridad de planta, pero te ayuda a intervenir con más criterio.",
    },
    {
      question: "¿Necesito tener STEP 7 instalado?",
      answer: "Es recomendable para practicar mejor los procedimientos. De todos modos, el material muestra qué observar en SIMATIC Manager, HW Config y Diagnostic Buffer para entender el flujo de diagnóstico.",
    },
    {
      question: "¿Necesito saber programar PLC para hacer el curso?",
      answer: "No es necesario ser programador avanzado. El curso está pensado para técnicos, electricistas, automatistas y personal de mantenimiento que necesitan diagnosticar fallas reales con más criterio.",
    },
    {
      question: "¿El curso es teórico o aplicado?",
      answer: "Es aplicado. Tiene base técnica, pero el foco está en diagnóstico real: ordenar síntomas, interpretar evidencias y decidir el próximo paso antes de intervenir.",
    },
    {
      question: "¿Está orientado a fallas reales de planta?",
      answer: "Sí. El enfoque no es programación genérica, sino diagnóstico aplicado: CPU en STOP, SF/BF, PROFIBUS, módulos caídos, señales incorrectas, fallas intermitentes y errores comunes de intervención.",
    },
    {
      question: "¿Puedo usarlo si trabajo en mantenimiento?",
      answer: "Sí. Está pensado especialmente para mantenimiento industrial, donde muchas veces hay poco tiempo, presión operativa y síntomas incompletos.",
    },
    {
      question: "¿Qué pasa cuando vence el mes de APP PRO?",
      answer: "El acceso mensual a la APP PRO finaliza. El material del curso permanece disponible según las condiciones de entrega definidas, y la app puede renovarse si necesitas continuar con acceso PRO.",
    },
    {
      question: "¿La APP PRO reemplaza al curso?",
      answer: "No. El curso te da el criterio técnico y la metodología. La APP PRO funciona como apoyo durante el diagnóstico para ordenar síntomas, hipótesis y verificaciones.",
    },
  ];

  const courseFaqColumns = [
    courseFaqItems.filter((_, index) => index % 2 === 0),
    courseFaqItems.filter((_, index) => index % 2 === 1),
  ];

  return (
    <div className="s7-sales-page">
      <Hero
        image={heroCursoS7}
        eyebrow="Diagnóstico industrial · Método BOJ"
        title="Diagnostica fallas reales en PLC S7-300/400 con método y evidencia."
        subtitle="Aprende una secuencia práctica para interpretar síntomas, reunir evidencia y llegar a la causa probable en CPU, PROFIBUS, módulos y señales. Formación técnica para mantenimiento industrial que necesita decidir con criterio bajo presión."
        primary={heroPurchaseAction}
        secondary={{ label: "Ver qué incluye", href: "/cursos/s7-300-400", onClick: (event) => scrollToCourseSection(event, "curso-s7-incluye") }}
        note={guaranteeNote}
        aside={<CourseHeroPreview />}
      />

      <S7ProofStrip />

      <section className="s7-sales-section s7-sales-dark s7-sales-learning" data-surface="dark">
        <div className="s7-sales-container">
          <div className="s7-sales-centered-heading">
            <p className="s7-sales-kicker">Qué vas a aprender</p>
          </div>
          <div className="s7-sales-learning-grid">
            {learningCards.map((item) => (
              <article className="s7-sales-dark-card" key={item.title}>
                <Icon name={item.icon} size={34} />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="s7-sales-section s7-sales-includes" id="curso-s7-incluye" data-surface="light">
        <div className="s7-sales-container">
          <div className="s7-sales-section-heading">
            <p className="s7-sales-kicker">Qué incluye</p>
            <h2>Una formación aplicada + una herramienta profesional para diagnosticar con más criterio en PLC Siemens S7-300/400.</h2>
          </div>

          <div className="s7-sales-include-grid">
            <article className="s7-sales-include-card s7-sales-include-course">
              <span className="s7-sales-include-number">1</span>
              <h3>Curso aplicado S7-300/400</h3>
              <div className="s7-sales-include-body">
                <div className="s7-sales-include-media">
                  <p className="s7-sales-include-preview-label">
                    <ScanSearch size={16} aria-hidden="true" /> Consulta las primeras 8 páginas del manual
                  </p>
                  <ManualFlipbook images={manualPreviewImages} pages={s7ManualPages} variant="card" />
                </div>
                <div className="s7-sales-include-main">
                  <div className="s7-sales-include-list">
                    {courseIncludes.map((item) => (
                      <div className="s7-sales-include-item" key={item.title}>
                        <CheckCircle2 size={20} aria-hidden="true" />
                        <div>
                          <h4>{item.title}</h4>
                          <p>{item.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="s7-sales-include-note">Basado en más de 15 años de experiencia en diagnóstico, mantenimiento y automatización industrial.</p>
                </div>
              </div>
            </article>

            <span className="s7-sales-plus" aria-hidden="true">+</span>

            <article className="s7-sales-include-card s7-sales-include-app">
              <span className="s7-sales-include-number">2</span>
              <h3>APP PRO - 1 mes de BOJ S7-PLC PRO</h3>
              <div className="s7-sales-include-body">
                <div className="s7-sales-include-media s7-sales-app-media">
                  <p className="s7-sales-include-preview-label">
                    <ScanSearch size={16} aria-hidden="true" /> Explora capturas reales de la app
                  </p>
                  <ManualFlipbook
                    images={s7AppCarousel.map((s) => s.image)}
                    pages={s7AppCarousel}
                    variant="card"
                    orientation="landscape"
                    altPrefix="Captura real de BOJ S7-PLC PRO"
                  />
                </div>
                <div className="s7-sales-app-copy">
                  <p className="s7-sales-app-lead">
                    Tu <strong>copiloto de diagnóstico</strong> frente al tablero: ordena síntomas, LEDs, hipótesis y verificaciones, paso a paso.
                  </p>
                  <div className="s7-sales-app-specs">
                    {appHighlights.map((item) => (
                      <span className="s7-sales-app-spec" key={item.label}>
                        <Icon name={item.icon} size={18} />
                        {item.label}
                      </span>
                    ))}
                  </div>
                  <div className="s7-sales-app-features">
                    <p className="s7-sales-app-features-title">Con la app PRO puedes:</p>
                    <ul>
                      {appIncludes.map((item) => (
                        <li key={item}>
                          <CheckCircle2 size={17} aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Slot del video demo (bloque 3A): se activa cargando
              offer.course.demoVideoUrl; con "" no se renderiza nada. */}
          {offer.course.demoVideoUrl ? (
            <div className="s7-sales-demo-video">
              <p className="s7-sales-include-preview-label">
                <ScanSearch size={16} aria-hidden="true" /> Consulta el sistema en acción
              </p>
              <div className="s7-sales-demo-video-frame">
                <iframe
                  src={offer.course.demoVideoUrl}
                  title="Video demo del sistema de diagnóstico BOJ"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <div className="s7-sales-confidence" data-surface="dark">
        <div className="s7-sales-container">
          <Icon name="ShieldCheck" size={26} />
          <p>Conéctate al PLC con confianza y diagnostica con <strong>criterio profesional.</strong></p>
        </div>
      </div>

      <section className="s7-sales-section s7-sales-program" id="curso-s7-programa" data-surface="light">
        <div className="s7-sales-container">
          <div className="s7-sales-section-heading">
            <p className="s7-sales-kicker">Programa del curso</p>
            <h2>El temario sigue la lógica real de un diagnóstico en planta.</h2>
          </div>
          <ol className="s7-sales-program-grid">
            {course.modules.map((module, index) => (
              <li className="s7-sales-program-item" key={module}>
                <span className="s7-sales-program-num">{String(index + 1).padStart(2, "0")}</span>
                <span>{module}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="s7-sales-section s7-sales-dark s7-sales-audience" data-surface="dark">
        <div className="s7-sales-container">
          <div className="s7-sales-section-heading s7-sales-section-heading-compact">
            <p className="s7-sales-kicker">Para quién es</p>
            <h2>Pensado para quienes tienen que resolver fallas reales con presión de producción, poco tiempo y síntomas incompletos.</h2>
          </div>
          <div className="s7-sales-audience-grid">
            {audienceItems.map((item) => (
              <article className="s7-sales-audience-card" key={item.title}>
                <Icon name={item.icon} size={42} />
                <h3>{item.title}</h3>
              </article>
            ))}
          </div>
          <p className="s7-sales-audience-note">No reemplaza la experiencia en campo: la ordena y la refuerza.</p>
        </div>
      </section>

      <section className="s7-sales-section s7-sales-instructor" data-surface="light">
        <div className="s7-sales-container s7-sales-instructor-grid">
          <img
            className="s7-sales-instructor-avatar"
            src={walterBojAvatar}
            alt="Walter Adrián Boj, especialista en automatización y diagnóstico de PLC Siemens"
            loading="lazy"
          />
          <div className="s7-sales-instructor-copy">
            <p className="s7-sales-kicker">Quién te enseña</p>
            <h2>Walter Adrián Boj</h2>
            <p>
              Especialista en automatización industrial y diagnóstico de PLC Siemens, con más de 15 años en planta:
              mantenimiento, programación, redes industriales, migraciones y fallas reales en S7-300/400. Este curso es
              el método que aplico en campo, no teoría de manual.
            </p>
            <a className="s7-sales-btn s7-sales-btn-secondary" href={contact.linkedin} target="_blank" rel="noreferrer">
              Ver perfil profesional
            </a>
          </div>
        </div>
      </section>

      <section className="s7-sales-section s7-sales-offer" id="curso-s7-compra" data-surface="dark">
        <div className="s7-sales-container">
          <div className="s7-sales-offer-heading">
            <p className="s7-sales-kicker">Accede al curso + BOJ S7-PLC PRO</p>
            <h2>Una oferta técnica para ordenar el diagnóstico antes de intervenir.</h2>
            <p>Una parada de máquina puede costar más que esta formación. El objetivo es que sepas ordenar el diagnóstico antes de cambiar hardware, reiniciar equipos o intervenir sin evidencia.</p>
          </div>

          <div className="s7-sales-offer-panel">
            <div className="s7-sales-offer-summary">
              <div className="s7-sales-offer-product">
                <span className="s7-sales-launch">
                  <CheckCircle2 size={15} aria-hidden="true" /> Pago único · curso con acceso permanente
                </span>
                <p className="s7-sales-kicker">Curso + licencia</p>
                <h2>Curso Diagnóstico S7-300/400 + APP PRO</h2>
                <span className="s7-sales-offer-tagline">Incluye 1 mes de BOJ S7-PLC PRO</span>
              </div>

              <div className="s7-sales-offer-price">
                <span className="s7-sales-offer-regular">Pago único</span>
                <strong>{offer.course.price}</strong>
                <p>Acceso permanente al curso + herramienta PRO por 1 mes.</p>
                <div className="s7-sales-valuestack">
                  <div className="s7-sales-valuestack-row">
                    <span>App BOJ S7-PLC PRO — 1 mes</span>
                    <span className="s7-sales-valuestack-value">vale 59 USD</span>
                  </div>
                  <div className="s7-sales-valuestack-row">
                    <span>Curso completo + Método BOJ</span>
                    <span className="s7-sales-valuestack-value">incluido</span>
                  </div>
                  <div className="s7-sales-valuestack-total">
                    <span>Pago único</span>
                    <strong>{offer.course.price}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="s7-sales-offer-content">
              <div className="s7-sales-offer-content-heading">
                <p className="s7-sales-kicker">Contenido de la oferta</p>
                <h3>Todo lo que recibes</h3>
              </div>

              <div className="s7-sales-offer-groups">
                <div className="s7-sales-offer-group">
                  <div className="s7-sales-offer-group-heading">
                    <Icon name="GraduationCap" size={22} />
                    <h4>Formación técnica</h4>
                  </div>
                  <ul className="s7-sales-offer-list">
                    {offerIncludes.slice(0, 5).map((item) => (
                      <li key={item}>
                        <CheckCircle2 size={18} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="s7-sales-offer-group s7-sales-offer-group-app">
                  <div className="s7-sales-offer-group-heading">
                    <Icon name="Smartphone" size={22} />
                    <h4>App PRO incluida</h4>
                  </div>
                  <ul className="s7-sales-offer-list">
                    {offerIncludes.slice(5).map((item) => (
                      <li key={item}>
                        <CheckCircle2 size={18} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* "Cómo funciona la compra" (bloque 3A): copy del flujo DEFINITIVO
                (Hotmart). Solo se renderiza con el flujo validado E2E
                (checkout live + flowValidated, corte del bloque 3B). */}
            {purchaseTarget.isFlowValidated ? (
              <div className="s7-sales-offer-process">
                <div className="s7-sales-offer-process-heading">
                  <p className="s7-sales-kicker">Compra y acceso</p>
                  <h3>Cómo funciona</h3>
                </div>
                <ol className="s7-sales-howto">
                  <li>
                    <strong>Pago seguro con Hotmart.</strong>
                    <span>Proceso de pago cifrado, con tarjeta y los medios de pago disponibles en tu país.</span>
                  </li>
                  <li>
                    <strong>Entrega digital.</strong>
                    <span>Al acreditarse el pago, recibes en tu correo electrónico el acceso al material.</span>
                  </li>
                  <li>
                    <strong>Activación de tu mes de App PRO.</strong>
                    <span>Con el mismo correo electrónico de la compra. Garantía de 7 días.</span>
                  </li>
                </ol>
              </div>
            ) : null}

            <div className="s7-sales-offer-decision">
              <div className="s7-sales-offer-actions">
                <PurchaseCTA source="offer" className="s7-sales-btn s7-sales-btn-primary">
                  Comprar curso + APP PRO
                </PurchaseCTA>
                <a
                  className="s7-sales-btn s7-sales-btn-secondary"
                  href={appProductUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track("app_trial_click", { source: "offer" })}
                >
                  Probar APP durante 48 horas
                </a>
              </div>
              <div className="s7-sales-offer-decision-copy">
                <p className="s7-sales-offer-guarantee">
                  <ShieldCheck size={18} aria-hidden="true" />
                  {guaranteeNote}
                </p>
                <p className="s7-sales-offer-crosslink">
                  ¿Vas a utilizar la app de forma recurrente o en equipo? Consulta los{" "}
                  <a href="/app">planes PRO (6 meses / varios dispositivos)</a>.
                </p>
                <p className="s7-sales-offer-note">Acceso digital. Verifica siempre las conclusiones en campo antes de intervenir.</p>
              </div>
            </div>

            <p className="s7-sales-offer-anchor">
              <TriangleAlert size={18} aria-hidden="true" />
              <span>
                ¿Cuánto cuesta una hora de línea parada en tu planta? Casi siempre, mucho más que esto. Un solo
                módulo cambiado a ciegas ya vale más que el curso completo.
              </span>
            </p>
          </div>
        </div>
      </section>

      <S7MethodStrip />

      <section className="s7-sales-section s7-sales-dark s7-sales-problem" data-surface="dark">
        <div className="s7-sales-container s7-sales-problem-grid">
          <div className="s7-sales-section-copy">
            <p className="s7-sales-kicker">Qué problema resuelve</p>
            <h2>No es un curso de programación. Es para diagnosticar fallas reales en condiciones de planta.</h2>
            <p>Aprende a pensar como un técnico experto cuando la máquina está detenida y la presión operativa es alta.</p>
          </div>
          <div className="s7-sales-problem-cards">
            {problemCards.map((item) => (
              <article className="s7-sales-light-card" key={item.title}>
                <Icon name={item.icon} size={46} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="s7-sales-section s7-sales-mistakes s7-sales-mistakes-light" data-surface="light">
        <div className="s7-sales-container s7-sales-problem-grid">
          <div className="s7-sales-section-copy">
            <p className="s7-sales-kicker">Errores que este curso ayuda a evitar</p>
            <h2>Diagnosticar con método evita decisiones costosas.</h2>
          </div>
          <div className="s7-sales-problem-cards s7-sales-mistakes-cards">
            {mistakes.map((item) => (
              <article className="s7-sales-light-card" key={item}>
                <TriangleAlert size={46} aria-hidden="true" />
                <h3>{item}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <S7Testimonials background="dark" />

      <section className="s7-sales-section s7-sales-faq" data-surface="light">
        <div className="s7-sales-container">
          <div className="s7-sales-section-heading">
            <p className="s7-sales-kicker">Preguntas frecuentes</p>
            <h2>Antes de comprar el curso</h2>
          </div>
          <div className="s7-sales-faq-grid">
            {courseFaqColumns.map((column, columnIndex) => (
              <div className="s7-sales-faq-column" key={`faq-column-${columnIndex + 1}`}>
                {column.map((item) => (
                  <details className="s7-sales-faq-item" key={item.question}>
                    <summary>
                      <span>{item.question}</span>
                      <ChevronDown size={18} aria-hidden="true" />
                    </summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="s7-sales-final-cta" data-surface="dark">
        <div className="s7-sales-container">
          <div className="s7-sales-final-cta-panel">
            <div className="s7-sales-final-intro">
              <p className="s7-sales-final-headline">Si trabajas con PLC Siemens S7-300/400 y necesitas diagnosticar con mayor criterio, este curso te ofrece método, estructura y apoyo técnico para intervenir mejor.</p>
              <span className="s7-sales-final-divider" aria-hidden="true" />
              <p className="s7-sales-final-guarantee">
                <ShieldCheck size={18} aria-hidden="true" />
                {guaranteeNote}
              </p>
            </div>
            <div className="s7-sales-final-col">
              <PurchaseCTA source="final_cta" className="s7-sales-btn s7-sales-btn-primary s7-sales-final-primary">
                Comprar curso + APP PRO — {offer.course.price}
              </PurchaseCTA>
              <div className="s7-sales-final-secondary-row">
                <a className="s7-sales-btn s7-sales-btn-secondary" href="/cursos/s7-300-400" onClick={(event) => scrollToCourseSection(event, "curso-s7-incluye")}>
                  Ver qué incluye
                </a>
                <a
                  className="s7-sales-btn s7-sales-btn-secondary"
                  href={appProductUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track("app_trial_click", { source: "final" })}
                >
                  Probar APP durante 48 horas
                </a>
              </div>
              <p className="s7-sales-final-note"><span>Acceso digital · Curso + APP PRO</span></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function TiaCoursePage() {
  return (
    <CourseLanding
      course={tiaCourse}
      eyebrow="Curso introductorio"
      visual="tia"
      afterHero={<CoursePreparationStrip />}
    />
  );
}

function CoursePreparationStrip() {
  return (
    <section className="course-preparation-strip" aria-label="Estado del curso">
      <div className="section-container course-preparation-strip-inner">
        <span className="course-preparation-strip-icon" aria-hidden="true">
          <Clock size={21} />
        </span>
        <div className="course-preparation-strip-copy">
          <span>CURSO EN PREPARACIÓN</span>
          <strong>Estamos desarrollando el programa y sus materiales técnicos.</strong>
          <p>La inscripción todavía no está habilitada. Publicaremos aquí la información cuando el curso esté disponible.</p>
        </div>
      </div>
    </section>
  );
}

function CourseLanding({ course, eyebrow, visual, ctas = [], afterHero = null }) {
  return (
    <PageShell
      eyebrow={eyebrow}
      title={course.title}
      subtitle={course.subtitle}
      heroImage={heroCursoTia}
      heroPrimary={ctas[0]}
      heroSecondary={ctas[1]}
      afterHero={afterHero}
    >
      <div className="training-strip page-strip">
        <span>Aplicado a mantenimiento</span>
        <span>Diagnóstico online</span>
        <span>Casos de planta</span>
        <span>Procedimiento técnico</span>
      </div>
      <div className="course-landing">
        <div className="course-content">
          {course.positioning ? <InfoBlock title="Propuesta técnica del curso" items={course.positioning} /> : null}
          <InfoBlock title="Para quién es" items={course.audience} />
          {course.learnItems ? <InfoBlock title="Contenidos técnicos principales" items={course.learnItems} /> : null}
          {course.includes ? <InfoBlock title="Qué incluye" items={course.includes} /> : null}
          <InfoBlock title="Capacidades al finalizar" items={course.outcomes} />
          {course.difference ? <InfoBlock title="Por qué este curso es diferente" items={course.difference} /> : null}
          {course.appValue ? <InfoBlock title="Valor de la app incluida" items={course.appValue} /> : null}
          <InfoBlock title={course.includes ? "Programa técnico" : "Contenido de base"} items={course.modules} numbered />
          <InfoBlock title="Impacto profesional y operativo" items={course.benefits} />
          <InfoBlock title="Errores técnicos que el curso ayuda a evitar" items={course.avoidMistakes} />
          {ctas.length > 0 ? (
            <div className="button-row">
              {ctas.map((cta, index) =>
                index === 0 ? (
                  <PrimaryLink key={cta.label} href={cta.href}>
                    {cta.label}
                  </PrimaryLink>
                ) : (
                  <SecondaryLink key={cta.label} href={cta.href}>
                    {cta.label}
                  </SecondaryLink>
                )
              )}
            </div>
          ) : null}
        </div>
        <CourseVisual type={visual} course={course} />
      </div>
    </PageShell>
  );
}

function AppPage() {
  const pricingCards = [appTrialPlan, ...appLicensePlans];
  const [activeScreenshot, setActiveScreenshot] = useState(null);

  useEffect(() => {
    if (!activeScreenshot) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveScreenshot(null);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeScreenshot]);

  return (
    <div className="app-pro-page">
      <Hero
        image={appProHeroLaptopVisual}
        eyebrow="ASISTENCIA DE DIAGNÓSTICO EN CAMPO"
        title="Antes de conectar STEP 7, identifica qué debes revisar."
        subtitle="Ingresa los síntomas, los LEDs y las condiciones que observas en el panel de control. BOJ S7-PLC PRO ordena las causas posibles, prioriza las verificaciones y te ayuda a distinguir si el problema apunta a la CPU, la red, un módulo, la alimentación, una señal o la lógica."
        primary={{
          label: "Probar gratis durante 48 horas",
          href: appProductUrl,
          external: true,
          onClick: () => track("app_trial_click", { source: "app_hero" }),
        }}
        secondary={{
          label: "Ver planes PRO",
          href: "#planes-pro",
          onClick: (event) => {
            event.preventDefault();
            document.getElementById("planes-pro")?.scrollIntoView({ behavior: "smooth", block: "start" });
          },
        }}
        note="La app no se conecta directamente al PLC ni reemplaza STEP 7. Orienta el diagnóstico inicial y prepara una intervención con mayor criterio."
        aside={<AppHeroDiagnosticPreview />}
      />

      <S7ProofStrip />

      <AppQuickCommercialAccess />

      <section className="app-pro-positioning-section" aria-labelledby="app-pro-positioning-title">
        <div className="mock-home-container">
          <div className="app-pro-positioning-heading">
            <span className="app-pro-positioning-eyebrow">DOS ETAPAS, UN MISMO DIAGNÓSTICO</span>
            <h2 id="app-pro-positioning-title">Orienta el diagnóstico primero. Profundiza sólo cuando sea necesario.</h2>
            <p>
              BOJ S7-PLC PRO organiza la primera respuesta en campo y te ayuda a llegar al diagnóstico online con una
              búsqueda más acotada.
            </p>
          </div>

          <div className="app-pro-positioning-route" aria-label="Recorrido desde el síntoma hasta la decisión técnica">
            <div className="app-pro-positioning-route-step">
              <span className="app-pro-positioning-route-number">01</span>
              <Icon name="Smartphone" size={27} />
              <div>
                <small>PRIMERA RESPUESTA</small>
                <h3>Orientación con BOJ S7-PLC</h3>
                <p>Registra síntomas, LEDs y condiciones de campo desde el teléfono móvil, la tableta o el navegador. La app conserva el contexto y prioriza qué verificar primero.</p>
              </div>
            </div>
            <ArrowRight className="app-pro-positioning-route-arrow" size={24} aria-hidden="true" />
            <div className="app-pro-positioning-route-step">
              <span className="app-pro-positioning-route-number">02</span>
              <Icon name="MonitorCog" size={27} />
              <div>
                <small>CONFIRMACIÓN ONLINE</small>
                <h3>Diagnóstico con STEP 7</h3>
                <p>Llegas con una hipótesis técnica y una búsqueda más acotada para revisar hardware, eventos, bloques o registros.</p>
              </div>
            </div>
            <ArrowRight className="app-pro-positioning-route-arrow" size={24} aria-hidden="true" />
            <div className="app-pro-positioning-route-decision">
              <Icon name="ShieldCheck" size={27} />
              <div>
                <small>DECISIÓN SEGURA</small>
                <strong>El técnico evalúa la evidencia antes de intervenir.</strong>
              </div>
            </div>
          </div>

          <p className="app-pro-positioning-summary">
            <strong>BOJ S7-PLC orienta.</strong>
            <span>STEP 7 confirma.</span>
            <span>El técnico decide.</span>
          </p>
        </div>
      </section>

      <section className="app-pro-problems-how-section">
        <div className="mock-home-container app-pro-problems-how-grid">
          <div className="app-pro-problems-panel">
            <div className="app-pro-panel-heading">
              <span className="app-pro-section-kicker">DIAGNÓSTICO EN CAMPO</span>
              <h2>Problemas que ayuda a resolver</h2>
              <p>Identifica el tipo de falla y ordena la búsqueda antes de intervenir el equipo.</p>
            </div>
            <div className="app-pro-problem-grid">
              {appProblemItems.map((item) => (
                <article className="app-pro-problem-item" key={item.title}>
                  <Icon name={item.icon} size={26} />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="app-pro-how-panel">
            <div className="app-pro-panel-heading">
              <span className="app-pro-section-kicker">FLUJO DE TRABAJO</span>
              <h2>Cómo funciona</h2>
              <p>Del síntoma a una hipótesis priorizada y una verificación concreta en campo.</p>
            </div>
            <div className="app-pro-how-steps">
              {appHowItWorks.map((item, index) => (
                <div className="app-pro-how-step-wrap" key={item.title}>
                  <article className="app-pro-how-step">
                    <span className="app-pro-step-number">{index + 1}</span>
                    <div className="app-pro-step-icon-circle">
                      <Icon name={item.icon} size={28} />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                  {index < appHowItWorks.length - 1 ? (
                    <span className="app-pro-step-arrow" aria-hidden="true">
                      <ArrowRight size={24} />
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="app-pro-dark-section app-pro-includes-section">
        <div className="mock-home-container">
          <div className="app-pro-section-heading">
            <span className="app-pro-section-kicker">HERRAMIENTAS DE DIAGNÓSTICO</span>
            <h2>Qué incluye BOJ S7-PLC PRO</h2>
            <p>Un entorno práctico para consultar, contrastar y documentar el diagnóstico desde el navegador.</p>
          </div>
          <div className="app-pro-include-grid">
            {appProIncludes.map((item) => (
              <article className="app-pro-include-card" key={item.title}>
                <Icon name={item.icon} size={30} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="app-pro-real-language-section">
        <div className="mock-home-container app-pro-real-language-grid">
          <div>
            <h2>Capturas reales de la herramienta profesional</h2>
            <div className="app-pro-real-view-grid">
              {appRealViews.map((item) => (
                <article className="app-pro-real-view-card" key={item.title}>
                  <figure>
                    <button
                      className="app-pro-real-view-trigger"
                      type="button"
                      onClick={() => setActiveScreenshot(item)}
                      aria-label={`Ampliar captura: ${item.title}`}
                    >
                      <img src={item.image} alt={item.title} loading="lazy" style={{ objectPosition: item.position }} />
                    </button>
                  </figure>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="app-pro-language-card">
            <h2>Disponible en 6 idiomas</h2>
            <div className="app-pro-language-list">
              {appLanguages.map((language) => (
                <span key={language}>{language}</span>
              ))}
            </div>
            <p>Interfaz preparada para técnicos, empresas y equipos de mantenimiento en distintos países.</p>
          </div>
        </div>
      </section>

      {activeScreenshot ? (
        <div className="app-pro-lightbox" role="dialog" aria-modal="true" aria-labelledby="app-pro-lightbox-title" onClick={() => setActiveScreenshot(null)}>
          <div className="app-pro-lightbox-panel" onClick={(event) => event.stopPropagation()}>
            <button className="app-pro-lightbox-close" type="button" onClick={() => setActiveScreenshot(null)} aria-label="Cerrar captura ampliada">
              <X size={20} />
            </button>
            <img src={activeScreenshot.image} alt={activeScreenshot.title} />
            <div className="app-pro-lightbox-copy">
              <h2 id="app-pro-lightbox-title">{activeScreenshot.title}</h2>
              <p>{activeScreenshot.text}</p>
            </div>
          </div>
        </div>
      ) : null}

      <section className="app-pro-plans-section" id="planes-pro">
        <div className="mock-home-container">
          <div className="app-pro-section-heading">
            <span className="app-pro-section-kicker">LICENCIAS Y MODALIDADES</span>
            <h2>Elige tu licencia PRO</h2>
            <p>Compara la renovación, la duración, los dispositivos y el uso sin conexión antes de elegir.</p>
            <p className="app-pro-plans-crosslink">
              <strong>Profesional</strong> y <strong>Empresarial</strong> incluyen el{" "}
              <a href="/cursos/s7-300-400">curso de diagnóstico S7-300/400</a>.
            </p>
          </div>
          <nav className="app-pro-plan-guide" aria-labelledby="app-pro-plan-guide-title">
            <div className="app-pro-plan-guide-heading">
              <span>DECISIÓN RÁPIDA</span>
              <h3 id="app-pro-plan-guide-title">¿Cuál encaja mejor con tu forma de trabajo?</h3>
            </div>
            <ul>
              {appPlanDecisionGuide.map((option) => (
                <li key={option.target}>
                  <a href={`#${option.target}`} aria-label={`${option.context}: ver plan ${option.title}`}>
                    <span>{option.context}</span>
                    <strong>{option.title}</strong>
                    <small>{option.detail}</small>
                    <span className="app-pro-plan-guide-link">
                      Ver plan <ArrowRight size={15} aria-hidden="true" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="app-pro-plan-grid">
            {pricingCards.map((plan) => (
              <article
                className={`app-pro-plan-card${plan.badge ? " featured" : ""}${plan.title === "Prueba gratuita" ? " trial" : ""}`}
                id={appPlanCardIds[plan.title]}
                key={plan.title}
                tabIndex={-1}
              >
                {plan.badge ? <span className="app-pro-plan-badge">{plan.badge}</span> : null}
                <h3>{plan.title}</h3>
                <strong>{plan.price}</strong>
                <span className="app-pro-plan-meta">{plan.meta}</span>
                <ul>
                  {plan.bullets.map((item) => (
                    <li key={item}>
                      <CheckCircle2 size={15} /> {item}
                    </li>
                  ))}
                </ul>
                <a
                  className="mock-btn mock-btn-primary"
                  href={plan.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track("plan_click", { plan: plan.title })}
                >
                  {plan.button} <ExternalLink size={17} />
                </a>
              </article>
            ))}
          </div>
          <ul className="app-pro-purchase-confidence" aria-label="Información antes de comprar">
            <li>
              <CheckCircle2 size={17} aria-hidden="true" /> Compra gestionada por Hotmart
            </li>
            <li>
              <CheckCircle2 size={17} aria-hidden="true" /> Precio y modalidad visibles antes de confirmar
            </li>
            <li>
              <CheckCircle2 size={17} aria-hidden="true" /> Activación con el correo electrónico utilizado en la compra
            </li>
          </ul>
          <aside className="app-pro-training-strip" aria-labelledby="app-pro-training-title">
            <div className="app-pro-training-copy">
              <span className="app-pro-training-eyebrow">FORMACIÓN TÉCNICA</span>
              <h3 id="app-pro-training-title">¿También necesitas formación?</h3>
              <p>Curso Diagnóstico S7-300/400 con acceso permanente + 1 mes de BOJ S7-PLC PRO.</p>
            </div>
            <div className="app-pro-training-action">
              <strong>{offer.course.price} · Pago único</strong>
              <a className="mock-btn mock-btn-outline" href="/cursos/s7-300-400">
                Ver curso y contenidos <ArrowRight size={17} aria-hidden="true" />
              </a>
            </div>
          </aside>
          <article className="app-pro-institutional">
            <Icon name="Landmark" size={34} />
            <div>
              <h3>Institucional / Centros de formación: Precio personalizado.</h3>
              <p>
                Condiciones especiales para instituciones educativas, centros de formación técnica, empresas
                con múltiples usuarios o programas corporativos.
              </p>
            </div>
            <a className="mock-btn mock-btn-outline" href="/contacto">
              Consultar condiciones <ArrowRight size={17} aria-hidden="true" />
            </a>
          </article>
        </div>
      </section>

      <section className="app-pro-dark-section app-pro-objection-section">
        <div className="mock-home-container app-pro-objection-grid">
          <div className="app-pro-objection-copy">
            <h2>¿No es solo una tabla de fallas?</h2>
            <p>
              No. Una tabla te da una lista; BOJ S7-PLC <strong>mantiene el contexto de tu síntoma</strong> y ordena
              las hipótesis según la evidencia que vas cargando: LEDs, Diagnostic Buffer, estado de red, módulos y
              señales. Te dice <strong>qué verificar primero y qué descartar</strong>, con el criterio de seguridad de
              cada paso. Es el método de un técnico con experiencia, no un listado para memorizar.
            </p>
          </div>
          <div className="app-pro-objection-compare">
            <article className="app-pro-objection-col app-pro-objection-bad">
              <h3>Una tabla / PDF</h3>
              <ul>
                <li><X size={15} aria-hidden="true" /> Lista fija de fallas</li>
                <li><X size={15} aria-hidden="true" /> No sigue tu síntoma</li>
                <li><X size={15} aria-hidden="true" /> No prioriza por evidencia</li>
                <li><X size={15} aria-hidden="true" /> Dependes de la memoria</li>
              </ul>
            </article>
            <article className="app-pro-objection-col app-pro-objection-good">
              <h3>BOJ S7-PLC</h3>
              <ul>
                <li><CheckCircle2 size={15} aria-hidden="true" /> Mantiene el contexto del caso</li>
                <li><CheckCircle2 size={15} aria-hidden="true" /> Guía por fases según el síntoma</li>
                <li><CheckCircle2 size={15} aria-hidden="true" /> Prioriza hipótesis por evidencia</li>
                <li><CheckCircle2 size={15} aria-hidden="true" /> Criterio de seguridad en cada paso</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="app-pro-value-row-section">
        <div className="mock-home-container app-pro-value-row-grid">
          <article className="app-pro-offline-card">
            <h2>Acceso, instalación y disponibilidad</h2>
            <p className="app-pro-offline-intro">
              El acceso fue pensado para adaptarse a distintas formas de trabajo: consulta rápida, uso desde escritorio y apoyo en campo.
            </p>
            <div className="app-pro-offline-items">
              {appAvailabilityItems.map((item) => (
                <div key={item.title}>
                  <Icon name={item.icon} size={34} />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
            <p className="app-pro-offline-note">
              Pensado para consulta rápida, acceso flexible y continuidad de trabajo en campo.
            </p>
          </article>
          <article className="app-pro-cost-card">
            <div>
              <h2>Una parada de planta puede costar más que una licencia</h2>
              <p>
                Cuando una máquina está detenida, cada minuto cuenta. BOJ S7-PLC PRO ayuda a ordenar síntomas,
                hipótesis y verificaciones antes de cambiar hardware, reiniciar equipos o intervenir sin evidencia.
              </p>
              <ul className="app-pro-cost-bullets">
                <li>Ordena síntomas e hipótesis antes de intervenir.</li>
                <li>Reduce prueba y error en momentos de presión.</li>
                <li>Ayuda a verificar evidencia antes de cambiar hardware o reiniciar equipos.</li>
              </ul>
              <strong className="app-pro-cost-emphasis">Menos prueba y error. Más criterio técnico.</strong>
              <p className="app-pro-cost-support">
                El objetivo no es reemplazar al técnico: es ayudarlo a decidir mejor en campo.
              </p>
            </div>
            <div className="app-pro-cost-visual" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <b>
                <TriangleAlert size={24} />
              </b>
            </div>
          </article>
          <article className="app-pro-audience-card">
            <h2>Para quién es BOJ S7-PLC PRO</h2>
            <p className="app-pro-audience-intro">
              Pensada para técnicos y equipos que necesitan ordenar un diagnóstico antes de intervenir en sistemas
              Siemens S7-300/400.
            </p>
            <div className="app-pro-audience-list">
              {appAudienceProfiles.map((item) => (
                <div className="app-pro-audience-item" key={item.text}>
                  <Icon name={item.icon} size={18} />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
            <p className="app-pro-audience-note">
              No reemplaza al técnico: lo ayuda a ordenar hipótesis, verificar evidencia y tomar mejores decisiones
              en campo.
            </p>
          </article>
        </div>
      </section>

      <section className="app-pro-trust-section">
        <div className="mock-home-container app-pro-trust-grid">
          <img className="app-pro-trust-avatar" src={walterBojAvatar} alt="Walter Adrián Boj" loading="lazy" />
          <div className="app-pro-trust-copy">
            <h2>Desarrollada con criterio de planta</h2>
            <p>
              BOJ S7-PLC PRO fue desarrollada por Walter Adrián Boj, especialista en automatización industrial
              y diagnóstico de sistemas PLC Siemens, con experiencia en mantenimiento, programación, redes
              industriales y fallas reales de planta.
            </p>
            <a className="mock-btn mock-btn-outline" href={contact.linkedin} target="_blank" rel="noreferrer">
              Ver perfil profesional <ExternalLink size={17} />
            </a>
          </div>
          <div className="app-pro-trust-metrics">
            {appTrustMetrics.map((item) => (
              <article key={item.title}>
                <Icon name={item.icon} size={22} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <S7Testimonials background="dark" />

      <section className="app-pro-faq-section">
        <div className="mock-home-container">
          <div className="app-pro-section-heading app-pro-section-heading-dark">
            <h2>Preguntas frecuentes</h2>
          </div>
          <div className="app-pro-faq-grid">
            {appFaqItems.map((item) => (
              <details className="app-pro-faq-item" key={item.question}>
                <summary>
                  {item.question}
                  <ChevronDown size={16} />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

function AppComparisonTable() {
  return (
    <div className="app-comparison-table" role="table" aria-label="Comparación BOJ S7-PLC Course Edition y PRO">
      <div className="comparison-row header" role="row">
        <span role="columnheader">Función</span>
        <span role="columnheader">Course Edition</span>
        <span role="columnheader">PRO</span>
      </div>
      {appComparison.map((item) => (
        <div className="comparison-row" role="row" key={item.feature}>
          <span role="cell">{item.feature}</span>
          <span role="cell">{item.course}</span>
          <span role="cell">{item.pro}</span>
        </div>
      ))}
    </div>
  );
}

function EnglishAppHeroDiagnosticPreview() {
  const stages = [
    { label: "Symptom", value: "CPU STOP + BF" },
    { label: "Hypothesis", value: "Network or remote node" },
    { label: "Verification", value: "Prioritized evidence" },
  ];

  return (
    <aside className="app-hero-diagnostic-preview" aria-label="Visual example of the BOJ S7-PLC PRO diagnostic workflow">
      <div className="app-hero-diagnostic-preview-head">
        <span>REAL TOOL WORKFLOW</span>
        <small><span aria-hidden="true" /> GUIDED CASE</small>
      </div>
      <div className="app-hero-diagnostic-preview-screen">
        <img src={appResultadoDiagnostico} alt="Guided result in BOJ S7-PLC PRO" />
        <span className="app-hero-diagnostic-preview-focus" aria-hidden="true" />
      </div>
      <ol className="app-hero-diagnostic-preview-stages">
        {stages.map((stage, index) => (
          <li key={stage.label}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div><small>{stage.label}</small><strong>{stage.value}</strong></div>
          </li>
        ))}
      </ol>
    </aside>
  );
}

function EnglishHomeHeroNavigator() {
  return (
    <div className="home-hero-navigator">
      <span className="home-hero-navigator-eyebrow">CHOOSE YOUR STARTING POINT</span>
      <h2>What do you need to solve?</h2>
      <nav aria-label="Main solutions">
        {englishHome.navigator.map((path) => (
          <a href={path.href} key={path.href}>
            <span className="home-hero-navigator-icon">
              <Icon name={path.icon} size={21} />
            </span>
            <span>
              <strong>{path.title}</strong>
              <small>{path.text}</small>
            </span>
            <ArrowRight size={17} aria-hidden="true" />
          </a>
        ))}
      </nav>
    </div>
  );
}

function EnglishHomePage() {
  return (
    <div className="mock-home english-page" data-language="en">
      <Hero
        image={heroInicio}
        eyebrow="INDUSTRIAL AUTOMATION AND DIAGNOSTICS"
        title="Siemens PLC troubleshooting and industrial automation"
        subtitle="More than 15 years working with plant faults, commissioning and industrial control systems. Technical services, applied training and BOJ S7-PLC diagnostic support for maintenance teams."
        primary={{
          label: "Request diagnostics",
          href: whatsappUrl("Hello, I am contacting BOJ to request support with an industrial diagnostics case."),
          external: true,
        }}
        secondary={{ label: "View training", href: "/en/courses" }}
        aside={<EnglishHomeHeroNavigator />}
      />

      <section className="mock-clients" data-home-section="clients">
        <div className="mock-home-container mock-clients-inner">
          <p className="mock-clients-label">Selected industrial clients</p>
          <ul className="mock-clients-list">
            {homeClientNames.map((name) => <li key={name}>{name}</li>)}
          </ul>
          <a className="mock-clients-link" href="/en/projects">
            View completed projects <ArrowRight size={15} />
          </a>
        </div>
      </section>

      <section className="mock-section mock-problems">
        <div className="mock-home-container">
          <h2>Problems we help solve</h2>
          <p className="mock-problems-subtitle">
            We start with the real symptom: a stopped CPU, an unstable network, inconsistent signals or equipment that no longer responds as expected.
          </p>
          <div className="mock-problems-grid">
            {englishHome.problems.map((problem) => (
              <article className="mock-problem-item" key={problem.text}>
                <Icon name={problem.icon} size={36} />
                <span>{problem.text}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mock-tech-strip">
        <div className="mock-home-container">
          <h2>Technical focus</h2>
          <p className="mock-tech-subtitle">Industrial technologies and areas covered by our work.</p>
          <div className="mock-tech-grid">
            {englishHome.specialties.map((item) => (
              <article className="mock-tech-card" key={item.title}>
                <Icon name={item.icon} size={48} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mock-section mock-app">
        <div className="mock-home-container mock-app-grid">
          <div className="mock-app-copy">
            <span className="section-badge">BOJ S7-PLC PRO</span>
            <h2>A clearer first response before opening STEP 7</h2>
            <p>
              Enter CPU states, LEDs and field symptoms. The app organizes technical hypotheses and suggests what to verify first.
            </p>
            <ul>
              <li>Symptom-based workflow</li>
              <li>Prioritized technical hypotheses</li>
              <li>Field verification guidance</li>
            </ul>
            <a className="mock-btn mock-btn-primary" href="/en/app">
              Explore the app <ArrowRight size={18} />
            </a>
          </div>
          <AppDiagnosticMockup language="en" />
        </div>
      </section>

      <section className="mock-section mock-obras">
        <div className="mock-home-container">
          <h2>Completed projects</h2>
          <p className="mock-obras-subtitle">
            Selected engineering, PLC migration and commissioning work completed in real production environments. Images are illustrative; clients and project scopes are real.
          </p>
          <div className="mock-obras-grid">
            {englishProjects.map((project) => {
              const source = projects[project.sourceIndex];
              return (
                <article className="mock-obras-card" key={project.title}>
                  <div className="mock-obras-media">
                    <img src={getServiceWorkImage(projectWorkImageFiles[project.sourceIndex]) || projectVisuals[project.sourceIndex % projectVisuals.length]} alt="" loading="lazy" />
                    <span className="works-image-disclaimer">Illustrative image</span>
                    <span className="mock-obras-client">{source.client}</span>
                  </div>
                  <div className="mock-obras-body">
                    <span className="mock-obras-year">{source.year}</span>
                    <h3>{project.title}</h3>
                    <p>{project.result}</p>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="mock-obras-cta">
            <a className="mock-btn mock-btn-primary" href="/en/projects">
              View selected projects <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      <section className="mock-final-cta">
        <img src={plantVisual} alt="" aria-hidden="true" />
        <div className="mock-final-overlay" aria-hidden="true" />
        <div className="mock-home-container mock-final-content">
          <h2>Do you have a plant fault, a stopped machine or a team that needs training?</h2>
          <p>Tell us what is happening and we will help you identify the appropriate next step.</p>
          <div className="mock-final-actions">
            <a className="mock-btn mock-btn-whatsapp" href={whatsappUrl("Hello, I would like to discuss an industrial fault, automation project or technical training need.")}>
              <Phone size={18} /> Contact us on WhatsApp
            </a>
            <a className="mock-btn mock-btn-outline" href="/en/contact">
              <Mail size={18} /> Send a technical inquiry
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function EnglishServicesPage() {
  return (
    <div className="services-redesign-page english-page" data-language="en">
      <Hero
        image={heroServicios}
        eyebrow="INDUSTRIAL SERVICES"
        title="Diagnostics and engineering to restore and improve plant operation"
        subtitle="PLC, HMI, SCADA, industrial networks, control panels and instrumentation. We organize the evidence, narrow down the likely cause and define the next technical step."
        primary={{ label: "Request diagnostics", href: whatsappUrl("Hello, I need support with an industrial diagnostics or automation case."), external: true }}
        secondary={{ label: "Explore services", href: "#en-service-areas" }}
        aside={(
          <aside className="services-intake-card" aria-label="Information that helps start a diagnostic assessment">
            <p className="services-intake-eyebrow">Useful information for the first contact</p>
            <h2>What is happening in the plant?</h2>
            <ul>
              <li><span>01</span><div><strong>Fault or stoppage</strong><p>PLC, HMI, network, signal or actuator.</p></div></li>
              <li><span>02</span><div><strong>Equipment involved</strong><p>Brand, model and process area.</p></div></li>
              <li><span>03</span><div><strong>Available evidence</strong><p>Photos, alarms, backup or a short description.</p></div></li>
            </ul>
            <p className="services-intake-note"><ClipboardCheck size={18} /><span>This is enough to organize scope, risk and the next technical action.</span></p>
          </aside>
        )}
      />

      <section className="services-workflow-section">
        <div className="mock-home-container">
          <div className="services-section-heading services-workflow-heading">
            <h2>A method for making better technical decisions</h2>
            <p>From the symptom to a practical next step, with field evidence and a clear intervention scope.</p>
          </div>
          <div className="services-workflow-grid">
            {englishServices.workflow.map((card) => (
              <article className="services-workflow-card" key={card.title}>
                <Icon name={card.icon} size={26} /><h3>{card.title}</h3><p>{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-redesign-section services-areas-section" id="en-service-areas">
        <div className="mock-home-container">
          <div className="services-section-heading services-area-heading">
            <h2>What do you need to solve?</h2>
            <p>Choose the starting point that best matches the current situation.</p>
          </div>
          <div className="services-area-grid">
            {englishServices.areas.map((card) => (
              <article className="services-area-card" key={card.title}>
                <Icon name={card.icon} size={30} /><h3>{card.title}</h3><p>{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-redesign-section services-main-section">
        <div className="mock-home-container">
          <div className="services-section-heading services-main-heading">
            <h2>How we can support your operation</h2>
            <p>Scope, typical applications and expected outcome for each core service.</p>
          </div>
          <div className="services-main-grid">
            {englishServices.primary.map((service) => (
              <article className="services-primary-card" key={service.title}>
                <div className="services-primary-head">
                  <span><Icon name={service.icon} size={34} /></span>
                  <div><h3>{service.title}</h3><p>{service.description}</p></div>
                </div>
                <div className="services-primary-body">
                  <ServiceInfoBlock title="Applications">
                    <ul>{service.applications.map((item) => <li key={item}>{item}</li>)}</ul>
                  </ServiceInfoBlock>
                  <ServiceInfoBlock title="Expected outcome"><p>{service.result}</p></ServiceInfoBlock>
                  <ServiceInfoBlock title="When to contact us"><p>{service.when}</p></ServiceInfoBlock>
                </div>
                <a className="services-consult-link" href={whatsappUrl(`Hello, I would like to discuss ${service.title.toLowerCase()}.`)}>
                  Discuss this service <ArrowRight size={16} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-field-section">
        <div className="mock-home-container">
          <div className="services-section-heading services-field-heading">
            <h2>Experience in industrial environments</h2>
            <p>Work performed where operational continuity, safe commissioning and reliable diagnostics matter.</p>
          </div>
          <div className="services-field-grid">
            {englishServices.field.map((card) => (
              <article className="services-field-card" key={card.title}>
                <Icon name={card.icon} size={30} /><h3>{card.title}</h3><p>{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-redesign-cta">
        <img src={plantVisual} alt="" aria-hidden="true" />
        <div className="services-redesign-cta-overlay" aria-hidden="true" />
        <div className="mock-home-container services-redesign-cta-content">
          <h2>Start with the symptom, the equipment and the evidence you already have</h2>
          <p>We can use that information to define scope, risk and the most useful technical next step.</p>
          <div className="services-redesign-actions">
            <a className="mock-btn mock-btn-whatsapp" href={whatsappUrl("Hello, I would like to discuss an industrial technical service.")}>
              <Phone size={18} /> Contact us on WhatsApp
            </a>
            <a className="mock-btn mock-btn-outline" href="/en/contact">Contact details <ArrowRight size={18} /></a>
          </div>
        </div>
      </section>
    </div>
  );
}

function EnglishCourseAvailableCard({ type }) {
  const isS7 = type === "s7";
  const course = isS7
    ? {
        label: "AVAILABLE NOW",
        title: "Industrial diagnostics for Siemens S7-300/400",
        image: courseS7400Visual,
        path: "/en/courses/s7-300-400",
        icon: "Cpu",
        facts: [["Format", "Online"], ["Language", "Spanish"], ["Access", "Permanent"], ["Includes", "1 month PRO App"]],
        bullets: ["STEP 7 Classic and SIMATIC Manager", "CPU states, SF/BF and Diagnostic Buffer", "PROFIBUS, modules and field signals"],
      }
    : {
        label: "UPCOMING",
        title: "TIA Portal for Siemens S7-1200/1500",
        image: courseTiaPortalVisual,
        path: "/en/courses/tia-portal",
        icon: "MonitorCog",
        facts: [["Format", "Online"], ["Level", "Introductory"], ["Status", "In preparation"]],
        bullets: ["Hardware configuration", "Variables and LAD", "Online monitoring and basic diagnostics"],
      };

  return (
    <article className="course-available-card">
      <div className="course-available-content">
        <div className="course-available-title-row"><span><Icon name={course.icon} size={30} /></span><h3>{course.title}</h3></div>
        <div className="course-quick-facts">
          {course.facts.map(([title, value]) => <div key={title}><span>{title}</span><strong>{value}</strong></div>)}
        </div>
        <ul className="course-available-bullets">
          {course.bullets.map((item) => <li key={item}><CheckCircle2 size={16} />{item}</li>)}
        </ul>
      </div>
      <div className="course-available-visual">
        <img src={course.image} alt="" aria-hidden="true" loading="lazy" />
        <strong>{course.label}</strong>
        <span className="course-status-badge">{isS7 ? "Available" : "Upcoming"}</span>
        <a className="mock-btn mock-btn-primary" href={course.path}>{isS7 ? "View course" : "View preview"} <ArrowRight size={18} /></a>
      </div>
    </article>
  );
}

function EnglishCoursesPage() {
  return (
    <div className="courses-redesign-page english-page" data-language="en">
      <Hero
        image={heroCursos}
        eyebrow="APPLIED TECHNICAL TRAINING"
        title="Learn to troubleshoot industrial systems with a repeatable method"
        subtitle="Training for maintenance technicians, automation specialists and engineers who work with Siemens PLC systems in real plant environments."
        primary={{ label: "View available courses", href: "#en-courses-available" }}
        secondary={{ label: "Ask about training", href: "/en/contact" }}
      />
      <section className="courses-light-section">
        <div className="mock-home-container">
          <div className="courses-section-heading courses-section-heading-dark"><h2>Training designed for field decisions</h2></div>
          <div className="courses-benefit-grid">
            {englishCourses.benefits.map((item) => (
              <article className="courses-benefit-card" key={item.title}><Icon name={item.icon} size={30} /><h3>{item.title}</h3><p>{item.text}</p></article>
            ))}
          </div>
        </div>
      </section>
      <section className="courses-available-section" id="en-courses-available">
        <div className="mock-home-container">
          <div className="courses-section-heading"><h2>Available training</h2><p>Choose the program that matches the Siemens platform you work with.</p></div>
          <div className="courses-available-list"><EnglishCourseAvailableCard type="s7" /><EnglishCourseAvailableCard type="tia" /></div>
        </div>
      </section>
      <section className="courses-light-section courses-learning-section">
        <div className="mock-home-container">
          <div className="courses-section-heading courses-section-heading-dark"><h2>What the training helps you improve</h2></div>
          <div className="courses-learning-grid">
            {englishCourses.learning.map((item) => <article className="courses-learning-card" key={item.text}><Icon name={item.icon} size={28} /><p>{item.text}</p></article>)}
          </div>
        </div>
      </section>
      <section className="courses-final-cta">
        <div className="mock-home-container courses-final-cta-content">
          <h2>Need training for a maintenance or automation team?</h2>
          <p>Contact us to discuss the platform, audience and technical objectives.</p>
          <div className="courses-actions"><a className="mock-btn mock-btn-primary" href="/en/contact">Discuss team training <ArrowRight size={18} /></a></div>
        </div>
      </section>
    </div>
  );
}

function EnglishTiaCoursePage() {
  return (
    <PageShell
      eyebrow="UPCOMING COURSE"
      title="TIA Portal for Siemens S7-1200/1500"
      subtitle="An introductory program focused on hardware configuration, variables, LAD, online monitoring and basic industrial diagnostics."
      heroImage={heroCursoTia}
      heroPrimary={{ label: "Ask about availability", href: "/en/contact" }}
      heroSecondary={{ label: "View S7-300/400 course", href: "/en/courses/s7-300-400" }}
    >
      <section className="en-content-panel">
        <div><p className="eyebrow">CURRENT STATUS</p><h2>Program in preparation</h2></div>
        <p>The course is not currently offered for purchase. You can contact BOJ if you would like to receive information when the program becomes available.</p>
      </section>
    </PageShell>
  );
}

function EnglishAppPage() {
  const pricingCards = [appTrialPlan, ...appLicensePlans].map((plan) => ({
    ...plan,
    ...englishApp.planCopy[plan.title],
    sourceTitle: plan.title,
  }));
  const [activeScreenshot, setActiveScreenshot] = useState(null);

  useEffect(() => {
    if (!activeScreenshot) return undefined;
    const previousOverflow = document.body.style.overflow;
    const close = (event) => { if (event.key === "Escape") setActiveScreenshot(null); };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", close);
    };
  }, [activeScreenshot]);

  return (
    <div className="app-pro-page english-page" data-language="en">
      <Hero
        image={appProHeroLaptopVisual}
        eyebrow="FIRST-LINE FIELD DIAGNOSTICS"
        title="Before opening STEP 7, identify what you need to verify"
        subtitle="Enter the symptoms, LEDs and conditions observed at the control panel. BOJ S7-PLC PRO organizes possible causes and helps you decide whether to investigate the CPU, network, modules, power, signals or logic."
        primary={{ label: "Start the 48-hour free trial", href: appProductUrl, external: true, onClick: () => track("app_trial_click", { source: "app_en_hero" }) }}
        secondary={{ label: "View PRO plans", href: "#en-pro-plans" }}
        note="The app does not connect directly to the PLC and does not replace STEP 7 or qualified technical judgment."
        aside={<EnglishAppHeroDiagnosticPreview />}
      />

      <section className="app-pro-positioning-section">
        <div className="mock-home-container">
          <div className="app-pro-positioning-heading">
            <span className="app-pro-positioning-eyebrow">TWO STAGES, ONE DIAGNOSTIC PROCESS</span>
            <h2>Orient the first response. Go deeper only when the evidence requires it.</h2>
            <p>BOJ S7-PLC helps the field technician arrive at online diagnostics with a narrower and more useful search.</p>
          </div>
          <div className="app-pro-positioning-route" aria-label="Diagnostic workflow">
            <div className="app-pro-positioning-route-step"><span className="app-pro-positioning-route-number">01</span><Icon name="Smartphone" size={27} /><div><small>FIRST RESPONSE</small><h3>Guidance with BOJ S7-PLC</h3><p>Record symptoms, LEDs and field conditions from a phone, tablet or browser.</p></div></div>
            <ArrowRight className="app-pro-positioning-route-arrow" size={24} />
            <div className="app-pro-positioning-route-step"><span className="app-pro-positioning-route-number">02</span><Icon name="MonitorCog" size={27} /><div><small>ONLINE CONFIRMATION</small><h3>Diagnostics with STEP 7</h3><p>Review hardware, events, blocks or registers with a more focused hypothesis.</p></div></div>
            <ArrowRight className="app-pro-positioning-route-arrow" size={24} />
            <div className="app-pro-positioning-route-decision"><Icon name="ShieldCheck" size={27} /><div><small>TECHNICAL DECISION</small><strong>The technician evaluates the evidence before intervening.</strong></div></div>
          </div>
          <p className="app-pro-positioning-summary"><strong>BOJ S7-PLC guides.</strong><span>STEP 7 confirms.</span><span>The technician decides.</span></p>
        </div>
      </section>

      <section className="app-pro-problems-how-section">
        <div className="mock-home-container app-pro-problems-how-grid">
          <div className="app-pro-problems-panel">
            <div className="app-pro-panel-heading"><span className="app-pro-section-kicker">FIELD DIAGNOSTICS</span><h2>Problems it helps organize</h2><p>Identify the fault category before changing hardware or intervening in the process.</p></div>
            <div className="app-pro-problem-grid">{englishApp.problems.map((item) => <article className="app-pro-problem-item" key={item.title}><Icon name={item.icon} size={26} /><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
          </div>
          <div className="app-pro-how-panel">
            <div className="app-pro-panel-heading"><span className="app-pro-section-kicker">WORKFLOW</span><h2>How it works</h2><p>From a symptom to prioritized hypotheses and practical field checks.</p></div>
            <div className="app-pro-how-steps">
              {englishApp.steps.map((item, index) => (
                <div className="app-pro-how-step-wrap" key={item.title}>
                  <article className="app-pro-how-step"><span className="app-pro-step-number">{index + 1}</span><div className="app-pro-step-icon-circle"><Icon name={item.icon} size={28} /></div><h3>{item.title}</h3><p>{item.text}</p></article>
                  {index < englishApp.steps.length - 1 ? <span className="app-pro-step-arrow"><ArrowRight size={24} /></span> : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="app-pro-dark-section app-pro-includes-section">
        <div className="mock-home-container">
          <div className="app-pro-section-heading"><span className="app-pro-section-kicker">DIAGNOSTIC TOOLS</span><h2>What BOJ S7-PLC PRO includes</h2><p>A practical environment for reviewing and documenting first-line diagnostics.</p></div>
          <div className="app-pro-include-grid">{englishApp.includes.map((item) => <article className="app-pro-include-card" key={item.title}><Icon name={item.icon} size={30} /><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
        </div>
      </section>

      <section className="app-pro-real-language-section">
        <div className="mock-home-container app-pro-real-language-grid">
          <div>
            <h2>Real views of the professional tool</h2>
            <div className="app-pro-real-view-grid">
              {englishApp.views.map((copy, index) => {
                const source = appRealViews[index];
                const item = { ...source, ...copy };
                return (
                  <article className="app-pro-real-view-card" key={item.title}>
                    <figure><button className="app-pro-real-view-trigger" type="button" onClick={() => setActiveScreenshot(item)} aria-label={`Enlarge screenshot: ${item.title}`}><img src={item.image} alt={item.title} loading="lazy" style={{ objectPosition: item.position }} /></button></figure>
                    <div><h3>{item.title}</h3><p>{item.text}</p></div>
                  </article>
                );
              })}
            </div>
          </div>
          <div className="app-pro-language-card"><h2>Available in 6 languages</h2><div className="app-pro-language-list">{["Spanish", "English", "Portuguese", "German", "French", "Italian"].map((item) => <span key={item}>{item}</span>)}</div><p>Built for technicians, companies and maintenance teams working across different countries.</p></div>
        </div>
      </section>

      {activeScreenshot ? (
        <div className="app-pro-lightbox" role="dialog" aria-modal="true" aria-labelledby="en-app-lightbox-title" onClick={() => setActiveScreenshot(null)}>
          <div className="app-pro-lightbox-panel" onClick={(event) => event.stopPropagation()}>
            <button className="app-pro-lightbox-close" type="button" onClick={() => setActiveScreenshot(null)} aria-label="Close enlarged screenshot"><X size={20} /></button>
            <img src={activeScreenshot.image} alt={activeScreenshot.title} />
            <div className="app-pro-lightbox-copy"><h2 id="en-app-lightbox-title">{activeScreenshot.title}</h2><p>{activeScreenshot.text}</p></div>
          </div>
        </div>
      ) : null}

      <section className="app-pro-plans-section" id="en-pro-plans">
        <div className="mock-home-container">
          <div className="app-pro-section-heading">
            <span className="app-pro-section-kicker">LICENSES AND OPTIONS</span>
            <h2>Choose your PRO license</h2>
            <p>Compare renewal, duration, devices and offline availability before choosing.</p>
            <p className="app-pro-plans-crosslink"><strong>Professional</strong> and <strong>Business</strong> include the <a href="/en/courses/s7-300-400">S7-300/400 diagnostics course</a>.</p>
          </div>
          <div className="app-pro-plan-grid">
            {pricingCards.map((plan) => (
              <article className={`app-pro-plan-card${plan.badge ? " featured" : ""}${plan.sourceTitle === "Prueba gratuita" ? " trial" : ""}`} id={`en-plan-${plan.sourceTitle.toLowerCase().replaceAll(" ", "-")}`} key={plan.sourceTitle}>
                {plan.badge ? <span className="app-pro-plan-badge">{plan.badge}</span> : null}
                <h3>{plan.title}</h3><strong>{plan.price}</strong><span className="app-pro-plan-meta">{plan.meta}</span>
                <ul>{plan.bullets.map((item) => <li key={item}><CheckCircle2 size={15} />{item}</li>)}</ul>
                <a className="mock-btn mock-btn-primary" href={plan.url} target="_blank" rel="noreferrer" onClick={() => track("plan_click", { plan: plan.sourceTitle, language: "en" })}>{plan.button} <ExternalLink size={17} /></a>
              </article>
            ))}
          </div>
          <ul className="app-pro-purchase-confidence" aria-label="Purchase information">
            <li><CheckCircle2 size={17} />Purchase processed by Hotmart</li>
            <li><CheckCircle2 size={17} />Price and billing model shown before confirmation</li>
            <li><CheckCircle2 size={17} />Activation uses the email address entered during purchase</li>
          </ul>
          <aside className="app-pro-training-strip">
            <div className="app-pro-training-copy"><span className="app-pro-training-eyebrow">TECHNICAL TRAINING</span><h3>Do you also need structured training?</h3><p>Permanent access to the S7-300/400 diagnostics course plus one month of BOJ S7-PLC PRO.</p></div>
            <div className="app-pro-training-action"><strong>{offer.course.price} · One-time payment</strong><a className="mock-btn mock-btn-outline" href="/en/courses/s7-300-400">View course content <ArrowRight size={17} /></a></div>
          </aside>
          <article className="app-pro-institutional">
            <Icon name="Landmark" size={34} /><div><h3>Companies and training centers: tailored pricing</h3><p>Special conditions for organizations, technical training programs and teams with multiple users.</p></div><a className="mock-btn mock-btn-outline" href="/en/contact">Request information <ArrowRight size={17} /></a>
          </article>
        </div>
      </section>

      <section className="app-pro-value-row-section">
        <div className="mock-home-container app-pro-value-row-grid">
          <article className="app-pro-offline-card"><h2>Access and availability</h2><p className="app-pro-offline-intro">Use the app from a modern browser or install it on a compatible device.</p><div className="app-pro-offline-items"><div><Icon name="Globe" size={34} /><h3>Web access</h3><p>No mandatory software installation.</p></div><div><Icon name="Smartphone" size={34} /><h3>Installable</h3><p>Direct access on compatible devices.</p></div><div><Icon name="WifiOff" size={34} /><h3>Offline by plan</h3><p>Offline duration depends on the selected license.</p></div></div></article>
          <article className="app-pro-cost-card"><div><h2>A plant stoppage can cost more than a license</h2><p>BOJ S7-PLC PRO helps organize symptoms and evidence before hardware is changed or equipment is restarted without a clear reason.</p><ul className="app-pro-cost-bullets"><li>Reduce trial and error under pressure.</li><li>Prioritize evidence before intervening.</li><li>Prepare a more focused STEP 7 session.</li></ul><strong className="app-pro-cost-emphasis">Less guesswork. Better technical judgment.</strong></div><div className="app-pro-cost-visual" aria-hidden="true"><span /><span /><span /><span /><b><TriangleAlert size={24} /></b></div></article>
          <article className="app-pro-audience-card"><h2>Who it is for</h2><p className="app-pro-audience-intro">For professionals and teams troubleshooting Siemens S7-300/400 systems.</p><div className="app-pro-audience-list">{englishApp.audience.map((item) => <div className="app-pro-audience-item" key={item.text}><Icon name={item.icon} size={18} /><span>{item.text}</span></div>)}</div><p className="app-pro-audience-note">It supports the technician; it does not replace qualified technical judgment.</p></article>
        </div>
      </section>

      <section className="app-pro-trust-section">
        <div className="mock-home-container app-pro-trust-grid">
          <img className="app-pro-trust-avatar" src={walterBojAvatar} alt="Walter Adrián Boj" loading="lazy" />
          <div className="app-pro-trust-copy"><h2>Developed with plant experience</h2><p>BOJ S7-PLC PRO was developed by Walter Adrián Boj, an industrial automation specialist with experience in Siemens PLC diagnostics, maintenance, programming and industrial networks.</p><a className="mock-btn mock-btn-outline" href={contact.linkedin} target="_blank" rel="noreferrer">View professional profile <ExternalLink size={17} /></a></div>
          <div className="app-pro-trust-metrics"><article><Icon name="Clock" size={22} /><h3>15+ years</h3><p>Industrial automation and diagnostics experience.</p></article><article><Icon name="Cpu" size={22} /><h3>Siemens PLC</h3><p>Focused on real S7-300/400 plant faults.</p></article><article><Icon name="ShieldCheck" size={22} /><h3>Field method</h3><p>A structured process designed to reduce guesswork.</p></article></div>
        </div>
      </section>

      <section className="app-pro-faq-section">
        <div className="mock-home-container"><div className="app-pro-section-heading app-pro-section-heading-dark"><h2>Frequently asked questions</h2></div><div className="app-pro-faq-grid">{englishApp.faq.map((item) => <details className="app-pro-faq-item" key={item.question}><summary>{item.question}<ChevronDown size={16} /></summary><p>{item.answer}</p></details>)}</div></div>
      </section>
    </div>
  );
}

function EnglishS7CoursePage() {
  const checkoutUrl = offer.course.checkout.checkoutUrl;
  const checkoutAction = (source) => () => track("course_checkout_click", { source, language: "en" });

  return (
    <div className="english-course-page english-page" data-language="en">
      <Hero
        image={heroCursoS7}
        eyebrow="APPLIED ONLINE COURSE"
        title="Industrial diagnostics in Siemens S7-300/400 systems"
        subtitle="Learn a field-oriented method for CPU states, Diagnostic Buffer, online hardware, PROFIBUS, modules and signals. Includes permanent course access and one month of BOJ S7-PLC PRO. Course materials are currently available in Spanish."
        primary={{ label: "Buy course + PRO App", href: checkoutUrl, external: true, onClick: checkoutAction("en_course_hero") }}
        secondary={{ label: "See what is included", href: "#en-course-includes" }}
        note="Course language: Spanish · One-time payment · Permanent course access · 1 month of BOJ S7-PLC PRO · 1 device"
        aside={(
          <aside className="course-hero-preview" aria-label="Course offer preview">
            <div className="course-hero-preview-media"><img src={manualPreviewImages[0]} alt="Cover of the S7-300/400 diagnostics manual" /><span>Professional technical manual</span></div>
            <div className="course-hero-preview-copy"><span>COURSE + PRO APP</span><strong>{offer.course.price}</strong><small>One-time payment · Permanent course access</small><ul><li><CheckCircle2 size={15} />Applied diagnostics method</li><li><CheckCircle2 size={15} />1 month of BOJ S7-PLC PRO</li></ul></div>
          </aside>
        )}
      />

      <section className="en-course-section" id="en-course-includes">
        <div className="mock-home-container">
          <div className="en-section-heading"><span>COMPLETE OFFER</span><h2>Course, technical manual and guided diagnostics app</h2><p>A single training package designed to connect technical understanding with field decisions.</p></div>
          <div className="en-course-includes-grid">
            <article className="en-course-visual-card"><img src={courseS7400Visual} alt="Siemens S7-300/400 industrial diagnostics training" loading="lazy" /><div><strong>{offer.course.price}</strong><span>One-time payment</span></div></article>
            <article className="en-course-list-card"><span className="en-course-language-note">COURSE CONTENT IN SPANISH</span><h3>What is included</h3><ul>{englishS7Course.includes.map((item) => <li key={item}><CheckCircle2 size={17} />{item}</li>)}</ul></article>
          </div>
        </div>
      </section>

      <section className="en-course-section en-course-section-dark">
        <div className="mock-home-container">
          <div className="en-section-heading"><span>LEARNING OUTCOMES</span><h2>A repeatable diagnostic process for real plant situations</h2></div>
          <div className="en-course-outcome-grid">{englishS7Course.outcomes.map((item, index) => <article key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></article>)}</div>
        </div>
      </section>

      <section className="en-course-section">
        <div className="mock-home-container en-course-two-columns">
          <div><div className="en-section-heading"><span>PROGRAM</span><h2>Technical modules</h2></div><ol className="en-course-module-list">{englishS7Course.modules.map((item) => <li key={item}>{item}</li>)}</ol></div>
          <div><div className="en-section-heading"><span>AUDIENCE</span><h2>Who this course is for</h2></div><ul className="en-course-audience-list">{englishS7Course.audience.map((item) => <li key={item}><CheckCircle2 size={17} />{item}</li>)}</ul></div>
        </div>
      </section>

      <section className="en-course-purchase-strip" id="en-course-purchase">
        <div className="mock-home-container">
          <div><span>COURSE + 1 MONTH PRO APP</span><h2>{offer.course.price} · One-time payment</h2><p>Permanent course access, technical material and one PRO App license for one device.</p></div>
          <a className="mock-btn mock-btn-primary" href={checkoutUrl} target="_blank" rel="noreferrer" onClick={checkoutAction("en_course_mid")}>Buy course + PRO App <ExternalLink size={17} /></a>
        </div>
      </section>

      <section className="en-course-section en-course-faq-section">
        <div className="mock-home-container"><div className="en-section-heading"><span>QUESTIONS</span><h2>Frequently asked questions</h2></div><div className="app-pro-faq-grid">{englishS7Course.faq.map((item) => <details className="app-pro-faq-item" key={item.question}><summary>{item.question}<ChevronDown size={16} /></summary><p>{item.answer}</p></details>)}</div></div>
      </section>

      <section className="en-course-final-cta">
        <div className="mock-home-container"><div><h2>Build a clearer method for your next S7-300/400 fault</h2><p>Study at your own pace and use BOJ S7-PLC PRO as guided support during the first month.</p></div><a className="mock-btn mock-btn-primary" href={checkoutUrl} target="_blank" rel="noreferrer" onClick={checkoutAction("en_course_final")}>Buy for {offer.course.price} <ExternalLink size={17} /></a></div>
      </section>
    </div>
  );
}

function EnglishProjectsPage() {
  return (
    <PageShell
      eyebrow="INDUSTRIAL PROJECTS"
      title="Engineering and automation work completed in real plants"
      subtitle="Selected cases involving PLC programming, HMI, SCADA, control panels, migrations and commissioning."
      heroImage={heroObras}
      heroPrimary={{ label: "Discuss a similar project", href: whatsappUrl("Hello, I would like to discuss an industrial automation project similar to your previous work."), external: true }}
      heroSecondary={{ label: "View services", href: "/en/services" }}
    >
      <section className="portfolio-prep"><div><p className="eyebrow">REAL PROJECT EXPERIENCE</p><h2>Each case is presented as a problem, intervention and result</h2><p>Client names and project scopes correspond to completed work. Images are illustrative unless otherwise stated.</p></div><div className="asset-slots"><span>Engineering</span><span>PLC / HMI / SCADA</span><span>Commissioning</span></div></section>
      <div className="works-grid">
        {englishProjects.map((project, index) => {
          const source = projects[project.sourceIndex];
          const visual = getServiceWorkImage(projectWorkImageFiles[project.sourceIndex]) || projectVisuals[project.sourceIndex % projectVisuals.length];
          return (
            <article className="project-card" key={project.title}>
              <div className="project-media"><img className="project-photo" src={visual} alt="" loading="lazy" /><span>PROJECT {String(index + 1).padStart(2, "0")}</span><span className="works-image-disclaimer">Illustrative image</span><div className="project-media-overlay"><strong>{source.year}</strong><small>{source.client}</small></div></div>
              <div className="project-body"><div className="project-title-row"><h2>{project.title}</h2></div><p className="project-meta-line">{project.sector} · {project.role}</p><p>{project.description}</p><div className="tag-list">{project.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div><div className="project-result-grid"><div><h3>Initial problem</h3><p>{project.problem}</p></div><div><h3>Intervention</h3><p>{project.intervention}</p></div><div><h3>Result</h3><p>{project.result}</p></div></div></div>
            </article>
          );
        })}
      </div>
      <RouteCTA title="Technical work for real plant problems" text="Tell us what the system is doing, what equipment is involved and what evidence is available." primaryLabel="Discuss a similar project" primaryHref={whatsappUrl("Hello, I would like to discuss an industrial automation project.")} secondaryLabel="View services" secondaryHref="/en/services" />
    </PageShell>
  );
}

const englishContactServices = ["Industrial fault diagnostics", "Industrial automation", "PLC migration", "Technical training", "BOJ S7-PLC licensing", "Other inquiry"];

function EnglishContactForm() {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", interest: englishContactServices[0], message: "", website: "" });
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");
  const updateField = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("sending");
    setFeedback("");
    try {
      await sendContactForm({ ...form, subject: `English website inquiry: ${form.interest}` });
      setStatus("success");
      setFeedback("Your inquiry has been sent. We normally reply within two business days.");
      setForm({ name: "", company: "", email: "", phone: "", interest: englishContactServices[0], message: "", website: "" });
      track("contact_form_submit", { location: "contact_page", language: "en", interest: form.interest });
    } catch (error) {
      setStatus("error");
      setFeedback(error.message || "The message could not be sent. You can also contact us on WhatsApp.");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} id="en-contact-form">
      <h2>Tell us about your case</h2><p>Provide the essential context so we can route your inquiry correctly. Urgent plant faults are coordinated through WhatsApp and depend on availability.</p>
      <label>Name<input name="name" value={form.name} onChange={updateField} required /></label>
      <label>Company<input name="company" value={form.company} onChange={updateField} /></label>
      <div className="form-row"><label>Email<input name="email" type="email" value={form.email} onChange={updateField} required /></label><label>Phone<input name="phone" value={form.phone} onChange={updateField} /></label></div>
      <label>Area of interest<select name="interest" value={form.interest} onChange={updateField}>{englishContactServices.map((service) => <option key={service}>{service}</option>)}</select></label>
      <label>Message<textarea name="message" rows="5" value={form.message} onChange={updateField} placeholder="Describe the symptom, equipment, PLC or industrial network involved, or the training you need." required /></label>
      <input className="form-honeypot" name="website" value={form.website} onChange={updateField} tabIndex="-1" autoComplete="off" aria-hidden="true" />
      <div className="button-row"><button className="btn primary" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send inquiry"}<ArrowRight size={18} /></button><a className="btn secondary" href={whatsappUrl("Hello, I am contacting BOJ from the English website.")}>Contact us on WhatsApp</a></div>
      {feedback ? <p className={`form-feedback ${status}`} role="status">{feedback}</p> : null}
    </form>
  );
}

function EnglishContactPage() {
  const checklist = ["PLC or HMI brand and model", "CPU state and visible LEDs", "Main symptom", "Whether the fault is permanent or intermittent", "Photos or online screenshots, if available"];
  return (
    <PageShell
      eyebrow="CONTACT"
      title="Tell us about the technical problem or solution you need"
      subtitle="Contact BOJ about plant faults, automation projects, technical training or BOJ S7-PLC licensing."
      heroImage={heroContacto}
      heroPrimary={{ label: "Contact us on WhatsApp", href: whatsappUrl("Hello, I am contacting BOJ from the English website."), external: true }}
      heroSecondary={{ label: "Complete the form", href: "#en-contact-form" }}
    >
      <section className="contact-direct contact-decision-intro"><div><p className="eyebrow">START HERE</p><h2>Share the context that best describes your situation</h2><p>A short description helps us separate an urgent plant fault from an engineering, training or licensing inquiry.</p></div></section>
      <div className="contact-grid">
        <div className="contact-panel">
          <h2>Contact details</h2><p className="contact-panel-intro">Use the form, email or WhatsApp. The information reaches the same technical team.</p>
          <ContactLine icon="Wrench" label="Technical contact" value={contact.responsible} />
          <ContactLine icon="MapPin" label="Location" value={contact.location} />
          <ContactLine icon="Mail" label="Email" value={contact.email} href={`mailto:${contact.email}`} />
          <ContactLine icon="Phone" label="WhatsApp" value={contact.whatsappDisplay} href={whatsappUrl("Hello, I am contacting BOJ from the English website.")} />
          <div className="social-placeholders"><a href={contact.linktree} target="_blank" rel="noreferrer">BOJ Linktree</a><a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></div>
          <div className="diagnostic-checklist"><h3>Information that helps us give a useful first response</h3>{checklist.map((item) => <CheckItem key={item}>{item}</CheckItem>)}</div>
          <div className="button-row"><PrimaryLink href={whatsappUrl("Hello, I am contacting BOJ from the English website.")}>Contact us on WhatsApp</PrimaryLink><SecondaryLink href={`mailto:${contact.email}`}>Send email</SecondaryLink></div>
        </div>
        <EnglishContactForm />
      </div>
    </PageShell>
  );
}

function PortugueseAppHeroDiagnosticPreview() {
  const stages = [
    { label: "Sintoma", value: "CPU STOP + BF" },
    { label: "Hipótese", value: "Rede ou nó remoto" },
    { label: "Verificação", value: "Evidência priorizada" },
  ];

  return (
    <aside className="app-hero-diagnostic-preview" aria-label="Exemplo visual do fluxo de diagnóstico do BOJ S7-PLC PRO">
      <div className="app-hero-diagnostic-preview-head"><span>FLUXO REAL DA FERRAMENTA</span><small><span aria-hidden="true" /> CASO GUIADO</small></div>
      <div className="app-hero-diagnostic-preview-screen"><img src={appResultadoDiagnostico} alt="Resultado guiado no BOJ S7-PLC PRO" /><span className="app-hero-diagnostic-preview-focus" aria-hidden="true" /></div>
      <ol className="app-hero-diagnostic-preview-stages">
        {stages.map((stage, index) => <li key={stage.label}><span>{String(index + 1).padStart(2, "0")}</span><div><small>{stage.label}</small><strong>{stage.value}</strong></div></li>)}
      </ol>
    </aside>
  );
}

function PortugueseHomeHeroNavigator() {
  return (
    <div className="home-hero-navigator">
      <span className="home-hero-navigator-eyebrow">ESCOLHA SEU PONTO DE PARTIDA</span>
      <h2>O que você precisa resolver?</h2>
      <nav aria-label="Soluções principais">
        {portugueseHome.navigator.map((path) => (
          <a href={path.href} key={path.href}><span className="home-hero-navigator-icon"><Icon name={path.icon} size={21} /></span><span><strong>{path.title}</strong><small>{path.text}</small></span><ArrowRight size={17} aria-hidden="true" /></a>
        ))}
      </nav>
    </div>
  );
}

function PortugueseHomePage() {
  return (
    <div className="mock-home portuguese-page" data-language="pt">
      <Hero
        image={heroInicio}
        eyebrow="AUTOMAÇÃO E DIAGNÓSTICO INDUSTRIAL"
        title="Diagnóstico de PLC Siemens e automação industrial"
        subtitle="Mais de 15 anos de experiência em falhas de planta, comissionamento e sistemas de controle industrial. Serviços técnicos, formação aplicada e suporte de diagnóstico BOJ S7-PLC para equipes de manutenção."
        primary={{ label: "Solicitar diagnóstico", href: whatsappUrl("Olá, estou entrando em contato com a BOJ para solicitar suporte em um caso de diagnóstico industrial."), external: true }}
        secondary={{ label: "Ver cursos", href: "/pt/cursos" }}
        aside={<PortugueseHomeHeroNavigator />}
      />
      <section className="mock-clients" data-home-section="clients"><div className="mock-home-container mock-clients-inner"><p className="mock-clients-label">Alguns clientes industriais</p><ul className="mock-clients-list">{homeClientNames.map((name) => <li key={name}>{name}</li>)}</ul><a className="mock-clients-link" href="/pt/projetos">Ver projetos realizados <ArrowRight size={15} /></a></div></section>
      <section className="mock-section mock-problems"><div className="mock-home-container"><h2>Problemas que ajudamos a resolver</h2><p className="mock-problems-subtitle">Partimos do sintoma real: uma CPU parada, uma rede instável, sinais inconsistentes ou um equipamento que já não responde como deveria.</p><div className="mock-problems-grid">{portugueseHome.problems.map((problem) => <article className="mock-problem-item" key={problem.text}><Icon name={problem.icon} size={36} /><span>{problem.text}</span></article>)}</div></div></section>
      <section className="mock-tech-strip"><div className="mock-home-container"><h2>Foco técnico</h2><p className="mock-tech-subtitle">Tecnologias industriais e áreas abrangidas pelo nosso trabalho.</p><div className="mock-tech-grid">{portugueseHome.specialties.map((item) => <article className="mock-tech-card" key={item.title}><Icon name={item.icon} size={48} /><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></div></section>
      <section className="mock-section mock-app"><div className="mock-home-container mock-app-grid"><div className="mock-app-copy"><span className="section-badge">BOJ S7-PLC PRO</span><h2>Uma primeira resposta mais clara antes de abrir o STEP 7</h2><p>Informe estados da CPU, LEDs e sintomas de campo. O app organiza hipóteses técnicas e sugere o que verificar primeiro.</p><ul><li>Fluxo orientado por sintomas</li><li>Hipóteses técnicas priorizadas</li><li>Orientação para verificação em campo</li></ul><a className="mock-btn mock-btn-primary" href="/pt/app">Conhecer o app <ArrowRight size={18} /></a></div><AppDiagnosticMockup language="pt" /></div></section>
      <section className="mock-section mock-obras"><div className="mock-home-container"><h2>Projetos realizados</h2><p className="mock-obras-subtitle">Projetos selecionados de engenharia, migração de PLC e comissionamento realizados em ambientes reais de produção. As imagens são ilustrativas; os clientes e escopos são reais.</p><div className="mock-obras-grid">{portugueseProjects.map((project) => { const source = projects[project.sourceIndex]; return <article className="mock-obras-card" key={project.title}><div className="mock-obras-media"><img src={getServiceWorkImage(projectWorkImageFiles[project.sourceIndex]) || projectVisuals[project.sourceIndex % projectVisuals.length]} alt="" loading="lazy" /><span className="works-image-disclaimer">Imagem ilustrativa</span><span className="mock-obras-client">{source.client}</span></div><div className="mock-obras-body"><span className="mock-obras-year">{source.year}</span><h3>{project.title}</h3><p>{project.result}</p></div></article>; })}</div><div className="mock-obras-cta"><a className="mock-btn mock-btn-primary" href="/pt/projetos">Ver projetos selecionados <ArrowRight size={18} /></a></div></div></section>
      <section className="mock-final-cta"><img src={plantVisual} alt="" aria-hidden="true" /><div className="mock-final-overlay" aria-hidden="true" /><div className="mock-home-container mock-final-content"><h2>Sua planta tem uma falha, uma máquina parada ou uma equipe que precisa de capacitação?</h2><p>Conte-nos o que está acontecendo e ajudaremos a identificar o próximo passo adequado.</p><div className="mock-final-actions"><a className="mock-btn mock-btn-whatsapp" href={whatsappUrl("Olá, gostaria de conversar sobre uma falha industrial, um projeto de automação ou uma necessidade de capacitação técnica.")}><Phone size={18} /> Falar pelo WhatsApp</a><a className="mock-btn mock-btn-outline" href="/pt/contato"><Mail size={18} /> Enviar consulta técnica</a></div></div></section>
    </div>
  );
}

function PortugueseServicesPage() {
  return (
    <div className="services-redesign-page portuguese-page" data-language="pt">
      <Hero image={heroServicios} eyebrow="SERVIÇOS INDUSTRIAIS" title="Diagnóstico e engenharia para restabelecer e melhorar a operação da planta" subtitle="PLC, IHM, SCADA, redes industriais, painéis de controle e instrumentação. Organizamos as evidências, delimitamos a causa provável e definimos o próximo passo técnico." primary={{ label: "Solicitar diagnóstico", href: whatsappUrl("Olá, preciso de suporte em um caso de diagnóstico ou automação industrial."), external: true }} secondary={{ label: "Conhecer os serviços", href: "#pt-areas-servico" }} aside={<aside className="services-intake-card" aria-label="Informações úteis para iniciar uma avaliação de diagnóstico"><p className="services-intake-eyebrow">Informações úteis para o primeiro contato</p><h2>O que está acontecendo na planta?</h2><ul><li><span>01</span><div><strong>Falha ou parada</strong><p>PLC, IHM, rede, sinal ou atuador.</p></div></li><li><span>02</span><div><strong>Equipamento envolvido</strong><p>Marca, modelo e área do processo.</p></div></li><li><span>03</span><div><strong>Evidências disponíveis</strong><p>Fotos, alarmes, backup ou uma breve descrição.</p></div></li></ul><p className="services-intake-note"><ClipboardCheck size={18} /><span>Isso é suficiente para organizar escopo, risco e a próxima ação técnica.</span></p></aside>} />
      <section className="services-workflow-section"><div className="mock-home-container"><div className="services-section-heading services-workflow-heading"><h2>Um método para tomar melhores decisões técnicas</h2><p>Do sintoma ao próximo passo prático, com evidências de campo e um escopo de intervenção claro.</p></div><div className="services-workflow-grid">{portugueseServices.workflow.map((card) => <article className="services-workflow-card" key={card.title}><Icon name={card.icon} size={26} /><h3>{card.title}</h3><p>{card.text}</p></article>)}</div></div></section>
      <section className="services-redesign-section services-areas-section" id="pt-areas-servico"><div className="mock-home-container"><div className="services-section-heading services-area-heading"><h2>O que você precisa resolver?</h2><p>Escolha o ponto de partida que melhor representa a situação atual.</p></div><div className="services-area-grid">{portugueseServices.areas.map((card) => <article className="services-area-card" key={card.title}><Icon name={card.icon} size={30} /><h3>{card.title}</h3><p>{card.text}</p></article>)}</div></div></section>
      <section className="services-redesign-section services-main-section"><div className="mock-home-container"><div className="services-section-heading services-main-heading"><h2>Como podemos apoiar sua operação</h2><p>Escopo, aplicações típicas e resultado esperado de cada serviço principal.</p></div><div className="services-main-grid">{portugueseServices.primary.map((service) => <article className="services-primary-card" key={service.title}><div className="services-primary-head"><span><Icon name={service.icon} size={34} /></span><div><h3>{service.title}</h3><p>{service.description}</p></div></div><div className="services-primary-body"><ServiceInfoBlock title="Aplicações"><ul>{service.applications.map((item) => <li key={item}>{item}</li>)}</ul></ServiceInfoBlock><ServiceInfoBlock title="Resultado esperado"><p>{service.result}</p></ServiceInfoBlock><ServiceInfoBlock title="Quando entrar em contato"><p>{service.when}</p></ServiceInfoBlock></div><a className="services-consult-link" href={whatsappUrl(`Olá, gostaria de conversar sobre ${service.title.toLowerCase()}.`)}>Consultar este serviço <ArrowRight size={16} /></a></article>)}</div></div></section>
      <section className="services-field-section"><div className="mock-home-container"><div className="services-section-heading services-field-heading"><h2>Experiência em ambientes industriais</h2><p>Trabalho realizado onde continuidade operacional, partida segura e diagnóstico confiável são essenciais.</p></div><div className="services-field-grid">{portugueseServices.field.map((card) => <article className="services-field-card" key={card.title}><Icon name={card.icon} size={30} /><h3>{card.title}</h3><p>{card.text}</p></article>)}</div></div></section>
      <section className="services-redesign-cta"><img src={plantVisual} alt="" aria-hidden="true" /><div className="services-redesign-cta-overlay" aria-hidden="true" /><div className="mock-home-container services-redesign-cta-content"><h2>Comece pelo sintoma, pelo equipamento e pelas evidências que já possui</h2><p>Podemos usar essas informações para definir o escopo, o risco e o próximo passo técnico mais útil.</p><div className="services-redesign-actions"><a className="mock-btn mock-btn-whatsapp" href={whatsappUrl("Olá, gostaria de conversar sobre um serviço técnico industrial.")}><Phone size={18} /> Falar pelo WhatsApp</a><a className="mock-btn mock-btn-outline" href="/pt/contato">Dados de contato <ArrowRight size={18} /></a></div></div></section>
    </div>
  );
}

function PortugueseCourseAvailableCard({ type }) {
  const isS7 = type === "s7";
  const course = isS7
    ? { label: "DISPONÍVEL AGORA", title: "Diagnóstico industrial para Siemens S7-300/400", image: courseS7400Visual, path: "/pt/cursos/s7-300-400", icon: "Cpu", facts: [["Formato", "Online"], ["Idioma", "Espanhol"], ["Acesso", "Permanente"], ["Inclui", "1 mês de App PRO"]], bullets: ["STEP 7 Classic e SIMATIC Manager", "Estados da CPU, SF/BF e Diagnostic Buffer", "PROFIBUS, módulos e sinais de campo"] }
    : { label: "EM PREPARAÇÃO", title: "TIA Portal para Siemens S7-1200/1500", image: courseTiaPortalVisual, path: "/pt/cursos/tia-portal", icon: "MonitorCog", facts: [["Formato", "Online"], ["Nível", "Introdutório"], ["Status", "Em preparação"]], bullets: ["Configuração de hardware", "Variáveis e LAD", "Monitoramento online e diagnóstico básico"] };
  return <article className="course-available-card"><div className="course-available-content"><div className="course-available-title-row"><span><Icon name={course.icon} size={30} /></span><h3>{course.title}</h3></div><div className="course-quick-facts">{course.facts.map(([title, value]) => <div key={title}><span>{title}</span><strong>{value}</strong></div>)}</div><ul className="course-available-bullets">{course.bullets.map((item) => <li key={item}><CheckCircle2 size={16} />{item}</li>)}</ul></div><div className="course-available-visual"><img src={course.image} alt="" aria-hidden="true" loading="lazy" /><strong>{course.label}</strong><span className="course-status-badge">{isS7 ? "Disponível" : "Em breve"}</span><a className="mock-btn mock-btn-primary" href={course.path}>{isS7 ? "Ver curso" : "Ver prévia"} <ArrowRight size={18} /></a></div></article>;
}

function PortugueseCoursesPage() {
  return (
    <div className="courses-redesign-page portuguese-page" data-language="pt">
      <Hero image={heroCursos} eyebrow="FORMAÇÃO TÉCNICA APLICADA" title="Aprenda a diagnosticar sistemas industriais com um método repetível" subtitle="Formação para técnicos de manutenção, especialistas em automação e engenheiros que trabalham com sistemas PLC Siemens em ambientes reais de planta." primary={{ label: "Ver cursos disponíveis", href: "#pt-cursos-disponiveis" }} secondary={{ label: "Consultar sobre formação", href: "/pt/contato" }} />
      <section className="courses-light-section"><div className="mock-home-container"><div className="courses-section-heading courses-section-heading-dark"><h2>Formação orientada a decisões em campo</h2></div><div className="courses-benefit-grid">{portugueseCourses.benefits.map((item) => <article className="courses-benefit-card" key={item.title}><Icon name={item.icon} size={30} /><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></div></section>
      <section className="courses-available-section" id="pt-cursos-disponiveis"><div className="mock-home-container"><div className="courses-section-heading"><h2>Formação disponível</h2><p>Escolha o programa correspondente à plataforma Siemens com a qual você trabalha.</p></div><div className="courses-available-list"><PortugueseCourseAvailableCard type="s7" /><PortugueseCourseAvailableCard type="tia" /></div></div></section>
      <section className="courses-light-section courses-learning-section"><div className="mock-home-container"><div className="courses-section-heading courses-section-heading-dark"><h2>O que a formação ajuda a melhorar</h2></div><div className="courses-learning-grid">{portugueseCourses.learning.map((item) => <article className="courses-learning-card" key={item.text}><Icon name={item.icon} size={28} /><p>{item.text}</p></article>)}</div></div></section>
      <section className="courses-final-cta"><div className="mock-home-container courses-final-cta-content"><h2>Precisa capacitar uma equipe de manutenção ou automação?</h2><p>Entre em contato para conversar sobre a plataforma, o público e os objetivos técnicos.</p><div className="courses-actions"><a className="mock-btn mock-btn-primary" href="/pt/contato">Consultar formação para equipes <ArrowRight size={18} /></a></div></div></section>
    </div>
  );
}

function PortugueseTiaCoursePage() {
  return <PageShell eyebrow="PRÓXIMO CURSO" title="TIA Portal para Siemens S7-1200/1500" subtitle="Programa introdutório sobre configuração de hardware, variáveis, LAD, monitoramento online e diagnóstico industrial básico." heroImage={heroCursoTia} heroPrimary={{ label: "Consultar disponibilidade", href: "/pt/contato" }} heroSecondary={{ label: "Ver curso S7-300/400", href: "/pt/cursos/s7-300-400" }}><section className="en-content-panel"><div><p className="eyebrow">STATUS ATUAL</p><h2>Programa em preparação</h2></div><p>O curso ainda não está disponível para compra. Entre em contato com a BOJ se desejar receber informações quando o programa for lançado.</p></section></PageShell>;
}

function PortugueseAppPage() {
  const pricingCards = [appTrialPlan, ...appLicensePlans].map((plan) => ({
    ...plan,
    ...portugueseApp.planCopy[plan.title],
    sourceTitle: plan.title,
  }));
  const [activeScreenshot, setActiveScreenshot] = useState(null);

  useEffect(() => {
    if (!activeScreenshot) return undefined;
    const previousOverflow = document.body.style.overflow;
    const close = (event) => { if (event.key === "Escape") setActiveScreenshot(null); };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", close);
    };
  }, [activeScreenshot]);

  return (
    <div className="app-pro-page portuguese-page" data-language="pt">
      <Hero image={appProHeroLaptopVisual} eyebrow="DIAGNÓSTICO DE PRIMEIRA LINHA EM CAMPO" title="Antes de abrir o STEP 7, identifique o que precisa verificar" subtitle="Informe os sintomas, LEDs e condições observadas no painel. O BOJ S7-PLC PRO organiza as possíveis causas e ajuda a decidir se você deve investigar a CPU, a rede, os módulos, a alimentação, os sinais ou a lógica." primary={{ label: "Iniciar teste gratuito de 48 horas", href: appProductUrl, external: true, onClick: () => track("app_trial_click", { source: "app_pt_hero" }) }} secondary={{ label: "Ver planos PRO", href: "#pt-planos-pro" }} note="O app não se conecta diretamente ao PLC e não substitui o STEP 7 nem o critério técnico qualificado." aside={<PortugueseAppHeroDiagnosticPreview />} />

      <section className="app-pro-positioning-section"><div className="mock-home-container"><div className="app-pro-positioning-heading"><span className="app-pro-positioning-eyebrow">DUAS ETAPAS, UM PROCESSO DE DIAGNÓSTICO</span><h2>Oriente a primeira resposta. Aprofunde somente quando as evidências exigirem.</h2><p>O BOJ S7-PLC ajuda o técnico de campo a chegar ao diagnóstico online com uma busca mais delimitada e útil.</p></div><div className="app-pro-positioning-route" aria-label="Fluxo de diagnóstico"><div className="app-pro-positioning-route-step"><span className="app-pro-positioning-route-number">01</span><Icon name="Smartphone" size={27} /><div><small>PRIMEIRA RESPOSTA</small><h3>Orientação com BOJ S7-PLC</h3><p>Registre sintomas, LEDs e condições de campo por um celular ou tablet, ou pelo navegador.</p></div></div><ArrowRight className="app-pro-positioning-route-arrow" size={24} /><div className="app-pro-positioning-route-step"><span className="app-pro-positioning-route-number">02</span><Icon name="MonitorCog" size={27} /><div><small>CONFIRMAÇÃO ONLINE</small><h3>Diagnóstico com STEP 7</h3><p>Revise hardware, eventos, blocos ou registros com uma hipótese mais focada.</p></div></div><ArrowRight className="app-pro-positioning-route-arrow" size={24} /><div className="app-pro-positioning-route-decision"><Icon name="ShieldCheck" size={27} /><div><small>DECISÃO TÉCNICA</small><strong>O técnico avalia as evidências antes de intervir.</strong></div></div></div><p className="app-pro-positioning-summary"><strong>O BOJ S7-PLC orienta.</strong><span>O STEP 7 confirma.</span><span>O técnico decide.</span></p></div></section>

      <section className="app-pro-problems-how-section"><div className="mock-home-container app-pro-problems-how-grid"><div className="app-pro-problems-panel"><div className="app-pro-panel-heading"><span className="app-pro-section-kicker">DIAGNÓSTICO EM CAMPO</span><h2>Problemas que ajuda a organizar</h2><p>Identifique a categoria da falha antes de trocar hardware ou intervir no processo.</p></div><div className="app-pro-problem-grid">{portugueseApp.problems.map((item) => <article className="app-pro-problem-item" key={item.title}><Icon name={item.icon} size={26} /><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></div><div className="app-pro-how-panel"><div className="app-pro-panel-heading"><span className="app-pro-section-kicker">FLUXO DE TRABALHO</span><h2>Como funciona</h2><p>De um sintoma a hipóteses priorizadas e verificações práticas em campo.</p></div><div className="app-pro-how-steps">{portugueseApp.steps.map((item, index) => <div className="app-pro-how-step-wrap" key={item.title}><article className="app-pro-how-step"><span className="app-pro-step-number">{index + 1}</span><div className="app-pro-step-icon-circle"><Icon name={item.icon} size={28} /></div><h3>{item.title}</h3><p>{item.text}</p></article>{index < portugueseApp.steps.length - 1 ? <span className="app-pro-step-arrow"><ArrowRight size={24} /></span> : null}</div>)}</div></div></div></section>

      <section className="app-pro-dark-section app-pro-includes-section"><div className="mock-home-container"><div className="app-pro-section-heading"><span className="app-pro-section-kicker">FERRAMENTAS DE DIAGNÓSTICO</span><h2>O que o BOJ S7-PLC PRO inclui</h2><p>Um ambiente prático para revisar e documentar diagnósticos de primeira linha.</p></div><div className="app-pro-include-grid">{portugueseApp.includes.map((item) => <article className="app-pro-include-card" key={item.title}><Icon name={item.icon} size={30} /><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></div></section>

      <section className="app-pro-real-language-section"><div className="mock-home-container app-pro-real-language-grid"><div><h2>Imagens reais da ferramenta profissional</h2><div className="app-pro-real-view-grid">{portugueseApp.views.map((copy, index) => { const source = appRealViews[index]; const item = { ...source, ...copy }; return <article className="app-pro-real-view-card" key={item.title}><figure><button className="app-pro-real-view-trigger" type="button" onClick={() => setActiveScreenshot(item)} aria-label={`Ampliar captura: ${item.title}`}><img src={item.image} alt={item.title} loading="lazy" style={{ objectPosition: item.position }} /></button></figure><div><h3>{item.title}</h3><p>{item.text}</p></div></article>; })}</div></div><div className="app-pro-language-card"><h2>Disponível em 6 idiomas</h2><div className="app-pro-language-list">{["Espanhol", "Inglês", "Português", "Alemão", "Francês", "Italiano"].map((item) => <span key={item}>{item}</span>)}</div><p>Desenvolvido para técnicos, empresas e equipes de manutenção que trabalham em diferentes países.</p></div></div></section>

      {activeScreenshot ? <div className="app-pro-lightbox" role="dialog" aria-modal="true" aria-labelledby="pt-app-lightbox-title" onClick={() => setActiveScreenshot(null)}><div className="app-pro-lightbox-panel" onClick={(event) => event.stopPropagation()}><button className="app-pro-lightbox-close" type="button" onClick={() => setActiveScreenshot(null)} aria-label="Fechar captura ampliada"><X size={20} /></button><img src={activeScreenshot.image} alt={activeScreenshot.title} /><div className="app-pro-lightbox-copy"><h2 id="pt-app-lightbox-title">{activeScreenshot.title}</h2><p>{activeScreenshot.text}</p></div></div></div> : null}

      <section className="app-pro-plans-section" id="pt-planos-pro"><div className="mock-home-container"><div className="app-pro-section-heading"><span className="app-pro-section-kicker">LICENÇAS E OPÇÕES</span><h2>Escolha sua licença PRO</h2><p>Compare renovação, duração, dispositivos e disponibilidade offline antes de escolher.</p><p className="app-pro-plans-crosslink"><strong>Profissional</strong> e <strong>Empresarial</strong> incluem o <a href="/pt/cursos/s7-300-400">curso de diagnóstico S7-300/400</a>.</p></div><div className="app-pro-plan-grid">{pricingCards.map((plan) => <article className={`app-pro-plan-card${plan.badge ? " featured" : ""}${plan.sourceTitle === "Prueba gratuita" ? " trial" : ""}`} id={`pt-plano-${plan.sourceTitle.toLowerCase().replaceAll(" ", "-")}`} key={plan.sourceTitle}>{plan.badge ? <span className="app-pro-plan-badge">{plan.badge}</span> : null}<h3>{plan.title}</h3><strong>{plan.price}</strong><span className="app-pro-plan-meta">{plan.meta}</span><ul>{plan.bullets.map((item) => <li key={item}><CheckCircle2 size={15} />{item}</li>)}</ul><a className="mock-btn mock-btn-primary" href={plan.url} target="_blank" rel="noreferrer" onClick={() => track("plan_click", { plan: plan.sourceTitle, language: "pt" })}>{plan.button} <ExternalLink size={17} /></a></article>)}</div><ul className="app-pro-purchase-confidence" aria-label="Informações da compra"><li><CheckCircle2 size={17} />Compra processada pela Hotmart</li><li><CheckCircle2 size={17} />Preço e modalidade exibidos antes da confirmação</li><li><CheckCircle2 size={17} />A ativação usa o e-mail informado durante a compra</li></ul><aside className="app-pro-training-strip"><div className="app-pro-training-copy"><span className="app-pro-training-eyebrow">FORMAÇÃO TÉCNICA</span><h3>Também precisa de capacitação estruturada?</h3><p>Acesso permanente ao curso de diagnóstico S7-300/400, em espanhol, mais um mês de BOJ S7-PLC PRO.</p></div><div className="app-pro-training-action"><strong>{offer.course.price} · Pagamento único</strong><a className="mock-btn mock-btn-outline" href="/pt/cursos/s7-300-400">Ver conteúdo do curso <ArrowRight size={17} /></a></div></aside><article className="app-pro-institutional"><Icon name="Landmark" size={34} /><div><h3>Empresas e centros de formação: condições personalizadas</h3><p>Condições especiais para organizações, programas de capacitação técnica e equipes com vários usuários.</p></div><a className="mock-btn mock-btn-outline" href="/pt/contato">Solicitar informações <ArrowRight size={17} /></a></article></div></section>

      <section className="app-pro-value-row-section"><div className="mock-home-container app-pro-value-row-grid"><article className="app-pro-offline-card"><h2>Acesso e disponibilidade</h2><p className="app-pro-offline-intro">Use o app em um navegador moderno ou instale-o em um dispositivo compatível.</p><div className="app-pro-offline-items"><div><Icon name="Globe" size={34} /><h3>Acesso web</h3><p>Sem instalação obrigatória de software.</p></div><div><Icon name="Smartphone" size={34} /><h3>Instalável</h3><p>Acesso direto em dispositivos compatíveis.</p></div><div><Icon name="WifiOff" size={34} /><h3>Offline conforme o plano</h3><p>A duração offline depende da licença escolhida.</p></div></div></article><article className="app-pro-cost-card"><div><h2>Uma parada de planta pode custar mais do que uma licença</h2><p>O BOJ S7-PLC PRO ajuda a organizar sintomas e evidências antes de trocar hardware ou reiniciar equipamentos sem uma causa clara.</p><ul className="app-pro-cost-bullets"><li>Reduza a tentativa e erro sob pressão.</li><li>Priorize evidências antes de intervir.</li><li>Prepare uma sessão mais focada no STEP 7.</li></ul><strong className="app-pro-cost-emphasis">Menos suposições. Melhor critério técnico.</strong></div><div className="app-pro-cost-visual" aria-hidden="true"><span /><span /><span /><span /><b><TriangleAlert size={24} /></b></div></article><article className="app-pro-audience-card"><h2>Para quem é</h2><p className="app-pro-audience-intro">Para profissionais e equipes que diagnosticam sistemas Siemens S7-300/400.</p><div className="app-pro-audience-list">{portugueseApp.audience.map((item) => <div className="app-pro-audience-item" key={item.text}><Icon name={item.icon} size={18} /><span>{item.text}</span></div>)}</div><p className="app-pro-audience-note">Apoia o técnico; não substitui o critério técnico qualificado.</p></article></div></section>

      <section className="app-pro-trust-section"><div className="mock-home-container app-pro-trust-grid"><img className="app-pro-trust-avatar" src={walterBojAvatar} alt="Walter Adrián Boj" loading="lazy" /><div className="app-pro-trust-copy"><h2>Desenvolvido com experiência de planta</h2><p>O BOJ S7-PLC PRO foi desenvolvido por Walter Adrián Boj, especialista em automação industrial com experiência em diagnóstico de PLC Siemens, manutenção, programação e redes industriais.</p><a className="mock-btn mock-btn-outline" href={contact.linkedin} target="_blank" rel="noreferrer">Ver perfil profissional <ExternalLink size={17} /></a></div><div className="app-pro-trust-metrics"><article><Icon name="Clock" size={22} /><h3>Mais de 15 anos</h3><p>Experiência em automação e diagnóstico industrial.</p></article><article><Icon name="Cpu" size={22} /><h3>PLC Siemens</h3><p>Foco em falhas reais de planta com S7-300/400.</p></article><article><Icon name="ShieldCheck" size={22} /><h3>Método de campo</h3><p>Processo estruturado para reduzir suposições.</p></article></div></div></section>
      <section className="app-pro-faq-section"><div className="mock-home-container"><div className="app-pro-section-heading app-pro-section-heading-dark"><h2>Perguntas frequentes</h2></div><div className="app-pro-faq-grid">{portugueseApp.faq.map((item) => <details className="app-pro-faq-item" key={item.question}><summary>{item.question}<ChevronDown size={16} /></summary><p>{item.answer}</p></details>)}</div></div></section>
    </div>
  );
}

function PortugueseS7CoursePage() {
  const checkoutUrl = offer.course.checkout.checkoutUrl;
  const checkoutAction = (source) => () => track("course_checkout_click", { source, language: "pt" });
  return (
    <div className="english-course-page portuguese-page" data-language="pt">
      <Hero image={heroCursoS7} eyebrow="CURSO ONLINE APLICADO" title="Diagnóstico industrial em sistemas Siemens S7-300/400" subtitle="Aprenda um método orientado ao campo para estados da CPU, Diagnostic Buffer, hardware online, PROFIBUS, módulos e sinais. Inclui acesso permanente ao curso e um mês de BOJ S7-PLC PRO. O conteúdo do curso está disponível em espanhol." primary={{ label: "Comprar curso + App PRO", href: checkoutUrl, external: true, onClick: checkoutAction("pt_course_hero") }} secondary={{ label: "Ver o que está incluído", href: "#pt-curso-inclui" }} note="Idioma do curso: espanhol · Pagamento único · Acesso permanente · 1 mês de BOJ S7-PLC PRO · 1 dispositivo" aside={<aside className="course-hero-preview" aria-label="Resumo da oferta do curso"><div className="course-hero-preview-media"><img src={manualPreviewImages[0]} alt="Capa do manual de diagnóstico S7-300/400" /><span>Manual técnico profissional</span></div><div className="course-hero-preview-copy"><span>CURSO + APP PRO</span><strong>{offer.course.price}</strong><small>Pagamento único · Acesso permanente ao curso</small><ul><li><CheckCircle2 size={15} />Método de diagnóstico aplicado</li><li><CheckCircle2 size={15} />1 mês de BOJ S7-PLC PRO</li></ul></div></aside>} />
      <section className="en-course-section" id="pt-curso-inclui"><div className="mock-home-container"><div className="en-section-heading"><span>OFERTA COMPLETA</span><h2>Curso, manual técnico e app de diagnóstico guiado</h2><p>Um pacote de formação desenvolvido para conectar compreensão técnica e decisões em campo.</p></div><div className="en-course-includes-grid"><article className="en-course-visual-card"><img src={courseS7400Visual} alt="Formação em diagnóstico industrial Siemens S7-300/400" loading="lazy" /><div><strong>{offer.course.price}</strong><span>Pagamento único</span></div></article><article className="en-course-list-card"><span className="en-course-language-note">CONTEÚDO DO CURSO EM ESPANHOL</span><h3>O que está incluído</h3><ul>{portugueseS7Course.includes.map((item) => <li key={item}><CheckCircle2 size={17} />{item}</li>)}</ul></article></div></div></section>
      <section className="en-course-section en-course-section-dark"><div className="mock-home-container"><div className="en-section-heading"><span>RESULTADOS DE APRENDIZAGEM</span><h2>Um processo de diagnóstico repetível para situações reais de planta</h2></div><div className="en-course-outcome-grid">{portugueseS7Course.outcomes.map((item, index) => <article key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></article>)}</div></div></section>
      <section className="en-course-section"><div className="mock-home-container en-course-two-columns"><div><div className="en-section-heading"><span>PROGRAMA</span><h2>Módulos técnicos</h2></div><ol className="en-course-module-list">{portugueseS7Course.modules.map((item) => <li key={item}>{item}</li>)}</ol></div><div><div className="en-section-heading"><span>PÚBLICO</span><h2>Para quem é este curso</h2></div><ul className="en-course-audience-list">{portugueseS7Course.audience.map((item) => <li key={item}><CheckCircle2 size={17} />{item}</li>)}</ul></div></div></section>
      <section className="en-course-purchase-strip" id="pt-compra-curso"><div className="mock-home-container"><div><span>CURSO + 1 MÊS DE APP PRO</span><h2>{offer.course.price} · Pagamento único</h2><p>Acesso permanente ao curso em espanhol, material técnico e uma licença do App PRO para um dispositivo.</p></div><a className="mock-btn mock-btn-primary" href={checkoutUrl} target="_blank" rel="noreferrer" onClick={checkoutAction("pt_course_mid")}>Comprar curso + App PRO <ExternalLink size={17} /></a></div></section>
      <section className="en-course-section en-course-faq-section"><div className="mock-home-container"><div className="en-section-heading"><span>DÚVIDAS</span><h2>Perguntas frequentes</h2></div><div className="app-pro-faq-grid">{portugueseS7Course.faq.map((item) => <details className="app-pro-faq-item" key={item.question}><summary>{item.question}<ChevronDown size={16} /></summary><p>{item.answer}</p></details>)}</div></div></section>
      <section className="en-course-final-cta"><div className="mock-home-container"><div><h2>Construa um método mais claro para sua próxima falha S7-300/400</h2><p>Estude no seu ritmo e use o BOJ S7-PLC PRO como apoio guiado durante o primeiro mês.</p></div><a className="mock-btn mock-btn-primary" href={checkoutUrl} target="_blank" rel="noreferrer" onClick={checkoutAction("pt_course_final")}>Comprar por {offer.course.price} <ExternalLink size={17} /></a></div></section>
    </div>
  );
}

function PortugueseProjectsPage() {
  return (
    <PageShell eyebrow="PROJETOS INDUSTRIAIS" title="Trabalhos de engenharia e automação realizados em plantas reais" subtitle="Casos selecionados de programação de PLC, IHM, SCADA, painéis de controle, migrações e comissionamento." heroImage={heroObras} heroPrimary={{ label: "Consultar projeto semelhante", href: whatsappUrl("Olá, gostaria de conversar sobre um projeto de automação industrial semelhante aos trabalhos realizados pela BOJ."), external: true }} heroSecondary={{ label: "Ver serviços", href: "/pt/servicos" }}>
      <section className="portfolio-prep"><div><p className="eyebrow">EXPERIÊNCIA EM PROJETOS REAIS</p><h2>Cada caso apresenta o problema, a intervenção e o resultado</h2><p>Os nomes dos clientes e os escopos correspondem a trabalhos realizados. As imagens são ilustrativas, salvo indicação em contrário.</p></div><div className="asset-slots"><span>Engenharia</span><span>PLC / IHM / SCADA</span><span>Comissionamento</span></div></section>
      <div className="works-grid">{portugueseProjects.map((project, index) => { const source = projects[project.sourceIndex]; const visual = getServiceWorkImage(projectWorkImageFiles[project.sourceIndex]) || projectVisuals[project.sourceIndex % projectVisuals.length]; return <article className="project-card" key={project.title}><div className="project-media"><img className="project-photo" src={visual} alt="" loading="lazy" /><span>PROJETO {String(index + 1).padStart(2, "0")}</span><span className="works-image-disclaimer">Imagem ilustrativa</span><div className="project-media-overlay"><strong>{source.year}</strong><small>{source.client}</small></div></div><div className="project-body"><div className="project-title-row"><h2>{project.title}</h2></div><p className="project-meta-line">{project.sector} · {project.role}</p><p>{project.description}</p><div className="tag-list">{project.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div><div className="project-result-grid"><div><h3>Problema inicial</h3><p>{project.problem}</p></div><div><h3>Intervenção</h3><p>{project.intervention}</p></div><div><h3>Resultado</h3><p>{project.result}</p></div></div></div></article>; })}</div>
      <RouteCTA title="Trabalho técnico para problemas reais de planta" text="Conte-nos o que o sistema está fazendo, quais equipamentos estão envolvidos e quais evidências estão disponíveis." primaryLabel="Consultar projeto semelhante" primaryHref={whatsappUrl("Olá, gostaria de conversar sobre um projeto de automação industrial.")} secondaryLabel="Ver serviços" secondaryHref="/pt/servicos" />
    </PageShell>
  );
}

const portugueseContactServices = ["Diagnóstico de falhas industriais", "Automação industrial", "Migração de PLC", "Formação técnica", "Licenças BOJ S7-PLC", "Outra consulta"];

function PortugueseContactForm() {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", interest: portugueseContactServices[0], message: "", website: "" });
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");
  const updateField = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  async function handleSubmit(event) {
    event.preventDefault(); setStatus("sending"); setFeedback("");
    try {
      await sendContactForm({ ...form, subject: `Consulta do site em português: ${form.interest}` });
      setStatus("success"); setFeedback("Sua consulta foi enviada. Normalmente respondemos em até dois dias úteis.");
      setForm({ name: "", company: "", email: "", phone: "", interest: portugueseContactServices[0], message: "", website: "" });
      track("contact_form_submit", { location: "contact_page", language: "pt", interest: form.interest });
    } catch (error) { setStatus("error"); setFeedback(error.message || "Não foi possível enviar a mensagem. Você também pode falar conosco pelo WhatsApp."); }
  }
  return <form className="contact-form" onSubmit={handleSubmit} id="pt-formulario-contato"><h2>Conte-nos sobre seu caso</h2><p>Informe o contexto essencial para encaminharmos sua consulta corretamente. Falhas urgentes de planta são coordenadas pelo WhatsApp e dependem de disponibilidade.</p><label>Nome<input name="name" value={form.name} onChange={updateField} required /></label><label>Empresa<input name="company" value={form.company} onChange={updateField} /></label><div className="form-row"><label>E-mail<input name="email" type="email" value={form.email} onChange={updateField} required /></label><label>Telefone<input name="phone" value={form.phone} onChange={updateField} /></label></div><label>Área de interesse<select name="interest" value={form.interest} onChange={updateField}>{portugueseContactServices.map((service) => <option key={service}>{service}</option>)}</select></label><label>Mensagem<textarea name="message" rows="5" value={form.message} onChange={updateField} placeholder="Descreva o sintoma, equipamento, PLC ou rede industrial envolvida, ou a formação necessária." required /></label><input className="form-honeypot" name="website" value={form.website} onChange={updateField} tabIndex="-1" autoComplete="off" aria-hidden="true" /><div className="button-row"><button className="btn primary" type="submit" disabled={status === "sending"}>{status === "sending" ? "Enviando…" : "Enviar consulta"}<ArrowRight size={18} /></button><a className="btn secondary" href={whatsappUrl("Olá, estou entrando em contato com a BOJ pelo site em português.")}>Falar pelo WhatsApp</a></div>{feedback ? <p className={`form-feedback ${status}`} role="status">{feedback}</p> : null}</form>;
}

function PortugueseContactPage() {
  const checklist = ["Marca e modelo do PLC ou da IHM", "Estado da CPU e LEDs visíveis", "Sintoma principal", "Se a falha é permanente ou intermitente", "Fotos ou capturas online, se disponíveis"];
  return <PageShell eyebrow="CONTATO" title="Conte-nos qual problema técnico ou solução você precisa" subtitle="Entre em contato com a BOJ sobre falhas de planta, projetos de automação, formação técnica ou licenças BOJ S7-PLC." heroImage={heroContacto} heroPrimary={{ label: "Falar pelo WhatsApp", href: whatsappUrl("Olá, estou entrando em contato com a BOJ pelo site em português."), external: true }} heroSecondary={{ label: "Preencher formulário", href: "#pt-formulario-contato" }}><section className="contact-direct contact-decision-intro"><div><p className="eyebrow">COMECE AQUI</p><h2>Compartilhe o contexto que melhor descreve sua situação</h2><p>Uma breve descrição nos ajuda a diferenciar uma falha urgente de planta de uma consulta de engenharia, formação ou licenciamento.</p></div></section><div className="contact-grid"><div className="contact-panel"><h2>Dados de contato</h2><p className="contact-panel-intro">Use o formulário, e-mail ou WhatsApp. As informações chegam à mesma equipe técnica.</p><ContactLine icon="Wrench" label="Responsável técnico" value={contact.responsible} /><ContactLine icon="MapPin" label="Localização" value={contact.location} /><ContactLine icon="Mail" label="E-mail" value={contact.email} href={`mailto:${contact.email}`} /><ContactLine icon="Phone" label="WhatsApp" value={contact.whatsappDisplay} href={whatsappUrl("Olá, estou entrando em contato com a BOJ pelo site em português.")} /><div className="social-placeholders"><a href={contact.linktree} target="_blank" rel="noreferrer">Linktree BOJ</a><a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></div><div className="diagnostic-checklist"><h3>Informações que ajudam a oferecer uma primeira resposta útil</h3>{checklist.map((item) => <CheckItem key={item}>{item}</CheckItem>)}</div><div className="button-row"><PrimaryLink href={whatsappUrl("Olá, estou entrando em contato com a BOJ pelo site em português.")}>Falar pelo WhatsApp</PrimaryLink><SecondaryLink href={`mailto:${contact.email}`}>Enviar e-mail</SecondaryLink></div></div><PortugueseContactForm /></div></PageShell>;
}

function WorksPage() {
  return (
    <PageShell
      eyebrow="Obras"
      title="Obras y trabajos realizados en entornos industriales"
      subtitle="Casos de ingeniería, programación PLC, HMI, SCADA, tableros, migraciones y puesta en marcha presentados con problema inicial, intervención y resultado."
      heroImage={heroObras}
      heroPrimary={{ label: "Solicitar diagnóstico", href: whatsappUrl("Hola, escribo desde la web de BOJ para consultar por una obra o intervención industrial similar.") }}
      heroSecondary={{ label: "Ver servicios", href: "/servicios" }}
    >
      <PortfolioPrep />
      <div className="works-grid">
        {featuredProjects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index + 1} />
        ))}
      </div>
      {additionalProjects.length ? (
        <details className="works-archive">
          <summary>
            <span className="works-archive-summary">
              <strong>Ver {additionalProjects.length} obras adicionales</strong>
              <small>Casos completos con problema, intervención y resultado</small>
            </span>
          </summary>
          <div className="works-grid works-grid-archive">
            {additionalProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index + featuredProjects.length + 1}
              />
            ))}
          </div>
        </details>
      ) : null}
      <RouteCTA
        title="Intervenciones técnicas para problemas reales de planta"
        text="El análisis puede partir del problema operativo, revisar el estado técnico actual y definir una solución con alcance claro, pruebas y puesta en marcha."
        primaryLabel="Consultar por una obra similar"
        primaryHref={whatsappUrl("Hola, escribo desde la web de BOJ para consultar por una obra o intervención industrial similar.")}
        secondaryLabel="Ver servicios"
        secondaryHref="/servicios"
      />
    </PageShell>
  );
}

function TechnicalResourcesPage() {
  return (
    <PageShell
      eyebrow="Recursos técnicos"
      title="Biblioteca técnica Siemens para automatización industrial"
      subtitle="Guías aplicadas sobre herramientas Siemens utilizadas en planta: STEP 7 SIMATIC Manager, TIA Portal, MicroWIN, LOGO! Soft Comfort y SIMATIC WinCC."
      heroImage={heroRecursos}
      heroPrimary={{ label: "Solicitar diagnóstico", href: whatsappUrl("Hola, escribo desde la web de BOJ para realizar una consulta técnica.") }}
      heroSecondary={{ label: "Ver cursos", href: "/cursos" }}
    >
      <section className="resources-intro-panel">
        <div>
          <p className="eyebrow">Consulta técnica orientada a planta</p>
          <h2>Software, diagnóstico y mantenimiento explicados con criterio industrial</h2>
          <p>
            Esta sección reúne recursos para técnicos de mantenimiento, instrumentistas,
            programadores PLC, ingenieros y estudiantes técnicos que necesitan comprender qué
            herramienta corresponde usar, qué permite diagnosticar y cómo se aplica en sistemas
            Siemens instalados.
          </p>
        </div>
        <div className="resource-intro-checks">
          <CheckItem>Contenido técnico sin instaladores no oficiales ni atajos riesgosos.</CheckItem>
          <CheckItem>Enfoque aplicado a planta, diagnóstico, respaldo y puesta en marcha.</CheckItem>
          <CheckItem>Conexión directa con cursos y servicios técnicos de BOJ.</CheckItem>
        </div>
      </section>

      <section className="inner-section">
        <SectionHeader
          eyebrow="Biblioteca"
          title="Recursos disponibles"
          text="Cada recurso abre una página interna con explicación técnica, aplicaciones típicas, importancia para mantenimiento y enlaces oficiales Siemens."
        />
        <div className="resources-index-grid">
          {technicalResources.map((resource) => (
            <TechnicalResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </section>

      <CourseCTA />
    </PageShell>
  );
}

function TechnicalResourceCard({ resource }) {
  const visual = resourceVisuals[resource.visualKey]?.[0];

  return (
    <article className="technical-resource-card">
      <div className="resource-card-visual">
        {visual ? (
          <img src={visual} alt="" aria-hidden="true" loading="lazy" />
        ) : (
          <div className="resource-card-fallback" aria-hidden="true">
            <Icon name="MonitorCog" />
            <span>Visual técnico editable</span>
          </div>
        )}
        <span className="visual-disclaimer">Imagen ilustrativa</span>
        <span className="resource-status">{resource.status}</span>
      </div>
      <div className="technical-resource-body">
        <h3>{resource.title}</h3>
        <p>{resource.description}</p>
        <div className="article-tags compact">
          {resource.meta.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <PrimaryLink href={resource.path}>
          Ver recurso <ArrowRight size={17} />
        </PrimaryLink>
      </div>
    </article>
  );
}

function TechnicalArticlePage({ route }) {
  const resource = technicalResources.find((item) => item.path === route);
  if (!resource) return <NotFound />;

  return (
    <PageShell eyebrow="Recurso técnico" title={resource.title} subtitle={resource.subtitle}>
      <article className="technical-article resource-article">
        <div className="article-kicker">
          <span>{resource.status}</span>
          <span>Aplicado a mantenimiento industrial</span>
        </div>
        <p className="article-lead">{resource.description}</p>
        <div className="article-tags">
          {resource.meta.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>

        <TechnicalResourceVisual resource={resource} />

        {resource.sections.map((section) => (
          <section className="article-section" key={section.title}>
            <h3>{section.title}</h3>
            <p>{section.text}</p>
            {section.items ? (
              <ul className="article-list">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        <OfficialLinksBlock links={resource.officialLinks} />
        <CourseCTA />
      </article>
    </PageShell>
  );
}

function TechnicalResourceVisual({ resource }) {
  const visuals = resourceVisuals[resource.visualKey] || [];

  if (!visuals.length) {
    return (
      <div className="resource-visual-panel fallback">
        <Icon name="MonitorCog" size={34} />
        <div>
          <strong>Espacio visual técnico</strong>
          <span>Preparado para cargar capturas reales desde la carpeta assets.</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`resource-visual-panel ${visuals.length > 1 ? "has-collage" : ""}`}>
      <div className="resource-main-image">
        <img src={visuals[0]} alt={`${resource.title} aplicado a automatización industrial`} loading="lazy" />
      </div>
      {visuals.length > 1 ? (
        <div className="resource-secondary-grid">
          {visuals.slice(1).map((image, index) => (
            <img
              key={image}
              src={image}
              alt={`${resource.title} captura técnica ${index + 2}`}
              loading="lazy"
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function OfficialLinksBlock({ links }) {
  return (
    <section className="official-links-panel">
      <div>
        <p className="eyebrow">Fuentes y enlaces oficiales</p>
        <h3>Documentación, soporte técnico y referencias del fabricante</h3>
        <p>
          Para descargas, documentación y soporte técnico, se recomienda consultar siempre fuentes
          oficiales del fabricante. Evitar instaladores no oficiales reduce riesgos técnicos,
          legales y de seguridad.
        </p>
      </div>
      <div className="official-link-grid">
        {links.map((link) => (
          <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
            <strong>{link.label}</strong>
            <span>{link.text}</span>
            <ExternalLink size={16} />
          </a>
        ))}
      </div>
    </section>
  );
}

function CourseCTA() {
  return (
    <RouteCTA
      title="Formación técnica aplicada"
      text="Si trabajas con sistemas Siemens en planta y quieres aprender a diagnosticar, interpretar fallas y trabajar con criterio técnico, puedes consultar los cursos disponibles de BOJ Automatización y Control."
      primaryLabel="Ver cursos"
      primaryHref="/cursos"
      secondaryLabel="Consultar capacitación"
      secondaryHref={whatsappUrl("Hola, escribo desde la web de BOJ para consultar por cursos técnicos de automatización industrial.")}
    />
  );
}

// Página post-compra (/gracias), construida en el bloque 3A pero NO enlazada,
// noindex y fuera del sitemap. Se activa como retorno del checkout en el bloque
// 3B. Copy neutro: no asume qué parámetros anexa Hotmart al volver (se verifica
// en 3B); cubre el caso de pago pendiente sin leer la URL.
function GraciasPage() {
  useEffect(() => {
    // Métrica de la página de retorno. La conversión "purchase" real se define
    // en el bloque 3B (con fuente única y dedupe); aquí no se registra purchase
    // ni begin_checkout.
    track("thank_you_page_view", { item: "curso_s7_app_pro" });
  }, []);

  return (
    <PageShell
      eyebrow="Compra"
      title="Estamos procesando tu operación"
      subtitle="Revisa el correo electrónico utilizado durante la compra. Si el pago todavía está pendiente, recibirás las instrucciones cuando se confirme."
    >
      <div className="gracias-steps">
        <article className="gracias-step">
          <h3>1 · Revisa tu correo electrónico</h3>
          <p>
            Las instrucciones de acceso al material se envían al correo electrónico que utilizaste en la compra. Si no las ves, revisa
            la carpeta de spam o promociones.
          </p>
        </article>
        <article className="gracias-step">
          <h3>2 · Activa tu mes de BOJ S7-PLC PRO</h3>
          <p>
            Conserva el mismo correo electrónico utilizado en la compra. Cuando tu acceso esté disponible, recibirás las
            instrucciones para activar tu mes de BOJ S7-PLC PRO.
          </p>
        </article>
        <article className="gracias-step">
          <h3>3 · ¿Problemas con el acceso?</h3>
          <p>
            Escríbenos y lo resolveremos: <a href={`mailto:${contact.email}`}>{contact.email}</a> o WhatsApp{" "}
            <a href={whatsappUrl("Hola, acabo de comprar el curso S7-300/400 y tengo un problema con el acceso.")}>
              {contact.whatsappDisplay}
            </a>
            .
          </p>
        </article>
      </div>
      <div className="gracias-actions">
        <a className="btn primary" href={appProductUrl} target="_blank" rel="noreferrer">
          Abrir la app
        </a>
        <SecondaryLink href="/">Volver al inicio</SecondaryLink>
      </div>
    </PageShell>
  );
}

function ContactPage() {
  return (
    <PageShell
      eyebrow="Contacto"
      title="Hablemos del problema técnico o la solución que necesitas"
      subtitle="Elige el tipo de consulta y comparte el contexto esencial. Atendemos urgencias de planta, proyectos de automatización, cursos y licencias BOJ S7-PLC PRO."
      heroImage={heroContacto}
      heroPrimary={{ label: "Escribir por WhatsApp", href: whatsappUrl("Hola, escribo desde la web de BOJ para realizar una consulta técnica."), external: true }}
      heroSecondary={{ label: "Completar formulario", href: "#consulta-tecnica" }}
    >
      <section className="contact-direct contact-decision-intro">
        <div>
          <p className="eyebrow">Empieza aquí</p>
          <h2>Elige la consulta que mejor describe tu situación</h2>
          <p>
            Así llegamos a la primera conversación con el contexto correcto, sin hacerte repetir
            información ni mezclar una urgencia de planta con una consulta comercial.
          </p>
        </div>
      </section>

      <div className="contact-route-grid" aria-label="Tipos de consulta">
        {contactDecisionPaths.map((path) => {
          const Icon = icons[path.icon];
          return (
            <a
              className={`contact-route-card contact-route-card--${path.tone}`}
              href={path.href}
              key={path.title}
              target={path.external ? "_blank" : undefined}
              rel={path.external ? "noreferrer" : undefined}
            >
              <span className="contact-route-icon" aria-hidden="true">
                <Icon size={22} />
              </span>
              <span className="contact-route-kicker">{path.eyebrow}</span>
              <h3>{path.title}</h3>
              <p>{path.description}</p>
              <span className="contact-route-action">
                {path.action} <ArrowRight size={17} aria-hidden="true" />
              </span>
            </a>
          );
        })}
      </div>

      <div className="contact-grid" id="consulta-tecnica">
        <div className="contact-panel">
          <h2>Contacto y datos útiles</h2>
          <p className="contact-panel-intro">
            Si la consulta no es urgente, utiliza el formulario o escríbenos por el canal que te resulte
            más cómodo. La información llega al mismo equipo técnico.
          </p>
          <ContactLine icon="Wrench" label="Responsable" value={contact.responsible} />
          <ContactLine icon="MapPin" label="Ubicación" value={contact.location} />
          <ContactLine icon="Mail" label="Correo electrónico" value={contact.email} href={`mailto:${contact.email}`} />
          <ContactLine
            icon="Phone"
            label="WhatsApp"
            value={contact.whatsappDisplay}
            href={whatsappUrl("Hola, escribo desde la web de BOJ para consultar por una falla de planta, automatización, cursos o migración.")}
          />
          <div className="social-placeholders">
            <a href={contact.linktree} target="_blank" rel="noreferrer">Linktree BOJ</a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
          <div className="diagnostic-checklist">
            <h3>Para darte una primera respuesta útil</h3>
            {contactChecklist.map((item) => (
              <CheckItem key={item}>{item}</CheckItem>
            ))}
          </div>
          <div className="button-row">
            <PrimaryLink href={whatsappUrl("Hola, escribo desde la web de BOJ para realizar una consulta técnica.")}>
              Contactar por WhatsApp
            </PrimaryLink>
            <SecondaryLink href={`mailto:${contact.email}`}>Enviar correo</SecondaryLink>
          </div>
        </div>

        <ContactForm />
      </div>

      <section className="inner-section">
        <h2>También puedes consultar por</h2>
        <div className="function-grid">
          {quickServices.map((item) => (
            <CheckItem key={item}>{item}</CheckItem>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    interest: "Diagnóstico de fallas",
    message: "",
  });

  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("sending");
    setFeedback("");
    try {
      await sendContactForm({ ...form, subject: `Consulta: ${form.interest}` });
      setStatus("success");
      setFeedback("Consulta enviada. Respondemos normalmente dentro de 48 horas hábiles.");
      setForm({ name: "", company: "", email: "", phone: "", interest: "Diagnóstico de fallas", message: "" });
      track("contact_form_submit", { location: "contact_page", interest: form.interest });
    } catch (error) {
      setStatus("error");
      setFeedback(error.message || "No se pudo enviar. También puede escribirnos por WhatsApp.");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2>Cuéntanos el caso</h2>
      <p>
        Completa los datos esenciales para derivar correctamente la consulta. Respondemos normalmente dentro
        de 48 horas hábiles; las fallas urgentes se coordinan por WhatsApp y están sujetas a disponibilidad.
      </p>
      <label>
        Nombre
        <input name="name" value={form.name} onChange={updateField} required />
      </label>
      <label>
        Empresa
        <input name="company" value={form.company} onChange={updateField} />
      </label>
      <div className="form-row">
        <label>
          Correo electrónico
          <input name="email" type="email" value={form.email} onChange={updateField} required />
        </label>
        <label>
          Teléfono
          <input name="phone" value={form.phone} onChange={updateField} />
        </label>
      </div>
      <label>
        Servicio de interés
        <select name="interest" value={form.interest} onChange={updateField}>
          {quickServices.map((service) => (
            <option key={service}>{service}</option>
          ))}
        </select>
      </label>
      <label>
        Mensaje
        <textarea
          name="message"
          rows="5"
          value={form.message}
          onChange={updateField}
          placeholder="Describe el síntoma, el equipo involucrado, el PLC o la red industrial, o la formación requerida."
          required
        />
      </label>
      <div className="button-row">
        <button className="btn primary" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Enviando…" : "Enviar consulta"}
          <ArrowRight size={18} />
        </button>
        <a className="btn secondary" href={whatsappUrl("Hola, escribo desde la web de BOJ para realizar una consulta técnica.")}>
          Contactar por WhatsApp
        </a>
      </div>
      {feedback ? <p className={`form-feedback ${status}`} role="status">{feedback}</p> : null}
    </form>
  );
}

const legalContent = {
  privacy: {
    title: "Política de privacidad",
    intro: "Explica qué datos recopilamos en este sitio, para qué se utilizan y cómo puede ejercer sus derechos.",
    sections: [
      ["Responsable", `BOJ Automatización y Control. Contacto: ${contact.email}.`],
      ["Datos que recopilamos", "El formulario puede solicitar nombre, empresa, correo, teléfono, servicio de interés y mensaje. También podemos registrar métricas anónimas o seudónimas de navegación y conversiones mediante Vercel Web Analytics."],
      ["Finalidad", "Usamos los datos para responder consultas, coordinar servicios, facilitar acceso a productos adquiridos y mejorar el funcionamiento del sitio. No vendemos datos personales."],
      ["Proveedores", "El formulario se procesa mediante Resend. Las compras se procesan en Hotmart y la activación de la app puede vincular el correo de compra con Supabase. Cada proveedor aplica sus propias condiciones de privacidad."],
      ["Conservación y derechos", `Conservamos la información durante el tiempo necesario para atender la relación comercial y obligaciones aplicables. Puede solicitar acceso, corrección o eliminación escribiendo a ${contact.email}.`],
    ],
  },
  terms: {
    title: "Términos y condiciones",
    intro: "Condiciones generales para utilizar el sitio y contratar servicios o productos digitales de BOJ.",
    sections: [
      ["Uso del sitio", "La información técnica es orientativa y no reemplaza procedimientos de planta, evaluación de riesgos, normativa aplicable ni intervención de personal autorizado."],
      ["Servicios técnicos", "Alcance, agenda, entregables, costos y condiciones se confirman por propuesta. La atención urgente es coordinada y está sujeta a disponibilidad."],
      ["Productos digitales", "El curso S7-300/400 es autoguiado e incluye material técnico descargable, guías prácticas y un mes de BOJ S7-PLC PRO desde la compra. El curso permanece accesible; la licencia PRO vence sin cobro automático."],
      ["Propiedad intelectual", "La compra concede un derecho personal de uso y no autoriza redistribución, reventa, publicación o copia masiva."],
      ["Marcas de terceros", "Siemens, SIMATIC, STEP 7, TIA Portal, S7-300 y S7-400 son marcas de sus respectivos titulares. BOJ es independiente y no está afiliada, patrocinada ni certificada por Siemens."],
    ],
  },
  licenses: {
    title: "Condiciones de licencia de BOJ S7-PLC PRO",
    intro: "Reglas principales de acceso y uso de la herramienta de diagnóstico.",
    sections: [
      ["Activación", "La licencia incluida con el curso comienza en la fecha de compra y se vincula al correo registrado en Hotmart."],
      ["Duración", "La licencia incluida dura un mes y finaliza sin renovación ni cobro automático."],
      ["Alcance de uso", "La licencia es limitada, no exclusiva e intransferible."],
      ["Limitación técnica", "BOJ S7-PLC PRO organiza síntomas, hipótesis y verificaciones. No controla el equipo ni sustituye un diagnóstico profesional."],
      ["Soporte", `El soporte cubre acceso, activación y uso general de la app por correo. Contacto: ${contact.email}.`],
    ],
  },
  refunds: {
    title: "Política de reembolsos",
    intro: "La compra del curso se procesa en Hotmart y cuenta con una garantía de reembolso de 7 días.",
    sections: [
      ["Curso S7-300/400", "Puede solicitar el reembolso dentro de los 7 días posteriores a la compra, de acuerdo con el flujo y las condiciones de Hotmart."],
      ["Efectos del reembolso", "Una vez aprobado, se revoca el acceso al curso, al material técnico y a la licencia PRO incluida."],
      ["Servicios técnicos", "Los servicios profesionales se rigen por la propuesta aceptada y por el trabajo coordinado o realizado."],
      ["Ayuda", `Si tiene un problema de acceso, escriba a ${contact.email} desde el correo utilizado en Hotmart.`],
    ],
  },
};

function LegalPage({ type }) {
  const page = legalContent[type];
  return (
    <PageShell eyebrow="Información legal" title={page.title} subtitle={page.intro}>
      <article className="legal-page">
        <p className="legal-updated">Última actualización: 16 de julio de 2026.</p>
        {page.sections.map(([title, text]) => (
          <section key={title}><h2>{title}</h2><p>{text}</p></section>
        ))}
        <p className="legal-contact">Consultas legales o de privacidad: <a href={`mailto:${contact.email}`}>{contact.email}</a>.</p>
      </article>
    </PageShell>
  );
}

function PageShell({ eyebrow, title, subtitle, heroImage, heroPrimary, heroSecondary, afterHero, children }) {
  return (
    <>
      <Hero
        image={heroImage || heroRecursos}
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        primary={heroPrimary}
        secondary={heroSecondary}
      />
      {afterHero}
      <section className="section boj-shell-body">
        <div className="section-container">{children}</div>
      </section>
    </>
  );
}

function SectionHeader({ eyebrow, title, text }) {
  return (
    <div className="section-header">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

function BrandLogo({ compact = false }) {
  return (
    <span className={`brand-logo ${compact ? "compact" : ""}`}>
      <img src={bojLogo} alt="BOJ Automatización y Control" />
    </span>
  );
}

function TrustBar() {
  return (
    <section className="trust-bar" aria-label="Resumen técnico BOJ">
      <div className="section-container trust-grid">
        {trustSignals.map((signal) => (
          <div className="trust-item" key={signal.value}>
            <strong>{signal.value}</strong>
            <span>{signal.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function AuthoritySection() {
  return (
    <section className="authority-section">
      <div className="section-container authority-grid">
        <div>
          <p className="eyebrow">Autoridad técnica</p>
          <h2>Más de 15 años de experiencia en automatización industrial, diagnóstico de fallas y puesta en marcha en planta</h2>
          <p>
            BOJ combina trabajo de campo, lectura online de PLC, análisis eléctrico y criterio
            de mantenimiento para resolver problemas reales sin caer en cambios innecesarios.
          </p>
          <div className="authority-list">
            {authorityHighlights.map((item) => (
              <CheckItem key={item}>{item}</CheckItem>
            ))}
          </div>
        </div>
        <figure className="authority-visual">
          <img src={plantVisual} alt="Planta industrial como contexto de automatización BOJ" loading="lazy" />
        </figure>
      </div>
    </section>
  );
}

function IndustrialScopeSection() {
  return (
    <section className="section evidence-section">
      <div className="section-container evidence-grid">
        <div className="evidence-copy">
          <p className="eyebrow">Desde la ingeniería hasta producción</p>
          <h2>Experiencia técnica desde la ingeniería hasta la puesta en marcha</h2>
          <p>
            La propuesta se apoya en trabajo concreto: ingeniería básica y de detalle,
            planos eléctricos, armado de tableros, programación PLC/HMI/SCADA, migraciones,
            pruebas FAT/SAT y puesta en marcha coordinada con producción.
          </p>
          <div className="evidence-list">
            <CheckItem>Ingeniería eléctrica, pliegos, especificaciones y digitalización de planos.</CheckItem>
            <CheckItem>Diseño, testing, montaje y conexionado de tableros de control y potencia.</CheckItem>
            <CheckItem>Modernizaciones con PLC Siemens, HMI, SCADA, variadores, sensores y actuadores.</CheckItem>
          </div>
          <div className="button-row">
            <SecondaryLink href="/obras">Ver obras reales</SecondaryLink>
            <GhostLink href="/servicios">Revisar servicios</GhostLink>
          </div>
        </div>
        <div className="evidence-visual-grid" aria-label="Imágenes técnicas de trabajos y contexto industrial BOJ">
          <figure className="evidence-photo large">
            <img src={panelDiagnosticVisual} alt="Tablero industrial con diagnóstico online" loading="lazy" />
          </figure>
          <figure className="evidence-photo">
            <img src={plcCabinetVisual} alt="Sistema PLC industrial" loading="lazy" />
          </figure>
          <figure className="evidence-photo">
            <img src={engineeringVisual} alt="Planos e ingeniería eléctrica" loading="lazy" />
          </figure>
        </div>
      </div>
    </section>
  );
}

function MethodSection() {
  return (
    <section className="section method-section">
      <div className="section-container">
        <SectionHeader
          eyebrow="Método de trabajo"
          title="Diagnóstico con secuencia técnica, no con prueba y error"
          text="La intervención parte de síntomas observables y evidencia online. El objetivo es encontrar causa raíz, evitar cambios innecesarios y dejar una decisión clara para mantenimiento."
        />
        <div className="method-grid">
          {methodSteps.map((step) => (
            <article className="method-card" key={step.title}>
              <Icon name={step.icon} />
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroAssetVisual() {
  return (
    <div className="hero-asset-visual">
      <img src={plcCabinetVisual} alt="" loading="lazy" />
    </div>
  );
}

function FeatureCard({ item }) {
  return (
    <article className="feature-card">
      <span className="icon-chip">
        <Icon name={item.icon} />
      </span>
      <h3>{item.title}</h3>
      <p>{item.text}</p>
    </article>
  );
}

function ServiceSummaryCard({ service }) {
  return (
    <article className="service-card">
      <Icon name={service.icon} />
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <div className="mini-proof">
        <strong>Resuelve:</strong>
        <span>{service.problem}</span>
      </div>
      <a href="/servicios">
        Ver detalle <ArrowRight size={16} />
      </a>
    </article>
  );
}

function ServicePrinciples() {
  return (
    <section className="service-principles">
      <div>
        <p className="eyebrow">Criterio de intervención</p>
        <h2>Primero evidencia. Después decisión técnica.</h2>
      </div>
      <div className="principle-list">
        {servicePrinciples.map((item) => (
          <CheckItem key={item}>{item}</CheckItem>
        ))}
      </div>
    </section>
  );
}

function ServiceDetailCard({ service }) {
  return (
    <article className="service-detail">
      <div className="service-heading">
        <span className="icon-chip">
          <Icon name={service.icon} />
        </span>
        <div>
          <h2>{service.title}</h2>
          <p>{service.description}</p>
        </div>
      </div>
      <div className="service-columns">
        <div>
          <h3>Aplicaciones</h3>
          <ul className="clean-list">
            {service.applications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="service-proof-grid">
            <div>
              <h3>Situación típica</h3>
              <p>{service.problem}</p>
            </div>
            <div>
              <h3>Impacto si no se corrige</h3>
              <p>{service.impact}</p>
            </div>
            <div>
              <h3>Cómo lo aborda BOJ</h3>
              <p>{service.approach}</p>
            </div>
          </div>
        </div>
        <div className="benefit-box">
          <h3>Resultado esperado</h3>
          <p>{service.benefit}</p>
          {service.whenToConsult ? (
            <div className="consult-box">
              <h3>Cuándo conviene consultar</h3>
              <p>{service.whenToConsult}</p>
            </div>
          ) : null}
          <a
            className="btn secondary"
            href={whatsappUrl(`Hola, escribo desde la web de BOJ para consultar por el servicio: ${service.title}.`)}
          >
            Consultar por este servicio
          </a>
        </div>
      </div>
    </article>
  );
}

function CourseCard({ course, expanded = false }) {
  const visual = courseVisuals[course.id] || plcCabinetVisual;

  return (
    <article className="course-card">
      <div className="course-visual-block" aria-hidden="true">
        <img src={visual} alt="" loading="lazy" />
        <div className="course-visual-overlay">
          <Icon name={course.icon} size={34} />
          <span>{course.shortTitle}</span>
        </div>
      </div>
      <div className="course-card-body">
        <h3>{course.title}</h3>
        <dl>
          <div>
            <dt>Nivel</dt>
            <dd>{course.level}</dd>
          </div>
          <div>
            <dt>Modalidad</dt>
            <dd>{course.mode}</dd>
          </div>
          <div>
            <dt>Público objetivo</dt>
            <dd>{course.audience}</dd>
          </div>
          <div>
            <dt>Qué resuelve en planta</dt>
            <dd>{course.learn}</dd>
          </div>
        </dl>
        <PrimaryLink href={`#${course.path}`}>
          Ver temario y consulta <ArrowRight size={18} />
        </PrimaryLink>
        {expanded ? (
          <div className="course-outcomes">
            <h4>Capacidades al finalizar:</h4>
            {course.outcomes.map((item) => (
              <CheckItem key={item}>{item}</CheckItem>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

function InfoBlock({ title, items, numbered = false }) {
  const ListTag = numbered ? "ol" : "ul";
  return (
    <section className="info-block">
      <h2>{title}</h2>
      <ListTag className={numbered ? "number-list" : "clean-list"}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ListTag>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const visual = getServiceWorkImage(projectWorkImageFiles[index - 1]) || projectVisuals[(index - 1) % projectVisuals.length];

  return (
    <article className="project-card">
      <div className="project-media">
        <img className="project-photo" src={visual} alt={`Imagen ilustrativa para ${project.title}`} loading="lazy" />
        <span>OBRA {String(index).padStart(2, "0")}</span>
        <span className="works-image-disclaimer">Imagen ilustrativa</span>
        <div className="project-media-overlay">
          <strong>{project.year}</strong>
          <small>{project.client}</small>
        </div>
      </div>
      <div className="project-body">
        <div className="project-title-row">
          <h2>{project.title}</h2>
        </div>
        {project.sector || project.role ? (
          <p className="project-meta-line">{[project.sector, project.role].filter(Boolean).join(" · ")}</p>
        ) : null}
        <p>{project.description}</p>
        {project.highlights?.length ? (
          <ul className="project-highlights">
            {project.highlights.map((item) => (
              <li key={item}>
                <CheckCircle2 size={15} aria-hidden="true" /> {item}
              </li>
            ))}
          </ul>
        ) : null}
        <div className="tag-list">
          {project.technologies.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        <div className="project-result-grid">
          <div>
            <h3>Problema inicial</h3>
            <p>{project.problem}</p>
          </div>
          <div>
            <h3>Intervención</h3>
            <p>{project.intervention}</p>
          </div>
          <div>
            <h3>Resultado</h3>
            <p>{project.result}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

function PortfolioPrep() {
  return (
    <section className="portfolio-prep">
      <div>
        <p className="eyebrow">Portfolio técnico con obras reales</p>
        <h2>Experiencia presentada como problema, intervención y resultado</h2>
        <p>
          Cada caso resume una situación real de planta: qué necesitaba el sistema, cómo se
          intervino y qué valor técnico quedó para operación o mantenimiento.
        </p>
      </div>
      <div className="asset-slots">
        <span>Ingeniería</span>
        <span>PLC / HMI / SCADA</span>
        <span>Puesta en marcha</span>
      </div>
    </section>
  );
}

function AppWorkflow() {
  return (
    <section className="inner-section workflow-panel">
      <div>
        <p className="eyebrow">Flujo de uso en campo</p>
        <h2>Del síntoma al próximo paso técnico</h2>
        <p>
          La app está pensada para situaciones donde el técnico necesita ordenar datos rápidos:
          familia de PLC, LEDs, estado de CPU, red, señales y observaciones de planta.
        </p>
      </div>
      <div className="workflow-steps">
        {["Cargar síntoma", "Cruzar LEDs y red", "Revisar evidencia", "Definir acción"].map((step) => (
          <span key={step}>{step}</span>
        ))}
      </div>
    </section>
  );
}

function ContactLine({ icon, label, value, href }) {
  const content = (
    <>
      <Icon name={icon} />
      <span>
        <small>{label}</small>
        <strong>{value}</strong>
      </span>
    </>
  );

  if (href) {
    return (
      <a className="contact-line" href={href}>
        {content}
      </a>
    );
  }

  return <div className="contact-line">{content}</div>;
}

function CheckItem({ children }) {
  return (
    <div className="check-item">
      <CheckCircle2 size={18} />
      <span>{children}</span>
    </div>
  );
}

function PrimaryLink({ href, children }) {
  return (
    <a className="btn primary" href={href}>
      {children}
    </a>
  );
}

function SecondaryLink({ href, children }) {
  return (
    <a className="btn secondary" href={href}>
      {children}
    </a>
  );
}

function GhostLink({ href, children }) {
  return (
    <a className="btn ghost" href={href}>
      {children}
    </a>
  );
}

function RouteCTA({ title, text, primaryLabel, primaryHref, secondaryLabel, secondaryHref }) {
  return (
    <section className="route-cta">
      <div>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <div className="button-row">
        <PrimaryLink href={primaryHref}>{primaryLabel}</PrimaryLink>
        {secondaryLabel ? <SecondaryLink href={secondaryHref}>{secondaryLabel}</SecondaryLink> : null}
      </div>
    </section>
  );
}

function AppMockup() {
  return (
    <div className="app-mockup" aria-label="Captura real de BOJ S7-PLC">
      <div className="app-screenshot-shell">
        <div className="app-screenshot-toolbar">
          <span>BOJ S7-PLC</span>
          <small>Course Edition</small>
        </div>
        <figure className="app-screenshot-frame">
          <img src={appScreenshot} alt="Captura de BOJ S7-PLC con diagnóstico por LEDs CPU Siemens S7-300/400" loading="lazy" />
        </figure>
      </div>
    </div>
  );
}

function CourseVisual({ type, course }) {
  if (type === "s7") {
    return (
      <aside className="course-side-visual s7">
        <div className="side-visual-header">
          <span>STEP 7 Classic</span>
          <Icon name="Cpu" />
        </div>
        <div className="step7-collage" aria-label="Capturas reales de SIMATIC STEP 7 Classic">
          <figure className="step7-shot main">
            <img src={step7HwConfigVisual} alt="HW Config de SIMATIC STEP 7 Classic con red PROFIBUS" loading="lazy" />
            <figcaption>HW Config / PROFIBUS</figcaption>
          </figure>
          <div className="step7-secondary-grid">
            <figure className="step7-shot">
              <img src={step7ManagerVisual} alt="SIMATIC Manager con estructura de proyecto Siemens S7" loading="lazy" />
              <figcaption>SIMATIC Manager</figcaption>
            </figure>
            <figure className="step7-shot">
              <img src={step7LadderVisual} alt="Editor LAD STL FBD de STEP 7 Classic" loading="lazy" />
              <figcaption>LAD / STL / FBD</figcaption>
            </figure>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="course-side-visual tia">
      <div className="side-visual-header">
        <span>TIA Portal</span>
        <Icon name="MonitorCog" />
      </div>
      <figure className="course-side-photo">
        <img src={plcCabinetVisual} alt="PLC Siemens para curso TIA Portal" loading="lazy" />
      </figure>
      <div className="tia-course-side-copy">
        <span>PROGRAMA EN DESARROLLO</span>
        <h2>Una base ordenada para trabajar en TIA Portal</h2>
        <p>El contenido conectará configuración, programación y diagnóstico inicial en un recorrido aplicado.</p>
        <ul>
          {course?.learnItems?.slice(0, 3).map((item) => (
            <li key={item}>
              <CheckCircle2 size={17} aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

function ClientLogoBand() {
  return (
    <section className="client-band">
      <div className="section-container">
        <p className="eyebrow">Experiencia en obras y entornos industriales</p>
        <div className="logo-strip">
          {/* Reemplazar por logos reales si se cuenta con autorización de uso de marca. */}
          {clientLogoSlots.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="section-container">
        <h2>Soporte técnico para resolver fallas, capacitar equipos y mejorar sistemas de automatización</h2>
        <p>
          Las consultas pueden orientarse a diagnóstico, automatización, cursos, migraciones,
          redes industriales, tableros o BOJ S7-PLC.
        </p>
        <div className="button-row">
          <PrimaryLink href={whatsappUrl("Hola, escribo desde la web de BOJ para consultar por una falla o servicio técnico industrial.")}>
            Contactar por WhatsApp
          </PrimaryLink>
          <SecondaryLink href="/servicios">Ver servicios</SecondaryLink>
          <GhostLink href="/cursos">Ver cursos</GhostLink>
        </div>
      </div>
    </section>
  );
}

function Footer({ language }) {
  return <MainFooter language={language} />;
}

function MainFooter({ language }) {
  const english = language === "en";
  const portuguese = language === "pt";
  const footerLinks = english
    ? [
        { label: "Home", path: "/en" },
        { label: "Services", path: "/en/services" },
        { label: "Training", path: "/en/courses" },
        { label: "App", path: "/en/app" },
        { label: "Projects", path: "/en/projects" },
        { label: "Contact", path: "/en/contact" },
      ]
    : portuguese
      ? [
          { label: "Início", path: "/pt" },
          { label: "Serviços", path: "/pt/servicos" },
          { label: "Cursos", path: "/pt/cursos" },
          { label: "App", path: "/pt/app" },
          { label: "Projetos", path: "/pt/projetos" },
          { label: "Contato", path: "/pt/contato" },
        ]
      : [
        { label: "Inicio", path: "/" },
        { label: "Servicios", path: "/servicios" },
        { label: "Cursos", path: "/cursos" },
        { label: "Recursos", path: "/recursos-tecnicos" },
        { label: "App", path: "/app" },
        { label: "Obras", path: "/obras" },
        { label: "Contacto", path: "/contacto" },
        ];
  const footerCopy = english
    ? {
        description: "Industrial diagnostics, automation and technical training.",
        contact: "Contact",
        contactAria: "Contact details",
        navigation: "Navigation",
        navigationAria: "Footer navigation",
        legalAria: "Legal information in Spanish",
        legal: ["Privacy policy (ES)", "Terms (ES)", "Licenses (ES)", "Refunds (ES)"],
        follow: "Follow BOJ",
        copyright: `© ${new Date().getFullYear()} BOJ Automation and Control. All rights reserved. BOJ is independent and is not affiliated with Siemens.`,
      }
    : portuguese
      ? {
          description: "Diagnóstico industrial, automação e formação técnica.",
          contact: "Contato",
          contactAria: "Dados de contato",
          navigation: "Navegação",
          navigationAria: "Navegação do rodapé",
          legalAria: "Informações legais em espanhol",
          legal: ["Privacidade (ES)", "Termos (ES)", "Licenças (ES)", "Reembolsos (ES)"],
          follow: "Siga a BOJ",
          copyright: `© ${new Date().getFullYear()} BOJ Automação e Controle. Todos os direitos reservados. A BOJ é independente e não é afiliada à Siemens.`,
        }
      : {
          description: "Soluciones para diagnóstico y eficiencia en automatización.",
          contact: "Contacto",
          contactAria: "Datos de contacto",
          navigation: "Navegación",
          navigationAria: "Navegación del footer",
          legalAria: "Información legal",
          legal: ["Privacidad", "Términos", "Licencias", "Reembolsos"],
          follow: "Síguenos",
          copyright: `© ${new Date().getFullYear()} BOJ Automatización y Control. Todos los derechos reservados. BOJ es independiente y no está afiliada a Siemens.`,
        };

  return (
    <footer className="site-footer mock-footer">
      <div className="mock-home-container mock-footer-inner">
        <div className="mock-footer-brand">
          <BrandLogo compact />
          <p>{footerCopy.description}</p>
        </div>
        <div className="mock-footer-contact" aria-label={footerCopy.contactAria}>
          <h3>{footerCopy.contact}</h3>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href="https://www.bojautomatizacion.com" target="_blank" rel="noreferrer">
            www.bojautomatizacion.com
          </a>
          <span>{contact.location}</span>
        </div>
        <nav className="mock-footer-nav" aria-label={footerCopy.navigationAria}>
          <h3>{footerCopy.navigation}</h3>
          {footerLinks.map((item) => (
            <a key={item.path} href={item.path}>
              {item.label}
            </a>
          ))}
        </nav>
        <nav className="mock-footer-nav mock-footer-legal" aria-label={footerCopy.legalAria}>
          <h3>Legal</h3>
          <a href="/privacidad">{footerCopy.legal[0]}</a>
          <a href="/terminos">{footerCopy.legal[1]}</a>
          <a href="/licencias">{footerCopy.legal[2]}</a>
          <a href="/reembolsos">{footerCopy.legal[3]}</a>
        </nav>
        <div className="mock-footer-social">
          <h3>{footerCopy.follow}</h3>
          <div>
            <a href={contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
            <a href={contact.linktree} target="_blank" rel="noreferrer" aria-label="Linktree">lt</a>
          </div>
        </div>
      </div>
      <div className="mock-footer-bottom">
        <span>{footerCopy.copyright}</span>
      </div>
    </footer>
  );
}

function FloatingContact({ language }) {
  const english = language === "en";
  const portuguese = language === "pt";
  const quickCopy = english
    ? { aria: "Quick contact options", message: "Hello, I am contacting BOJ from the English website.", whatsapp: "Contact BOJ on WhatsApp", email: "Send email" }
    : portuguese
      ? { aria: "Opções de contato rápido", message: "Olá, estou entrando em contato com a BOJ pelo site em português.", whatsapp: "Falar com a BOJ pelo WhatsApp", email: "Enviar e-mail" }
      : { aria: "Contactos rápidos", message: "Hola, escribo desde la web de BOJ para realizar una consulta técnica.", whatsapp: "Consultar por WhatsApp", email: "Enviar correo electrónico" };
  return (
    <div className="floating-contact" aria-label={quickCopy.aria}>
      <a href={whatsappUrl(quickCopy.message)} aria-label={quickCopy.whatsapp}>
        <Phone size={20} />
      </a>
      <a href={`mailto:${contact.email}`} aria-label={quickCopy.email}>
        <Mail size={20} />
      </a>
    </div>
  );
}

export default App;
