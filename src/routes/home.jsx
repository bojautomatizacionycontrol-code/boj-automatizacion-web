import {
  ArrowRight,
  Mail,
  Phone,
} from "lucide-react";
import {
  englishHome,
  portugueseHome,
} from "../i18n.js";
import appEstadoCpuDesktop from "../assets/app-estado-cpu-desktop-316-2dp-20260929.png";
import appEstadoCpuMobile from "../assets/app-estado-cpu-mobile-313c-20260928.png";
import heroInicio from "../assets/hero-inicio.jpg";
import papeleraTrainingPhoto from "../assets/in-company/papelera-tucuman-capacitacion-plc-s7-grupo.jpg";
import zingarasTrainingPhoto from "../assets/in-company/zingaras-capacitacion-electricidad-industrial-grupo.jpg";
import plantVisual from "../assets/old-site/35-47edf350.jpg";
import { M2Picture, m2ImageSpecs, registerM2Images, whatsappUrl } from "../app/shared-eager.jsx";
import { FounderBlock } from "./founder-block.jsx";
import { Hero, Icon, S7Testimonials } from "./shared.jsx";

registerM2Images(import.meta.glob([
  "../assets/m2/app-estado-cpu-*.{avif,webp}",
  "../assets/m2/in-company-*.{avif,webp}",
], { eager: true, import: "default" }));

// Variantes AVIF/WebP de las capturas de la app usadas en la composición de dispositivos.
m2ImageSpecs.set(appEstadoCpuDesktop, {
  stem: "app-estado-cpu-desktop-316-2dp-20260929",
  width: 1920,
  height: 888,
  widths: [640, 960, 1672],
  formats: ["avif", "webp"],
  sizes: "(max-width: 760px) 92vw, 693px",
});
m2ImageSpecs.set(appEstadoCpuMobile, {
  stem: "app-estado-cpu-mobile-313c-20260928",
  width: 365,
  height: 902,
  widths: [320, 365],
  formats: ["avif", "webp"],
  sizes: "200px",
});
m2ImageSpecs.set(papeleraTrainingPhoto, {
  stem: "in-company-papelera-tucuman",
  width: 1280,
  height: 720,
  widths: [640, 960, 1280],
  formats: ["avif", "webp"],
  sizes: "(max-width: 900px) 92vw, 540px",
});
m2ImageSpecs.set(zingarasTrainingPhoto, {
  stem: "in-company-zingaras",
  width: 1600,
  height: 1200,
  widths: [640, 960, 1280],
  formats: ["avif", "webp"],
  sizes: "(max-width: 900px) 92vw, 540px",
});

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

const inCompanyTrainingCopy = {
  es: {
    eyebrow: "FORMACIÓN TÉCNICA EN PLANTA",
    title: "Capacitaciones In Company",
    intro: "Formación técnica aplicada dentro de la planta para elevar el nivel del personal de mantenimiento, mejorar la respuesta ante fallas y contribuir a reducir pérdidas asociadas a tiempos excesivos de parada.",
    proof: "Capacitación In Company",
    format: "Formación técnica aplicada",
    cta: "Consultar capacitación para mi empresa",
    ctaAria: "Consultar capacitación para mi empresa por WhatsApp; abre en una pestaña nueva",
    message: "Hola, quiero consultar por una capacitación In Company para el personal de mantenimiento de mi empresa.",
    cases: [
      {
        id: "papelera",
        client: "Papelera de Tucumán",
        title: "Diagnóstico y resolución de fallas en PLC Siemens S7-300 y S7-400",
        text: "Capacitación práctica orientada a reconocer síntomas, interpretar estados y ordenar verificaciones antes de intervenir.",
        image: papeleraTrainingPhoto,
        alt: "Grupo de cinco personas en Papelera de Tucumán al finalizar la capacitación en diagnóstico de PLC Siemens, mostrando sus certificados.",
      },
      {
        id: "zingaras",
        client: "Zíngaras",
        title: "Diagnóstico de fallas en electricidad industrial",
        text: "Formación práctica sobre mediciones, interpretación de fallas y criterios de intervención segura para mantenimiento eléctrico.",
        image: zingarasTrainingPhoto,
        alt: "Grupo de siete personas en Zíngaras al finalizar la capacitación en electricidad industrial, mostrando sus certificados.",
      },
    ],
  },
  en: {
    eyebrow: "ON-SITE TECHNICAL TRAINING",
    title: "In-company training",
    intro: "Applied technical training delivered inside the plant to strengthen maintenance teams, improve fault response and help reduce losses associated with excessive machine downtime.",
    proof: "In-company training",
    format: "Applied technical training",
    cta: "Ask about training for my company",
    ctaAria: "Ask about training for my company on WhatsApp; opens in a new tab",
    message: "Hello, I would like to ask about in-company training for my maintenance team.",
    cases: [
      {
        id: "papelera",
        client: "Papelera de Tucumán",
        title: "Fault diagnosis and troubleshooting on Siemens S7-300 and S7-400 PLCs",
        text: "Practical training focused on recognizing symptoms, interpreting states and organizing checks before intervening.",
        image: papeleraTrainingPhoto,
        alt: "Group of five people at Papelera de Tucumán after completing Siemens PLC diagnostics training, holding their certificates.",
      },
      {
        id: "zingaras",
        client: "Zíngaras",
        title: "Industrial electrical fault diagnostics",
        text: "Practical training in measurements, fault interpretation and safe intervention criteria for electrical maintenance.",
        image: zingarasTrainingPhoto,
        alt: "Group of seven people at Zíngaras after completing industrial electricity training, holding their certificates.",
      },
    ],
  },
  pt: {
    eyebrow: "TREINAMENTO TÉCNICO NA PLANTA",
    title: "Treinamentos In Company",
    intro: "Formação técnica aplicada dentro da planta para elevar o nível das equipes de manutenção, melhorar a resposta a falhas e contribuir para reduzir perdas associadas a paradas excessivas de máquina.",
    proof: "Treinamento In Company",
    format: "Formação técnica aplicada",
    cta: "Consultar treinamento para minha empresa",
    ctaAria: "Consultar treinamento para minha empresa pelo WhatsApp; abre em uma nova aba",
    message: "Olá, gostaria de consultar sobre um treinamento In Company para a equipe de manutenção da minha empresa.",
    cases: [
      {
        id: "papelera",
        client: "Papelera de Tucumán",
        title: "Diagnóstico e solução de falhas em PLC Siemens S7-300 e S7-400",
        text: "Treinamento prático para reconhecer sintomas, interpretar estados e organizar verificações antes da intervenção.",
        image: papeleraTrainingPhoto,
        alt: "Grupo de cinco pessoas na Papelera de Tucumán após o treinamento em diagnóstico de PLC Siemens, mostrando seus certificados.",
      },
      {
        id: "zingaras",
        client: "Zíngaras",
        title: "Diagnóstico de falhas em eletricidade industrial",
        text: "Formação prática sobre medições, interpretação de falhas e critérios de intervenção segura na manutenção elétrica.",
        image: zingarasTrainingPhoto,
        alt: "Grupo de sete pessoas na Zíngaras após o treinamento em eletricidade industrial, mostrando seus certificados.",
      },
    ],
  },
};

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

      <FounderBlock id="home-founder" />

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

      <HomeInCompanyTraining />

      <S7Testimonials limit={2} />

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

function HomeInCompanyTraining({ language = "es" }) {
  const copy = inCompanyTrainingCopy[language] || inCompanyTrainingCopy.es;
  const headingId = `home-in-company-title-${language}`;

  return (
    <section className="mock-section home-in-company" data-home-section="in-company-training" aria-labelledby={headingId}>
      <div className="mock-home-container">
        <div className="home-in-company-heading">
          <span>{copy.eyebrow}</span>
          <h2 id={headingId}>{copy.title}</h2>
          <p>{copy.intro}</p>
        </div>
        <div className="home-in-company-grid">
          {copy.cases.map((training) => (
            <article className={`home-in-company-card home-in-company-card--${training.id}`} key={training.id}>
              <div className="home-in-company-media">
                <M2Picture src={training.image} alt={training.alt} loading="lazy" decoding="async" />
                <span className="home-in-company-proof"><Icon name="GraduationCap" size={15} aria-hidden="true" />{copy.proof}</span>
                <span className="home-in-company-client">{training.client}</span>
              </div>
              <div className="home-in-company-body">
                <span className="home-in-company-format">{copy.format}</span>
                <h3>{training.title}</h3>
                <p>{training.text}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="home-in-company-cta">
          <a className="mock-btn mock-btn-primary" href={whatsappUrl(copy.message)} target="_blank" rel="noopener noreferrer" aria-label={copy.ctaAria}>
            <Phone size={18} aria-hidden="true" /> {copy.cta}
          </a>
        </div>
      </div>
    </section>
  );
}

function AppDiagnosticMockup({ language = "es" }) {
  const visualCopy = language === "en"
    ? {
        figure: "Illustrative BOJ S7-PLC interface screenshots in desktop and phone frames, without account details",
        desktop: "Real BOJ S7-PLC CPU 316-2 DP status screen with PLC and LED state buttons",
        mobileFrame: "BOJ S7-PLC CPU status diagnostic shown in a phone frame",
        mobile: "BOJ S7-PLC CPU 313C and its front-panel indicators on a phone",
      }
    : language === "pt"
      ? {
          figure: "Capturas ilustrativas da interface do BOJ S7-PLC em computador e telefone, sem dados da conta",
          desktop: "Captura real do estado da CPU 316-2 DP no BOJ S7-PLC com PLC e botões dos LEDs",
          mobileFrame: "Diagnóstico por estado da CPU do BOJ S7-PLC apresentado em um quadro de telefone",
          mobile: "CPU 313C e indicadores frontais do BOJ S7-PLC em um telefone",
        }
      : {
          figure: "Capturas ilustrativas de la interfaz de BOJ S7-PLC en computadora y teléfono, sin datos de la cuenta",
          desktop: "Captura real del estado de CPU 316-2 DP en BOJ S7-PLC con PLC y botones de LED",
          mobileFrame: "Diagnóstico por estado de CPU de BOJ S7-PLC presentado en un marco de teléfono",
          mobile: "CPU 313C e indicadores del frontal de BOJ S7-PLC en un teléfono",
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
            <M2Picture
              src={appEstadoCpuDesktop}
              alt={visualCopy.desktop}
              width="1920"
              height="888"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="app-laptop-base" aria-hidden="true" />
        </div>
        <div className="app-mobile-frame" aria-label={visualCopy.mobileFrame}>
          <div className="app-mobile-speaker" aria-hidden="true" />
          <div className="app-mobile-screen">
            <M2Picture
              src={appEstadoCpuMobile}
              alt={visualCopy.mobile}
              width="365"
              height="902"
              loading="lazy"
              decoding="async"
            />
          </div>
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

      <FounderBlock language="en" id="en-home-founder" />

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

      <HomeInCompanyTraining language="en" />

      <S7Testimonials language="en" limit={2} />

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
      <FounderBlock language="pt" id="pt-home-founder" />
      <section className="mock-section mock-app"><div className="mock-home-container mock-app-grid"><div className="mock-app-copy"><span className="section-badge">BOJ S7-PLC PRO</span><h2>Uma primeira resposta mais clara antes de abrir o STEP 7</h2><p>Informe estados da CPU, LEDs e sintomas de campo. O app organiza hipóteses técnicas e sugere o que verificar primeiro.</p><ul><li>Fluxo orientado por sintomas</li><li>Hipóteses técnicas priorizadas</li><li>Orientação para verificação em campo</li></ul><a className="mock-btn mock-btn-primary" href="/pt/app">Conhecer o app <ArrowRight size={18} /></a></div><AppDiagnosticMockup language="pt" /></div></section>
      <HomeInCompanyTraining language="pt" />
      <S7Testimonials language="pt" limit={2} />
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
