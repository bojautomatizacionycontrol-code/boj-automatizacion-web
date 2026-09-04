import {
  ArrowRight,
  Mail,
  Phone,
} from "lucide-react";
import { projects } from "../content.js";
import {
  englishHome,
  englishProjects,
  portugueseHome,
  portugueseProjects,
} from "../i18n.js";
import appSeleccionSintoma from "../assets/app-seleccion-sintoma-v8-17-24.jpg";
import appVerificacionGuiada from "../assets/app-verificacion-guiada-v8-17-24.jpg";
import heroInicio from "../assets/hero-inicio.jpg";
import plantVisual from "../assets/old-site/35-47edf350.jpg";
import { whatsappUrl } from "../app/shared-eager.jsx";
import { Hero, Icon, getServiceWorkImage, projectVisuals, projectWorkImageFiles } from "./shared.jsx";

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
        <img src={plantVisual} alt="" aria-hidden="true" width="800" height="531" loading="lazy" decoding="async" />
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
                <img src={getServiceWorkImage(projectWorkImageFiles[index]) || projectVisuals[index]} alt={`Imagen ilustrativa para ${project.title}`} width="1280" height="960" loading="lazy" decoding="async" />
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
        figure: "Current BOJ S7-PLC screens presented in desktop and phone frames",
        desktop: "Current BOJ S7-PLC guided verification screen",
        mobileFrame: "BOJ S7-PLC symptom selection shown in a phone frame",
        mobile: "Current BOJ S7-PLC symptom selection screen in a phone frame",
      }
    : language === "pt"
      ? {
          figure: "Telas atuais do BOJ S7-PLC apresentadas em quadros de computador e telefone",
          desktop: "Tela atual de verificação guiada do BOJ S7-PLC",
          mobileFrame: "Seleção de sintomas do BOJ S7-PLC apresentada em um quadro de telefone",
          mobile: "Tela atual de seleção de sintomas do BOJ S7-PLC em um quadro de telefone",
        }
      : {
          figure: "Pantallas actuales de BOJ S7-PLC presentadas en marcos de computadora y teléfono",
          desktop: "Pantalla actual de verificación guiada de BOJ S7-PLC",
          mobileFrame: "Selección de síntomas de BOJ S7-PLC presentada en un marco de teléfono",
          mobile: "Pantalla actual de selección de síntomas de BOJ S7-PLC en un marco de teléfono",
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
              src={appVerificacionGuiada}
              alt={visualCopy.desktop}
              width="1460"
              height="675"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="app-laptop-base" aria-hidden="true" />
        </div>
        <div className="app-mobile-frame" aria-label={visualCopy.mobileFrame}>
          <div className="app-mobile-speaker" aria-hidden="true" />
          <img
            src={appSeleccionSintoma}
            alt={visualCopy.mobile}
            width="1000"
            height="455"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </figure>
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
                    <img src={getServiceWorkImage(projectWorkImageFiles[project.sourceIndex]) || projectVisuals[project.sourceIndex % projectVisuals.length]} alt="" width="1280" height="960" loading="lazy" decoding="async" />
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
        <img src={plantVisual} alt="" aria-hidden="true" width="800" height="531" loading="lazy" decoding="async" />
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
      <section className="mock-section mock-obras"><div className="mock-home-container"><h2>Projetos realizados</h2><p className="mock-obras-subtitle">Projetos selecionados de engenharia, migração de PLC e comissionamento realizados em ambientes reais de produção. As imagens são ilustrativas; os clientes e escopos são reais.</p><div className="mock-obras-grid">{portugueseProjects.map((project) => { const source = projects[project.sourceIndex]; return <article className="mock-obras-card" key={project.title}><div className="mock-obras-media"><img src={getServiceWorkImage(projectWorkImageFiles[project.sourceIndex]) || projectVisuals[project.sourceIndex % projectVisuals.length]} alt="" width="1280" height="960" loading="lazy" decoding="async" /><span className="works-image-disclaimer">Imagem ilustrativa</span><span className="mock-obras-client">{source.client}</span></div><div className="mock-obras-body"><span className="mock-obras-year">{source.year}</span><h3>{project.title}</h3><p>{project.result}</p></div></article>; })}</div><div className="mock-obras-cta"><a className="mock-btn mock-btn-primary" href="/pt/projetos">Ver projetos selecionados <ArrowRight size={18} /></a></div></div></section>
      <section className="mock-final-cta"><img src={plantVisual} alt="" aria-hidden="true" width="800" height="531" loading="lazy" decoding="async" /><div className="mock-final-overlay" aria-hidden="true" /><div className="mock-home-container mock-final-content"><h2>Sua planta tem uma falha, uma máquina parada ou uma equipe que precisa de capacitação?</h2><p>Conte-nos o que está acontecendo e ajudaremos a identificar o próximo passo adequado.</p><div className="mock-final-actions"><a className="mock-btn mock-btn-whatsapp" href={whatsappUrl("Olá, gostaria de conversar sobre uma falha industrial, um projeto de automação ou uma necessidade de capacitação técnica.")}><Phone size={18} /> Falar pelo WhatsApp</a><a className="mock-btn mock-btn-outline" href="/pt/contato"><Mail size={18} /> Enviar consulta técnica</a></div></div></section>
    </div>
  );
}

function HomeRoutes({ route }) {
  if (route === "/en") return <EnglishHomePage />;
  if (route === "/pt") return <PortugueseHomePage />;
  return <HomePage />;
}

export default HomeRoutes;
