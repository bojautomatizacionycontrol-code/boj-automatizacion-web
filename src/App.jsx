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
import walterBojAvatar from "./assets/walter-boj-avatar.png";
import heroIndustrialCover from "./assets/boj-hero-industrial-cover-v4.jpg";
import courseS7400Visual from "./assets/course-s7-400.jpg";
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

const homeHeroChecks = [
  "PLC Siemens",
  "STEP 7 / TIA Portal",
  "PROFIBUS / PROFINET",
  "Soporte técnico y capacitación",
];

const homeWorkLines = [
  {
    icon: "Factory",
    title: "Servicios industriales",
    text: "Diagnóstico, automatización, migraciones y soporte técnico especializado en planta.",
  },
  {
    icon: "GraduationCap",
    title: "Capacitación técnica",
    text: "Cursos prácticos para mantenimiento y diagnóstico real en sistemas industriales Siemens.",
  },
  {
    icon: "MonitorCog",
    title: "Herramientas digitales",
    text: "BOJ S7-PLC como apoyo al diagnóstico técnico en sistemas S7-300/400.",
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

const servicesInterventionCriteria = [
  "Se releva el síntoma antes de tocar lógica o hardware.",
  "Se busca evidencia online, eléctrica y de campo.",
  "Se prueba con producción, mantenimiento y seguridad operativa en mente.",
  "Se deja una recomendación clara para sostener el sistema después de la intervención.",
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

const appOfflineItems = [
  { icon: "Globe", title: "Trial", text: "Solo online" },
  { icon: "WifiOff", title: "Mensual y Profesional", text: "Offline hasta 2 días" },
  { icon: "CalendarCheck", title: "Empresarial", text: "Offline hasta 7 días" },
];

const appAccessItems = [
  {
    icon: "Globe",
    title: "Acceso desde navegador",
    text: "Ingresa desde cualquier equipo compatible usando app.bojautomatizacion.com.",
  },
  {
    icon: "Smartphone",
    title: "App instalable",
    text: "Instálala en dispositivos compatibles para acceder más rápido como herramienta de trabajo.",
  },
  {
    icon: "WifiOff",
    title: "Uso offline según plan",
    text: "Trial solo online. Mensual y Profesional offline hasta 2 días. Empresarial offline hasta 7 días.",
  },
];

const appHeroBadges = [
  { icon: "Globe", label: "Uso online y offline" },
  { icon: "Smartphone", label: "App instalable" },
  { icon: "Brain", label: "Hipótesis priorizadas" },
  { icon: "ClipboardCheck", label: "Guía de verificación" },
  { icon: "Settings", label: "6 idiomas" },
];

const appOperationalBenefits = [
  {
    icon: "RefreshCcw",
    title: "Reduce prueba y error",
    text: "Ayuda a ordenar la intervención antes de cambiar módulos, reiniciar equipos o modificar lógica.",
  },
  {
    icon: "Clock",
    title: "Acelera el diagnóstico",
    text: "Relaciona síntomas, LEDs, red, módulos y condiciones de campo en una misma secuencia.",
  },
  {
    icon: "ShieldCheck",
    title: "Mejora el criterio técnico",
    text: "Propone hipótesis y verificaciones para respaldar decisiones en planta.",
  },
  {
    icon: "ClipboardCheck",
    title: "Estandariza el método",
    text: "Permite que técnicos y equipos trabajen con una lógica común de diagnóstico.",
  },
];

const appTrustMetrics = [
  { icon: "Clock", title: "+15 años", text: "de experiencia" },
  { icon: "Cpu", title: "PLC Siemens", text: "foco S7-300/400" },
  { icon: "ShieldCheck", title: "Miles de fallas", text: "resueltas en planta" },
  { icon: "ClipboardCheck", title: "Metodología", text: "probada en campo" },
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
            <h1>Automatización, diagnóstico y capacitación industrial.</h1>
            <p>
              Soluciones técnicas para sistemas PLC Siemens, diagnóstico de fallas reales de planta y formación orientada a mantenimiento industrial.
            </p>
            <div className="mock-hero-actions">
              <a
                className="mock-btn mock-btn-primary"
                href={whatsappUrl("Hola, escribo desde la web de BOJ para solicitar un diagnóstico industrial.")}
              >
                Solicitar diagnóstico industrial <ArrowRight size={18} />
              </a>
              <a className="mock-btn mock-btn-outline" href="#/cursos">
                Ver cursos y herramientas <ArrowRight size={18} />
              </a>
            </div>
          </div>
          <div className="mock-hero-visual" aria-label="Especialización técnica BOJ">
            <div className="mock-check-card">
              {homeHeroChecks.map((item) => (
                <span key={item}>
                  <CheckCircle2 size={18} />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mock-section mock-work" data-home-section="worklines">
        <div className="mock-home-container">
          <h2>Tres líneas de trabajo claras.</h2>
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
              Asistente técnico para diagnóstico orientativo de fallas en sistemas Siemens S7-300/400.
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
    <figure className="mock-app-visual real-app-capture" aria-label="Captura real de BOJ S7-PLC">
      <div className="real-app-screen">
        <img
          src={appRealCapture}
          alt="Captura real de BOJ S7-PLC con diagnóstico por estado de CPU"
          loading="lazy"
        />
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
              Diagnóstico, ingeniería, programación, redes, tableros y puesta en marcha con foco en
              continuidad operativa, mantenimiento y decisiones con evidencia.
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

          <article className="services-intervention-card">
            <span className="services-card-kicker">Criterio de intervención</span>
            <h2>Criterio de intervención</h2>
            <div>
              {servicesInterventionCriteria.map((item) => (
                <span key={item}>
                  <CheckCircle2 size={18} />
                  {item}
                </span>
              ))}
            </div>
          </article>
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

      <section className="services-redesign-section services-areas-section" id="areas-de-servicio">
        <div className="mock-home-container">
          <div className="services-section-heading services-area-heading">
            <h2>Áreas de servicio.</h2>
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
  return (
    <CourseLanding
      course={s7Course}
      eyebrow="Curso aplicado"
      visual="s7"
      ctas={[
        { label: "Comprar o consultar acceso", href: whatsappUrl("Hola, escribo desde la web de BOJ para consultar acceso al curso de diagnóstico S7-300/400.") },
        { label: "Consultar disponibilidad", href: mailtoUrl("Consulta curso S7-300/400", "Hola, escribo desde la web de BOJ para consultar disponibilidad del curso de diagnóstico S7-300/400.") },
        { label: "Hablar por WhatsApp", href: whatsappUrl("Hola, escribo desde la web de BOJ para consultar por el curso S7-300/400.") },
      ]}
    />
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
            <h1>
              Diagnostica fallas en
              <br />
              PLC Siemens S7-300/400
              <br />
              con método, no a prueba y error
            </h1>
            <p className="app-pro-product-name">BOJ S7-PLC PRO</p>
            <p>
              Carga síntomas, estados de CPU, LEDs, fallas de red y condiciones de campo para obtener
              hipótesis técnicas priorizadas y una guía de verificación paso a paso.
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
            <div className="app-pro-hero-badges" aria-label="Resumen de BOJ S7-PLC PRO">
              {appHeroBadges.map((badge) => (
                <span className="app-pro-hero-badge" key={badge.label}>
                  <Icon name={badge.icon} size={18} />
                  {badge.label}
                </span>
              ))}
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

      <section className="app-pro-benefits-section">
        <div className="mock-home-container">
          <div className="app-pro-section-heading">
            <h2>Por qué usar BOJ S7-PLC PRO en una falla real</h2>
          </div>
          <div className="app-pro-benefit-grid">
            {appOperationalBenefits.map((item) => (
              <article className="app-pro-benefit-card" key={item.title}>
                <Icon name={item.icon} size={26} />
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
            <h2>Vista real de la herramienta</h2>
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

      <section className="app-pro-access-section">
        <div className="mock-home-container">
          <div className="app-pro-section-heading app-pro-section-heading-dark">
            <h2>Acceso web, instalación y uso offline</h2>
          </div>
          <div className="app-pro-access-grid">
            {appAccessItems.map((item) => (
              <article className="app-pro-access-card" key={item.title}>
                <Icon name={item.icon} size={26} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="app-pro-value-row-section">
        <div className="mock-home-container app-pro-value-row-grid">
          <article className="app-pro-offline-card">
            <h2>Online, instalable y offline según el plan</h2>
            <div className="app-pro-offline-items">
              {appOfflineItems.map((item) => (
                <div key={item.title}>
                  <Icon name={item.icon} size={34} />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
            <p className="app-pro-offline-note">
              La instalación facilita el acceso, pero la disponibilidad offline depende del plan contratado.
            </p>
          </article>
          <article className="app-pro-cost-card">
            <div>
              <h2>Una parada de planta puede costar más que una licencia</h2>
              <p>
                Cuando una máquina está detenida, cada minuto cuenta. BOJ S7-PLC PRO ayuda a ordenar síntomas,
                hipótesis y verificaciones antes de cambiar hardware, reiniciar equipos o intervenir sin evidencia.
              </p>
              <strong className="app-pro-cost-emphasis">Menos prueba y error. Más criterio técnico.</strong>
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
            {appFaqItems.map((item, index) => (
              <details className="app-pro-faq-item" key={item.question} open={index === 0}>
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
      subtitle="Canales de consulta para fallas de planta, automatización, cursos, capacitaciones, migraciones, tableros, redes industriales y BOJ S7-PLC."
    >
      <section className="contact-direct">
        <div>
          <p className="eyebrow">Atención directa técnica</p>
          <h2>Atención técnica con foco en diagnóstico y próximo paso claro</h2>
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

function PageShell({ eyebrow, title, subtitle, heroExtra, children }) {
  return (
    <>
      <section className="page-hero">
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
        <div className="status-cluster">
          <b>RUN</b>
          <b>STOP</b>
          <b>SF</b>
          <b>BF</b>
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
        <div className="mock-footer-legal">
          <h3>Legal</h3>
          <a href="#/app">Términos y condiciones</a>
          <a href="#/app">Política de privacidad</a>
        </div>
        <div className="mock-footer-social">
          <h3>Seguinos</h3>
          <div>
            <a href={contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
            <a href={contact.linktree} target="_blank" rel="noreferrer" aria-label="YouTube">yt</a>
            <a href={contact.linktree} target="_blank" rel="noreferrer" aria-label="Instagram">ig</a>
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
