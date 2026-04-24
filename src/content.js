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
    title: "Automatización industrial",
    text: "Diseño, modificación y puesta en marcha de lógica PLC, HMI, drives e instrumentación.",
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
    value: "Campo real",
    label: "tableros, redes, sensores, HMI, drives y planta en marcha",
  },
  {
    value: "Método BOJ",
    label: "síntoma, evidencia online, causa probable y acción segura",
  },
];

export const authorityHighlights = [
  "Automatización industrial aplicada a líneas, máquinas, tableros y procesos reales.",
  "Diagnóstico de fallas con STEP 7 Classic, TIA Portal, Diagnostic Buffer y revisión online.",
  "Puesta en marcha, mejoras eléctricas, señales de campo y redes industriales en planta.",
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
  "Antes de cerrar una intervención, se deja criterio de mantenimiento.",
];

export const contactChecklist = [
  "Marca y modelo de PLC o HMI",
  "Estado de CPU y LEDs visibles",
  "Síntoma principal de la falla",
  "Si la falla es permanente o intermitente",
  "Fotos del tablero o capturas online si están disponibles",
];

export const clientLogoSlots = [
  "Logo cliente",
  "Planta industrial",
  "Área mantenimiento",
  "Integración",
  "Capacitación",
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
    ],
    icon: "MonitorCog",
  },
];

export const s7Course = {
  title:
    "Diagnóstico y resolución de fallas en PLC Siemens S7-300/400 con STEP 7 Classic",
  subtitle:
    "Un curso técnico aplicado para aprender a diagnosticar fallas reales en PLC Siemens, interpretar estados de CPU, analizar el Diagnostic Buffer, revisar hardware online y detectar problemas en redes, módulos y señales de campo.",
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
    title: "Modernización de envasadora industrial",
    description:
      "Reemplazo de sistema de levas mecánicas por control electrónico mediante PLC Siemens S7-1200, encoder incremental, salidas por ventanas de posición, control de temperatura, lógica secuencial y puesta en marcha productiva.",
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
  {
    title: "Diagnóstico de red PROFIBUS en planta industrial",
    description:
      "Análisis de fallas de comunicación en red PROFIBUS DP, revisión de conectores, terminaciones, nodos, configuración y diagnóstico online desde STEP 7 Classic.",
    technologies: [
      "Siemens S7-300/400",
      "PROFIBUS DP",
      "STEP 7 Classic",
      "Diagnostic Buffer",
      "Hardware Config",
      "BF/SF",
    ],
    problem:
      "La planta presentaba fallas BF intermitentes con pérdida de comunicación en nodos de campo.",
    intervention:
      "Se revisaron conectores, terminaciones, configuración de nodos, diagnóstico online y eventos registrados por el sistema.",
    result:
      "Se ordenó el diagnóstico de red, se identificaron puntos críticos y se redujo la incertidumbre durante la parada.",
  },
  {
    title: "Capacitación técnica in-company",
    description:
      "Dictado de capacitación técnica para personal de mantenimiento sobre diagnóstico y resolución de fallas en PLC Siemens S7-300/400 con STEP 7 Classic, redes industriales y criterios de diagnóstico en planta.",
    technologies: [
      "S7-300/400",
      "STEP 7 Classic",
      "PROFIBUS",
      "Diagnóstico online",
      "Casos reales",
    ],
    problem:
      "El equipo necesitaba un método común para interpretar síntomas y no depender solo de prueba y error.",
    intervention:
      "Se trabajó con diagnóstico online, lectura de LEDs, revisión de Diagnostic Buffer, PROFIBUS y casos reales de mantenimiento.",
    result:
      "Se fortaleció el criterio del personal y se dejaron procedimientos aplicables a fallas reales.",
  },
  {
    title: "Backup y recuperación de HMI",
    description:
      "Respaldo, análisis y documentación de paneles HMI industriales, incluyendo equipos legacy y paneles Siemens Comfort.",
    technologies: [
      "Siemens HMI",
      "ProSave",
      "WinCC",
      "Comfort Panel",
      "OP legacy",
    ],
    problem:
      "Existían paneles sin respaldo actualizado y con riesgo de pérdida de operación ante falla de hardware.",
    intervention:
      "Se realizó respaldo, revisión de herramientas compatibles, análisis de paneles legacy y documentación para recuperación.",
    result:
      "Se generaron respaldos y documentación útil para mantenimiento, reposición y futuras mejoras.",
  },
  {
    title: "Tableros y mejoras eléctricas industriales",
    description:
      "Relevamiento, diagnóstico y mejora de tableros de control, cableado, protecciones, señales, mando y automatización asociada.",
    technologies: [
      "Tableros de control",
      "24 VDC",
      "Señales digitales",
      "Señales analógicas",
      "Protecciones",
      "Documentación",
    ],
    problem:
      "El tablero presentaba baja trazabilidad de señales y dificultades para localizar fallas durante mantenimiento.",
    intervention:
      "Se relevó cableado, mando, protecciones y señales de control para mejorar identificación y diagnóstico.",
    result:
      "Se mejoró el orden técnico, la identificación de circuitos y la mantenibilidad de la instalación.",
  },
];
