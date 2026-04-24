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
  appDifferentials,
  appFeatures,
  appFunctions,
  appSections,
  appVersions,
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
import gearSoft from "./assets/ChatGPT Image 16 sept 2025, 10_54_17 p.m..png";

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

const routeMeta = {
  "/inicio": {
    title: "BOJ Automatización y Control | PLC Siemens y diagnóstico industrial",
    description:
      "Automatización industrial, PLC Siemens, diagnóstico de fallas, PROFIBUS, TIA Portal, cursos técnicos y app para mantenimiento industrial.",
  },
  "/servicios": {
    title: "Servicios de automatización industrial | BOJ",
    description:
      "Servicios técnicos para PLC Siemens, diagnóstico de fallas, redes PROFIBUS/PROFINET, migraciones, instrumentación, tableros y mantenimiento industrial.",
  },
  "/cursos": {
    title: "Cursos técnicos PLC Siemens y TIA Portal | BOJ",
    description:
      "Cursos técnicos aplicados de diagnóstico en PLC Siemens S7-300/400, STEP 7 Classic y TIA Portal para mantenimiento industrial.",
  },
  "/cursos/s7-300-400": {
    title: "Curso diagnóstico PLC Siemens S7-300/400 | BOJ",
    description:
      "Curso aplicado para diagnosticar fallas reales en PLC Siemens S7-300/400 con STEP 7 Classic, Diagnostic Buffer, PROFIBUS y señales de campo.",
  },
  "/cursos/tia-portal": {
    title: "Curso TIA Portal S7-1200/1500 | BOJ",
    description:
      "Curso introductorio de TIA Portal para PLC Siemens S7-1200/1500: hardware, variables, LAD, carga, monitoreo online y diagnóstico básico.",
  },
  "/app": {
    title: "App de diagnóstico industrial BOJ | PLC Siemens",
    description:
      "App profesional para ordenar diagnóstico de fallas en campo: estados de CPU, LEDs, PROFIBUS/PROFINET, señales y pasos de revisión.",
  },
  "/obras": {
    title: "Obras y trabajos realizados | BOJ Automatización",
    description:
      "Casos técnicos de automatización industrial, diagnóstico PLC Siemens, PROFIBUS, tableros, HMI, instrumentación y puesta en marcha.",
  },
  "/contacto": {
    title: "Contacto técnico | BOJ Automatización y Control",
    description:
      "Contacto directo para automatización industrial, diagnóstico de fallas, cursos PLC Siemens, TIA Portal, PROFIBUS y mantenimiento industrial.",
  },
};

function getRoute() {
  return window.location.hash.replace("#", "") || "/inicio";
}

function whatsappUrl(message = "Hola Walter, quiero consultar por BOJ Automatización y Control.") {
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
        <span>
          <strong>BOJ</strong>
          <small>Automatización y Control</small>
        </span>
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
        href={whatsappUrl("Hola Walter, quiero consultar por BOJ Automatización y Control.")}
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
          <p className="eyebrow">PLC Siemens | Diagnóstico de fallas | Capacitación técnica</p>
          <h1>Automatización industrial y diagnóstico técnico para mantenimiento de planta</h1>
          <p className="hero-subtitle">
            Ayudo a técnicos, empresas e ingenierías a resolver fallas en PLC, redes,
            señales y tableros, capacitar equipos de mantenimiento y mejorar sistemas de automatización.
          </p>
          <div className="hero-actions">
            <PrimaryLink href={whatsappUrl("Hola Walter, necesito una consulta técnica por automatización o diagnóstico industrial.")}>
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
          </div>
          <div className="hero-proof-grid" aria-label="Señales de experiencia técnica">
            <span>Diagnóstico online y medición en campo</span>
            <span>Capacitación con fallas reales de planta</span>
            <span>App técnica para ordenar decisiones</span>
          </div>
        </div>
      </section>

      <TrustBar />
      <AuthoritySection />

      <section className="section">
        <div className="section-container">
          <SectionHeader
            eyebrow="Áreas principales"
            title="Soporte técnico para equipos que necesitan resolver, documentar y sostener la operación"
            text="BOJ trabaja sobre problemas concretos de planta: líneas detenidas, diagnósticos incompletos, redes inestables, tableros sin trazabilidad y personal que necesita criterio práctico para actuar con seguridad."
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
            <h2>Un asistente técnico para ordenar la búsqueda de fallas en campo</h2>
            <p>
              La app de diagnóstico BOJ acompaña al técnico en campo para analizar síntomas,
              estados de CPU, LEDs, red PROFIBUS/PROFINET, señales y posibles causas de falla.
            </p>
            <div className="button-row">
              <PrimaryLink href="#/app">Conocer la app</PrimaryLink>
              <SecondaryLink href={whatsappUrl("Hola Walter, quiero consultar por la app de diagnóstico BOJ.")}>
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
      title="Servicios de automatización, diagnóstico y soporte técnico industrial"
      subtitle="Intervenciones orientadas a resolver problemas de planta, mejorar la mantenibilidad y acompañar decisiones técnicas con criterio de campo."
    >
      <ServicePrinciples />
      <div className="services-list">
        {services.map((service) => (
          <ServiceDetailCard key={service.title} service={service} />
        ))}
      </div>
      <RouteCTA
        title="¿Tenés una falla detenida o una mejora técnica pendiente?"
        text="Podés enviar el síntoma, fotos del tablero o una breve descripción del sistema. La consulta inicial ayuda a ordenar el alcance antes de intervenir."
        primaryLabel="Consultar por WhatsApp"
        primaryHref={whatsappUrl("Hola Walter, necesito consultar por un servicio técnico industrial.")}
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
      title="Cursos técnicos de automatización industrial"
      subtitle="Formación aplicada para técnicos, ingenieros, instrumentistas y personal de mantenimiento que necesitan comprender, diagnosticar y resolver problemas reales en sistemas automatizados."
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
          Los cursos están pensados para que el alumno entienda qué está viendo en el PLC,
          qué significa cada síntoma y cómo avanzar sin depender únicamente de prueba y error.
        </p>
      </div>
      <RouteCTA
        title="Capacitación para personas que tienen que actuar frente a equipos reales"
        text="Si necesitás formar a tu equipo, adaptar contenidos a una planta o consultar modalidad in-company, BOJ puede orientar el curso al nivel técnico del grupo."
        primaryLabel="Consultar capacitación"
        primaryHref={whatsappUrl("Hola Walter, quiero consultar por cursos o capacitación in-company BOJ.")}
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
        { label: "Comprar o consultar acceso", href: whatsappUrl("Hola Walter, quiero comprar o consultar acceso al curso de diagnóstico S7-300/400.") },
        { label: "Consultar disponibilidad", href: mailtoUrl("Consulta curso S7-300/400", "Hola Walter, quiero consultar disponibilidad del curso de diagnóstico S7-300/400.") },
        { label: "Hablar por WhatsApp", href: whatsappUrl("Hola Walter, quiero hablar por WhatsApp sobre el curso S7-300/400.") },
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
        { label: "Comprar o consultar curso", href: whatsappUrl("Hola Walter, quiero comprar o consultar el curso de TIA Portal con PLC S7-1200/1500.") },
        { label: "Consultar por el curso", href: mailtoUrl("Consulta curso TIA Portal", "Hola Walter, quiero consultar por el curso de Introducción a TIA Portal.") },
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
          <InfoBlock title="Público objetivo" items={course.audience} />
          {course.includes ? <InfoBlock title="Qué incluye" items={course.includes} /> : null}
          <InfoBlock title="Esto es lo que vas a poder hacer después del curso" items={course.outcomes} />
          <InfoBlock title={course.includes ? "Módulos sugeridos" : "Contenido sugerido"} items={course.modules} numbered />
          <InfoBlock title="Beneficios" items={course.benefits} />
          <InfoBlock title="Errores comunes que el curso ayuda a evitar" items={course.avoidMistakes} />
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
  return (
    <PageShell
      eyebrow="App"
      title="App de diagnóstico industrial BOJ"
      subtitle="Una herramienta profesional para ordenar el diagnóstico en campo cuando hay presión de planta, fallas en PLC Siemens, síntomas de red o señales dudosas."
    >
      <div className="app-page-grid">
        <div>
          <h2>Qué hace</h2>
          <div className="check-grid compact">
            {appFeatures.map((item) => (
              <CheckItem key={item}>{item}</CheckItem>
            ))}
          </div>
        </div>
        <AppMockup />
      </div>

      <div className="card-grid three">
        {appSections.map((section) => (
          <article className="info-card" key={section.title}>
            <Icon name={section.icon} />
            <h3>{section.title}</h3>
            <p>{section.text}</p>
          </article>
        ))}
      </div>

      <section className="inner-section">
        <SectionHeader
          eyebrow="Funciones principales"
          title="Diagnóstico guiado para no saltar pasos críticos"
          text="La app no reemplaza el criterio técnico: lo ordena. Ayuda a registrar síntomas, cruzar estados y revisar puntos que suelen definir la causa real."
        />
        <div className="function-grid">
          {appFunctions.map((item) => (
            <CheckItem key={item}>{item}</CheckItem>
          ))}
        </div>
      </section>

      <AppWorkflow />

      <section className="inner-section">
        <SectionHeader
          eyebrow="Diferencial BOJ"
          title="Por qué esta app es diferente"
          text="No está pensada como una lista genérica de fallas. Está orientada a ordenar el razonamiento técnico cuando hay presión de planta."
        />
        <div className="card-grid three">
          {appDifferentials.map((item) => (
            <article className="info-card" key={item.title}>
              <Icon name="ShieldCheck" />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="inner-section">
        <SectionHeader
          eyebrow="Versiones"
          title="Uso para formación y para diagnóstico avanzado"
        />
        <div className="card-grid two">
          {appVersions.map((version) => (
            <article className="version-card" key={version.name}>
              <h3>{version.name}</h3>
              <p>{version.description}</p>
            </article>
          ))}
        </div>
      </section>

      <RouteCTA
        title="La app funciona como extensión práctica del curso de diagnóstico"
        text="El curso enseña el método; la app ayuda a llevarlo al campo para registrar síntomas, revisar pasos y evitar decisiones apresuradas."
        primaryLabel="Consultar acceso a la app"
        primaryHref={whatsappUrl("Hola Walter, quiero consultar acceso a la app de diagnóstico BOJ.")}
        secondaryLabel="Ver curso S7-300/400"
        secondaryHref="#/cursos/s7-300-400"
      />

      <div className="button-row">
        <PrimaryLink href={whatsappUrl("Hola Walter, quiero ver la app de diagnóstico BOJ.")}>Ver app</PrimaryLink>
        <SecondaryLink href={whatsappUrl("Hola Walter, quiero consultar por la versión Pro de la app BOJ.")}>
          Consultar versión Pro
        </SecondaryLink>
        <GhostLink href="#/cursos/s7-300-400">Acceder desde el curso</GhostLink>
      </div>
    </PageShell>
  );
}

function WorksPage() {
  return (
    <PageShell
      eyebrow="Obras"
      title="Obras y trabajos realizados"
      subtitle="Experiencia aplicada en automatización, diagnóstico, programación PLC, redes industriales, tableros, instrumentación y puesta en marcha."
    >
      <PortfolioPrep />
      <div className="works-grid">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index + 1} />
        ))}
      </div>
      <RouteCTA
        title="Cada obra puede documentarse con fotos, capturas y resultado técnico"
        text="La estructura queda preparada para agregar evidencia visual real: tablero, PLC, HMI, red, pantalla online, logo del cliente y resultado de la intervención."
        primaryLabel="Consultar por una obra similar"
        primaryHref={whatsappUrl("Hola Walter, quiero consultar por una obra o intervención industrial similar.")}
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
      title="Contacto"
      subtitle="Si necesitás asistencia técnica, capacitación, diagnóstico de fallas, automatización o información sobre los cursos, podés comunicarte directamente."
    >
      <section className="contact-direct">
        <div>
          <p className="eyebrow">Atención directa técnica</p>
          <h2>Respondemos rápido y hablamos en lenguaje de planta</h2>
          <p>
            Podés escribir con el síntoma, el PLC involucrado, una foto del tablero o la consulta
            del curso. La primera respuesta busca ordenar el próximo paso técnico.
          </p>
        </div>
        <PrimaryLink href={whatsappUrl("Hola Walter, necesito atención técnica directa por BOJ Automatización y Control.")}>
          <Phone size={18} /> Escribir por WhatsApp
        </PrimaryLink>
      </section>
      <div className="contact-grid">
        <div className="contact-panel">
          <h2>BOJ Automatización y Control</h2>
          <ContactLine icon="Wrench" label="Responsable" value={contact.responsible} />
          <ContactLine icon="MapPin" label="Ubicación" value={contact.location} />
          <ContactLine icon="Mail" label="Email" value={contact.email} href={`mailto:${contact.email}`} />
          <ContactLine icon="Phone" label="WhatsApp" value={contact.whatsappDisplay} href={whatsappUrl()} />
          <div className="social-placeholders">
            {/* Reemplazar # por enlaces reales cuando estén definidos. */}
            <a href={contact.instagram}>Instagram / redes</a>
            <a href={contact.linkedin}>LinkedIn</a>
          </div>
          <div className="diagnostic-checklist">
            <h3>Para acelerar una consulta técnica</h3>
            {contactChecklist.map((item) => (
              <CheckItem key={item}>{item}</CheckItem>
            ))}
          </div>
          <div className="button-row">
            <PrimaryLink href={whatsappUrl("Hola Walter, quiero realizar una consulta técnica.")}>
              Contactar por WhatsApp
            </PrimaryLink>
            <SecondaryLink href={`mailto:${contact.email}`}>Enviar email</SecondaryLink>
          </div>
        </div>

        <ContactForm />
      </div>

      <section className="inner-section">
        <h2>También podés consultar por:</h2>
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
          placeholder="Contame qué falla presenta el equipo, qué PLC o red tenés, o qué capacitación necesitás."
          required
        />
      </label>
      <div className="button-row">
        <button className="btn primary" type="submit">
          Enviar consulta
          <ArrowRight size={18} />
        </button>
        <a className="btn secondary" href={whatsappUrl("Hola Walter, quiero hacer una consulta desde la web.")}>
          Contactar por WhatsApp
        </a>
      </div>
    </form>
  );
}

function PageShell({ eyebrow, title, subtitle, children }) {
  return (
    <>
      <section className="page-hero">
        <div className="section-container">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          {subtitle ? <p>{subtitle}</p> : null}
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
          <img src={gearSoft} alt="Identidad técnica BOJ con engranaje y circuitos" loading="lazy" />
        </figure>
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
      <img src={gearSoft} alt="" loading="lazy" />
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
        <h2>Servicios pensados para planta, parada, mantenimiento y continuidad</h2>
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
              <h3>Problema que resuelve</h3>
              <p>{service.problem}</p>
            </div>
            <div>
              <h3>Impacto en planta</h3>
              <p>{service.impact}</p>
            </div>
            <div>
              <h3>Enfoque práctico</h3>
              <p>{service.approach}</p>
            </div>
          </div>
        </div>
        <div className="benefit-box">
          <h3>Beneficio para la empresa</h3>
          <p>{service.benefit}</p>
          <a
            className="btn secondary"
            href={whatsappUrl(`Hola Walter, quiero consultar por el servicio: ${service.title}.`)}
          >
            Consultar por este servicio
          </a>
        </div>
      </div>
    </article>
  );
}

function CourseCard({ course, expanded = false }) {
  return (
    <article className="course-card">
      <div className="course-visual-block" aria-hidden="true">
        <Icon name={course.icon} size={34} />
        <span>{course.shortTitle}</span>
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
            <dt>Qué aprenderá el alumno</dt>
            <dd>{course.learn}</dd>
          </div>
        </dl>
        <PrimaryLink href={`#${course.path}`}>
          Ver curso <ArrowRight size={18} />
        </PrimaryLink>
        {expanded ? (
          <div className="course-outcomes">
            <h4>Después del curso vas a poder:</h4>
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
  return (
    <article className="project-card">
      <div className="project-media">
        {/* Reemplazar por foto real de obra cuando esté disponible. */}
        <img className="project-media-mark" src={gearSoft} alt="" loading="lazy" />
        <span>OBRA {String(index).padStart(2, "0")}</span>
        <div className="project-lines" />
      </div>
      <div className="project-body">
        <div className="project-title-row">
          <h2>{project.title}</h2>
          {/* Reemplazar por logo del cliente si corresponde. */}
          <span className="client-logo-placeholder">Logo cliente</span>
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
        <p className="eyebrow">Portfolio técnico editable</p>
        <h2>Preparado para evidenciar experiencia real sin perder confidencialidad</h2>
        <p>
          Cada caso conserva el enfoque técnico: problema, tecnología utilizada, criterio de
          diagnóstico y resultado. Los espacios visuales están listos para fotos reales o logos.
        </p>
      </div>
      <div className="asset-slots">
        <span>Foto obra</span>
        <span>Logo cliente</span>
        <span>Captura PLC/HMI</span>
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
    <div className="app-mockup" aria-label="Mockup de app de diagnóstico BOJ">
      {/* Reemplazar este mockup por capturas reales de la app cuando estén listas. */}
      <div className="phone-frame">
        <div className="phone-status">
          <span>BOJ Diagnóstico</span>
          <i />
        </div>
        <div className="diagnostic-screen">
          <strong>PLC Siemens</strong>
          <p>S7-300/400 | CPU en STOP</p>
          <div className="led-row">
            <span className="led green" /> RUN
            <span className="led red" /> STOP
            <span className="led amber" /> SF
            <span className="led blue" /> BF
          </div>
          <div className="screen-card">
            <small>Recomendación</small>
            <p>Revisar Diagnostic Buffer, módulos online y estado de red PROFIBUS.</p>
          </div>
          <div className="screen-card secondary-screen-card">
            <small>Causa probable</small>
            <p>Nodo sin comunicación, módulo con falla o pérdida de alimentación de campo.</p>
          </div>
          <div className="screen-steps">
            <span>1. CPU</span>
            <span>2. Red</span>
            <span>3. Señales</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CourseVisual({ type }) {
  return (
    <aside className={`course-side-visual ${type}`}>
      <div className="side-visual-header">
        <span>{type === "s7" ? "STEP 7 Classic" : "TIA Portal"}</span>
        <Icon name={type === "s7" ? "Cpu" : "MonitorCog"} />
      </div>
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
        <p className="eyebrow">Espacio para clientes y empresas</p>
        <div className="logo-strip">
          {/* Reemplazar estos bloques por logos reales de clientes o empresas. */}
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
        <h2>¿Necesitás resolver una falla, capacitar a tu equipo o mejorar tu sistema de automatización?</h2>
        <p>
          Podés consultar por diagnóstico, automatización, cursos, migraciones, redes industriales,
          tableros o la app de diagnóstico BOJ.
        </p>
        <div className="button-row">
          <PrimaryLink href={whatsappUrl("Hola Walter, necesito resolver una falla o consultar por servicios BOJ.")}>
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
            <span>
              <strong>BOJ Automatización y Control</strong>
              <small>Automatización, diagnóstico y formación técnica industrial.</small>
            </span>
          </div>
          <p>
            Servicios para PLC Siemens, redes industriales, instrumentación, tableros,
            migraciones, capacitación técnica y diagnóstico de fallas.
          </p>
        </div>
        <div>
          <h3>Contacto</h3>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={whatsappUrl()}>{contact.whatsappDisplay}</a>
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
        <span>Web preparada para editar logos, capturas, obras y enlaces reales.</span>
      </div>
    </footer>
  );
}

function FloatingContact() {
  return (
    <div className="floating-contact" aria-label="Contactos rápidos">
      <a href={whatsappUrl("Hola Walter, vengo desde la web BOJ y quiero consultar.")} aria-label="Consultar por WhatsApp">
        <Phone size={20} />
      </a>
      <a href={`mailto:${contact.email}`} aria-label="Enviar email">
        <Mail size={20} />
      </a>
    </div>
  );
}

export default App;
