import { CheckCircle2, Clock } from "lucide-react";
import { tiaCourse } from "../content.js";
import { englishTiaCourse, portugueseTiaCourse } from "../i18n.js";
import heroCursoTia from "../assets/hero-curso-tia.jpg";
import step7ManagerVisual from "../assets/11.png";
import step7HwConfigVisual from "../assets/12.png";
import step7LadderVisual from "../assets/13.png";
import plcCabinetVisual from "../assets/old-site/07-0852e6d5.jpg";
import {
  Icon,
  PageShell,
  PrimaryLink,
  SecondaryLink,
} from "./shared.jsx";

function TiaCoursePage() {
  return (
    <CourseLanding
      course={tiaCourse}
      eyebrow="CURSO TIA — PRÓXIMAMENTE"
      visual="tia"
      afterHero={<CoursePreparationStrip />}
    />
  );
}

const coursePreparationCopy = {
  es: {
    ariaLabel: "Estado del curso",
    eyebrow: "CURSO EN PREPARACIÓN",
    title: "Estamos desarrollando el programa y sus materiales técnicos.",
    text: "La inscripción todavía no está habilitada. Publicaremos aquí la información cuando el curso esté disponible.",
  },
  en: {
    ariaLabel: "Course status",
    eyebrow: "COURSE IN PREPARATION",
    title: "We are developing the program and its technical materials.",
    text: "Enrollment is not open yet. We will publish the information here when the course becomes available.",
  },
  pt: {
    ariaLabel: "Status do curso",
    eyebrow: "CURSO EM PREPARAÇÃO",
    title: "Estamos desenvolvendo o programa e seus materiais técnicos.",
    text: "As inscrições ainda não estão abertas. Publicaremos as informações aqui quando o curso estiver disponível.",
  },
};

function CoursePreparationStrip({ language = "es" }) {
  const copy = coursePreparationCopy[language] || coursePreparationCopy.es;
  return (
    <section className="course-preparation-strip" aria-label={copy.ariaLabel}>
      <div className="section-container course-preparation-strip-inner">
        <span className="course-preparation-strip-icon" aria-hidden="true">
          <Clock size={21} />
        </span>
        <div className="course-preparation-strip-copy">
          <span>{copy.eyebrow}</span>
          <strong>{copy.title}</strong>
          <p>{copy.text}</p>
        </div>
      </div>
    </section>
  );
}

const courseLandingCopy = {
  es: {
    training: ["Aplicado a mantenimiento", "Diagnóstico online", "Casos de planta", "Procedimiento técnico"],
    positioning: "Propuesta técnica del curso",
    audience: "Para quién es",
    learn: "Contenidos técnicos principales",
    includes: "Qué incluye",
    outcomes: "Capacidades al finalizar",
    difference: "Por qué este curso es diferente",
    appValue: "Valor de la app incluida",
    program: "Programa técnico",
    baseContent: "Contenido de base",
    benefits: "Impacto profesional y operativo",
    mistakes: "Errores técnicos que el curso ayuda a evitar",
  },
  en: {
    training: ["Applied to maintenance", "Online diagnostics", "Plant cases", "Technical procedure"],
    positioning: "Technical course proposal",
    audience: "Who it is for",
    learn: "Main technical content",
    includes: "What is included",
    outcomes: "Capabilities after completion",
    difference: "Why this course is different",
    appValue: "Value of the included app",
    program: "Technical program",
    baseContent: "Core content",
    benefits: "Professional and operational impact",
    mistakes: "Technical mistakes this course helps prevent",
  },
  pt: {
    training: ["Aplicado à manutenção", "Diagnóstico online", "Casos de planta", "Procedimento técnico"],
    positioning: "Proposta técnica do curso",
    audience: "Para quem é",
    learn: "Principais conteúdos técnicos",
    includes: "O que está incluído",
    outcomes: "Capacidades ao concluir",
    difference: "Por que este curso é diferente",
    appValue: "Valor do app incluído",
    program: "Programa técnico",
    baseContent: "Conteúdo de base",
    benefits: "Impacto profissional e operacional",
    mistakes: "Erros técnicos que o curso ajuda a evitar",
  },
};

function CourseLanding({ course, eyebrow, visual, ctas = [], afterHero = null, language = "es" }) {
  const copy = courseLandingCopy[language] || courseLandingCopy.es;
  return (
    <PageShell
      eyebrow={eyebrow}
      title={course.title}
      subtitle={course.subtitle}
      heroImage={heroCursoTia}
      heroPrimary={ctas[0]}
      heroSecondary={ctas[1]}
      afterHero={afterHero}
    >
      <div className="training-strip page-strip">
        {copy.training.map((item) => <span key={item}>{item}</span>)}
      </div>
      <div className="course-landing">
        <div className="course-content">
          {course.positioning ? <InfoBlock title={copy.positioning} items={course.positioning} /> : null}
          <InfoBlock title={copy.audience} items={course.audience} />
          {course.learnItems ? <InfoBlock title={copy.learn} items={course.learnItems} /> : null}
          {course.includes ? <InfoBlock title={copy.includes} items={course.includes} /> : null}
          <InfoBlock title={copy.outcomes} items={course.outcomes} />
          {course.difference ? <InfoBlock title={copy.difference} items={course.difference} /> : null}
          {course.appValue ? <InfoBlock title={copy.appValue} items={course.appValue} /> : null}
          <InfoBlock title={course.includes ? copy.program : copy.baseContent} items={course.modules} numbered />
          <InfoBlock title={copy.benefits} items={course.benefits} />
          <InfoBlock title={copy.mistakes} items={course.avoidMistakes} />
          {ctas.length > 0 ? (
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
          ) : null}
        </div>
        <CourseVisual type={visual} course={course} language={language} />
      </div>
    </PageShell>
  );
}

function EnglishTiaCoursePage() {
  return (
    <CourseLanding
      course={englishTiaCourse}
      eyebrow="TIA COURSE — UPCOMING"
      visual="tia"
      language="en"
      afterHero={<CoursePreparationStrip language="en" />}
    />
  );
}

function PortugueseTiaCoursePage() {
  return (
    <CourseLanding
      course={portugueseTiaCourse}
      eyebrow="CURSO TIA — EM PREPARAÇÃO"
      visual="tia"
      language="pt"
      afterHero={<CoursePreparationStrip language="pt" />}
    />
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

const tiaCourseVisualCopy = {
  es: {
    imageAlt: "PLC Siemens para curso TIA Portal",
    eyebrow: "PROGRAMA EN DESARROLLO",
    title: "Una base ordenada para trabajar en TIA Portal",
    text: "El contenido conectará configuración, programación y diagnóstico inicial en un recorrido aplicado.",
  },
  en: {
    imageAlt: "Siemens PLC for the TIA Portal course",
    eyebrow: "PROGRAM IN DEVELOPMENT",
    title: "A structured foundation for working in TIA Portal",
    text: "The content will connect configuration, programming and initial diagnostics in one applied learning path.",
  },
  pt: {
    imageAlt: "PLC Siemens para o curso de TIA Portal",
    eyebrow: "PROGRAMA EM DESENVOLVIMENTO",
    title: "Uma base organizada para trabalhar no TIA Portal",
    text: "O conteúdo conectará configuração, programação e diagnóstico inicial em um percurso aplicado.",
  },
};

function CourseVisual({ type, course, language = "es" }) {
  if (type === "s7") {
    return (
      <aside className="course-side-visual s7">
        <div className="side-visual-header">
          <span>STEP 7 Classic</span>
          <Icon name="Cpu" />
        </div>
        <div className="step7-collage" aria-label="Capturas reales de SIMATIC STEP 7 Classic">
          <figure className="step7-shot main">
            <img src={step7HwConfigVisual} alt="HW Config de SIMATIC STEP 7 Classic con red PROFIBUS" width="1024" height="533" loading="lazy" decoding="async" />
            <figcaption>HW Config / PROFIBUS</figcaption>
          </figure>
          <div className="step7-secondary-grid">
            <figure className="step7-shot">
              <img src={step7ManagerVisual} alt="SIMATIC Manager con estructura de proyecto Siemens S7" width="1024" height="572" loading="lazy" decoding="async" />
              <figcaption>SIMATIC Manager</figcaption>
            </figure>
            <figure className="step7-shot">
              <img src={step7LadderVisual} alt="Editor LAD STL FBD de STEP 7 Classic" width="1024" height="612" loading="lazy" decoding="async" />
              <figcaption>LAD / STL / FBD</figcaption>
            </figure>
          </div>
        </div>
      </aside>
    );
  }

  const copy = tiaCourseVisualCopy[language] || tiaCourseVisualCopy.es;

  return (
    <aside className="course-side-visual tia">
      <div className="side-visual-header">
        <span>TIA Portal</span>
        <Icon name="MonitorCog" />
      </div>
      <figure className="course-side-photo">
        <img src={plcCabinetVisual} alt={copy.imageAlt} width="800" height="454" loading="lazy" decoding="async" />
      </figure>
      <div className="tia-course-side-copy">
        <span>{copy.eyebrow}</span>
        <h2>{copy.title}</h2>
        <p>{copy.text}</p>
        <ul>
          {course?.learnItems?.slice(0, 3).map((item) => (
            <li key={item}>
              <CheckCircle2 size={17} aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

function CourseTiaRoutes({ route }) {
  if (route === "/en/courses/tia-portal") return <EnglishTiaCoursePage />;
  if (route === "/pt/cursos/tia-portal") return <PortugueseTiaCoursePage />;
  return <TiaCoursePage />;
}

export default CourseTiaRoutes;
