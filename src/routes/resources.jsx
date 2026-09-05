import { ArrowRight, ExternalLink } from "lucide-react";
import { technicalResources } from "../content.js";
import { diagnosticGuides } from "./diagnostic-guides.js";
import heroRecursos from "../assets/hero-recursos.jpg";
import appEstadoCpuDesktop from "../assets/app-estado-cpu-desktop-v8-4-15.jpg";
import appSeleccionSintoma from "../assets/app-seleccion-sintoma-v8-17-24.jpg";
import step7ManagerVisual from "../assets/11.png";
import step7HwConfigVisual from "../assets/12.png";
import step7LadderVisual from "../assets/13.png";
import tiaPortalResourceVisual from "../assets/TIA_Portal_1.png";
import microWinResourceVisual from "../assets/MicroWin-1.png";
import logoSoftComfortResourceVisual from "../assets/Logo comfort - 1.jpg";
import winccResourceVisual from "../assets/WinCC-1.jfif";
import { M2Picture, m2ImageSpecs, registerM2Images, whatsappUrl } from "../app/shared-eager.jsx";
import { CheckItem, Icon, NotFound, PageShell, PrimaryLink, RouteCTA } from "./shared.jsx";

// La captura de estado de CPU reutiliza las variantes AVIF/WebP generadas para Inicio.
registerM2Images(import.meta.glob("../assets/m2/app-estado-cpu-desktop-*.{avif,webp}", { eager: true, import: "default" }));
m2ImageSpecs.set(appEstadoCpuDesktop, {
  stem: "app-estado-cpu-desktop",
  width: 1672,
  height: 941,
  widths: [640, 960, 1672],
  formats: ["avif", "webp"],
  sizes: "(max-width: 760px) 100vw, 760px",
});

const allResources = [...diagnosticGuides, ...technicalResources];

const resourceVisuals = {
  cpuStop: [appEstadoCpuDesktop],
  bfProfibus: [appSeleccionSintoma],
  sfRun: [appEstadoCpuDesktop],
  simaticManager: [step7HwConfigVisual, step7ManagerVisual, step7LadderVisual],
  tiaPortal: [tiaPortalResourceVisual],
  microWin: [microWinResourceVisual],
  logoSoftComfort: [logoSoftComfortResourceVisual],
  wincc: [winccResourceVisual],
};

const resourceVisualDimensions = new Map([
  [appEstadoCpuDesktop, { width: 1672, height: 941 }],
  [appSeleccionSintoma, { width: 1000, height: 455 }],
  [step7HwConfigVisual, { width: 1024, height: 533 }],
  [step7ManagerVisual, { width: 1024, height: 572 }],
  [step7LadderVisual, { width: 1024, height: 612 }],
  [tiaPortalResourceVisual, { width: 710, height: 480 }],
  [microWinResourceVisual, { width: 1249, height: 729 }],
  [logoSoftComfortResourceVisual, { width: 660, height: 285 }],
  [winccResourceVisual, { width: 1680, height: 1050 }],
]);

function getResourceVisualDimensions(image) {
  return resourceVisualDimensions.get(image);
}

function TechnicalResourcesPage() {
  return (
    <PageShell
      eyebrow="Recursos técnicos"
      title="Biblioteca técnica Siemens para automatización industrial"
      subtitle="Guías de diagnóstico de fallas para S7-300/400 y recursos aplicados sobre STEP 7 SIMATIC Manager, TIA Portal, MicroWIN, LOGO! Soft Comfort y SIMATIC WinCC."
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
          eyebrow="Guías de diagnóstico"
          title="Del síntoma a la verificación, paso a paso"
          text="Tres guías escritas con la misma lógica que usamos en planta: qué estás viendo, qué registrar antes de tocar, causas en orden y cómo verificarlas."
        />
        <div className="resources-index-grid">
          {diagnosticGuides.map((resource) => (
            <TechnicalResourceCard key={resource.id} resource={resource} />
          ))}
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
  const dimensions = getResourceVisualDimensions(visual);

  return (
    <article className="technical-resource-card">
      <div className="resource-card-visual">
        {visual ? (
          <img src={visual} alt="" aria-hidden="true" width={dimensions.width} height={dimensions.height} loading="lazy" decoding="async" />
        ) : (
          <div className="resource-card-fallback" aria-hidden="true">
            <Icon name="MonitorCog" />
            <span>Visual técnico editable</span>
          </div>
        )}
        {resource.visualLabel ? (
          <span className="visual-disclaimer">{resource.visualLabel}</span>
        ) : (
          <span className="visual-disclaimer">Imagen ilustrativa</span>
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
  const resource = allResources.find((item) => item.path === route);
  if (!resource) return <NotFound />;
  const isGuide = resource.kind === "guide";

  return (
    <PageShell eyebrow={isGuide ? "Guía de diagnóstico" : "Recurso técnico"} title={resource.title} subtitle={resource.subtitle}>
      <article className="technical-article resource-article">
        <div className="article-kicker">
          <span>{resource.status}</span>
          <span>{isGuide ? "Orientación técnica: verifica siempre en campo" : "Aplicado a mantenimiento industrial"}</span>
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
            <h2>{section.title}</h2>
            <p>{section.text}</p>
            {section.items ? (
              <ul className="article-list">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            {section.steps ? (
              <ol className="article-list article-steps">
                {section.steps.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            ) : null}
            {section.note ? (
              <div className="diagnostic-checklist">
                <h3>{section.note.title}</h3>
                {section.note.items.map((item) => (
                  <CheckItem key={item}>{item}</CheckItem>
                ))}
              </div>
            ) : null}
          </section>
        ))}

        <OfficialLinksBlock links={resource.officialLinks} />
        {isGuide ? <DiagnosticCTA /> : <CourseCTA />}
      </article>
    </PageShell>
  );
}

function TechnicalResourceVisual({ resource }) {
  const visuals = resourceVisuals[resource.visualKey] || [];
  const mainDimensions = getResourceVisualDimensions(visuals[0]);

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
        <M2Picture
          src={visuals[0]}
          alt={resource.visualAlt || `${resource.title} aplicado a automatización industrial`}
          width={mainDimensions.width}
          height={mainDimensions.height}
          sizes="(max-width: 760px) 100vw, 760px"
          loading="lazy"
          decoding="async"
        />
      </div>
      {visuals.length > 1 ? (
        <div className="resource-secondary-grid">
          {visuals.slice(1).map((image, index) => {
            const dimensions = getResourceVisualDimensions(image);
            return (
              <img
                key={image}
                src={image}
                alt={`${resource.title} captura técnica ${index + 2}`}
                width={dimensions.width}
                height={dimensions.height}
                loading="lazy"
                decoding="async"
              />
            );
          })}
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
        <h2>Documentación, soporte técnico y referencias del fabricante</h2>
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

function DiagnosticCTA() {
  return (
    <RouteCTA
      title="¿La falla sigue ahí?"
      text="Cuéntanos el síntoma, el equipo y lo que ya verificaste. Con esa base ordenamos alcance, riesgo y próximo paso técnico. La app BOJ S7-PLC recorre esta misma secuencia frente al tablero."
      primaryLabel="Consultar por WhatsApp"
      primaryHref={whatsappUrl("Hola, leí una guía de diagnóstico en la web de BOJ y necesito ayuda con una falla en un PLC Siemens.")}
      secondaryLabel="Probar BOJ S7-PLC"
      secondaryHref="/app"
    />
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

function SectionHeader({ eyebrow, title, text }) {
  return (
    <div className="section-header">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

function ResourcesRoutes({ route }) {
  if (route === "/recursos-tecnicos") return <TechnicalResourcesPage />;
  return <TechnicalArticlePage route={route} />;
}

export default ResourcesRoutes;
