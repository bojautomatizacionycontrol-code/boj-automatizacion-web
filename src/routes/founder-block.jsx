import { contact } from "../content.js";
import walterBojAvatar from "../assets/walter-boj-avatar-field.jpeg";
import { M2Picture, m2ImageSpecs, registerM2Images, whatsappUrl } from "../app/shared-eager.jsx";

// Variantes AVIF/WebP del retrato (src/assets/m2/walter-boj-avatar-field-*).
registerM2Images(import.meta.glob("../assets/m2/walter-boj-avatar-field-*.{avif,webp}", { eager: true, import: "default" }));
m2ImageSpecs.set(walterBojAvatar, {
  stem: "walter-boj-avatar-field",
  width: 1086,
  height: 1448,
  widths: [240, 480],
  formats: ["avif", "webp"],
  sizes: "180px",
});

const founderCopy = {
  es: {
    kicker: "Quién está detrás",
    name: "Walter Adrián Boj",
    text: "Especialista en automatización industrial y diagnóstico de PLC Siemens, con más de 15 años en planta: mantenimiento, programación, redes industriales, migraciones y fallas reales en S7-300/400. BOJ Automatización y Control reúne ese criterio en servicios técnicos, formación aplicada y la app BOJ S7-PLC.",
    profile: "Ver perfil profesional",
    contact: "Consultar por WhatsApp",
    message: "Hola, escribo desde la web de BOJ para realizar una consulta técnica.",
    alt: "Walter Adrián Boj, especialista en automatización y diagnóstico de PLC Siemens",
  },
  en: {
    kicker: "Who is behind BOJ",
    name: "Walter Adrián Boj",
    text: "Industrial automation specialist focused on Siemens PLC diagnostics, with more than 15 years in plants: maintenance, programming, industrial networks, migrations and real S7-300/400 faults. BOJ Automation and Control brings that field judgement to technical services, applied training and the BOJ S7-PLC app.",
    profile: "View professional profile",
    contact: "Contact us on WhatsApp",
    message: "Hello, I am contacting BOJ from the English website.",
    alt: "Walter Adrián Boj, industrial automation and Siemens PLC diagnostics specialist",
  },
  pt: {
    kicker: "Quem está por trás",
    name: "Walter Adrián Boj",
    text: "Especialista em automação industrial e diagnóstico de PLC Siemens, com mais de 15 anos em planta: manutenção, programação, redes industriais, migrações e falhas reais em S7-300/400. A BOJ Automação e Controle reúne esse critério em serviços técnicos, formação aplicada e no app BOJ S7-PLC.",
    profile: "Ver perfil profissional",
    contact: "Falar pelo WhatsApp",
    message: "Olá, estou entrando em contato com a BOJ pelo site em português.",
    alt: "Walter Adrián Boj, especialista em automação industrial e diagnóstico de PLC Siemens",
  },
};

function FounderBlock({ language = "es", id = "founder-block" }) {
  const copy = founderCopy[language] || founderCopy.es;
  return (
    <section className="s7-sales-section s7-sales-instructor founder-block" aria-labelledby={id}>
      <div className="s7-sales-container s7-sales-instructor-grid">
        <M2Picture
          className="s7-sales-instructor-avatar"
          src={walterBojAvatar}
          alt={copy.alt}
          width="1086"
          height="1448"
          loading="lazy"
          decoding="async"
        />
        <div className="s7-sales-instructor-copy">
          <p className="s7-sales-kicker">{copy.kicker}</p>
          <h2 id={id}>{copy.name}</h2>
          <p>{copy.text}</p>
          <div className="founder-block-actions">
            <a className="s7-sales-btn s7-sales-btn-secondary" href={contact.linkedin} target="_blank" rel="noreferrer">
              {copy.profile}
            </a>
            <a className="s7-sales-btn s7-sales-btn-secondary" href={whatsappUrl(copy.message)}>
              {copy.contact}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export { FounderBlock, founderCopy };
