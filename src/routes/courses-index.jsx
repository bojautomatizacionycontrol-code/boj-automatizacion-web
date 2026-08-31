import { focusHashTarget } from "../accessibility.js";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { englishCourses, portugueseCourses } from "../i18n.js";
import heroCursos from "../assets/hero-cursos.jpg";
import courseS7400Visual from "../assets/course-s7-400.jpg";
import courseTiaPortalVisual from "../assets/course-tia-portal.jpg";
import { M2Picture, whatsappUrl } from "../app/shared-eager.jsx";
import { Hero, Icon } from "./shared.jsx";

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
    text: "PDFs técnicos, guías y secuencia clara de análisis.",
  },
];

const coursesAvailableCards = [
  {
    icon: "ClipboardCheck",
    image: courseS7400Visual,
    title: "Diagnóstico y resolución de fallas en PLC Siemens S7-300/400",
    label: "Diagnóstico S7-300/400",
    path: "/cursos/s7-300-400",
    quickFacts: [
      { icon: "Gauge", title: "Nivel", text: "Intermedio técnico" },
      { icon: "MonitorCog", title: "Formato", text: "Material técnico en PDF, guías y casos reales" },
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
    path: "/cursos/tia-portal",
    upcoming: true,
    quickFacts: [
      { icon: "Gauge", title: "Nivel", text: "Inicial aplicado" },
      { icon: "MonitorCog", title: "Formato", text: "Material técnico en PDF y práctico" },
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

function CoursesPage() {
  const scrollToCourses = (event) => {
    event.preventDefault();
    focusHashTarget("#cursos-disponibles");
  };

  return (
    <div className="courses-redesign-page">
      <Hero
        image={heroCursos}
        eyebrow="Cursos"
        title="Cursos técnicos Siemens orientados a diagnóstico real de planta"
        subtitle="Formación aplicada para técnicos, instrumentistas, electricistas e ingenieros que necesitan diagnosticar, programar y actuar con criterio frente a fallas reales."
        primary={{ label: "Ver formación disponible y futura", href: "/cursos", onClick: scrollToCourses }}
        secondary={{ label: "Consultar capacitación", href: whatsappUrl("Hola, escribo desde la web de BOJ para consultar por capacitación técnica industrial.") }}
      />

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
            <h2>Formación disponible y futura</h2>
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
          <h2>¿Buscas formación técnica para ti o para tu equipo?</h2>
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
            <a className="mock-btn mock-btn-outline" href="/cursos/s7-300-400">
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
        <M2Picture src={course.image} alt="" aria-hidden="true" loading="lazy" />
        <div aria-hidden="true" />
        <span className="visual-disclaimer">Imagen ilustrativa</span>
        <strong>{course.label}</strong>
        <span className="course-status-badge">
          {course.upcoming ? "Próximamente" : "Disponible"}
        </span>
        <a className="mock-btn mock-btn-primary" href={course.path}>
          {course.upcoming ? "Ver adelanto" : "Ver curso"} <ArrowRight size={18} />
        </a>
      </div>
    </article>
  );
}

function EnglishCourseAvailableCard({ type }) {
  const isS7 = type === "s7";
  const course = isS7
    ? {
        label: "AVAILABLE NOW",
        title: "Industrial diagnostics for Siemens S7-300/400",
        image: courseS7400Visual,
        path: "/en/courses/s7-300-400",
        icon: "Cpu",
        facts: [["Format", "Online"], ["Language", "Spanish"], ["Access", "Permanent"], ["Includes", "1 month PRO App"]],
        bullets: ["STEP 7 Classic and SIMATIC Manager", "CPU states, SF/BF and Diagnostic Buffer", "PROFIBUS, modules and field signals"],
      }
    : {
        label: "UPCOMING",
        title: "TIA Portal for Siemens S7-1200/1500",
        image: courseTiaPortalVisual,
        path: "/en/courses/tia-portal",
        icon: "MonitorCog",
        facts: [["Format", "Online"], ["Level", "Introductory"], ["Status", "In preparation"]],
        bullets: ["Hardware configuration", "Variables and LAD", "Online monitoring and basic diagnostics"],
      };

  return (
    <article className="course-available-card">
      <div className="course-available-content">
        <div className="course-available-title-row"><span><Icon name={course.icon} size={30} /></span><h3>{course.title}</h3></div>
        <div className="course-quick-facts">
          {course.facts.map(([title, value]) => <div key={title}><span>{title}</span><strong>{value}</strong></div>)}
        </div>
        <ul className="course-available-bullets">
          {course.bullets.map((item) => <li key={item}><CheckCircle2 size={16} />{item}</li>)}
        </ul>
      </div>
      <div className="course-available-visual">
        <M2Picture src={course.image} alt="" aria-hidden="true" loading="lazy" />
        <strong>{course.label}</strong>
        <span className="course-status-badge">{isS7 ? "Available" : "Upcoming"}</span>
        <a className="mock-btn mock-btn-primary" href={course.path}>{isS7 ? "View course" : "View preview"} <ArrowRight size={18} /></a>
      </div>
    </article>
  );
}

function EnglishCoursesPage() {
  return (
    <div className="courses-redesign-page english-page" data-language="en">
      <Hero
        image={heroCursos}
        eyebrow="APPLIED TECHNICAL TRAINING"
        title="Learn to troubleshoot industrial systems with a repeatable method"
        subtitle="Training for maintenance technicians, automation specialists and engineers who work with Siemens PLC systems in real plant environments."
        primary={{ label: "View available and upcoming training", href: "#en-courses-available" }}
        secondary={{ label: "Ask about training", href: "/en/contact" }}
      />
      <section className="courses-light-section">
        <div className="mock-home-container">
          <div className="courses-section-heading courses-section-heading-dark"><h2>Training designed for field decisions</h2></div>
          <div className="courses-benefit-grid">
            {englishCourses.benefits.map((item) => (
              <article className="courses-benefit-card" key={item.title}><Icon name={item.icon} size={30} /><h3>{item.title}</h3><p>{item.text}</p></article>
            ))}
          </div>
        </div>
      </section>
      <section className="courses-available-section" id="en-courses-available">
        <div className="mock-home-container">
          <div className="courses-section-heading"><h2>Available and upcoming training</h2><p>Choose the program that matches the Siemens platform you work with.</p></div>
          <div className="courses-available-list"><EnglishCourseAvailableCard type="s7" /><EnglishCourseAvailableCard type="tia" /></div>
        </div>
      </section>
      <section className="courses-light-section courses-learning-section">
        <div className="mock-home-container">
          <div className="courses-section-heading courses-section-heading-dark"><h2>What the training helps you improve</h2></div>
          <div className="courses-learning-grid">
            {englishCourses.learning.map((item) => <article className="courses-learning-card" key={item.text}><Icon name={item.icon} size={28} /><p>{item.text}</p></article>)}
          </div>
        </div>
      </section>
      <section className="courses-final-cta">
        <div className="mock-home-container courses-final-cta-content">
          <h2>Need training for a maintenance or automation team?</h2>
          <p>Contact us to discuss the platform, audience and technical objectives.</p>
          <div className="courses-actions"><a className="mock-btn mock-btn-primary" href="/en/contact">Discuss team training <ArrowRight size={18} /></a></div>
        </div>
      </section>
    </div>
  );
}

function PortugueseCourseAvailableCard({ type }) {
  const isS7 = type === "s7";
  const course = isS7
    ? { label: "DISPONÍVEL AGORA", title: "Diagnóstico industrial para Siemens S7-300/400", image: courseS7400Visual, path: "/pt/cursos/s7-300-400", icon: "Cpu", facts: [["Formato", "Online"], ["Idioma", "Espanhol"], ["Acesso", "Permanente"], ["Inclui", "1 mês de App PRO"]], bullets: ["STEP 7 Classic e SIMATIC Manager", "Estados da CPU, SF/BF e Diagnostic Buffer", "PROFIBUS, módulos e sinais de campo"] }
    : { label: "EM PREPARAÇÃO", title: "TIA Portal para Siemens S7-1200/1500", image: courseTiaPortalVisual, path: "/pt/cursos/tia-portal", icon: "MonitorCog", facts: [["Formato", "Online"], ["Nível", "Introdutório"], ["Status", "Em preparação"]], bullets: ["Configuração de hardware", "Variáveis e LAD", "Monitoramento online e diagnóstico básico"] };
  return <article className="course-available-card"><div className="course-available-content"><div className="course-available-title-row"><span><Icon name={course.icon} size={30} /></span><h3>{course.title}</h3></div><div className="course-quick-facts">{course.facts.map(([title, value]) => <div key={title}><span>{title}</span><strong>{value}</strong></div>)}</div><ul className="course-available-bullets">{course.bullets.map((item) => <li key={item}><CheckCircle2 size={16} />{item}</li>)}</ul></div><div className="course-available-visual"><M2Picture src={course.image} alt="" aria-hidden="true" loading="lazy" /><strong>{course.label}</strong><span className="course-status-badge">{isS7 ? "Disponível" : "Em breve"}</span><a className="mock-btn mock-btn-primary" href={course.path}>{isS7 ? "Ver curso" : "Ver prévia"} <ArrowRight size={18} /></a></div></article>;
}

function PortugueseCoursesPage() {
  return (
    <div className="courses-redesign-page portuguese-page" data-language="pt">
      <Hero image={heroCursos} eyebrow="FORMAÇÃO TÉCNICA APLICADA" title="Aprenda a diagnosticar sistemas industriais com um método repetível" subtitle="Formação para técnicos de manutenção, especialistas em automação e engenheiros que trabalham com sistemas PLC Siemens em ambientes reais de planta." primary={{ label: "Ver formação disponível e futura", href: "#pt-cursos-disponiveis" }} secondary={{ label: "Consultar sobre formação", href: "/pt/contato" }} />
      <section className="courses-light-section"><div className="mock-home-container"><div className="courses-section-heading courses-section-heading-dark"><h2>Formação orientada a decisões em campo</h2></div><div className="courses-benefit-grid">{portugueseCourses.benefits.map((item) => <article className="courses-benefit-card" key={item.title}><Icon name={item.icon} size={30} /><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></div></section>
      <section className="courses-available-section" id="pt-cursos-disponiveis"><div className="mock-home-container"><div className="courses-section-heading"><h2>Formação disponível e futura</h2><p>Escolha o programa correspondente à plataforma Siemens com a qual você trabalha.</p></div><div className="courses-available-list"><PortugueseCourseAvailableCard type="s7" /><PortugueseCourseAvailableCard type="tia" /></div></div></section>
      <section className="courses-light-section courses-learning-section"><div className="mock-home-container"><div className="courses-section-heading courses-section-heading-dark"><h2>O que a formação ajuda a melhorar</h2></div><div className="courses-learning-grid">{portugueseCourses.learning.map((item) => <article className="courses-learning-card" key={item.text}><Icon name={item.icon} size={28} /><p>{item.text}</p></article>)}</div></div></section>
      <section className="courses-final-cta"><div className="mock-home-container courses-final-cta-content"><h2>Precisa capacitar uma equipe de manutenção ou automação?</h2><p>Entre em contato para conversar sobre a plataforma, o público e os objetivos técnicos.</p><div className="courses-actions"><a className="mock-btn mock-btn-primary" href="/pt/contato">Consultar formação para equipes <ArrowRight size={18} /></a></div></div></section>
    </div>
  );
}

function CoursesIndexRoutes({ route }) {
  if (route === "/en/courses") return <EnglishCoursesPage />;
  if (route === "/pt/cursos") return <PortugueseCoursesPage />;
  return <CoursesPage />;
}

export default CoursesIndexRoutes;
