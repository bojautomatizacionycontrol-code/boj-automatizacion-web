import { ArrowRight, ExternalLink } from "lucide-react";
import { technicalResources } from "./content.js";
import heroRecursos from "./assets/hero-recursos.jpg";
import step7HwConfigVisual from "./assets/12.png";
import step7ManagerVisual from "./assets/11.png";
import step7LadderVisual from "./assets/13.png";
import tiaPortalResourceVisual from "./assets/TIA_Portal_1.png";
import microWinResourceVisual from "./assets/MicroWin-1.png";
import logoSoftComfortResourceVisual from "./assets/Logo comfort - 1.jpg";
import winccResourceVisual from "./assets/WinCC-1.jfif";

const resourceVisuals = {
  simaticManager: [step7HwConfigVisual, step7ManagerVisual, step7LadderVisual],
  tiaPortal: [tiaPortalResourceVisual],
  microWin: [microWinResourceVisual],
  logoSoftComfort: [logoSoftComfortResourceVisual],
  wincc: [winccResourceVisual],
};

export default function TechnicalRoutes({ route, primitives }) {
  if (route === "/recursos-tecnicos") return <TechnicalResourcesPage primitives={primitives} />;
  return <TechnicalArticlePage route={route} primitives={primitives} />;
}

function TechnicalResourcesPage({ primitives }) {
  const { CheckItem, PageShell, SectionHeader, whatsappUrl } = primitives;
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
            <TechnicalResourceCard key={resource.id} resource={resource} primitives={primitives} />
          ))}
        </div>
      </section>

      <CourseCTA primitives={primitives} />
    </PageShell>
  );
}

function TechnicalResourceCard({ resource, primitives }) {
  const { Icon, PrimaryLink } = primitives;
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

function TechnicalArticlePage({ route, primitives }) {
  const { NotFound, PageShell } = primitives;
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

        <TechnicalResourceVisual resource={resource} primitives={primitives} />

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
          </section>
        ))}

        <OfficialLinksBlock links={resource.officialLinks} />
        <CourseCTA primitives={primitives} />
      </article>
    </PageShell>
  );
}

function TechnicalResourceVisual({ resource, primitives }) {
  const { Icon } = primitives;
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

function CourseCTA({ primitives }) {
  const { RouteCTA, whatsappUrl } = primitives;
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
