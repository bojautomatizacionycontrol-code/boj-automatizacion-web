import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { commercialIdentity, contact, contactChecklist } from "../content.js";
import heroContacto from "../assets/hero-contacto.jpg";
import { track, whatsappUrl } from "../app/shared-eager.jsx";
import { CheckItem, Icon, NotFound, PageShell, PrimaryLink, SecondaryLink, appLicensePlans, appProductUrl, icons } from "./shared.jsx";
import { contactAddresses } from "../contact-addresses.js";

// Las dos direcciones se muestran en una sola línea de contacto.
const contactAddressValue = (
  <>
    {contactAddresses[0]}
    <br />
    {contactAddresses[1]}
  </>
);

const quickServices = [
  "Diagnóstico de fallas",
  "Automatización industrial",
  "Cursos técnicos",
  "Capacitaciones in-company",
  "Migraciones",
  "Redes industriales",
  "App de diagnóstico",
];

const contactDecisionPaths = [
  {
    eyebrow: "Urgencia en planta",
    title: "Falla o línea detenida",
    description:
      "Si la producción está afectada, comparte el síntoma, el equipo involucrado y la prioridad. Coordinamos la disponibilidad y el siguiente paso.",
    action: "Priorizar por WhatsApp",
    icon: "TriangleAlert",
    tone: "urgent",
    href: whatsappUrl(
      "Hola, necesito consultar por una falla o línea detenida. El equipo involucrado y el síntoma son:",
    ),
    external: true,
  },
  {
    eyebrow: "Ingeniería",
    title: "Proyecto, migración o tablero",
    description:
      "Cuéntanos cuál es la instalación actual, el alcance y el objetivo para organizar una primera revisión técnica sin perder contexto.",
    action: "Completar formulario",
    icon: "Wrench",
    tone: "project",
    href: "#consulta-tecnica",
  },
  {
    eyebrow: "Formación y software",
    title: "Curso, App PRO o licencias",
    description:
      "Indica si buscas formación, acceso individual o una solución para un equipo técnico y te orientaremos hacia la opción adecuada.",
    action: "Completar formulario",
    icon: "GraduationCap",
    tone: "training",
    href: "#consulta-tecnica",
  },
];

const legalAppOffers = appLicensePlans.filter(({ contract }) => contract);

async function sendContactForm(payload) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || "No se pudo enviar la consulta.");
  return result;
}

function validateContactValues(values, messages, { requireSubject = false } = {}) {
  const errors = {};
  if (!String(values.name || "").trim()) errors.name = messages.name;
  const email = String(values.email || "").trim();
  if (!email) errors.email = messages.email;
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = messages.emailInvalid;
  if (requireSubject && !String(values.subject || "").trim()) errors.subject = messages.subject;
  if (!String(values.message || "").trim()) errors.message = messages.message;
  return errors;
}

function clearContactFieldError(setErrors, field, value) {
  const normalizedValue = String(value || "").trim();
  const isValid = field === "email"
    ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedValue)
    : Boolean(normalizedValue);
  if (!isValid) return;
  setErrors((current) => {
    if (!current[field]) return current;
    const next = { ...current };
    delete next[field];
    return next;
  });
}

function ContactFieldError({ id, message }) {
  return message ? <span className="field-error" id={id}>{message}</span> : null;
}

function ContactErrorSummary({ errors, fields, title, summaryRef }) {
  const entries = Object.entries(errors);
  if (!entries.length) return null;
  return (
    <div className="form-error-summary" role="alert" tabIndex={-1} ref={summaryRef}>
      <h3>{title}</h3>
      <ul>
        {entries.map(([field, message]) => (
          <li key={field}><a href={`#${fields[field]}`}>{message}</a></li>
        ))}
      </ul>
    </div>
  );
}

function EnglishNotFound() {
  return (
    <PageShell
      eyebrow="Error 404"
      title="Page not found"
      subtitle="The page you requested does not exist or has moved. Return to the English home page to continue."
      heroPrimary={{ label: "Back to home", href: "/en" }}
    />
  );
}

function PortugueseNotFound() {
  return (
    <PageShell
      eyebrow="Erro 404"
      title="Página não encontrada"
      subtitle="A página solicitada não existe ou mudou de endereço. Volte ao início em português para continuar."
      heroPrimary={{ label: "Voltar ao início", href: "/pt" }}
    />
  );
}

const localizedContactCopy = {
  en: {
    quickTitle: "You can also contact us about",
    quickServices: ["Fault diagnostics", "Industrial automation", "Technical courses", "In-company training", "Migrations", "Industrial networks", "Diagnostics app"],
    paths: [
      {
        eyebrow: "Urgent plant issue",
        title: "Fault or stopped line",
        description: "If production is affected, share the symptom, equipment involved and priority so we can coordinate availability and the next step.",
        action: "Prioritize on WhatsApp",
        icon: "TriangleAlert",
        tone: "urgent",
        href: whatsappUrl("Hello, I need support with a plant fault or stopped line. The equipment and symptom are:"),
        external: true,
      },
      {
        eyebrow: "Engineering",
        title: "Project, migration or control panel",
        description: "Describe the current installation, scope and objective so we can organize a useful first technical review.",
        action: "Complete the form",
        icon: "Wrench",
        tone: "project",
        href: "#en-contact-form",
      },
      {
        eyebrow: "Training and software",
        title: "Course, PRO App or licenses",
        description: "Tell us whether you need training, individual access or a solution for a technical team.",
        action: "Complete the form",
        icon: "GraduationCap",
        tone: "training",
        href: "#en-contact-form",
      },
    ],
  },
  pt: {
    quickTitle: "Você também pode consultar sobre",
    quickServices: ["Diagnóstico de falhas", "Automação industrial", "Cursos técnicos", "Capacitação in-company", "Migrações", "Redes industriais", "App de diagnóstico"],
    paths: [
      {
        eyebrow: "Urgência na planta",
        title: "Falha ou linha parada",
        description: "Se a produção foi afetada, informe o sintoma, o equipamento envolvido e a prioridade para coordenarmos a disponibilidade e o próximo passo.",
        action: "Priorizar pelo WhatsApp",
        icon: "TriangleAlert",
        tone: "urgent",
        href: whatsappUrl("Olá, preciso de suporte para uma falha ou linha parada. O equipamento e o sintoma são:"),
        external: true,
      },
      {
        eyebrow: "Engenharia",
        title: "Projeto, migração ou painel",
        description: "Descreva a instalação atual, o escopo e o objetivo para organizarmos uma primeira análise técnica útil.",
        action: "Preencher o formulário",
        icon: "Wrench",
        tone: "project",
        href: "#pt-formulario-contato",
      },
      {
        eyebrow: "Formação e software",
        title: "Curso, App PRO ou licenças",
        description: "Informe se procura formação, acesso individual ou uma solução para uma equipe técnica.",
        action: "Preencher o formulário",
        icon: "GraduationCap",
        tone: "training",
        href: "#pt-formulario-contato",
      },
    ],
  },
};

function LocalizedContactDecisionGrid({ language }) {
  const copy = localizedContactCopy[language];
  return (
    <div className="contact-route-grid" aria-label={copy.quickTitle}>
      {copy.paths.map((path) => (
        <a
          className={`contact-route-card contact-route-card--${path.tone}`}
          href={path.href}
          key={path.title}
          target={path.external ? "_blank" : undefined}
          rel={path.external ? "noreferrer" : undefined}
        >
          <span className="contact-route-icon" aria-hidden="true"><Icon name={path.icon} size={22} /></span>
          <span className="contact-route-kicker">{path.eyebrow}</span>
          <h3>{path.title}</h3>
          <p>{path.description}</p>
          <span className="contact-route-action">{path.action} <ArrowRight size={17} aria-hidden="true" /></span>
        </a>
      ))}
    </div>
  );
}

function LocalizedContactQuickServices({ language }) {
  const copy = localizedContactCopy[language];
  return (
    <section className="inner-section">
      <h2>{copy.quickTitle}</h2>
      <div className="function-grid">
        {copy.quickServices.map((item) => <CheckItem key={item}>{item}</CheckItem>)}
      </div>
    </section>
  );
}

const englishContactServices = ["Industrial fault diagnostics", "Industrial automation", "PLC migration", "Technical training", "BOJ S7-PLC licensing", "Other inquiry"];

function EnglishContactForm() {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", interest: englishContactServices[0], message: "", website: "" });
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");
  const [errors, setErrors] = useState({});
  const summaryRef = useRef(null);
  const fields = { name: "en-contact-name", company: "en-contact-company", email: "en-contact-email", phone: "en-contact-phone", interest: "en-contact-interest", message: "en-contact-message" };
  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    clearContactFieldError(setErrors, event.target.name, event.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateContactValues(form, {
      name: "Enter your name.",
      email: "Enter your email address.",
      emailInvalid: "Enter a valid email address.",
      message: "Describe your inquiry.",
    });
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setStatus("idle");
      setFeedback("");
      window.requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setErrors({});
    setStatus("sending");
    setFeedback("");
    try {
      await sendContactForm({ ...form, subject: `English website inquiry: ${form.interest}` });
      setStatus("success");
      setFeedback("Your inquiry has been sent. We normally reply within two business days.");
      setForm({ name: "", company: "", email: "", phone: "", interest: englishContactServices[0], message: "", website: "" });
      track("contact_form_submit", { location: "contact_page", language: "en", interest: form.interest });
    } catch (error) {
      setStatus("error");
      setFeedback(error.message || "The message could not be sent. You can also contact us on WhatsApp.");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate aria-labelledby="en-contact-form">
      <h2 id="en-contact-form" tabIndex={-1}>Tell us about your case</h2>
      <p>Provide the essential context so we can route your inquiry correctly. Urgent plant faults are coordinated through WhatsApp and depend on availability.</p>
      <ContactErrorSummary errors={errors} fields={fields} title="Check the highlighted fields" summaryRef={summaryRef} />
      <label htmlFor={fields.name}>Name</label><input id={fields.name} name="name" autoComplete="name" value={form.name} onChange={updateField} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? `${fields.name}-error` : undefined} required /><ContactFieldError id={`${fields.name}-error`} message={errors.name} />
      <label htmlFor={fields.company}>Company</label><input id={fields.company} name="company" autoComplete="organization" value={form.company} onChange={updateField} />
      <div className="form-row"><div><label htmlFor={fields.email}>Email</label><input id={fields.email} name="email" type="email" autoComplete="email" value={form.email} onChange={updateField} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? `${fields.email}-error` : undefined} required /><ContactFieldError id={`${fields.email}-error`} message={errors.email} /></div><div><label htmlFor={fields.phone}>Phone</label><input id={fields.phone} name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={updateField} /></div></div>
      <label htmlFor={fields.interest}>Area of interest</label><select id={fields.interest} name="interest" value={form.interest} onChange={updateField}>{englishContactServices.map((service) => <option key={service}>{service}</option>)}</select>
      <label htmlFor={fields.message}>Message</label><textarea id={fields.message} name="message" rows="5" value={form.message} onChange={updateField} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? `${fields.message}-error` : undefined} placeholder="Describe the symptom, equipment, PLC or industrial network involved, or the training you need." required /><ContactFieldError id={`${fields.message}-error`} message={errors.message} />
      <input className="form-honeypot" name="website" value={form.website} onChange={updateField} tabIndex="-1" autoComplete="off" aria-hidden="true" />
      <div className="button-row"><button className="btn primary" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send inquiry"}<ArrowRight size={18} /></button><a className="btn secondary" href={whatsappUrl("Hello, I am contacting BOJ from the English website.")}>Contact us on WhatsApp</a></div>
      <p className="form-privacy-note">See how these details are handled in the <a href="/privacidad" hrefLang="es">privacy policy (Spanish)</a>.</p>
      {feedback ? <p className={`form-feedback ${status}`} role={status === "error" ? "alert" : "status"}>{feedback}</p> : null}
    </form>
  );
}

function EnglishContactPage() {
  const checklist = ["PLC or HMI brand and model", "CPU state and visible LEDs", "Main symptom", "Whether the fault is permanent or intermittent", "Photos or online screenshots, if available"];
  return (
    <PageShell
      eyebrow="CONTACT"
      title="Tell us about the technical problem or solution you need"
      subtitle="Contact BOJ about plant faults, automation projects, technical training or BOJ S7-PLC licensing."
      heroImage={heroContacto}
      heroPrimary={{ label: "Contact us on WhatsApp", href: whatsappUrl("Hello, I am contacting BOJ from the English website."), external: true }}
      heroSecondary={{ label: "Complete the form", href: "#en-contact-form" }}
    >
      <section className="contact-direct contact-decision-intro"><div><p className="eyebrow">START HERE</p><h2>Share the context that best describes your situation</h2><p>A short description helps us separate an urgent plant fault from an engineering, training or licensing inquiry.</p></div></section>
      <LocalizedContactDecisionGrid language="en" />
      <div className="contact-grid">
        <div className="contact-panel">
          <h2>Contact details</h2><p className="contact-panel-intro">Use the form, email or WhatsApp. The information reaches the same technical team.</p>
          <ContactLine icon="Wrench" label="Technical contact" value={contact.responsible} />
          <ContactLine icon="MapPin" label="Registered address" value={contactAddressValue} />
          <ContactLine icon="Globe" label="Coverage" value="All of Argentina · on site and remote" />
          <ContactLine icon="Mail" label="Email" value={contact.email} href={`mailto:${contact.email}`} />
          <ContactLine icon="Phone" label="WhatsApp" value={contact.whatsappDisplay} href={whatsappUrl("Hello, I am contacting BOJ from the English website.")} />
          <div className="social-placeholders"><a href={contact.linktree} target="_blank" rel="noreferrer">BOJ Linktree</a><a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></div>
          <div className="diagnostic-checklist"><h3>Information that helps us give a useful first response</h3>{checklist.map((item) => <CheckItem key={item}>{item}</CheckItem>)}</div>
          <div className="button-row"><PrimaryLink href={whatsappUrl("Hello, I am contacting BOJ from the English website.")}>Contact us on WhatsApp</PrimaryLink><SecondaryLink href={`mailto:${contact.email}`}>Send email</SecondaryLink></div>
        </div>
        <EnglishContactForm />
      </div>
      <LocalizedContactQuickServices language="en" />
    </PageShell>
  );
}

const portugueseContactServices = ["Diagnóstico de falhas industriais", "Automação industrial", "Migração de PLC", "Formação técnica", "Licenças BOJ S7-PLC", "Outra consulta"];

function PortugueseContactForm() {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", interest: portugueseContactServices[0], message: "", website: "" });
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");
  const [errors, setErrors] = useState({});
  const summaryRef = useRef(null);
  const fields = { name: "pt-contact-name", company: "pt-contact-company", email: "pt-contact-email", phone: "pt-contact-phone", interest: "pt-contact-interest", message: "pt-contact-message" };
  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    clearContactFieldError(setErrors, event.target.name, event.target.value);
  };
  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateContactValues(form, {
      name: "Informe seu nome.",
      email: "Informe seu e-mail.",
      emailInvalid: "Informe um e-mail válido.",
      message: "Descreva sua consulta.",
    });
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors); setStatus("idle"); setFeedback("");
      window.requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setErrors({}); setStatus("sending"); setFeedback("");
    try {
      await sendContactForm({ ...form, subject: `Consulta do site em português: ${form.interest}` });
      setStatus("success"); setFeedback("Sua consulta foi enviada. Normalmente respondemos em até dois dias úteis.");
      setForm({ name: "", company: "", email: "", phone: "", interest: portugueseContactServices[0], message: "", website: "" });
      track("contact_form_submit", { location: "contact_page", language: "pt", interest: form.interest });
    } catch (error) { setStatus("error"); setFeedback(error.message || "Não foi possível enviar a mensagem. Você também pode falar conosco pelo WhatsApp."); }
  }
  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate aria-labelledby="pt-formulario-contato">
      <h2 id="pt-formulario-contato" tabIndex={-1}>Conte-nos sobre seu caso</h2>
      <p>Informe o contexto essencial para encaminharmos sua consulta corretamente. Falhas urgentes de planta são coordenadas pelo WhatsApp e dependem de disponibilidade.</p>
      <ContactErrorSummary errors={errors} fields={fields} title="Revise os campos indicados" summaryRef={summaryRef} />
      <label htmlFor={fields.name}>Nome</label><input id={fields.name} name="name" autoComplete="name" value={form.name} onChange={updateField} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? `${fields.name}-error` : undefined} required /><ContactFieldError id={`${fields.name}-error`} message={errors.name} />
      <label htmlFor={fields.company}>Empresa</label><input id={fields.company} name="company" autoComplete="organization" value={form.company} onChange={updateField} />
      <div className="form-row"><div><label htmlFor={fields.email}>E-mail</label><input id={fields.email} name="email" type="email" autoComplete="email" value={form.email} onChange={updateField} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? `${fields.email}-error` : undefined} required /><ContactFieldError id={`${fields.email}-error`} message={errors.email} /></div><div><label htmlFor={fields.phone}>Telefone</label><input id={fields.phone} name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={updateField} /></div></div>
      <label htmlFor={fields.interest}>Área de interesse</label><select id={fields.interest} name="interest" value={form.interest} onChange={updateField}>{portugueseContactServices.map((service) => <option key={service}>{service}</option>)}</select>
      <label htmlFor={fields.message}>Mensagem</label><textarea id={fields.message} name="message" rows="5" value={form.message} onChange={updateField} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? `${fields.message}-error` : undefined} placeholder="Descreva o sintoma, equipamento, PLC ou rede industrial envolvida, ou a formação necessária." required /><ContactFieldError id={`${fields.message}-error`} message={errors.message} />
      <input className="form-honeypot" name="website" value={form.website} onChange={updateField} tabIndex="-1" autoComplete="off" aria-hidden="true" />
      <div className="button-row"><button className="btn primary" type="submit" disabled={status === "sending"}>{status === "sending" ? "Enviando…" : "Enviar consulta"}<ArrowRight size={18} /></button><a className="btn secondary" href={whatsappUrl("Olá, estou entrando em contato com a BOJ pelo site em português.")}>Falar pelo WhatsApp</a></div>
      <p className="form-privacy-note">Veja como tratamos estes dados na <a href="/privacidad" hrefLang="es">política de privacidade (em espanhol)</a>.</p>
      {feedback ? <p className={`form-feedback ${status}`} role={status === "error" ? "alert" : "status"}>{feedback}</p> : null}
    </form>
  );
}

function PortugueseContactPage() {
  const checklist = ["Marca e modelo do PLC ou da IHM", "Estado da CPU e LEDs visíveis", "Sintoma principal", "Se a falha é permanente ou intermitente", "Fotos ou capturas online, se disponíveis"];
  return (
    <PageShell
      eyebrow="CONTATO"
      title="Conte-nos qual problema técnico ou solução você precisa"
      subtitle="Entre em contato com a BOJ sobre falhas de planta, projetos de automação, formação técnica ou licenças BOJ S7-PLC."
      heroImage={heroContacto}
      heroPrimary={{ label: "Falar pelo WhatsApp", href: whatsappUrl("Olá, estou entrando em contato com a BOJ pelo site em português."), external: true }}
      heroSecondary={{ label: "Preencher formulário", href: "#pt-formulario-contato" }}
    >
      <section className="contact-direct contact-decision-intro">
        <div>
          <p className="eyebrow">COMECE AQUI</p>
          <h2>Compartilhe o contexto que melhor descreve sua situação</h2>
          <p>Uma breve descrição nos ajuda a diferenciar uma falha urgente de planta de uma consulta de engenharia, formação ou licenciamento.</p>
        </div>
      </section>
      <LocalizedContactDecisionGrid language="pt" />
      <div className="contact-grid">
        <div className="contact-panel">
          <h2>Dados de contato</h2>
          <p className="contact-panel-intro">Use o formulário, e-mail ou WhatsApp. As informações chegam à mesma equipe técnica.</p>
          <ContactLine icon="Wrench" label="Responsável técnico" value={contact.responsible} />
          <ContactLine icon="MapPin" label="Endereço comercial" value={contactAddressValue} />
          <ContactLine icon="Globe" label="Cobertura" value="Toda a Argentina · em planta e à distância" />
          <ContactLine icon="Mail" label="E-mail" value={contact.email} href={`mailto:${contact.email}`} />
          <ContactLine icon="Phone" label="WhatsApp" value={contact.whatsappDisplay} href={whatsappUrl("Olá, estou entrando em contato com a BOJ pelo site em português.")} />
          <div className="social-placeholders">
            <a href={contact.linktree} target="_blank" rel="noreferrer">Linktree BOJ</a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
          <div className="diagnostic-checklist">
            <h3>Informações que ajudam a oferecer uma primeira resposta útil</h3>
            {checklist.map((item) => <CheckItem key={item}>{item}</CheckItem>)}
          </div>
          <div className="button-row">
            <PrimaryLink href={whatsappUrl("Olá, estou entrando em contato com a BOJ pelo site em português.")}>Falar pelo WhatsApp</PrimaryLink>
            <SecondaryLink href={`mailto:${contact.email}`}>Enviar e-mail</SecondaryLink>
          </div>
        </div>
        <PortugueseContactForm />
      </div>
      <LocalizedContactQuickServices language="pt" />
    </PageShell>
  );
}

function GraciasPage() {
  useEffect(() => {
    // Métrica de la página de retorno. La conversión "purchase" real se define
    // en el bloque 3B (con fuente única y dedupe); aquí no se registra purchase
    // ni begin_checkout.
    track("thank_you_page_view", { item: "curso_s7_app_pro" });
  }, []);

  return (
    <PageShell
      eyebrow="Compra"
      title="Estamos procesando tu operación"
      subtitle="Revisa el correo electrónico utilizado durante la compra. Si el pago todavía está pendiente, recibirás las instrucciones cuando se confirme."
    >
      <div className="gracias-steps">
        <article className="gracias-step">
          <h2>1 · Revisa tu correo electrónico</h2>
          <p>
            Las instrucciones de acceso al material se envían al correo electrónico que utilizaste en la compra. Si no las ves, revisa
            la carpeta de spam o promociones.
          </p>
        </article>
        <article className="gracias-step">
          <h2>2 · Activa tu mes de BOJ S7-PLC PRO</h2>
          <p>
            Conserva el mismo correo electrónico utilizado en la compra. Cuando tu acceso esté disponible, recibirás las
            instrucciones para activar tu mes de BOJ S7-PLC PRO.
          </p>
        </article>
        <article className="gracias-step">
          <h2>3 · ¿Problemas con el acceso?</h2>
          <p>
            Escríbenos y lo resolveremos: <a href={`mailto:${contact.email}`}>{contact.email}</a> o WhatsApp{" "}
            <a href={whatsappUrl("Hola, acabo de comprar el curso S7-300/400 y tengo un problema con el acceso.")}>
              {contact.whatsappDisplay}
            </a>
            .
          </p>
        </article>
      </div>
      <div className="gracias-actions">
        <a className="btn primary" href={appProductUrl} target="_blank" rel="noreferrer">
          Abrir la app
        </a>
        <SecondaryLink href="/">Volver al inicio</SecondaryLink>
      </div>
    </PageShell>
  );
}

function ContactPage() {
  return (
    <PageShell
      eyebrow="Contacto"
      title="Hablemos del problema técnico o la solución que necesitas"
      subtitle="Elige el tipo de consulta y comparte el contexto esencial. Atendemos urgencias de planta, proyectos de automatización, cursos y licencias BOJ S7-PLC PRO."
      heroImage={heroContacto}
      heroPrimary={{ label: "Escribir por WhatsApp", href: whatsappUrl("Hola, escribo desde la web de BOJ para realizar una consulta técnica."), external: true }}
      heroSecondary={{ label: "Completar formulario", href: "#consulta-tecnica" }}
    >
      <section className="contact-direct contact-decision-intro">
        <div>
          <p className="eyebrow">Empieza aquí</p>
          <h2>Elige la consulta que mejor describe tu situación</h2>
          <p>
            Así llegamos a la primera conversación con el contexto correcto, sin hacerte repetir
            información ni mezclar una urgencia de planta con una consulta comercial.
          </p>
        </div>
      </section>

      <div className="contact-route-grid" aria-label="Tipos de consulta">
        {contactDecisionPaths.map((path) => {
          const Icon = icons[path.icon];
          return (
            <a
              className={`contact-route-card contact-route-card--${path.tone}`}
              href={path.href}
              key={path.title}
              target={path.external ? "_blank" : undefined}
              rel={path.external ? "noreferrer" : undefined}
            >
              <span className="contact-route-icon" aria-hidden="true">
                <Icon size={22} />
              </span>
              <span className="contact-route-kicker">{path.eyebrow}</span>
              <h3>{path.title}</h3>
              <p>{path.description}</p>
              <span className="contact-route-action">
                {path.action} <ArrowRight size={17} aria-hidden="true" />
              </span>
            </a>
          );
        })}
      </div>

      <div className="contact-grid">
        <div className="contact-panel">
          <h2>Contacto y datos útiles</h2>
          <p className="contact-panel-intro">
            Si la consulta no es urgente, utiliza el formulario o escríbenos por el canal que te resulte
            más cómodo. La información llega al mismo equipo técnico.
          </p>
          <ContactLine icon="Wrench" label="Responsable" value={contact.responsible} />
          <ContactLine icon="MapPin" label="Domicilio comercial" value={contactAddressValue} />
          <ContactLine icon="Globe" label="Cobertura" value="Toda Argentina · en planta y a distancia" />
          <ContactLine icon="Mail" label="Correo electrónico" value={contact.email} href={`mailto:${contact.email}`} />
          <ContactLine
            icon="Phone"
            label="WhatsApp"
            value={contact.whatsappDisplay}
            href={whatsappUrl("Hola, escribo desde la web de BOJ para consultar por una falla de planta, automatización, cursos o migración.")}
          />
          <div className="social-placeholders">
            <a href={contact.linktree} target="_blank" rel="noreferrer">Linktree BOJ</a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
          <div className="diagnostic-checklist">
            <h3>Para darte una primera respuesta útil</h3>
            {contactChecklist.map((item) => (
              <CheckItem key={item}>{item}</CheckItem>
            ))}
          </div>
          <div className="button-row">
            <PrimaryLink href={whatsappUrl("Hola, escribo desde la web de BOJ para realizar una consulta técnica.")}>
              Contactar por WhatsApp
            </PrimaryLink>
            <SecondaryLink href={`mailto:${contact.email}`}>Enviar correo</SecondaryLink>
          </div>
        </div>

        <ContactForm />
      </div>

      <section className="inner-section">
        <h2>También puedes consultar por</h2>
        <div className="function-grid">
          {quickServices.map((item) => (
            <CheckItem key={item}>{item}</CheckItem>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    interest: "Diagnóstico de fallas",
    message: "",
  });

  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");
  const [errors, setErrors] = useState({});
  const summaryRef = useRef(null);
  const fields = { name: "es-contact-name", company: "es-contact-company", email: "es-contact-email", phone: "es-contact-phone", interest: "es-contact-interest", message: "es-contact-message" };

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    clearContactFieldError(setErrors, name, value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateContactValues(form, {
      name: "Ingresa tu nombre.",
      email: "Ingresa tu correo electrónico.",
      emailInvalid: "Ingresa un correo electrónico válido.",
      message: "Describe tu consulta.",
    });
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setStatus("idle");
      setFeedback("");
      window.requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setErrors({});
    setStatus("sending");
    setFeedback("");
    try {
      await sendContactForm({ ...form, subject: `Consulta: ${form.interest}` });
      setStatus("success");
      setFeedback("Consulta enviada. Respondemos dentro de 48 horas hábiles.");
      setForm({ name: "", company: "", email: "", phone: "", interest: "Diagnóstico de fallas", message: "" });
      track("contact_form_submit", { location: "contact_page", interest: form.interest });
    } catch (error) {
      setStatus("error");
      setFeedback(error.message || "No se pudo enviar. También puede escribirnos por WhatsApp.");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate aria-labelledby="consulta-tecnica">
      <h2 id="consulta-tecnica" tabIndex={-1}>Cuéntanos el caso</h2>
      <p>
        Completa los datos esenciales para derivar correctamente la consulta. Respondemos dentro de 48 horas hábiles;
        las fallas urgentes se coordinan por WhatsApp y están sujetas a disponibilidad.
      </p>
      <ContactErrorSummary errors={errors} fields={fields} title="Revisa los campos indicados" summaryRef={summaryRef} />
      <label htmlFor={fields.name}>Nombre</label>
      <input id={fields.name} name="name" autoComplete="name" value={form.name} onChange={updateField} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? `${fields.name}-error` : undefined} required />
      <ContactFieldError id={`${fields.name}-error`} message={errors.name} />
      <label htmlFor={fields.company}>Empresa</label>
      <input id={fields.company} name="company" autoComplete="organization" value={form.company} onChange={updateField} />
      <div className="form-row">
        <div>
          <label htmlFor={fields.email}>Correo electrónico</label>
          <input id={fields.email} name="email" type="email" autoComplete="email" value={form.email} onChange={updateField} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? `${fields.email}-error` : undefined} required />
          <ContactFieldError id={`${fields.email}-error`} message={errors.email} />
        </div>
        <div>
          <label htmlFor={fields.phone}>Teléfono</label>
          <input id={fields.phone} name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={updateField} />
        </div>
      </div>
      <label htmlFor={fields.interest}>Servicio de interés</label>
      <select id={fields.interest} name="interest" value={form.interest} onChange={updateField}>
        {quickServices.map((service) => (
          <option key={service}>{service}</option>
        ))}
      </select>
      <label htmlFor={fields.message}>Mensaje</label>
      <textarea
        id={fields.message}
        name="message"
        rows="5"
        value={form.message}
        onChange={updateField}
        aria-invalid={Boolean(errors.message)}
        aria-describedby={errors.message ? `${fields.message}-error` : undefined}
        placeholder="Describe el síntoma, el equipo involucrado, el PLC o la red industrial, o la formación requerida."
        required
      />
      <ContactFieldError id={`${fields.message}-error`} message={errors.message} />
      <div className="button-row">
        <button className="btn primary" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Enviando…" : "Enviar consulta"}
          <ArrowRight size={18} />
        </button>
        <a className="btn secondary" href={whatsappUrl("Hola, escribo desde la web de BOJ para realizar una consulta técnica.")}>
          Contactar por WhatsApp
        </a>
      </div>
      <p className="form-privacy-note">Consulta cómo tratamos estos datos en la <a href="/privacidad">Política de privacidad</a>.</p>
      {feedback ? <p className={`form-feedback ${status}`} role={status === "error" ? "alert" : "status"}>{feedback}</p> : null}
    </form>
  );
}

const legalContent = {
  privacy: {
    title: "Política de privacidad",
    intro: "Explica qué datos recopilamos en este sitio, para qué se utilizan, con qué proveedores se comparten y cómo puede ejercer sus derechos.",
    updated: "5 de septiembre de 2026",
    sections: [
      ["Responsable", `BOJ Automatización y Control. Contacto: ${contact.email}.`],
      ["Marco legal", "El tratamiento de datos personales se rige por la Ley 25.326 de Protección de los Datos Personales de la República Argentina y sus normas complementarias. El órgano de control es la Agencia de Acceso a la Información Pública."],
      ["Datos que recopilamos", "El formulario puede solicitar nombre, empresa, correo, teléfono, servicio de interés y mensaje. La lista de espera de cursos solicita nombre, correo y nivel. También podemos registrar métricas anónimas o seudónimas de navegación y conversiones mediante Vercel Web Analytics, que no utiliza cookies de seguimiento."],
      ["Finalidad y base legal", "Usamos los datos para responder consultas, coordinar servicios, avisar sobre cursos solicitados, facilitar acceso a productos adquiridos y mejorar el funcionamiento del sitio. La base es el consentimiento que otorga al enviar cada formulario y la ejecución de la relación contractual o precontractual. No vendemos datos personales ni enviamos publicidad sin pedido previo."],
      ["Proveedores y transferencias internacionales", "El formulario se procesa mediante Resend. Las compras se procesan en Hotmart y la activación de la app puede vincular el correo de compra con Supabase. El sitio se aloja en Vercel. Estos proveedores pueden tratar los datos en servidores ubicados fuera de Argentina, principalmente en Estados Unidos y Brasil, con garantías contractuales de protección de datos. Cada proveedor aplica sus propias condiciones de privacidad."],
      ["Conservación", "Las consultas y solicitudes de aviso se conservan hasta 24 meses desde el último contacto. Los datos vinculados a compras se conservan durante el plazo que exigen las obligaciones fiscales y contables aplicables."],
      ["Derechos", `Puede solicitar acceso, rectificación, actualización o supresión de sus datos escribiendo a ${contact.email}. El titular de los datos personales tiene la facultad de ejercer el derecho de acceso a los mismos en forma gratuita a intervalos no inferiores a seis meses, salvo que se acredite un interés legítimo al efecto, conforme a lo establecido en el artículo 14, inciso 3, de la Ley 25.326. La Agencia de Acceso a la Información Pública, órgano de control de la Ley 25.326, tiene la atribución de atender las denuncias y reclamos que se interpongan con relación al incumplimiento de las normas sobre protección de datos personales.`],
    ],
  },
  terms: {
    title: "Términos y condiciones",
    intro: "Condiciones generales para utilizar el sitio y contratar servicios o productos digitales de BOJ.",
    updated: "30 de agosto de 2026",
    showCommercialIdentity: true,
    showAppOffers: true,
    offerIntro: "Estas son las cuatro ofertas de BOJ S7-PLC PRO publicadas para compra. Los precios se expresan en dólares estadounidenses y el checkout muestra la modalidad antes de confirmar el pago.",
    sections: [
      ["Uso del sitio", "La información técnica es orientativa y no reemplaza procedimientos de planta, evaluación de riesgos, normativa aplicable ni intervención de personal autorizado."],
      ["Servicios técnicos", "Alcance, agenda, entregables, costos y condiciones se confirman por propuesta. La atención urgente es coordinada y está sujeta a disponibilidad."],
      ["Prueba y alcance de BOJ S7-PLC PRO", "La prueba gratuita dura 48 horas, funciona en línea y tiene funciones limitadas. El alcance técnico de BOJ S7-PLC PRO se limita a sistemas Siemens S7-300/400 compatibles. La app organiza síntomas, evidencias, hipótesis priorizadas y verificaciones; no se conecta al PLC, no controla equipos y no reemplaza STEP 7, los procedimientos de seguridad ni el criterio de personal autorizado."],
      ["Compra, activación y Hotmart", `Hotmart procesa los pagos de las ofertas publicadas. BOJ proporciona la licencia, el contenido incluido y el soporte de acceso. La activación se vincula al correo informado durante la compra; si necesita ayuda, escriba a ${contact.email} desde ese mismo correo.`],
      ["Suscripción, cancelación y vigencia", "La suscripción mensual se renueva automáticamente hasta su cancelación. La cancelación se realiza desde la cuenta de comprador en Hotmart, evita cobros futuros y no revoca de inmediato el período ya pagado: el acceso continúa hasta su fecha de vencimiento. Las otras tres ofertas son pagos únicos sin renovación automática."],
      ["Licencia mensual de pago único", "Su vigencia es de un mes calendario. En una licencia nueva o vencida, comienza cuando BOJ procesa la confirmación de pago de Hotmart y activa la licencia; si ya existe una licencia vigente, el mes se suma a su vencimiento actual. Finaliza en la fecha y hora UTC equivalente del mes siguiente; si ese día no existe, finaliza el último día de ese mes a la misma hora UTC. La activación posterior en un dispositivo no reinicia ni extiende el plazo. Es un pago único, no se renueva automáticamente y una nueva vigencia requiere una nueva compra."],
      ["Curso incluido", "Las licencias Profesional y Empresarial incluyen acceso permanente al curso Diagnóstico S7-300/400, con material técnico descargable, guías prácticas y contenidos de apoyo. La suscripción mensual y la licencia mensual de pago único no incluyen el curso."],
      ["Garantía y reembolsos", "Los cuatro checkouts de BOJ S7-PLC PRO muestran una garantía de 7 días. En una suscripción, la posibilidad de reembolso corresponde a la transacción inicial de adhesión; cancelar la renovación no equivale a solicitar un reembolso. El trámite se realiza mediante el flujo de Hotmart."],
      ["Idioma", "Interfaz disponible en seis idiomas. El contenido técnico especializado y los documentos legales se proporcionan actualmente en español."],
      ["Propiedad intelectual", "La compra concede un derecho personal de uso y no autoriza redistribución, reventa, publicación o copia masiva."],
      ["Marcas de terceros", "Siemens, SIMATIC, STEP 7, TIA Portal, S7-300 y S7-400 son marcas de sus respectivos titulares. BOJ es independiente y no está afiliada, patrocinada ni certificada por Siemens."],
    ],
  },
  licenses: {
    title: "Condiciones de licencia de BOJ S7-PLC PRO",
    intro: "Reglas principales de acceso y uso de la herramienta de diagnóstico.",
    updated: "30 de agosto de 2026",
    showCommercialIdentity: true,
    showAppOffers: true,
    offerIntro: "Cada oferta define una duración, un límite de dispositivos, una modalidad de renovación y una ventana de funcionamiento sin conexión.",
    sections: [
      ["Prueba gratuita", "La prueba inicial dura 48 horas, funciona sólo en línea y ofrece funciones limitadas. No constituye una licencia paga ni habilita funcionamiento sin conexión."],
      ["Activación", "Las licencias pagas se vinculan al correo registrado en Hotmart. La duración y el límite de dispositivos dependen de la oferta adquirida."],
      ["Duración, renovación y cancelación", "La suscripción se renueva cada mes hasta su cancelación. Cancelarla en la cuenta de comprador de Hotmart evita cobros futuros y mantiene el acceso hasta el final del período ya pagado. La licencia mensual de pago único dura un mes calendario: en una licencia nueva o vencida, comienza cuando BOJ procesa la confirmación de pago de Hotmart y activa la licencia; si existe una licencia vigente, el mes se suma a su vencimiento actual. Finaliza en la fecha y hora UTC equivalente del mes siguiente o, si ese día no existe, el último día de ese mes a la misma hora UTC. Una activación posterior en un dispositivo no reinicia ni extiende el plazo. Es un pago único sin renovación automática y una nueva vigencia requiere una nueva compra. Profesional y Empresarial también vencen al finalizar su plazo y no se renuevan automáticamente."],
      ["Dispositivos y funcionamiento sin conexión", "La suscripción y la licencia mensual de pago único admiten 1 dispositivo; Profesional admite hasta 2 y Empresarial hasta 10. Las tres primeras licencias pueden funcionar sin conexión hasta 2 días desde la última validación en línea correcta; Empresarial, hasta 7 días. Al agotarse esa ventana, la app requiere volver a validar en línea."],
      ["Alcance de uso", "La licencia es limitada, no exclusiva e intransferible."],
      ["Limitación técnica", "El alcance técnico de BOJ S7-PLC PRO se limita a sistemas Siemens S7-300/400 compatibles. La app organiza síntomas, evidencias, hipótesis priorizadas y verificaciones. No se conecta al PLC, no controla equipos y no sustituye STEP 7, los procedimientos de seguridad ni un diagnóstico profesional."],
      ["Reembolso o contracargo", "Cuando Hotmart confirma un reembolso o contracargo, se revoca el acceso correspondiente a esa compra."],
      ["Soporte e idioma", `El soporte cubre acceso, activación y uso general de la app por correo: ${contact.email}. La interfaz está disponible en seis idiomas; el contenido técnico especializado y los documentos legales se proporcionan actualmente en español.`],
    ],
  },
  refunds: {
    title: "Política de reembolsos",
    intro: "Las compras digitales se procesan en Hotmart y las ofertas publicadas muestran una garantía de reembolso de 7 días.",
    updated: "30 de agosto de 2026",
    showCommercialIdentity: true,
    showAppOffers: true,
    offerIntro: "La garantía publicada para las cuatro ofertas de BOJ S7-PLC PRO es de 7 días y se tramita mediante el proceso de Hotmart.",
    sections: [
      ["Ofertas de BOJ S7-PLC PRO", "Puede solicitar un reembolso dentro del período de garantía de 7 días configurado para la oferta adquirida, mediante el flujo de Hotmart. En la suscripción mensual, esa posibilidad corresponde a la transacción inicial de adhesión y no a cada renovación posterior."],
      ["Cancelación no es reembolso", "Cancelar la suscripción mensual detiene los cobros futuros y conserva el acceso hasta el final del período ya pagado; no devuelve automáticamente el pago. El reembolso debe solicitarse por separado dentro del período aplicable."],
      ["Cómo solicitarlo", `La solicitud puede iniciarse en refund.hotmart.com con los datos de la compra o mediante el soporte de BOJ en ${contact.email}. La aprobación y el procesamiento siguen el flujo de Hotmart.`],
      ["Suscripción y Mensual", "Si Hotmart aprueba el reembolso, se revoca la licencia BOJ S7-PLC PRO vinculada a esa compra. Estas dos ofertas no incluyen curso ni materiales; la licencia mensual de pago único tampoco incluye acceso permanente."],
      ["Profesional y Empresarial", "Si Hotmart aprueba el reembolso, se revocan la licencia BOJ S7-PLC PRO y el acceso permanente al curso y sus materiales vinculados a esa compra."],
      ["Curso S7-300/400", "La oferta independiente del curso también se procesa en Hotmart y muestra una garantía de 7 días. Si el reembolso es aprobado, se revocan el curso, su material y la licencia PRO incluida."],
      ["Servicios técnicos", "Los servicios profesionales se rigen por la propuesta aceptada y por el trabajo coordinado o realizado."],
      ["Ayuda", `Si tiene un problema de acceso, escriba a ${contact.email} desde el correo utilizado en Hotmart.`],
    ],
  },
};

function LegalPage({ type }) {
  const page = legalContent[type];
  return (
    <PageShell eyebrow="Información legal" title={page.title} subtitle={page.intro}>
      <article className="legal-page">
        <p className="legal-updated">Última actualización: {page.updated}.</p>
        {page.showCommercialIdentity ? (
          <section className="legal-business" aria-labelledby={`${type}-business-title`}>
            <h2 id={`${type}-business-title`}>Identidad comercial y atención</h2>
            <p>
              <strong>Vendedor y facturador:</strong> {commercialIdentity.seller}. <strong>Titular:</strong>
              {" "}{commercialIdentity.owner}, titular de {commercialIdentity.ownedBrands}. La comercialización
              {" "}por {commercialIdentity.seller} está autorizada por el titular.
            </p>
            <dl className="legal-business-facts">
              <dt>Domicilio comercial informado</dt><dd>{commercialIdentity.address}</dd>
              <dt>Correo institucional</dt><dd><a href={`mailto:${commercialIdentity.institutionalEmail}`}>{commercialIdentity.institutionalEmail}</a></dd>
              <dt>Soporte, privacidad, reclamos y reembolsos</dt><dd><a href={`mailto:${commercialIdentity.supportEmail}`}>{commercialIdentity.supportEmail}</a></dd>
              <dt>Teléfono y WhatsApp</dt><dd>{commercialIdentity.phone}</dd>
              <dt>Atención</dt><dd>{commercialIdentity.hours}</dd>
              <dt>Respuesta</dt><dd>{commercialIdentity.responseTime}</dd>
              <dt>Responsable interno de soporte</dt><dd>{commercialIdentity.supportOwner}</dd>
              <dt>Condición fiscal declarada</dt><dd>{commercialIdentity.taxStatus}</dd>
              <dt>Facturación</dt><dd>{commercialIdentity.invoicing}</dd>
              <dt>Sitio</dt><dd>{commercialIdentity.website}</dd>
            </dl>
          </section>
        ) : null}
        {page.showAppOffers ? (
          <section className="legal-offers" aria-labelledby={`${type}-offers-title`}>
            <h2 id={`${type}-offers-title`}>Ofertas BOJ S7-PLC PRO publicadas</h2>
            <p>{page.offerIntro}</p>
            <div className="legal-offer-grid">
              {legalAppOffers.map((plan) => (
                <section className="legal-offer-card" aria-label={plan.contract.checkoutName} key={plan.contract.checkoutName}>
                  <h3>{plan.contract.checkoutName}</h3>
                  <p className="legal-offer-price">{plan.price}</p>
                  <dl className="legal-offer-facts">
                    <dt>Duración</dt><dd>{plan.contract.duration}</dd>
                    <dt>Dispositivos</dt><dd>{plan.contract.devices}</dd>
                    <dt>Renovación</dt><dd>{plan.contract.renewal}</dd>
                    <dt>Curso</dt><dd>{plan.contract.course}</dd>
                    <dt>Sin conexión</dt><dd>{plan.contract.offline}</dd>
                    <dt>Garantía</dt><dd>{plan.contract.warranty}</dd>
                    <dt>Cancelación</dt><dd>{plan.contract.cancellation}</dd>
                  </dl>
                </section>
              ))}
            </div>
          </section>
        ) : null}
        {page.sections.map(([title, text]) => (
          <section key={title}><h2>{title}</h2><p>{text}</p></section>
        ))}
        <p className="legal-contact">Consultas legales o de privacidad: <a href={`mailto:${contact.email}`}>{contact.email}</a>.</p>
      </article>
    </PageShell>
  );
}

function ContactLine({ icon, label, value, href }) {
  const content = (
    <>
      <Icon name={icon} />
      <span>
        <small>{label}</small>
        <strong>{value}</strong>
      </span>
    </>
  );

  if (href) {
    return (
      <a className="contact-line" href={href}>
        {content}
      </a>
    );
  }

  return <div className="contact-line">{content}</div>;
}

function ComplianceRoutes({ route }) {
  if (route === "/contacto") return <ContactPage />;
  if (route === "/en/contact") return <EnglishContactPage />;
  if (route === "/pt/contato") return <PortugueseContactPage />;
  if (route === "/gracias") return <GraciasPage />;
  if (route === "/privacidad") return <LegalPage type="privacy" />;
  if (route === "/terminos") return <LegalPage type="terms" />;
  if (route === "/licencias") return <LegalPage type="licenses" />;
  if (route === "/reembolsos") return <LegalPage type="refunds" />;
  if (route.startsWith("/en")) return <EnglishNotFound />;
  if (route.startsWith("/pt")) return <PortugueseNotFound />;
  return <NotFound />;
}

export default ComplianceRoutes;
