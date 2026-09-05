import {
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
} from "lucide-react";
import { offer, s7ProofClients, s7Testimonials } from "../content.js";
import heroRecursos from "../assets/hero-recursos.jpg";
import plcCabinetVisual from "../assets/old-site/07-0852e6d5.jpg";
import panelDiagnosticVisual from "../assets/old-site/panel-diagnostic-optimized.jpg";
import step7Visual from "../assets/old-site/25-58d80e46.jpg";
import engineeringVisual from "../assets/old-site/29-255f90e7.jpg";
import plantVisual from "../assets/old-site/35-47edf350.jpg";
import aerialPlantVisual from "../assets/old-site/43-00658318.jpg";
import { M2Picture } from "../app/shared-eager.jsx";

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

const projectVisuals = [
  plantVisual,
  plcCabinetVisual,
  panelDiagnosticVisual,
  aerialPlantVisual,
  engineeringVisual,
  step7Visual,
];

const appProductUrl = offer.app.productUrl;

const appProPlans = offer.app.proPlans;

const appLicensePlans = appProPlans.filter(({ title }) => title !== "Curso + licencia");

function Icon({ name, size = 22, className = "" }) {
  const Component = icons[name] || Wrench;
  return <Component size={size} className={className} aria-hidden="true" />;
}

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

function HeroAction({ action, variant }) {
  if (!action) return null;
  const extra = action.external ? { target: "_blank", rel: "noreferrer" } : {};
  return (
    <a className={`mock-btn ${variant}`} href={action.href} onClick={action.onClick} {...extra}>
      {action.label} <ArrowRight size={18} />
    </a>
  );
}

function HeroTitle({ title }) {
  if (typeof title !== "string" || !title.includes("S7-300/400")) return title;
  const [before, ...after] = title.split("S7-300/400");
  return <>{before}<span className="nowrap-technical-token">S7-300/400</span>{after.join("S7-300/400")}</>;
}

function Hero({ image, eyebrow, title, subtitle, primary, secondary, note, aside }) {
  const content = (
    <>
      {eyebrow ? <p className="boj-hero-eyebrow">{eyebrow}</p> : null}
      <h1 className="boj-hero-title"><HeroTitle title={title} /></h1>
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
      {image ? (
        <M2Picture
          className="boj-hero-bg"
          src={image}
          alt=""
          aria-hidden="true"
          loading="eager"
          fetchPriority="high"
        />
      ) : null}
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

const s7ProofCopy = {
  es: { label: "Un método nacido en planta, no en un aula. Trabajos reales para:", link: "Ver obras reales", href: "/obras" },
  en: { label: "A method built in industrial plants, not only in a classroom. Real work for:", link: "View completed projects", href: "/en/projects" },
  pt: { label: "Um método desenvolvido em planta, não apenas em sala de aula. Trabalhos reais para:", link: "Ver projetos realizados", href: "/pt/projetos" },
};

function S7ProofStrip({ language = "es" }) {
  const copy = s7ProofCopy[language] || s7ProofCopy.es;
  return (
    <section className="s7-proof">
      <div className="s7-sales-container s7-proof-inner">
        <p className="s7-proof-label">
          <Factory size={17} aria-hidden="true" />
          {copy.label}
        </p>
        <ul className="s7-proof-list">
          {s7ProofClients.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
        <a className="s7-proof-link" href={copy.href}>
          {copy.link} <ArrowRight size={15} />
        </a>
      </div>
    </section>
  );
}

const s7TestimonialsCopy = {
  es: { kicker: "Lo que dicen los técnicos", title: "Resultados reales en planta, no promesas." },
  en: { kicker: "What technicians say", title: "Real plant experience, not empty promises.", source: "Original testimonial in Spanish" },
  pt: { kicker: "O que dizem os técnicos", title: "Experiência real em planta, não promessas vazias.", source: "Depoimento original em espanhol" },
};

function S7Testimonials({ background = "light", language = "es", limit }) {
  const copy = s7TestimonialsCopy[language] || s7TestimonialsCopy.es;
  const items = limit ? s7Testimonials.slice(0, limit) : s7Testimonials;
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
          <p className="s7-sales-kicker">{copy.kicker}</p>
          <h2>{copy.title}</h2>
        </div>
        <div className="s7-testimonials-grid">
          {items.map((item) => (
            <figure className="s7-testimonial-card" key={item.name}>
              <span className="s7-testimonial-mark" aria-hidden="true">“</span>
              <blockquote>{item.quote}</blockquote>
              {copy.source ? <small className="s7-testimonial-language-note">{copy.source}</small> : null}
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

export { CheckItem, Hero, HeroAction, HeroTitle, Icon, NotFound, PageShell, PrimaryLink, RouteCTA, S7ProofStrip, S7Testimonials, SecondaryLink, appLicensePlans, appProPlans, appProductUrl, icons, projectVisuals, s7ProofCopy, s7TestimonialsCopy };
