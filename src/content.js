export const contact = {
  brand: "BOJ Automatización y Control",
  responsible: "Walter Adrián Boj",
  location: "San Miguel de Tucumán, Argentina",
  email: "adrianboj4@gmail.com",
  whatsappDisplay: "+54 9 381 5327469",
  whatsappNumber: "5493815327469",
  instagram: "#",
  linkedin: "#",
};

export const navItems = [
  { label: "Inicio", path: "/inicio" },
  { label: "Servicios", path: "/servicios" },
  {
    label: "Cursos",
    path: "/cursos",
    children: [
      { label: "Diagnóstico S7-300/400", path: "/cursos/s7-300-400" },
      { label: "TIA Portal S7-1200/1500", path: "/cursos/tia-portal" },
    ],
  },
  { label: "App", path: "/app" },
  { label: "Obras", path: "/obras" },
  { label: "Contacto", path: "/contacto" },
];

export const homeHighlights = [
  {
    title: "Diagnóstico de fallas en PLC Siemens",
    text: "Lectura técnica de CPU, LEDs, Diagnostic Buffer, módulos, señales y síntomas de planta.",
    icon: "Cpu",
  },
  {
    title: "Ingeniería de detalle y puesta en marcha",
    text: "Relevamiento, especificaciones, planos, tableros, pruebas FAT/SAT y acompañamiento hasta producción.",
    icon: "ClipboardCheck",
  },
  {
    title: "Automatización industrial",
    text: "Programación, modificación y comisionamiento de PLC, HMI, SCADA, drives e instrumentación.",
    icon: "Settings",
  },
  {
    title: "Redes PROFIBUS / PROFINET",
    text: "Revisión de nodos, conectores, terminaciones, BF, comunicación PLC-HMI-Drive y diagnóstico online.",
    icon: "Network",
  },
  {
    title: "Migraciones de sistemas",
    text: "Paso controlado desde plataformas legacy hacia S7/TIA con relevamiento y pruebas de puesta en marcha.",
    icon: "RefreshCcw",
  },
  {
    title: "Cursos técnicos aplicados",
    text: "Capacitación para mantenimiento, instrumentistas, electricistas e ingenieros con casos reales.",
    icon: "GraduationCap",
  },
  {
    title: "App de diagnóstico para campo",
    text: "Herramienta digital para ordenar el análisis de fallas y evitar decisiones apresuradas.",
    icon: "Smartphone",
  },
];

export const whyBoj = [
  "Experiencia real en planta",
  "Enfoque técnico aplicado",
  "Soluciones orientadas a mantenimiento",
  "Diagnóstico metódico de fallas",
  "Capacitación con casos reales",
  "Trabajo con sistemas Siemens, redes, HMI, variadores e instrumentación",
];

export const trustSignals = [
  {
    value: "Más de 10 años",
    label: "automatización industrial, diagnóstico de fallas y puesta en marcha en planta",
  },
  {
    value: "PLC Siemens",
    label: "S5, S7-200, S7-300/400, S7-1200/1500",
  },
  {
    value: "Ingeniería a SAT",
    label: "ingeniería de detalle, tableros, pruebas, comisionamiento y producción",
  },
  {
    value: "Método BOJ",
    label: "síntoma, evidencia online, causa probable y acción segura",
  },
];

export const authorityHighlights = [
  "Soluciones de automatización para máquinas y procesos industriales, adaptadas al contexto de cada cliente.",
  "Diagnóstico de fallas con STEP 7 Classic, TIA Portal, Diagnostic Buffer y revisión online.",
  "Servicio integral: ingeniería básica y de detalle, tableros, conexión en campo, pruebas FAT/SAT y puesta en marcha.",
  "Experiencia en PLC, HMI, SCADA, variadores, sensores, actuadores y redes industriales.",
  "Capacitación para mantenimiento con casos concretos, no contenido genérico de software.",
];

export const methodSteps = [
  {
    title: "1. Relevar síntoma",
    text: "Estado de CPU, LEDs, condición de línea, módulos afectados, red involucrada y señales críticas.",
    icon: "FileSearch",
  },
  {
    title: "2. Confirmar evidencia",
    text: "Diagnostic Buffer, Hardware Config online, monitoreo de variables, estado de nodos y medición de campo.",
    icon: "ClipboardCheck",
  },
  {
    title: "3. Separar causa",
    text: "Distinguir falla de lógica, módulo, red, instrumento, cableado, alimentación o condición de proceso.",
    icon: "CircuitBoard",
  },
  {
    title: "4. Ejecutar con criterio",
    text: "Resolver, documentar y dejar una recomendación útil para mantenimiento, operación o mejora futura.",
    icon: "ShieldCheck",
  },
];

export const servicePrinciples = [
  "Antes de cambiar hardware, se busca evidencia técnica.",
  "Antes de modificar lógica, se entiende la condición de planta.",
  "Antes de poner en marcha, se prueban señales, secuencia, seguridad y respuesta operativa.",
  "Antes de cerrar una intervención, se deja criterio técnico útil para mantenimiento.",
];

export const contactChecklist = [
  "Marca y modelo de PLC o HMI",
  "Estado de CPU y LEDs visibles",
  "Síntoma principal de la falla",
  "Si la falla es permanente o intermitente",
  "Fotos del tablero o capturas online si están disponibles",
];

export const clientLogoSlots = [
  "Ledesma",
  "CALSA",
  "YPF",
  "TGN",
  "Gasnor",
];

export const services = [
  {
    title: "Automatización industrial",
    icon: "Factory",
    description:
      "Diseño, modificación, diagnóstico y puesta en marcha de sistemas de automatización industrial basados en PLC, HMI, variadores, sensores, actuadores e instrumentación de campo.",
    applications: [
      "PLC Siemens S5, S7-200, S7-300/400, S7-1200/1500",
      "TIA Portal y STEP 7 Classic",
      "HMI / SCADA",
      "Señales digitales y analógicas",
      "Lógica secuencial y control de procesos",
      "PID y variadores de velocidad",
    ],
    benefit:
      "Permite mejorar continuidad operativa, ordenar la lógica de control y dejar sistemas más diagnosticables para mantenimiento.",
    problem:
      "Sistemas que necesitan modificaciones, ampliaciones o puesta en marcha sin perder trazabilidad técnica.",
    impact:
      "Una automatización mal documentada o inestable puede detener producción, dificultar cambios y aumentar tiempos de intervención.",
    approach:
      "Relevamiento de señales, lectura de lógica existente, pruebas controladas, documentación clara y puesta en marcha con criterio de planta.",
  },
  {
    title: "Ingeniería eléctrica básica y de detalle",
    icon: "ClipboardCheck",
    description:
      "Desarrollo de ingeniería para instalaciones eléctricas industriales, tableros, migraciones y proyectos de automatización que necesitan documentación clara antes de ejecutar.",
    applications: [
      "Pliegos y especificaciones técnicas",
      "Planos eléctricos y digitalización",
      "Modernización de tableros con lógica a relé",
      "Migraciones a PLC",
      "Dimensionamiento de motores, variadores y servos",
      "Selección de sensores, actuadores y componentes de campo",
    ],
    benefit:
      "Ordena el proyecto antes de intervenir en planta, reduce improvisaciones y facilita compras, montaje, pruebas y mantenimiento posterior.",
    problem:
      "Proyectos que avanzan sin relevamiento suficiente, con planos incompletos o sin criterio claro para migrar, ampliar o poner en marcha.",
    impact:
      "La falta de ingeniería aumenta retrabajos, errores de conexionado, demoras de montaje y riesgos durante pruebas con producción.",
    approach:
      "Relevamiento técnico, definición de alcance, documentación eléctrica, criterios de selección, revisión de señales y preparación para pruebas FAT/SAT.",
  },
  {
    title: "Diagnóstico de fallas industriales",
    icon: "FileSearch",
    description:
      "Análisis técnico de fallas en sistemas automatizados, orientado a reducir tiempos de parada y detectar la causa raíz del problema.",
    applications: [
      "CPU en STOP/RUN",
      "LEDs SF/BF/RUN/STOP",
      "Diagnostic Buffer",
      "Hardware Config online",
      "Fallas de comunicación y módulos I/O",
      "Sensores, actuadores y problemas intermitentes de planta",
    ],
    benefit:
      "Reduce cambios innecesarios de hardware y acelera decisiones durante paradas críticas de producción.",
    problem:
      "Paradas de línea, CPU en STOP, fallas intermitentes, BF/SF activos o síntomas que no tienen una causa evidente.",
    impact:
      "Cada hora de incertidumbre puede traducirse en pérdida de producción, cambios innecesarios de módulos y desgaste del equipo de mantenimiento.",
    approach:
      "Lectura de estados, Diagnostic Buffer, Hardware Config online, revisión de red, módulos I/O, sensores y actuadores hasta separar causa probable.",
  },
  {
    title: "Migraciones",
    icon: "RefreshCcw",
    description:
      "Migración de sistemas antiguos hacia plataformas modernas, manteniendo continuidad operativa y reduciendo riesgos de parada.",
    applications: [
      "Migración Siemens S5 a S7/TIA",
      "Migración S7-300/400 a S7-1200/1500",
      "Conversión de lógica",
      "Relevamiento de señales",
      "Documentación técnica",
      "Pruebas y puesta en marcha",
    ],
    benefit:
      "Actualiza la plataforma de control con una transición planificada, trazable y con menor exposición productiva.",
    problem:
      "Equipos legacy con repuestos difíciles, software antiguo, baja documentación o riesgo operativo ante una falla mayor.",
    impact:
      "La obsolescencia aumenta costos, limita soporte técnico y puede dejar una línea crítica sin recuperación rápida.",
    approach:
      "Relevamiento de hardware y señales, análisis de lógica, estrategia de conversión, pruebas por etapas y puesta en marcha con respaldo.",
  },
  {
    title: "Redes industriales",
    icon: "Network",
    description:
      "Diagnóstico, configuración y mantenimiento de redes industriales utilizadas en automatización.",
    applications: [
      "PROFIBUS DP",
      "PROFINET",
      "Ethernet industrial",
      "Diagnóstico de nodos",
      "Terminaciones, conectores y repetidores",
      "Fallas BF y comunicación PLC-HMI-Drive",
    ],
    benefit:
      "Ayuda a detectar fallas físicas, lógicas o de configuración que suelen detener líneas completas.",
    problem:
      "Nodos que desaparecen, fallas BF, comunicación inestable entre PLC, HMI, drives o periferia distribuida.",
    impact:
      "Una red industrial inestable puede parar toda una celda aunque el PLC y los equipos principales estén en buen estado.",
    approach:
      "Revisión de configuración, estado online, terminaciones, conectores, repetidores, nodos y síntomas registrados por el PLC.",
  },
  {
    title: "Instrumentación y señales de campo",
    icon: "Gauge",
    description:
      "Diagnóstico e integración de instrumentos industriales y señales de proceso.",
    applications: [
      "4-20 mA y 0-10 V",
      "Sensores y transmisores",
      "Presión, temperatura, nivel y caudal",
      "Escalado de señales",
      "Fallas de cableado",
      "Verificación de lazo",
    ],
    benefit:
      "Mejora la lectura del proceso y evita que una falla de campo sea confundida con un problema de programa.",
    problem:
      "Lecturas analógicas fuera de escala, señales ausentes, transmisores dudosos o lazos que no coinciden con el proceso real.",
    impact:
      "Una señal de campo mal interpretada puede generar falsas alarmas, paradas, dosificación incorrecta o decisiones de control erróneas.",
    approach:
      "Verificación de lazo, medición eléctrica, revisión de escalados, cableado, alimentación, estado de entrada y coherencia con el proceso.",
  },
  {
    title: "Electricidad industrial y tableros",
    icon: "CircuitBoard",
    description:
      "Servicios asociados a tableros eléctricos, conexionado, lógica de mando, protecciones, relevamiento y mejoras.",
    applications: [
      "Tableros de control y fuerza",
      "MCC",
      "Arranques de motores",
      "Protecciones",
      "Ordenamiento y diagnóstico de tableros",
      "Documentación",
    ],
    benefit:
      "Aporta seguridad, trazabilidad y mejor mantenibilidad en instalaciones eléctricas industriales.",
    problem:
      "Tableros con cableado desordenado, señales sin identificar, protecciones dudosas o documentación incompleta.",
    impact:
      "Un tablero difícil de mantener prolonga paradas, aumenta riesgos eléctricos y complica cualquier diagnóstico posterior.",
    approach:
      "Relevamiento, ordenamiento técnico, identificación de señales, revisión de protecciones, mando, fuerza y documentación funcional.",
  },
  {
    title: "Capacitación técnica industrial",
    icon: "GraduationCap",
    description:
      "Capacitaciones para técnicos, instrumentistas, electricistas, ingenieros y personal de mantenimiento.",
    applications: [
      "PLC Siemens",
      "Diagnóstico de fallas",
      "Redes industriales",
      "TIA Portal y STEP 7 Classic",
      "Señales analógicas y variadores",
      "Cursos in-company y grabados",
    ],
    benefit:
      "Eleva el criterio técnico del equipo y mejora la respuesta ante fallas reales en planta.",
    problem:
      "Equipos de mantenimiento que usan PLC y redes a diario, pero necesitan método para diagnosticar bajo presión.",
    impact:
      "La falta de criterio común genera dependencia externa, tiempos largos de diagnóstico y decisiones apresuradas en parada.",
    approach:
      "Capacitación con casos reales, lectura online, análisis de síntomas, práctica con tableros, redes y criterios aplicables al turno.",
  },
];

export const courses = [
  {
    id: "s7",
    path: "/cursos/s7-300-400",
    title: "Diagnóstico y resolución de fallas en PLC Siemens S7-300/400",
    shortTitle: "Diagnóstico S7-300/400",
    level: "Intermedio técnico",
    mode: "Videos grabados, PDFs técnicos y casos reales",
    audience:
      "Técnicos de mantenimiento, instrumentistas, electricistas industriales, ingenieros de planta y programadores PLC.",
    learn:
      "Interpretar estados de CPU, LEDs SF/BF/RUN/STOP, Diagnostic Buffer, Hardware Config online, fallas PROFIBUS y señales de campo.",
    outcomes: [
      "Reducir tiempos de diagnóstico ante CPU en STOP, SF/BF o fallas de módulos.",
      "Trabajar con un método técnico antes de cambiar hardware.",
      "Interpretar síntomas de PROFIBUS, I/O y señales de campo.",
      "Registrar datos útiles para explicar la falla y sostener una decisión frente a producción.",
    ],
    icon: "Cpu",
  },
  {
    id: "tia",
    path: "/cursos/tia-portal",
    title: "Introducción a TIA Portal con PLC S7-1200/1500",
    shortTitle: "TIA Portal S7-1200/1500",
    level: "Inicial aplicado",
    mode: "Curso introductorio con enfoque práctico",
    audience:
      "Técnicos que quieren iniciar en TIA Portal, estudiantes, programadores que vienen de STEP 7 Classic y personal de mantenimiento.",
    learn:
      "Crear proyectos, configurar hardware, trabajar con variables, programar LAD básico, cargar al PLC y diagnosticar online.",
    outcomes: [
      "Crear y cargar proyectos básicos en TIA Portal con orden.",
      "Comprender estructura de hardware, variables, bloques y monitoreo online.",
      "Evitar errores iniciales frecuentes al pasar de STEP 7 Classic a TIA.",
      "Preparar una base práctica para proyectos reales con PLC modernos Siemens.",
    ],
    icon: "MonitorCog",
  },
];

export const s7Course = {
  title:
    "Diagnóstico y resolución de fallas en PLC Siemens S7-300/400 con STEP 7 Classic",
  subtitle:
    "Un curso técnico aplicado para aprender a diagnosticar fallas reales en PLC Siemens, interpretar estados de CPU, analizar el Diagnostic Buffer, revisar hardware online y detectar problemas en redes, módulos y señales de campo bajo presión de planta.",
  audience: [
    "Técnicos de mantenimiento",
    "Instrumentistas",
    "Electricistas industriales",
    "Ingenieros de planta",
    "Programadores PLC",
    "Estudiantes técnicos avanzados",
  ],
  includes: [
    "Videos grabados",
    "PDFs técnicos",
    "Casos reales de planta",
    "App de diagnóstico BOJ",
    "Ejemplos con tablero didáctico real",
    "Análisis de LEDs y estados de CPU",
    "Diagnóstico con STEP 7 Classic",
    "Procedimiento metódico de búsqueda de fallas",
  ],
  modules: [
    "Fundamentos del diagnóstico industrial",
    "Arquitectura Siemens S7-300/400",
    "Estados de CPU y LEDs",
    "Uso de STEP 7 Classic online",
    "Diagnostic Buffer",
    "Hardware Config online",
    "Diagnóstico de módulos",
    "PROFIBUS DP y fallas BF",
    "Señales digitales y analógicas",
    "Casos reales de planta",
    "Método de diagnóstico BOJ",
    "Uso de la app de diagnóstico",
  ],
  benefits: [
    "Reducir tiempo de parada",
    "Diagnosticar con método",
    "Evitar cambios innecesarios de hardware",
    "Interpretar síntomas de CPU y red",
    "Trabajar con más seguridad técnica",
    "Mejorar criterio profesional en planta",
    "Explicar técnicamente qué se revisó, qué evidencia apareció y cuál es el siguiente paso",
  ],
  outcomes: [
    "Ingresar online y leer el estado real del PLC sin improvisar.",
    "Usar Diagnostic Buffer y Hardware Config para orientar la búsqueda de causa.",
    "Relacionar LEDs SF/BF/RUN/STOP con red, módulos, señales y eventos de CPU.",
    "Armar un procedimiento de diagnóstico útil para mantenimiento.",
  ],
  avoidMistakes: [
    "Cambiar módulos sin evidencia online.",
    "Confundir falla de campo con falla de programa.",
    "Ignorar eventos del Diagnostic Buffer.",
    "Reiniciar equipos sin registrar síntomas previos.",
    "Perder tiempo revisando zonas del sistema que no están relacionadas con el síntoma.",
  ],
};

export const tiaCourse = {
  title: "Introducción a TIA Portal con PLC Siemens S7-1200/1500",
  subtitle:
    "Curso introductorio para aprender la base de programación, configuración y diagnóstico en TIA Portal aplicado a PLC Siemens modernos.",
  audience: [
    "Técnicos que quieren iniciar en TIA Portal",
    "Estudiantes",
    "Programadores que vienen de STEP 7 Classic",
    "Personal de mantenimiento",
    "Electricistas industriales",
  ],
  modules: [
    "Introducción a TIA Portal",
    "Familias Siemens S7-1200 y S7-1500",
    "Creación de proyecto",
    "Configuración de hardware",
    "Variables PLC",
    "Programación LAD básica",
    "Temporizadores y contadores",
    "Bloques OB, FC, FB y DB",
    "Carga al PLC",
    "Monitoreo online",
    "Diagnóstico básico",
    "Introducción a HMI",
  ],
  benefits: [
    "Comprender la estructura de TIA Portal",
    "Programar desde cero",
    "Diagnosticar online",
    "Prepararse para proyectos reales",
    "Entender buenas prácticas iniciales",
    "Construir proyectos más mantenibles desde la primera versión",
  ],
  outcomes: [
    "Crear un proyecto desde cero y configurar hardware S7-1200/1500.",
    "Programar lógica LAD básica con variables, temporizadores, contadores y bloques.",
    "Cargar, monitorear online y hacer diagnóstico inicial.",
    "Prepararse para proyectos reales con una base ordenada.",
  ],
  avoidMistakes: [
    "Crear variables sin criterio de nombres.",
    "Programar todo en un bloque sin estructura.",
    "Cargar al PLC sin revisar hardware ni comunicación.",
    "Confundir monitoreo online con diagnóstico completo.",
    "Avanzar en un proyecto sin documentar señales ni arquitectura.",
  ],
};

export const appSections = [
  {
    title: "Problema que resuelve",
    text: "En planta, muchas fallas se diagnostican bajo presión. La app ayuda a ordenar el análisis, cruzar síntomas y seguir un método técnico.",
    icon: "ShieldCheck",
  },
  {
    title: "Valor para el técnico",
    text: "Menos improvisación, más criterio, mejor documentación, diagnóstico más ordenado y apoyo en campo cuando la línea está detenida.",
    icon: "ClipboardCheck",
  },
  {
    title: "Valor para empresas",
    text: "Reducción de tiempos de parada, mejora de procedimientos internos, capacitación práctica y soporte para mantenimiento.",
    icon: "Building2",
  },
];

export const appFeatures = [
  "Permite ingresar familia de PLC",
  "Permite seleccionar estado de CPU",
  "Permite cargar LEDs RUN/STOP/SF/BF",
  "Permite analizar síntomas de red",
  "Permite registrar observaciones de campo",
  "Sugiere posibles causas",
  "Recomienda pasos de diagnóstico",
  "Ordena el análisis para evitar decisiones apresuradas",
];

export const appFunctions = [
  "Diagnóstico por combinación de LEDs",
  "Guía para revisar Diagnostic Buffer",
  "Recomendaciones para revisar PROFIBUS/PROFINET",
  "Análisis de señales",
  "Casos típicos de planta",
  "Árbol de decisión",
  "Recomendaciones de acción",
];

export const appDifferentials = [
  {
    title: "Pensada para presión de planta",
    text: "Ordena la información cuando la línea está detenida y el técnico necesita decidir el próximo paso con evidencia.",
  },
  {
    title: "Conecta síntomas con método",
    text: "Cruza familia de PLC, estado de CPU, LEDs, red, señales y observaciones para evitar saltos de diagnóstico.",
  },
  {
    title: "No reemplaza al técnico",
    text: "Funciona como guía de razonamiento para sostener criterio, documentar síntomas y evitar decisiones apresuradas.",
  },
  {
    title: "Acompaña el curso",
    text: "Refuerza el método del curso S7-300/400 y lo lleva al campo como guía práctica de consulta.",
  },
];

export const appVersions = [
  {
    name: "Versión Curso",
    description:
      "Incluida con el curso de diagnóstico S7-300/400 para acompañar el aprendizaje y ordenar los casos de práctica.",
  },
  {
    name: "Versión Pro",
    description:
      "Orientada a diagnóstico más avanzado, con mayor profundidad para campo y soporte a procedimientos internos de mantenimiento.",
  },
];

export const projects = [
  {
    title: "Ingeniería, conexionado y puesta en marcha BT40",
    client: "Ledesma / Usina - Ingenio",
    year: "2024",
    description:
      "Trabajo de ingeniería, conexionado y puesta en marcha asociado a BT40, con foco en tableros, potencia, control y validación en campo.",
    technologies: [
      "Ingeniería de detalle",
      "Tableros de potencia",
      "Conexionado en campo",
      "Puesta en marcha",
      "Pruebas SAT",
      "Documentación técnica",
    ],
    problem:
      "Un sistema de alta criticidad necesitaba integración eléctrica y controlada, con documentación y pruebas antes de operar.",
    intervention:
      "Se trabajó sobre ingeniería, conexionado, validación de señales y puesta en marcha coordinada con las condiciones de planta.",
    result:
      "El proyecto avanzó con criterio técnico, pruebas ordenadas y una puesta en marcha trazable para operación y mantenimiento.",
  },
  {
    title: "Sistema contra incendios con PLC S7-1500",
    client: "GETSA",
    year: "2017",
    description:
      "Programación y comisionamiento de sistema contra incendios basado en PLC Siemens S7-1500, con señales críticas y lógica de seguridad operativa.",
    technologies: [
      "Siemens S7-1500",
      "TIA Portal",
      "HMI",
      "Señales de campo",
      "Comisionamiento",
      "Pruebas funcionales",
    ],
    problem:
      "El sistema requería lógica confiable, pruebas de respuesta y claridad operativa para una aplicación sensible de planta.",
    intervention:
      "Se desarrolló la programación, se verificaron entradas y salidas, se probaron secuencias y se acompañó el comisionamiento.",
    result:
      "Se dejó un sistema automatizado con respuesta validada y condiciones claras para operación y mantenimiento.",
  },
  {
    title: "Correcciones de programación y HMI en evaporador",
    client: "CALSA",
    year: "2024",
    description:
      "Corrección y agregado de nuevas bombas y señales en programación y HMI para mejorar operación y diagnóstico del evaporador.",
    technologies: [
      "PLC",
      "HMI",
      "Bombas",
      "Señales digitales",
      "Señales analógicas",
      "Diagnóstico de proceso",
    ],
    problem:
      "El proceso necesitaba incorporar nuevas señales y bombas sin perder control operativo ni claridad para el operador.",
    intervention:
      "Se ajustó lógica, se integraron señales, se revisó la visualización HMI y se verificó el comportamiento en condiciones reales.",
    result:
      "La operación quedó más clara, con nuevas señales disponibles y mejor soporte para diagnóstico de mantenimiento.",
  },
  {
    title: "PLC, HMI y SCADA para generadores Siemens TG3 y TG4",
    client: "Generación Mediterránea",
    year: "2019",
    description:
      "Programación de PLC, HMI y SCADA de servicios para dos nuevas turbinas generadoras, con integración de señales y supervisión.",
    technologies: [
      "PLC Siemens",
      "HMI",
      "SCADA",
      "Servicios auxiliares",
      "Puesta en marcha",
      "Supervisión industrial",
    ],
    problem:
      "La incorporación de nuevas turbinas exigía control y supervisión confiable de servicios asociados.",
    intervention:
      "Se programaron lógicas de control, pantallas HMI/SCADA, señales de campo y pruebas de funcionamiento durante puesta en marcha.",
    result:
      "Se integró la supervisión de servicios de generación con mejor visibilidad operativa y soporte técnico para planta.",
  },
  {
    title: "Upgrade de tableros de motocompresores",
    client: "TGN Tucumán / TGN Jujuy",
    year: "2018",
    description:
      "Actualización de tableros de control de motocompresores, con revisión de mando, señales, protecciones y documentación asociada.",
    technologies: [
      "Tableros de control",
      "Mando industrial",
      "Protecciones",
      "Señales de campo",
      "Documentación",
      "Puesta en servicio",
    ],
    problem:
      "Los tableros requerían actualización técnica para sostener operación y facilitar mantenimiento.",
    intervention:
      "Se revisaron circuitos, mando, señales y criterios de control para implementar mejoras con menor exposición operativa.",
    result:
      "Los tableros quedaron más mantenibles, con mejores condiciones de diagnóstico y operación.",
  },
  {
    title: "Upgrade PLC S5 95U a S7-1500 en planta de agua",
    client: "YPF",
    year: "2016",
    description:
      "Migración de plataforma Siemens S5 95U a S7-1500 en planta de agua, manteniendo continuidad operativa y criterios de control.",
    technologies: [
      "Siemens S5 95U",
      "Siemens S7-1500",
      "Migración PLC",
      "Relevamiento de señales",
      "TIA Portal",
      "Puesta en marcha",
    ],
    problem:
      "La plataforma legacy presentaba riesgo por obsolescencia, repuestos y dificultad de soporte.",
    intervention:
      "Se relevó hardware y señales, se migró lógica, se preparó la nueva arquitectura y se validó la puesta en marcha.",
    result:
      "La planta quedó sobre una plataforma moderna, con mayor disponibilidad de soporte y mejores condiciones de mantenimiento.",
  },
  {
    title: "Upgrade S5 155U a S7-1516 en envolvedora de papel",
    client: "Ledesma",
    year: "2018",
    description:
      "Migración de PLC Siemens S5 155U a S7-1516 en máquina envolvedora de rollos de papel para exportación.",
    technologies: [
      "Siemens S5 155U",
      "Siemens S7-1516",
      "Migración de lógica",
      "Máquina envolvedora",
      "Señales de campo",
      "Puesta en marcha",
    ],
    problem:
      "La máquina operaba con plataforma antigua y requería actualización sin comprometer la producción.",
    intervention:
      "Se migró lógica, se revisaron señales, se validaron secuencias y se acompañó el arranque productivo.",
    result:
      "La envolvedora quedó modernizada con arquitectura Siemens actual y mejor capacidad de diagnóstico.",
  },
  {
    title: "Modernización de envasadora industrial",
    client: "Proyecto de automatización",
    year: "Actualizable",
    description:
      "Reemplazo de sistema de levas mecánicas por control electrónico mediante PLC Siemens S7-1200, encoder incremental, salidas por ventanas de posición, control de temperatura y lógica secuencial.",
    technologies: [
      "Siemens S7-1200",
      "TIA Portal",
      "Encoder incremental",
      "Control secuencial",
      "Salidas temporizadas",
      "Diagnóstico de señales",
      "Puesta en marcha",
    ],
    problem:
      "El sistema mecánico limitaba ajustes, repetibilidad y diagnóstico ante desvíos de posición.",
    intervention:
      "Se relevó la secuencia, se integró encoder incremental, se desarrolló lógica por ventanas de posición y se validaron señales durante puesta en marcha.",
    result:
      "Se logró control electrónico ajustable, mayor trazabilidad de señales y una puesta en marcha con criterio de mantenimiento.",
  },
];
