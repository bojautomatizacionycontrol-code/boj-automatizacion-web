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
  tiaCourse,
  trustSignals,
  whyBoj,
} from "./content.js";
import bojLogo from "./assets/boj-logo-web.png";
import appScreenshot from "./assets/APP.png";
import step7ClassicVisual from "./assets/siemens-software-step7-basic.jpg";
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

const projectVisuals = [
  plantVisual,
  plcCabinetVisual,
  panelDiagnosticVisual,
  aerialPlantVisual,
  engineeringVisual,
  step7Visual,
];

const courseVisuals = {
  s7: step7Visual,
  tia: plcCabinetVisual,
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
        aria-label="Abrir menú"
        aria-expanded={open}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label="Navegación principal">
        {navItems.map((item) => {
          const active = route === item.path || (item.path === "/cursos" && route.startsWith("/cursos"));
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
      <section className="hero">
        <div className="hero-visual" aria-hidden="true">
          <HeroAssetVisual />
          <IndustrialPanel />
        </div>
        <div className="section-container hero-content">
          <p className="eyebrow">Automatización industrial | PLC Siemens | Diagnóstico de fallas</p>
          <h1>Soluciones técnicas para diagnosticar, modernizar y sostener sistemas industriales</h1>
          <p className="hero-subtitle">
            BOJ Automatización y Control brinda soporte especializado para plantas industriales,
            áreas de mantenimiento e ingeniería que necesitan resolver fallas, modernizar
            sistemas PLC/HMI/SCADA y fortalecer equipos técnicos con criterio real de planta.
          </p>
          <p className="hero-positioning">
            Diagnóstico con evidencia. Automatización con método. Puesta en marcha con criterio de planta.
          </p>
          <div className="hero-actions">
            <PrimaryLink href={whatsappUrl("Hola, escribo desde la web de BOJ por una consulta técnica sobre falla de planta, PLC Siemens o automatización industrial.")}>
              <Phone size={18} /> Consultar por WhatsApp
            </PrimaryLink>
            <SecondaryLink href="#/servicios">Ver servicios</SecondaryLink>
            <GhostLink href="#/cursos">Ver cursos</GhostLink>
          </div>
          <div className="hero-metrics" aria-label="Áreas de trabajo">
            <span>S7-300/400</span>
            <span>S7-1200/1500</span>
            <span>PROFIBUS</span>
            <span>PROFINET</span>
            <span>TIA Portal</span>
            <span>Tableros</span>
          </div>
          <div className="hero-proof-grid" aria-label="Señales de experiencia técnica">
            <span>Más de 10 años en automatización, diagnóstico y puesta en marcha</span>
            <span>Trabajo real con PLC Siemens, HMI, SCADA, tableros y redes</span>
            <span>Cursos y app para equipos técnicos que diagnostican bajo presión</span>
          </div>
        </div>
      </section>

      <TrustBar />
      <AuthoritySection />
      <IndustrialScopeSection />

      <section className="section">
        <div className="section-container">
          <SectionHeader
            eyebrow="Áreas principales"
            title="Soporte técnico para resolver fallas, ordenar sistemas y sostener producción"
            text="BOJ trabaja sobre problemas concretos: líneas detenidas, diagnósticos incompletos, redes inestables, tableros sin trazabilidad y equipos que necesitan criterio práctico para intervenir con seguridad."
          />
          <div className="feature-grid">
            {homeHighlights.map((item) => (
              <FeatureCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="section-container split-section">
          <div>
            <p className="eyebrow">Por qué BOJ</p>
            <h2>Un enfoque pensado para mantenimiento industrial real</h2>
            <p>
              La diferencia no está solo en programar un PLC. Está en interpretar síntomas,
              separar una falla de campo de una falla de lógica, leer el estado del hardware y
              decidir el siguiente paso con método.
            </p>
          </div>
          <div className="check-grid">
            {whyBoj.map((item) => (
              <CheckItem key={item}>{item}</CheckItem>
            ))}
          </div>
        </div>
      </section>

      <MethodSection />

      <section className="section">
        <div className="section-container">
          <SectionHeader
            eyebrow="Servicios destacados"
            title="Intervenciones técnicas con foco en continuidad operativa"
            text="Diagnóstico, automatización y mejoras pensadas para reducir incertidumbre técnica y dejar sistemas más claros para el equipo de planta."
          />
          <div className="card-grid three">
            {services.slice(0, 3).map((service) => (
              <ServiceSummaryCard key={service.title} service={service} />
            ))}
          </div>
          <div className="center-action">
            <SecondaryLink href="#/servicios">Ver todos los servicios</SecondaryLink>
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="section-container">
          <SectionHeader
            eyebrow="Cursos técnicos"
            title="Capacitación aplicada para diagnosticar y programar con criterio"
            text="Formación orientada a técnicos, instrumentistas, electricistas e ingenieros que necesitan pasar de la teoría al análisis real de planta."
          />
          <div className="course-grid">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-container app-intro">
          <div>
            <p className="eyebrow">App de diagnóstico</p>
            <h2>Una herramienta técnica para ordenar la búsqueda de fallas en campo</h2>
            <p>
              BOJ S7-PLC asiste a equipos técnicos en el análisis de síntomas, estados de CPU,
              LEDs, red PROFIBUS/PROFINET, señales y posibles causas de falla.
            </p>
            <div className="button-row">
              <PrimaryLink href="#/app">Conocer la app</PrimaryLink>
              <SecondaryLink href={whatsappUrl("Hola, escribo desde la web de BOJ para consultar por BOJ S7-PLC y la versión PRO.")}>
                Consultar versión Pro
              </SecondaryLink>
            </div>
          </div>
          <AppMockup />
        </div>
      </section>

      <ClientLogoBand />

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

function IndustrialPanel() {
  return (
    <div className="industrial-panel">
      <div className="panel-top">
        <span>CPU RUN</span>
        <span>BF/SF</span>
      </div>
      <div className="rack">
        {["PS", "CPU", "DI", "DO", "AI", "NET"].map((module, index) => (
          <div className="module" key={module}>
            <span>{module}</span>
            <i className={index === 1 || index === 5 ? "on" : ""} />
            <i />
            <i className={index === 3 ? "warn" : ""} />
          </div>
        ))}
      </div>
      <div className="signal-trace">
        <span />
        <span />
        <span />
      </div>
      <div className="panel-diagnostics">
        <b>Diagnostic Buffer</b>
        <small>Evento | Nodo | Módulo | Acción sugerida</small>
      </div>
    </div>
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
  const visual = type === "s7" ? step7Visual : plcCabinetVisual;

  return (
    <aside className={`course-side-visual ${type}`}>
      <div className="side-visual-header">
        <span>{type === "s7" ? "STEP 7 Classic" : "TIA Portal"}</span>
        <Icon name={type === "s7" ? "Cpu" : "MonitorCog"} />
      </div>
      <figure className="course-side-photo">
        <img src={visual} alt={type === "s7" ? "Diagnóstico online en STEP 7 Classic" : "PLC Siemens para curso TIA Portal"} loading="lazy" />
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
  return (
    <footer className="site-footer">
      <div className="section-container footer-grid">
        <div>
          <div className="footer-brand">
            <BrandLogo compact />
          </div>
          <p>
            Ingeniería de detalle, automatización, PLC Siemens, redes industriales, tableros,
            migraciones, capacitación técnica, app de diagnóstico y puesta en marcha.
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
          <h3>Servicios</h3>
          <a href="#/servicios">Automatización industrial</a>
          <a href="#/servicios">Diagnóstico de fallas</a>
          <a href="#/servicios">Redes PROFIBUS / PROFINET</a>
          <a href="#/cursos">Cursos técnicos</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>BOJ Automatización y Control</span>
        <span>Automatización industrial, diagnóstico, cursos técnicos y app BOJ.</span>
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
