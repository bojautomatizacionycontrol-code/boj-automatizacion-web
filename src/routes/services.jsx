import { focusHashTarget } from "../accessibility.js";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Phone,
} from "lucide-react";

import { getWorkProjects } from "../works-content.js";
import { ProjectPhotoGallery } from "../ProjectPhotoGallery.jsx";
import {
  englishServices,
  portugueseServices,
} from "../i18n.js";
import heroServicios from "../assets/hero-servicios.jpg";
import heroObras from "../assets/hero-obras.jpg";
import plantVisual from "../assets/old-site/35-47edf350.jpg";
import { M2Picture, whatsappUrl } from "../app/shared-eager.jsx";
import { FounderBlock } from "./founder-block.jsx";
import { Hero, Icon, PageShell, RouteCTA, S7Testimonials, projectVisuals } from "./shared.jsx";
import { getServiceWorkImage, projectWorkImageFiles } from "./works-images.jsx";
import { LedesmaCase } from "./ledesma-case.jsx";

const serviceEngagementCopy = {
  es: {
    kicker: "CÓMO TRABAJAMOS",
    title: "Del primer mensaje a la intervención",
    intro: "Alcance, agenda, entregables y costo se confirman por propuesta escrita antes de intervenir.",
    steps: [
      {
        icon: "Phone",
        title: "Primer contacto",
        text: "Cuéntanos el síntoma, el equipo y lo que ya observaste; fotos del tablero o capturas online ayudan. Primera respuesta dentro de las 48 horas hábiles; las urgencias se coordinan por WhatsApp según disponibilidad.",
      },
      {
        icon: "ClipboardCheck",
        title: "Propuesta técnica",
        text: "Definimos por escrito alcance, agenda, entregables y costo. Sin cargos que no estén en la propuesta.",
      },
      {
        icon: "Wrench",
        title: "Intervención y cierre",
        text: "En planta o a distancia según el caso, con pruebas, documentación técnica y una recomendación clara para operación y mantenimiento.",
      },
    ],
  },
  en: {
    kicker: "HOW WE WORK",
    title: "From the first message to the intervention",
    intro: "Scope, schedule, deliverables and cost are confirmed in a written proposal before any intervention.",
    steps: [
      {
        icon: "Phone",
        title: "First contact",
        text: "Tell us the symptom, the equipment and what you have already observed; cabinet photos or online screenshots help. We reply within 48 business hours and urgent cases are coordinated on WhatsApp subject to availability.",
      },
      {
        icon: "ClipboardCheck",
        title: "Technical proposal",
        text: "We define scope, schedule, deliverables and cost in writing. No charges outside the proposal.",
      },
      {
        icon: "Wrench",
        title: "Intervention and hand-over",
        text: "On site or remotely depending on the case, with tests, technical documentation and a clear recommendation for operation and maintenance.",
      },
    ],
  },
  pt: {
    kicker: "COMO TRABALHAMOS",
    title: "Da primeira mensagem à intervenção",
    intro: "Escopo, agenda, entregáveis e custo são confirmados em proposta escrita antes de intervir.",
    steps: [
      {
        icon: "Phone",
        title: "Primeiro contato",
        text: "Conte-nos o sintoma, o equipamento e o que já observou; fotos do painel ou capturas online ajudam. Respondemos em até 48 horas úteis e as urgências são coordenadas pelo WhatsApp conforme disponibilidade.",
      },
      {
        icon: "ClipboardCheck",
        title: "Proposta técnica",
        text: "Definimos por escrito escopo, agenda, entregáveis e custo. Sem cobranças fora da proposta.",
      },
      {
        icon: "Wrench",
        title: "Intervenção e encerramento",
        text: "Em planta ou à distância conforme o caso, com testes, documentação técnica e uma recomendação clara para operação e manutenção.",
      },
    ],
  },
};

function ServicesEngagement({ language = "es" }) {
  const copy = serviceEngagementCopy[language] || serviceEngagementCopy.es;
  return (
    <section className="services-engagement-section" aria-labelledby={`services-engagement-${language}`}>
      <div className="mock-home-container">
        <div className="services-section-heading services-workflow-heading">
          <span className="services-section-kicker">{copy.kicker}</span>
          <h2 id={`services-engagement-${language}`}>{copy.title}</h2>
          <p>{copy.intro}</p>
        </div>
        <ol className="services-workflow-grid services-engagement-grid">
          {copy.steps.map((step) => (
            <li className="services-workflow-card services-engagement-step" key={step.title}>
              <Icon name={step.icon} size={26} />
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const copilotServiceCopy = {
  es: {
    eyebrow: "Software B2B para generación",
    title: "Copiloto de Turbinas",
    text: "Historial de instrumentación, rondas y documentación técnica reunidos por máquina y por tag. Conoce el flujo en un entorno de demostración con datos de ejemplo.",
    action: "Conocer Copiloto",
    href: "/servicios/copiloto-de-turbinas",
  },
  en: {
    eyebrow: "B2B software for generation",
    title: "Turbine Copilot",
    text: "Instrument history, inspection rounds and technical documents organized by unit and tag. Explore the workflow in a demonstration environment with sample data.",
    action: "Explore Turbine Copilot",
    href: "/en/services/turbine-copilot",
  },
  pt: {
    eyebrow: "Software B2B para geração",
    title: "Copiloto de Turbinas",
    text: "Histórico de instrumentação, rondas e documentos técnicos organizados por máquina e tag. Conheça o fluxo em um ambiente de demonstração com dados de exemplo.",
    action: "Conhecer o Copiloto",
    href: "/pt/servicos/copiloto-de-turbinas",
  },
};

function CopilotServiceTeaser({ language }) {
  const copy = copilotServiceCopy[language];
  return (
    <section className="services-copilot-feature" aria-labelledby={`services-copilot-${language}`}>
      <div className="mock-home-container services-copilot-feature-inner">
        <div>
          <p>{copy.eyebrow}</p>
          <h2 id={`services-copilot-${language}`}>{copy.title}</h2>
          <span>{copy.text}</span>
        </div>
        <a href={copy.href}>{copy.action}<ArrowRight size={18} aria-hidden="true" /></a>
      </div>
    </section>
  );
}

const servicesAreaCards = [
  {
    icon: "FileSearch",
    title: "Diagnóstico de fallas",
    text: "Análisis técnico y búsqueda de causa raíz",
  },
  {
    icon: "Settings",
    title: "Automatización industrial",
    text: "PLC, HMI, SCADA y puesta en marcha",
  },
  {
    icon: "RefreshCcw",
    title: "Migraciones",
    text: "Actualización de sistemas y plataformas",
  },
  {
    icon: "Network",
    title: "Redes industriales",
    text: "PROFIBUS, PROFINET y comunicación",
  },
  {
    icon: "Gauge",
    title: "Instrumentación y señales",
    text: "Sensores, 4-20 mA y señales de campo",
  },
  {
    icon: "Zap",
    title: "Electricidad y tableros",
    text: "Tableros, protecciones y fuerza",
  },
];

const serviceWorkflowCards = [
  {
    icon: "FileSearch",
    title: "Diagnóstico con evidencia",
    text: "Relevamos síntomas, estado del sistema y condiciones de campo antes de intervenir.",
  },
  {
    icon: "ClipboardCheck",
    title: "Decisión técnica clara",
    text: "Priorizamos causa probable, riesgo operativo y próximo paso técnico.",
  },
  {
    icon: "ShieldCheck",
    title: "Intervención orientada a continuidad",
    text: "Buscamos reducir paradas, evitar cambios innecesarios y sostener la operación.",
  },
];

const servicesExperienceCards = [
  {
    icon: "Zap",
    title: "Oil & Gas / Energía",
    text: "Sistemas críticos, generación, compresión, tableros y continuidad operativa.",
  },
  {
    icon: "Factory",
    title: "Alimentos y procesos",
    text: "Puesta en marcha, control de proceso, señales y soporte a producción.",
  },
  {
    icon: "Settings",
    title: "Papel / Manufactura",
    text: "Automatización, variadores, diagnóstico y mejoras en líneas industriales.",
  },
  {
    icon: "Gauge",
    title: "Tratamiento de agua / Servicios industriales",
    text: "Control, instrumentación, bombas, tableros y sistemas auxiliares.",
  },
  {
    icon: "ClipboardCheck",
    title: "Ingeniería y puesta en marcha",
    text: "Validación en campo, pruebas SAT, documentación y asistencia técnica.",
  },
];

const mainServiceCards = [
  {
    icon: "FileSearch",
    title: "Diagnóstico de fallas industriales",
    description:
      "Detección y análisis de fallas para reducir paradas, separar causa probable y evitar cambios innecesarios.",
    applications: [
      "PLC Siemens S5, S7-200, S7-300, S7-400, S7-1200 y S7-1500",
      "TIA Portal y STEP 7 Classic",
      "Señales digitales y analógicas",
      "Lógica secuencial, PID y variadores",
    ],
    result: "Diagnóstico claro, causa raíz identificada y plan de acción con evidencia.",
    when: "Ante paradas repetitivas, fallas intermitentes o falta de criterio técnico.",
  },
  {
    icon: "Settings",
    title: "Automatización industrial",
    description: "Diseño, modificación y puesta en marcha de sistemas de control.",
    applications: [
      "PLC Siemens y otras marcas",
      "HMI / SCADA",
      "Variadores / servomotores",
      "Lógica, secuencias y seguridad",
    ],
    result: "Sistema estable, funcional y listo para producir con menor dependencia externa.",
    when: "Cuando hay nuevas funciones, mejoras o falta de flexibilidad en el sistema actual.",
  },
  {
    icon: "RefreshCcw",
    title: "Migraciones",
    description: "Actualización y migración de sistemas antiguos hacia plataformas modernas.",
    applications: [
      "Migración Siemens S5 a S7/TIA",
      "Migración S7-300/400 a S7-1200/1500",
      "Migraciones PLC y HMI",
      "Backups y documentación técnica",
    ],
    result: "Sistema actualizado, documentado y preparado para el largo plazo.",
    when: "Cuando hay equipos obsoletos, falta de repuestos, software antiguo o riesgo operativo.",
  },
  {
    icon: "Network",
    title: "Redes industriales",
    description:
      "Diseño, instalación y diagnóstico de redes industriales que conectan PLC, HMI, drives y periferia distribuida.",
    applications: [
      "PROFIBUS DP",
      "PROFINET",
      "Ethernet industrial",
      "Diagnóstico de nodos, conectores y comunicación PLC-HMI-Drive",
    ],
    result: "Redes estables, seguras y con comunicación confiable.",
    when: "Ante fallas de comunicación, BF, nodos perdidos, latencias o necesidad de expandir la red.",
  },
];

const secondaryServiceCards = [
  {
    icon: "Gauge",
    title: "Instrumentación y señales de campo",
    text: "Diagnóstico e integración de señales de campo para que el PLC lea el proceso de forma confiable.",
    applications: ["4-20 mA / 0-10 V", "Sensores y transmisores", "Presión, temperatura, nivel y caudal", "Escalado de señales", "Fallas de cableado y lazo"],
  },
  {
    icon: "Cable",
    title: "Electricidad industrial y tableros",
    text: "Relevamiento, diagnóstico y mejora de tableros de control, fuerza, mando, protecciones y conexionado de campo.",
    applications: ["Tableros de control y fuerza", "MCC", "Arranques de motores", "Protecciones", "Ordenamiento y documentación"],
  },
  {
    icon: "GraduationCap",
    title: "Capacitación técnica industrial",
    text: "Formación práctica para técnicos, instrumentistas, electricistas, ingenieros y mantenimiento que necesitan actuar frente a equipos reales.",
    applications: ["PLC Siemens", "Diagnóstico de fallas", "Redes industriales", "TIA Portal y STEP 7 Classic", "Señales analógicas y variadores", "Cursos in-company y grabados"],
  },
];



function ServicesPage() {
  const scrollToServiceDetails = (event) => {
    event.preventDefault();
    focusHashTarget("#areas-de-servicio");
  };

  return (
    <div className="services-redesign-page">
      <Hero
        image={heroServicios}
        eyebrow="Servicios industriales"
        title="Diagnóstico e ingeniería para resolver fallas y sostener la operación"
        subtitle="PLC, HMI, SCADA, redes, tableros e instrumentación. Relevamos el problema, ordenamos la causa probable y definimos el próximo paso técnico con evidencia de campo."
        primary={{ label: "Solicitar diagnóstico", href: whatsappUrl("Hola, escribo desde la web de BOJ para solicitar un diagnóstico industrial.") }}
        secondary={{ label: "Ver qué podemos resolver", href: "/servicios#areas-de-servicio", onClick: scrollToServiceDetails }}
        aside={(
          <aside className="services-intake-card" aria-label="Datos útiles para iniciar un diagnóstico">
            <p className="services-intake-eyebrow">Para orientar el primer contacto</p>
            <h2>¿Qué está pasando en planta?</h2>
            <ul>
              <li>
                <span>01</span>
                <div>
                  <strong>Falla o parada</strong>
                  <p>PLC, HMI, red, señal o accionamiento.</p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <strong>Equipo involucrado</strong>
                  <p>Marca, modelo y sector del proceso.</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <strong>Evidencia disponible</strong>
                  <p>Fotos, alarmas, backup o descripción breve.</p>
                </div>
              </li>
            </ul>
            <p className="services-intake-note">
              <ClipboardCheck size={18} aria-hidden="true" />
              <span>Con esos datos podemos ordenar alcance, riesgo y próximo paso técnico.</span>
            </p>
          </aside>
        )}
      />

      <section className="services-redesign-section services-areas-section" id="areas-de-servicio" data-surface="light">
        <div className="mock-home-container">
          <div className="services-section-heading services-area-heading">
            <h2>Qué necesitas resolver</h2>
            <p>Elige el punto de entrada más cercano al problema actual.</p>
          </div>
          <div className="services-area-grid">
            {servicesAreaCards.map((card) => (
              <article className="services-area-card" key={card.title}>
                <Icon name={card.icon} size={30} />
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-redesign-section services-main-section" id="servicios-principales" data-surface="dark">
        <div className="mock-home-container">
          <div className="services-section-heading services-main-heading">
            <h2>Cómo podemos intervenir</h2>
            <p>Alcance, aplicaciones y resultado esperado de cada servicio principal.</p>
          </div>
          <div className="services-main-grid">
            {mainServiceCards.map((service) => (
              <ServicePrimaryCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="services-field-section" data-surface="light">
        <div className="mock-home-container">
          <div className="services-section-heading services-field-heading">
            <h2>Experiencia en campo industrial</h2>
            <p>
              Intervenciones realizadas en plantas y procesos donde la continuidad operativa, el diagnóstico
              rápido y la puesta en marcha segura son críticos.
            </p>
          </div>
          <div className="services-field-grid">
            {servicesExperienceCards.map((card) => (
              <article className="services-field-card" key={card.title}>
                <Icon name={card.icon} size={30} />
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-redesign-section services-secondary-section" data-surface="dark">
        <div className="mock-home-container">
          <div className="services-section-heading services-secondary-heading">
            <h2>Servicios complementarios</h2>
            <p>Soporte técnico para señales, tableros y formación aplicada al mantenimiento industrial.</p>
          </div>
          <div className="services-secondary-grid">
            {secondaryServiceCards.map((service) => (
              <ServiceSecondaryCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="services-workflow-section" data-surface="light">
        <div className="mock-home-container">
          <div className="services-section-heading services-workflow-heading">
            <h2>Un método para intervenir con criterio</h2>
            <p>Del síntoma al próximo paso técnico, con evidencia, alcance claro y una intervención acorde al riesgo.</p>
          </div>
          <div className="services-workflow-grid">
            {serviceWorkflowCards.map((card) => (
              <article className="services-workflow-card" key={card.title}>
                <Icon name={card.icon} size={26} />
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CopilotServiceTeaser language="es" />
      <ServicesEngagement language="es" />

      <FounderBlock language="es" id="services-founder" />

      <S7Testimonials language="es" limit={2} />

      <section className="services-redesign-cta" data-surface="dark">
        <img src={plantVisual} alt="" aria-hidden="true" width="800" height="531" loading="lazy" decoding="async" />
        <div className="services-redesign-cta-overlay" aria-hidden="true" />
        <div className="mock-home-container services-redesign-cta-content">
          <h2>Cuando una falla, migración o mejora requiere criterio técnico</h2>
          <p>
            La consulta puede iniciar con el síntoma, el PLC involucrado, fotos del tablero o una
            descripción breve del proceso. La respuesta inicial ordena alcance, riesgo y próximo paso técnico.
          </p>
          <div className="services-redesign-actions">
            <a
              className="mock-btn mock-btn-whatsapp"
              href={whatsappUrl("Hola, escribo desde la web de BOJ para consultar por un servicio técnico industrial.")}
            >
              <Phone size={18} /> Consultar por WhatsApp
            </a>
            <a className="mock-btn mock-btn-outline" href="/contacto">
              Ir a contacto <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function ServicePrimaryCard({ service }) {
  return (
    <article className="services-primary-card">
      <div className="services-primary-head">
        <span>
          <Icon name={service.icon} size={34} />
        </span>
        <div>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </div>
      </div>
      <div className="services-primary-body">
        <ServiceInfoBlock title="Aplicaciones">
          <ul>
            {service.applications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </ServiceInfoBlock>
        <ServiceInfoBlock title="Resultado esperado">
          <p>{service.result}</p>
        </ServiceInfoBlock>
        <ServiceInfoBlock title="Cuándo conviene consultar">
          <p>{service.when}</p>
        </ServiceInfoBlock>
      </div>
      <a
        className="services-consult-link"
        href={whatsappUrl(`Hola, escribo desde la web de BOJ para consultar por ${service.title}.`)}
      >
        Consultar este servicio <ArrowRight size={16} />
      </a>
    </article>
  );
}

function ServiceInfoBlock({ title, children }) {
  return (
    <div className="services-info-block">
      <h4>{title}</h4>
      {children}
    </div>
  );
}

function ServiceSecondaryCard({ service }) {
  return (
    <article className="services-secondary-card">
      <div>
        <Icon name={service.icon} size={28} />
        <h3>{service.title}</h3>
      </div>
      <p>{service.text}</p>
      <ul>
        {service.applications.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

function EnglishServicesPage() {
  return (
    <div className="services-redesign-page english-page" data-language="en">
      <Hero
        image={heroServicios}
        eyebrow="INDUSTRIAL SERVICES"
        title="Diagnostics and engineering to restore and improve plant operation"
        subtitle="PLC, HMI, SCADA, industrial networks, control panels and instrumentation. We organize the evidence, narrow down the likely cause and define the next technical step."
        primary={{ label: "Request diagnostics", href: whatsappUrl("Hello, I need support with an industrial diagnostics or automation case."), external: true }}
        secondary={{ label: "Explore services", href: "#en-service-areas" }}
        aside={(
          <aside className="services-intake-card" aria-label="Information that helps start a diagnostic assessment">
            <p className="services-intake-eyebrow">Useful information for the first contact</p>
            <h2>What is happening in the plant?</h2>
            <ul>
              <li><span>01</span><div><strong>Fault or stoppage</strong><p>PLC, HMI, network, signal or actuator.</p></div></li>
              <li><span>02</span><div><strong>Equipment involved</strong><p>Brand, model and process area.</p></div></li>
              <li><span>03</span><div><strong>Available evidence</strong><p>Photos, alarms, backup or a short description.</p></div></li>
            </ul>
            <p className="services-intake-note"><ClipboardCheck size={18} /><span>This is enough to organize scope, risk and the next technical action.</span></p>
          </aside>
        )}
      />

      <section className="services-redesign-section services-areas-section" id="en-service-areas" data-surface="light">
        <div className="mock-home-container">
          <div className="services-section-heading services-area-heading">
            <h2>What do you need to solve?</h2>
            <p>Choose the starting point that best matches the current situation.</p>
          </div>
          <div className="services-area-grid">
            {englishServices.areas.map((card) => (
              <article className="services-area-card" key={card.title}>
                <Icon name={card.icon} size={30} /><h3>{card.title}</h3><p>{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-redesign-section services-main-section" data-surface="dark">
        <div className="mock-home-container">
          <div className="services-section-heading services-main-heading">
            <h2>How we can support your operation</h2>
            <p>Scope, typical applications and expected outcome for each core service.</p>
          </div>
          <div className="services-main-grid">
            {englishServices.primary.map((service) => (
              <article className="services-primary-card" key={service.title}>
                <div className="services-primary-head">
                  <span><Icon name={service.icon} size={34} /></span>
                  <div><h3>{service.title}</h3><p>{service.description}</p></div>
                </div>
                <div className="services-primary-body">
                  <ServiceInfoBlock title="Applications">
                    <ul>{service.applications.map((item) => <li key={item}>{item}</li>)}</ul>
                  </ServiceInfoBlock>
                  <ServiceInfoBlock title="Expected outcome"><p>{service.result}</p></ServiceInfoBlock>
                  <ServiceInfoBlock title="When to contact us"><p>{service.when}</p></ServiceInfoBlock>
                </div>
                <a className="services-consult-link" href={whatsappUrl(`Hello, I would like to discuss ${service.title.toLowerCase()}.`)}>
                  Discuss this service <ArrowRight size={16} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-field-section" data-surface="light">
        <div className="mock-home-container">
          <div className="services-section-heading services-field-heading">
            <h2>Experience in industrial environments</h2>
            <p>Work performed where operational continuity, safe commissioning and reliable diagnostics matter.</p>
          </div>
          <div className="services-field-grid">
            {englishServices.field.map((card) => (
              <article className="services-field-card" key={card.title}>
                <Icon name={card.icon} size={30} /><h3>{card.title}</h3><p>{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-redesign-section services-secondary-section" data-surface="dark">
        <div className="mock-home-container">
          <div className="services-section-heading services-secondary-heading">
            <h2>Complementary services</h2>
            <p>Technical support for signals, control panels and applied industrial maintenance training.</p>
          </div>
          <div className="services-secondary-grid">
            {englishServices.secondary.map((service) => (
              <ServiceSecondaryCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="services-workflow-section" data-surface="light">
        <div className="mock-home-container">
          <div className="services-section-heading services-workflow-heading">
            <h2>A method for making better technical decisions</h2>
            <p>From the symptom to a practical next step, with field evidence and a clear intervention scope.</p>
          </div>
          <div className="services-workflow-grid">
            {englishServices.workflow.map((card) => (
              <article className="services-workflow-card" key={card.title}>
                <Icon name={card.icon} size={26} /><h3>{card.title}</h3><p>{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CopilotServiceTeaser language="en" />
      <ServicesEngagement language="en" />

      <FounderBlock language="en" id="en-services-founder" />

      <S7Testimonials language="en" limit={2} />

      <section className="services-redesign-cta" data-surface="dark">
        <img src={plantVisual} alt="" aria-hidden="true" width="800" height="531" loading="lazy" decoding="async" />
        <div className="services-redesign-cta-overlay" aria-hidden="true" />
        <div className="mock-home-container services-redesign-cta-content">
          <h2>Start with the symptom, the equipment and the evidence you already have</h2>
          <p>We can use that information to define scope, risk and the most useful technical next step.</p>
          <div className="services-redesign-actions">
            <a className="mock-btn mock-btn-whatsapp" href={whatsappUrl("Hello, I would like to discuss an industrial technical service.")}>
              <Phone size={18} /> Contact us on WhatsApp
            </a>
            <a className="mock-btn mock-btn-outline" href="/en/contact">Contact details <ArrowRight size={18} /></a>
          </div>
        </div>
      </section>
    </div>
  );
}

function EnglishProjectsPage() {
  return <LocalizedWorksPage language="en" />;
}

function PortugueseServicesPage() {
  return (
    <div className="services-redesign-page portuguese-page" data-language="pt">
      <Hero image={heroServicios} eyebrow="SERVIÇOS INDUSTRIAIS" title="Diagnóstico e engenharia para restabelecer e melhorar a operação da planta" subtitle="PLC, IHM, SCADA, redes industriais, painéis de controle e instrumentação. Organizamos as evidências, delimitamos a causa provável e definimos o próximo passo técnico." primary={{ label: "Solicitar diagnóstico", href: whatsappUrl("Olá, preciso de suporte em um caso de diagnóstico ou automação industrial."), external: true }} secondary={{ label: "Conhecer os serviços", href: "#pt-areas-servico" }} aside={<aside className="services-intake-card" aria-label="Informações úteis para iniciar uma avaliação de diagnóstico"><p className="services-intake-eyebrow">Informações úteis para o primeiro contato</p><h2>O que está acontecendo na planta?</h2><ul><li><span>01</span><div><strong>Falha ou parada</strong><p>PLC, IHM, rede, sinal ou atuador.</p></div></li><li><span>02</span><div><strong>Equipamento envolvido</strong><p>Marca, modelo e área do processo.</p></div></li><li><span>03</span><div><strong>Evidências disponíveis</strong><p>Fotos, alarmes, backup ou uma breve descrição.</p></div></li></ul><p className="services-intake-note"><ClipboardCheck size={18} /><span>Isso é suficiente para organizar escopo, risco e a próxima ação técnica.</span></p></aside>} />
      <section className="services-redesign-section services-areas-section" id="pt-areas-servico" data-surface="light"><div className="mock-home-container"><div className="services-section-heading services-area-heading"><h2>O que você precisa resolver?</h2><p>Escolha o ponto de partida que melhor representa a situação atual.</p></div><div className="services-area-grid">{portugueseServices.areas.map((card) => <article className="services-area-card" key={card.title}><Icon name={card.icon} size={30} /><h3>{card.title}</h3><p>{card.text}</p></article>)}</div></div></section>
      <section className="services-redesign-section services-main-section" data-surface="dark"><div className="mock-home-container"><div className="services-section-heading services-main-heading"><h2>Como podemos apoiar sua operação</h2><p>Escopo, aplicações típicas e resultado esperado de cada serviço principal.</p></div><div className="services-main-grid">{portugueseServices.primary.map((service) => <article className="services-primary-card" key={service.title}><div className="services-primary-head"><span><Icon name={service.icon} size={34} /></span><div><h3>{service.title}</h3><p>{service.description}</p></div></div><div className="services-primary-body"><ServiceInfoBlock title="Aplicações"><ul>{service.applications.map((item) => <li key={item}>{item}</li>)}</ul></ServiceInfoBlock><ServiceInfoBlock title="Resultado esperado"><p>{service.result}</p></ServiceInfoBlock><ServiceInfoBlock title="Quando entrar em contato"><p>{service.when}</p></ServiceInfoBlock></div><a className="services-consult-link" href={whatsappUrl(`Olá, gostaria de conversar sobre ${service.title.toLowerCase()}.`)}>Consultar este serviço <ArrowRight size={16} /></a></article>)}</div></div></section>
      <section className="services-field-section" data-surface="light"><div className="mock-home-container"><div className="services-section-heading services-field-heading"><h2>Experiência em ambientes industriais</h2><p>Trabalho realizado onde continuidade operacional, partida segura e diagnóstico confiável são essenciais.</p></div><div className="services-field-grid">{portugueseServices.field.map((card) => <article className="services-field-card" key={card.title}><Icon name={card.icon} size={30} /><h3>{card.title}</h3><p>{card.text}</p></article>)}</div></div></section>
      <section className="services-redesign-section services-secondary-section" data-surface="dark"><div className="mock-home-container"><div className="services-section-heading services-secondary-heading"><h2>Serviços complementares</h2><p>Suporte técnico para sinais, painéis e capacitação aplicada à manutenção industrial.</p></div><div className="services-secondary-grid">{portugueseServices.secondary.map((service) => <ServiceSecondaryCard key={service.title} service={service} />)}</div></div></section>
      <section className="services-workflow-section" data-surface="light"><div className="mock-home-container"><div className="services-section-heading services-workflow-heading"><h2>Um método para tomar melhores decisões técnicas</h2><p>Do sintoma ao próximo passo prático, com evidências de campo e um escopo de intervenção claro.</p></div><div className="services-workflow-grid">{portugueseServices.workflow.map((card) => <article className="services-workflow-card" key={card.title}><Icon name={card.icon} size={26} /><h3>{card.title}</h3><p>{card.text}</p></article>)}</div></div></section>
      <CopilotServiceTeaser language="pt" />
      <ServicesEngagement language="pt" />
      <FounderBlock language="pt" id="pt-services-founder" />
      <S7Testimonials language="pt" limit={2} />
      <section className="services-redesign-cta" data-surface="dark"><img src={plantVisual} alt="" aria-hidden="true" width="800" height="531" loading="lazy" decoding="async" /><div className="services-redesign-cta-overlay" aria-hidden="true" /><div className="mock-home-container services-redesign-cta-content"><h2>Comece pelo sintoma, pelo equipamento e pelas evidências que já possui</h2><p>Podemos usar essas informações para definir o escopo, o risco e o próximo passo técnico mais útil.</p><div className="services-redesign-actions"><a className="mock-btn mock-btn-whatsapp" href={whatsappUrl("Olá, gostaria de conversar sobre um serviço técnico industrial.")}><Phone size={18} /> Falar pelo WhatsApp</a><a className="mock-btn mock-btn-outline" href="/pt/contato">Dados de contato <ArrowRight size={18} /></a></div></div></section>
    </div>
  );
}

function PortugueseProjectsPage() {
  return <LocalizedWorksPage language="pt" />;
}

function WorksPage() {
  return <LocalizedWorksPage language="es" />;
}

const worksPageCopy = {
  es: {
    eyebrow: "Obras", title: "Obras y trabajos realizados en entornos industriales",
    subtitle: "Casos de ingeniería, programación PLC, HMI, SCADA, tableros, migraciones y puesta en marcha presentados con problema inicial, intervención y resultado.",
    primary: "Solicitar diagnóstico", primaryText: "Hola, escribo desde la web de BOJ para consultar por una obra o intervención industrial similar.",
    secondary: "Ver servicios", servicesPath: "/servicios",
    archive: (count) => `Ver ${count} obras adicionales`, archiveText: "Casos completos con problema, intervención y resultado",
    ctaTitle: "Intervenciones técnicas para problemas reales de planta", ctaText: "El análisis puede partir del problema operativo, revisar el estado técnico actual y definir una solución con alcance claro, pruebas y puesta en marcha.",
    ctaPrimary: "Consultar por una obra similar", work: "OBRA", realPhoto: "Fotografía real", illustration: "Imagen ilustrativa",
    openPhoto: "Abrir fotografía", morePhotos: "Más fotografías", problem: "Problema inicial", intervention: "Intervención", result: "Resultado", related: "Otros trabajos realizados en CALSA",
    prepEyebrow: "Portfolio técnico con obras reales", prepTitle: "Experiencia presentada como problema, intervención y resultado",
    prepText: "Cada caso resume una situación real de planta: qué necesitaba el sistema, cómo se intervino y qué valor técnico quedó para operación o mantenimiento.",
    slots: ["Ingeniería", "PLC / HMI / SCADA", "Puesta en marcha"],
  },
  en: {
    eyebrow: "INDUSTRIAL PROJECTS", title: "Engineering and automation work completed in real plants",
    subtitle: "Selected cases involving PLC programming, HMI, SCADA, control panels, migrations and commissioning.",
    primary: "Discuss a similar project", primaryText: "Hello, I would like to discuss an industrial automation project similar to your previous work.",
    secondary: "View services", servicesPath: "/en/services",
    archive: (count) => `View ${count} additional projects`, archiveText: "Complete cases with the initial problem, work performed and result",
    ctaTitle: "Technical work for real plant problems", ctaText: "Tell us what the system is doing, what equipment is involved and what evidence is available.",
    ctaPrimary: "Discuss a similar project", work: "PROJECT", realPhoto: "Actual project photograph", illustration: "Illustrative image",
    openPhoto: "Open photograph", morePhotos: "More photographs", problem: "Initial problem", intervention: "Intervention", result: "Result", related: "Other work completed at CALSA",
    prepEyebrow: "REAL PROJECT EXPERIENCE", prepTitle: "Each case is presented as a problem, intervention and result",
    prepText: "Each case describes work carried out in a real plant, with photographs of the installation and the intervention.",
    slots: ["Engineering", "PLC / HMI / SCADA", "Commissioning"],
  },
  pt: {
    eyebrow: "PROJETOS INDUSTRIAIS", title: "Trabalhos de engenharia e automação realizados em plantas reais",
    subtitle: "Casos selecionados de programação de PLC, IHM, SCADA, painéis de controle, migrações e comissionamento.",
    primary: "Consultar projeto semelhante", primaryText: "Olá, gostaria de conversar sobre um projeto de automação industrial semelhante aos projetos apresentados.",
    secondary: "Ver serviços", servicesPath: "/pt/servicos",
    archive: (count) => `Ver ${count} projetos adicionais`, archiveText: "Casos completos com problema inicial, intervenção e resultado",
    ctaTitle: "Trabalho técnico para problemas reais de planta", ctaText: "Conte-nos o que o sistema está fazendo, quais equipamentos estão envolvidos e quais evidências estão disponíveis.",
    ctaPrimary: "Consultar projeto semelhante", work: "PROJETO", realPhoto: "Fotografia real", illustration: "Imagem ilustrativa",
    openPhoto: "Abrir fotografia", morePhotos: "Mais fotografias", problem: "Problema inicial", intervention: "Intervenção", result: "Resultado", related: "Outros trabalhos realizados na CALSA",
    prepEyebrow: "EXPERIÊNCIA EM PROJETOS REAIS", prepTitle: "Cada caso apresenta o problema, a intervenção e o resultado",
    prepText: "Cada caso descreve trabalhos realizados em uma planta real, com fotografias da instalação e da intervenção.",
    slots: ["Engenharia", "PLC / IHM / SCADA", "Comissionamento"],
  },
};

function LocalizedWorksPage({ language = "es" }) {
  const copy = worksPageCopy[language] || worksPageCopy.es;
  const localizedProjects = getWorkProjects(language);
  const featuredProjects = localizedProjects.slice(0, 3);
  const additionalProjects = localizedProjects.slice(3);
  return (
    <PageShell
      eyebrow={copy.eyebrow}
      title={copy.title}
      subtitle={copy.subtitle}
      heroImage={heroObras}
      heroPrimary={{ label: copy.primary, href: whatsappUrl(copy.primaryText), external: true }}
      heroSecondary={{ label: copy.secondary, href: copy.servicesPath }}
    >
      <PortfolioPrep language={language} />
      <div className="works-grid">
        {featuredProjects.map((project, index) => <ProjectCard key={project.title} project={project} index={index + 1} language={language} />)}
      </div>
      {additionalProjects.length ? (
        <details className="works-archive">
          <summary><span className="works-archive-summary"><strong>{copy.archive(additionalProjects.length)}</strong><small>{copy.archiveText}</small></span></summary>
          <div className="works-grid works-grid-archive">
            {additionalProjects.map((project, index) => <ProjectCard key={project.title} project={project} index={index + featuredProjects.length + 1} language={language} />)}
          </div>
        </details>
      ) : null}
      <RouteCTA title={copy.ctaTitle} text={copy.ctaText} primaryLabel={copy.ctaPrimary} primaryHref={whatsappUrl(copy.primaryText)} secondaryLabel={copy.secondary} secondaryHref={copy.servicesPath} />
    </PageShell>
  );
}

function ProjectCard({ project, index, language = "es" }) {
  if (project.caseId === "ledesma-bt40") return <LedesmaCase project={project} language={language} />;
  const copy = worksPageCopy[language] || worksPageCopy.es;
  const sourceIndex = project.sourceIndex ?? index - 1;
  const visual = project.photo || getServiceWorkImage(projectWorkImageFiles[sourceIndex]) || projectVisuals[sourceIndex % projectVisuals.length];
  const photos = project.photos?.length ? project.photos : [{ src: visual, alt: project.photoAlt || project.title, caption: project.title }];
  return (
    <ProjectPhotoGallery photos={photos} language={language}>
      {(openPhoto) => (
        <article className="project-card">
          <div className="project-media work-photo-media">
            <button type="button" className="work-photo-opener" onClick={() => openPhoto(0)} aria-label={`${copy.openPhoto}: ${project.title}`}>
              <M2Picture className="project-photo" src={visual} alt={project.photoAlt || project.title} width="1280" height="960" loading="lazy" decoding="async" />
            </button>
            <span>{copy.work} {String(index).padStart(2, "0")}</span>
            <span className="works-image-disclaimer">{project.realPhoto ? copy.realPhoto : copy.illustration}</span>
            <div className="project-media-overlay">
              {project.year ? <strong>{project.year}</strong> : null}
              <small>{project.client}</small>
            </div>
          </div>
          <div className="project-body">
            <div className="project-title-row"><h2>{project.title}</h2></div>
            {project.sector || project.role ? <p className="project-meta-line">{[project.sector, project.role].filter(Boolean).join(" · ")}</p> : null}
            <p>{project.description}</p>
            {project.highlights?.length ? <ul className="project-highlights">{project.highlights.map((item) => <li key={item}><CheckCircle2 size={15} aria-hidden="true" /> {item}</li>)}</ul> : null}
            {project.relatedWorks?.length ? <div><h3>{copy.related}</h3><ul className="project-highlights">{project.relatedWorks.map((item) => <li key={item}><CheckCircle2 size={15} aria-hidden="true" /> {item}</li>)}</ul></div> : null}
            <div className="tag-list">{project.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div>
            {photos.length > 1 ? (
              <div className="work-photo-thumbnails" role="group" aria-label={copy.morePhotos}>
                {photos.slice(1).map((photo, photoIndex) => <button type="button" key={photo.src} onClick={() => openPhoto(photoIndex + 1)} aria-label={`${copy.openPhoto}: ${photo.caption || photo.alt}`}><img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" width="130" height="88" /><span>{photo.caption}</span></button>)}
              </div>
            ) : null}
            <div className="project-result-grid">
              <div><h3>{copy.problem}</h3><p>{project.problem}</p></div>
              <div><h3>{copy.intervention}</h3><p>{project.intervention}</p></div>
              <div><h3>{copy.result}</h3><p>{project.result}</p></div>
            </div>
          </div>
        </article>
      )}
    </ProjectPhotoGallery>
  );
}

function PortfolioPrep({ language = "es" }) {
  const copy = worksPageCopy[language] || worksPageCopy.es;
  return (
    <section className="portfolio-prep">
      <div><p className="eyebrow">{copy.prepEyebrow}</p><h2>{copy.prepTitle}</h2><p>{copy.prepText}</p></div>
      <div className="asset-slots">{copy.slots.map((slot) => <span key={slot}>{slot}</span>)}</div>
    </section>
  );
}

function ServicesRoutes({ route }) {
  if (route === "/servicios") return <ServicesPage />;
  if (route === "/en/services") return <EnglishServicesPage />;
  if (route === "/pt/servicos") return <PortugueseServicesPage />;
  if (route === "/en/projects") return <EnglishProjectsPage />;
  if (route === "/pt/projetos") return <PortugueseProjectsPage />;
  return <WorksPage />;
}

export default ServicesRoutes;
