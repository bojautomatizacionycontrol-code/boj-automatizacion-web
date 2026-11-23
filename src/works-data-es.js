import { projects } from "./content.js";
import elBracho from "./assets/works-real/el-bracho.jpg";
import calsa from "./assets/works-real/calsa.jpg";
import generacion from "./assets/works-real/gi.jpg";
import tgn from "./assets/works-real/tgn.jpg";
import ypf from "./assets/works-real/ypf.jpg";
import ledesmaPapel from "./assets/works-real/ledesma-papel.jpg";
import rivoli from "./assets/works-real/rivoli.jpg";
import gasnorTelemetria from "./assets/works-real/gasnor.jpg";
import gasnorBanco from "./assets/works-real/banco-gasnor.jpg";
import zingaras from "./assets/works-real/zingaras.jpg";
import scania from "./assets/works-real/scania.jpg";

// Alcances y fotografías de las obras; la localización se resuelve en works-content.js.
const updates = {
  1: {
    title: "Sistema contra incendios",
    client: "Pluspetrol",
    year: "",
    photo: elBracho,
    photoAlt: "Tablero de control del sistema contra incendios de Pluspetrol.",
    description: "Programación y comisionamiento de un sistema contra incendios con arranque secuencial de tres bombas según la presión; la tercera, una motobomba diésel.",
    highlights: ["Tres bombas con arranque secuencial por presión.", "Tercera bomba con accionamiento diésel.", "Verificación de señales y pruebas de funcionamiento."],
    technologies: ["PLC", "Secuencia por presión", "Bombas", "Motobomba diésel", "Comisionamiento"],
    problem: "El sistema necesitaba coordinar el arranque de tres bombas en función de la presión de la red contra incendios.",
    intervention: "Programación de la secuencia, verificación de señales y comisionamiento del sistema.",
    result: "Arranque secuencial de tres bombas según la presión, con una motobomba diésel como tercera etapa.",
  },
  2: {
    photo: calsa,
    photoAlt: "HMI de la planta evaporadora de CALSA, con etapas, bombas y variables de proceso.",
    year: "",
    result: "Nuevas bombas y señales incorporadas a la programación y a las pantallas de operación del evaporador.",
    relatedWorks: [
      "Sincronización de extrusora y empaquetadora para coordinar el funcionamiento de ambas máquinas.",
      "Upgrade de paletizadora para incorporar una fila adicional al armado de los pallets.",
    ],
  },
  3: {
    title: "PLC, HMI y SCADA de servicios auxiliares de dos SGT-800",
    client: "Generación Independencia / Generación Mediterránea",
    photo: generacion,
    photoAlt: "Puesto de supervisión con cuatro pantallas de servicios auxiliares de Generación Independencia.",
    description: "Desarrollo de lógica de PLC e integración de señales de los servicios auxiliares de dos turbinas Siemens SGT-800 al sistema HMI/SCADA de sala de control.",
    intervention: "Desarrollo de lógica e integración de señales, pantallas de operación y supervisión de los servicios auxiliares.",
    result: "Servicios auxiliares integrados al control y a la supervisión de sala de control.",
  },
  4: {
    photo: tgn,
    photoAlt: "Motocompresor de TGN con el gabinete de instrumentación del sistema de gas de precámara abierto.",
    description: "Actualización de tableros de control y montaje de instrumentación de campo en motocompresores de gas. Las fotografías muestran el gabinete del sistema de gas de precámara.",
    intervention: "Actualización de circuitos de mando, señales y protecciones, junto con montaje de instrumentos de campo.",
    result: "Tableros e instrumentación intervenidos para el control y la supervisión de los equipos de compresión.",
  },
  5: {
    title: "Migración de PLC S5 a S7-1500 en planta de agua",
    photo: ypf,
    photoAlt: "Tablero con HMI y sistema de bombeo de la planta de agua de YPF.",
    year: "",
    description: "Migración del control Siemens S5 a S7-1500 en una planta de agua, con relevamiento de señales, adaptación de lógica, HMI y puesta en marcha del bombeo.",
    highlights: ["Migración de Siemens S5 a S7-1500.", "Relevamiento de hardware y señales y adaptación de lógica.", "HMI y puesta en marcha del control de bombeo."],
    technologies: ["Siemens S5", "Siemens S7-1500", "HMI", "Migración PLC", "Señales de campo", "Puesta en marcha"],
    result: "Control de la planta de agua migrado a Siemens S7-1500, con HMI y señales de bombeo integradas.",
  },
  6: {
    photo: ledesmaPapel,
    photoAlt: "Intervención en el gabinete de control de la envolvedora de rollos de papel de Ledesma.",
  },
  7: {
    photo: rivoli,
    photoAlt: "Envasadora vertical de Rivoli con tablero y HMI de operación.",
    description: "Ingeniería inversa y reemplazo de levas mecánicas por control electrónico con PLC S7-1200, encoder, accionamiento SEW y HMI Siemens. Integración de la secuencia de máquina y el control de temperatura.",
  },
};

const newProjects = [
  {
    title: "Tableros de telemetría para estaciones de GNC",
    client: "GASNOR",
    sector: "Gas / Telemetría",
    role: "Armado de tableros",
    year: "",
    photo: gasnorTelemetria,
    photoAlt: "Serie de placas de tableros armadas en taller para el reporte de consumo de estaciones de GNC a GASNOR.",
    description: "Armado de aproximadamente 100 tableros para enviar por SMS a GASNOR el consumo de estaciones de servicio con GNC.",
    highlights: ["Aproximadamente 100 tableros armados.", "Reporte de consumo mediante SMS.", "Destino: estaciones de Tucumán, Santiago del Estero y Salta."],
    technologies: ["Tableros", "Telemetría", "SMS", "GNC", "Alimentación con respaldo"],
    problem: "GASNOR necesitaba recibir el consumo de estaciones de servicio con GNC ubicadas en distintas provincias.",
    intervention: "Armado de aproximadamente 100 tableros de comunicación y alimentación para el envío de los datos por SMS.",
    result: "Los tableros fueron instalados en estaciones de Tucumán, Santiago del Estero y Salta por dos equipos de trabajo.",
  },
  {
    title: "Banco de ensayo de medidores de gas",
    client: "GASNOR",
    sector: "Gas / Medición",
    role: "Control y supervisión",
    year: "",
    photo: gasnorBanco,
    photoAlt: "Gabinete con PLC y HMI del banco de ensayo de medidores de gas.",
    description: "Intervención en el sistema de control y supervisión de un banco de ensayo de medidores de gas con PLC y HMI.",
    highlights: ["Control y supervisión del banco de ensayo.", "Visualización de volumen y error de medición.", "Señales de temperatura, presión y estado de válvulas."],
    technologies: ["PLC", "HMI", "Medidores de gas", "Válvulas", "Señales de campo"],
    problem: "El ensayo de medidores requiere coordinar válvulas y visualizar las variables y resultados del banco.",
    intervention: "Trabajos sobre el sistema de control con PLC y la supervisión mediante HMI.",
    result: "Supervisión del banco con visualización de temperatura, presión, volumen y error de medición.",
  },
  {
    title: "Diagnóstico y recuperación de equipos de producción",
    client: "Zíngaras",
    sector: "Alimentos / Producción",
    role: "Diagnóstico y mantenimiento correctivo",
    year: "2026",
    photo: zingaras,
    photoAlt: "Rack Allen-Bradley SLC 5/03 de la fraccionadora VERT550 durante los trabajos de diagnóstico.",
    description: "Diagnóstico y recuperación de la fraccionadora VERT550, sus comunicaciones y servoaccionamientos. Diagnóstico y renovación de alimentadores y conexiones del motor de extrusora de 22 kW.",
    highlights: ["Recuperación de control, comunicaciones y servoaccionamientos de la VERT550.", "Diagnóstico eléctrico del motor de extrusora de 22 kW.", "Renovación de sus alimentadores, bornera y conexiones."],
    technologies: ["SLC 5/03", "DeviceNet", "Ultra 100", "Diagnóstico eléctrico", "Motor de 22 kW"],
    problem: "Distintas fallas de control, comunicaciones, accionamiento y conexiones eléctricas afectaban equipos de producción.",
    intervention: "Diagnóstico y recuperación de la fraccionadora; mediciones eléctricas y renovación de alimentadores y conexiones del motor de extrusora.",
    result: "Recuperación operativa de la fraccionadora y renovación de la alimentación y conexiones del motor, en intervenciones independientes.",
  },
  {
    title: "Tablero de instrumentos",
    client: "SCANIA",
    sector: "Industria / Instrumentación",
    role: "Tablero de instrumentos",
    year: "",
    photo: scania,
    photoAlt: "Interior del tablero de instrumentos realizado para SCANIA.",
    description: "Realización de un tablero de instrumentos para la instalación de planta de SCANIA.",
    highlights: ["Tablero de instrumentos.", "Montaje de componentes y cableado interno."],
    technologies: ["Instrumentación", "Tablero eléctrico", "Cableado"],
    problem: "La instalación requería un tablero para sus instrumentos y conexiones eléctricas.",
    intervention: "Realización y cableado del tablero de instrumentos.",
    result: "Tablero de instrumentos armado y cableado para la instalación.",
  },
];

export const spanishProjects = [
  ...projects.map((project, index) => ({
    ...project,
    ...updates[index],
    sourceIndex: index,
    realPhoto: index === 0 || Boolean(updates[index]?.photo),
  })),
  ...newProjects.map((project) => ({ ...project, realPhoto: true })),
];
