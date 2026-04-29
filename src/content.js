export const contact = {
  brand: "BOJ Automatización y Control",
  responsible: "Walter Adrián Boj",
  location: "San Miguel de Tucumán, Argentina",
  email: "adrianboj4@gmail.com",
  whatsappDisplay: "+54 9 381 5327469",
  whatsappNumber: "5493815327469",
  linktree: "https://linktr.ee/bojautomatizacionycontrol",
  linkedin: "https://www.linkedin.com/in/adrianboj4/",
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
  { label: "Recursos técnicos", path: "/recursos-tecnicos" },
  { label: "Obras", path: "/obras" },
  { label: "Sobre mí", path: "/sobre-mi" },
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
  "Se releva el síntoma antes de tocar lógica o hardware.",
  "Se busca evidencia online, eléctrica y de campo.",
  "Se prueba con producción, mantenimiento y seguridad operativa en mente.",
  "Se deja una recomendación clara para sostener el sistema después de la intervención.",
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
      "Diseño, modificación y puesta en marcha de sistemas con PLC, HMI, SCADA, variadores, sensores, actuadores e instrumentación.",
    applications: [
      "PLC Siemens S5, S7-200, S7-300/400, S7-1200/1500",
      "TIA Portal y STEP 7 Classic",
      "HMI / SCADA",
      "Señales digitales y analógicas",
      "Lógica secuencial y control de procesos",
      "PID y variadores de velocidad",
    ],
    benefit:
      "Un sistema más estable, documentado y diagnosticable, con menos dependencia de improvisación durante una parada.",
    problem:
      "Máquinas o procesos que necesitan ampliar funciones, corregir lógica, integrar equipos o arrancar producción con menor riesgo.",
    impact:
      "Una automatización inestable detiene producción, complica mantenimiento y vuelve costoso cualquier cambio futuro.",
    approach:
      "Relevamiento de señales, lectura de lógica, pruebas controladas y puesta en marcha con criterio de operación y mantenimiento.",
    whenToConsult:
      "Cuando una máquina necesita nuevas funciones, presenta fallas repetitivas o se va a modificar lógica, HMI, variadores o señales críticas.",
  },
  {
    title: "Ingeniería eléctrica básica y de detalle",
    icon: "ClipboardCheck",
    description:
      "Ingeniería para instalaciones eléctricas, tableros, migraciones y automatización cuando el proyecto necesita claridad antes de ejecutar.",
    applications: [
      "Pliegos y especificaciones técnicas",
      "Planos eléctricos y digitalización",
      "Modernización de tableros con lógica a relé",
      "Migraciones a PLC",
      "Dimensionamiento de motores, variadores y servos",
      "Selección de sensores, actuadores y componentes de campo",
    ],
    benefit:
      "Menos retrabajo en montaje, compras mejor definidas y pruebas más ordenadas al llegar a planta.",
    problem:
      "Proyectos con planos incompletos, señales sin relevar o decisiones de montaje tomadas sin ingeniería suficiente.",
    impact:
      "La falta de ingeniería aumenta retrabajos, errores de conexionado, demoras de montaje y riesgos durante pruebas con producción.",
    approach:
      "Relevamiento técnico, definición de alcance, planos, selección de componentes y preparación de pruebas FAT/SAT.",
    whenToConsult:
      "Antes de comprar componentes, montar tableros, migrar una instalación o ejecutar una obra donde un plano incompleto puede generar retrabajo.",
  },
  {
    title: "Diagnóstico de fallas industriales",
    icon: "FileSearch",
    description:
      "Análisis de fallas en sistemas automatizados para reducir parada, separar causa probable y evitar cambios innecesarios.",
    applications: [
      "CPU en STOP/RUN",
      "LEDs SF/BF/RUN/STOP",
      "Diagnostic Buffer",
      "Hardware Config online",
      "Fallas de comunicación y módulos I/O",
      "Sensores, actuadores y problemas intermitentes de planta",
    ],
    benefit:
      "Decisiones más rápidas y defendibles durante una parada, con evidencia antes de reemplazar componentes.",
    problem:
      "CPU en STOP, BF/SF activos, módulos con error, fallas intermitentes o síntomas que producción necesita resolver rápido.",
    impact:
      "Cada hora de incertidumbre puede traducirse en pérdida de producción, cambios innecesarios de módulos y desgaste del equipo de mantenimiento.",
    approach:
      "Lectura de estado, Diagnostic Buffer, hardware online, red, módulos I/O, sensores y actuadores hasta acotar la causa.",
    whenToConsult:
      "Cuando hay CPU en STOP, BF/SF activo, fallas intermitentes, pérdida de comunicación o producción necesita una causa técnica antes de cambiar hardware.",
  },
  {
    title: "Migraciones",
    icon: "RefreshCcw",
    description:
      "Migración de plataformas legacy a sistemas modernos con relevamiento, pruebas y puesta en marcha planificada.",
    applications: [
      "Migración Siemens S5 a S7/TIA",
      "Migración S7-300/400 a S7-1200/1500",
      "Conversión de lógica",
      "Relevamiento de señales",
      "Documentación técnica",
      "Pruebas y puesta en marcha",
    ],
    benefit:
      "Modernización con menor exposición productiva, más soporte técnico y mejor disponibilidad de repuestos.",
    problem:
      "Equipos legacy con repuestos difíciles, software antiguo, baja documentación o riesgo operativo ante una falla mayor.",
    impact:
      "La obsolescencia aumenta costos, limita soporte técnico y puede dejar una línea crítica sin recuperación rápida.",
    approach:
      "Relevamiento de hardware y señales, análisis de lógica, conversión por etapas, pruebas y respaldo para arranque.",
    whenToConsult:
      "Cuando el sistema legacy empieza a ser un riesgo por repuestos, soporte, software antiguo o falta de documentación para mantenimiento.",
  },
  {
    title: "Redes industriales",
    icon: "Network",
    description:
      "Diagnóstico y configuración de redes industriales que conectan PLC, HMI, drives y periferia distribuida.",
    applications: [
      "PROFIBUS DP",
      "PROFINET",
      "Ethernet industrial",
      "Diagnóstico de nodos",
      "Terminaciones, conectores y repetidores",
      "Fallas BF y comunicación PLC-HMI-Drive",
    ],
    benefit:
      "Mayor estabilidad de comunicación y menos paradas por nodos perdidos, conectores deficientes o configuración inconsistente.",
    problem:
      "Nodos que desaparecen, fallas BF, comunicación inestable entre PLC, HMI, drives o periferia distribuida.",
    impact:
      "Una red industrial inestable puede parar toda una celda aunque el PLC y los equipos principales estén en buen estado.",
    approach:
      "Revisión de diagnóstico online, topología, nodos, conectores, terminaciones, repetidores y eventos registrados.",
    whenToConsult:
      "Cuando aparecen BF, nodos perdidos, desconexiones aleatorias, HMI sin comunicación o drives que dejan de responder sin una causa evidente.",
  },
  {
    title: "Instrumentación y señales de campo",
    icon: "Gauge",
    description:
      "Diagnóstico e integración de señales de campo para que el PLC lea el proceso de forma confiable.",
    applications: [
      "4-20 mA y 0-10 V",
      "Sensores y transmisores",
      "Presión, temperatura, nivel y caudal",
      "Escalado de señales",
      "Fallas de cableado",
      "Verificación de lazo",
    ],
    benefit:
      "Lecturas más confiables y menor riesgo de confundir una falla de instrumento o cableado con un problema de programa.",
    problem:
      "Lecturas analógicas fuera de escala, señales ausentes, transmisores dudosos o lazos que no coinciden con el proceso real.",
    impact:
      "Una señal de campo mal interpretada puede generar falsas alarmas, paradas, dosificación incorrecta o decisiones de control erróneas.",
    approach:
      "Verificación de lazo, medición eléctrica, escalados, cableado, alimentación y coherencia entre señal y proceso.",
    whenToConsult:
      "Cuando una lectura no coincide con el proceso, una señal cae a cero, hay ruido, alarmas falsas o dudas entre sensor, cableado y programa.",
  },
  {
    title: "Electricidad industrial y tableros",
    icon: "CircuitBoard",
    description:
      "Relevamiento, diagnóstico y mejora de tableros de control, fuerza, mando, protecciones y conexionado de campo.",
    applications: [
      "Tableros de control y fuerza",
      "MCC",
      "Arranques de motores",
      "Protecciones",
      "Ordenamiento y diagnóstico de tableros",
      "Documentación",
    ],
    benefit:
      "Tableros más seguros, legibles y mantenibles, con mejor trazabilidad para futuras intervenciones.",
    problem:
      "Tableros con cableado desordenado, señales sin identificar, protecciones dudosas o documentación incompleta.",
    impact:
      "Un tablero difícil de mantener prolonga paradas, aumenta riesgos eléctricos y complica cualquier diagnóstico posterior.",
    approach:
      "Relevamiento, identificación de señales, revisión de protecciones, mando, fuerza y documentación funcional.",
    whenToConsult:
      "Cuando el tablero es difícil de diagnosticar, no hay planos confiables, se repiten fallas eléctricas o se necesita mejorar seguridad y trazabilidad.",
  },
  {
    title: "Capacitación técnica industrial",
    icon: "GraduationCap",
    description:
      "Capacitaciones para técnicos, instrumentistas, electricistas, ingenieros y mantenimiento que necesitan actuar frente a equipos reales.",
    applications: [
      "PLC Siemens",
      "Diagnóstico de fallas",
      "Redes industriales",
      "TIA Portal y STEP 7 Classic",
      "Señales analógicas y variadores",
      "Cursos in-company y grabados",
    ],
    benefit:
      "Un equipo con mejor criterio técnico, menos dependencia externa y respuestas más ordenadas ante fallas.",
    problem:
      "Equipos de mantenimiento que usan PLC y redes a diario, pero necesitan método para diagnosticar bajo presión.",
    impact:
      "La falta de criterio común genera dependencia externa, tiempos largos de diagnóstico y decisiones apresuradas en parada.",
    approach:
      "Casos reales, lectura online, análisis de síntomas, práctica con tableros, redes y criterios aplicables al turno.",
    whenToConsult:
      "Cuando el equipo de mantenimiento necesita un método común para responder mejor ante paradas, PLC Siemens, redes o señales de campo.",
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
      "Mantenimiento industrial, instrumentistas, automatistas, ingeniería de planta, operación técnica y programadores PLC.",
    learn:
      "Aplicar un método de diagnóstico real: síntoma, evidencia de campo, lectura online, causa probable y acción técnica.",
    outcomes: [
      "Diagnosticar CPU en STOP, SF/BF, PROFIBUS, módulos y señales con una secuencia clara.",
      "Diferenciar fallas de campo, señales, red, hardware, lógica y proceso.",
      "Evitar prueba y error durante una parada de planta.",
      "Respaldar decisiones técnicas con evidencia online, eléctrica y de campo.",
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
      "Técnicos que necesitan incorporar TIA Portal, estudiantes avanzados, programadores con experiencia en STEP 7 Classic y personal de mantenimiento.",
    learn:
      "Crear proyectos, configurar hardware, ordenar variables, programar LAD básico, cargar al PLC y monitorear online.",
    outcomes: [
      "Crear y cargar proyectos básicos en TIA Portal con estructura.",
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
    "Curso aplicado para mantenimiento e ingeniería que necesitan diagnosticar fallas reales en planta: CPU, LEDs, Diagnostic Buffer, HW Config Online, PROFIBUS, módulos, señales de campo y decisiones bajo presión operativa.",
  positioning: [
    "No es un curso de programación PLC. Es una formación de diagnóstico industrial para intervenir fallas reales con método.",
    "Diagnosticar no es probar: el objetivo es construir evidencia antes de modificar lógica, reemplazar hardware o reiniciar equipos.",
    "El PLC no siempre es la causa; muchas veces solo está leyendo una señal que no representa correctamente la realidad del proceso.",
    "El método permite trabajar con sistemas desconocidos, documentación incompleta y presión de producción sin perder criterio técnico.",
  ],
  audience: [
    "Técnicos de mantenimiento industrial",
    "Instrumentistas",
    "Automatistas",
    "Electricistas industriales",
    "Ingenieros de planta",
    "Programadores PLC",
    "Personal de operación con responsabilidad técnica",
    "Estudiantes técnicos avanzados con base en PLC",
  ],
  includes: [
    "Videos grabados con foco técnico aplicado",
    "PDFs profesionales de consulta para diagnóstico",
    "Base conceptual sobre sistemas de control industrial",
    "Casos reales de planta y mantenimiento",
    "BOJ S7-PLC Course Edition incluida",
    "Ejemplos con tablero didáctico real",
    "Lectura de LEDs, CPU, Diagnostic Buffer y HW Config Online",
    "Procedimiento estructurado de búsqueda de causa probable",
  ],
  learnItems: [
    "Interpretar estados RUN/STOP, SF/BF y eventos del Diagnostic Buffer con criterio de mantenimiento.",
    "Conectarse online con STEP 7 Classic y leer hardware sin perder la secuencia de diagnóstico.",
    "Relacionar síntomas de PROFIBUS, módulos I/O, señales de campo, alimentación, lógica y proceso.",
    "Aplicar la jerarquía real de fallas: campo, señales/interlocks, redes y PLC/lógica.",
    "Construir una hipótesis técnica defendible antes de intervenir el sistema.",
  ],
  modules: [
    "Mentalidad y método profesional de diagnóstico industrial",
    "Realidad de una falla en planta: presión, poca información y síntoma incompleto",
    "Arquitectura de sistemas de control: PLC, HMI, SCADA, redes, campo y proceso",
    "Jerarquía de fallas: campo, señales/interlocks, redes y PLC/lógica",
    "Arquitectura Siemens S7-300/400 y comportamiento de CPU",
    "Estados RUN/STOP y lectura técnica de LEDs SF/BF/FRCE",
    "Conexión online con STEP 7 Classic y lectura de hardware",
    "Diagnostic Buffer: eventos, OBs y criterio de interpretación",
    "HW Config Online: módulos, estaciones, mismatch y diagnóstico de hardware",
    "PROFIBUS DP: BF fijo/intermitente, esclavos caídos, ET200 y conectores",
    "Señales digitales, analógicas, alimentación, sensores y actuadores",
    "Fallas sistémicas, intermitentes y diagnósticos engañosos",
    "Casos reales de planta y errores típicos de intervención",
    "Método BOJ y uso de BOJ S7-PLC Course Edition",
  ],
  benefits: [
    "Reducir tiempos de diagnóstico durante paradas al ordenar la búsqueda de causa probable.",
    "Trabajar con método antes de cambiar hardware, modificar lógica o reiniciar equipos.",
    "Interpretar síntomas de CPU, módulos, PROFIBUS, señales, alimentación y proceso.",
    "Separar evidencia física, evidencia online y suposiciones de campo.",
    "Documentar qué se verificó, qué evidencia apareció y cuál es el siguiente paso técnico.",
  ],
  outcomes: [
    "Intervenir una falla real siguiendo una secuencia: observación, síntoma, señales, evidencia online, causa probable y acción.",
    "Usar Diagnostic Buffer y HW Config Online para orientar la búsqueda sin perder contexto de planta.",
    "Relacionar LEDs SF/BF/RUN/STOP con red, módulos, señales, alimentación y eventos de CPU.",
    "Diferenciar falla de campo, señal, red, hardware, lógica o condición de proceso.",
    "Trabajar sobre sistemas con poca documentación con mayor seguridad técnica.",
  ],
  avoidMistakes: [
    "Cambiar módulos sin evidencia online.",
    "Confundir falla de campo con falla de programa.",
    "Ignorar eventos del Diagnostic Buffer.",
    "Reiniciar equipos sin registrar síntomas previos.",
    "Diagnosticar desde SCADA una falla que primero debe verificarse eléctrica o físicamente.",
    "Perder tiempo revisando zonas del sistema que no están relacionadas con el síntoma.",
  ],
  difference: [
    "Está desarrollado desde situaciones de parada de planta, no desde una demostración ideal de software.",
    "Combina base conceptual de sistemas de control con lectura online y verificación de campo.",
    "Trabaja con síntomas reales: CPU en STOP, SF/BF, módulos con error, PROFIBUS, señales dudosas y fallas intermitentes.",
    "Enseña a decidir qué mirar primero, qué descartar y cómo justificar el próximo paso frente a mantenimiento y producción.",
    "Integra BOJ S7-PLC Course Edition para llevar el método al tablero como apoyo técnico de campo.",
  ],
  appValue: [
    "BOJ S7-PLC Course Edition está incluida para ordenar síntomas, LEDs, PROFIBUS, señales y observaciones de campo.",
    "Funciona como guía rápida cuando hay presión operativa y no resulta conveniente depender de memoria o prueba y error.",
    "Permite aplicar el método del curso sobre estados de CPU y fallas PROFIBUS frecuentes.",
    "La versión PRO amplía el motor de diagnóstico, ramas avanzadas y biblioteca extendida de casos reales.",
  ],
};

export const tiaCourse = {
  title: "Introducción a TIA Portal con PLC Siemens S7-1200/1500",
  subtitle:
    "Curso introductorio para incorporar TIA Portal con una base ordenada: hardware, variables, LAD, carga, monitoreo y diagnóstico inicial.",
  audience: [
    "Técnicos que necesitan iniciar en TIA Portal",
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
  learnItems: [
    "Crear un proyecto desde cero con hardware S7-1200/1500 y estructura básica.",
    "Ordenar variables, bloques y lógica LAD para que el proyecto sea mantenible.",
    "Cargar al PLC, monitorear online y entender diagnósticos iniciales.",
    "Conectar la programación con necesidades reales de mantenimiento y puesta en marcha.",
  ],
  benefits: [
    "Comprender la estructura de TIA Portal.",
    "Programar desde cero con orden.",
    "Cargar y monitorear online sin improvisar.",
    "Prepararse para proyectos reales con PLC modernos.",
    "Construir proyectos más mantenibles desde la primera versión.",
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
  difference: [
    "Está orientado a incorporar TIA Portal con orden técnico, no a memorizar pantallas.",
    "Relaciona hardware, variables, bloques y monitoreo con situaciones reales de planta.",
    "Prepara una base sólida para programar, diagnosticar y comunicarse mejor con mantenimiento.",
  ],
};

export const appHero = {
  title: "BOJ S7-PLC",
  subtitle: "Herramienta de diagnóstico industrial para PLC Siemens S7-300/400",
  text:
    "Herramienta digital técnica diseñada para guiar el diagnóstico de fallas reales en planta, interpretar estados de CPU, analizar fallas PROFIBUS y ordenar hipótesis de causa probable.",
  note:
    "No reemplaza el criterio profesional: ayuda a sostener un método cuando hay presión, poco tiempo y síntomas mezclados.",
};

export const appCapabilities = [
  {
    title: "Interpreta LEDs de CPU",
    text: "RUN, STOP, SF, BF, FRCE y DC5V cuando corresponde, con lectura técnica de combinaciones frecuentes.",
    icon: "Cpu",
  },
  {
    title: "Guía diagnóstico por contexto",
    text: "Mantiene la rama técnica según el síntoma: CPU, conexión online, Diagnostic Buffer, HW Config o PROFIBUS/DP.",
    icon: "FileSearch",
  },
  {
    title: "Analiza fallas PROFIBUS",
    text: "BF fijo, BF intermitente, ET200 caída, esclavos DP, conectores, terminaciones, direcciones y 24 VDC.",
    icon: "Network",
  },
  {
    title: "Prioriza hipótesis",
    text: "Ordena causas probables según evidencia; no muestra listas indiscriminadas ni pretende adivinar la falla.",
    icon: "Gauge",
  },
  {
    title: "Incluye casos reales",
    text: "Biblioteca de fallas típicas de planta con contexto, síntoma, verificación, error común y criterio de seguridad.",
    icon: "ClipboardCheck",
  },
  {
    title: "Funciona como herramienta de campo",
    text: "Pensada para técnicos, instrumentistas e ingenieros que diagnostican frente al tablero con STEP 7 Classic.",
    icon: "Smartphone",
  },
];

export const appPlantBenefits = [
  "Evita saltos de diagnóstico y revisiones sin relación con el síntoma.",
  "Ordena verificaciones: LEDs, CPU, conexión online, Diagnostic Buffer, HW Config, red y campo.",
  "Ayuda a diferenciar fallas de CPU, PROFIBUS, alimentación, módulo, señal, lógica o condición de proceso.",
  "Reduce errores comunes como cambiar hardware sin evidencia, ignorar FRCE activo o pasar por alto una estación sin 24 VDC.",
  "Apoya el criterio técnico bajo presión, sin prometer resultados automáticos ni reemplazar al profesional.",
];

export const appDiagnosticModules = [
  {
    title: "Estado CPU / LEDs",
    text: "Selección visual de RUN, STOP, SF, BF, FRCE y DC5V para interpretar estado probable, significado técnico, advertencias y acciones recomendadas.",
    items: ["RUN + SF", "RUN + BF", "RUN + SF + BF", "STOP + SF", "BF fijo/intermitente", "FRCE activo"],
  },
  {
    title: "Diagnóstico guiado",
    text: "Flujo por fases que conserva contexto técnico para no desviar la búsqueda hacia ramas que no corresponden.",
    items: ["SIMATIC Manager", "Diagnostic Buffer", "HW Config Online", "PROFIBUS/DP", "Señales", "Lógica/secuencia"],
  },
  {
    title: "PROFIBUS / DP",
    text: "Rama específica para esclavos DP caídos, ET200, variadores, conectores DB9, terminaciones, repetidores y alimentación de estaciones.",
    items: ["Un esclavo caído", "Varios esclavos", "ET200 offline", "Dirección duplicada", "24 VDC", "Mantenimiento reciente"],
  },
  {
    title: "Hipótesis ponderadas",
    text: "Ranking de causas probables según respuestas y evidencia. La app orienta verificaciones, no adivina.",
    items: ["OB82/OB86 faltante", "HW Config mismatch", "FRCE activo", "Conector flojo", "Borne flojo", "Falla por vibración"],
  },
  {
    title: "Casos reales",
    text: "Casos de planta con contexto, síntoma observado, causa probable, verificación recomendada, error típico y criterio de seguridad.",
    items: ["10 casos Course Edition", "80+ casos PRO", "Fallas engañosas", "Errores comunes", "Criterio de intervención"],
  },
  {
    title: "Guía técnica",
    text: "Consulta rápida para OBs, Diagnostic Buffer, HW Config, BF/SF, PROFIBUS y temas avanzados en PRO.",
    items: ["OB82", "OB86", "OB121", "OB122", "Wire break", "Interlocks"],
  },
];

export const appComparison = [
  { feature: "LEDs CPU", course: "Sí", pro: "Sí" },
  { feature: "Diagnóstico CPU", course: "Sí", pro: "Sí" },
  { feature: "PROFIBUS básico", course: "Sí", pro: "Sí" },
  { feature: "Casos reales", course: "10 seleccionados", pro: "80+ casos" },
  { feature: "Señales analógicas 4-20 mA", course: "Limitado", pro: "Sí" },
  { feature: "DO / actuadores", course: "Bloqueado", pro: "Sí" },
  { feature: "Lógica, secuencias e interlocks", course: "Bloqueado", pro: "Sí" },
  { feature: "Diagnóstico engañoso", course: "Básico", pro: "Avanzado" },
  { feature: "Informe técnico / exportes", course: "Limitado", pro: "Completo" },
  { feature: "Actualizaciones futuras", course: "Base", pro: "Incluidas" },
];

export const appRealCases = [
  "CPU en STOP + SF por OB82 faltante",
  "STOP + BF por ET200 sin alimentación 24 VDC",
  "HW Config incorrecta o mismatch con hardware real",
  "BF intermitente por conector DB9 flojo",
  "BF fijo por dirección PROFIBUS duplicada",
  "ET200 aparece y desaparece por borne flojo",
  "Terminación PROFIBUS incorrecta",
  "Parecía red, pero era alimentación de estación",
  "FRCE activo olvidado",
  "HW Config actualizada en PC pero no descargada al PLC",
];

export const appAudience = [
  "Técnicos de mantenimiento",
  "Instrumentistas",
  "Automatistas",
  "Programadores PLC",
  "Supervisores eléctricos",
  "Ingenieros de planta",
  "Estudiantes avanzados de automatización",
  "Personal de planta que trabaja con Siemens S7",
];

export const technicalArticle = {
  title: "¿Qué es SIMATIC STEP 7 y para qué se utiliza en automatización industrial?",
  description:
    "Una mirada técnica y aplicada sobre STEP 7 Classic, su uso en PLC Siemens S7-300/400 y su importancia para mantenimiento industrial.",
  meta: ["PLC Siemens", "STEP 7 Classic", "S7-300/400", "Diagnóstico industrial"],
  intro:
    "SIMATIC STEP 7 sigue siendo una herramienta central en muchas plantas industriales que trabajan con PLC Siemens S7-300 y S7-400. Aunque TIA Portal es la plataforma moderna de Siemens, en campo todavía existe una gran cantidad de sistemas legacy que se mantienen, diagnostican y modifican desde STEP 7 Classic.",
  sections: [
    {
      title: "¿Qué es STEP 7?",
      text:
        "STEP 7 Classic es el software histórico de Siemens para configurar, programar, diagnosticar y mantener PLC SIMATIC, especialmente de las familias S7-300 y S7-400. En una planta industrial no se usa solamente para escribir lógica: también permite revisar hardware, entrar online, interpretar eventos, respaldar proyectos y entender el estado real del sistema.",
    },
    {
      title: "¿Para qué se usa en planta?",
      text:
        "En mantenimiento industrial, STEP 7 se utiliza como una herramienta de ingeniería y diagnóstico. Permite pasar de un síntoma operativo a evidencia técnica: qué CPU está activa, qué módulos responden, qué eventos aparecen y qué señales condicionan la secuencia.",
      items: [
        "Programación PLC en LAD, FBD o STL según el proyecto existente.",
        "Configuración de hardware, racks, módulos, direcciones y estaciones remotas.",
        "Diagnóstico online de CPU, módulos, periferia distribuida y comunicaciones.",
        "Lectura del Diagnostic Buffer para interpretar eventos, errores y OBs involucrados.",
        "Monitoreo de lógica, señales, marcas, entradas, salidas y bloques de programa.",
        "Carga, descarga, comparación y respaldo de proyectos.",
        "Análisis de fallas de planta con foco en causa probable y no solo en el síntoma.",
      ],
    },
    {
      title: "STEP 7 Classic vs TIA Portal",
      text:
        "TIA Portal integra en una plataforma moderna la ingeniería de PLC, HMI, redes y diagnóstico. Sin embargo, STEP 7 Classic sigue presente en muchas instalaciones con S7-300 y S7-400, máquinas importadas, líneas antiguas, sistemas críticos y proyectos que todavía no fueron migrados. Para mantenimiento, conocer ambas herramientas es una ventaja: TIA para sistemas modernos y STEP 7 Classic para intervenir equipamiento instalado.",
    },
    {
      title: "Importancia para mantenimiento industrial",
      text:
        "Un técnico de mantenimiento que trabaja con Siemens no necesita usar STEP 7 solo como programador. Necesita usarlo para leer la condición real de la planta y tomar mejores decisiones durante una parada. La diferencia está en interpretar evidencia antes de cambiar hardware, reiniciar equipos o modificar lógica.",
      items: [
        "Interpretar fallas de CPU, módulos y estaciones remotas.",
        "Ver estados online y relacionarlos con señales físicas de campo.",
        "Diagnosticar CPU en STOP, SF, BF o eventos repetitivos.",
        "Analizar señales digitales, analógicas, interlocks y condiciones de secuencia.",
        "Revisar redes PROFIBUS/PROFINET desde el contexto del PLC y la configuración.",
        "Evitar reemplazos innecesarios de hardware cuando la causa está en campo, red, alimentación o configuración.",
      ],
    },
  ],
  officialLinks: [
    {
      label: "Siemens STEP 7 / TIA Portal",
      href: "https://www.siemens.com/en-us/products/tia-portal/step7/",
      text: "Información oficial de Siemens sobre STEP 7 dentro del ecosistema TIA Portal.",
    },
    {
      label: "Siemens Industry Online Support",
      href: "https://support.industry.siemens.com/",
      text: "Portal oficial para documentación, soporte, descargas y notas técnicas de productos Siemens.",
    },
    {
      label: "Siemens Industry Mall / STEP 7 Professional",
      href: "https://mall.industry.siemens.com/mall/en/Catalog/Products/10317037",
      text: "Información comercial y técnica oficial de STEP 7 Professional en Siemens Industry Mall.",
    },
  ],
};

export const futureTechnicalArticles = [
  "STEP 7 Classic vs TIA Portal",
  "Qué es el Diagnostic Buffer",
  "Qué significa SF/BF en un PLC Siemens",
  "Introducción a PROFIBUS",
  "Señales 4-20 mA en PLC",
];

export const aboutPage = {
  title: "Sobre mí",
  subtitle:
    "Walter Adrián Boj, responsable técnico de BOJ Automatización y Control.",
  intro:
    "BOJ Automatización y Control nace desde el trabajo real en planta: diagnóstico de fallas, automatización industrial, tableros, redes, migraciones, puesta en marcha y capacitación técnica aplicada. La propuesta combina experiencia de campo con método, documentación y criterio para que cada intervención tenga sentido operativo.",
  focus: [
    "Diagnóstico de fallas en PLC Siemens, redes industriales, módulos, señales y condiciones de proceso.",
    "Automatización, modificación y puesta en marcha de sistemas PLC/HMI/SCADA.",
    "Capacitación técnica para mantenimiento, instrumentistas, electricistas, automatistas e ingeniería.",
    "Desarrollo de BOJ S7-PLC como herramienta de apoyo para diagnóstico estructurado en campo.",
  ],
  principles: [
    "Primero se releva el síntoma; después se analiza la evidencia.",
    "No se reemplaza hardware sin justificar técnicamente la causa probable.",
    "La capacitación debe servir para actuar mejor frente a una falla real.",
    "Una intervención termina mejor cuando deja criterio, respaldo y próximos pasos claros.",
  ],
};

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
