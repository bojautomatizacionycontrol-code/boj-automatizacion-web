import { focusHashTarget } from "../accessibility.js";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  GraduationCap,
  ScanSearch,
  ShieldCheck,
  Smartphone,
  TriangleAlert,
} from "lucide-react";
import {
  contact,
  offer,
  s7Course,
  s7ManualPages,
  metodoBojSteps,
} from "../content.js";
import { englishS7Course, portugueseS7Course } from "../i18n.js";
import appDiagnosticoGuiado from "../assets/app-diagnostico-guiado.jpg";
import walterBojAvatar from "../assets/walter-boj-avatar-field.jpeg";
import heroCursoS7 from "../assets/hero-curso-s7.jpg";
import { track, whatsappUrl } from "../app/shared-eager.jsx";
import ManualFlipbook from "../components/DeferredManualFlipbook.jsx";
import {
  Hero,
  Icon,
  S7ProofStrip,
  S7Testimonials,
  appProductUrl,
} from "./shared.jsx";

const manualPreviewModules = import.meta.glob("../assets/manual-preview/*.jpg", {
  eager: true,
  import: "default",
});

const manualPreviewImages = Object.keys(manualPreviewModules)
  .sort()
  .map((key) => manualPreviewModules[key]);

const s7AppCarousel = [
  { label: "Subflujo guiado y verificación por etapas", image: appDiagnosticoGuiado },
];

function CourseHeroPreview() {
  return (
    <aside className="course-hero-preview" aria-label="Vista previa de la oferta del curso">
      <div className="course-hero-preview-media">
        <img src={manualPreviewImages[0]} alt="Portada del manual de diagnóstico S7-300/400" width="1100" height="1556" decoding="async" />
        <span>Manual técnico profesional</span>
      </div>
      <div className="course-hero-preview-copy">
        <span>CURSO + APP PRO</span>
        <strong>{offer.course.price}</strong>
        <small>Pago único · Acceso permanente al curso</small>
        <ul>
          <li><CheckCircle2 size={15} aria-hidden="true" /> Método de diagnóstico aplicado</li>
          <li><CheckCircle2 size={15} aria-hidden="true" /> 1 mes de BOJ S7-PLC PRO</li>
        </ul>
      </div>
    </aside>
  );
}

function S7CoursePage() {
  return <S7SalesLanding course={s7Course} eyebrow="Curso aplicado" />;
}

function S7MethodStrip() {
  return (
    <section className="s7-sales-section s7-method" data-surface="light">
      <div className="s7-sales-container">
        <div className="s7-sales-section-heading">
          <p className="s7-sales-kicker">El Método BOJ</p>
          <h2>Del síntoma a la causa probable, con evidencia. No con prueba y error.</h2>
          <p className="s7-method-lead">
            La misma secuencia que aplico en planta hace más de 15 años, ordenada para que la uses cuando la
            máquina está parada y la presión es alta.
          </p>
        </div>
        <div className="s7-method-grid">
          {metodoBojSteps.map((step, index) => (
            <div className="s7-method-step-wrap" key={step.num}>
              <article className="s7-method-step">
                <span className="s7-method-num">{step.num}</span>
                <span className="s7-method-icon">
                  <Icon name={step.icon} size={26} />
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
              {index < metodoBojSteps.length - 1 ? (
                <span className="s7-method-arrow" aria-hidden="true">
                  <ArrowRight size={22} />
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function purchaseCtaTarget() {
  const checkout = offer.course.checkout;
  const hasCheckoutUrl = typeof checkout.checkoutUrl === "string" && checkout.checkoutUrl.trim() !== "";
  // live sin checkoutUrl NO es live: cae al CTA vigente (nunca un href vacío).
  const isCheckoutLive = checkout.status === "live" && hasCheckoutUrl;
  // Los claims finales exigen además la validación E2E del flujo (3B); abrir el
  // checkout en una prueba controlada NO exige flowValidated.
  const isCheckoutFlowValidated = isCheckoutLive && checkout.flowValidated === true;
  return {
    isLive: isCheckoutLive,
    isPreview: checkout.status === "preview",
    isFlowValidated: isCheckoutFlowValidated,
    href: isCheckoutLive ? checkout.checkoutUrl : whatsappUrl(offer.course.purchaseMessage),
    trackPayload: (source) => ({
      item: "curso_s7_app_pro",
      value: offer.course.priceValue,
      currency: offer.course.priceCurrency,
      source,
      ...(isCheckoutLive ? { payment: "hotmart" } : {}),
    }),
  };
}

function PurchaseCTA({ source, className, children }) {
  const target = purchaseCtaTarget();
  if (target.isPreview) {
    return (
      <span className={`${className} is-disabled`} aria-disabled="true">
        Pago disponible próximamente
      </span>
    );
  }
  return (
    <a
      className={className}
      href={target.href}
      target="_blank"
      rel="noreferrer"
      onClick={() => track("begin_checkout", target.trackPayload(source))}
    >
      {target.isLive ? offer.course.checkout.ctaLabel : children}
    </a>
  );
}

function S7SalesLanding({ course, eyebrow }) {
  const purchaseTarget = purchaseCtaTarget();
  const heroPurchaseAction = purchaseTarget.isPreview
    ? { label: "Pago disponible próximamente", href: "#", onClick: (event) => event.preventDefault() }
    : {
        label: purchaseTarget.isLive
          ? offer.course.checkout.ctaLabel
          : `Empezar ahora — Curso + App PRO · ${offer.course.price}`,
        href: purchaseTarget.href,
        external: true,
        onClick: () => track("begin_checkout", purchaseTarget.trackPayload("hero")),
      };
  // "Pago seguro · Acceso inmediato" solo con el flujo Hotmart validado E2E
  // (flowValidated). En pending, preview o live sin validar: copy neutral.
  const guaranteeNote = purchaseTarget.isFlowValidated
    ? "Pago seguro · Acceso inmediato · Garantía de 7 días"
    : "Garantía de 7 días · Acceso digital";
  const scrollToCourseSection = (event, sectionId) => {
    event.preventDefault();
    focusHashTarget(`#${sectionId}`);
  };

  const problemCards = [
    {
      icon: "Zap",
      title: "Fallas reales",
      text: "Situaciones habituales que enfrentas todos los días en planta.",
    },
    {
      icon: "MonitorCog",
      title: "Decisiones con criterio",
      text: "Evidencia, síntomas y pasos correctos para diagnosticar.",
    },
    {
      icon: "Clock",
      title: "Menos prueba y error",
      text: "Ordena la búsqueda y reduce los tiempos de máquina detenida.",
    },
    {
      icon: "ShieldCheck",
      title: "Enfocado en campo",
      text: "Herramientas y métodos que funcionan donde realmente se necesitan.",
    },
    {
      icon: "Network",
      title: "Relación entre síntomas, LEDs, red, módulos y señales",
      text: "Conecta las piezas y comprende el sistema completo.",
    },
    {
      icon: "ClipboardCheck",
      title: "Uso de la app PRO como apoyo",
      text: "Ayuda a ordenar hipótesis y verificaciones durante el diagnóstico.",
    },
  ];

  const learningCards = [
    {
      icon: "Cable",
      title: "Perder el miedo a conectarte al PLC",
      text: "Buenas prácticas para entrar online con STEP 7 / SIMATIC Manager, leer hardware y diagnosticar sin intervenir a ciegas.",
    },
    {
      icon: "MonitorCog",
      title: "Leer hardware online con STEP 7 / SIMATIC Manager",
      text: "Comprende el sistema con criterio profesional.",
    },
    {
      icon: "Cpu",
      title: "Interpretar estados RUN/STOP/SF/BF",
      text: "Qué significan realmente y qué acción tomar.",
    },
    {
      icon: "ClipboardCheck",
      title: "Usar Diagnostic Buffer con criterio técnico",
      text: "Extrae, filtra y analiza los eventos relevantes.",
    },
    {
      icon: "Network",
      title: "Diagnosticar PROFIBUS DP",
      text: "Fallas típicas en red, esclavos y comunicación.",
    },
    {
      icon: "CircuitBoard",
      title: "Diferenciar falla de campo, red, módulo o lógica",
      text: "Localiza el origen del problema sin perder tiempo.",
    },
    {
      icon: "Brain",
      title: "Construir una hipótesis defendible",
      text: "Antes de intervenir, define qué debes verificar.",
    },
    {
      icon: "RefreshCcw",
      title: "Reducir prueba y error cuando la máquina está parada",
      text: "Método sistemático para diagnosticar rápido y bien.",
    },
  ];

  const courseIncludes = [
    {
      title: "Método BOJ de diagnóstico industrial",
      text: "Secuencia práctica para ordenar síntomas, LEDs, eventos, red, módulos y señales antes de intervenir el PLC.",
    },
    {
      title: "Material técnico aplicado",
      text: "Guías estructuradas con criterio de campo para estudiar, consultar y usar como apoyo durante diagnósticos reales.",
    },
    {
      title: "Casos de falla y razonamiento técnico",
      text: "Situaciones típicas de STOP, SF/BF, PROFIBUS, módulos, señales y fallas intermitentes explicadas desde la lógica de mantenimiento.",
    },
    {
      title: "STEP 7 Classic / SIMATIC Manager",
      text: "Criterio para conectarse, leer HW Config Online, revisar Diagnostic Buffer y analizar el sistema sin intervenir a ciegas.",
    },
  ];

  const appIncludes = [
    "Diagnóstico por síntomas, LEDs, red, módulos y señales",
    "Hipótesis técnicas priorizadas",
    "Guía paso a paso",
    "Uso sin conexión hasta 2 días",
    "Acceso desde navegador e instalación como app",
  ];

  const appHighlights = [
    { icon: "CalendarCheck", label: "1 mes de acceso" },
    { icon: "Smartphone", label: "1 dispositivo" },
  ];

  const audienceItems = [
    { icon: "Wrench", title: "Técnicos de mantenimiento industrial" },
    { icon: "Settings", title: "Automatistas y programadores PLC" },
    { icon: "Zap", title: "Electricistas de planta" },
    { icon: "Gauge", title: "Instrumentistas" },
    { icon: "Building2", title: "Empresas con PLC Siemens S7-300/400" },
    { icon: "GraduationCap", title: "Centros de formación técnica" },
  ];

  const offerIncludes = [
    "Curso aplicado de diagnóstico S7-300/400",
    "Método BOJ de diagnóstico industrial",
    "Material técnico aplicado y guías técnicas",
    "Casos de falla y razonamiento técnico",
    "STEP 7 Classic / SIMATIC Manager / HW Config / Diagnostic Buffer",
    "1 mes de BOJ S7-PLC PRO",
    "Uso sin conexión hasta 2 días",
  ];

  const mistakes = [
    "Perder tiempo con prueba y error.",
    "Cambiar módulos sin hipótesis clara.",
    "Interpretar mal LEDs y estados.",
    "No detectar fallas de red PROFIBUS.",
    "No registrar síntomas y evidencia.",
    "Agravar el problema por intervenir sin criterio.",
  ];

  const courseFaqItems = [
    {
      question: "¿Qué recibo exactamente al comprar?",
      answer: "Recibes un conjunto profesional de recursos de diagnóstico: material técnico estructurado, documentos PDF de consulta, método de análisis, casos de fallas reales y 1 mes de acceso a BOJ S7-PLC PRO.",
    },
    {
      question: "¿El curso incluye la APP PRO?",
      answer: "Sí. La compra incluye el curso Diagnóstico S7-300/400 y 1 mes de acceso a BOJ S7-PLC PRO.",
    },
    {
      question: "¿Por cuánto tiempo tengo la APP PRO?",
      answer: "Incluye 1 mes de APP PRO para 1 dispositivo. Cuando finaliza el mes, puedes renovarla si quieres seguir utilizándola.",
    },
    {
      question: "¿Sirve para S7-300 y S7-400?",
      answer: "Sí. Está orientado a diagnóstico de sistemas Siemens S7-300/400, especialmente CPU, LEDs, Diagnostic Buffer, PROFIBUS, módulos, señales y fallas de campo.",
    },
    {
      question: "¿Me ayuda a conectarme al PLC con más seguridad?",
      answer: "Sí. El curso te ayuda a entender qué mirar antes y durante una conexión online: estado de CPU, hardware, Diagnostic Buffer, red, módulos y señales. No reemplaza los procedimientos de seguridad de planta, pero te ayuda a intervenir con más criterio.",
    },
    {
      question: "¿Necesito tener STEP 7 instalado?",
      answer: "Es recomendable para practicar mejor los procedimientos. De todos modos, el material muestra qué observar en SIMATIC Manager, HW Config y Diagnostic Buffer para entender el flujo de diagnóstico.",
    },
    {
      question: "¿Necesito saber programar PLC para hacer el curso?",
      answer: "No es necesario ser programador avanzado. El curso está pensado para técnicos, electricistas, automatistas y personal de mantenimiento que necesitan diagnosticar fallas reales con más criterio.",
    },
    {
      question: "¿El curso es teórico o aplicado?",
      answer: "Es aplicado. Tiene base técnica, pero el foco está en diagnóstico real: ordenar síntomas, interpretar evidencias y decidir el próximo paso antes de intervenir.",
    },
    {
      question: "¿Está orientado a fallas reales de planta?",
      answer: "Sí. El enfoque no es programación genérica, sino diagnóstico aplicado: CPU en STOP, SF/BF, PROFIBUS, módulos caídos, señales incorrectas, fallas intermitentes y errores comunes de intervención.",
    },
    {
      question: "¿Puedo usarlo si trabajo en mantenimiento?",
      answer: "Sí. Está pensado especialmente para mantenimiento industrial, donde muchas veces hay poco tiempo, presión operativa y síntomas incompletos.",
    },
    {
      question: "¿Qué pasa cuando vence el mes de APP PRO?",
      answer: "El acceso mensual a la APP PRO finaliza. El material del curso permanece disponible según las condiciones de entrega definidas, y la app puede renovarse si necesitas continuar con acceso PRO.",
    },
    {
      question: "¿La APP PRO reemplaza al curso?",
      answer: "No. El curso te da el criterio técnico y la metodología. La APP PRO funciona como apoyo durante el diagnóstico para ordenar síntomas, hipótesis y verificaciones.",
    },
  ];

  const courseFaqColumns = [
    courseFaqItems.filter((_, index) => index % 2 === 0),
    courseFaqItems.filter((_, index) => index % 2 === 1),
  ];

  return (
    <div className="s7-sales-page">
      <Hero
        image={heroCursoS7}
        eyebrow="Diagnóstico industrial · Método BOJ"
        title="Diagnostica fallas reales en PLC S7-300/400 con método y evidencia."
        subtitle="Aprende una secuencia práctica para interpretar síntomas, reunir evidencia y llegar a la causa probable en CPU, PROFIBUS, módulos y señales. Formación técnica para mantenimiento industrial que necesita decidir con criterio bajo presión."
        primary={heroPurchaseAction}
        secondary={{ label: "Ver qué incluye", href: "/cursos/s7-300-400", onClick: (event) => scrollToCourseSection(event, "curso-s7-incluye") }}
        note={guaranteeNote}
        aside={<CourseHeroPreview />}
      />

      <S7ProofStrip />

      <section className="s7-sales-section s7-sales-dark s7-sales-learning" data-surface="dark">
        <div className="s7-sales-container">
          <div className="s7-sales-centered-heading">
            <h2 className="s7-sales-kicker">Qué vas a aprender</h2>
          </div>
          <div className="s7-sales-learning-grid">
            {learningCards.map((item) => (
              <article className="s7-sales-dark-card" key={item.title}>
                <Icon name={item.icon} size={34} />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="s7-sales-section s7-sales-includes" id="curso-s7-incluye" data-surface="light">
        <div className="s7-sales-container">
          <div className="s7-sales-section-heading">
            <p className="s7-sales-kicker">Qué incluye</p>
            <h2>Una formación aplicada + una herramienta profesional para diagnosticar con más criterio en PLC Siemens S7-300/400.</h2>
          </div>

          <div className="s7-sales-include-grid">
            <article className="s7-sales-include-card s7-sales-include-course">
              <span className="s7-sales-include-number">1</span>
              <h3>Curso aplicado S7-300/400</h3>
              <div className="s7-sales-include-body">
                <div className="s7-sales-include-media">
                  <p className="s7-sales-include-preview-label">
                    <ScanSearch size={16} aria-hidden="true" /> Consulta las primeras 8 páginas del manual
                  </p>
                  <ManualFlipbook images={manualPreviewImages} pages={s7ManualPages} variant="card" />
                </div>
                <div className="s7-sales-include-main">
                  <div className="s7-sales-include-list">
                    {courseIncludes.map((item) => (
                      <div className="s7-sales-include-item" key={item.title}>
                        <CheckCircle2 size={20} aria-hidden="true" />
                        <div>
                          <h4>{item.title}</h4>
                          <p>{item.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="s7-sales-include-note">Basado en más de 15 años de experiencia en diagnóstico, mantenimiento y automatización industrial.</p>
                </div>
              </div>
            </article>

            <span className="s7-sales-plus" aria-hidden="true">+</span>

            <article className="s7-sales-include-card s7-sales-include-app">
              <span className="s7-sales-include-number">2</span>
              <h3>APP PRO - 1 mes de BOJ S7-PLC PRO</h3>
              <div className="s7-sales-include-body">
                <div className="s7-sales-include-media s7-sales-app-media">
                  <p className="s7-sales-include-preview-label">
                    <ScanSearch size={16} aria-hidden="true" /> Explora capturas reales de la app
                  </p>
                  <ManualFlipbook
                    images={s7AppCarousel.map((s) => s.image)}
                    pages={s7AppCarousel}
                    variant="card"
                    orientation="landscape"
                    altPrefix="Captura real de BOJ S7-PLC PRO"
                  />
                </div>
                <div className="s7-sales-app-copy">
                  <p className="s7-sales-app-lead">
                    Tu <strong>copiloto de diagnóstico</strong> frente al tablero: ordena síntomas, LEDs, hipótesis y verificaciones, paso a paso.
                  </p>
                  <div className="s7-sales-app-specs">
                    {appHighlights.map((item) => (
                      <span className="s7-sales-app-spec" key={item.label}>
                        <Icon name={item.icon} size={18} />
                        {item.label}
                      </span>
                    ))}
                  </div>
                  <div className="s7-sales-app-features">
                    <p className="s7-sales-app-features-title">Con la app PRO puedes:</p>
                    <ul>
                      {appIncludes.map((item) => (
                        <li key={item}>
                          <CheckCircle2 size={17} aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Slot del video demo (bloque 3A): se activa cargando
              offer.course.demoVideoUrl; con "" no se renderiza nada. */}
          {offer.course.demoVideoUrl ? (
            <div className="s7-sales-demo-video">
              <p className="s7-sales-include-preview-label">
                <ScanSearch size={16} aria-hidden="true" /> Consulta el sistema en acción
              </p>
              <div className="s7-sales-demo-video-frame">
                <iframe
                  src={offer.course.demoVideoUrl}
                  title="Video demo del sistema de diagnóstico BOJ"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <div className="s7-sales-confidence" data-surface="dark">
        <div className="s7-sales-container">
          <Icon name="ShieldCheck" size={26} />
          <p>Conéctate al PLC con confianza y diagnostica con <strong>criterio profesional.</strong></p>
        </div>
      </div>

      <section className="s7-sales-section s7-sales-program" id="curso-s7-programa" data-surface="light">
        <div className="s7-sales-container">
          <div className="s7-sales-section-heading">
            <p className="s7-sales-kicker">Programa del curso</p>
            <h2>El temario sigue la lógica real de un diagnóstico en planta.</h2>
          </div>
          <ol className="s7-sales-program-grid">
            {course.modules.map((module, index) => (
              <li className="s7-sales-program-item" key={module}>
                <span className="s7-sales-program-num">{String(index + 1).padStart(2, "0")}</span>
                <span>{module}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="s7-sales-section s7-sales-dark s7-sales-audience" data-surface="dark">
        <div className="s7-sales-container">
          <div className="s7-sales-section-heading s7-sales-section-heading-compact">
            <p className="s7-sales-kicker">Para quién es</p>
            <h2>Pensado para quienes tienen que resolver fallas reales con presión de producción, poco tiempo y síntomas incompletos.</h2>
          </div>
          <div className="s7-sales-audience-grid">
            {audienceItems.map((item) => (
              <article className="s7-sales-audience-card" key={item.title}>
                <Icon name={item.icon} size={42} />
                <h3>{item.title}</h3>
              </article>
            ))}
          </div>
          <p className="s7-sales-audience-note">No reemplaza la experiencia en campo: la ordena y la refuerza.</p>
        </div>
      </section>

      <section className="s7-sales-section s7-sales-instructor" data-surface="light">
        <div className="s7-sales-container s7-sales-instructor-grid">
          <img
            className="s7-sales-instructor-avatar"
            src={walterBojAvatar}
            alt="Walter Adrián Boj, especialista en automatización y diagnóstico de PLC Siemens"
            width="1086"
            height="1448"
            loading="lazy"
            decoding="async"
          />
          <div className="s7-sales-instructor-copy">
            <p className="s7-sales-kicker">Quién te enseña</p>
            <h2>Walter Adrián Boj</h2>
            <p>
              Especialista en automatización industrial y diagnóstico de PLC Siemens, con más de 15 años en planta:
              mantenimiento, programación, redes industriales, migraciones y fallas reales en S7-300/400. Este curso es
              el método que aplico en campo, no teoría de manual.
            </p>
            <a className="s7-sales-btn s7-sales-btn-secondary" href={contact.linkedin} target="_blank" rel="noreferrer">
              Ver perfil profesional
            </a>
          </div>
        </div>
      </section>

      <section className="s7-sales-section s7-sales-offer" id="curso-s7-compra" data-surface="dark">
        <div className="s7-sales-container">
          <div className="s7-sales-offer-heading">
            <p className="s7-sales-kicker">Accede al curso + BOJ S7-PLC PRO</p>
            <h2>Una oferta técnica para ordenar el diagnóstico antes de intervenir.</h2>
            <p>Una parada de máquina puede costar más que esta formación. El objetivo es que sepas ordenar el diagnóstico antes de cambiar hardware, reiniciar equipos o intervenir sin evidencia.</p>
          </div>

          <div className="s7-sales-offer-panel">
            <div className="s7-sales-offer-summary">
              <div className="s7-sales-offer-product">
                <span className="s7-sales-launch">
                  <CheckCircle2 size={15} aria-hidden="true" /> Pago único · curso con acceso permanente
                </span>
                <p className="s7-sales-kicker">Curso + licencia</p>
                <h2>Curso Diagnóstico S7-300/400 + APP PRO</h2>
                <span className="s7-sales-offer-tagline">Incluye 1 mes de BOJ S7-PLC PRO</span>
              </div>

              <div className="s7-sales-offer-price">
                <span className="s7-sales-offer-regular">Pago único</span>
                <strong>{offer.course.price}</strong>
                <p>Acceso permanente al curso + herramienta PRO por 1 mes.</p>
                <div className="s7-sales-valuestack">
                  <div className="s7-sales-valuestack-row">
                    <span>App BOJ S7-PLC PRO — 1 mes</span>
                    <span className="s7-sales-valuestack-value">vale 59 USD</span>
                  </div>
                  <div className="s7-sales-valuestack-row">
                    <span>Curso completo + Método BOJ</span>
                    <span className="s7-sales-valuestack-value">incluido</span>
                  </div>
                  <div className="s7-sales-valuestack-total">
                    <span>Pago único</span>
                    <strong>{offer.course.price}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="s7-sales-offer-content">
              <div className="s7-sales-offer-content-heading">
                <p className="s7-sales-kicker">Contenido de la oferta</p>
                <h3>Todo lo que recibes</h3>
              </div>

              <div className="s7-sales-offer-groups">
                <div className="s7-sales-offer-group">
                  <div className="s7-sales-offer-group-heading">
                    <Icon name="GraduationCap" size={22} />
                    <h4>Formación técnica</h4>
                  </div>
                  <ul className="s7-sales-offer-list">
                    {offerIncludes.slice(0, 5).map((item) => (
                      <li key={item}>
                        <CheckCircle2 size={18} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="s7-sales-offer-group s7-sales-offer-group-app">
                  <div className="s7-sales-offer-group-heading">
                    <Icon name="Smartphone" size={22} />
                    <h4>App PRO incluida</h4>
                  </div>
                  <ul className="s7-sales-offer-list">
                    {offerIncludes.slice(5).map((item) => (
                      <li key={item}>
                        <CheckCircle2 size={18} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* "Cómo funciona la compra" (bloque 3A): copy del flujo DEFINITIVO
                (Hotmart). Solo se renderiza con el flujo validado E2E
                (checkout live + flowValidated, corte del bloque 3B). */}
            {purchaseTarget.isFlowValidated ? (
              <div className="s7-sales-offer-process">
                <div className="s7-sales-offer-process-heading">
                  <p className="s7-sales-kicker">Compra y acceso</p>
                  <h3>Cómo funciona</h3>
                </div>
                <ol className="s7-sales-howto">
                  <li>
                    <strong>Pago seguro con Hotmart.</strong>
                    <span>Proceso de pago cifrado, con tarjeta y los medios de pago disponibles en tu país.</span>
                  </li>
                  <li>
                    <strong>Entrega digital.</strong>
                    <span>Al acreditarse el pago, recibes en tu correo electrónico el acceso al material.</span>
                  </li>
                  <li>
                    <strong>Activación de tu mes de App PRO.</strong>
                    <span>Con el mismo correo electrónico de la compra. Garantía de 7 días.</span>
                  </li>
                </ol>
              </div>
            ) : null}

            <div className="s7-sales-offer-decision">
              <div className="s7-sales-offer-actions">
                <PurchaseCTA source="offer" className="s7-sales-btn s7-sales-btn-primary">
                  Comprar curso + APP PRO
                </PurchaseCTA>
                <a
                  className="s7-sales-btn s7-sales-btn-secondary"
                  href={appProductUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track("app_trial_click", { source: "offer" })}
                >
                  Probar APP durante 48 horas
                </a>
              </div>
              <div className="s7-sales-offer-decision-copy">
                <p className="s7-sales-offer-guarantee">
                  <ShieldCheck size={18} aria-hidden="true" />
                  {guaranteeNote}
                </p>
                <p className="s7-sales-offer-crosslink">
                  ¿Vas a utilizar la app de forma recurrente o en equipo? Consulta los{" "}
                  <a href="/app">planes PRO (6 meses / varios dispositivos)</a>.
                </p>
                <p className="s7-sales-offer-note">Acceso digital. Verifica siempre las conclusiones en campo antes de intervenir.</p>
              </div>
            </div>

            <p className="s7-sales-offer-anchor">
              <TriangleAlert size={18} aria-hidden="true" />
              <span>
                ¿Cuánto cuesta una hora de línea parada en tu planta? Casi siempre, mucho más que esto. Un solo
                módulo cambiado a ciegas ya vale más que el curso completo.
              </span>
            </p>
          </div>
        </div>
      </section>

      <S7MethodStrip />

      <section className="s7-sales-section s7-sales-dark s7-sales-problem" data-surface="dark">
        <div className="s7-sales-container s7-sales-problem-grid">
          <div className="s7-sales-section-copy">
            <p className="s7-sales-kicker">Qué problema resuelve</p>
            <h2>No es un curso de programación. Es para diagnosticar fallas reales en condiciones de planta.</h2>
            <p>Aprende a pensar como un técnico experto cuando la máquina está detenida y la presión operativa es alta.</p>
          </div>
          <div className="s7-sales-problem-cards">
            {problemCards.map((item) => (
              <article className="s7-sales-light-card" key={item.title}>
                <Icon name={item.icon} size={46} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="s7-sales-section s7-sales-mistakes s7-sales-mistakes-light" data-surface="light">
        <div className="s7-sales-container s7-sales-problem-grid">
          <div className="s7-sales-section-copy">
            <p className="s7-sales-kicker">Errores que este curso ayuda a evitar</p>
            <h2>Diagnosticar con método evita decisiones costosas.</h2>
          </div>
          <div className="s7-sales-problem-cards s7-sales-mistakes-cards">
            {mistakes.map((item) => (
              <article className="s7-sales-light-card" key={item}>
                <TriangleAlert size={46} aria-hidden="true" />
                <h3>{item}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <S7Testimonials background="dark" />

      <section className="s7-sales-section s7-sales-faq" data-surface="light">
        <div className="s7-sales-container">
          <div className="s7-sales-section-heading">
            <p className="s7-sales-kicker">Preguntas frecuentes</p>
            <h2>Antes de comprar el curso</h2>
          </div>
          <div className="s7-sales-faq-grid">
            {courseFaqColumns.map((column, columnIndex) => (
              <div className="s7-sales-faq-column" key={`faq-column-${columnIndex + 1}`}>
                {column.map((item) => (
                  <details className="s7-sales-faq-item" key={item.question}>
                    <summary>
                      <span>{item.question}</span>
                      <ChevronDown size={18} aria-hidden="true" />
                    </summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="s7-sales-final-cta" data-surface="dark">
        <div className="s7-sales-container">
          <div className="s7-sales-final-cta-panel">
            <div className="s7-sales-final-intro">
              <p className="s7-sales-final-headline">Si trabajas con PLC Siemens S7-300/400 y necesitas diagnosticar con mayor criterio, este curso te ofrece método, estructura y apoyo técnico para intervenir mejor.</p>
              <span className="s7-sales-final-divider" aria-hidden="true" />
              <p className="s7-sales-final-guarantee">
                <ShieldCheck size={18} aria-hidden="true" />
                {guaranteeNote}
              </p>
            </div>
            <div className="s7-sales-final-col">
              <PurchaseCTA source="final_cta" className="s7-sales-btn s7-sales-btn-primary s7-sales-final-primary">
                Comprar curso + APP PRO — {offer.course.price}
              </PurchaseCTA>
              <div className="s7-sales-final-secondary-row">
                <a className="s7-sales-btn s7-sales-btn-secondary" href="/cursos/s7-300-400" onClick={(event) => scrollToCourseSection(event, "curso-s7-incluye")}>
                  Ver qué incluye
                </a>
                <a
                  className="s7-sales-btn s7-sales-btn-secondary"
                  href={appProductUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track("app_trial_click", { source: "final" })}
                >
                  Probar APP durante 48 horas
                </a>
              </div>
              <p className="s7-sales-final-note"><span>Acceso digital · Curso + APP PRO</span></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const localizedS7SalesCopy = {
  en: {
    pageClass: "english-page",
    route: "/en/courses/s7-300-400",
    includesId: "en-course-includes",
    programId: "en-course-program",
    purchaseId: "en-course-purchase",
    eyebrow: "INDUSTRIAL DIAGNOSTICS · BOJ METHOD",
    title: "Diagnose real Siemens S7-300/400 faults with method and evidence",
    subtitle: "Learn a practical sequence for interpreting symptoms, gathering evidence and narrowing down the probable cause across CPUs, PROFIBUS, modules and field signals. Course materials are currently available in Spanish.",
    buy: "Buy course + PRO App",
    viewIncludes: "See what is included",
    note: "Course language: Spanish · One-time payment · Permanent course access · 1 month of BOJ S7-PLC PRO · 1 device",
    heroPreviewAria: "Course offer preview",
    manualAlt: "Cover of the S7-300/400 diagnostics manual",
    manualLabel: "Professional technical manual",
    bundleLabel: "COURSE + PRO APP",
    paymentMeta: "One-time payment · Permanent course access",
    heroBullets: ["Applied diagnostics method", "1 month of BOJ S7-PLC PRO"],
    learningKicker: "What you will learn",
    includesKicker: "What is included",
    includesTitle: "Applied training plus a professional tool for clearer Siemens S7-300/400 diagnostics.",
    courseCardTitle: "Applied S7-300/400 course",
    manualPreview: "Preview the first 8 pages of the manual",
    experienceNote: "Built on more than 15 years of industrial automation, maintenance and diagnostics experience.",
    appCardTitle: "PRO APP — 1 month of BOJ S7-PLC PRO",
    appPreview: "Explore real views of the app",
    appLead: "Your diagnostic copilot at the control panel: it organizes symptoms, LEDs, hypotheses and checks step by step.",
    appFeaturesTitle: "With the PRO App you can:",
    appFeatures: ["Diagnose by symptoms, LEDs, network, modules and signals", "Review prioritized technical hypotheses", "Follow step-by-step checks", "Use it offline for up to 2 days", "Access it from a browser or install it as an app"],
    confidence: "Connect to the PLC with confidence and diagnose with professional judgment.",
    programKicker: "Course program",
    programTitle: "The syllabus follows the real logic of an industrial diagnosis.",
    audienceKicker: "Who it is for",
    audienceTitle: "For people who solve real faults under production pressure, with limited time and incomplete symptoms.",
    audienceNote: "It does not replace field experience: it organizes and reinforces it.",
    audienceExtra: ["Industrial electricians", "Technical training centers"],
    instructorKicker: "Your instructor",
    instructorText: "Walter Adrián Boj is an industrial automation and Siemens PLC diagnostics specialist with more than 15 years of plant experience in maintenance, programming, industrial networks, migrations and real S7-300/400 faults.",
    profile: "View professional profile",
    offerKicker: "Access the course + BOJ S7-PLC PRO",
    offerTitle: "A technical offer for organizing the diagnosis before intervening.",
    offerText: "A stopped machine can cost more than this training. The objective is to investigate before changing hardware, restarting equipment or intervening without evidence.",
    oneTime: "One-time payment",
    permanent: "Permanent course access",
    offerProduct: "S7-300/400 Diagnostics Course + PRO APP",
    offerTagline: "Includes 1 month of BOJ S7-PLC PRO",
    offerAccess: "Permanent course access + PRO tool for 1 month.",
    offerContent: "Everything you receive",
    appIncluded: "PRO App included",
    trial: "Try the App for 48 hours",
    offerNote: "Digital access. Always verify conclusions in the field before intervening.",
    plansLead: "Will you use the app regularly or with a team?",
    plansLink: "View PRO plans",
    plansHref: "/en/app",
    methodKicker: "The BOJ Method",
    methodTitle: "From the symptom to a probable cause, with evidence instead of trial and error.",
    methodText: "A repeatable sequence created from real plant work for situations where the machine is stopped and time is limited.",
    methodSteps: [
      ["FileSearch", "Observe", "Record symptoms, LEDs and operating conditions."],
      ["ClipboardCheck", "Organize", "Separate CPU, network, module, signal and process evidence."],
      ["Brain", "Prioritize", "Build a defensible technical hypothesis."],
      ["ShieldCheck", "Verify", "Check the evidence before intervening."],
    ],
    problemKicker: "What problem it solves",
    problemTitle: "This is not a generic programming course. It is designed for real plant diagnostics.",
    problemText: "Develop a clearer technical response when production pressure is high.",
    mistakesKicker: "Mistakes this course helps prevent",
    mistakesTitle: "A structured diagnosis avoids costly decisions.",
    mistakes: ["Losing time through trial and error", "Changing modules without a clear hypothesis", "Misreading LEDs and CPU states", "Missing PROFIBUS network faults", "Failing to record symptoms and evidence", "Making the problem worse through an unplanned intervention"],
    faqKicker: "Frequently asked questions",
    faqTitle: "Before purchasing the course",
    finalText: "If you work with Siemens S7-300/400 PLCs and need clearer diagnostic judgment, this course gives you a method, structure and technical support for better interventions.",
    digitalNote: "Digital access · Course + PRO App",
  },
  pt: {
    pageClass: "portuguese-page",
    route: "/pt/cursos/s7-300-400",
    includesId: "pt-curso-inclui",
    programId: "pt-curso-programa",
    purchaseId: "pt-compra-curso",
    eyebrow: "DIAGNÓSTICO INDUSTRIAL · MÉTODO BOJ",
    title: "Diagnostique falhas reais em Siemens S7-300/400 com método e evidências",
    subtitle: "Aprenda uma sequência prática para interpretar sintomas, reunir evidências e delimitar a causa provável em CPUs, PROFIBUS, módulos e sinais de campo. O conteúdo do curso está disponível em espanhol.",
    buy: "Comprar curso + App PRO",
    viewIncludes: "Ver o que está incluído",
    note: "Idioma do curso: espanhol · Pagamento único · Acesso permanente · 1 mês de BOJ S7-PLC PRO · 1 dispositivo",
    heroPreviewAria: "Resumo da oferta do curso",
    manualAlt: "Capa do manual de diagnóstico S7-300/400",
    manualLabel: "Manual técnico profissional",
    bundleLabel: "CURSO + APP PRO",
    paymentMeta: "Pagamento único · Acesso permanente ao curso",
    heroBullets: ["Método de diagnóstico aplicado", "1 mês de BOJ S7-PLC PRO"],
    learningKicker: "O que você vai aprender",
    includesKicker: "O que está incluído",
    includesTitle: "Formação aplicada e uma ferramenta profissional para diagnosticar Siemens S7-300/400 com mais critério.",
    courseCardTitle: "Curso aplicado S7-300/400",
    manualPreview: "Consulte as primeiras 8 páginas do manual",
    experienceNote: "Baseado em mais de 15 anos de experiência em automação, manutenção e diagnóstico industrial.",
    appCardTitle: "APP PRO — 1 mês de BOJ S7-PLC PRO",
    appPreview: "Explore imagens reais do app",
    appLead: "Seu copiloto de diagnóstico diante do painel: organiza sintomas, LEDs, hipóteses e verificações passo a passo.",
    appFeaturesTitle: "Com o App PRO você pode:",
    appFeatures: ["Diagnosticar por sintomas, LEDs, rede, módulos e sinais", "Revisar hipóteses técnicas priorizadas", "Seguir verificações passo a passo", "Usar offline por até 2 dias", "Acessar pelo navegador ou instalar como app"],
    confidence: "Conecte-se ao PLC com confiança e diagnostique com critério profissional.",
    programKicker: "Programa do curso",
    programTitle: "O conteúdo segue a lógica real de um diagnóstico em planta.",
    audienceKicker: "Para quem é",
    audienceTitle: "Para quem resolve falhas reais sob pressão de produção, com pouco tempo e sintomas incompletos.",
    audienceNote: "Não substitui a experiência em campo: organiza e reforça essa experiência.",
    audienceExtra: ["Eletricistas industriais", "Centros de formação técnica"],
    instructorKicker: "Quem ensina",
    instructorText: "Walter Adrián Boj é especialista em automação industrial e diagnóstico de PLC Siemens, com mais de 15 anos de experiência em planta, manutenção, programação, redes industriais, migrações e falhas reais em S7-300/400.",
    profile: "Ver perfil profissional",
    offerKicker: "Acesse o curso + BOJ S7-PLC PRO",
    offerTitle: "Uma oferta técnica para organizar o diagnóstico antes de intervir.",
    offerText: "Uma máquina parada pode custar mais do que esta formação. O objetivo é investigar antes de trocar hardware, reiniciar equipamentos ou intervir sem evidências.",
    oneTime: "Pagamento único",
    permanent: "Acesso permanente ao curso",
    offerProduct: "Curso Diagnóstico S7-300/400 + APP PRO",
    offerTagline: "Inclui 1 mês de BOJ S7-PLC PRO",
    offerAccess: "Acesso permanente ao curso + ferramenta PRO por 1 mês.",
    offerContent: "Tudo o que você recebe",
    appIncluded: "App PRO incluído",
    trial: "Testar o App por 48 horas",
    offerNote: "Acesso digital. Sempre verifique as conclusões em campo antes de intervir.",
    plansLead: "Vai usar o app com frequência ou em equipe?",
    plansLink: "Ver planos PRO",
    plansHref: "/pt/app",
    methodKicker: "O Método BOJ",
    methodTitle: "Do sintoma à causa provável, com evidências em vez de tentativa e erro.",
    methodText: "Uma sequência repetível criada em trabalhos reais de planta para situações em que a máquina está parada e o tempo é limitado.",
    methodSteps: [
      ["FileSearch", "Observar", "Registre sintomas, LEDs e condições de operação."],
      ["ClipboardCheck", "Organizar", "Separe evidências da CPU, rede, módulos, sinais e processo."],
      ["Brain", "Priorizar", "Construa uma hipótese técnica defensável."],
      ["ShieldCheck", "Verificar", "Confirme as evidências antes de intervir."],
    ],
    problemKicker: "Que problema resolve",
    problemTitle: "Não é um curso genérico de programação. Foi desenvolvido para diagnósticos reais de planta.",
    problemText: "Construa uma resposta técnica mais clara quando a pressão de produção for alta.",
    mistakesKicker: "Erros que este curso ajuda a evitar",
    mistakesTitle: "Um diagnóstico estruturado evita decisões caras.",
    mistakes: ["Perder tempo por tentativa e erro", "Trocar módulos sem uma hipótese clara", "Interpretar incorretamente LEDs e estados da CPU", "Não detectar falhas na rede PROFIBUS", "Não registrar sintomas e evidências", "Agravar o problema com uma intervenção sem planejamento"],
    faqKicker: "Perguntas frequentes",
    faqTitle: "Antes de comprar o curso",
    finalText: "Se você trabalha com PLC Siemens S7-300/400 e precisa de mais critério no diagnóstico, este curso oferece método, estrutura e apoio técnico para intervir melhor.",
    digitalNote: "Acesso digital · Curso + App PRO",
  },
};

function LocalizedS7MethodStrip({ copy, language }) {
  return (
    <section className={`s7-sales-section s7-method localized-s7-method-${language}`} data-surface="light">
      <div className="s7-sales-container">
        <div className="s7-sales-section-heading">
          <p className="s7-sales-kicker">{copy.methodKicker}</p>
          <h2>{copy.methodTitle}</h2>
          <p className="s7-method-lead">{copy.methodText}</p>
        </div>
        <div className="s7-method-grid">
          {copy.methodSteps.map(([icon, title, text], index) => (
            <div className="s7-method-step-wrap" key={title}>
              <article className="s7-method-step">
                <span className="s7-method-num">{String(index + 1).padStart(2, "0")}</span>
                <span className="s7-method-icon"><Icon name={icon} size={26} /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
              {index < copy.methodSteps.length - 1 ? <span className="s7-method-arrow" aria-hidden="true"><ArrowRight size={22} /></span> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LocalizedS7SalesLanding({ language, courseCopy }) {
  const copy = localizedS7SalesCopy[language];
  const checkoutUrl = offer.course.checkout.checkoutUrl;
  const checkoutAction = (source) => () => track("course_checkout_click", { source, language });
  const learningIcons = ["Cable", "MonitorCog", "Cpu", "ClipboardCheck", "Network", "CircuitBoard", "Brain", "RefreshCcw"];
  const audienceIcons = ["Wrench", "Gauge", "Cpu", "Building2", "Zap", "GraduationCap"];
  const audience = [...courseCopy.audience, ...copy.audienceExtra];
  const problemCards = [...courseCopy.outcomes, ...courseCopy.includes.slice(0, 2)].map((text, index) => ({
    icon: ["Zap", "MonitorCog", "Clock", "ShieldCheck", "Network", "ClipboardCheck"][index],
    title: index < courseCopy.outcomes.length ? text : courseCopy.includes[index - courseCopy.outcomes.length],
    text: index < courseCopy.outcomes.length ? copy.problemText : copy.experienceNote,
  }));
  const faqColumns = [
    courseCopy.faq.filter((_, index) => index % 2 === 0),
    courseCopy.faq.filter((_, index) => index % 2 === 1),
  ];
  const manualPages = s7ManualPages.map((page, index) => ({ ...page, label: `${language === "en" ? "Page" : "Página"} ${index + 1}` }));
  const appPages = s7AppCarousel.map((item, index) => ({ ...item, label: `${language === "en" ? "App view" : "Tela do app"} ${index + 1}` }));

  return (
    <div className={`s7-sales-page ${copy.pageClass}`} data-language={language}>
      <Hero
        image={heroCursoS7}
        eyebrow={copy.eyebrow}
        title={copy.title}
        subtitle={copy.subtitle}
        primary={{ label: copy.buy, href: checkoutUrl, external: true, onClick: checkoutAction(`${language}_course_hero`) }}
        secondary={{ label: copy.viewIncludes, href: `#${copy.includesId}` }}
        note={copy.note}
        aside={(
          <aside className="course-hero-preview" aria-label={copy.heroPreviewAria}>
            <div className="course-hero-preview-media"><img src={manualPreviewImages[0]} alt={copy.manualAlt} width="1100" height="1556" decoding="async" /><span>{copy.manualLabel}</span></div>
            <div className="course-hero-preview-copy"><span>{copy.bundleLabel}</span><strong>{offer.course.price}</strong><small>{copy.paymentMeta}</small><ul>{copy.heroBullets.map((item) => <li key={item}><CheckCircle2 size={15} />{item}</li>)}</ul></div>
          </aside>
        )}
      />

      <S7ProofStrip language={language} />

      <section className={`s7-sales-section s7-sales-dark s7-sales-learning localized-s7-${language}`} data-surface="dark">
        <div className="s7-sales-container">
          <div className="s7-sales-centered-heading"><h2 className="s7-sales-kicker">{copy.learningKicker}</h2></div>
          <div className="s7-sales-learning-grid">
            {courseCopy.modules.map((item, index) => <article className="s7-sales-dark-card" key={item}><Icon name={learningIcons[index]} size={34} /><div><h3>{item}</h3><p>{courseCopy.outcomes[index % courseCopy.outcomes.length]}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className={`s7-sales-section s7-sales-includes localized-s7-${language}`} id={copy.includesId} data-surface="light">
        <div className="s7-sales-container">
          <div className="s7-sales-section-heading"><p className="s7-sales-kicker">{copy.includesKicker}</p><h2>{copy.includesTitle}</h2></div>
          <div className="s7-sales-include-grid">
            <article className="s7-sales-include-card s7-sales-include-course">
              <span className="s7-sales-include-number">1</span><h3>{copy.courseCardTitle}</h3>
              <div className="s7-sales-include-body">
                <div className="s7-sales-include-media"><p className="s7-sales-include-preview-label"><ScanSearch size={16} aria-hidden="true" /> {copy.manualPreview}</p><ManualFlipbook images={manualPreviewImages} pages={manualPages} variant="card" language={language} /></div>
                <div className="s7-sales-include-main"><div className="s7-sales-include-list">{courseCopy.includes.map((item) => <div className="s7-sales-include-item" key={item}><CheckCircle2 size={20} aria-hidden="true" /><div><h4>{item}</h4></div></div>)}</div><p className="s7-sales-include-note">{copy.experienceNote}</p></div>
              </div>
            </article>
            <span className="s7-sales-plus" aria-hidden="true">+</span>
            <article className="s7-sales-include-card s7-sales-include-app">
              <span className="s7-sales-include-number">2</span><h3>{copy.appCardTitle}</h3>
              <div className="s7-sales-include-body">
                <div className="s7-sales-include-media s7-sales-app-media"><p className="s7-sales-include-preview-label"><ScanSearch size={16} aria-hidden="true" /> {copy.appPreview}</p><ManualFlipbook images={s7AppCarousel.map((item) => item.image)} pages={appPages} variant="card" orientation="landscape" language={language} /></div>
                <div className="s7-sales-app-copy"><p className="s7-sales-app-lead">{copy.appLead}</p><div className="s7-sales-app-specs"><span className="s7-sales-app-spec"><CalendarCheck size={18} />1 {language === "en" ? "month" : "mês"}</span><span className="s7-sales-app-spec"><Smartphone size={18} />1 {language === "en" ? "device" : "dispositivo"}</span></div><div className="s7-sales-app-features"><p className="s7-sales-app-features-title">{copy.appFeaturesTitle}</p><ul>{copy.appFeatures.map((item) => <li key={item}><CheckCircle2 size={17} aria-hidden="true" /><span>{item}</span></li>)}</ul></div></div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <div className="s7-sales-confidence" data-surface="dark"><div className="s7-sales-container"><ShieldCheck size={26} /><p>{copy.confidence}</p></div></div>

      <section className={`s7-sales-section s7-sales-program localized-s7-${language}`} id={copy.programId} data-surface="light">
        <div className="s7-sales-container"><div className="s7-sales-section-heading"><p className="s7-sales-kicker">{copy.programKicker}</p><h2>{copy.programTitle}</h2></div><ol className="s7-sales-program-grid">{courseCopy.modules.map((module, index) => <li className="s7-sales-program-item" key={module}><span className="s7-sales-program-num">{String(index + 1).padStart(2, "0")}</span><span>{module}</span></li>)}</ol></div>
      </section>

      <section className={`s7-sales-section s7-sales-dark s7-sales-audience localized-s7-${language}`} data-surface="dark">
        <div className="s7-sales-container"><div className="s7-sales-section-heading s7-sales-section-heading-compact"><p className="s7-sales-kicker">{copy.audienceKicker}</p><h2>{copy.audienceTitle}</h2></div><div className="s7-sales-audience-grid">{audience.map((item, index) => <article className="s7-sales-audience-card" key={item}><Icon name={audienceIcons[index]} size={42} /><h3>{item}</h3></article>)}</div><p className="s7-sales-audience-note">{copy.audienceNote}</p></div>
      </section>

      <section className={`s7-sales-section s7-sales-instructor localized-s7-${language}`} data-surface="light">
        <div className="s7-sales-container s7-sales-instructor-grid"><img className="s7-sales-instructor-avatar" src={walterBojAvatar} alt="Walter Adrián Boj" width="1086" height="1448" loading="lazy" decoding="async" /><div className="s7-sales-instructor-copy"><p className="s7-sales-kicker">{copy.instructorKicker}</p><h2>Walter Adrián Boj</h2><p>{copy.instructorText}</p><a className="s7-sales-btn s7-sales-btn-secondary" href={contact.linkedin} target="_blank" rel="noreferrer">{copy.profile}</a></div></div>
      </section>

      <section className={`s7-sales-section s7-sales-offer localized-s7-${language}`} id={copy.purchaseId} data-surface="dark">
        <div className="s7-sales-container">
          <div className="s7-sales-offer-heading"><p className="s7-sales-kicker">{copy.offerKicker}</p><h2>{copy.offerTitle}</h2><p>{copy.offerText}</p></div>
          <div className="s7-sales-offer-panel">
            <div className="s7-sales-offer-summary"><div className="s7-sales-offer-product"><span className="s7-sales-launch"><CheckCircle2 size={15} aria-hidden="true" /> {copy.oneTime} · {copy.permanent}</span><p className="s7-sales-kicker">{copy.bundleLabel}</p><h2>{copy.offerProduct}</h2><span className="s7-sales-offer-tagline">{copy.offerTagline}</span></div><div className="s7-sales-offer-price"><span className="s7-sales-offer-regular">{copy.oneTime}</span><strong>{offer.course.price}</strong><p>{copy.offerAccess}</p></div></div>
            <div className="s7-sales-offer-content"><div className="s7-sales-offer-content-heading"><p className="s7-sales-kicker">{copy.includesKicker}</p><h3>{copy.offerContent}</h3></div><div className="s7-sales-offer-groups"><div className="s7-sales-offer-group"><div className="s7-sales-offer-group-heading"><GraduationCap size={22} /><h4>{copy.courseCardTitle}</h4></div><ul className="s7-sales-offer-list">{courseCopy.includes.map((item) => <li key={item}><CheckCircle2 size={18} aria-hidden="true" /><span>{item}</span></li>)}</ul></div><div className="s7-sales-offer-group s7-sales-offer-group-app"><div className="s7-sales-offer-group-heading"><Smartphone size={22} /><h4>{copy.appIncluded}</h4></div><ul className="s7-sales-offer-list">{copy.appFeatures.slice(0, 3).map((item) => <li key={item}><CheckCircle2 size={18} aria-hidden="true" /><span>{item}</span></li>)}</ul></div></div></div>
            <div className="s7-sales-offer-decision"><div className="s7-sales-offer-actions"><a className="s7-sales-btn s7-sales-btn-primary" href={checkoutUrl} target="_blank" rel="noreferrer" onClick={checkoutAction(`${language}_course_offer`)}>{copy.buy}</a><a className="s7-sales-btn s7-sales-btn-secondary" href={appProductUrl} target="_blank" rel="noreferrer" onClick={() => track("app_trial_click", { source: "course_offer", language })}>{copy.trial}</a></div><div className="s7-sales-offer-decision-copy"><p className="s7-sales-offer-guarantee"><ShieldCheck size={18} aria-hidden="true" />{copy.note}</p><p className="s7-sales-offer-crosslink">{copy.plansLead} <a href={copy.plansHref}>{copy.plansLink}</a>.</p><p className="s7-sales-offer-note">{copy.offerNote}</p></div></div>
          </div>
        </div>
      </section>

      <LocalizedS7MethodStrip copy={copy} language={language} />

      <section className={`s7-sales-section s7-sales-dark s7-sales-problem localized-s7-${language}`} data-surface="dark">
        <div className="s7-sales-container s7-sales-problem-grid"><div className="s7-sales-section-copy"><p className="s7-sales-kicker">{copy.problemKicker}</p><h2>{copy.problemTitle}</h2><p>{copy.problemText}</p></div><div className="s7-sales-problem-cards">{problemCards.map((item) => <article className="s7-sales-light-card" key={item.title}><Icon name={item.icon} size={46} /><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></div>
      </section>

      <section className={`s7-sales-section s7-sales-mistakes s7-sales-mistakes-light localized-s7-${language}`} data-surface="light">
        <div className="s7-sales-container s7-sales-problem-grid"><div className="s7-sales-section-copy"><p className="s7-sales-kicker">{copy.mistakesKicker}</p><h2>{copy.mistakesTitle}</h2></div><div className="s7-sales-problem-cards s7-sales-mistakes-cards">{copy.mistakes.map((item) => <article className="s7-sales-light-card" key={item}><TriangleAlert size={46} aria-hidden="true" /><h3>{item}</h3></article>)}</div></div>
      </section>

      <S7Testimonials background="dark" language={language} />

      <section className={`s7-sales-section s7-sales-faq localized-s7-${language}`} data-surface="light">
        <div className="s7-sales-container"><div className="s7-sales-section-heading"><p className="s7-sales-kicker">{copy.faqKicker}</p><h2>{copy.faqTitle}</h2></div><div className="s7-sales-faq-grid">{faqColumns.map((column, columnIndex) => <div className="s7-sales-faq-column" key={`${language}-faq-${columnIndex + 1}`}>{column.map((item) => <details className="s7-sales-faq-item" key={item.question}><summary><span>{item.question}</span><ChevronDown size={18} aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div>)}</div></div>
      </section>

      <section className={`s7-sales-final-cta localized-s7-${language}`} data-surface="dark">
        <div className="s7-sales-container"><div className="s7-sales-final-cta-panel"><div className="s7-sales-final-intro"><p className="s7-sales-final-headline">{copy.finalText}</p><span className="s7-sales-final-divider" aria-hidden="true" /><p className="s7-sales-final-guarantee"><ShieldCheck size={18} aria-hidden="true" />{copy.note}</p></div><div className="s7-sales-final-col"><a className="s7-sales-btn s7-sales-btn-primary s7-sales-final-primary" href={checkoutUrl} target="_blank" rel="noreferrer" onClick={checkoutAction(`${language}_course_final`)}>{copy.buy} — {offer.course.price}</a><div className="s7-sales-final-secondary-row"><a className="s7-sales-btn s7-sales-btn-secondary" href={`#${copy.includesId}`}>{copy.viewIncludes}</a><a className="s7-sales-btn s7-sales-btn-secondary" href={appProductUrl} target="_blank" rel="noreferrer">{copy.trial}</a></div><p className="s7-sales-final-note"><span>{copy.digitalNote}</span></p></div></div></div>
      </section>
    </div>
  );
}

function EnglishS7CoursePage() {
  return <LocalizedS7SalesLanding language="en" courseCopy={englishS7Course} />;
}

function PortugueseS7CoursePage() {
  return <LocalizedS7SalesLanding language="pt" courseCopy={portugueseS7Course} />;
}

function CourseS7Routes({ route }) {
  if (route === "/en/courses/s7-300-400") return <EnglishS7CoursePage />;
  if (route === "/pt/cursos/s7-300-400") return <PortugueseS7CoursePage />;
  return <S7CoursePage />;
}

export default CourseS7Routes;
