import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { contact } from "../content.js";
import { whatsappUrl } from "../app/shared-eager.jsx";
import plantDemo from "../assets/copiloto-demo-estado-planta.png";
import instrumentDemo from "../assets/copiloto-demo-ficha-instrumento.png";
import documentsDemo from "../assets/copiloto-demo-busqueda-documental.png";

const copyByLanguage = {
  es: {
    eyebrow: "Software para equipos de generación",
    title: "Copiloto de Turbinas",
    lead: "La historia técnica de cada instrumento, reunida para el equipo de planta.",
    description: "Una aplicación web para registrar lecturas, calibraciones, rondas, alarmas e intervenciones, con la documentación técnica junto a cada equipo.",
    demo: "Solicitar demostración",
    explore: "Ver cómo funciona",
    demoMessage: "Hola, quiero solicitar una demostración de Copiloto de Turbinas con datos de ejemplo para evaluar su aplicación en nuestra planta. Empresa: ",
    demoCaption: "Pantalla de una planta de demostración con datos de ejemplo. No representa una instalación de cliente.",
    demoAlt: "Vista de demostración del estado de planta en Copiloto de Turbinas",
    highlights: ["Historial por instrumento y por unidad", "Trabajo desde navegador, tablet o teléfono", "Propuesta y alcance definidos por planta"],
    problemEyebrow: "El problema que ordena",
    problemTitle: "Lo que pasó con un instrumento debe estar disponible antes de intervenirlo",
    problemText: "En muchas plantas, las lecturas quedan en planillas, las calibraciones en carpetas y los antecedentes de falla en correos. Copiloto reúne esos registros por tag y los relaciona con la máquina y el sistema al que pertenece.",
    instrumentEyebrow: "Instrumentación con contexto",
    instrumentTitle: "Una ficha para consultar y registrar",
    instrumentText: "Cada instrumento reúne rango, límites, lecturas con su origen, calibraciones, alarmas e intervenciones. El técnico puede revisar antecedentes y registrar una nueva observación desde la ficha.",
    instrumentPoints: ["Lecturas identificadas como campo, HMI, DCS o historiador", "Historial de calibraciones e intervenciones por tag", "Acceso por máquina, sistema e instrumento"],
    instrumentAlt: "Ficha de instrumento TE-307 en el entorno de demostración de Copiloto de Turbinas",
    instrumentCaption: "Ficha de instrumento en el entorno de demostración, con datos de ejemplo.",
    workflowId: "copilot-workflow",
    workflowEyebrow: "Trabajo de campo y documentación",
    workflowTitle: "Del recorrido en planta al antecedente consultable",
    workflowIntro: "Rondas, hallazgos y calibraciones quedan asociados al equipo. Los manuales PDF de la planta se pueden buscar y abrir en la página correspondiente.",
    workflows: [
      { title: "Registrar en planta", text: "El técnico carga lecturas, resultados de ronda y calibraciones desde una tablet o un teléfono." },
      { title: "Revisar antecedentes", text: "El equipo consulta alarmas, intervenciones y mediciones anteriores del mismo instrumento." },
      { title: "Consultar documentos", text: "La búsqueda muestra fragmentos del PDF con referencia a la página, sin generar una conclusión automática." },
    ],
    docsAlt: "Resultados de búsqueda documental en un entorno de demostración de Copiloto de Turbinas",
    docsCaption: "Búsqueda documental en el entorno de demostración, con datos de ejemplo.",
    scopeEyebrow: "Alcance técnico",
    scopeTitle: "Qué hace y qué queda fuera",
    scopeText: "Las lecturas las ingresa una persona y queda registrado su origen. Copiloto no adquiere señales en tiempo real ni sustituye al sistema de control, al historiador o a un sistema integral de mantenimiento.",
    scopeNote: "La configuración, el inventario y la documentación se revisan con cada planta antes de definir una propuesta. La demostración utiliza datos de ejemplo.",
    closeEyebrow: "Para plantas y equipos de mantenimiento",
    closeTitle: "Evaluemos el caso de tu planta",
    closeText: "Podemos mostrar el flujo con datos de ejemplo y luego definir qué unidades, instrumentos y documentos convendría incorporar. El alcance y la cotización se acuerdan por separado.",
    email: "Consultar por correo",
    emailSubject: "Consulta B2B - Copiloto de Turbinas",
    related: "¿Buscas diagnóstico guiado para PLC Siemens? Conoce BOJ S7-PLC PRO.",
    relatedLabel: "Ver BOJ S7-PLC PRO",
    relatedPath: "/app",
  },
  en: {
    eyebrow: "Software for power generation teams",
    title: "Turbine Copilot",
    lead: "The technical history of each instrument, available to the plant team.",
    description: "A web application for recording readings, calibrations, inspection rounds, alarms and interventions, with technical documentation close to each asset.",
    demo: "Request a demonstration",
    explore: "See how it works",
    demoMessage: "Hello, I would like a Turbine Copilot demonstration with sample data to assess it for our plant. Company: ",
    demoCaption: "A demonstration plant with sample data. This is not a customer installation.",
    demoAlt: "Demonstration plant overview in Turbine Copilot",
    highlights: ["History by instrument and unit", "Access from a browser, tablet or phone", "Scope and proposal defined per plant"],
    problemEyebrow: "The information gap",
    problemTitle: "An instrument's history should be available before an intervention",
    problemText: "Readings may live in spreadsheets, calibration records in folders, and fault history in email. Turbine Copilot brings those records together by tag and links them to the machine and system involved.",
    instrumentEyebrow: "Instrument context",
    instrumentTitle: "One record for review and field entry",
    instrumentText: "Each instrument brings together range, limits, readings and their source, calibrations, alarms and interventions. A technician can review prior events and record a new observation from the same view.",
    instrumentPoints: ["Readings identified as field, HMI, DCS or historian values", "Calibration and intervention history by tag", "Access by machine, system and instrument"],
    instrumentAlt: "TE-307 instrument record in the Turbine Copilot demonstration environment",
    instrumentCaption: "Instrument record in the demonstration environment, with sample data.",
    workflowId: "copilot-workflow",
    workflowEyebrow: "Field work and documentation",
    workflowTitle: "From the plant round to a usable technical record",
    workflowIntro: "Inspection rounds, findings and calibrations stay linked to the asset. Plant PDF manuals can be searched and opened at the relevant page.",
    workflows: [
      { title: "Record in the field", text: "Technicians enter readings, round results and calibrations from a tablet or phone." },
      { title: "Review prior events", text: "The team can see alarms, interventions and previous measurements for the same instrument." },
      { title: "Consult documents", text: "Search returns PDF excerpts with page references, without generating an automatic conclusion." },
    ],
    docsAlt: "Document search results in the Turbine Copilot demonstration environment",
    docsCaption: "Document search in the demonstration environment, with sample data.",
    scopeEyebrow: "Technical scope",
    scopeTitle: "What it does and what it does not replace",
    scopeText: "A person enters each reading and records its source. Turbine Copilot does not acquire live signals or replace a control system, historian or full maintenance management system.",
    scopeNote: "Configuration, inventory and documents are reviewed with each plant before a proposal is defined. The demonstration uses sample data.",
    closeEyebrow: "For plant and maintenance teams",
    closeTitle: "Let's assess your plant's case",
    closeText: "We can show the workflow using sample data, then define which units, instruments and documents would be relevant. Scope and quotation are agreed separately.",
    email: "Contact us by email",
    emailSubject: "B2B inquiry - Turbine Copilot",
    related: "Looking for guided Siemens PLC diagnostics? Explore BOJ S7-PLC PRO.",
    relatedLabel: "View BOJ S7-PLC PRO",
    relatedPath: "/en/app",
  },
  pt: {
    eyebrow: "Software para equipes de geração",
    title: "Copiloto de Turbinas",
    lead: "O histórico técnico de cada instrumento, reunido para a equipe da planta.",
    description: "Uma aplicação web para registrar leituras, calibrações, rondas, alarmes e intervenções, com a documentação técnica junto a cada equipamento.",
    demo: "Solicitar demonstração",
    explore: "Veja como funciona",
    demoMessage: "Olá, gostaria de solicitar uma demonstração do Copiloto de Turbinas com dados de exemplo para avaliar seu uso em nossa planta. Empresa: ",
    demoCaption: "Tela de uma planta de demonstração com dados de exemplo. Não representa uma instalação de cliente.",
    demoAlt: "Visão de demonstração do estado da planta no Copiloto de Turbinas",
    highlights: ["Histórico por instrumento e unidade", "Acesso pelo navegador, tablet ou telefone", "Escopo e proposta definidos por planta"],
    problemEyebrow: "O problema que organiza",
    problemTitle: "O histórico de um instrumento deve estar disponível antes da intervenção",
    problemText: "Leituras podem ficar em planilhas, calibrações em pastas e falhas anteriores em e-mails. O Copiloto reúne esses registros por tag e os relaciona à máquina e ao sistema correspondente.",
    instrumentEyebrow: "Instrumentação com contexto",
    instrumentTitle: "Uma ficha para consulta e registro",
    instrumentText: "Cada instrumento reúne faixa, limites, leituras com sua origem, calibrações, alarmes e intervenções. O técnico pode consultar o histórico e registrar uma nova observação na mesma ficha.",
    instrumentPoints: ["Leituras identificadas como campo, IHM, DCS ou historiador", "Histórico de calibrações e intervenções por tag", "Acesso por máquina, sistema e instrumento"],
    instrumentAlt: "Ficha do instrumento TE-307 no ambiente de demonstração do Copiloto de Turbinas",
    instrumentCaption: "Ficha de instrumento no ambiente de demonstração, com dados de exemplo.",
    workflowId: "copilot-workflow",
    workflowEyebrow: "Trabalho em campo e documentação",
    workflowTitle: "Da ronda na planta ao histórico consultável",
    workflowIntro: "Rondas, ocorrências e calibrações ficam associados ao equipamento. Os manuais PDF da planta podem ser pesquisados e abertos na página correspondente.",
    workflows: [
      { title: "Registrar em campo", text: "O técnico registra leituras, resultados de ronda e calibrações pelo tablet ou telefone." },
      { title: "Revisar o histórico", text: "A equipe consulta alarmes, intervenções e medições anteriores do mesmo instrumento." },
      { title: "Consultar documentos", text: "A busca mostra trechos do PDF com referência à página, sem gerar uma conclusão automática." },
    ],
    docsAlt: "Resultados de busca documental no ambiente de demonstração do Copiloto de Turbinas",
    docsCaption: "Busca documental no ambiente de demonstração, com dados de exemplo.",
    scopeEyebrow: "Escopo técnico",
    scopeTitle: "O que faz e o que não substitui",
    scopeText: "Uma pessoa registra cada leitura e sua origem. O Copiloto não adquire sinais em tempo real nem substitui o sistema de controle, o historiador ou um sistema completo de gestão de manutenção.",
    scopeNote: "A configuração, o inventário e a documentação são revisados com cada planta antes da proposta. A demonstração usa dados de exemplo.",
    closeEyebrow: "Para plantas e equipes de manutenção",
    closeTitle: "Vamos avaliar sua planta",
    closeText: "Podemos mostrar o fluxo com dados de exemplo e depois definir quais unidades, instrumentos e documentos seriam relevantes. Escopo e orçamento são acordados separadamente.",
    email: "Consultar por e-mail",
    emailSubject: "Consulta B2B - Copiloto de Turbinas",
    related: "Procura diagnóstico guiado para PLC Siemens? Conheça o BOJ S7-PLC PRO.",
    relatedLabel: "Ver BOJ S7-PLC PRO",
    relatedPath: "/pt/app",
  },
};

function DemoImage({ src, alt, caption, className = "", width = 1920, height = 918, priority = false }) {
  return (
    <figure className={`copilot-demo-image ${className}`}>
      <img src={src} alt={alt} width={width} height={height} loading={priority ? "eager" : "lazy"} decoding="async" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function TurbineCopilotPage({ route }) {
  const language = route.startsWith("/en/") ? "en" : route.startsWith("/pt/") ? "pt" : "es";
  const copy = copyByLanguage[language];
  const demoHref = whatsappUrl(copy.demoMessage);
  const emailHref = `mailto:${contact.email}?subject=${encodeURIComponent(copy.emailSubject)}`;

  return (
    <div className="copilot-page">
      <section className="copilot-hero" aria-labelledby="copilot-title">
        <div className="copilot-container copilot-hero-grid">
          <div className="copilot-hero-copy">
            <p className="copilot-eyebrow">{copy.eyebrow}</p>
            <h1 id="copilot-title">{copy.title}</h1>
            <p className="copilot-hero-lead">{copy.lead}</p>
            <p className="copilot-hero-description">{copy.description}</p>
            <div className="copilot-actions">
              <a className="copilot-button copilot-button-primary" href={demoHref} target="_blank" rel="noopener noreferrer">{copy.demo}<ArrowRight size={18} aria-hidden="true" /></a>
              <a className="copilot-button copilot-button-quiet" href={`#${copy.workflowId}`}>{copy.explore}</a>
            </div>
          </div>
          <DemoImage src={plantDemo} alt={copy.demoAlt} caption={copy.demoCaption} className="copilot-hero-image" priority />
        </div>
      </section>

      <div className="copilot-highlights">
        <div className="copilot-container">
          {copy.highlights.map((highlight) => <p key={highlight}><CheckCircle2 size={18} aria-hidden="true" />{highlight}</p>)}
        </div>
      </div>

      <section className="copilot-problem copilot-section" aria-labelledby="copilot-problem-title">
        <div className="copilot-container copilot-problem-grid">
          <p className="copilot-eyebrow">{copy.problemEyebrow}</p>
          <div>
            <h2 id="copilot-problem-title">{copy.problemTitle}</h2>
            <p>{copy.problemText}</p>
          </div>
        </div>
      </section>

      <section className="copilot-section copilot-instrument" aria-labelledby="copilot-instrument-title">
        <div className="copilot-container copilot-feature-grid">
          <div className="copilot-feature-copy">
            <p className="copilot-eyebrow">{copy.instrumentEyebrow}</p>
            <h2 id="copilot-instrument-title">{copy.instrumentTitle}</h2>
            <p>{copy.instrumentText}</p>
            <ul>{copy.instrumentPoints.map((point) => <li key={point}><CheckCircle2 size={17} aria-hidden="true" />{point}</li>)}</ul>
          </div>
          <DemoImage src={instrumentDemo} alt={copy.instrumentAlt} caption={copy.instrumentCaption} width={1904} />
        </div>
      </section>

      <section id={copy.workflowId} className="copilot-section copilot-workflow" aria-labelledby="copilot-workflow-title" tabIndex="-1">
        <div className="copilot-container">
          <div className="copilot-workflow-heading">
            <p className="copilot-eyebrow">{copy.workflowEyebrow}</p>
            <h2 id="copilot-workflow-title">{copy.workflowTitle}</h2>
            <p>{copy.workflowIntro}</p>
          </div>
          <div className="copilot-workflow-grid">
            {copy.workflows.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}
          </div>
          <DemoImage src={documentsDemo} alt={copy.docsAlt} caption={copy.docsCaption} className="copilot-document-image" height={917} />
        </div>
      </section>

      <section className="copilot-section copilot-scope" aria-labelledby="copilot-scope-title">
        <div className="copilot-container copilot-scope-grid">
          <div><p className="copilot-eyebrow">{copy.scopeEyebrow}</p><h2 id="copilot-scope-title">{copy.scopeTitle}</h2></div>
          <div><p>{copy.scopeText}</p><p>{copy.scopeNote}</p></div>
        </div>
      </section>

      <section className="copilot-close" aria-labelledby="copilot-close-title">
        <div className="copilot-container copilot-close-grid">
          <div>
            <p className="copilot-eyebrow">{copy.closeEyebrow}</p>
            <h2 id="copilot-close-title">{copy.closeTitle}</h2>
            <p>{copy.closeText}</p>
          </div>
          <div className="copilot-close-actions">
            <a className="copilot-button copilot-button-primary" href={demoHref} target="_blank" rel="noopener noreferrer">{copy.demo}<ArrowRight size={18} aria-hidden="true" /></a>
            <a className="copilot-button copilot-button-outline" href={emailHref}>{copy.email}<Mail size={16} aria-hidden="true" /></a>
          </div>
        </div>
      </section>

      <aside className="copilot-related"><div className="copilot-container"><p>{copy.related}</p><a href={copy.relatedPath}>{copy.relatedLabel}<ArrowRight size={16} aria-hidden="true" /></a></div></aside>
    </div>
  );
}

export default TurbineCopilotPage;
