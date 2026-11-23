import train640 from "../assets/ledesma/tren-640.webp";
import train960 from "../assets/ledesma/tren-960.webp";
import train1280 from "../assets/ledesma/tren-1280.webp";
import instruments480 from "../assets/ledesma/instrumentacion-480.webp";
import instruments1156 from "../assets/ledesma/instrumentacion-1156.webp";
import cabinets480 from "../assets/ledesma/tableros-480.webp";
import cabinets1156 from "../assets/ledesma/tableros-1156.webp";
import power480 from "../assets/ledesma/potencia-480.webp";
import power1156 from "../assets/ledesma/potencia-1156.webp";

const caseCopy = {
  es: {
    photographs: "Fotografías reales",
    period: "Febrero–agosto de 2024",
    equipment: "Equipo intervenido",
    work: "Trabajo realizado",
    checks: "Verificaciones",
    workAreas: "Áreas de trabajo",
    gallery: "Detalles de la intervención",
    openPhoto: "Ver fotografía completa",
    newTab: "Se abre en una pestaña nueva",
    trainCaption: "El tren completo: turbina BT40, reductor TGM ST800 y generador WEG ST41-1120.",
    trainAlt: "Tren turbogenerador de Ledesma, con la turbina BT40 a la izquierda, el reductor TGM ST800 en el centro y el generador WEG a la derecha.",
    galleryPhotos: {
      instruments: {
        caption: "Instrumentación de campo y conexionado de señales.",
        alt: "Estructura con transmisores de campo y cables de instrumentación junto al tren turbogenerador.",
      },
      cabinets: {
        caption: "Tableros del sistema de control y supervisión.",
        alt: "Tableros de la instalación con equipos de control y supervisión del tren turbogenerador.",
      },
      power: {
        caption: "Conexionado eléctrico del generador WEG.",
        alt: "Caja de conexiones abierta del generador WEG, con bornes, barras y conductores de potencia.",
      },
    },
  },
  en: {
    photographs: "Actual project photographs",
    period: "February–August 2024",
    equipment: "Equipment involved",
    work: "Work performed",
    checks: "Verification",
    workAreas: "Work areas",
    gallery: "Details of the work",
    openPhoto: "View full photograph",
    newTab: "Opens in a new tab",
    trainCaption: "The complete train: BT40 turbine, TGM ST800 gearbox and WEG ST41-1120 generator.",
    trainAlt: "Ledesma turbine-generator train, with the BT40 turbine on the left, the TGM ST800 gearbox in the centre and the WEG generator on the right.",
    galleryPhotos: {
      instruments: {
        caption: "Field instrumentation and signal wiring.",
        alt: "Rack with field transmitters and instrumentation cables beside the turbine-generator train.",
      },
      cabinets: {
        caption: "Control and monitoring cabinets.",
        alt: "Installation cabinets containing control and monitoring equipment for the turbine-generator train.",
      },
      power: {
        caption: "Electrical connections for the WEG generator.",
        alt: "Open WEG generator terminal box showing terminals, busbars and power cables.",
      },
    },
  },
  pt: {
    photographs: "Fotografias reais",
    period: "Fevereiro–agosto de 2024",
    equipment: "Equipamentos envolvidos",
    work: "Trabalho realizado",
    checks: "Verificações",
    workAreas: "Áreas de trabalho",
    gallery: "Detalhes da intervenção",
    openPhoto: "Ver fotografia completa",
    newTab: "Abre em uma nova aba",
    trainCaption: "O conjunto completo: turbina BT40, redutor TGM ST800 e gerador WEG ST41-1120.",
    trainAlt: "Conjunto turbogerador de Ledesma, com a turbina BT40 à esquerda, o redutor TGM ST800 no centro e o gerador WEG à direita.",
    galleryPhotos: {
      instruments: {
        caption: "Instrumentação de campo e interligações de sinais.",
        alt: "Estrutura com transmissores de campo e cabos de instrumentação ao lado do conjunto turbogerador.",
      },
      cabinets: {
        caption: "Painéis do sistema de controle e supervisão.",
        alt: "Painéis da instalação com equipamentos de controle e supervisão do conjunto turbogerador.",
      },
      power: {
        caption: "Interligações elétricas do gerador WEG.",
        alt: "Caixa de conexões aberta do gerador WEG, com bornes, barramentos e cabos de potência.",
      },
    },
  },
};

const galleryPhotos = [
  { key: "instruments", small: instruments480, full: instruments1156 },
  { key: "cabinets", small: cabinets480, full: cabinets1156 },
  { key: "power", small: power480, full: power1156 },
];

function FullPhotoLink({ full, label, copy, children }) {
  return (
    <a
      className="ledesma-case-photo-link"
      href={full}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${copy.openPhoto}: ${label} ${copy.newTab}.`}
    >
      {children}
      <span className="ledesma-case-photo-action">
        {copy.openPhoto}
        <span aria-hidden="true">↗</span>
      </span>
    </a>
  );
}

export function LedesmaCase({ project, language = "es" }) {
  if (!project) return null;

  const locale = Object.hasOwn(caseCopy, language) ? language : "es";
  const copy = caseCopy[locale];
  const headingId = `ledesma-case-title-${locale}`;
  const galleryHeadingId = `ledesma-case-gallery-${locale}`;
  const details = [
    { label: copy.equipment, text: project.problem },
    { label: copy.work, text: project.intervention },
    { label: copy.checks, text: project.result },
  ];

  return (
    <article className="ledesma-case" aria-labelledby={headingId}>
      <div className="ledesma-case-header">
        <div className="ledesma-case-meta">
          <span className="ledesma-case-badge">{copy.photographs}</span>
          <span className="ledesma-case-location">Ledesma</span>
          <span className="ledesma-case-period">{copy.period}</span>
        </div>
        <h2 id={headingId}>{project.title}</h2>
        <p className="ledesma-case-description">{project.description}</p>
      </div>

      <figure className="ledesma-case-main-photo">
        <FullPhotoLink full={train1280} label={copy.trainCaption} copy={copy}>
          <picture>
            <source
              type="image/webp"
              srcSet={`${train640} 640w, ${train960} 960w, ${train1280} 1280w`}
              sizes="(min-width: 1280px) 1180px, (min-width: 768px) calc(100vw - 96px), calc(100vw - 48px)"
            />
            <img
              src={train1280}
              alt={copy.trainAlt}
              width="1280"
              height="589"
              loading="lazy"
              decoding="async"
            />
          </picture>
        </FullPhotoLink>
        <figcaption>{copy.trainCaption}</figcaption>
      </figure>

      <div className="ledesma-case-body">
        <div className="ledesma-case-details">
          {details.map((detail) => (
            <section className="ledesma-case-detail" key={detail.label}>
              <h3>{detail.label}</h3>
              <p>{detail.text}</p>
            </section>
          ))}
        </div>

        {project.technologies?.length ? (
          <ul className="ledesma-case-technologies" aria-label={copy.workAreas}>
            {project.technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        ) : null}

        <section className="ledesma-case-gallery" aria-labelledby={galleryHeadingId}>
          <h3 id={galleryHeadingId}>{copy.gallery}</h3>
          <div className="ledesma-case-gallery-grid">
            {galleryPhotos.map((photo) => {
              const text = copy.galleryPhotos[photo.key];
              return (
                <figure className="ledesma-case-gallery-photo" key={photo.key}>
                  <FullPhotoLink full={photo.full} label={text.caption} copy={copy}>
                    <picture>
                      <source
                        type="image/webp"
                        srcSet={`${photo.small} 480w, ${photo.full} 1156w`}
                        sizes="(min-width: 1280px) 360px, (min-width: 900px) 30vw, calc(100vw - 64px)"
                      />
                      <img
                        src={photo.full}
                        alt={text.alt}
                        width="1156"
                        height="534"
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
                  </FullPhotoLink>
                  <figcaption>{text.caption}</figcaption>
                </figure>
              );
            })}
          </div>
        </section>
      </div>
    </article>
  );
}
