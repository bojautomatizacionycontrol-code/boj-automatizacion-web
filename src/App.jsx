import { useEffect, useMemo, useState } from "react";
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
  projects,
  s7Course,
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
import appProHeroLaptopVisual from "./assets/app-pro-hero-background-v2.png";
import appPanelPrincipalDiagnostico from "./assets/app-panel-principal-diagnostico.jpg";
import appResultadoDiagnostico from "./assets/app-resultado-diagnostico.jpg";
import appDiagnosticoGuiado from "./assets/app-diagnostico-guiado.jpg";
import appHipotesisPriorizadas from "./assets/app-hipotesis-priorizadas.jpg";
import walterBojAvatar from "./assets/walter-boj-avatar-field.jpeg";
import heroIndustrialCover from "./assets/boj-hero-industrial-cover-v4.jpg";
import courseS7400Visual from "./assets/course-s7-400.jpg";
import s7IncludePlc400Visual from "./assets/services-works/PLC400.png";
import s7IncludeAppPanelVisual from "./assets/services-works/panel app 2.png";
import s7CourseCoverHero from "./assets/services-works/paisaje_industrial_nocturno_con_tecnología_avanzad.png.png";
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
      "Generador industrial — para Generador WEG BT40.png",
      "generador_industrial_sobre_fondo_minimalista.png",
    ],
  },
  {
    title: "Evaporador",
    meta: "CALSA · 2024",
    description: "Corrección y agregado de nuevas bombas y señales en programación y HMI.",
    imageFiles: [
      "Evaporador  equipo de proceso — para Evaporador CALSA.png",
      "sistema_industrial_en_ambiente_minimalista.png",
    ],
  },
  {
    title: "Generadores Siemens TG3/TG4",
    meta: "Generación Mediterránea · 2019",
    description: "Programación de PLC, HMI y SCADA de servicios para nuevas turbinas generadoras.",
    imageFiles: [
      "Turbina o generador industrial — para Generadores Siemens TG3TG4.png",
      "turbina_industrial_en_estudio_brillante.png",
    ],
  },
  {
    title: "Compresores",
    meta: "TGN Tucumán / TGN Jujuy · 2018",
    description: "Upgrade de tableros de control de motocompresores.",
    imageFiles: [
      "Motocompresor industrial — para Compresores TGN.png",
      "componente_industrial_en_estudio_minimalista.png",
    ],
  },
  {
    title: "Sistema contra incendios",
    meta: "GETSA · 2017",
    description: "Programación y comisionamiento de sistema contra incendios con PLC S7-1500.",
    imageFiles: [
      "Sistema contra incendios industrial — bombas, cañerías, válvulas.png",
      "sistema_industrial_con_bomba_y_tubería.png",
      "sistema_industrial_con_bomba_y_tuberia.png",
    ],
  },
  {
    title: "Gasómetro",
    meta: "Gasnor · 2017",
    description: "Programación de gasómetro en PLC S7-1200 y HMI para calibración de medidores.",
    imageFiles: [
      "Medición de gas  gasómetro — tuberías, instrumentación, skid de medición.png",
      "montaje_industrial_de_proceso_modular.png",
    ],
  },
  {
    title: "Planta de agua",
    meta: "YPF · 2016",
    description: "Upgrade de PLC S5-95U a S7-1500 en planta de agua.",
    imageFiles: [
      "Planta de agua  bombeo industrial — bombas, cañerías, tratamiento.png",
      "sistema_industrial_de_tratamiento_de_agua.png",
    ],
  },
  {
    title: "Central de lubricación",
    meta: "Ledesma · 2016",
    description: "Programación de PLC S7-1500 y HMI TP1200 para central de lubricación.",
    imageFiles: [
      "Central de lubricación industrial — bombas, manifold, líneas de lubricación.png",
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
    text: "Videos, PDFs técnicos y secuencia clara de análisis.",
  },
];

const coursesAvailableCards = [
  {
    icon: "ClipboardCheck",
    image: courseS7400Visual,
    title: "Diagnóstico y resolución de fallas en PLC Siemens S7-300/400",
    label: "Diagnóstico S7-300/400",
    path: "#/cursos/s7-300-400",
    quickFacts: [
      { icon: "Gauge", title: "Nivel", text: "Intermedio técnico" },
      { icon: "MonitorCog", title: "Formato", text: "Videos grabados, PDFs técnicos y casos reales" },
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
    path: "#/cursos/tia-portal",
    quickFacts: [
      { icon: "Gauge", title: "Nivel", text: "Inicial aplicado" },
      { icon: "MonitorCog", title: "Formato", text: "Videos grabados y material práctico" },
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

const appProductUrl = "https://app.bojautomatizacion.com/";

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

const appTrialPlan = {
  title: "TRIAL",
  price: "Gratis",
  meta: "48 horas · Online · Funciones limitadas",
  text: "Prueba inicial para conocer el flujo de diagnóstico de BOJ S7-PLC PRO antes de activar una licencia paga.",
  bullets: [
    "Acceso gratuito por 48 hs",
    "Funciona solo online",
    "Algunas funciones limitadas",
    "Ideal para conocer la herramienta",
  ],
  button: "Probar gratis 48 hs",
};

const appProPlans = [
  {
    title: "Mensual",
    price: "70 USD",
    meta: "1 mes · 1 dispositivo",
    text: "Acceso completo a la app BOJ S7-PLC PRO para uso puntual, pruebas extendidas o diagnóstico temporal.",
    bullets: [
      "Incluye solo app PRO",
      "Funciona offline hasta 2 días",
      "Acceso completo a diagnósticos PRO",
    ],
    button: "Elegir mensual",
  },
  {
    title: "Profesional",
    price: "350 USD",
    meta: "6 meses · 2 dispositivos · App PRO + Curso",
    text: "Plan recomendado para técnicos, automatistas, instrumentistas y personal de mantenimiento que necesitan usar la herramienta de forma recurrente y reforzar criterio técnico con material de apoyo.",
    bullets: [
      "Incluye app PRO",
      "Incluye Curso",
      "Funciona offline hasta 2 días",
      "Ideal para uso profesional recurrente",
    ],
    button: "Elegir profesional",
    badge: "Más conveniente",
  },
  {
    title: "Empresarial",
    price: "800 USD",
    meta: "6 meses · 10 dispositivos · App PRO + Curso",
    text: "Plan pensado para empresas, equipos de mantenimiento, áreas de automatización, soporte técnico interno o varias estaciones de trabajo.",
    bullets: [
      "Incluye app PRO",
      "Incluye Curso",
      "Funciona offline hasta 7 días",
      "Pensado para equipos técnicos y empresas",
    ],
    button: "Elegir empresarial",
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
    answer: "Depende del plan. El Trial funciona solo online. Mensual y Profesional permiten uso offline hasta 2 días. Empresarial permite uso offline hasta 7 días.",
  },
  {
    question: "¿Cuántos dispositivos puedo usar?",
    answer: "Depende del plan. Mensual incluye 1 dispositivo, Profesional incluye 2 dispositivos y Empresarial incluye 10 dispositivos.",
  },
  {
    question: "¿Qué planes incluyen curso?",
    answer: "El plan Profesional y el plan Empresarial incluyen app PRO + Curso. El plan Mensual incluye solo la app PRO.",
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
};

function getRoute() {
  return window.location.hash.replace("#", "") || "/inicio";
}

function whatsappUrl(message = "Hola, escribo desde la web de BOJ Automatización y Control para realizar una consulta técnica.") {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function mailtoUrl(subject, body) {
  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function Icon({ name, size = 22, className = "" }) {
  const Component = icons[name] || Wrench;
  return <Component size={size} className={className} aria-hidden="true" />;
}

function App() {
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener("hashchange", onHashChange);

    if (!window.location.hash) {
      window.history.replaceState(null, "", "#/inicio");
    }

    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
  }, [route]);

  return (
    <>
      <Header route={route} />
      <main>
        <RouteView route={route} />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}

function RouteView({ route }) {
  if (route === "/servicios") return <ServicesPage />;
  if (route === "/cursos") return <CoursesPage />;
  if (route === "/cursos/s7-300-400") return <S7CoursePage />;
  if (route === "/cursos/tia-portal") return <TiaCoursePage />;
  if (route === "/app") return <AppPage />;
  if (route === "/recursos-tecnicos") return <TechnicalResourcesPage />;
  if (route.startsWith("/recursos-tecnicos/")) return <TechnicalArticlePage route={route} />;
  if (route === "/obras") return <WorksPage />;
  if (route === "/contacto") return <ContactPage />;
  return <HomePage />;
}

function Header({ route }) {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header">
      <a className="brand" href="#/inicio" onClick={closeMenu} aria-label="Ir a inicio">
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
                href={`#${item.path}`}
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
                      href={`#${child.path}`}
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

function HomePage() {
  return <HomeLandingRedesign />;
}

function HomeLandingRedesign() {
  return (
    <div className="mock-home">
      <section className="mock-hero" data-home-section="hero">
        <img className="mock-hero-bg" src={heroIndustrialCover} alt="" aria-hidden="true" />
        <div className="mock-hero-shade" aria-hidden="true" />
        <div className="mock-home-container mock-hero-grid">
          <div className="mock-hero-copy">
            <h1>Diagnóstico y automatización industrial para PLC Siemens</h1>
            <p>
              Resolución de fallas reales de planta, puesta en marcha, mejoras PLC/HMI/SCADA, cursos técnicos y BOJ S7-PLC para mantenimiento industrial.
            </p>
            <div className="mock-hero-actions">
              <a
                className="mock-btn mock-btn-primary"
                href={whatsappUrl("Hola, escribo desde la web de BOJ para solicitar un diagnóstico industrial.")}
              >
                Solicitar diagnóstico <ArrowRight size={18} />
              </a>
              <a className="mock-btn mock-btn-outline" href="#/cursos">
                Ver cursos <ArrowRight size={18} />
              </a>
              <a className="mock-btn mock-btn-outline" href="#/app">
                Conocer BOJ S7-PLC <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

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
            <a className="mock-btn mock-btn-primary" href="#/app">
              Conocer la app <ArrowRight size={18} />
            </a>
          </div>
          <AppDiagnosticMockup />
        </div>
      </section>

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

function AppDiagnosticMockupOld() {
  return (
    <div className="mock-app-visual" aria-label="Mockup de BOJ S7-PLC">
      <div className="mock-laptop">
        <div className="mock-laptop-top">
          <span>BOJ S7-PLC</span>
          <small>Panel de diagnóstico</small>
        </div>
        <div className="mock-laptop-body">
          <aside>
            <span className="active">Diagnóstico</span>
            <span>Síntomas</span>
            <span>Hipótesis</span>
            <span>Verificación</span>
          </aside>
          <div className="mock-dashboard-grid">
            <div className="mock-panel">
              <b>Ingreso de síntomas</b>
              <span>CPU en STOP</span>
              <span>BF intermitente</span>
              <span>Señal AI incorrecta</span>
            </div>
            <div className="mock-panel">
              <b>Hipótesis técnicas</b>
              <span>Falla de red</span>
              <span>Módulo sin respuesta</span>
              <span>Alimentación 24VDC</span>
            </div>
            <div className="mock-panel mock-panel-wide">
              <b>Verificación sugerida</b>
              <span>Revisar diagnóstico online, conectores y estado de módulos antes de intervenir.</span>
              <button type="button">Generar informe</button>
            </div>
          </div>
        </div>
      </div>
      <div className="mock-phone">
        <div className="mock-phone-notch" />
        <b>Resultado orientativo</b>
        <span>Prioridad alta</span>
        <span>Red PROFIBUS</span>
        <span>Verificar estación</span>
      </div>
    </div>
  );
}

function OldHomePageReference() {
  return (
    <div className="boj-home">
      <section className="home-hero">
        <div className="home-hero-media" aria-hidden="true">
          <img src={panelDiagnosticVisual} alt="" />
        </div>
        <div className="home-hero-overlay" aria-hidden="true" />
        <div className="home-container home-hero-content">
          <div className="home-hero-copy">
            <p className="hero-kicker">PLC Siemens | Diagnóstico industrial | Ingeniería aplicada</p>
            <h1>Automatización y Control Industrial de Nivel Profesional</h1>
            <p className="home-hero-subtitle">
              Diagnóstico, programación, migraciones, redes industriales e ingeniería aplicada para procesos reales.
            </p>
            <div className="home-hero-actions">
              <a
                className="home-btn primary"
                href={whatsappUrl("Hola, escribo desde la web de BOJ para solicitar un servicio de automatización o diagnóstico industrial.")}
              >
                Solicitar servicio <ArrowRight size={19} />
              </a>
              <a className="home-btn secondary" href="#/cursos">
                Conocer la academia <ArrowRight size={19} />
              </a>
            </div>
            <div className="home-trust-grid" aria-label="Indicadores de confianza">
              {homeTrustIndicators.map((item) => (
                <div className="home-trust-item" key={`${item.value}-${item.label}`}>
                  <Icon name={item.icon} size={30} />
                  <span>
                    <strong>{item.value}</strong>
                    <small>{item.label}</small>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SpecializationStrip />

      <section className="landing-section services-home">
        <div className="home-container">
          <LandingSectionHeader title="Servicios" />
          <div className="service-showcase-grid">
            {landingServices.map((service) => (
              <ServiceHomeCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="landing-section courses-home">
        <div className="home-container">
          <LandingSectionHeader title="Cursos y formación técnica" />
          <div className="courses-home-layout">
            <div className="courses-card-grid">
              {landingCourses.map((course) => (
                <CourseHomeCard key={course.title} course={course} />
              ))}
            </div>
            <AcademyCard />
          </div>
        </div>
      </section>

      <AppHomeSection />

      <section className="landing-section projects-home">
        <div className="home-container">
          <LandingSectionHeader title="Proyectos y experiencia" />
          <div className="projects-home-grid">
            {landingProjects.map((project) => (
              <ProjectHomeCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </section>

      <HomeContactSection />
    </div>
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
      <a href="#/servicios" aria-label={`Ver detalle de ${service.title}`}>
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
      <a className="home-btn primary" href="#/cursos">
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
          <a className="home-btn secondary" href="#/app">
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
        <a href="#/obras">
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
  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = [
      `Nombre completo: ${data.get("name") || ""}`,
      `Correo electrónico: ${data.get("email") || ""}`,
      `Asunto: ${data.get("subject") || ""}`,
      "",
      "Mensaje:",
      data.get("message") || "",
    ].join("\n");

    window.location.href = mailtoUrl("Consulta desde la web BOJ", body);
  }

  return (
    <form className="landing-contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <input name="name" placeholder="Nombre completo" required />
        <input name="email" type="email" placeholder="Correo electrónico" required />
      </div>
      <input name="subject" placeholder="Asunto" required />
      <textarea name="message" rows="5" placeholder="Mensaje" required />
      <button className="home-btn primary" type="submit">
        Enviar mensaje <ArrowRight size={18} />
      </button>
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
      <section className="services-redesign-hero">
        <img className="services-redesign-hero-bg" src={heroIndustrialCover} alt="" aria-hidden="true" />
        <div className="services-redesign-hero-overlay" aria-hidden="true" />
        <div className="mock-home-container services-redesign-hero-grid">
          <div className="services-redesign-hero-copy">
            <p className="services-redesign-eyebrow">Servicios</p>
            <h1>Servicios técnicos para reducir paradas y sostener automatización industrial</h1>
            <p>
              Diagnóstico, ingeniería, programación, redes, tableros y puesta en marcha con experiencia real
              en plantas industriales y foco en continuidad operativa.
            </p>
            <div className="services-redesign-actions">
              <a
                className="mock-btn mock-btn-primary"
                href={whatsappUrl("Hola, escribo desde la web de BOJ para solicitar un diagnóstico industrial.")}
              >
                Solicitar diagnóstico <ArrowRight size={18} />
              </a>
              <a className="mock-btn mock-btn-outline" href="#/servicios" onClick={scrollToServiceDetails}>
                Ver áreas de servicio <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

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
            <a className="mock-btn mock-btn-outline" href="#/contacto">
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
      <section className="courses-hero">
        <img className="courses-hero-bg" src={courseTiaPortalVisual} alt="" aria-hidden="true" />
        <div className="courses-hero-overlay" aria-hidden="true" />
        <div className="mock-home-container courses-hero-content">
          <h1>Cursos técnicos Siemens orientados a diagnóstico real de planta</h1>
          <p>
            Formación aplicada para técnicos, instrumentistas, electricistas e ingenieros que necesitan
            diagnosticar, programar y actuar con criterio frente a fallas reales.
          </p>
          <div className="courses-actions">
            <a className="mock-btn mock-btn-primary" href="#/cursos" onClick={scrollToCourses}>
              Ver cursos disponibles <ArrowRight size={18} />
            </a>
            <a
              className="mock-btn mock-btn-outline"
              href={whatsappUrl("Hola, escribo desde la web de BOJ para consultar por capacitación técnica industrial.")}
            >
              Consultar capacitación <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

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
            <a className="mock-btn mock-btn-outline" href="#/cursos/s7-300-400">
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
        <a className="mock-btn mock-btn-primary" href={course.path}>
          Ver curso <ArrowRight size={18} />
        </a>
      </div>
    </article>
  );
}

function S7CoursePage() {
  return <S7SalesLanding course={s7Course} eyebrow="Curso aplicado" />;
}

function S7SalesLanding({ course, eyebrow }) {
  const purchaseHref = whatsappUrl("Quiero comprar el curso Diagnóstico S7-300/400 + APP PRO por 147 USD.");
  const heroStyle = { "--s7-sales-hero-image": `url(${s7CourseCoverHero})` };

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

  const differentiators = [
    {
      icon: "Factory",
      title: "Fallas reales de planta",
      text: "No teoría aislada: casos aplicados que aparecen en mantenimiento y producción.",
    },
    {
      icon: "ScanSearch",
      title: "Diagnóstico antes de intervención",
      text: "Primero pensá, después actuá. Menos riesgo, mejores decisiones.",
    },
    {
      icon: "ShieldCheck",
      title: "Criterio de campo aplicado a PLC Siemens",
      text: "Método probado en S7-300/400 y entornos industriales.",
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
    "1 dispositivo",
    "Uso offline hasta 2 días",
    "Acceso por navegador e instalación como app",
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
      <section className="s7-sales-hero" style={heroStyle}>
        <div className="s7-sales-container s7-sales-hero-grid">
          <div className="s7-sales-hero-copy">
            <p className="s7-sales-eyebrow">{eyebrow}</p>
            <h1>
              Diagnóstico de fallas en PLC Siemens S7-300/400
              <span>con STEP 7 Classic</span>
            </h1>
            <p>Resolución aplicada de fallas reales: CPU, LEDs, Diagnostic Buffer, HW Config Online, PROFIBUS, módulos, señales y criterio de intervención.</p>
            <div className="s7-sales-actions">
              <a className="s7-sales-btn s7-sales-btn-primary" href={purchaseHref} target="_blank" rel="noreferrer">
                Comprar curso + APP PRO
              </a>
              <a className="s7-sales-btn s7-sales-btn-secondary" href="#/cursos/s7-300-400" onClick={(event) => scrollToCourseSection(event, "curso-s7-incluye")}>
                Ver qué incluye
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="s7-sales-confidence">
        <div className="s7-sales-container">
          <Icon name="ShieldCheck" size={26} />
          <p>Perdé el miedo a conectarte al PLC y diagnosticá con <strong>criterio profesional.</strong></p>
        </div>
      </div>

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
            <span className="s7-sales-plus" aria-hidden="true">+</span>

            <article className="s7-sales-include-card s7-sales-include-course">
              <span className="s7-sales-include-number">1</span>
              <h3>Curso aplicado S7-300/400</h3>
              <figure>
                <img src={s7IncludePlc400Visual} alt="PLC Siemens S7-400 en tablero industrial usado como apoyo del curso S7-300/400" loading="lazy" />
              </figure>
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
            </article>

            <article className="s7-sales-include-card s7-sales-include-app">
              <span className="s7-sales-include-number">2</span>
              <h3>APP PRO - 1 mes de BOJ S7-PLC PRO</h3>
              <div className="s7-sales-app-layout">
                <figure>
                  <img src={s7IncludeAppPanelVisual} alt="Captura real de BOJ S7-PLC PRO para diagnóstico" loading="lazy" />
                </figure>
                <div className="s7-sales-app-copy">
                  <p>La app te ayuda a ordenar síntomas, LEDs, hipótesis y verificaciones durante el diagnóstico.</p>
                  <div className="s7-sales-app-highlights">
                    {appHighlights.map((item) => (
                      <span key={item.label}>
                        <Icon name={item.icon} size={20} />
                        {item.label}
                      </span>
                    ))}
                  </div>
                  <ul>
                    {appIncludes.map((item) => (
                      <li key={item}>
                        <CheckCircle2 size={18} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="s7-sales-section s7-sales-dark s7-sales-difference">
        <div className="s7-sales-container">
          <div className="s7-sales-centered-heading">
            <p className="s7-sales-kicker">Qué hace diferente este curso</p>
          </div>
          <div className="s7-sales-difference-grid">
            {differentiators.map((item) => (
              <article className="s7-sales-difference-card" key={item.title}>
                <Icon name={item.icon} size={38} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
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

      <section className="s7-sales-section s7-sales-offer" id="curso-s7-compra">
        <div className="s7-sales-container">
          <div className="s7-sales-offer-heading">
            <p className="s7-sales-kicker">Accedé al curso + BOJ S7-PLC PRO</p>
            <h2>Una oferta técnica para ordenar el diagnóstico antes de intervenir.</h2>
            <p>Una parada de máquina puede costar más que esta formación. El objetivo es que sepas ordenar el diagnóstico antes de cambiar hardware, reiniciar equipos o intervenir sin evidencia.</p>
          </div>

          <div className="s7-sales-offer-panel">
            <div className="s7-sales-offer-product">
              <p className="s7-sales-kicker">Oferta única</p>
              <h2>Curso Diagnóstico S7-300/400 + APP PRO</h2>
              <span>Incluye 1 mes de BOJ S7-PLC PRO</span>
            </div>

            <div className="s7-sales-offer-price">
              <strong>147 USD</strong>
              <p>Acceso digital al curso + herramienta PRO por 1 mes.</p>
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
              <div className="s7-sales-offer-actions">
                <a className="s7-sales-btn s7-sales-btn-primary" href={purchaseHref} target="_blank" rel="noreferrer">
                  Comprar curso + APP PRO
                </a>
                <a className="s7-sales-btn s7-sales-btn-secondary" href={appProductUrl} target="_blank" rel="noreferrer">
                  Probar APP 48 hs
                </a>
              </div>
              <p className="s7-sales-offer-note">Acceso digital. Verificá siempre las conclusiones en campo antes de intervenir.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="s7-sales-section s7-sales-dark s7-sales-mistakes">
        <div className="s7-sales-container">
          <div className="s7-sales-centered-heading">
            <p className="s7-sales-kicker">Errores que este curso ayuda a evitar</p>
            <h2>Diagnosticar con método evita decisiones costosas.</h2>
          </div>
          <div className="s7-sales-mistake-grid">
            {mistakes.map((item) => (
              <article className="s7-sales-mistake-card" key={item}>
                <TriangleAlert size={24} aria-hidden="true" />
                <p>{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

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
            <p>Si trabajás con PLC Siemens S7-300/400 y necesitás diagnosticar con más criterio, este curso te da método, estructura y apoyo técnico para intervenir mejor.</p>
            <div className="s7-sales-final-actions">
              <a className="s7-sales-btn s7-sales-btn-primary" href={purchaseHref} target="_blank" rel="noreferrer">
                Comprar curso + APP PRO
              </a>
              <a className="s7-sales-btn s7-sales-btn-secondary" href="#/cursos/s7-300-400" onClick={(event) => scrollToCourseSection(event, "curso-s7-incluye")}>
                Ver qué incluye
              </a>
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
    <PageShell eyebrow={eyebrow} title={course.title} subtitle={course.subtitle}>
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
      <section className="app-pro-hero">
        <img className="app-pro-hero-bg" src={appProHeroLaptopVisual} alt="" aria-hidden="true" />
        <div className="app-pro-hero-shade" aria-hidden="true" />
        <div className="mock-home-container app-pro-hero-content">
          <div className="app-pro-hero-copy">
            <p className="app-pro-product-name">BOJ S7-PLC PRO</p>
            <h1>Diagnóstico guiado para PLC Siemens S7-300/400</h1>
            <p>
              Cargá síntomas, LEDs y condiciones de campo. BOJ S7-PLC ordena hipótesis técnicas y guía la
              verificación paso a paso.
            </p>
            <div className="app-pro-actions">
              <a className="mock-btn mock-btn-primary" href={appProductUrl} target="_blank" rel="noreferrer">
                Probar gratis 48 hs <ExternalLink size={18} />
              </a>
              <a
                className="mock-btn mock-btn-outline"
                href="#planes-pro"
                onClick={(event) => {
                  event.preventDefault();
                  document.getElementById("planes-pro")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                Ver planes PRO
              </a>
            </div>
          </div>
        </div>
      </section>

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

      <section className="app-pro-plans-section" id="planes-pro">
        <div className="mock-home-container">
          <div className="app-pro-section-heading">
            <h2>Elige tu licencia PRO</h2>
            <p>Trial inicial y planes pagos según tiempo de uso, dispositivos y modalidad offline.</p>
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
                <a className="mock-btn mock-btn-primary" href={appProductUrl} target="_blank" rel="noreferrer">
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
          <a className="mock-btn mock-btn-light" href={appProductUrl} target="_blank" rel="noreferrer">
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

function S7CourseLanding({ course, eyebrow }) {
  const purchaseHref = whatsappUrl("Quiero comprar el curso Diagnóstico S7-300/400 + APP PRO por 147 USD.");
  const heroStyle = { "--s7-course-cover-image": `url(${s7CourseCoverHero})` };

  const scrollToCourseSection = (event, sectionId) => {
    event.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const heroActions = (
    <div className="s7-course-hero-actions">
      <a className="btn primary" href="#/cursos/s7-300-400" onClick={(event) => scrollToCourseSection(event, "curso-s7-compra")}>
        Comprar curso + APP PRO
      </a>
      <a className="btn secondary" href="#/cursos/s7-300-400" onClick={(event) => scrollToCourseSection(event, "curso-s7-incluye")}>
        Ver qué incluye
      </a>
    </div>
  );

  const proposalItems = [
    "No es un curso genérico de programación PLC. Está orientado a diagnóstico real de fallas.",
    "Aprendé a ordenar síntomas, LEDs, eventos y evidencias antes de cambiar módulos o reiniciar equipos.",
    "Una parada de planta puede costar más que una formación bien aplicada.",
    "El objetivo no es adivinar la falla: es reducir prueba y error con criterio técnico.",
  ];

  const earlyOfferItems = ["Curso aplicado S7-300/400", "1 mes APP PRO", "1 dispositivo"];
  const learningItems = [...course.learnItems, ...course.outcomes.slice(0, 3)];
  const includeDeliverables = [
    {
      variant: "course",
      icon: "Cpu",
      label: "Entregable principal",
      title: "Curso aplicado S7-300/400",
      image: courseS7400Visual,
      imageAlt: "Tablero didáctico Siemens S7-300/400 usado como referencia del curso",
      imageLabel: "Videos + material técnico",
      points: [
        {
          title: "Videos aplicados con tablero didáctico",
          text: "Contenido práctico para ver diagnóstico y criterio técnico aplicado sobre situaciones reales y simuladas.",
        },
        {
          title: "PDFs técnicos completos",
          text: "Material con la teoría y la práctica desarrollada en el curso para estudiar, consultar y repasar.",
        },
      ],
    },
    {
      variant: "app",
      icon: "Gauge",
      label: "Herramienta incluida",
      title: "BOJ S7-PLC PRO por 1 mes",
      image: appPanelPrincipalDiagnostico,
      imageAlt: "Captura real de BOJ S7-PLC PRO con panel principal de diagnóstico",
      imageLabel: "APP PRO incluida",
      points: [
        {
          title: "1 mes de acceso a BOJ S7-PLC PRO",
          text: "Acceso a la herramienta profesional para acompañar el método del curso durante el diagnóstico.",
        },
        {
          title: "Apoyo al diagnóstico en campo",
          text: "Ayuda a ordenar síntomas, hipótesis y verificaciones antes de intervenir el sistema.",
        },
        {
          title: "Navegador e instalación compatible",
          text: "Acceso desde navegador y posibilidad de instalación como app en dispositivos compatibles.",
        },
      ],
    },
  ];

  const differentiators = [
    "Fallas reales, no teoría aislada.",
    "Diagnóstico antes de intervención.",
    "Criterio de campo aplicado.",
    "Relación entre LEDs, red, módulos, señales y eventos.",
    "App PRO como apoyo para ordenar hipótesis.",
  ];

  const audienceItems = [
    "Técnicos de mantenimiento industrial",
    "Automatistas y programadores PLC",
    "Electricistas de planta",
    "Instrumentistas",
    "Empresas con PLC Siemens S7-300/400",
    "Centros de formación técnica",
  ];

  const saleIncludes = [
    "Curso aplicado de diagnóstico S7-300/400.",
    "Material técnico en PDF.",
    "Casos orientados a fallas reales de planta.",
    "Diagnóstico por LEDs, STOP, SF, BF, PROFIBUS, módulos y señales.",
    "Uso de STEP 7 Classic, HW Config y Diagnostic Buffer como parte del criterio técnico.",
    "App incluida: 1 mes de BOJ S7-PLC PRO.",
    "1 dispositivo.",
    "Offline hasta 2 días según política PRO mensual.",
    "Acceso desde navegador e instalación como app en dispositivos compatibles.",
  ];

  return (
    <PageShell
      eyebrow={eyebrow}
      title={course.title}
      subtitle={course.subtitle}
      heroExtra={heroActions}
      heroClassName="s7-course-cover-hero"
      heroStyle={heroStyle}
    >
      <div className="s7-course-landing">
        <div className="s7-course-intro-grid">
          <div className="s7-course-intro-main">
            <section className="s7-course-block s7-course-proposal">
              <div className="s7-course-heading">
                <p className="eyebrow">Propuesta técnica</p>
                <h2>Diagnóstico real para fallas de planta</h2>
                <p>
                  Formación aplicada para técnicos, automatistas, electricistas de planta y mantenimiento industrial
                  que necesitan decidir con evidencia antes de intervenir.
                </p>
              </div>
              <div className="s7-course-bullet-grid">
                {proposalItems.map((item) => (
                  <article key={item}>
                    <Icon name="CheckCircle2" size={18} />
                    <span>{item}</span>
                  </article>
                ))}
              </div>
            </section>

            <article className="s7-course-early-offer" aria-label="Oferta Curso Diagnóstico S7-300/400 + APP PRO">
              <div className="s7-course-early-copy">
                <p className="eyebrow">Oferta del curso</p>
                <h3>Curso + 1 mes APP PRO</h3>
                <p>Kit profesional para estudiar, consultar y aplicar criterio de diagnóstico en planta.</p>
                <div>
                  {earlyOfferItems.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
              <strong>147 USD</strong>
              <a className="btn primary" href={purchaseHref} target="_blank" rel="noreferrer">
                Comprar curso + APP PRO
              </a>
            </article>

            <div className="s7-course-mobile-panel">
              <S7CourseSidePanel purchaseHref={purchaseHref} />
            </div>

            <section className="s7-course-block s7-course-learning">
              <div className="s7-course-heading">
                <p className="eyebrow">Habilidades concretas</p>
                <h2>Qué vas a aprender</h2>
                <p>Diagnóstico con STEP 7 Classic, lectura online, criterio de campo y cierre técnico defendible.</p>
              </div>
              <div className="s7-course-card-grid">
                {learningItems.map((item, index) => (
                  <article key={item}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{item}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <div className="s7-course-sidebar">
            <S7CourseSidePanel purchaseHref={purchaseHref} />
          </div>
        </div>

        <section className="s7-course-block s7-course-includes" id="curso-s7-incluye">
          <div className="s7-course-heading s7-course-include-heading">
            <p className="eyebrow">Material y método</p>
            <h2>Qué incluye</h2>
            <p>
              Una formación aplicada + una herramienta profesional para diagnosticar con más criterio en PLC
              Siemens S7-300/400.
            </p>
          </div>
          <div className="s7-course-include-feature-grid">
            {includeDeliverables.map((item) => (
              <article className={`s7-course-include-feature ${item.variant}`} key={item.title}>
                <figure className="s7-course-include-media">
                  <img src={item.image} alt={item.imageAlt} loading="lazy" />
                  <figcaption>{item.imageLabel}</figcaption>
                </figure>
                <div className="s7-course-include-body">
                  <div className="s7-course-include-title-row">
                    <span>
                      <Icon name={item.icon} size={22} />
                    </span>
                    <div>
                      <small>{item.label}</small>
                      <h3>{item.title}</h3>
                    </div>
                  </div>
                  <ul>
                    {item.points.map((point) => (
                      <li key={point.title}>
                        <CheckCircle2 size={17} />
                        <div>
                          <strong>{point.title}</strong>
                          <p>{point.text}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="s7-course-block s7-course-difference">
          <div className="s7-course-heading">
            <p className="eyebrow">Criterio BOJ</p>
            <h2>Qué hace diferente este curso</h2>
            <p>
              Está pensado para diagnosticar bajo presión operativa, ordenar evidencia y decidir el próximo
              paso técnico sin caer en prueba y error.
            </p>
          </div>
          <div className="s7-course-bullet-grid">
            {differentiators.map((item) => (
              <article key={item}>
                <Icon name="CheckCircle2" size={18} />
                <span>{item}</span>
              </article>
            ))}
          </div>
        </section>

        <main className="s7-course-main s7-course-main-wide">
          <section className="s7-course-block s7-course-program">
            <div className="s7-course-heading">
              <p className="eyebrow">Contenido técnico</p>
              <h2>Programa técnico</h2>
            </div>
            <ol>
              {course.modules.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>

          <section className="s7-course-block s7-course-audience">
            <div className="s7-course-heading">
              <p className="eyebrow">Perfil técnico</p>
              <h2>Para quién es</h2>
              <p>Pensado para equipos que conviven con fallas reales y necesitan un método común de diagnóstico.</p>
            </div>
            <div className="s7-course-chip-grid">
              {audienceItems.map((item) => (
                <span key={item}>
                  <CheckCircle2 size={16} />
                  {item}
                </span>
              ))}
            </div>
            <p className="s7-course-audience-note">No reemplaza la experiencia en campo: la ordena y la refuerza.</p>
          </section>

          <section className="s7-course-sale-section" id="curso-s7-compra">
            <div className="s7-course-sale-copy">
              <p className="eyebrow">Oferta única</p>
              <h2>Accedé al curso + BOJ S7-PLC PRO</h2>
              <p>
                Formación aplicada para diagnosticar fallas reales en PLC Siemens S7-300/400, con apoyo de la app
                PRO durante 1 mes.
              </p>
            </div>
            <article className="s7-course-offer-card">
              <div className="s7-course-offer-summary">
                <span>Curso Diagnóstico S7-300/400 + APP PRO</span>
                <strong>147 USD</strong>
                <small>Acceso digital. Verificá siempre las conclusiones en campo antes de intervenir.</small>
                <div className="button-row">
                  <a className="btn primary" href={purchaseHref} target="_blank" rel="noreferrer">
                    Comprar curso + APP PRO
                  </a>
                  <a className="btn secondary" href={appProductUrl} target="_blank" rel="noreferrer">
                    Probar APP 48 hs <ExternalLink size={17} />
                  </a>
                </div>
              </div>
              <ul className="s7-course-sale-list">
                {saleIncludes.map((item) => (
                  <li key={item}>
                    <CheckCircle2 size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </section>

          <section className="s7-course-block s7-course-mistakes">
            <div className="s7-course-heading">
              <p className="eyebrow">Valor operativo</p>
              <h2>Errores que este curso ayuda a evitar</h2>
            </div>
            <div>
              {course.avoidMistakes.map((item) => (
                <span key={item}>
                  <Icon name="ShieldCheck" size={17} />
                  {item}
                </span>
              ))}
            </div>
          </section>

          <section className="s7-course-final-cta">
            <div>
              <p className="eyebrow">Cierre técnico</p>
              <h2>Empezá a diagnosticar fallas con método</h2>
              <p>
                Accedé al curso y usá BOJ S7-PLC PRO durante 1 mes para ordenar síntomas, hipótesis y
                verificaciones.
              </p>
            </div>
            <a className="btn primary" href={purchaseHref} target="_blank" rel="noreferrer">
              Comprar curso + APP PRO
            </a>
          </section>
        </main>
      </div>
    </PageShell>
  );
}

function S7CourseSidePanel({ purchaseHref }) {
  return (
    <aside className="s7-course-side-panel">
      <article className="s7-course-fast-facts s7-course-side-offer">
        <p className="eyebrow">Oferta del curso</p>
        <h3>Curso Diagnóstico S7-300/400 + APP PRO</h3>
        <strong className="s7-course-side-price">147 USD</strong>
        <div>
          <span>Incluye</span>
          <strong>Curso + 1 mes APP PRO</strong>
        </div>
        <div>
          <span>Uso</span>
          <strong>1 dispositivo · offline hasta 2 días</strong>
        </div>
        <a className="btn primary" href={purchaseHref} target="_blank" rel="noreferrer">
          Comprar curso + APP PRO
        </a>
        <small>Acceso digital. Verificá siempre las conclusiones en campo.</small>
      </article>
      <CourseVisual type="s7" />
    </aside>
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
        secondaryHref="#/servicios"
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
        <PrimaryLink href={`#${resource.path}`}>
          Ver recurso <ArrowRight size={17} />
        </PrimaryLink>
      </div>
    </article>
  );
}

function TechnicalArticlePage({ route }) {
  const resource = technicalResources.find((item) => item.path === route);
  if (!resource) return <TechnicalResourcesPage />;

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
      primaryHref="#/cursos"
      secondaryLabel="Consultar capacitación"
      secondaryHref={whatsappUrl("Hola, escribo desde la web de BOJ para consultar por cursos técnicos de automatización industrial.")}
    />
  );
}

function ContactPage() {
  return (
    <PageShell
      eyebrow="Contacto"
      title="Contacto técnico para industria, mantenimiento e ingeniería"
      subtitle="Consultá por diagnóstico, servicios, cursos o licencias BOJ S7-PLC PRO. También atendemos consultas por automatización, migraciones, tableros y redes industriales."
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

  const body = useMemo(
    () =>
      [
        `Nombre: ${form.name}`,
        `Empresa: ${form.company}`,
        `Email: ${form.email}`,
        `Teléfono: ${form.phone}`,
        `Servicio de interés: ${form.interest}`,
        "",
        "Mensaje:",
        form.message,
      ].join("\n"),
    [form]
  );

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    window.location.href = mailtoUrl("Consulta desde la web BOJ", body);
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2>Enviar consulta</h2>
      <p>
        El formulario prepara un email con los datos técnicos. Para urgencias o paradas de planta,
        WhatsApp suele ser el camino más rápido.
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
        <button className="btn primary" type="submit">
          Enviar consulta
          <ArrowRight size={18} />
        </button>
        <a className="btn secondary" href={whatsappUrl("Hola, escribo desde la web de BOJ para realizar una consulta técnica.")}>
          Contactar por WhatsApp
        </a>
      </div>
    </form>
  );
}

function PageShell({ eyebrow, title, subtitle, heroExtra, heroClassName, heroStyle, children }) {
  return (
    <>
      <section className={["page-hero", heroClassName].filter(Boolean).join(" ")} style={heroStyle}>
        <div className="section-container">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          {subtitle ? <p>{subtitle}</p> : null}
          {heroExtra ? <div className="page-hero-extra">{heroExtra}</div> : null}
        </div>
      </section>
      <section className="section">
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
          <h2>Más de 10 años de experiencia en automatización industrial, diagnóstico de fallas y puesta en marcha en planta</h2>
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
            <SecondaryLink href="#/obras">Ver obras reales</SecondaryLink>
            <GhostLink href="#/servicios">Revisar servicios</GhostLink>
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
      <a href="#/servicios">
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
  const visual = projectVisuals[(index - 1) % projectVisuals.length];

  return (
    <article className="project-card">
      <div className="project-media">
        {/* Reemplazar por foto real específica de la obra cuando esté disponible. */}
        <img className="project-photo" src={visual} alt={`Referencia visual técnica para ${project.title}`} loading="lazy" />
        <span>OBRA {String(index).padStart(2, "0")}</span>
        <div className="project-media-overlay">
          <strong>{project.year}</strong>
          <small>{project.client}</small>
        </div>
      </div>
      <div className="project-body">
        <div className="project-title-row">
          <h2>{project.title}</h2>
          {/* Reemplazar por logo del cliente si corresponde. */}
          <span className="client-logo-placeholder">
            <small>Referencia</small>
            {project.client}
          </span>
        </div>
        <p>{project.description}</p>
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
          <SecondaryLink href="#/servicios">Ver servicios</SecondaryLink>
          <GhostLink href="#/cursos">Ver cursos</GhostLink>
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
    { label: "Inicio", path: "/inicio" },
    { label: "Servicios", path: "/servicios" },
    { label: "Cursos", path: "/cursos" },
    { label: "Recursos", path: "/recursos-tecnicos" },
    { label: "App", path: "/app" },
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
            <a key={item.path} href={`#${item.path}`}>
              {item.label}
            </a>
          ))}
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
        <span>© 2025 BOJ Automatización y Control. Todos los derechos reservados.</span>
      </div>
    </footer>
  );
}

function OldFooterReference() {
  return (
    <footer className="site-footer">
      <div className="home-container footer-grid">
        <div className="footer-about">
          <div className="footer-brand">
            <BrandLogo compact />
          </div>
          <p>
            Soluciones industriales de automatización, control y mantenimiento para procesos críticos e inteligentes.
          </p>
          <div className="footer-socials">
            <a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={whatsappUrl()} target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
        </div>
        <div>
          <h3>Navegación</h3>
          <a href="#/inicio">Inicio</a>
          <a href="#/servicios">Servicios</a>
          <a href="#/cursos">Cursos</a>
          <a href="#/app">App</a>
          <a href="#/obras">Proyectos</a>
          <a href="#/contacto">Contacto</a>
        </div>
        <div>
          <h3>Servicios</h3>
          <a href="#/servicios">Diagnóstico de fallas</a>
          <a href="#/servicios">Migración de PLC y HMI</a>
          <a href="#/servicios">Redes industriales</a>
          <a href="#/servicios">Puesta en marcha</a>
        </div>
        <div>
          <h3>Contacto</h3>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={whatsappUrl()}>{contact.whatsappDisplay}</a>
          <span>{contact.location}</span>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 BOJ Automatización y Control. Todos los derechos reservados.</span>
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
