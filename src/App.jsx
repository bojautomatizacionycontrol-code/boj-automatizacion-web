import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Building2,
  Cable,
  CheckCircle2,
  ChevronDown,
  CircuitBoard,
  ClipboardCheck,
  Cpu,
  ExternalLink,
  Factory,
  FileSearch,
  Gauge,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  MonitorCog,
  Network,
  Phone,
  RefreshCcw,
  Settings,
  ShieldCheck,
  Smartphone,
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
  whyBoj,
} from "./content.js";
import bojLogo from "./assets/boj-logo-web.png";
import appScreenshot from "./assets/APP.png";
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
  Building2,
  Cable,
  CheckCircle2,
  CircuitBoard,
  ClipboardCheck,
  Cpu,
  ExternalLink,
  Factory,
  FileSearch,
  Gauge,
  GraduationCap,
  Mail,
  MapPin,
  MonitorCog,
  Network,
  Phone,
  RefreshCcw,
  Settings,
  ShieldCheck,
  Smartphone,
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

const technicalCredibilityBadges = [
  "PLC Siemens S5 | S7-300/400 | S7-1200/1500",
  "STEP 7 Classic / TIA Portal",
  "PROFIBUS / PROFINET",
  "HMI, SCADA, variadores e instrumentación",
  "Diagnóstico aplicado a fallas reales de planta",
];

const homeServiceOrder = [
  "Diagnóstico de fallas en PLC Siemens",
  "Automatización industrial",
  "Ingeniería de detalle y puesta en marcha",
  "Redes PROFIBUS / PROFINET",
  "Migraciones de sistemas",
  "Cursos técnicos aplicados",
  "App de diagnóstico para campo",
];

const homeServiceText = {
  "Diagnóstico de fallas en PLC Siemens":
    "Lectura técnica de CPU, LEDs, Diagnostic Buffer, módulos, señales, red y síntomas de planta. Se entrega análisis de causa probable y recomendación de intervención.",
  "Automatización industrial":
    "Programación, modificación y puesta en marcha de PLC, HMI, SCADA, drives e instrumentación para máquinas y procesos industriales.",
  "Ingeniería de detalle y puesta en marcha":
    "Relevamiento, especificaciones, planos, tableros, pruebas FAT/SAT y acompañamiento hasta producción.",
  "Redes PROFIBUS / PROFINET":
    "Revisión de nodos, conectores, terminaciones, BF, comunicación PLC-HMI-Drive y diagnóstico online de redes industriales.",
  "Migraciones de sistemas":
    "Relevamiento de plataformas legacy, estrategia de migración, pruebas controladas y puesta en marcha hacia S7/TIA.",
  "Cursos técnicos aplicados":
    "Capacitación orientada a mantenimiento industrial con casos reales, procedimientos de diagnóstico y lectura de sistemas existentes.",
  "App de diagnóstico para campo":
    "Herramienta digital para ordenar síntomas, estados de CPU, red y observaciones de campo antes de tomar decisiones técnicas.",
};

const featuredHomeServices = homeServiceOrder
  .map((title) => homeHighlights.find((item) => item.title === title))
  .map((item) => (item ? { ...item, text: homeServiceText[item.title] || item.text } : item))
  .filter(Boolean);

const homeProblems = [
  { icon: "Zap", text: "Paradas de máquina sin causa clara." },
  { icon: "Cpu", text: "Fallas intermitentes en PLC, módulos o redes industriales." },
  { icon: "Network", text: "Errores PROFIBUS / PROFINET difíciles de diagnosticar." },
  { icon: "FileSearch", text: "Programas PLC heredados sin documentación suficiente." },
  { icon: "ClipboardCheck", text: "Tableros o sistemas modificados sin trazabilidad." },
  { icon: "Wrench", text: "Personal de mantenimiento sin método claro de diagnóstico." },
  { icon: "Gauge", text: "Señales de campo, sensores o actuadores con comportamiento dudoso." },
  { icon: "RefreshCcw", text: "Migraciones o mejoras que requieren intervenir sin comprometer la producción." },
];

const homeAudience = [
  "Plantas industriales con sistemas PLC Siemens en operación.",
  "Responsables de mantenimiento que necesitan reducir tiempos de parada.",
  "Empresas que requieren diagnóstico, mejora o modernización de sistemas existentes.",
  "Técnicos e ingenieros que buscan formación aplicada a fallas reales.",
  "Equipos de mantenimiento que necesitan ordenar procedimientos de intervención.",
  "Industrias con tableros, redes, HMI, variadores o instrumentación en servicio.",
];

const workModes = [
  "Diagnóstico remoto asistido.",
  "Asistencia técnica en planta.",
  "Capacitación in-company.",
  "Desarrollo de mejoras y migraciones.",
  "Soporte técnico por proyecto.",
  "Revisión de documentación, backups y arquitectura de control.",
  "Acompañamiento en puesta en marcha.",
  "Desarrollo de recursos técnicos y herramientas digitales para mantenimiento.",
];

const featuredCourseBullets = [
  "Orientado a mantenimiento industrial.",
  "Diagnóstico de CPU, módulos, señales y red.",
  "Uso de SIMATIC Manager / STEP 7 Classic.",
  "Interpretación de RUN, STOP, SF y BF.",
  "Lectura de Diagnostic Buffer.",
  "HW Config online.",
  "PROFIBUS / PROFINET.",
  "Casos reales de planta.",
];

const featuredAppBullets = [
  "Reduce diagnósticos apresurados.",
  "Ayuda a separar falla de campo, red, hardware o lógica.",
  "Ordena la evidencia antes de tomar decisiones.",
  "Guía el análisis con criterios técnicos de mantenimiento.",
  "Disponible en edición Course y versión PRO.",
];

const homeMethodSteps = [
  {
    icon: "FileSearch",
    title: "Relevar el síntoma",
    text: "Registrar el estado real del sistema: CPU, LEDs, condición de máquina, alarmas, módulos afectados, red involucrada y señales críticas del proceso.",
  },
  {
    icon: "ClipboardCheck",
    title: "Confirmar evidencia",
    text: "Validar la información con herramientas online, Diagnostic Buffer, HW Config, monitoreo de variables, estado de nodos y mediciones de campo.",
  },
  {
    icon: "Network",
    title: "Aislar la causa probable",
    text: "Distinguir si la falla proviene de lógica, hardware, red industrial, instrumento, cableado, alimentación, actuador o condición de proceso.",
  },
  {
    icon: "ShieldCheck",
    title: "Intervenir con criterio",
    text: "Ejecutar la acción técnica necesaria, evitando pruebas innecesarias, documentando lo realizado y dejando una recomendación útil para mantenimiento.",
  },
];

const compactHomeProblems = [
  {
    icon: "Zap",
    title: "Paradas inesperadas",
    text: "Máquinas detenidas sin causa clara y con impacto directo en producción.",
  },
  {
    icon: "Network",
    title: "Fallas intermitentes en red",
    text: "Errores PROFIBUS / PROFINET, BF activos y comunicación inestable.",
  },
  {
    icon: "FileSearch",
    title: "Sistemas heredados",
    text: "Programas PLC antiguos, documentación incompleta y tableros modificados.",
  },
  {
    icon: "RefreshCcw",
    title: "Migraciones y mejoras",
    text: "Intervenciones sobre sistemas en servicio sin comprometer la producción.",
  },
];

const compactHomeServices = [
  {
    icon: "Cpu",
    title: "Diagnóstico de fallas",
    text: "Lectura de CPU, módulos, señales y redes para aislar la causa probable.",
    href: "#/servicios",
  },
  {
    icon: "Settings",
    title: "Automatización industrial",
    text: "Programación, modificación y puesta en marcha de PLC, HMI y variadores.",
    href: "#/servicios",
  },
  {
    icon: "Network",
    title: "Redes PROFIBUS / PROFINET",
    text: "Revisión de nodos, conectores, BF y comunicación PLC-HMI-Drive.",
    href: "#/servicios",
  },
  {
    icon: "GraduationCap",
    title: "Formación y herramientas",
    text: "Cursos técnicos aplicados y app BOJ S7-PLC para ordenar diagnósticos.",
    href: "#/cursos",
  },
];

const serviceModeRows = [
  {
    label: "Tiempo de respuesta",
    remote: "Primer análisis con datos, fotos o conexión remota.",
    company: "Coordinación según criticidad, seguridad y disponibilidad de planta.",
    online: "Acceso planificado a contenidos, clases o recursos digitales.",
  },
  {
    label: "Ventajas",
    remote: "Reduce incertidumbre inicial y ordena evidencia antes de intervenir.",
    company: "Permite revisar tablero, señales, red y proceso en contexto real.",
    online: "Estandariza criterios de diagnóstico para técnicos y mantenimiento.",
  },
  {
    label: "Recomendado para",
    remote: "Consultas urgentes, prediagnóstico y revisión de síntomas.",
    company: "Paradas críticas, puesta en marcha, migraciones y capacitación interna.",
    online: "Equipos que necesitan formación aplicada sin detener operación.",
  },
];

const productCards = [
  {
    eyebrow: "Curso destacado",
    title: "Diagnóstico de fallas PLC Siemens S7-300/400",
    image: step7HwConfigVisual,
    alt: "Captura técnica de STEP 7 Classic y HW Config",
    bullets: [
      "STEP 7 Classic, CPU, módulos y Diagnostic Buffer.",
      "Casos reales orientados a mantenimiento industrial.",
      "Criterio técnico para intervenir sistemas existentes.",
    ],
    href: "#/cursos/s7-300-400",
    label: "Ver temario",
  },
  {
    eyebrow: "App BOJ S7-PLC",
    title: "Herramienta de diagnóstico para campo",
    image: appScreenshot,
    alt: "Captura de la aplicación BOJ S7-PLC",
    bullets: [
      "Ordena síntomas, LEDs, red y observaciones de planta.",
      "Propone hipótesis probables y criterios de verificación.",
      "Disponible en edición Course y versión PRO.",
    ],
    href: "#/app",
    label: "Conocer la app",
  },
];

const homeTrustProofs = [
  "Diagnóstico aplicado sobre PLC Siemens y redes industriales.",
  "Cursos técnicos orientados a mantenimiento y fallas reales.",
  "Obras documentadas en automatización, migraciones, HMI y SCADA.",
];

const S7_PLAN_PRICES = {
  professional: 197,
  enterprise: 397,
};

const S7_HOTMART_URLS = {
  professional: "",
  enterprise: "",
};

const s7SalesWhatsapp = whatsappUrl(
  "Hola, escribo desde la web de BOJ para consultar por el paquete Diagnóstico S7-300/400 con manuales digitales y App PRO."
);

const s7CourseIncludes = [
  {
    icon: "FileSearch",
    title: "Manual 1",
    name: "Diagnóstico y resolución de fallas en PLC Siemens S7-300/400",
    text: "Manual práctico con método de diagnóstico basado en situaciones reales de planta: CPU, LEDs, módulos, red, señales y causa probable.",
    tag: "Diagnóstico industrial",
  },
  {
    icon: "ClipboardCheck",
    title: "Manual 2",
    name: "Fundamentos de sistemas de control industrial y diagnóstico en PLC Siemens",
    text: "Base conceptual para comprender sistemas de control, interpretar fallas y ordenar el análisis técnico antes de intervenir.",
    tag: "Base técnica",
  },
  {
    icon: "Smartphone",
    title: "App S7-PLC",
    name: "Licencia PRO con actualizaciones durante 12 meses",
    text: "La app guía paso a paso el diagnóstico, organiza observaciones de campo y ayuda a priorizar verificaciones técnicas.",
    tag: "App PRO 12 meses",
    image: appScreenshot,
  },
];

const s7Plans = [
  {
    id: "professional",
    title: "Plan Profesional",
    price: S7_PLAN_PRICES.professional,
    description: "Para técnicos, automatistas y profesionales que necesitan una herramienta completa de diagnóstico individual.",
    features: [
      "2 libros en español y portugués.",
      "Licencia PRO de la app por 12 meses.",
      "Actualizaciones durante el año.",
      "1 licencia simultánea de la app.",
    ],
  },
  {
    id: "enterprise",
    title: "Plan Empresas",
    price: S7_PLAN_PRICES.enterprise,
    description: "Para equipos de mantenimiento, ingeniería o capacitación interna que necesitan múltiples accesos y soporte.",
    featured: true,
    features: [
      "2 libros en seis idiomas: inglés, español, portugués, alemán, francés e italiano.",
      "Licencia PRO de la app por 12 meses.",
      "Hasta 3 licencias simultáneas.",
      "Soporte técnico por correo electrónico.",
      "Actualizaciones durante el año.",
    ],
  },
];

const s7PlanComparison = [
  { item: "Idiomas de los libros", professional: "Español y portugués", enterprise: "Seis idiomas", highlight: true },
  { item: "Manuales digitales", professional: "2 libros incluidos", enterprise: "2 libros incluidos" },
  { item: "App BOJ S7-PLC PRO", professional: "12 meses", enterprise: "12 meses" },
  { item: "Licencias simultáneas", professional: "1 licencia", enterprise: "Hasta 3 licencias", highlight: true },
  { item: "Soporte por correo", professional: "No incluido", enterprise: "Incluido", highlight: true },
  { item: "Actualizaciones", professional: "Durante el año", enterprise: "Durante el año" },
];

const s7ExpectedResults = [
  {
    icon: "FileSearch",
    title: "Diagnóstico más ordenado",
    text: "El material ayuda a pasar del síntoma a la evidencia antes de modificar lógica o reemplazar hardware.",
  },
  {
    icon: "ShieldCheck",
    title: "Menos prueba y error",
    text: "La secuencia técnica reduce decisiones apresuradas durante una parada o una falla intermitente.",
  },
  {
    icon: "ClipboardCheck",
    title: "Mejor criterio documentado",
    text: "Los manuales y la app facilitan registrar observaciones, hipótesis y verificaciones de campo.",
  },
];

const s7FaqItems = [
  {
    question: "¿Cómo se accede a los libros digitales?",
    answer: "Los manuales se entregan en formato digital dentro del flujo comercial del producto. La página no publica descargas directas.",
  },
  {
    question: "¿Cómo se activa la licencia de la app BOJ S7-PLC?",
    answer: "La licencia PRO se gestiona luego de la compra y queda asociada al acceso indicado para el comprador o la empresa.",
  },
  {
    question: "¿Qué idiomas incluye cada plan?",
    answer: "El Plan Profesional incluye los libros en español y portugués. El Plan Empresas incluye inglés, español, portugués, alemán, francés e italiano.",
  },
  {
    question: "¿Qué requisitos previos conviene tener?",
    answer: "Es recomendable conocer conceptos básicos de PLC, mantenimiento industrial, señales de campo y lectura general de sistemas Siemens.",
  },
  {
    question: "¿Las actualizaciones están incluidas?",
    answer: "Sí. Ambos planes incluyen actualizaciones durante el año de licencia de la app y del material asociado al producto.",
  },
  {
    question: "¿Cuándo estarán disponibles los botones de Hotmart?",
    answer: "Los botones de compra quedarán activos cuando se carguen las URLs reales de Hotmart para cada plan.",
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
    title: "BOJ S7-PLC | App de diagnóstico PLC Siemens S7-300/400",
    description:
      "BOJ S7-PLC es una herramienta de diagnóstico industrial para PLC Siemens S7-300/400 con STEP 7 Classic, LEDs CPU, PROFIBUS, hipótesis y casos reales.",
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

routeMeta["/cursos/s7-300-400"] = {
  title: "Diagnóstico PLC Siemens S7-300/400 + App PRO | BOJ",
  description:
    "Paquete digital BOJ para diagnóstico industrial en PLC Siemens S7-300/400: dos manuales prácticos, App BOJ S7-PLC PRO por 12 meses y actualizaciones.",
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

      <button
        className="nav-toggle"
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

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
      </nav>

      <a
        className="header-cta"
        href={whatsappUrl("Hola, escribo desde la web de BOJ Automatización y Control para realizar una consulta técnica.")}
        onClick={closeMenu}
      >
        <Phone size={17} /> WhatsApp
      </a>
    </header>
  );
}

function HomePage() {
  return (
    <>
      <section
        className="hero hero-industrial-bg home-hero-compact"
        style={{ "--hero-bg": `url(${panelDiagnosticVisual})` }}
      >
        <div className="section-container hero-content">
          <p className="eyebrow">PLC Siemens | Diagnóstico industrial | Formación técnica</p>
          <h1>Soluciones de diagnóstico y mejora para PLC Siemens</h1>
          <p className="hero-subtitle">
            Soporte técnico, automatización y capacitación para reducir paradas, resolver fallas
            complejas y fortalecer el criterio del equipo de mantenimiento.
          </p>
          <div className="hero-actions">
            <PrimaryLink href={whatsappUrl("Hola, necesito solicitar diagnóstico para un sistema PLC Siemens.")}>
              <Phone size={18} /> Solicitar diagnóstico
            </PrimaryLink>
            <SecondaryLink href="#/cursos">Cursos y formación</SecondaryLink>
          </div>
        </div>
      </section>

      <HomeProblemsSection />
      <HomeServicesSection />
      <VideoPresentationSection />
      <ServiceModesTable />
      <HomeProductCards />
      <HomeTrustSection />
      <FinalCTA />
    </>
  );
}

function ServicesPage() {
  return (
    <PageShell
      eyebrow="Servicios"
      title="Servicios técnicos para reducir paradas y sostener automatización industrial"
      subtitle="Diagnóstico, ingeniería, programación, redes, tableros y puesta en marcha con foco en continuidad operativa, mantenimiento y decisiones con evidencia."
    >
      <ServicePrinciples />
      <div className="services-list">
        {services.map((service) => (
          <ServiceDetailCard key={service.title} service={service} />
        ))}
      </div>
      <RouteCTA
        title="Cuando una falla, migración o mejora requiere criterio técnico"
        text="La consulta puede iniciar con el síntoma, el PLC involucrado, fotos del tablero o una descripción breve del proceso. La respuesta inicial ordena alcance, riesgo y próximo paso técnico."
        primaryLabel="Consultar por WhatsApp"
        primaryHref={whatsappUrl("Hola, escribo desde la web de BOJ para consultar por un servicio técnico industrial.")}
        secondaryLabel="Ir a contacto"
        secondaryHref="#/contacto"
      />
    </PageShell>
  );
}

function CoursesPage() {
  return (
    <PageShell
      eyebrow="Cursos"
      title="Cursos técnicos para diagnosticar y programar PLC Siemens con criterio de planta"
      subtitle="Formación aplicada para mantenimiento, instrumentistas, electricistas e ingeniería: menos teoría aislada y más método para actuar frente a fallas reales."
    >
      <div className="training-strip">
        <span>Diagnóstico online</span>
        <span>Casos reales de planta</span>
        <span>Tableros y señales</span>
        <span>Criterio de mantenimiento</span>
      </div>
      <div className="course-grid">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} expanded />
        ))}
      </div>
      <div className="technical-note">
        <Icon name="ClipboardCheck" />
        <p>
          Los cursos están diseñados para que el participante interprete qué muestra el PLC,
          qué significa cada síntoma y cómo avanzar sin depender de prueba y error.
        </p>
      </div>
      <RouteCTA
        title="Capacitación para equipos que responden ante fallas reales"
        text="Los contenidos pueden orientarse al nivel del grupo, al tipo de planta y a los problemas que mantenimiento enfrenta durante una parada."
        primaryLabel="Consultar capacitación"
        primaryHref={whatsappUrl("Hola, escribo desde la web de BOJ para consultar por cursos o capacitación in-company.")}
        secondaryLabel="Ver curso S7-300/400"
        secondaryHref="#/cursos/s7-300-400"
      />
    </PageShell>
  );
}

function S7CoursePage() {
  return <S7CourseSalesPage />;

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

function S7CourseSalesPage() {
  return (
    <PageShell
      eyebrow="Curso aplicado + App PRO"
      title="Diagnóstico y resolución de fallas en PLC Siemens S7-300/400"
      subtitle="Manual de diagnóstico industrial + App PRO para reducir tiempos de parada"
      heroExtra={
        <div className="s7-sales-hero">
          <p>
            Producto digital compuesto por dos libros prácticos y una licencia BOJ S7-PLC PRO
            por 12 meses, con actualizaciones incluidas durante el año.
          </p>
          <p>
            Diseñado para mantenimiento, instrumentistas, automatistas e ingeniería que necesitan
            ordenar fallas reales de planta con método técnico.
          </p>
          <div className="button-row s7-hero-actions">
            <S7PurchaseButton planId="professional" />
            <SecondaryLink href={s7SalesWhatsapp}>Consultar por WhatsApp</SecondaryLink>
          </div>
        </div>
      }
    >
      <section className="inner-section s7-sales-intro">
        <div className="s7-sales-copy">
          <p className="eyebrow">Producto digital BOJ</p>
          <h2>Dos manuales técnicos y una app de asistencia para diagnóstico en campo</h2>
          <p>
            El objetivo no es enseñar programación desde cero. Es entregar una secuencia práctica
            para interpretar síntomas, confirmar evidencia y tomar decisiones técnicas sobre
            sistemas Siemens S7-300/400 en operación.
          </p>
        </div>
        <CourseVisual type="s7" />
      </section>

      <section className="inner-section">
        <SectionHeader
          eyebrow="Qué incluye este curso"
          title="Material de diagnóstico + licencia PRO por 12 meses"
          text="Se reciben los dos manuales en formato digital y una licencia PRO de BOJ S7-PLC para ordenar observaciones, hipótesis y criterios de verificación."
        />
        <div className="s7-include-grid">
          {s7CourseIncludes.map((item) => (
            <CourseIncludedCard key={item.name} item={item} />
          ))}
        </div>
      </section>

      <section className="inner-section s7-plan-section">
        <SectionHeader
          eyebrow="Planes disponibles"
          title="Elegir plan según uso individual o equipo de mantenimiento"
          text="Ambos planes incluyen app PRO por 12 meses y actualizaciones durante el año. El plan Empresas agrega más idiomas, licencias simultáneas y soporte por correo."
        />
        <div className="s7-plan-grid">
          {s7Plans.map((plan) => (
            <S7PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </section>

      <S7PlanComparisonTable />

      <section className="inner-section">
        <SectionHeader
          eyebrow="Resultados esperados"
          title="Menos improvisación y más evidencia técnica durante una falla"
          text="Sin promesas automáticas ni porcentajes no verificados: el valor está en ordenar el diagnóstico y evitar decisiones apresuradas."
        />
        <div className="s7-results-grid">
          {s7ExpectedResults.map((item) => (
            <article className="s7-result-card" key={item.title}>
              <Icon name={item.icon} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <S7Faq />

      <section className="route-cta s7-final-cta">
        <div>
          <h2>¿Quiere preparar la compra o consultar qué plan conviene?</h2>
          <p>
            Los botones de Hotmart quedarán activos cuando estén creadas las URLs de cada plan.
            Mientras tanto, la consulta por WhatsApp permite resolver dudas de preventa.
          </p>
        </div>
        <div className="button-row">
          <S7PurchaseButton planId="enterprise" />
          <SecondaryLink href={s7SalesWhatsapp}>Consultar por WhatsApp</SecondaryLink>
        </div>
      </section>
    </PageShell>
  );
}

function CourseIncludedCard({ item }) {
  return (
    <article className={`s7-include-card ${item.image ? "with-app" : ""}`}>
      <div className="s7-include-visual" aria-hidden="true">
        {item.image ? (
          <img src={item.image} alt="" loading="lazy" />
        ) : (
          <div className="manual-mockup">
            <span>{item.title}</span>
            <Icon name={item.icon} size={34} />
          </div>
        )}
      </div>
      <div>
        <span className="s7-card-tag">{item.tag}</span>
        <h3>{item.name}</h3>
        <p>{item.text}</p>
      </div>
    </article>
  );
}

function S7PlanCard({ plan }) {
  return (
    <article className={`s7-plan-card ${plan.featured ? "featured" : ""}`}>
      {plan.featured ? <span className="s7-plan-badge">Para equipos</span> : null}
      <div className="s7-plan-heading">
        <h3>{plan.title}</h3>
        <p>{plan.description}</p>
      </div>
      <div className="s7-plan-price">
        <strong>{plan.price} USD</strong>
        <span>Pago por plan</span>
      </div>
      <ul className="clean-list s7-plan-features">
        {plan.features.map((feature) => (
          <li key={feature}>
            <CheckCircle2 size={17} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <S7PurchaseButton planId={plan.id} />
    </article>
  );
}

function S7PurchaseButton({ planId }) {
  const url = S7_HOTMART_URLS[planId];
  const planLabel = planId === "enterprise" ? "Plan Empresas" : "Plan Profesional";

  if (!url) {
    return (
      <button className="btn primary s7-purchase-button disabled" type="button" disabled aria-disabled="true">
        Compra en Hotmart próximamente
      </button>
    );
  }

  return (
    <a
      className="btn primary s7-purchase-button"
      href={url}
      target="_blank"
      rel="noopener"
      aria-label={`Comprar ${planLabel} en Hotmart`}
    >
      Comprar {planLabel} <ExternalLink size={17} />
    </a>
  );
}

function S7PlanComparisonTable() {
  return (
    <section className="inner-section">
      <SectionHeader
        eyebrow="Comparativa"
        title="Diferencias principales entre Profesional y Empresas"
        text="La tabla resume el alcance de cada plan para decidir según idioma, cantidad de licencias y necesidad de soporte."
      />
      <div className="s7-plan-table-wrap">
        <table className="s7-plan-table" aria-label="Comparativa de planes del curso S7-300/400">
          <thead>
            <tr>
              <th scope="col">Elemento</th>
              <th scope="col">Plan Profesional</th>
              <th scope="col">Plan Empresas</th>
            </tr>
          </thead>
          <tbody>
            {s7PlanComparison.map((row) => (
              <tr key={row.item} className={row.highlight ? "enterprise-highlight" : ""}>
                <th scope="row">{row.item}</th>
                <td>{row.professional}</td>
                <td>{row.enterprise}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function S7Faq() {
  return (
    <section className="inner-section s7-faq-section">
      <SectionHeader
        eyebrow="Preguntas frecuentes"
        title="Acceso, licencia e idiomas"
        text="Información breve para entender qué se entrega y cómo queda preparada la compra cuando Hotmart esté configurado."
      />
      <div className="s7-faq-grid">
        {s7FaqItems.map((item) => (
          <details className="s7-faq-item" key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
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
  const scrollToCourseEdition = () => {
    document.getElementById("course-edition")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <PageShell
      eyebrow="App"
      title={appHero.title}
      subtitle={appHero.subtitle}
      heroExtra={
        <>
          <p className="page-hero-detail">{appHero.text}</p>
          <p className="technical-disclaimer">{appHero.note}</p>
          <div className="button-row page-hero-actions">
            <button className="btn secondary" type="button" onClick={scrollToCourseEdition}>
              Ver versión del curso
            </button>
            <PrimaryLink href="https://www.bojautomatizacion.com/#/app">
              Desbloquear PRO <ExternalLink size={17} />
            </PrimaryLink>
          </div>
        </>
      }
    >
      <div className="app-page-grid app-product-intro">
        <div>
          <p className="eyebrow">Herramienta de campo para STEP 7 Classic</p>
          <h2>Diagnóstico estructurado para PLC Siemens S7</h2>
          <p>
            BOJ S7-PLC convierte un método de diagnóstico de planta en una herramienta guiada:
            primero ordena el estado de CPU y LEDs, después conserva el contexto técnico para
            priorizar verificaciones y causas probables.
          </p>
          <div className="app-signal-strip" aria-label="Señales y estados que interpreta BOJ S7-PLC">
            {["RUN", "STOP", "SF", "BF", "FRCE", "DC5V"].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
        <AppMockup />
      </div>

      <section className="inner-section">
        <SectionHeader
          eyebrow="Qué hace"
          title="Una guía técnica para no saltear pasos críticos"
          text="La app trabaja como apoyo al criterio profesional: estructura síntomas, ramas técnicas, hipótesis y casos de referencia sin prometer diagnósticos automáticos."
        />
        <div className="card-grid three">
          {appCapabilities.map((item) => (
            <article className="info-card app-capability-card" key={item.title}>
              <Icon name={item.icon} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="inner-section app-field-panel">
        <div>
          <p className="eyebrow">Cómo ayuda en planta</p>
          <h2>Ordena el análisis cuando hay presión, alarmas y poco tiempo</h2>
          <p>
            En una falla real pueden aparecer señales engañosas: CPU en RUN con proceso detenido,
            BF intermitente después de mantenimiento, estación remota sin alimentación o FRCE activo
            olvidado. La app ayuda a separar evidencia de suposiciones.
          </p>
        </div>
        <div className="check-grid compact">
          {appPlantBenefits.map((item) => (
            <CheckItem key={item}>{item}</CheckItem>
          ))}
        </div>
      </section>

      <section className="inner-section">
        <SectionHeader
          eyebrow="Módulos de diagnóstico"
          title="Ramas técnicas para PLC Siemens S7-300/400"
          text="El flujo mantiene contexto. Si aparece BF y HW Config muestra un esclavo DP caído, la guía continúa por PROFIBUS/DP en lugar de saltar a DI/DO sin relación."
        />
        <div className="app-module-grid">
          {appDiagnosticModules.map((module) => (
            <article className="app-module-card" key={module.title}>
              <h3>{module.title}</h3>
              <p>{module.text}</p>
              <div className="tag-list">
                {module.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="inner-section app-evidence-panel">
        <figure>
          <img src={step7ClassicVisual} alt="SIMATIC STEP 7 Classic HW Config para diagnóstico PLC Siemens S7" loading="lazy" />
        </figure>
        <div>
          <p className="eyebrow">Hipótesis ponderadas</p>
          <h2>No adivina: prioriza verificaciones según síntomas</h2>
          <p>
            A medida que el usuario responde, BOJ S7-PLC actualiza causas probables y deja visibles
            solo las hipótesis relevantes: OB82/OB86 faltantes, estación DP caída, ET200 sin 24 VDC,
            HW Config no coincidente, FRCE activo o falla intermitente por vibración.
          </p>
          <div className="hypothesis-list">
            {["Estación DP caída", "ET200 sin 24 VDC", "Conector PROFIBUS flojo", "OB86 faltante"].map((item, index) => (
              <span key={item}>
                <b>{index + 1}</b>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="inner-section" id="course-edition">
        <SectionHeader
          eyebrow="Course Edition vs PRO"
          title="Una versión incluida con el curso y una versión completa para campo"
          text="La Course Edition permite aplicar el método sobre estados CPU y fallas PROFIBUS frecuentes. PRO desbloquea el motor completo, ramas avanzadas y biblioteca extendida."
        />
        <AppComparisonTable />
      </section>

      <section className="inner-section app-version-grid">
        <article className="version-card app-version-card">
          <span className="edition-badge course">Course Edition</span>
          <h3>BOJ S7-PLC Course Edition</h3>
          <p>
            Incluida con el curso. Habilita el módulo completo de LEDs, interpretación de estados
            CPU, diagnóstico guiado básico, rama PROFIBUS/DP, 10 casos reales seleccionados y guía técnica esencial.
          </p>
          <SecondaryLink href="#/cursos/s7-300-400">Ver curso vinculado</SecondaryLink>
        </article>
        <article className="version-card app-version-card pro">
          <span className="edition-badge pro">PRO</span>
          <h3>BOJ S7-PLC PRO</h3>
          <p>
            Desbloquea todas las ramas: señales analógicas, DO/actuadores, lógica, secuencias,
            interlocks, fallas intermitentes, diagnóstico engañoso avanzado, 80+ casos, guía completa e informes.
          </p>
          <PrimaryLink href="https://www.bojautomatizacion.com/#/app">
            Desbloquear versión PRO
          </PrimaryLink>
        </article>
      </section>

      <section className="inner-section">
        <SectionHeader
          eyebrow="Casos reales incluidos"
          title="Biblioteca de fallas típicas para consultar con criterio"
          text="Cada caso se presenta con contexto, síntoma observado, causa probable, verificación recomendada, error típico y criterio de seguridad."
        />
        <div className="case-grid">
          {appRealCases.map((caseItem, index) => (
            <article className="case-card" key={caseItem}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{caseItem}</p>
            </article>
          ))}
        </div>
        <div className="technical-note app-library-note">
          <Icon name="ClipboardCheck" />
          <p>
            Course Edition incluye 10 casos seleccionados. PRO amplía la biblioteca a 80+ casos reales,
            incluyendo señales analógicas, actuadores, lógica, interlocks, fallas intermitentes y diagnósticos engañosos.
          </p>
        </div>
      </section>

      <section className="inner-section">
        <SectionHeader
          eyebrow="Para quién es"
          title="Pensada para usuarios técnicos que trabajan con Siemens S7"
          text="BOJ S7-PLC habla el lenguaje del mantenimiento industrial: CPU, LEDs, BF/SF, Diagnostic Buffer, HW Config, PROFIBUS, señales y criterio de intervención."
        />
        <div className="audience-grid">
          {appAudience.map((item) => (
            <CheckItem key={item}>{item}</CheckItem>
          ))}
        </div>
      </section>

      <RouteCTA
        title="Diagnóstico de PLC con un método más ordenado"
        text="BOJ S7-PLC se utiliza como apoyo técnico para interpretar síntomas, seguir verificaciones y priorizar causas probables en sistemas Siemens S7-300/400."
        primaryLabel="Desbloquear versión PRO"
        primaryHref="https://www.bojautomatizacion.com/#/app"
        secondaryLabel="Ver curso con Course Edition"
        secondaryHref="#/cursos/s7-300-400"
      />
    </PageShell>
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
      <img src={bojLogo} alt="Logo BOJ Automatización y Control" />
    </span>
  );
}

function TrustBar() {
  return (
    <section className="trust-bar" aria-label="Especialización técnica BOJ">
      <div className="section-container trust-grid">
        {technicalCredibilityBadges.map((badge) => (
          <div className="trust-item" key={badge}>
            <span>{badge}</span>
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

function HomeProblemsSection() {
  return (
    <section className="section home-problems-section home-compact-section" id="problemas">
      <div className="section-container">
        <SectionHeader
          eyebrow="Problemas que resolvemos"
          title="Problemas que requieren diagnóstico técnico"
          text="Una falla no siempre empieza como pedido de automatización. Suele aparecer como parada, alarma, red inestable o sistema heredado."
        />
        <div className="home-compact-grid four">
          {compactHomeProblems.map((item) => (
            <HomeCompactCard key={item.title} item={item} />
          ))}
        </div>
        <div className="home-section-actions">
          <SecondaryLink href="#/obras">Ver casos de éxito</SecondaryLink>
        </div>
      </div>
    </section>
  );
}

function HomeServicesSection() {
  return (
    <section className="section home-services-section home-compact-section">
      <div className="section-container">
        <SectionHeader
          eyebrow="Servicios principales"
          title="Áreas de trabajo resumidas"
          text="Cuatro caminos claros para pasar desde el problema actual hacia diagnóstico, mejora, formación o herramientas digitales."
        />
        <div className="home-compact-grid four">
          {compactHomeServices.map((item) => (
            <HomeCompactCard key={item.title} item={item} linkLabel="Ver más" />
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeCompactCard({ item, linkLabel }) {
  return (
    <article className="home-compact-card card">
      <span className="icon-chip" aria-hidden="true">
        <Icon name={item.icon} />
      </span>
      <h3>{item.title}</h3>
      <p>{item.text}</p>
      {item.href && linkLabel ? (
        <a className="compact-card-link" href={item.href} aria-label={`${linkLabel}: ${item.title}`}>
          {linkLabel} <ArrowRight size={16} />
        </a>
      ) : null}
    </article>
  );
}

function VideoPresentationSection() {
  const [videoRequested, setVideoRequested] = useState(false);

  return (
    <section className="section video-presentation-section" id="video-presentacion">
      <div className="section-container video-presentation-layout">
        <div className="video-copy">
          <p className="eyebrow">Cómo trabajamos</p>
          <h2>Diagnóstico, formación y herramientas en contexto industrial</h2>
          <p>
            El video de presentación mostrará fragmentos de diagnóstico en planta, cursos técnicos
            y uso de BOJ S7-PLC. Mientras se produce el material, la Home deja la estructura lista
            sin inventar contenido audiovisual.
          </p>
          <div className="button-row">
            <SecondaryLink href="#/servicios">Detalle del método</SecondaryLink>
            <GhostLink href="#/obras">Ver obras reales</GhostLink>
          </div>
        </div>
        <div className="video-placeholder-card">
          <video
            className="home-video"
            poster={panelDiagnosticVisual}
            preload="none"
            aria-label="Video de presentación de BOJ en preparación"
          />
          <button
            className="video-play-button"
            type="button"
            aria-label="Reproducir video de presentación"
            aria-pressed={videoRequested}
            onClick={() => setVideoRequested(true)}
          >
            <span className="play-glyph" aria-hidden="true" />
            <span>{videoRequested ? "Video en preparación" : "Reproducir presentación"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}

function ServiceModesTable() {
  return (
    <section className="section service-modes-section" id="modalidades">
      <div className="section-container">
        <SectionHeader
          eyebrow="Modalidades"
          title="Elegir el tipo de soporte según urgencia y contexto"
          text="La modalidad depende de la criticidad, la evidencia disponible y la necesidad de acompañar al equipo técnico interno."
        />
        <div className="service-modes-table-wrap">
          <table className="service-modes-table">
            <thead>
              <tr>
                <th scope="col">Criterio</th>
                <th scope="col">Soporte remoto</th>
                <th scope="col">In-company</th>
                <th scope="col">Capacitación online</th>
              </tr>
            </thead>
            <tbody>
              {serviceModeRows.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  <td>{row.remote}</td>
                  <td>{row.company}</td>
                  <td>{row.online}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="home-section-actions">
          <PrimaryLink href={whatsappUrl("Hola, necesito orientación para elegir modalidad de soporte técnico o capacitación.")}>
            ¿Qué modalidad necesito?
          </PrimaryLink>
        </div>
      </div>
    </section>
  );
}

function HomeProductCards() {
  return (
    <section className="section home-products-section">
      <div className="section-container">
        <SectionHeader
          eyebrow="Formación y herramienta digital"
          title="Dos recursos para sostener el diagnóstico más allá de la intervención"
          text="El curso y la app concentran el método de trabajo en formatos aplicables por técnicos e industrias."
        />
        <div className="home-product-grid">
          {productCards.map((item) => (
            <article className="home-product-card card" key={item.title}>
              <figure className="home-product-media">
                <img src={item.image} alt={item.alt} loading="lazy" />
              </figure>
              <div className="home-product-body">
                <p className="eyebrow">{item.eyebrow}</p>
                <h3>{item.title}</h3>
                <ul>
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <a className="compact-card-link" href={item.href} aria-label={`${item.label}: ${item.title}`}>
                  {item.label} <ArrowRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeTrustSection() {
  return (
    <section className="section band home-trust-section">
      <div className="section-container home-trust-panel">
        <div>
          <p className="eyebrow">Confianza técnica verificable</p>
          <h2>Experiencia aplicada, sin testimonios ni logos inventados</h2>
          <p>
            La confianza se apoya en trabajos documentados, criterios de diagnóstico y experiencia
            con sistemas industriales reales.
          </p>
        </div>
        <div className="home-trust-list">
          {homeTrustProofs.map((item) => (
            <CheckItem key={item}>{item}</CheckItem>
          ))}
          <SecondaryLink href="#/obras">Ver obras reales</SecondaryLink>
        </div>
      </div>
    </section>
  );
}

function HomeDifferentialSection() {
  return (
    <section className="section band home-differential">
      <div className="section-container split-section">
        <div className="home-differential-copy">
          <p className="eyebrow">Experiencia aplicada en planta</p>
          <h2>Diagnóstico y soporte técnico sobre sistemas reales de producción</h2>
          <p>
            BOJ Automatización y Control trabaja sobre sistemas reales de producción, con foco
            en diagnóstico de PLC Siemens, redes industriales, HMI, variadores, instrumentación,
            migraciones y soporte técnico para mantenimiento.
          </p>
          <p className="home-authority-statement">
            El enfoque no se limita a programar. Se orienta a interpretar síntomas, confirmar
            evidencia y tomar decisiones técnicas bajo presión operativa.
          </p>
          <div className="home-differential-proof">
            <span>PLC Siemens</span>
            <span>Redes industriales</span>
            <span>Mantenimiento industrial</span>
            <span>Diagnóstico con evidencia</span>
          </div>
        </div>
        <aside className="home-audience-panel">
          <p className="eyebrow">Para quién trabajamos</p>
          <h3>Entornos industriales con sistemas de control en servicio</h3>
          <p>
            BOJ está orientado a entornos industriales donde los sistemas de control deben
            mantenerse operativos, documentados y diagnosticables.
          </p>
          <div className="home-audience-list">
            {homeAudience.map((item) => (
              <CheckItem key={item}>{item}</CheckItem>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

function WorkModesSection() {
  return (
    <section className="section work-modes-section">
      <div className="section-container work-modes-layout">
        <div>
          <p className="eyebrow">Modalidades de trabajo</p>
          <h2>Soporte adaptable a la criticidad de planta y al equipo técnico interno</h2>
          <p>
            El soporte puede adaptarse al tipo de problema, criticidad de la planta y
            disponibilidad del equipo técnico interno.
          </p>
          <p className="work-modes-scope">
            Servicios presenciales y soporte técnico para industrias en Argentina. Capacitación
            digital, recursos técnicos y app de diagnóstico disponibles para técnicos
            hispanohablantes.
          </p>
        </div>
        <div className="work-modes-grid">
          {workModes.map((item) => (
            <CheckItem key={item}>{item}</CheckItem>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCourseSection() {
  return (
    <section className="section featured-course">
      <div className="section-container featured-course-layout">
        <div className="featured-course-copy">
          <p className="eyebrow">Curso destacado</p>
          <h2>{s7Course.title}</h2>
          <p>
            Formación técnica orientada a personal de mantenimiento industrial que necesita
            interpretar fallas reales, leer estados de CPU, analizar módulos, redes
            PROFIBUS/PROFINET y utilizar herramientas de STEP 7 Classic para diagnosticar con
            método.
          </p>
          <p className="course-positioning-note">
            No es un curso inicial de programación. Es una formación técnica orientada a
            interpretar sistemas existentes, diagnosticar fallas y tomar decisiones en contexto
            real de planta.
          </p>
          <div className="highlight-list">
            {featuredCourseBullets.map((item) => (
              <CheckItem key={item}>{item}</CheckItem>
            ))}
          </div>
          <div className="button-row">
            <PrimaryLink href="#/cursos/s7-300-400">
              Ver curso <ArrowRight size={18} />
            </PrimaryLink>
            <SecondaryLink href={whatsappUrl("Hola, necesito consultar disponibilidad del curso de diagnóstico de fallas PLC Siemens S7-300/400 con STEP 7 Classic.")}>
              Consultar disponibilidad
            </SecondaryLink>
            <GhostLink href={whatsappUrl("Hola, necesito solicitar capacitación in-company en diagnóstico de fallas PLC Siemens S7-300/400 con STEP 7 Classic.")}>
              Consultar capacitación in-company
            </GhostLink>
          </div>
        </div>
        <div className="featured-course-visual">
          <CourseVisual type="s7" />
        </div>
      </div>
    </section>
  );
}

function FeaturedAppSection() {
  return (
    <section className="section band featured-app">
      <div className="section-container app-feature-layout">
        <div className="app-feature-copy">
          <p className="eyebrow">Producto técnico digital</p>
          <h2>{appHero.title}</h2>
          <p className="section-lead">{appHero.subtitle}.</p>
          <p>
            La app permite ingresar síntomas, estados de CPU, condiciones de red y observaciones
            de campo para obtener hipótesis probables, criterios de verificación y una secuencia
            de análisis más ordenada.
          </p>
          <p>
            Diseñada para técnicos que necesitan ordenar síntomas, estados de CPU, fallas de red
            y observaciones de campo antes de intervenir el sistema.
          </p>
          <div className="highlight-list app-highlight-list">
            {featuredAppBullets.map((item) => (
              <CheckItem key={item}>{item}</CheckItem>
            ))}
          </div>
          <div className="app-module-strip" aria-label="Módulos técnicos destacados de BOJ S7-PLC">
            {appDiagnosticModules.slice(0, 4).map((module) => (
              <span key={module.title}>{module.title}</span>
            ))}
          </div>
          <p className="technical-disclaimer app-home-note">
            La app asiste el diagnóstico técnico. No reemplaza la verificación en campo, la
            documentación oficial del fabricante ni el criterio profesional del personal
            autorizado.
          </p>
          <div className="button-row">
            <PrimaryLink href="#/app">Conocer la app</PrimaryLink>
            <SecondaryLink href={whatsappUrl("Hola, quiero solicitar acceso Trial a BOJ S7-PLC.")}>
              Solicitar acceso Trial
            </SecondaryLink>
          </div>
        </div>
        <AppMockup />
      </div>
    </section>
  );
}

function MethodSection() {
  return (
    <section className="section method-section">
      <div className="section-container">
        <SectionHeader
          eyebrow="MÉTODO DE DIAGNÓSTICO"
          title="Método de diagnóstico aplicado a fallas reales de planta"
          text="Cada intervención se aborda con una secuencia técnica: observar el síntoma, confirmar evidencia, aislar la causa probable y definir una acción segura antes de modificar el sistema."
        />
        <div className="method-grid">
          {homeMethodSteps.map((step) => (
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
        <h2>¿Necesita resolver una falla, mejorar un sistema o capacitar a su equipo?</h2>
        <p>
          BOJ Automatización y Control brinda soporte técnico, capacitación y herramientas
          aplicadas para sistemas industriales basados en PLC Siemens.
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
  return (
    <footer className="site-footer">
      <div className="section-container footer-grid">
        <div>
          <div className="footer-brand">
            <BrandLogo compact />
          </div>
          <p>
            Diagnóstico, automatización, capacitación y herramientas digitales para sistemas PLC
            Siemens en entornos industriales.
          </p>
        </div>
        <div>
          <h3>Contacto</h3>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={whatsappUrl()}>{contact.whatsappDisplay}</a>
          <a href={contact.linktree} target="_blank" rel="noreferrer">Linktree BOJ</a>
          <a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <span>{contact.location}</span>
        </div>
        <div>
          <h3>Navegación</h3>
          <a href="#/servicios">Servicios</a>
          <a href="#/cursos">Cursos</a>
          <a href="#/app">App BOJ S7-PLC</a>
          <a href="#/obras">Obras reales</a>
          <a href="#/recursos-tecnicos">Recursos técnicos</a>
          <a href="#/contacto">Contacto</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>BOJ Automatización y Control</span>
        <span>PLC Siemens, diagnóstico industrial, formación técnica y app BOJ.</span>
      </div>
    </footer>
  );
}

function FloatingContact() {
  const href = whatsappUrl("Hola, necesito consultar por diagnóstico, automatización o capacitación industrial.");

  return (
    <>
      <a
        className="floating-contact"
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label="Consultar por WhatsApp sobre diagnóstico, automatización o capacitación industrial"
      >
        <Phone size={22} />
        <span>WhatsApp</span>
      </a>
      <a
        className="mobile-whatsapp-contact"
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label="Consultar por WhatsApp sobre diagnóstico, automatización o capacitación industrial"
      >
        <Phone size={19} />
        <span>WhatsApp</span>
      </a>
    </>
  );
}

export default App;
