import { useState } from "react";
import AccessibleDialog from "../AccessibleDialog.jsx";
import { focusHashTarget } from "../accessibility.js";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  TriangleAlert,
  X,
} from "lucide-react";
import { contact, offer } from "../content.js";
import { englishApp, portugueseApp } from "../i18n.js";
import appProHeroLaptopVisual from "../assets/hero-app.jpg";
import appDiagnosticoGuiado from "../assets/app-diagnostico-guiado.jpg";
import walterBojAvatar from "../assets/walter-boj-avatar-field.jpeg";
import { track } from "../app/shared-eager.jsx";
import { Hero, Icon, S7ProofStrip, S7Testimonials, appLicensePlans, appProductUrl } from "./shared.jsx";

const appProIncludes = [
  {
    icon: "FileSearch",
    title: "Diagnóstico por LEDs y síntomas",
    text: "Interpretación de estados y síntomas típicos.",
  },
  {
    icon: "ClipboardCheck",
    title: "Hipótesis técnicas priorizadas",
    text: "Hipótesis priorizadas según la evidencia disponible y su peso relativo.",
  },
  {
    icon: "ShieldCheck",
    title: "Guía de verificación paso a paso",
    text: "Pasos claros para verificar en campo.",
  },
  {
    icon: "Cpu",
    title: "Orientada a S7-300/400",
    text: "Foco en CPU y módulos Siemens clásicos.",
  },
  {
    icon: "MonitorCog",
    title: "Interfaz web instalable",
    text: "Acceso desde navegador y posibilidad de instalación en dispositivos compatibles.",
  },
  {
    icon: "Settings",
    title: "Apoyo para técnicos y empresas",
    text: "Estandariza diagnóstico y reduce improvisación.",
  },
];

const appProblemItems = [
  { icon: "Cpu", title: "CPU en STOP", text: "CPU detenida sin causa clara." },
  { icon: "Zap", title: "SF / BF activos", text: "Alarmas del sistema o de comunicación activas." },
  { icon: "Network", title: "Fallas de red PROFIBUS", text: "Pérdida de comunicación o equipos no visibles." },
  { icon: "CircuitBoard", title: "Módulos y señales", text: "Módulos sin respuesta, fallas de E/S o señales inconsistentes." },
  { icon: "RefreshCcw", title: "Fallas intermitentes", text: "Comportamientos que aparecen y desaparecen." },
  { icon: "Clock", title: "Bajo presión de producción", text: "Diagnóstico rápido cuando el tiempo es crítico." },
];

const appHowItWorks = [
  {
    icon: "ClipboardCheck",
    title: "Ingresas el síntoma",
    text: "Carga lo que observas en el PLC y en campo.",
  },
  {
    icon: "Brain",
    title: "La app ordena hipótesis",
    text: "Recibes causas posibles priorizadas según la evidencia disponible.",
  },
  {
    icon: "CheckCircle2",
    title: "Verificas en campo",
    text: "Sigues una guía paso a paso para verificar cada causa posible.",
  },
];

const appLanguages = ["Español", "English", "Português", "Deutsch", "Français", "Italiano"];

const appRealViews = [
  {
    title: "Subflujo guiado y diagnóstico por etapas",
    text: "Asistencia paso a paso para aislar fallas en módulos, IM, base y comunicación.",
    image: appDiagnosticoGuiado,
    position: "center top",
  },
];

const appTrialPlan = offer.app.trialPlan;

const appPlanCardIds = {
  "Prueba gratuita": "plan-trial",
  "Suscripción mensual": "plan-subscription-monthly",
  "Mensual de pago único": "plan-monthly-one-time",
  "Profesional": "plan-professional",
  "Empresarial": "plan-company",
};

const appPlanDecisionGuide = [
  {
    context: "Uso continuo",
    title: "Suscripción mensual",
    detail: "Pagas mes a mes y la licencia se renueva hasta que la canceles.",
    target: appPlanCardIds["Suscripción mensual"],
  },
  {
    context: "Trabajo puntual",
    title: "Mensual de pago único",
    detail: "Un mes calendario de acceso sin renovación automática.",
    target: appPlanCardIds["Mensual de pago único"],
  },
  {
    context: "Uso profesional",
    title: "Profesional",
    detail: "Seis meses, dos dispositivos y curso incluido.",
    target: appPlanCardIds.Profesional,
  },
  {
    context: "Equipo técnico",
    title: "Empresarial",
    detail: "Seis meses, diez dispositivos y curso incluido.",
    target: appPlanCardIds.Empresarial,
  },
];

const appAudienceProfiles = [
  { icon: "Wrench", text: "Técnicos de mantenimiento industrial" },
  { icon: "Gauge", text: "Instrumentistas y electricistas de planta" },
  { icon: "Cpu", text: "Automatistas y programadores PLC" },
  { icon: "Factory", text: "Empresas con sistemas Siemens S7-300/400" },
  { icon: "GraduationCap", text: "Centros de formación técnica" },
];

const appAvailabilityItems = [
  { icon: "Globe", title: "Web", text: "Acceso inmediato desde navegador, sin instalación obligatoria." },
  { icon: "Smartphone", title: "Instalable", text: "Acceso directo desde dispositivo compatible para uso más cómodo." },
  { icon: "WifiOff", title: "Sin conexión según el plan", text: "La disponibilidad sin conexión varía según la licencia contratada." },
];

const appTrustMetrics = [
  { icon: "Clock", title: "+15 años", text: "Experiencia en automatización, mantenimiento y diagnóstico industrial." },
  { icon: "Cpu", title: "PLC Siemens", text: "Foco técnico en S7-300/400 y fallas reales de planta." },
  { icon: "ShieldCheck", title: "Miles de fallas", text: "Resueltas y analizadas en entornos industriales." },
  { icon: "ClipboardCheck", title: "Metodología probada", text: "Criterio aplicado en campo para reducir prueba y error." },
];

const appFaqItems = [
  {
    question: "¿Qué incluye la prueba gratuita?",
    answer: "La prueba gratuita permite utilizar BOJ S7-PLC PRO durante 48 horas. Funciona sólo en línea y algunas funciones pueden estar limitadas.",
  },
  {
    question: "¿La app se puede instalar?",
    answer: "Sí. En dispositivos compatibles puede instalarse como aplicación web para acceder más rápido desde el escritorio o la pantalla de inicio.",
  },
  {
    question: "¿Necesito instalar algo para usarla?",
    answer: "No. También puede usarse desde el navegador ingresando a app.bojautomatizacion.com.",
  },
  {
    question: "¿La app funciona sin conexión?",
    answer: "Depende del plan. La prueba gratuita funciona sólo en línea. Suscripción mensual, Mensual de pago único, Curso + licencia y Profesional permiten usarla sin conexión hasta 2 días. Empresarial permite usarla sin conexión hasta 7 días.",
  },
  {
    question: "¿Cuántos dispositivos puedo usar?",
    answer: "Depende del plan. Suscripción mensual, Mensual de pago único y Curso + licencia incluyen 1 dispositivo; Profesional incluye 2 dispositivos y Empresarial incluye 10 dispositivos.",
  },
  {
    question: "¿Qué planes incluyen curso?",
    answer: "Curso + licencia, Profesional y Empresarial incluyen el curso con acceso permanente. Suscripción mensual y Mensual de pago único incluyen solo la app PRO.",
  },
  {
    question: "¿Necesito conectar la app directamente al PLC?",
    answer: "No. La app trabaja con la información que carga el usuario: estado de CPU, LEDs, síntomas, fallas de red, módulos y condiciones observadas en campo.",
  },
  {
    question: "¿La app reemplaza al técnico?",
    answer: "No. BOJ S7-PLC PRO es una herramienta de asistencia técnica. Ayuda a ordenar hipótesis y verificaciones, pero las conclusiones deben ser evaluadas por personal calificado.",
  },
  {
    question: "¿Sirve para Siemens S7-300 y S7-400?",
    answer: "Sí. Está orientada al diagnóstico de sistemas Siemens S7-300/400, especialmente estados de CPU, LEDs, PROFIBUS, módulos y señales asociadas.",
  },
  {
    question: "¿Puedo usarla desde cualquier dispositivo?",
    answer: "Puede usarse desde dispositivos compatibles con navegador moderno. La cantidad de dispositivos habilitados depende del plan contratado.",
  },
  {
    question: "¿Hay planes para empresas o centros de formación?",
    answer: "Sí. Instituciones, empresas y centros de formación pueden solicitar condiciones especiales según cantidad de usuarios, licencias o programa de capacitación.",
  },
];

const appHeroPreviewCopy = {
  es: {
    ariaLabel: "Ejemplo visual del flujo de diagnóstico de BOJ S7-PLC PRO",
    eyebrow: "FLUJO REAL DE LA HERRAMIENTA",
    caseLabel: "CASO GUIADO",
    imageAlt: "Pantalla de diagnóstico guiado de BOJ S7-PLC PRO",
    stages: [
      { label: "Síntoma", value: "CPU STOP + BF" },
      { label: "Hipótesis", value: "Red o nodo remoto" },
      { label: "Verificación", value: "Evidencia priorizada" },
    ],
  },
  en: {
    ariaLabel: "Visual example of the BOJ S7-PLC PRO diagnostic workflow",
    eyebrow: "REAL TOOL WORKFLOW",
    caseLabel: "GUIDED CASE",
    imageAlt: "BOJ S7-PLC PRO guided diagnostic screen",
    stages: [
      { label: "Symptom", value: "CPU STOP + BF" },
      { label: "Hypothesis", value: "Network or remote node" },
      { label: "Verification", value: "Prioritized evidence" },
    ],
  },
  pt: {
    ariaLabel: "Exemplo visual do fluxo de diagnóstico do BOJ S7-PLC PRO",
    eyebrow: "FLUXO REAL DA FERRAMENTA",
    caseLabel: "CASO GUIADO",
    imageAlt: "Tela de diagnóstico guiado do BOJ S7-PLC PRO",
    stages: [
      { label: "Sintoma", value: "CPU STOP + BF" },
      { label: "Hipótese", value: "Rede ou nó remoto" },
      { label: "Verificação", value: "Evidência priorizada" },
    ],
  },
};

function AppHeroDiagnosticPreview({ language = "es" }) {
  const copy = appHeroPreviewCopy[language] || appHeroPreviewCopy.es;

  return (
    <aside className="app-hero-diagnostic-preview" aria-label={copy.ariaLabel}>
      <div className="app-hero-diagnostic-preview-head">
        <span>{copy.eyebrow}</span>
        <small><span aria-hidden="true" /> {copy.caseLabel}</small>
      </div>
      <div className="app-hero-diagnostic-preview-screen">
        <img
          src={appDiagnosticoGuiado}
          alt={copy.imageAlt}
          width="1474"
          height="588"
          decoding="async"
        />
      </div>
      <ol className="app-hero-diagnostic-preview-stages">
        {copy.stages.map((stage, index) => (
          <li key={stage.label}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <small>{stage.label}</small>
              <strong>{stage.value}</strong>
            </div>
          </li>
        ))}
      </ol>
    </aside>
  );
}

const appQuickAccessCopy = {
  es: {
    eyebrow: "EMPIEZA SIN COMPLICACIONES",
    title: "Prueba el flujo y elige la licencia cuando estés listo.",
    trial: "Prueba gratuita",
    trialDuration: "48 horas",
    subscription: "Suscripción",
    subscriptionSuffix: "por mes",
    oneTime: "Pago único",
    oneTimePrefix: "Desde",
    trialButton: "Probar gratis",
    plansButton: "Ver planes y precios",
    plansHref: "#planes-pro",
  },
  en: {
    eyebrow: "START WITHOUT COMPLICATIONS",
    title: "Try the workflow and choose a license when you are ready.",
    trial: "Free trial",
    trialDuration: "48 hours",
    subscription: "Subscription",
    subscriptionSuffix: "per month",
    oneTime: "One-time payment",
    oneTimePrefix: "From",
    trialButton: "Start free trial",
    plansButton: "View plans and pricing",
    plansHref: "#en-pro-plans",
  },
  pt: {
    eyebrow: "COMECE SEM COMPLICAÇÕES",
    title: "Teste o fluxo e escolha a licença quando estiver pronto.",
    trial: "Teste gratuito",
    trialDuration: "48 horas",
    subscription: "Assinatura",
    subscriptionSuffix: "por mês",
    oneTime: "Pagamento único",
    oneTimePrefix: "A partir de",
    trialButton: "Iniciar teste gratuito",
    plansButton: "Ver planos e preços",
    plansHref: "#pt-planos-pro",
  },
};

function AppQuickCommercialAccess({ language = "es" }) {
  const subscription = appLicensePlans.find(({ title }) => title === "Suscripción mensual");
  const oneTime = appLicensePlans.find(({ title }) => title === "Mensual de pago único");
  const copy = appQuickAccessCopy[language] || appQuickAccessCopy.es;
  const localizedTrialPrice = language === "en"
    ? englishApp.planCopy[appTrialPlan.title].price
    : language === "pt"
      ? portugueseApp.planCopy[appTrialPlan.title].price
      : appTrialPlan.price;

  return (
    <section className="app-pro-quick-access" aria-labelledby={`app-pro-quick-access-title-${language}`}>
      <div className="mock-home-container app-pro-quick-access-inner">
        <div className="app-pro-quick-access-heading">
          <span>{copy.eyebrow}</span>
          <h2 id={`app-pro-quick-access-title-${language}`}>{copy.title}</h2>
        </div>
        <dl className="app-pro-quick-access-facts">
          <div>
            <dt>{copy.trial}</dt>
            <dd>{localizedTrialPrice} · {copy.trialDuration}</dd>
          </div>
          <div>
            <dt>{copy.subscription}</dt>
            <dd>{subscription.price} {copy.subscriptionSuffix}</dd>
          </div>
          <div>
            <dt>{copy.oneTime}</dt>
            <dd>{copy.oneTimePrefix} {oneTime.price}</dd>
          </div>
        </dl>
        <div className="app-pro-quick-access-actions">
          <a
            className="mock-btn mock-btn-primary"
            href={appProductUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => track("app_trial_click", { source: "quick_access", language })}
          >
            {copy.trialButton} <ExternalLink size={16} />
          </a>
          <a className="app-pro-quick-access-link" href={copy.plansHref}>
            {copy.plansButton} <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

const localizedPlanGuideCopy = {
  en: {
    eyebrow: "QUICK DECISION",
    title: "Which option fits the way you work?",
    link: "View plan",
    idPrefix: "en-plan-",
    options: [
      ["I want to explore first", "Free trial", "48 hours with no payment", "Prueba gratuita"],
      ["I use it every month", "Monthly subscription", "Automatic renewal until cancelled", "Suscripción mensual"],
      ["I only need one calendar month", "One-time monthly license", "One calendar month with no automatic renewal", "Mensual de pago único"],
      ["I work independently", "Professional", "6 months, 2 devices and course", "Profesional"],
      ["We are a maintenance team", "Business", "6 months, 10 devices and course", "Empresarial"],
    ],
  },
  pt: {
    eyebrow: "DECISÃO RÁPIDA",
    title: "Qual opção combina melhor com a sua forma de trabalho?",
    link: "Ver plano",
    idPrefix: "pt-plano-",
    options: [
      ["Quero conhecer primeiro", "Teste gratuito", "48 horas sem pagamento", "Prueba gratuita"],
      ["Uso todos os meses", "Assinatura mensal", "Renovação automática até o cancelamento", "Suscripción mensual"],
      ["Preciso somente de um mês-calendário", "Licença mensal avulsa", "Um mês-calendário sem renovação automática", "Mensual de pago único"],
      ["Trabalho de forma independente", "Profissional", "6 meses, 2 dispositivos e curso", "Profesional"],
      ["Somos uma equipe de manutenção", "Empresarial", "6 meses, 10 dispositivos e curso", "Empresarial"],
    ],
  },
};

function LocalizedAppPlanGuide({ language }) {
  const copy = localizedPlanGuideCopy[language];
  if (!copy) return null;

  return (
    <nav className="app-pro-plan-guide" aria-labelledby={`app-pro-plan-guide-title-${language}`}>
      <div className="app-pro-plan-guide-heading">
        <span>{copy.eyebrow}</span>
        <h3 id={`app-pro-plan-guide-title-${language}`}>{copy.title}</h3>
      </div>
      <ul>
        {copy.options.map(([context, title, detail, sourceTitle]) => {
          const target = `${copy.idPrefix}${sourceTitle.toLowerCase().replaceAll(" ", "-")}`;
          return (
            <li key={target}>
              <a href={`#${target}`} aria-label={`${context}: ${title}`}>
                <span>{context}</span>
                <strong>{title}</strong>
                <small>{detail}</small>
                <span className="app-pro-plan-guide-link">
                  {copy.link} <ArrowRight size={15} aria-hidden="true" />
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

const appObjectionCopy = {
  en: {
    title: "Is it only a fault table?",
    text: "No. A table gives you a fixed list; BOJ S7-PLC keeps the context of your symptom and organizes hypotheses according to the evidence you enter: LEDs, Diagnostic Buffer, network state, modules and signals. It helps you decide what to verify first and what to rule out, including safety criteria for each step.",
    badTitle: "A table or PDF",
    bad: ["Fixed list of faults", "Does not follow your symptom", "Does not prioritize evidence", "Relies on memory"],
    goodTitle: "BOJ S7-PLC",
    good: ["Keeps the case context", "Guides each phase from the symptom", "Prioritizes hypotheses by evidence", "Includes safety criteria at every step"],
  },
  pt: {
    title: "É apenas uma tabela de falhas?",
    text: "Não. Uma tabela oferece uma lista fixa; o BOJ S7-PLC mantém o contexto do sintoma e organiza as hipóteses de acordo com as evidências informadas: LEDs, Diagnostic Buffer, estado da rede, módulos e sinais. Ele ajuda a decidir o que verificar primeiro e o que descartar, com critérios de segurança em cada etapa.",
    badTitle: "Uma tabela ou PDF",
    bad: ["Lista fixa de falhas", "Não acompanha o sintoma", "Não prioriza evidências", "Depende da memória"],
    goodTitle: "BOJ S7-PLC",
    good: ["Mantém o contexto do caso", "Orienta cada fase a partir do sintoma", "Prioriza hipóteses por evidência", "Inclui critérios de segurança em cada etapa"],
  },
};

function LocalizedAppObjection({ language }) {
  const copy = appObjectionCopy[language];
  if (!copy) return null;

  return (
    <section className="app-pro-dark-section app-pro-objection-section">
      <div className="mock-home-container app-pro-objection-grid">
        <div className="app-pro-objection-copy">
          <h2>{copy.title}</h2>
          <p>{copy.text}</p>
        </div>
        <div className="app-pro-objection-compare">
          <article className="app-pro-objection-col app-pro-objection-bad">
            <h3>{copy.badTitle}</h3>
            <ul>{copy.bad.map((item) => <li key={item}><X size={15} aria-hidden="true" /> {item}</li>)}</ul>
          </article>
          <article className="app-pro-objection-col app-pro-objection-good">
            <h3>{copy.goodTitle}</h3>
            <ul>{copy.good.map((item) => <li key={item}><CheckCircle2 size={15} aria-hidden="true" /> {item}</li>)}</ul>
          </article>
        </div>
      </div>
    </section>
  );
}

function AppPage() {
  const pricingCards = [appTrialPlan, ...appLicensePlans];
  const [activeScreenshot, setActiveScreenshot] = useState(null);

  return (
    <div className="app-pro-page">
      <Hero
        image={appProHeroLaptopVisual}
        eyebrow="ASISTENCIA DE DIAGNÓSTICO EN CAMPO"
        title="Antes de conectar STEP 7, identifica qué debes revisar."
        subtitle="Ingresa los síntomas, los LEDs y las condiciones que observas en el panel de control. BOJ S7-PLC PRO ordena las causas posibles, prioriza las verificaciones y te ayuda a distinguir si el problema apunta a la CPU, la red, un módulo, la alimentación, una señal o la lógica."
        primary={{
          label: "Probar gratis durante 48 horas",
          href: appProductUrl,
          external: true,
          onClick: () => track("app_trial_click", { source: "app_hero" }),
        }}
        secondary={{
          label: "Ver planes PRO",
          href: "#planes-pro",
          onClick: (event) => {
            event.preventDefault();
            focusHashTarget("#planes-pro");
          },
        }}
        note="La app no se conecta directamente al PLC ni reemplaza STEP 7. Orienta el diagnóstico inicial y prepara una intervención con mayor criterio."
        aside={<AppHeroDiagnosticPreview />}
      />

      <S7ProofStrip />

      <AppQuickCommercialAccess />

      <section className="app-pro-positioning-section" aria-labelledby="app-pro-positioning-title">
        <div className="mock-home-container">
          <div className="app-pro-positioning-heading">
            <span className="app-pro-positioning-eyebrow">DOS ETAPAS, UN MISMO DIAGNÓSTICO</span>
            <h2 id="app-pro-positioning-title">Orienta el diagnóstico primero. Profundiza sólo cuando sea necesario.</h2>
            <p>
              BOJ S7-PLC PRO organiza la primera respuesta en campo y te ayuda a llegar al diagnóstico online con una
              búsqueda más acotada.
            </p>
          </div>

          <div className="app-pro-positioning-route" aria-label="Recorrido desde el síntoma hasta la decisión técnica">
            <div className="app-pro-positioning-route-step">
              <span className="app-pro-positioning-route-number">01</span>
              <Icon name="Smartphone" size={27} />
              <div>
                <small>PRIMERA RESPUESTA</small>
                <h3>Orientación con BOJ S7-PLC</h3>
                <p>Registra síntomas, LEDs y condiciones de campo desde el teléfono móvil, la tableta o el navegador. La app conserva el contexto y prioriza qué verificar primero.</p>
              </div>
            </div>
            <ArrowRight className="app-pro-positioning-route-arrow" size={24} aria-hidden="true" />
            <div className="app-pro-positioning-route-step">
              <span className="app-pro-positioning-route-number">02</span>
              <Icon name="MonitorCog" size={27} />
              <div>
                <small>CONFIRMACIÓN ONLINE</small>
                <h3>Diagnóstico con STEP 7</h3>
                <p>Llegas con una hipótesis técnica y una búsqueda más acotada para revisar hardware, eventos, bloques o registros.</p>
              </div>
            </div>
            <ArrowRight className="app-pro-positioning-route-arrow" size={24} aria-hidden="true" />
            <div className="app-pro-positioning-route-decision">
              <Icon name="ShieldCheck" size={27} />
              <div>
                <small>DECISIÓN SEGURA</small>
                <strong>El técnico evalúa la evidencia antes de intervenir.</strong>
              </div>
            </div>
          </div>

          <p className="app-pro-positioning-summary">
            <strong>BOJ S7-PLC orienta.</strong>
            <span>STEP 7 confirma.</span>
            <span>El técnico decide.</span>
          </p>
        </div>
      </section>

      <section className="app-pro-problems-how-section">
        <div className="mock-home-container app-pro-problems-how-grid">
          <div className="app-pro-problems-panel">
            <div className="app-pro-panel-heading">
              <span className="app-pro-section-kicker">DIAGNÓSTICO EN CAMPO</span>
              <h2>Problemas que ayuda a resolver</h2>
              <p>Identifica el tipo de falla y ordena la búsqueda antes de intervenir el equipo.</p>
            </div>
            <div className="app-pro-problem-grid">
              {appProblemItems.map((item) => (
                <article className="app-pro-problem-item" key={item.title}>
                  <Icon name={item.icon} size={26} />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="app-pro-how-panel">
            <div className="app-pro-panel-heading">
              <span className="app-pro-section-kicker">FLUJO DE TRABAJO</span>
              <h2>Cómo funciona</h2>
              <p>Del síntoma a una hipótesis priorizada y una verificación concreta en campo.</p>
            </div>
            <div className="app-pro-how-steps">
              {appHowItWorks.map((item, index) => (
                <div className="app-pro-how-step-wrap" key={item.title}>
                  <article className="app-pro-how-step">
                    <span className="app-pro-step-number">{index + 1}</span>
                    <div className="app-pro-step-icon-circle">
                      <Icon name={item.icon} size={28} />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                  {index < appHowItWorks.length - 1 ? (
                    <span className="app-pro-step-arrow" aria-hidden="true">
                      <ArrowRight size={24} />
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="app-pro-dark-section app-pro-includes-section">
        <div className="mock-home-container">
          <div className="app-pro-section-heading">
            <span className="app-pro-section-kicker">HERRAMIENTAS DE DIAGNÓSTICO</span>
            <h2>Qué incluye BOJ S7-PLC PRO</h2>
            <p>Un entorno práctico para consultar, contrastar y documentar el diagnóstico desde el navegador.</p>
          </div>
          <div className="app-pro-include-grid">
            {appProIncludes.map((item) => (
              <article className="app-pro-include-card" key={item.title}>
                <Icon name={item.icon} size={30} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="app-pro-real-language-section">
        <div className="mock-home-container app-pro-real-language-grid">
          <div>
            <h2>Captura real de la herramienta profesional</h2>
            <div className="app-pro-real-view-grid">
              {appRealViews.map((item) => (
                <article className="app-pro-real-view-card" key={item.title}>
                  <figure>
                    <button
                      className="app-pro-real-view-trigger"
                      type="button"
                      onClick={() => setActiveScreenshot(item)}
                      aria-label={`Ampliar captura: ${item.title}`}
                    >
                      <img className="app-pro-real-view-image" src={item.image} alt={item.title} width="1474" height="588" loading="lazy" decoding="async" />
                    </button>
                  </figure>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="app-pro-language-card">
            <h2>Disponible en 6 idiomas</h2>
            <div className="app-pro-language-list">
              {appLanguages.map((language) => (
                <span key={language}>{language}</span>
              ))}
            </div>
            <p className="app-pro-language-disclosure">Interfaz disponible en seis idiomas. El contenido técnico especializado y los documentos legales se proporcionan actualmente en español.</p>
          </div>
        </div>
      </section>

      <AccessibleDialog
        open={Boolean(activeScreenshot)}
        onClose={() => setActiveScreenshot(null)}
        labelledBy="app-pro-lightbox-title"
        className="app-pro-lightbox"
        panelClassName="app-pro-lightbox-panel"
      >
        <button className="app-pro-lightbox-close" type="button" onClick={() => setActiveScreenshot(null)} aria-label="Cerrar captura ampliada" data-dialog-initial-focus>
          <X size={20} />
        </button>
        <img src={activeScreenshot?.image} alt={activeScreenshot?.title || ""} width="1474" height="588" decoding="async" />
        <div className="app-pro-lightbox-copy">
          <h2 id="app-pro-lightbox-title">{activeScreenshot?.title}</h2>
          <p>{activeScreenshot?.text}</p>
        </div>
      </AccessibleDialog>

      <section className="app-pro-plans-section" id="planes-pro">
        <div className="mock-home-container">
          <div className="app-pro-section-heading">
            <span className="app-pro-section-kicker">LICENCIAS Y MODALIDADES</span>
            <h2>Elige tu licencia PRO</h2>
            <p>Compara la renovación, la duración, los dispositivos y el uso sin conexión antes de elegir.</p>
            <p className="app-pro-plans-crosslink">
              <strong>Profesional</strong> y <strong>Empresarial</strong> incluyen el{" "}
              <a href="/cursos/s7-300-400">curso de diagnóstico S7-300/400</a>.
            </p>
          </div>
          <nav className="app-pro-plan-guide" aria-labelledby="app-pro-plan-guide-title">
            <div className="app-pro-plan-guide-heading">
              <span>DECISIÓN RÁPIDA</span>
              <h3 id="app-pro-plan-guide-title">¿Cuál encaja mejor con tu forma de trabajo?</h3>
            </div>
            <ul>
              {appPlanDecisionGuide.map((option) => (
                <li key={option.target}>
                  <a href={`#${option.target}`} aria-label={`${option.context}: ver plan ${option.title}`}>
                    <span>{option.context}</span>
                    <strong>{option.title}</strong>
                    <small>{option.detail}</small>
                    <span className="app-pro-plan-guide-link">
                      Ver plan <ArrowRight size={15} aria-hidden="true" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="app-pro-plan-grid">
            {pricingCards.map((plan) => (
              <article
                className={`app-pro-plan-card${plan.badge ? " featured" : ""}${plan.title === "Prueba gratuita" ? " trial" : ""}`}
                id={appPlanCardIds[plan.title]}
                key={plan.title}
                tabIndex={-1}
              >
                {plan.badge ? <span className="app-pro-plan-badge">{plan.badge}</span> : null}
                <h3>{plan.title}</h3>
                <strong>{plan.price}</strong>
                <span className="app-pro-plan-meta">{plan.meta}</span>
                <ul>
                  {plan.bullets.map((item) => (
                    <li key={item}>
                      <CheckCircle2 size={15} /> {item}
                    </li>
                  ))}
                </ul>
                <a
                  className="mock-btn mock-btn-primary"
                  href={plan.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track("plan_click", { plan: plan.title })}
                >
                  {plan.button} <ExternalLink size={17} />
                </a>
              </article>
            ))}
          </div>
          <ul className="app-pro-purchase-confidence" aria-label="Información antes de comprar">
            <li>
              <CheckCircle2 size={17} aria-hidden="true" /> Compra gestionada por Hotmart
            </li>
            <li>
              <CheckCircle2 size={17} aria-hidden="true" /> Precio y modalidad visibles antes de confirmar
            </li>
            <li>
              <CheckCircle2 size={17} aria-hidden="true" /> Activación con el correo electrónico utilizado en la compra
            </li>
          </ul>
          <aside className="app-pro-training-strip" aria-labelledby="app-pro-training-title">
            <div className="app-pro-training-copy">
              <span className="app-pro-training-eyebrow">FORMACIÓN TÉCNICA</span>
              <h3 id="app-pro-training-title">¿También necesitas formación?</h3>
              <p>Curso Diagnóstico S7-300/400 con acceso permanente + 1 mes de BOJ S7-PLC PRO.</p>
            </div>
            <div className="app-pro-training-action">
              <strong>{offer.course.price} · Pago único</strong>
              <a className="mock-btn mock-btn-outline" href="/cursos/s7-300-400">
                Ver curso y contenidos <ArrowRight size={17} aria-hidden="true" />
              </a>
            </div>
          </aside>
          <article className="app-pro-institutional">
            <Icon name="Landmark" size={34} />
            <div>
              <h3>Institucional / Centros de formación: Precio personalizado.</h3>
              <p>
                Condiciones especiales para instituciones educativas, centros de formación técnica, empresas
                con múltiples usuarios o programas corporativos.
              </p>
            </div>
            <a className="mock-btn mock-btn-outline" href="/contacto">
              Consultar condiciones <ArrowRight size={17} aria-hidden="true" />
            </a>
          </article>
        </div>
      </section>

      <section className="app-pro-dark-section app-pro-objection-section">
        <div className="mock-home-container app-pro-objection-grid">
          <div className="app-pro-objection-copy">
            <h2>¿No es solo una tabla de fallas?</h2>
            <p>
              No. Una tabla te da una lista; BOJ S7-PLC <strong>mantiene el contexto de tu síntoma</strong> y ordena
              las hipótesis según la evidencia que vas cargando: LEDs, Diagnostic Buffer, estado de red, módulos y
              señales. Te dice <strong>qué verificar primero y qué descartar</strong>, con el criterio de seguridad de
              cada paso. Es el método de un técnico con experiencia, no un listado para memorizar.
            </p>
          </div>
          <div className="app-pro-objection-compare">
            <article className="app-pro-objection-col app-pro-objection-bad">
              <h3>Una tabla / PDF</h3>
              <ul>
                <li><X size={15} aria-hidden="true" /> Lista fija de fallas</li>
                <li><X size={15} aria-hidden="true" /> No sigue tu síntoma</li>
                <li><X size={15} aria-hidden="true" /> No prioriza por evidencia</li>
                <li><X size={15} aria-hidden="true" /> Dependes de la memoria</li>
              </ul>
            </article>
            <article className="app-pro-objection-col app-pro-objection-good">
              <h3>BOJ S7-PLC</h3>
              <ul>
                <li><CheckCircle2 size={15} aria-hidden="true" /> Mantiene el contexto del caso</li>
                <li><CheckCircle2 size={15} aria-hidden="true" /> Guía por fases según el síntoma</li>
                <li><CheckCircle2 size={15} aria-hidden="true" /> Prioriza hipótesis por evidencia</li>
                <li><CheckCircle2 size={15} aria-hidden="true" /> Criterio de seguridad en cada paso</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="app-pro-value-row-section">
        <div className="mock-home-container app-pro-value-row-grid">
          <article className="app-pro-offline-card">
            <h2>Acceso, instalación y disponibilidad</h2>
            <p className="app-pro-offline-intro">
              El acceso fue pensado para adaptarse a distintas formas de trabajo: consulta rápida, uso desde escritorio y apoyo en campo.
            </p>
            <div className="app-pro-offline-items">
              {appAvailabilityItems.map((item) => (
                <div key={item.title}>
                  <Icon name={item.icon} size={34} />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
            <p className="app-pro-offline-note">
              Pensado para consulta rápida, acceso flexible y continuidad de trabajo en campo.
            </p>
          </article>
          <article className="app-pro-cost-card">
            <div>
              <h2>Una parada de planta puede costar más que una licencia</h2>
              <p>
                Cuando una máquina está detenida, cada minuto cuenta. BOJ S7-PLC PRO ayuda a ordenar síntomas,
                hipótesis y verificaciones antes de cambiar hardware, reiniciar equipos o intervenir sin evidencia.
              </p>
              <ul className="app-pro-cost-bullets">
                <li>Ordena síntomas e hipótesis antes de intervenir.</li>
                <li>Reduce prueba y error en momentos de presión.</li>
                <li>Ayuda a verificar evidencia antes de cambiar hardware o reiniciar equipos.</li>
              </ul>
              <strong className="app-pro-cost-emphasis">Menos prueba y error. Más criterio técnico.</strong>
              <p className="app-pro-cost-support">
                El objetivo no es reemplazar al técnico: es ayudarlo a decidir mejor en campo.
              </p>
            </div>
            <div className="app-pro-cost-visual" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <b>
                <TriangleAlert size={24} />
              </b>
            </div>
          </article>
          <article className="app-pro-audience-card">
            <h2>Para quién es BOJ S7-PLC PRO</h2>
            <p className="app-pro-audience-intro">
              Pensada para técnicos y equipos que necesitan ordenar un diagnóstico antes de intervenir en sistemas
              Siemens S7-300/400.
            </p>
            <div className="app-pro-audience-list">
              {appAudienceProfiles.map((item) => (
                <div className="app-pro-audience-item" key={item.text}>
                  <Icon name={item.icon} size={18} />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
            <p className="app-pro-audience-note">
              No reemplaza al técnico: lo ayuda a ordenar hipótesis, verificar evidencia y tomar mejores decisiones
              en campo.
            </p>
          </article>
        </div>
      </section>

      <section className="app-pro-trust-section">
        <div className="mock-home-container app-pro-trust-grid">
          <img className="app-pro-trust-avatar" src={walterBojAvatar} alt="Walter Adrián Boj" width="1086" height="1448" loading="lazy" decoding="async" />
          <div className="app-pro-trust-copy">
            <h2>Desarrollada con criterio de planta</h2>
            <p>
              BOJ S7-PLC PRO fue desarrollada por Walter Adrián Boj, especialista en automatización industrial
              y diagnóstico de sistemas PLC Siemens, con experiencia en mantenimiento, programación, redes
              industriales y fallas reales de planta.
            </p>
            <a className="mock-btn mock-btn-outline" href={contact.linkedin} target="_blank" rel="noreferrer">
              Ver perfil profesional <ExternalLink size={17} />
            </a>
          </div>
          <div className="app-pro-trust-metrics">
            {appTrustMetrics.map((item) => (
              <article key={item.title}>
                <Icon name={item.icon} size={22} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <S7Testimonials background="dark" />

      <section className="app-pro-faq-section">
        <div className="mock-home-container">
          <div className="app-pro-section-heading app-pro-section-heading-dark">
            <h2>Preguntas frecuentes</h2>
          </div>
          <div className="app-pro-faq-grid">
            {appFaqItems.map((item) => (
              <details className="app-pro-faq-item" key={item.question}>
                <summary>
                  {item.question}
                  <ChevronDown size={16} />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

function EnglishAppHeroDiagnosticPreview() {
  return <AppHeroDiagnosticPreview language="en" />;
}

function EnglishAppPage() {
  const pricingCards = [appTrialPlan, ...appLicensePlans].map((plan) => ({
    ...plan,
    ...englishApp.planCopy[plan.title],
    sourceTitle: plan.title,
  }));
  const [activeScreenshot, setActiveScreenshot] = useState(null);

  return (
    <div className="app-pro-page english-page" data-language="en">
      <Hero
        image={appProHeroLaptopVisual}
        eyebrow="FIRST-LINE FIELD DIAGNOSTICS"
        title="Before opening STEP 7, identify what you need to verify"
        subtitle="Enter the symptoms, LEDs and conditions observed at the control panel. BOJ S7-PLC PRO organizes possible causes and helps you decide whether to investigate the CPU, network, modules, power, signals or logic."
        primary={{ label: "Start the 48-hour free trial", href: appProductUrl, external: true, onClick: () => track("app_trial_click", { source: "app_en_hero" }) }}
        secondary={{ label: "View PRO plans", href: "#en-pro-plans" }}
        note="The app does not connect directly to the PLC and does not replace STEP 7 or qualified technical judgment."
        aside={<EnglishAppHeroDiagnosticPreview />}
      />

      <S7ProofStrip language="en" />

      <AppQuickCommercialAccess language="en" />

      <section className="app-pro-positioning-section">
        <div className="mock-home-container">
          <div className="app-pro-positioning-heading">
            <span className="app-pro-positioning-eyebrow">TWO STAGES, ONE DIAGNOSTIC PROCESS</span>
            <h2>Orient the first response. Go deeper only when the evidence requires it.</h2>
            <p>BOJ S7-PLC helps the field technician arrive at online diagnostics with a narrower and more useful search.</p>
          </div>
          <div className="app-pro-positioning-route" aria-label="Diagnostic workflow">
            <div className="app-pro-positioning-route-step"><span className="app-pro-positioning-route-number">01</span><Icon name="Smartphone" size={27} /><div><small>FIRST RESPONSE</small><h3>Guidance with BOJ S7-PLC</h3><p>Record symptoms, LEDs and field conditions from a phone, tablet or browser.</p></div></div>
            <ArrowRight className="app-pro-positioning-route-arrow" size={24} />
            <div className="app-pro-positioning-route-step"><span className="app-pro-positioning-route-number">02</span><Icon name="MonitorCog" size={27} /><div><small>ONLINE CONFIRMATION</small><h3>Diagnostics with STEP 7</h3><p>Review hardware, events, blocks or registers with a more focused hypothesis.</p></div></div>
            <ArrowRight className="app-pro-positioning-route-arrow" size={24} />
            <div className="app-pro-positioning-route-decision"><Icon name="ShieldCheck" size={27} /><div><small>TECHNICAL DECISION</small><strong>The technician evaluates the evidence before intervening.</strong></div></div>
          </div>
          <p className="app-pro-positioning-summary"><strong>BOJ S7-PLC guides.</strong><span>STEP 7 confirms.</span><span>The technician decides.</span></p>
        </div>
      </section>

      <section className="app-pro-problems-how-section">
        <div className="mock-home-container app-pro-problems-how-grid">
          <div className="app-pro-problems-panel">
            <div className="app-pro-panel-heading"><span className="app-pro-section-kicker">FIELD DIAGNOSTICS</span><h2>Problems it helps organize</h2><p>Identify the fault category before changing hardware or intervening in the process.</p></div>
            <div className="app-pro-problem-grid">{englishApp.problems.map((item) => <article className="app-pro-problem-item" key={item.title}><Icon name={item.icon} size={26} /><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
          </div>
          <div className="app-pro-how-panel">
            <div className="app-pro-panel-heading"><span className="app-pro-section-kicker">WORKFLOW</span><h2>How it works</h2><p>From a symptom to prioritized hypotheses and practical field checks.</p></div>
            <div className="app-pro-how-steps">
              {englishApp.steps.map((item, index) => (
                <div className="app-pro-how-step-wrap" key={item.title}>
                  <article className="app-pro-how-step"><span className="app-pro-step-number">{index + 1}</span><div className="app-pro-step-icon-circle"><Icon name={item.icon} size={28} /></div><h3>{item.title}</h3><p>{item.text}</p></article>
                  {index < englishApp.steps.length - 1 ? <span className="app-pro-step-arrow"><ArrowRight size={24} /></span> : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="app-pro-dark-section app-pro-includes-section">
        <div className="mock-home-container">
          <div className="app-pro-section-heading"><span className="app-pro-section-kicker">DIAGNOSTIC TOOLS</span><h2>What BOJ S7-PLC PRO includes</h2><p>A practical environment for reviewing and documenting first-line diagnostics.</p></div>
          <div className="app-pro-include-grid">{englishApp.includes.map((item) => <article className="app-pro-include-card" key={item.title}><Icon name={item.icon} size={30} /><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
        </div>
      </section>

      <section className="app-pro-real-language-section">
        <div className="mock-home-container app-pro-real-language-grid">
          <div>
            <h2>Real view of the professional tool</h2>
            <div className="app-pro-real-view-grid">
              {englishApp.views.map((copy, index) => {
                const source = appRealViews[index];
                const item = { ...source, ...copy };
                return (
                  <article className="app-pro-real-view-card" key={item.title}>
                    <figure><button className="app-pro-real-view-trigger" type="button" onClick={() => setActiveScreenshot(item)} aria-label={`Enlarge screenshot: ${item.title}`}><img className="app-pro-real-view-image" src={item.image} alt={item.title} width="1474" height="588" loading="lazy" decoding="async" /></button></figure>
                    <div><h3>{item.title}</h3><p>{item.text}</p></div>
                  </article>
                );
              })}
            </div>
          </div>
          <div className="app-pro-language-card"><h2>Available in 6 languages</h2><div className="app-pro-language-list">{["Spanish", "English", "Portuguese", "German", "French", "Italian"].map((item) => <span key={item}>{item}</span>)}</div><p className="app-pro-language-disclosure">Interface available in six languages. Specialized technical content and legal documents are currently provided in Spanish.</p></div>
        </div>
      </section>

      <AccessibleDialog open={Boolean(activeScreenshot)} onClose={() => setActiveScreenshot(null)} labelledBy="en-app-lightbox-title" className="app-pro-lightbox" panelClassName="app-pro-lightbox-panel">
        <button className="app-pro-lightbox-close" type="button" onClick={() => setActiveScreenshot(null)} aria-label="Close enlarged screenshot" data-dialog-initial-focus><X size={20} /></button>
        <img src={activeScreenshot?.image} alt={activeScreenshot?.title || ""} width="1474" height="588" decoding="async" />
        <div className="app-pro-lightbox-copy"><h2 id="en-app-lightbox-title">{activeScreenshot?.title}</h2><p>{activeScreenshot?.text}</p></div>
      </AccessibleDialog>

      <section className="app-pro-plans-section" id="en-pro-plans">
        <div className="mock-home-container">
          <div className="app-pro-section-heading">
            <span className="app-pro-section-kicker">LICENSES AND OPTIONS</span>
            <h2>Choose your PRO license</h2>
            <p>Compare renewal, duration, devices and offline availability before choosing.</p>
            <p className="app-pro-plans-crosslink"><strong>Professional</strong> and <strong>Business</strong> include the <a href="/en/courses/s7-300-400">S7-300/400 diagnostics course</a>.</p>
          </div>
          <LocalizedAppPlanGuide language="en" />
          <div className="app-pro-plan-grid">
            {pricingCards.map((plan) => (
              <article className={`app-pro-plan-card${plan.badge ? " featured" : ""}${plan.sourceTitle === "Prueba gratuita" ? " trial" : ""}`} id={`en-plan-${plan.sourceTitle.toLowerCase().replaceAll(" ", "-")}`} key={plan.sourceTitle}>
                {plan.badge ? <span className="app-pro-plan-badge">{plan.badge}</span> : null}
                <h3>{plan.title}</h3><strong>{plan.price}</strong><span className="app-pro-plan-meta">{plan.meta}</span>
                <ul>{plan.bullets.map((item) => <li key={item}><CheckCircle2 size={15} />{item}</li>)}</ul>
                <a className="mock-btn mock-btn-primary" href={plan.url} target="_blank" rel="noreferrer" onClick={() => track("plan_click", { plan: plan.sourceTitle, language: "en" })}>{plan.button} <ExternalLink size={17} /></a>
              </article>
            ))}
          </div>
          <ul className="app-pro-purchase-confidence" aria-label="Purchase information">
            <li><CheckCircle2 size={17} />Purchase processed by Hotmart</li>
            <li><CheckCircle2 size={17} />Price and billing model shown before confirmation</li>
            <li><CheckCircle2 size={17} />Activation uses the email address entered during purchase</li>
          </ul>
          <aside className="app-pro-training-strip">
            <div className="app-pro-training-copy"><span className="app-pro-training-eyebrow">TECHNICAL TRAINING</span><h3>Do you also need structured training?</h3><p>Permanent access to the S7-300/400 diagnostics course plus one month of BOJ S7-PLC PRO.</p></div>
            <div className="app-pro-training-action"><strong>{offer.course.price} · One-time payment</strong><a className="mock-btn mock-btn-outline" href="/en/courses/s7-300-400">View course content <ArrowRight size={17} /></a></div>
          </aside>
          <article className="app-pro-institutional">
            <Icon name="Landmark" size={34} /><div><h3>Companies and training centers: tailored pricing</h3><p>Special conditions for organizations, technical training programs and teams with multiple users.</p></div><a className="mock-btn mock-btn-outline" href="/en/contact">Request information <ArrowRight size={17} /></a>
          </article>
        </div>
      </section>

      <LocalizedAppObjection language="en" />

      <section className="app-pro-value-row-section">
        <div className="mock-home-container app-pro-value-row-grid">
          <article className="app-pro-offline-card"><h2>Access and availability</h2><p className="app-pro-offline-intro">Use the app from a modern browser or install it on a compatible device.</p><div className="app-pro-offline-items"><div><Icon name="Globe" size={34} /><h3>Web access</h3><p>No mandatory software installation.</p></div><div><Icon name="Smartphone" size={34} /><h3>Installable</h3><p>Direct access on compatible devices.</p></div><div><Icon name="WifiOff" size={34} /><h3>Offline by plan</h3><p>Offline duration depends on the selected license.</p></div></div></article>
          <article className="app-pro-cost-card"><div><h2>A plant stoppage can cost more than a license</h2><p>BOJ S7-PLC PRO helps organize symptoms and evidence before hardware is changed or equipment is restarted without a clear reason.</p><ul className="app-pro-cost-bullets"><li>Reduce trial and error under pressure.</li><li>Prioritize evidence before intervening.</li><li>Prepare a more focused STEP 7 session.</li></ul><strong className="app-pro-cost-emphasis">Less guesswork. Better technical judgment.</strong></div><div className="app-pro-cost-visual" aria-hidden="true"><span /><span /><span /><span /><b><TriangleAlert size={24} /></b></div></article>
          <article className="app-pro-audience-card"><h2>Who it is for</h2><p className="app-pro-audience-intro">For professionals and teams troubleshooting Siemens S7-300/400 systems.</p><div className="app-pro-audience-list">{englishApp.audience.map((item) => <div className="app-pro-audience-item" key={item.text}><Icon name={item.icon} size={18} /><span>{item.text}</span></div>)}</div><p className="app-pro-audience-note">It supports the technician; it does not replace qualified technical judgment.</p></article>
        </div>
      </section>

      <section className="app-pro-trust-section">
        <div className="mock-home-container app-pro-trust-grid">
          <img className="app-pro-trust-avatar" src={walterBojAvatar} alt="Walter Adrián Boj" width="1086" height="1448" loading="lazy" decoding="async" />
          <div className="app-pro-trust-copy"><h2>Developed with plant experience</h2><p>BOJ S7-PLC PRO was developed by Walter Adrián Boj, an industrial automation specialist with experience in Siemens PLC diagnostics, maintenance, programming and industrial networks.</p><a className="mock-btn mock-btn-outline" href={contact.linkedin} target="_blank" rel="noreferrer">View professional profile <ExternalLink size={17} /></a></div>
          <div className="app-pro-trust-metrics"><article><Icon name="Clock" size={22} /><h3>15+ years</h3><p>Industrial automation and diagnostics experience.</p></article><article><Icon name="Cpu" size={22} /><h3>Siemens PLC</h3><p>Focused on real S7-300/400 plant faults.</p></article><article><Icon name="ShieldCheck" size={22} /><h3>Field method</h3><p>A structured process designed to reduce guesswork.</p></article></div>
        </div>
      </section>

      <S7Testimonials background="dark" language="en" />

      <section className="app-pro-faq-section">
        <div className="mock-home-container"><div className="app-pro-section-heading app-pro-section-heading-dark"><h2>Frequently asked questions</h2></div><div className="app-pro-faq-grid">{englishApp.faq.map((item) => <details className="app-pro-faq-item" key={item.question}><summary>{item.question}<ChevronDown size={16} /></summary><p>{item.answer}</p></details>)}</div></div>
      </section>
    </div>
  );
}

function PortugueseAppHeroDiagnosticPreview() {
  return <AppHeroDiagnosticPreview language="pt" />;
}

function PortugueseAppPage() {
  const pricingCards = [appTrialPlan, ...appLicensePlans].map((plan) => ({
    ...plan,
    ...portugueseApp.planCopy[plan.title],
    sourceTitle: plan.title,
  }));
  const [activeScreenshot, setActiveScreenshot] = useState(null);

  return (
    <div className="app-pro-page portuguese-page" data-language="pt">
      <Hero image={appProHeroLaptopVisual} eyebrow="DIAGNÓSTICO DE PRIMEIRA LINHA EM CAMPO" title="Antes de abrir o STEP 7, identifique o que precisa verificar" subtitle="Informe os sintomas, LEDs e condições observadas no painel. O BOJ S7-PLC PRO organiza as possíveis causas e ajuda a decidir se você deve investigar a CPU, a rede, os módulos, a alimentação, os sinais ou a lógica." primary={{ label: "Iniciar teste gratuito de 48 horas", href: appProductUrl, external: true, onClick: () => track("app_trial_click", { source: "app_pt_hero" }) }} secondary={{ label: "Ver planos PRO", href: "#pt-planos-pro" }} note="O app não se conecta diretamente ao PLC e não substitui o STEP 7 nem o critério técnico qualificado." aside={<PortugueseAppHeroDiagnosticPreview />} />

      <S7ProofStrip language="pt" />

      <AppQuickCommercialAccess language="pt" />

      <section className="app-pro-positioning-section"><div className="mock-home-container"><div className="app-pro-positioning-heading"><span className="app-pro-positioning-eyebrow">DUAS ETAPAS, UM PROCESSO DE DIAGNÓSTICO</span><h2>Oriente a primeira resposta. Aprofunde somente quando as evidências exigirem.</h2><p>O BOJ S7-PLC ajuda o técnico de campo a chegar ao diagnóstico online com uma busca mais delimitada e útil.</p></div><div className="app-pro-positioning-route" aria-label="Fluxo de diagnóstico"><div className="app-pro-positioning-route-step"><span className="app-pro-positioning-route-number">01</span><Icon name="Smartphone" size={27} /><div><small>PRIMEIRA RESPOSTA</small><h3>Orientação com BOJ S7-PLC</h3><p>Registre sintomas, LEDs e condições de campo por um celular ou tablet, ou pelo navegador.</p></div></div><ArrowRight className="app-pro-positioning-route-arrow" size={24} /><div className="app-pro-positioning-route-step"><span className="app-pro-positioning-route-number">02</span><Icon name="MonitorCog" size={27} /><div><small>CONFIRMAÇÃO ONLINE</small><h3>Diagnóstico com STEP 7</h3><p>Revise hardware, eventos, blocos ou registros com uma hipótese mais focada.</p></div></div><ArrowRight className="app-pro-positioning-route-arrow" size={24} /><div className="app-pro-positioning-route-decision"><Icon name="ShieldCheck" size={27} /><div><small>DECISÃO TÉCNICA</small><strong>O técnico avalia as evidências antes de intervir.</strong></div></div></div><p className="app-pro-positioning-summary"><strong>O BOJ S7-PLC orienta.</strong><span>O STEP 7 confirma.</span><span>O técnico decide.</span></p></div></section>

      <section className="app-pro-problems-how-section"><div className="mock-home-container app-pro-problems-how-grid"><div className="app-pro-problems-panel"><div className="app-pro-panel-heading"><span className="app-pro-section-kicker">DIAGNÓSTICO EM CAMPO</span><h2>Problemas que ajuda a organizar</h2><p>Identifique a categoria da falha antes de trocar hardware ou intervir no processo.</p></div><div className="app-pro-problem-grid">{portugueseApp.problems.map((item) => <article className="app-pro-problem-item" key={item.title}><Icon name={item.icon} size={26} /><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></div><div className="app-pro-how-panel"><div className="app-pro-panel-heading"><span className="app-pro-section-kicker">FLUXO DE TRABALHO</span><h2>Como funciona</h2><p>De um sintoma a hipóteses priorizadas e verificações práticas em campo.</p></div><div className="app-pro-how-steps">{portugueseApp.steps.map((item, index) => <div className="app-pro-how-step-wrap" key={item.title}><article className="app-pro-how-step"><span className="app-pro-step-number">{index + 1}</span><div className="app-pro-step-icon-circle"><Icon name={item.icon} size={28} /></div><h3>{item.title}</h3><p>{item.text}</p></article>{index < portugueseApp.steps.length - 1 ? <span className="app-pro-step-arrow"><ArrowRight size={24} /></span> : null}</div>)}</div></div></div></section>

      <section className="app-pro-dark-section app-pro-includes-section"><div className="mock-home-container"><div className="app-pro-section-heading"><span className="app-pro-section-kicker">FERRAMENTAS DE DIAGNÓSTICO</span><h2>O que o BOJ S7-PLC PRO inclui</h2><p>Um ambiente prático para revisar e documentar diagnósticos de primeira linha.</p></div><div className="app-pro-include-grid">{portugueseApp.includes.map((item) => <article className="app-pro-include-card" key={item.title}><Icon name={item.icon} size={30} /><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></div></section>

      <section className="app-pro-real-language-section"><div className="mock-home-container app-pro-real-language-grid"><div><h2>Imagem real da ferramenta profissional</h2><div className="app-pro-real-view-grid">{portugueseApp.views.map((copy, index) => { const source = appRealViews[index]; const item = { ...source, ...copy }; return <article className="app-pro-real-view-card" key={item.title}><figure><button className="app-pro-real-view-trigger" type="button" onClick={() => setActiveScreenshot(item)} aria-label={`Ampliar captura: ${item.title}`}><img className="app-pro-real-view-image" src={item.image} alt={item.title} width="1474" height="588" loading="lazy" decoding="async" /></button></figure><div><h3>{item.title}</h3><p>{item.text}</p></div></article>; })}</div></div><div className="app-pro-language-card"><h2>Disponível em 6 idiomas</h2><div className="app-pro-language-list">{["Espanhol", "Inglês", "Português", "Alemão", "Francês", "Italiano"].map((item) => <span key={item}>{item}</span>)}</div><p className="app-pro-language-disclosure">Interface disponível em seis idiomas. O conteúdo técnico especializado e os documentos legais são fornecidos atualmente em espanhol.</p></div></div></section>

      <AccessibleDialog open={Boolean(activeScreenshot)} onClose={() => setActiveScreenshot(null)} labelledBy="pt-app-lightbox-title" className="app-pro-lightbox" panelClassName="app-pro-lightbox-panel"><button className="app-pro-lightbox-close" type="button" onClick={() => setActiveScreenshot(null)} aria-label="Fechar captura ampliada" data-dialog-initial-focus><X size={20} /></button><img src={activeScreenshot?.image} alt={activeScreenshot?.title || ""} width="1474" height="588" decoding="async" /><div className="app-pro-lightbox-copy"><h2 id="pt-app-lightbox-title">{activeScreenshot?.title}</h2><p>{activeScreenshot?.text}</p></div></AccessibleDialog>

      <section className="app-pro-plans-section" id="pt-planos-pro"><div className="mock-home-container"><div className="app-pro-section-heading"><span className="app-pro-section-kicker">LICENÇAS E OPÇÕES</span><h2>Escolha sua licença PRO</h2><p>Compare renovação, duração, dispositivos e disponibilidade offline antes de escolher.</p><p className="app-pro-plans-crosslink"><strong>Profissional</strong> e <strong>Empresarial</strong> incluem o <a href="/pt/cursos/s7-300-400">curso de diagnóstico S7-300/400</a>.</p></div><LocalizedAppPlanGuide language="pt" /><div className="app-pro-plan-grid">{pricingCards.map((plan) => <article className={`app-pro-plan-card${plan.badge ? " featured" : ""}${plan.sourceTitle === "Prueba gratuita" ? " trial" : ""}`} id={`pt-plano-${plan.sourceTitle.toLowerCase().replaceAll(" ", "-")}`} key={plan.sourceTitle}>{plan.badge ? <span className="app-pro-plan-badge">{plan.badge}</span> : null}<h3>{plan.title}</h3><strong>{plan.price}</strong><span className="app-pro-plan-meta">{plan.meta}</span><ul>{plan.bullets.map((item) => <li key={item}><CheckCircle2 size={15} />{item}</li>)}</ul><a className="mock-btn mock-btn-primary" href={plan.url} target="_blank" rel="noreferrer" onClick={() => track("plan_click", { plan: plan.sourceTitle, language: "pt" })}>{plan.button} <ExternalLink size={17} /></a></article>)}</div><ul className="app-pro-purchase-confidence" aria-label="Informações da compra"><li><CheckCircle2 size={17} />Compra processada pela Hotmart</li><li><CheckCircle2 size={17} />Preço e modalidade exibidos antes da confirmação</li><li><CheckCircle2 size={17} />A ativação usa o e-mail informado durante a compra</li></ul><aside className="app-pro-training-strip"><div className="app-pro-training-copy"><span className="app-pro-training-eyebrow">FORMAÇÃO TÉCNICA</span><h3>Também precisa de capacitação estruturada?</h3><p>Acesso permanente ao curso de diagnóstico S7-300/400, em espanhol, mais um mês de BOJ S7-PLC PRO.</p></div><div className="app-pro-training-action"><strong>{offer.course.price} · Pagamento único</strong><a className="mock-btn mock-btn-outline" href="/pt/cursos/s7-300-400">Ver conteúdo do curso <ArrowRight size={17} /></a></div></aside><article className="app-pro-institutional"><Icon name="Landmark" size={34} /><div><h3>Empresas e centros de formação: condições personalizadas</h3><p>Condições especiais para organizações, programas de capacitação técnica e equipes com vários usuários.</p></div><a className="mock-btn mock-btn-outline" href="/pt/contato">Solicitar informações <ArrowRight size={17} /></a></article></div></section>

      <LocalizedAppObjection language="pt" />

      <section className="app-pro-value-row-section"><div className="mock-home-container app-pro-value-row-grid"><article className="app-pro-offline-card"><h2>Acesso e disponibilidade</h2><p className="app-pro-offline-intro">Use o app em um navegador moderno ou instale-o em um dispositivo compatível.</p><div className="app-pro-offline-items"><div><Icon name="Globe" size={34} /><h3>Acesso web</h3><p>Sem instalação obrigatória de software.</p></div><div><Icon name="Smartphone" size={34} /><h3>Instalável</h3><p>Acesso direto em dispositivos compatíveis.</p></div><div><Icon name="WifiOff" size={34} /><h3>Offline conforme o plano</h3><p>A duração offline depende da licença escolhida.</p></div></div></article><article className="app-pro-cost-card"><div><h2>Uma parada de planta pode custar mais do que uma licença</h2><p>O BOJ S7-PLC PRO ajuda a organizar sintomas e evidências antes de trocar hardware ou reiniciar equipamentos sem uma causa clara.</p><ul className="app-pro-cost-bullets"><li>Reduza a tentativa e erro sob pressão.</li><li>Priorize evidências antes de intervir.</li><li>Prepare uma sessão mais focada no STEP 7.</li></ul><strong className="app-pro-cost-emphasis">Menos suposições. Melhor critério técnico.</strong></div><div className="app-pro-cost-visual" aria-hidden="true"><span /><span /><span /><span /><b><TriangleAlert size={24} /></b></div></article><article className="app-pro-audience-card"><h2>Para quem é</h2><p className="app-pro-audience-intro">Para profissionais e equipes que diagnosticam sistemas Siemens S7-300/400.</p><div className="app-pro-audience-list">{portugueseApp.audience.map((item) => <div className="app-pro-audience-item" key={item.text}><Icon name={item.icon} size={18} /><span>{item.text}</span></div>)}</div><p className="app-pro-audience-note">Apoia o técnico; não substitui o critério técnico qualificado.</p></article></div></section>

      <section className="app-pro-trust-section"><div className="mock-home-container app-pro-trust-grid"><img className="app-pro-trust-avatar" src={walterBojAvatar} alt="Walter Adrián Boj" width="1086" height="1448" loading="lazy" decoding="async" /><div className="app-pro-trust-copy"><h2>Desenvolvido com experiência de planta</h2><p>O BOJ S7-PLC PRO foi desenvolvido por Walter Adrián Boj, especialista em automação industrial com experiência em diagnóstico de PLC Siemens, manutenção, programação e redes industriais.</p><a className="mock-btn mock-btn-outline" href={contact.linkedin} target="_blank" rel="noreferrer">Ver perfil profissional <ExternalLink size={17} /></a></div><div className="app-pro-trust-metrics"><article><Icon name="Clock" size={22} /><h3>Mais de 15 anos</h3><p>Experiência em automação e diagnóstico industrial.</p></article><article><Icon name="Cpu" size={22} /><h3>PLC Siemens</h3><p>Foco em falhas reais de planta com S7-300/400.</p></article><article><Icon name="ShieldCheck" size={22} /><h3>Método de campo</h3><p>Processo estruturado para reduzir suposições.</p></article></div></div></section>
      <S7Testimonials background="dark" language="pt" />

      <section className="app-pro-faq-section"><div className="mock-home-container"><div className="app-pro-section-heading app-pro-section-heading-dark"><h2>Perguntas frequentes</h2></div><div className="app-pro-faq-grid">{portugueseApp.faq.map((item) => <details className="app-pro-faq-item" key={item.question}><summary>{item.question}<ChevronDown size={16} /></summary><p>{item.answer}</p></details>)}</div></div></section>
    </div>
  );
}

function AppRoutes({ route }) {
  if (route === "/en/app") return <EnglishAppPage />;
  if (route === "/pt/app") return <PortugueseAppPage />;
  return <AppPage />;
}

export default AppRoutes;
