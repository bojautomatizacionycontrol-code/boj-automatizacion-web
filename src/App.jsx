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
import bojLogo from "./assets/boj-logo-real-cropped.png";
import appScreenshot from "./assets/APP.png";
import appRealCapture from "./assets/boj-s7-plc-real-capture.png";
import appProHeroLaptopVisual from "./assets/app-pro-hero-background-v2.jpg";
import appPanelPrincipalDiagnostico from "./assets/app-panel-principal-diagnostico.jpg";
import appResultadoDiagnostico from "./assets/app-resultado-diagnostico.jpg";
import appDiagnosticoGuiado from "./assets/app-diagnostico-guiado.jpg";
import appHipotesisPriorizadas from "./assets/app-hipotesis-priorizadas.jpg";
import walterBojAvatar from "./assets/walter-boj-avatar-field.jpeg";
import heroIndustrialCover from "./assets/boj-hero-industrial-cover-v4.jpg";
import heroInicio from "./assets/hero-inicio.jpg";
import heroServicios from "./assets/hero-servicios.jpg";
import heroCursos from "./assets/hero-cursos.jpg";
import heroCursoS7 from "./assets/hero-curso-s7.jpg";
import heroCursoTia from "./assets/hero-curso-tia.jpg";
import heroApp from "./assets/hero-app.jpg";
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
// Para ACTIVAR: completá los IDs abajo. Mientras estén vacíos, todo es no-op
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

const projectVisuals = [
  plantVisual,
  plcCabinetVisual,
  panelDiagnosticVisual,
  aerialPlantVisual,
  engineeringVisual,
  step7Visual,
];

// Imagen real (de services-works) por obra, en el mismo orden que `projects`.
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

const homeWorkLines = [
  {
    icon: "Factory",
    title: "Servicios industriales",
    text: "Diagnóstico, automatización, migraciones y soporte técnico en planta.",
  },
  {
    icon: "GraduationCap",
    title: "Capacitación técnica",
    text: "Cursos prácticos para mantenimiento y diagnóstico en sistemas Siemens.",
  },
  {
    icon: "MonitorCog",
    title: "Herramientas digitales",
    text: "BOJ S7-PLC como apoyo para ordenar fallas en S7-300/400.",
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

const servicesFeaturedWorks = [
  {
    title: "Generador WEG BT40",
    meta: "Ledesma · 2024",
    description: "Ingeniería, conexionado y puesta en marcha de generador BT40 de 42 MW. Usina Ingenio.",
    imageFiles: [
      "Generador industrial — para Generador WEG BT40.jpg",
      "generador_industrial_sobre_fondo_minimalista.png",
    ],
  },
  {
    title: "Evaporador",
    meta: "CALSA · 2024",
    description: "Corrección y agregado de nuevas bombas y señales en programación y HMI.",
    imageFiles: [
      "Evaporador  equipo de proceso — para Evaporador CALSA.jpg",
      "sistema_industrial_en_ambiente_minimalista.png",
    ],
  },
  {
    title: "Generadores Siemens TG3/TG4",
    meta: "Generación Mediterránea · 2019",
    description: "Programación de PLC, HMI y SCADA de servicios para nuevas turbinas generadoras.",
    imageFiles: [
      "Turbina o generador industrial — para Generadores Siemens TG3TG4.jpg",
      "turbina_industrial_en_estudio_brillante.png",
    ],
  },
  {
    title: "Compresores",
    meta: "TGN Tucumán / TGN Jujuy · 2018",
    description: "Upgrade de tableros de control de motocompresores.",
    imageFiles: [
      "Motocompresor industrial — para Compresores TGN.jpg",
      "componente_industrial_en_estudio_minimalista.png",
    ],
  },
  {
    title: "Sistema contra incendios",
    meta: "GETSA · 2017",
    description: "Programación y comisionamiento de sistema contra incendios con PLC S7-1500.",
    imageFiles: [
      "Sistema contra incendios industrial — bombas, cañerías, válvulas.jpg",
      "sistema_industrial_con_bomba_y_tubería.png",
      "sistema_industrial_con_bomba_y_tuberia.png",
    ],
  },
  {
    title: "Gasómetro",
    meta: "Gasnor · 2017",
    description: "Programación de gasómetro en PLC S7-1200 y HMI para calibración de medidores.",
    imageFiles: [
      "Medición de gas  gasómetro — tuberías, instrumentación, skid de medición.jpg",
      "montaje_industrial_de_proceso_modular.png",
    ],
  },
  {
    title: "Planta de agua",
    meta: "YPF · 2016",
    description: "Upgrade de PLC S5-95U a S7-1500 en planta de agua.",
    imageFiles: [
      "Planta de agua  bombeo industrial — bombas, cañerías, tratamiento.jpg",
      "sistema_industrial_de_tratamiento_de_agua.png",
    ],
  },
  {
    title: "Central de lubricación",
    meta: "Ledesma · 2016",
    description: "Programación de PLC S7-1500 y HMI TP1200 para central de lubricación.",
    imageFiles: [
      "Central de lubricación industrial — bombas, manifold, líneas de lubricación.jpg",
      "sistema_hidráulico_de_control_en_pared.png",
      "sistema_hidraulico_de_control_en_pared.png",
    ],
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
  { icon: "WifiOff", title: "Offline según plan", text: "Disponibilidad offline variable según la licencia contratada." },
];

const appTrustMetrics = [
  { icon: "Clock", title: "+15 años", text: "Experiencia en automatización, mantenimiento y diagnóstico industrial." },
  { icon: "Cpu", title: "PLC Siemens", text: "Foco técnico en S7-300/400 y fallas reales de planta." },
  { icon: "ShieldCheck", title: "Miles de fallas", text: "Resueltas y analizadas en entornos industriales." },
  { icon: "ClipboardCheck", title: "Metodología probada", text: "Criterio aplicado en campo para reducir prueba y error." },
];

const appFaqItems = [
  {
    question: "¿Qué incluye el Trial gratuito?",
    answer: "El Trial permite probar BOJ S7-PLC PRO durante 48 horas. Funciona solo online y algunas funciones pueden estar limitadas.",
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
    question: "¿La app funciona offline?",
    answer: "Depende del plan. El Trial funciona solo online. Suscripción mensual, Mensual de pago único, Curso + licencia y Profesional permiten uso offline hasta 2 días. Empresarial permite uso offline hasta 7 días.",
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
      "BOJ S7-PLC PRO es una herramienta web de asistencia técnica para diagnóstico orientativo en PLC Siemens S7-300/400, con prueba inicial de 48 hs y licencias PRO.",
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
};

function getRoute() {
  let path = window.location.pathname || "/";
  if (path.length > 1 && path.endsWith("/")) path = path.replace(/\/+$/, ""); // sin slash final salvo raíz
  return path;
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
    const meta = routeMeta[route] || routeMeta["/inicio"];
    document.title = meta.title;

    const setMeta = (selector, attribute, content) => {
      const element = document.querySelector(selector);
      if (element) element.setAttribute(attribute, content);
    };

    setMeta('meta[name="description"]', "content", meta.description);
    setMeta('meta[property="og:title"]', "content", meta.title);
    setMeta('meta[property="og:description"]', "content", meta.description);
    setMeta('meta[name="robots"]', "content", isKnownRoute(route) ? "index, follow" : "noindex, follow");

    // canonical y og:url por ruta, con dominio de PRODUCCIÓN fijo (nunca
    // location.origin, para no emitir canonical hacia URLs de Preview). Home = "/".
    const canonicalUrl = "https://www.bojautomatizacion.com" + (route === "/inicio" ? "/" : route);
    setMeta('link[rel="canonical"]', "href", canonicalUrl);
    setMeta('meta[property="og:url"]', "content", canonicalUrl);
  }, [route]);

  return (
    <>
      <Header route={route} />
      <main>
        <RouteView route={route} />
      </main>
      <Footer />
      <FloatingContact />
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
  // /gracias despacha pero NO integra KNOWN_ROUTES: así hereda robots
  // "noindex, follow" (post-compra, fuera de sitemap y sin enlaces internos).
  if (route === "/gracias") return <GraciasPage />;
  return <NotFound />;
}

// NotFound client-side (no es un HTTP 404 real: Vercel responde index.html). El
// efecto de metadatos le aplica robots "noindex, follow".
function NotFound() {
  return (
    <PageShell
      eyebrow="Error 404"
      title="Página no encontrada"
      subtitle="La página que buscás no existe o cambió de dirección. Volvé al inicio para seguir navegando."
      heroPrimary={{ label: "Volver al inicio", href: "/" }}
    >
      <p className="notfound-help">
        ¿Buscabas algo puntual? Ir a <a href="/servicios">Servicios</a>, <a href="/cursos">Cursos</a>, <a href="/app">la App</a> o <a href="/contacto">Contacto</a>.
      </p>
    </PageShell>
  );
}

function Header({ route }) {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header">
      <a className="brand" href="/" onClick={closeMenu} aria-label="Ir a inicio">
        <BrandLogo />
      </a>

      <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label="Navegación principal">
        {navItems.map((item) => {
          const active =
            route === item.path ||
            (item.path === "/cursos" && route.startsWith("/cursos")) ||
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
            href={whatsappUrl("Hola, escribo desde la web de BOJ Automatización y Control para solicitar un diagnóstico industrial.")}
            onClick={closeMenu}
          >
            Solicitar diagnóstico
          </a>
        </div>
      </nav>

      <div className="header-actions">
        <a
          className="header-action solid"
          href={whatsappUrl("Hola, escribo desde la web de BOJ Automatización y Control para solicitar un diagnóstico industrial.")}
          onClick={closeMenu}
        >
          Solicitar diagnóstico
        </a>
      </div>

      <button
        className="nav-toggle"
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Abrir menú"
        aria-expanded={open}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
    </header>
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
function Hero({ image, eyebrow, title, subtitle, primary, secondary, note }) {
  return (
    <section className="boj-hero">
      {image ? <img className="boj-hero-bg" src={image} alt="" aria-hidden="true" /> : null}
      <div className="boj-hero-shade" aria-hidden="true" />
      <div className="mock-home-container boj-hero-inner">
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
      />

      <HomeClientStrip />

      <section className="mock-section mock-work" data-home-section="worklines">
        <div className="mock-home-container">
          <h2>Servicios, formación y herramientas para mantenimiento industrial</h2>
          <div className="mock-work-grid">
            {homeWorkLines.map((item) => (
              <article className="mock-work-card" key={item.title}>
                <span className="mock-icon-circle">
                  <Icon name={item.icon} size={32} />
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

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
          <h2>¿Tenés una falla, una máquina parada o necesitás capacitar a tu equipo?</h2>
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
              href={mailtoUrl("Consulta técnica BOJ", "Hola, quiero realizar una consulta técnica.")}
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
        <h2>Obras reales, no ejemplos de manual</h2>
        <p className="mock-obras-subtitle">
          Ingeniería, programación, migraciones y puesta en marcha en plantas industriales. Cada caso, con su problema, intervención y resultado.
        </p>
        <div className="mock-obras-grid">
          {featured.map((project, index) => (
            <article className="mock-obras-card" key={project.title}>
              <div className="mock-obras-media">
                <img src={getServiceWorkImage(projectWorkImageFiles[index]) || projectVisuals[index]} alt={project.title} loading="lazy" />
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

function AppDiagnosticMockup() {
  return (
    <figure className="mock-app-visual real-app-capture app-product-composition" aria-label="Capturas reales de BOJ S7-PLC en escritorio y celular">
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
              alt="Captura real de BOJ S7-PLC con diagnóstico por estado de CPU"
              loading="lazy"
            />
          </div>
          <div className="app-laptop-base" aria-hidden="true" />
        </div>
        <div className="app-mobile-frame" aria-label="Vista mobile de BOJ S7-PLC">
          <div className="app-mobile-speaker" aria-hidden="true" />
          <img
            src={appScreenshot}
            alt="Vista mobile de BOJ S7-PLC con diagnóstico por LEDs de CPU"
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
          <MonitorCog size={15} /> Curso online
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
        <li>Cursos online y presenciales</li>
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
          <ContactLine icon="Mail" label="Email" value={contact.email} href={`mailto:${contact.email}`} />
          <ContactLine
            icon="Phone"
            label="WhatsApp"
            value={contact.whatsappDisplay}
            href={whatsappUrl("Hola, escribo desde la web de BOJ para realizar una consulta técnica.")}
          />
          <ContactLine icon="Clock" label="Atención" value="Lunes a viernes de 8:00 a 18:00 hs" />
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
    document.getElementById("servicios-principales")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="services-redesign-page">
      <Hero
        image={heroServicios}
        eyebrow="Servicios"
        title="Servicios técnicos para reducir paradas y sostener automatización industrial"
        subtitle="Diagnóstico, ingeniería, programación, redes, tableros y puesta en marcha con experiencia real en plantas industriales y foco en continuidad operativa."
        primary={{ label: "Solicitar diagnóstico", href: whatsappUrl("Hola, escribo desde la web de BOJ para solicitar un diagnóstico industrial.") }}
        secondary={{ label: "Ver áreas de servicio", href: "/servicios", onClick: scrollToServiceDetails }}
      />

      <section className="services-workflow-section">
        <div className="mock-home-container">
          <div className="services-section-heading services-workflow-heading">
            <h2>Cómo trabajamos</h2>
            <p>Un enfoque técnico orientado a diagnóstico claro, decisión correcta y continuidad operativa.</p>
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

      <section className="services-field-section">
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

      <section className="services-redesign-section services-works-section">
        <div className="mock-home-container">
          <div className="services-section-heading services-works-heading">
            <h2>Obras e intervenciones destacadas</h2>
            <p>
              Selección de trabajos técnicos realizados en automatización, migraciones, tableros, PLC, HMI
              y puesta en marcha.
            </p>
          </div>
          <div className="services-works-grid">
            {servicesFeaturedWorks.map((work) => {
              const imageSrc = getServiceWorkImage(work.imageFiles);

              return (
                <article
                  className={`services-work-card${imageSrc ? "" : " services-work-card--missing-media"}`}
                  key={`${work.title}-${work.meta}`}
                >
                  <div className="services-work-media" aria-hidden="true">
                    {imageSrc ? <img src={imageSrc} alt="" loading="lazy" /> : null}
                  </div>
                  <div className="services-work-content">
                    <h3>{work.title}</h3>
                    <p>{work.meta}</p>
                    <span>{work.description}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="services-redesign-section services-areas-section" id="areas-de-servicio">
        <div className="mock-home-container">
          <div className="services-section-heading services-area-heading">
            <h2>Áreas de servicio</h2>
            <p>Servicios técnicos para automatización, diagnóstico y soporte industrial.</p>
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

      <section className="services-redesign-section services-main-section" id="servicios-principales">
        <div className="mock-home-container">
          <div className="services-section-heading services-main-heading">
            <h2>Servicios principales</h2>
          </div>
          <div className="services-main-grid">
            {mainServiceCards.map((service) => (
              <ServicePrimaryCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="services-redesign-section services-secondary-section">
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

      <section className="services-redesign-cta">
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
          <h2>¿Buscás capacitación técnica para vos o para tu equipo?</h2>
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
        <strong>{course.label}</strong>
        {course.upcoming ? <span className="course-status-badge">Próximamente</span> : null}
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
    <section className="s7-sales-section s7-method">
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
    <section className={`s7-sales-section s7-testimonials s7-testimonials-${background}`}>
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
        Checkout — próximamente
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
    ? { label: "Checkout — próximamente", href: "#", onClick: (event) => event.preventDefault() }
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
      text: "Situaciones típicas que enfrentás todos los días en planta.",
    },
    {
      icon: "MonitorCog",
      title: "Decisiones con criterio",
      text: "Evidencia, síntomas y pasos correctos para diagnosticar.",
    },
    {
      icon: "Clock",
      title: "Menos prueba y error",
      text: "Ordená la búsqueda y reducí tiempos de máquina parada.",
    },
    {
      icon: "ShieldCheck",
      title: "Enfocado en campo",
      text: "Herramientas y métodos que funcionan donde realmente se necesitan.",
    },
    {
      icon: "Network",
      title: "Relación entre síntomas, LEDs, red, módulos y señales",
      text: "Conectá las piezas y entendé el sistema completo.",
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
      text: "Comprendé tu sistema como un profesional.",
    },
    {
      icon: "Cpu",
      title: "Interpretar estados RUN/STOP/SF/BF",
      text: "Qué significan realmente y qué acción tomar.",
    },
    {
      icon: "ClipboardCheck",
      title: "Usar Diagnostic Buffer con criterio técnico",
      text: "Extraé, filtrá y entendé eventos que importan.",
    },
    {
      icon: "Network",
      title: "Diagnosticar PROFIBUS DP",
      text: "Fallas típicas en red, esclavos y comunicación.",
    },
    {
      icon: "CircuitBoard",
      title: "Diferenciar falla de campo, red, módulo o lógica",
      text: "Localizá el origen del problema sin perder tiempo.",
    },
    {
      icon: "Brain",
      title: "Construir una hipótesis defendible",
      text: "Antes de intervenir, definí qué vas a verificar.",
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
    "Uso offline hasta 2 días",
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
    "Uso offline hasta 2 días",
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
      answer: "Recibís un kit profesional de diagnóstico: material técnico estructurado, PDFs de consulta, método de análisis, casos de fallas reales y 1 mes de acceso a BOJ S7-PLC PRO.",
    },
    {
      question: "¿El curso incluye la APP PRO?",
      answer: "Sí. La compra incluye el curso Diagnóstico S7-300/400 y 1 mes de acceso a BOJ S7-PLC PRO.",
    },
    {
      question: "¿Por cuánto tiempo tengo la APP PRO?",
      answer: "Incluye 1 mes de APP PRO para 1 dispositivo. Cuando vence el mes, podés renovarla si querés seguir usándola.",
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
      answer: "El acceso mensual a la APP PRO finaliza. El material del curso queda según las condiciones de entrega definidas, y la app puede renovarse si necesitás continuar con acceso PRO.",
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
        title="Cuando la línea está parada y todos te miran, dejá de adivinar."
        subtitle="Aprendé a diagnosticar fallas reales en PLC Siemens S7-300/400 —CPU, PROFIBUS, módulos y señales— con una secuencia probada: del síntoma a la causa con evidencia, no con prueba y error. Para mantenimiento que trabaja bajo presión."
        primary={heroPurchaseAction}
        secondary={{ label: "Ver qué incluye", href: "/cursos/s7-300-400", onClick: (event) => scrollToCourseSection(event, "curso-s7-incluye") }}
        note={guaranteeNote}
      />

      <S7ProofStrip />

      <S7MethodStrip />

      <section className="s7-sales-section s7-sales-problem">
        <div className="s7-sales-container s7-sales-problem-grid">
          <div className="s7-sales-section-copy">
            <p className="s7-sales-kicker">Qué problema resuelve</p>
            <h2>No es un curso de programación. Es para diagnosticar fallas reales en condiciones de planta.</h2>
            <p>Aprendé a pensar como un técnico experto cuando la máquina está parada y la presión operativa es alta.</p>
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

      <section className="s7-sales-section s7-sales-dark s7-sales-learning">
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

      <section className="s7-sales-section s7-sales-includes" id="curso-s7-incluye">
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
                    <ScanSearch size={16} aria-hidden="true" /> Mirá las primeras 8 páginas del manual
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
                    <ScanSearch size={16} aria-hidden="true" /> Recorré capturas reales de la app
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
                    <p className="s7-sales-app-features-title">Con la app PRO podés:</p>
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
                <ScanSearch size={16} aria-hidden="true" /> Mirá el sistema en acción
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

      <div className="s7-sales-confidence">
        <div className="s7-sales-container">
          <Icon name="ShieldCheck" size={26} />
          <p>Perdé el miedo a conectarte al PLC y diagnosticá con <strong>criterio profesional.</strong></p>
        </div>
      </div>

      <section className="s7-sales-section s7-sales-program" id="curso-s7-programa">
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

      <section className="s7-sales-section s7-sales-audience">
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

      <section className="s7-sales-section s7-sales-instructor">
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

      <section className="s7-sales-section s7-sales-offer" id="curso-s7-compra">
        <div className="s7-sales-container">
          <div className="s7-sales-offer-heading">
            <p className="s7-sales-kicker">Accedé al curso + BOJ S7-PLC PRO</p>
            <h2>Una oferta técnica para ordenar el diagnóstico antes de intervenir.</h2>
            <p>Una parada de máquina puede costar más que esta formación. El objetivo es que sepas ordenar el diagnóstico antes de cambiar hardware, reiniciar equipos o intervenir sin evidencia.</p>
          </div>

          <div className="s7-sales-offer-panel">
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

            <div className="s7-sales-offer-content">
              <ul className="s7-sales-offer-list">
                {offerIncludes.map((item) => (
                  <li key={item}>
                    <CheckCircle2 size={18} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {/* "Cómo funciona la compra" (bloque 3A): copy del flujo DEFINITIVO
                  (Hotmart). Solo se renderiza con el flujo validado E2E
                  (checkout live + flowValidated, corte del bloque 3B). */}
              {purchaseTarget.isFlowValidated ? (
                <ol className="s7-sales-howto">
                  <li>
                    <strong>Pago seguro con Hotmart.</strong> Checkout cifrado, con tarjeta y los medios de pago de tu país.
                  </li>
                  <li>
                    <strong>Entrega digital.</strong> Al acreditarse el pago recibís en tu email el acceso al material.
                  </li>
                  <li>
                    <strong>Activación de tu mes de App PRO.</strong> Con el mismo email de la compra. Garantía de 7 días.
                  </li>
                </ol>
              ) : null}
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
                  Probar APP 48 hs
                </a>
              </div>
              <p className="s7-sales-offer-guarantee">
                <ShieldCheck size={18} aria-hidden="true" />
                {guaranteeNote}
              </p>
              <p className="s7-sales-offer-crosslink">
                ¿Vas a usar la app de forma recurrente o en equipo? Mirá los{" "}
                <a href="/app">planes PRO (6 meses / varios dispositivos)</a>.
              </p>
              <p className="s7-sales-offer-note">Acceso digital. Verificá siempre las conclusiones en campo antes de intervenir.</p>
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

      <section className="s7-sales-section s7-sales-dark s7-sales-mistakes">
        <div className="s7-sales-container">
          <div className="s7-sales-centered-heading">
            <p className="s7-sales-kicker">Errores que este curso ayuda a evitar</p>
            <h2>Diagnosticar con método evita decisiones costosas.</h2>
          </div>
          <ul className="s7-sales-mistakes-strip">
            {mistakes.map((item) => (
              <li key={item}>
                <TriangleAlert size={18} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <S7Testimonials background="light" />

      <section className="s7-sales-section s7-sales-faq">
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

      <section className="s7-sales-final-cta">
        <div className="s7-sales-container">
          <div className="s7-sales-final-cta-panel">
            <div className="s7-sales-final-intro">
              <p className="s7-sales-final-headline">Si trabajás con PLC Siemens S7-300/400 y necesitás diagnosticar con más criterio, este curso te da método, estructura y apoyo técnico para intervenir mejor.</p>
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
                  Probar APP 48 hs
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
      ctas={[
        { label: "Comprar o consultar curso", href: whatsappUrl("Hola, escribo desde la web de BOJ para consultar por el curso de TIA Portal con PLC S7-1200/1500.") },
        { label: "Consultar por el curso", href: mailtoUrl("Consulta curso TIA Portal", "Hola, escribo desde la web de BOJ para consultar por el curso de Introducción a TIA Portal.") },
      ]}
    />
  );
}

function CourseLanding({ course, eyebrow, visual, ctas }) {
  return (
    <PageShell
      eyebrow={eyebrow}
      title={course.title}
      subtitle={course.subtitle}
      heroImage={heroCursoTia}
      heroPrimary={ctas[0]}
      heroSecondary={ctas[1]}
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
        </div>
        <CourseVisual type={visual} />
      </div>
    </PageShell>
  );
}

function AppPage() {
  const pricingCards = [appTrialPlan, ...appProPlans];
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
        image={heroApp}
        eyebrow="BOJ S7-PLC PRO"
        title="Ordená el diagnóstico antes de cambiar un solo módulo."
        subtitle="Cargá síntomas, LEDs y condiciones de campo: BOJ S7-PLC mantiene el contexto, ordena las hipótesis por evidencia y te dice qué verificar primero. Para Siemens S7-300/400, en planta y bajo presión."
        primary={{
          label: "Probar gratis 48 hs",
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
        note="Sin tarjeta de crédito · Acceso inmediato · Funciona en el navegador"
      />

      <S7ProofStrip />

      <section className="app-pro-problems-how-section">
        <div className="mock-home-container app-pro-problems-how-grid">
          <div className="app-pro-problems-panel">
            <h2>Problemas que ayuda a resolver</h2>
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
            <h2>Cómo funciona</h2>
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
            <h2>Qué incluye BOJ S7-PLC PRO</h2>
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
            <h2>Capturas reales del kit profesional</h2>
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
                <li><X size={15} aria-hidden="true" /> Dependés de la memoria</li>
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

      <section className="app-pro-plans-section" id="planes-pro">
        <div className="mock-home-container">
          <div className="app-pro-section-heading">
            <h2>Elige tu licencia PRO</h2>
            <p>Trial inicial y opciones pagas según modalidad, tiempo de uso, dispositivos y disponibilidad offline.</p>
            <p className="app-pro-plans-crosslink">
              <strong>Curso + licencia</strong>, <strong>Profesional</strong> y <strong>Empresarial</strong> incluyen el{" "}
              <a href="/cursos/s7-300-400">curso de diagnóstico S7-300/400</a>.
            </p>
          </div>
          <div className="app-pro-plan-grid">
            {pricingCards.map((plan) => (
              <article
                className={`app-pro-plan-card${plan.badge ? " featured" : ""}${plan.title === "TRIAL" ? " trial" : ""}`}
                key={plan.title}
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
          <article className="app-pro-institutional">
            <Icon name="Landmark" size={34} />
            <div>
              <h3>Institucional / Centros de formación: A cotizar.</h3>
              <p>
                Condiciones especiales para instituciones educativas, centros de formación técnica, empresas
                con múltiples usuarios o programas corporativos.
              </p>
            </div>
            <a className="mock-btn mock-btn-outline" href={appProductUrl} target="_blank" rel="noreferrer">
              Consultar condiciones <ExternalLink size={17} />
            </a>
          </article>
        </div>
      </section>

      <section className="app-pro-trial-section" id="trial-48">
        <div className="mock-home-container app-pro-trial-grid">
          <div className="app-pro-trial-rocket">
            <Icon name="Rocket" size={42} />
          </div>
          <div>
            <h2>Prueba BOJ S7-PLC PRO durante 48 hs</h2>
            <p>Acceso inmediato · Sin tarjeta de crédito · Funciona online · Ideal para conocer el flujo de diagnóstico</p>
          </div>
          <a
            className="mock-btn mock-btn-light"
            href={appProductUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => track("app_trial_click", { source: "trial_section" })}
          >
            Probar gratis 48 hs <ExternalLink size={18} />
          </a>
        </div>
      </section>

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
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index + 1} />
        ))}
      </div>
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
      <div className="resource-card-visual" aria-hidden={!visual}>
        {visual ? (
          <img src={visual} alt="" loading="lazy" />
        ) : (
          <div className="resource-card-fallback">
            <Icon name="MonitorCog" />
            <span>Visual técnico editable</span>
          </div>
        )}
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
      text="Si trabajás con sistemas Siemens en planta y querés aprender a diagnosticar, interpretar fallas y trabajar con criterio técnico, podés ver los cursos disponibles de BOJ Automatización y Control."
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
    // en el bloque 3B (con fuente única y dedupe); acá no se registra purchase
    // ni begin_checkout.
    track("thank_you_page_view", { item: "curso_s7_app_pro" });
  }, []);

  return (
    <PageShell
      eyebrow="Compra"
      title="Estamos procesando tu operación"
      subtitle="Revisá el correo utilizado durante la compra. Si el pago todavía está pendiente, vas a recibir las instrucciones cuando se confirme."
    >
      <div className="gracias-steps">
        <article className="gracias-step">
          <h3>1 · Revisá tu email</h3>
          <p>
            Las instrucciones de acceso al material se envían al email que usaste en la compra. Si no las ves, revisá
            la carpeta de spam o promociones.
          </p>
        </article>
        <article className="gracias-step">
          <h3>2 · Activá tu mes de BOJ S7-PLC PRO</h3>
          <p>
            Conservá el mismo email utilizado en la compra. Cuando tu acceso esté disponible, vas a recibir las
            instrucciones para activar tu mes de BOJ S7-PLC PRO.
          </p>
        </article>
        <article className="gracias-step">
          <h3>3 · ¿Problemas con el acceso?</h3>
          <p>
            Escribinos y lo resolvemos: <a href={`mailto:${contact.email}`}>{contact.email}</a> o WhatsApp{" "}
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
      title="Contacto técnico para industria, mantenimiento e ingeniería"
      subtitle="Consultá por diagnóstico, servicios, cursos o licencias BOJ S7-PLC PRO. También atendemos consultas por automatización, migraciones, tableros y redes industriales."
      heroImage={heroContacto}
      heroPrimary={{ label: "Escribir por WhatsApp", href: whatsappUrl("Hola, escribo desde la web de BOJ para realizar una consulta técnica."), external: true }}
      heroSecondary={{ label: "Enviar email", href: `mailto:${contact.email}` }}
    >
      <section className="contact-direct">
        <div>
          <p className="eyebrow">Atención directa técnica</p>
          <h2>Consultá por diagnóstico, servicios, cursos o licencias BOJ S7-PLC PRO</h2>
          <p>
            La consulta puede incluir el síntoma, el PLC o red involucrada, una foto del tablero
            o la necesidad de capacitación. La primera respuesta busca ordenar prioridad,
            alcance y acción posible.
          </p>
        </div>
        <PrimaryLink href={whatsappUrl("Hola, escribo desde la web de BOJ para solicitar atención técnica por una falla de planta, automatización, curso o migración.")}>
          <Phone size={18} /> Escribir por WhatsApp
        </PrimaryLink>
      </section>
      <div className="contact-grid">
        <div className="contact-panel">
          <h2>BOJ Automatización y Control</h2>
          <ContactLine icon="Wrench" label="Responsable" value={contact.responsible} />
          <ContactLine icon="MapPin" label="Ubicación" value={contact.location} />
          <ContactLine icon="Mail" label="Email" value={contact.email} href={`mailto:${contact.email}`} />
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
            <h3>Para acelerar una consulta técnica</h3>
            {contactChecklist.map((item) => (
              <CheckItem key={item}>{item}</CheckItem>
            ))}
          </div>
          <div className="button-row">
            <PrimaryLink href={whatsappUrl("Hola, escribo desde la web de BOJ para realizar una consulta técnica.")}>
              Contactar por WhatsApp
            </PrimaryLink>
            <SecondaryLink href={`mailto:${contact.email}`}>Enviar email</SecondaryLink>
          </div>
        </div>

        <ContactForm />
      </div>

      <section className="inner-section">
        <h2>Consultas frecuentes</h2>
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
      <h2>Enviar consulta</h2>
      <p>
        La consulta llega a {contact.email}. Respondemos normalmente dentro de 48 horas hábiles.
        Las fallas urgentes se coordinan por WhatsApp y están sujetas a disponibilidad.
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
          Email
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
          placeholder="Describa el síntoma, el equipo involucrado, el PLC o red industrial, o la capacitación requerida."
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
      ["Productos digitales", "El curso S7-300/400 es autoguiado e incluye dos PDF descargables y un mes de BOJ S7-PLC PRO desde la compra. El curso permanece accesible; la licencia PRO vence sin cobro automático."],
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
      ["Efectos del reembolso", "Una vez aprobado, se revoca el acceso al curso, a los PDF y a la licencia PRO incluida."],
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

function PageShell({ eyebrow, title, subtitle, heroImage, heroPrimary, heroSecondary, children }) {
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
        <img className="project-photo" src={visual} alt={`Obra: ${project.title} — ${project.client}`} loading="lazy" />
        <span>OBRA {String(index).padStart(2, "0")}</span>
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

function CourseVisual({ type }) {
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
      <div className="ladder-lines">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="status-cluster">
        <b>RUN</b>
        <b>STOP</b>
        <b>SF</b>
        <b>BF</b>
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

function Footer() {
  return <MainFooter />;
}

function MainFooter() {
  const footerLinks = [
    { label: "Inicio", path: "/" },
    { label: "Servicios", path: "/servicios" },
    { label: "Cursos", path: "/cursos" },
    { label: "Recursos", path: "/recursos-tecnicos" },
    { label: "App", path: "/app" },
    { label: "Obras", path: "/obras" },
    { label: "Contacto", path: "/contacto" },
  ];

  return (
    <footer className="site-footer mock-footer">
      <div className="mock-home-container mock-footer-inner">
        <div className="mock-footer-brand">
          <BrandLogo compact />
          <p>Soluciones para diagnóstico y eficiencia en automatización.</p>
        </div>
        <div className="mock-footer-contact" aria-label="Datos de contacto">
          <h3>Contacto</h3>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href="https://www.bojautomatizacion.com" target="_blank" rel="noreferrer">
            www.bojautomatizacion.com
          </a>
          <span>{contact.location}</span>
        </div>
        <nav className="mock-footer-nav" aria-label="Navegación del footer">
          <h3>Navegación</h3>
          {footerLinks.map((item) => (
            <a key={item.path} href={item.path}>
              {item.label}
            </a>
          ))}
        </nav>
        <nav className="mock-footer-nav mock-footer-legal" aria-label="Información legal">
          <h3>Legal</h3>
          <a href="/privacidad">Privacidad</a>
          <a href="/terminos">Términos</a>
          <a href="/licencias">Licencias</a>
          <a href="/reembolsos">Reembolsos</a>
        </nav>
        <div className="mock-footer-social">
          <h3>Seguinos</h3>
          <div>
            <a href={contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
            <a href={contact.linktree} target="_blank" rel="noreferrer" aria-label="Linktree">lt</a>
          </div>
        </div>
      </div>
      <div className="mock-footer-bottom">
        <span>© {new Date().getFullYear()} BOJ Automatización y Control. Todos los derechos reservados. BOJ es independiente y no está afiliada a Siemens.</span>
      </div>
    </footer>
  );
}

function FloatingContact() {
  return (
    <div className="floating-contact" aria-label="Contactos rápidos">
      <a href={whatsappUrl("Hola, escribo desde la web de BOJ para realizar una consulta técnica.")} aria-label="Consultar por WhatsApp">
        <Phone size={20} />
      </a>
      <a href={`mailto:${contact.email}`} aria-label="Enviar email">
        <Mail size={20} />
      </a>
    </div>
  );
}

export default App;
