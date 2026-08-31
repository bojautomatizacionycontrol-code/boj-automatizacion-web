export const languageRoutePairs = [
  { es: "/", en: "/en", pt: "/pt" },
  { es: "/inicio", en: "/en", pt: "/pt" },
  { es: "/servicios", en: "/en/services", pt: "/pt/servicos" },
  { es: "/cursos", en: "/en/courses", pt: "/pt/cursos" },
  { es: "/cursos/s7-300-400", en: "/en/courses/s7-300-400", pt: "/pt/cursos/s7-300-400" },
  { es: "/cursos/tia-portal", en: "/en/courses/tia-portal", pt: "/pt/cursos/tia-portal" },
  { es: "/app", en: "/en/app", pt: "/pt/app" },
  { es: "/obras", en: "/en/projects", pt: "/pt/projetos" },
  { es: "/contacto", en: "/en/contact", pt: "/pt/contato" },
];

export const englishNavItems = [
  { label: "Home", path: "/en" },
  { label: "Services", path: "/en/services" },
  {
    label: "Training",
    path: "/en/courses",
    children: [
      { label: "S7-300/400 diagnostics", path: "/en/courses/s7-300-400" },
      { label: "TIA Portal S7-1200/1500 — Upcoming", path: "/en/courses/tia-portal" },
    ],
  },
  { label: "App", path: "/en/app" },
  { label: "Projects", path: "/en/projects" },
  { label: "Contact", path: "/en/contact" },
];

export const portugueseNavItems = [
  { label: "Início", path: "/pt" },
  { label: "Serviços", path: "/pt/servicos" },
  {
    label: "Cursos",
    path: "/pt/cursos",
    children: [
      { label: "Diagnóstico S7-300/400", path: "/pt/cursos/s7-300-400" },
      { label: "TIA Portal S7-1200/1500 — Em preparação", path: "/pt/cursos/tia-portal" },
    ],
  },
  { label: "App", path: "/pt/app" },
  { label: "Projetos", path: "/pt/projetos" },
  { label: "Contato", path: "/pt/contato" },
];

export const englishHome = {
  navigator: [
    {
      icon: "TriangleAlert",
      title: "Industrial services",
      text: "Diagnostics and technical support to restore operation.",
      href: "/en/services",
    },
    {
      icon: "GraduationCap",
      title: "Technical training",
      text: "Applied training based on real industrial problems.",
      href: "/en/courses",
    },
    {
      icon: "MonitorCog",
      title: "Try the BOJ S7-PLC App",
      text: "A digital guide for symptoms and technical hypotheses.",
      href: "/en/app",
    },
  ],
  problems: [
    { icon: "Cpu", text: "CPU in STOP without a clear cause" },
    { icon: "Network", text: "PROFIBUS or PROFINET communication faults" },
    { icon: "CircuitBoard", text: "Modules or I/O signals behaving inconsistently" },
    { icon: "MonitorCog", text: "HMI, SCADA or drive integration issues" },
    { icon: "RefreshCcw", text: "Legacy PLC migrations and modernization" },
    { icon: "Clock", text: "Production pressure and limited troubleshooting time" },
  ],
  specialties: [
    { icon: "Cpu", title: "Siemens PLC", text: "S5, S7-200, S7-300/400 and S7-1200/1500 systems." },
    { icon: "Network", title: "Industrial networks", text: "PROFIBUS, PROFINET and communication diagnostics." },
    { icon: "MonitorCog", title: "HMI and SCADA", text: "Operator interfaces, alarms, trends and process supervision." },
    { icon: "Settings", title: "Commissioning", text: "Field signals, functional tests and controlled start-up." },
  ],
};

export const englishServices = {
  workflow: [
    { icon: "FileSearch", title: "Understand the symptom", text: "Collect alarms, operating conditions and available field evidence." },
    { icon: "ClipboardCheck", title: "Prioritize the cause", text: "Separate PLC, network, hardware, signal and process-related possibilities." },
    { icon: "Wrench", title: "Define the intervention", text: "Set a clear scope, risk controls and the next technical action." },
  ],
  areas: [
    { icon: "TriangleAlert", title: "A machine or process has stopped", text: "Fault isolation under production pressure." },
    { icon: "Cpu", title: "A PLC or HMI needs changes", text: "Programming, online diagnostics and controlled modifications." },
    { icon: "Network", title: "The industrial network is unstable", text: "Node, connector, termination and communication analysis." },
    { icon: "RefreshCcw", title: "A legacy system must be modernized", text: "Migration planning, signal survey, testing and commissioning." },
  ],
  primary: [
    {
      icon: "ScanSearch",
      title: "Industrial fault diagnostics",
      description: "Technical troubleshooting based on observable symptoms and field evidence.",
      applications: ["CPU STOP, SF or BF", "Intermittent faults", "Modules and I/O", "Machine and process stoppages"],
      result: "A prioritized technical hypothesis and a safer verification path.",
      when: "When trial and error is consuming time or creating operational risk.",
    },
    {
      icon: "Cpu",
      title: "PLC, HMI and SCADA engineering",
      description: "Programming, modifications, integration and commissioning for industrial control systems.",
      applications: ["Siemens PLC programming", "HMI and SCADA screens", "Alarm and sequence improvements", "Functional testing"],
      result: "A documented solution aligned with operation and maintenance needs.",
      when: "When an existing system requires correction, expansion or a new control strategy.",
    },
    {
      icon: "Network",
      title: "Industrial networks",
      description: "Diagnostics and integration for PROFIBUS, PROFINET and connected field devices.",
      applications: ["Node and topology review", "Connectors and termination", "PLC-HMI-drive communication", "Online network diagnostics"],
      result: "Greater communication stability and clearer evidence for maintenance.",
      when: "When communication faults appear intermittently or stop part of the process.",
    },
    {
      icon: "RefreshCcw",
      title: "PLC migrations and modernization",
      description: "Controlled transition from legacy platforms to maintainable Siemens architectures.",
      applications: ["S5 to S7 migrations", "Hardware and signal survey", "Logic conversion", "SAT and production start-up"],
      result: "A modernized system with improved supportability and diagnostic capability.",
      when: "When obsolescence, spare parts or software support threaten continuity.",
    },
  ],
  field: [
    { icon: "Factory", title: "Real production environments", text: "Experience in energy, oil and gas, food, manufacturing and auxiliary systems." },
    { icon: "ShieldCheck", title: "Controlled intervention", text: "Technical decisions adapted to operational risk and plant conditions." },
    { icon: "ClipboardCheck", title: "Traceable work", text: "Scope, tests and technical outcomes documented for operation and maintenance." },
  ],
  secondary: [
    {
      icon: "Gauge",
      title: "Instrumentation and field signals",
      text: "Verification and troubleshooting of analog, digital and process signals.",
      applications: ["Sensors and transmitters", "Signal loops", "Scaling and calibration", "PLC input and output checks"],
    },
    {
      icon: "CircuitBoard",
      title: "Industrial electrical systems and control panels",
      text: "Technical support for control panels, field wiring and operating reliability.",
      applications: ["Control circuits", "Field wiring", "Panel modifications", "Electrical fault isolation"],
    },
    {
      icon: "GraduationCap",
      title: "Industrial technical training",
      text: "Applied training for maintenance and automation teams.",
      applications: ["Siemens PLC diagnostics", "Industrial networks", "Field troubleshooting method", "Programs adapted to the team"],
    },
  ],
};

export const englishCourses = {
  benefits: [
    { icon: "FileSearch", title: "Troubleshoot with a method", text: "Move from symptoms to evidence without relying on guesswork." },
    { icon: "Cpu", title: "Understand Siemens systems", text: "Connect CPU states, hardware, networks and field signals." },
    { icon: "Wrench", title: "Apply it in the field", text: "Use practical criteria during real maintenance situations." },
  ],
  learning: [
    { icon: "ClipboardCheck", text: "Organize a diagnosis before changing components." },
    { icon: "Network", text: "Interpret CPU, PROFIBUS, module and signal evidence." },
    { icon: "ShieldCheck", text: "Intervene with clearer technical and safety criteria." },
    { icon: "Factory", text: "Transfer the method to real industrial systems." },
  ],
};

export const englishApp = {
  problems: [
    { icon: "Cpu", title: "CPU in STOP", text: "A stopped CPU without an immediately visible cause." },
    { icon: "Zap", title: "Active SF or BF", text: "System or communication alarms that require structured checks." },
    { icon: "Network", title: "PROFIBUS faults", text: "Lost communication, missing nodes or unstable behavior." },
    { icon: "CircuitBoard", title: "Modules and signals", text: "Unresponsive modules, I/O faults or inconsistent field signals." },
    { icon: "RefreshCcw", title: "Intermittent faults", text: "Problems that appear and disappear before the cause is confirmed." },
    { icon: "Clock", title: "Production pressure", text: "A clearer first response when troubleshooting time is limited." },
  ],
  steps: [
    { icon: "ClipboardCheck", title: "Enter the symptom", text: "Record what you observe on the PLC and in the field." },
    { icon: "Brain", title: "Review prioritized hypotheses", text: "The app organizes possible causes according to the evidence." },
    { icon: "CheckCircle2", title: "Verify in the field", text: "Follow practical checks to confirm or rule out each cause." },
  ],
  includes: [
    { icon: "FileSearch", title: "LED and symptom diagnostics", text: "Interpret common operating states and fault symptoms." },
    { icon: "ClipboardCheck", title: "Prioritized technical hypotheses", text: "Hypotheses prioritized according to the available evidence and its relative weight." },
    { icon: "ShieldCheck", title: "Step-by-step verification", text: "Clear checks to perform safely in the field." },
    { icon: "Cpu", title: "Focused on S7-300/400", text: "Technical guidance for classic Siemens CPUs and modules." },
    { icon: "MonitorCog", title: "Installable web interface", text: "Browser access with installation on compatible devices." },
    { icon: "Settings", title: "Support for teams", text: "A shared method that reduces improvisation during diagnostics." },
  ],
  views: [
    { title: "Guided diagnostics by stages", text: "A guided subflow for modules, interfaces, racks and communication." },
  ],
  planCopy: {
    "Prueba gratuita": {
      title: "Free trial",
      price: "Free",
      meta: "48 hours · Online · Limited features",
      bullets: ["Free access for 48 hours", "Online use only", "Some features are limited", "A practical way to explore the workflow"],
      button: "Start the free trial",
    },
    "Suscripción mensual": {
      title: "Monthly subscription",
      meta: "Per month · Renews automatically until cancelled · 1 device",
      bullets: ["App only, no course", "1 device", "Automatic renewal until cancelled", "Offline use for up to 2 days", "Full PRO diagnostics"],
      button: "Choose subscription",
    },
    "Mensual de pago único": {
      title: "One-time monthly license",
      meta: "One-time payment · 1 calendar month · No automatic renewal · 1 device",
      bullets: ["App only, no course", "1 device", "No automatic renewal", "Offline use for up to 2 days", "Full PRO diagnostics"],
      button: "Choose one-time payment",
    },
    Profesional: {
      title: "Professional",
      meta: "One-time payment · 6 months · 2 devices · PRO App + Course",
      bullets: ["Full PRO App", "Permanent access to the course", "Offline use for up to 2 days", "For recurring professional use"],
      button: "Choose Professional",
      badge: "Best value",
    },
    Empresarial: {
      title: "Business",
      meta: "One-time payment · 6 months · 10 devices · PRO App + Course",
      bullets: ["Full PRO App", "Permanent access to the course", "Offline use for up to 7 days", "For maintenance and automation teams"],
      button: "Choose Business",
    },
  },
  audience: [
    { icon: "Wrench", text: "Industrial maintenance technicians" },
    { icon: "Gauge", text: "Instrumentation and electrical professionals" },
    { icon: "Cpu", text: "Automation specialists and PLC programmers" },
    { icon: "Factory", text: "Companies operating Siemens S7-300/400 systems" },
    { icon: "GraduationCap", text: "Technical training centers" },
  ],
  faq: [
    { question: "Does the app connect directly to the PLC?", answer: "No. It works with the CPU state, LEDs, symptoms, network conditions and field evidence entered by the user." },
    { question: "Does it replace STEP 7 or a qualified technician?", answer: "No. BOJ S7-PLC organizes the first diagnostic response. STEP 7 and qualified technical judgment remain essential when deeper online analysis is required." },
    { question: "Can I use it without installing software?", answer: "Yes. It runs in a modern web browser and can also be installed as a web app on compatible devices." },
    { question: "Which plans include the course?", answer: "Professional and Business include permanent access to the S7-300/400 diagnostics course. Monthly plans include the PRO App only." },
    { question: "How does offline access work?", answer: "Offline availability depends on the selected plan: up to 2 days for monthly and Professional licenses, and up to 7 days for Business." },
    { question: "Is there an option for institutions?", answer: "Yes. Companies, institutions and training centers can request tailored conditions for multiple users or training programs." },
  ],
};

export const englishS7Course = {
  includes: [
    "Permanent access to the S7-300/400 industrial diagnostics course",
    "Professional technical manual with a field-oriented method",
    "One month of BOJ S7-PLC PRO for one device",
    "Applied cases involving CPU states, SF/BF, PROFIBUS, modules and signals",
  ],
  audience: [
    "Industrial maintenance technicians",
    "Electrical and instrumentation professionals",
    "Automation specialists and PLC programmers",
    "Engineers working with Siemens S7-300/400 systems",
  ],
  outcomes: [
    "Build a repeatable sequence for troubleshooting PLC-related faults.",
    "Use STEP 7 Classic, Diagnostic Buffer and HW Config Online with a clear purpose.",
    "Separate logic, network, module, wiring, power and process-related causes.",
    "Reduce unnecessary component changes and trial-and-error interventions.",
  ],
  modules: [
    "The BOJ field diagnostics method",
    "CPU operating states and diagnostic LEDs",
    "STEP 7 Classic and SIMATIC Manager workflow",
    "Diagnostic Buffer and online hardware diagnostics",
    "PROFIBUS faults and distributed I/O",
    "Digital and analog signal verification",
    "Intermittent faults and misleading symptoms",
    "Applied cases and intervention criteria",
  ],
  faq: [
    { question: "Is the course delivered online?", answer: "Yes. It provides permanent online access to the course material after purchase confirmation." },
    { question: "Is it suitable for beginners?", answer: "It is designed for people with a basic electrical, maintenance or automation background who want a structured diagnostic method." },
    { question: "Which Siemens systems does it cover?", answer: "The main focus is Siemens S7-300/400 with STEP 7 Classic, including CPU states, hardware, PROFIBUS, modules and field signals." },
    { question: "What is included with the PRO App?", answer: "The offer includes one month of BOJ S7-PLC PRO for one device, with no automatic renewal." },
    { question: "How long is the refund period?", answer: "The purchase is processed by Hotmart and includes a 7-day refund guarantee under Hotmart's applicable process and conditions." },
  ],
};

export const englishTiaCourse = {
  title: "Upcoming: introduction to TIA Portal with Siemens S7-1200/1500 PLCs",
  subtitle: "This future introductory course is in preparation. Enrollment is not open yet.",
  audience: [
    "Technicians starting with TIA Portal",
    "Technical students",
    "Programmers moving from STEP 7 Classic",
    "Maintenance personnel",
    "Industrial electricians",
  ],
  modules: [
    "Introduction to TIA Portal",
    "Siemens S7-1200 and S7-1500 families",
    "Project creation",
    "Hardware configuration",
    "PLC tags",
    "Basic LAD programming",
    "Timers and counters",
    "OB, FC, FB and DB blocks",
    "Downloading to the PLC",
    "Online monitoring",
    "Basic diagnostics",
    "Introduction to HMI",
  ],
  learnItems: [
    "Create a project from scratch with S7-1200/1500 hardware and a clear basic structure.",
    "Organize tags, blocks and LAD logic so the project remains maintainable.",
    "Download to the PLC, monitor online and understand initial diagnostics.",
    "Connect programming decisions with real maintenance and commissioning needs.",
  ],
  benefits: [
    "Understand the structure of TIA Portal.",
    "Program from scratch with an orderly approach.",
    "Download and monitor online without improvising.",
    "Prepare for real projects with modern PLCs.",
    "Build more maintainable projects from the first version.",
  ],
  outcomes: [
    "Create a project from scratch and configure S7-1200/1500 hardware.",
    "Program basic LAD logic with tags, timers, counters and blocks.",
    "Download, monitor online and perform an initial diagnosis.",
    "Prepare for real projects with a structured foundation.",
  ],
  avoidMistakes: [
    "Creating tags without a naming convention.",
    "Programming everything in one block without structure.",
    "Downloading to the PLC without checking hardware or communication.",
    "Confusing online monitoring with a complete diagnosis.",
    "Advancing a project without documenting signals or architecture.",
  ],
  difference: [
    "It introduces TIA Portal through technical order, not screen memorization.",
    "It connects hardware, tags, blocks and monitoring with real plant situations.",
    "It builds a solid foundation for programming, diagnostics and clearer maintenance communication.",
  ],
};

export const englishProjects = [
  {
    sourceIndex: 0,
    title: "BT40 engineering, field wiring and commissioning",
    sector: "Energy / Power generation",
    role: "Engineering and commissioning",
    technologies: ["Detail engineering", "Power and control panels", "Field wiring", "Commissioning", "SAT"],
    description: "Detail engineering, control and power panels, field wiring, signal validation and SAT activities for a 42 MW generator project.",
    problem: "A high-criticality system required coordinated electrical integration, documentation and testing before operation.",
    intervention: "Engineering, field wiring, signal checks and commissioning were coordinated with plant conditions.",
    result: "A traceable start-up process with structured testing and clearer support for operation and maintenance.",
  },
  {
    sourceIndex: 1,
    title: "Fire protection system with Siemens S7-1500",
    sector: "Industry / Auxiliary systems",
    role: "Programming and commissioning",
    technologies: ["Siemens S7-1500", "TIA Portal", "HMI", "Field signals", "Functional testing", "Commissioning"],
    description: "PLC programming and commissioning with signal verification, sequence testing and response validation.",
    problem: "A safety-related plant system required reliable logic and clear functional verification.",
    intervention: "Control sequences, inputs, outputs and operating responses were tested on site.",
    result: "The automated system was delivered with validated behavior and maintainable operating criteria.",
  },
  {
    sourceIndex: 5,
    title: "Migration from Siemens S5-95U to S7-1500",
    sector: "Oil and gas / Utilities",
    role: "PLC migration and commissioning",
    technologies: ["Siemens S5-95U", "Siemens S7-1500", "PLC migration", "Signal survey", "TIA Portal", "Commissioning"],
    description: "Modernization of a water plant control platform while protecting operational continuity.",
    problem: "The legacy platform created risks related to obsolescence, spare parts and technical support.",
    intervention: "Hardware and signals were surveyed, logic was migrated and the new architecture was validated during start-up.",
    result: "The plant moved to a maintainable platform with better support and diagnostic capability.",
  },
];

export const portugueseHome = {
  navigator: [
    {
      icon: "TriangleAlert",
      title: "Serviços industriais",
      text: "Diagnóstico e suporte técnico para restabelecer a operação.",
      href: "/pt/servicos",
    },
    {
      icon: "GraduationCap",
      title: "Capacitação técnica",
      text: "Formação aplicada com base em problemas industriais reais.",
      href: "/pt/cursos",
    },
    {
      icon: "MonitorCog",
      title: "Testar o App BOJ S7-PLC",
      text: "Um guia digital para sintomas e hipóteses técnicas.",
      href: "/pt/app",
    },
  ],
  problems: [
    { icon: "Cpu", text: "CPU em STOP sem uma causa clara" },
    { icon: "Network", text: "Falhas de comunicação PROFIBUS ou PROFINET" },
    { icon: "CircuitBoard", text: "Módulos ou sinais de E/S com comportamento inconsistente" },
    { icon: "MonitorCog", text: "Problemas de integração com IHM, SCADA ou acionamentos" },
    { icon: "RefreshCcw", text: "Migração e modernização de PLCs antigos" },
    { icon: "Clock", text: "Pressão de produção e pouco tempo para diagnosticar" },
  ],
  specialties: [
    { icon: "Cpu", title: "PLC Siemens", text: "Sistemas S5, S7-200, S7-300/400 e S7-1200/1500." },
    { icon: "Network", title: "Redes industriais", text: "Diagnóstico de PROFIBUS, PROFINET e comunicações." },
    { icon: "MonitorCog", title: "IHM e SCADA", text: "Interfaces de operação, alarmes, tendências e supervisão de processos." },
    { icon: "Settings", title: "Comissionamento", text: "Sinais de campo, testes funcionais e partida controlada." },
  ],
};

export const portugueseServices = {
  workflow: [
    { icon: "FileSearch", title: "Entender o sintoma", text: "Reunir alarmes, condições de operação e evidências disponíveis em campo." },
    { icon: "ClipboardCheck", title: "Priorizar a causa", text: "Separar possibilidades relacionadas ao PLC, à rede, ao hardware, aos sinais e ao processo." },
    { icon: "Wrench", title: "Definir a intervenção", text: "Estabelecer escopo, controles de risco e a próxima ação técnica." },
  ],
  areas: [
    { icon: "TriangleAlert", title: "Uma máquina ou processo parou", text: "Isolamento de falhas sob pressão de produção." },
    { icon: "Cpu", title: "Um PLC ou uma IHM precisa de alterações", text: "Programação, diagnóstico online e modificações controladas." },
    { icon: "Network", title: "A rede industrial está instável", text: "Análise de nós, conectores, terminações e comunicação." },
    { icon: "RefreshCcw", title: "Um sistema antigo precisa ser modernizado", text: "Planejamento da migração, levantamento de sinais, testes e comissionamento." },
  ],
  primary: [
    {
      icon: "ScanSearch",
      title: "Diagnóstico de falhas industriais",
      description: "Análise técnica baseada em sintomas observáveis e evidências de campo.",
      applications: ["CPU em STOP, SF ou BF", "Falhas intermitentes", "Módulos e E/S", "Paradas de máquinas e processos"],
      result: "Uma hipótese técnica priorizada e um caminho de verificação mais seguro.",
      when: "Quando a tentativa e erro consome tempo ou aumenta o risco operacional.",
    },
    {
      icon: "Cpu",
      title: "Engenharia de PLC, IHM e SCADA",
      description: "Programação, alterações, integração e comissionamento de sistemas de controle industrial.",
      applications: ["Programação de PLC Siemens", "Telas de IHM e SCADA", "Melhorias de alarmes e sequências", "Testes funcionais"],
      result: "Uma solução documentada e alinhada às necessidades de operação e manutenção.",
      when: "Quando um sistema existente precisa de correção, expansão ou uma nova estratégia de controle.",
    },
    {
      icon: "Network",
      title: "Redes industriais",
      description: "Diagnóstico e integração de PROFIBUS, PROFINET e dispositivos de campo conectados.",
      applications: ["Revisão de nós e topologia", "Conectores e terminações", "Comunicação PLC-IHM-acionamento", "Diagnóstico online da rede"],
      result: "Maior estabilidade de comunicação e evidências mais claras para a manutenção.",
      when: "Quando falhas de comunicação aparecem de forma intermitente ou interrompem parte do processo.",
    },
    {
      icon: "RefreshCcw",
      title: "Migração e modernização de PLCs",
      description: "Transição controlada de plataformas antigas para arquiteturas Siemens sustentáveis.",
      applications: ["Migrações de S5 para S7", "Levantamento de hardware e sinais", "Conversão de lógica", "SAT e partida de produção"],
      result: "Um sistema modernizado, com melhor suporte e capacidade de diagnóstico.",
      when: "Quando obsolescência, peças de reposição ou suporte de software ameaçam a continuidade.",
    },
  ],
  field: [
    { icon: "Factory", title: "Ambientes reais de produção", text: "Experiência em energia, petróleo e gás, alimentos, manufatura e sistemas auxiliares." },
    { icon: "ShieldCheck", title: "Intervenção controlada", text: "Decisões técnicas adaptadas ao risco operacional e às condições da planta." },
    { icon: "ClipboardCheck", title: "Trabalho rastreável", text: "Escopo, testes e resultados técnicos documentados para operação e manutenção." },
  ],
  secondary: [
    {
      icon: "Gauge",
      title: "Instrumentação e sinais de campo",
      text: "Verificação e diagnóstico de sinais analógicos, digitais e de processo.",
      applications: ["Sensores e transmissores", "Malhas de sinal", "Escalonamento e calibração", "Verificação de entradas e saídas do PLC"],
    },
    {
      icon: "CircuitBoard",
      title: "Elétrica industrial e painéis",
      text: "Suporte técnico para painéis de controle, cabeamento de campo e confiabilidade operacional.",
      applications: ["Circuitos de comando", "Cabeamento de campo", "Modificações em painéis", "Localização de falhas elétricas"],
    },
    {
      icon: "GraduationCap",
      title: "Capacitação técnica industrial",
      text: "Formação aplicada para equipes de manutenção e automação.",
      applications: ["Diagnóstico de PLC Siemens", "Redes industriais", "Método de diagnóstico em campo", "Programas adaptados à equipe"],
    },
  ],
};

export const portugueseCourses = {
  benefits: [
    { icon: "FileSearch", title: "Diagnosticar com método", text: "Passe dos sintomas às evidências sem depender de suposições." },
    { icon: "Cpu", title: "Entender sistemas Siemens", text: "Relacione estados da CPU, hardware, redes e sinais de campo." },
    { icon: "Wrench", title: "Aplicar em campo", text: "Use critérios práticos em situações reais de manutenção." },
  ],
  learning: [
    { icon: "ClipboardCheck", text: "Organizar um diagnóstico antes de trocar componentes." },
    { icon: "Network", text: "Interpretar evidências da CPU, PROFIBUS, módulos e sinais." },
    { icon: "ShieldCheck", text: "Intervir com critérios técnicos e de segurança mais claros." },
    { icon: "Factory", text: "Transferir o método para sistemas industriais reais." },
  ],
};

export const portugueseApp = {
  problems: [
    { icon: "Cpu", title: "CPU em STOP", text: "Uma CPU parada sem causa imediatamente visível." },
    { icon: "Zap", title: "SF ou BF ativo", text: "Alarmes de sistema ou comunicação que exigem verificações estruturadas." },
    { icon: "Network", title: "Falhas PROFIBUS", text: "Perda de comunicação, nós ausentes ou comportamento instável." },
    { icon: "CircuitBoard", title: "Módulos e sinais", text: "Módulos sem resposta, falhas de E/S ou sinais de campo inconsistentes." },
    { icon: "RefreshCcw", title: "Falhas intermitentes", text: "Problemas que aparecem e desaparecem antes da confirmação da causa." },
    { icon: "Clock", title: "Pressão de produção", text: "Uma primeira resposta mais clara quando o tempo de diagnóstico é limitado." },
  ],
  steps: [
    { icon: "ClipboardCheck", title: "Informe o sintoma", text: "Registre o que você observa no PLC e em campo." },
    { icon: "Brain", title: "Revise as hipóteses priorizadas", text: "O app organiza as possíveis causas de acordo com as evidências." },
    { icon: "CheckCircle2", title: "Verifique em campo", text: "Siga verificações práticas para confirmar ou descartar cada causa." },
  ],
  includes: [
    { icon: "FileSearch", title: "Diagnóstico por LEDs e sintomas", text: "Interprete estados comuns de operação e sintomas de falha." },
    { icon: "ClipboardCheck", title: "Hipóteses técnicas priorizadas", text: "Hipóteses priorizadas conforme às evidências disponíveis e ao seu peso relativo." },
    { icon: "ShieldCheck", title: "Verificação passo a passo", text: "Verificações claras para realizar com segurança em campo." },
    { icon: "Cpu", title: "Foco em S7-300/400", text: "Orientação técnica para CPUs e módulos Siemens clássicos." },
    { icon: "MonitorCog", title: "Interface web instalável", text: "Acesso pelo navegador e instalação em dispositivos compatíveis." },
    { icon: "Settings", title: "Suporte para equipes", text: "Um método compartilhado que reduz improvisações durante o diagnóstico." },
  ],
  views: [
    { title: "Diagnóstico guiado por etapas", text: "Um subfluxo guiado para módulos, interfaces, racks e comunicação." },
  ],
  planCopy: {
    "Prueba gratuita": {
      title: "Teste gratuito",
      price: "Gratuito",
      meta: "48 horas · Online · Recursos limitados",
      bullets: ["Acesso gratuito por 48 horas", "Uso somente online", "Alguns recursos são limitados", "Uma forma prática de conhecer o fluxo de trabalho"],
      button: "Iniciar teste gratuito",
    },
    "Suscripción mensual": {
      title: "Assinatura mensal",
      meta: "Por mês · Renovação automática até o cancelamento · 1 dispositivo",
      bullets: ["Somente o app, sem curso", "1 dispositivo", "Renovação automática até o cancelamento", "Uso offline por até 2 dias", "Diagnóstico PRO completo"],
      button: "Escolher assinatura",
    },
    "Mensual de pago único": {
      title: "Licença mensal de pagamento único",
      meta: "Pagamento único · 1 mês-calendário · Sem renovação automática · 1 dispositivo",
      bullets: ["Somente o app, sem curso", "1 dispositivo", "Sem renovação automática", "Uso offline por até 2 dias", "Diagnóstico PRO completo"],
      button: "Escolher pagamento único",
    },
    Profesional: {
      title: "Profissional",
      meta: "Pagamento único · 6 meses · 2 dispositivos · App PRO + Curso",
      bullets: ["App PRO completo", "Acesso permanente ao curso", "Uso offline por até 2 dias", "Para uso profissional recorrente"],
      button: "Escolher Profissional",
      badge: "Melhor custo-benefício",
    },
    Empresarial: {
      title: "Empresarial",
      meta: "Pagamento único · 6 meses · 10 dispositivos · App PRO + Curso",
      bullets: ["App PRO completo", "Acesso permanente ao curso", "Uso offline por até 7 dias", "Para equipes de manutenção e automação"],
      button: "Escolher Empresarial",
    },
  },
  audience: [
    { icon: "Wrench", text: "Técnicos de manutenção industrial" },
    { icon: "Gauge", text: "Profissionais de instrumentação e elétrica" },
    { icon: "Cpu", text: "Especialistas em automação e programadores de PLC" },
    { icon: "Factory", text: "Empresas que operam sistemas Siemens S7-300/400" },
    { icon: "GraduationCap", text: "Centros de formação técnica" },
  ],
  faq: [
    { question: "O app se conecta diretamente ao PLC?", answer: "Não. Ele trabalha com o estado da CPU, LEDs, sintomas, condições da rede e evidências de campo informadas pelo usuário." },
    { question: "Ele substitui o STEP 7 ou um técnico qualificado?", answer: "Não. O BOJ S7-PLC organiza a primeira resposta de diagnóstico. O STEP 7 e o critério técnico qualificado continuam essenciais quando é necessária uma análise online mais profunda." },
    { question: "Posso usar sem instalar software?", answer: "Sim. Ele funciona em um navegador moderno e também pode ser instalado como aplicativo web em dispositivos compatíveis." },
    { question: "Quais planos incluem o curso?", answer: "Profissional e Empresarial incluem acesso permanente ao curso de diagnóstico S7-300/400. Os planos mensais incluem somente o App PRO." },
    { question: "Como funciona o acesso offline?", answer: "A disponibilidade offline depende do plano: até 2 dias para licenças mensais e Profissional, e até 7 dias para Empresarial." },
    { question: "Há uma opção para instituições?", answer: "Sim. Empresas, instituições e centros de formação podem solicitar condições personalizadas para vários usuários ou programas de capacitação." },
  ],
};

export const portugueseS7Course = {
  includes: [
    "Acesso permanente ao curso de diagnóstico industrial S7-300/400",
    "Manual técnico profissional com método orientado ao campo",
    "Um mês de BOJ S7-PLC PRO para um dispositivo",
    "Casos aplicados com estados da CPU, SF/BF, PROFIBUS, módulos e sinais",
  ],
  audience: [
    "Técnicos de manutenção industrial",
    "Profissionais de elétrica e instrumentação",
    "Especialistas em automação e programadores de PLC",
    "Engenheiros que trabalham com sistemas Siemens S7-300/400",
  ],
  outcomes: [
    "Construir uma sequência repetível para diagnosticar falhas relacionadas ao PLC.",
    "Usar STEP 7 Classic, Diagnostic Buffer e HW Config Online com um objetivo claro.",
    "Separar causas ligadas à lógica, rede, módulos, cabeamento, alimentação e processo.",
    "Reduzir trocas desnecessárias de componentes e intervenções por tentativa e erro.",
  ],
  modules: [
    "Método BOJ de diagnóstico em campo",
    "Estados de operação da CPU e LEDs de diagnóstico",
    "Fluxo de trabalho com STEP 7 Classic e SIMATIC Manager",
    "Diagnostic Buffer e diagnóstico online de hardware",
    "Falhas PROFIBUS e E/S distribuídas",
    "Verificação de sinais digitais e analógicos",
    "Falhas intermitentes e sintomas enganosos",
    "Casos aplicados e critérios de intervenção",
  ],
  faq: [
    { question: "O curso é oferecido online?", answer: "Sim. Após a confirmação da compra, você recebe acesso online permanente ao material do curso, que está disponível em espanhol." },
    { question: "É adequado para iniciantes?", answer: "Foi desenvolvido para pessoas com conhecimentos básicos de elétrica, manutenção ou automação que buscam um método estruturado de diagnóstico." },
    { question: "Quais sistemas Siemens são abordados?", answer: "O foco principal é Siemens S7-300/400 com STEP 7 Classic, incluindo estados da CPU, hardware, PROFIBUS, módulos e sinais de campo." },
    { question: "O que está incluído no App PRO?", answer: "A oferta inclui um mês de BOJ S7-PLC PRO para um dispositivo, sem renovação automática." },
    { question: "Qual é o prazo para solicitar reembolso?", answer: "A compra é processada pela Hotmart e inclui garantia de reembolso de 7 dias, conforme o processo e as condições aplicáveis da Hotmart." },
  ],
};

export const portugueseTiaCourse = {
  title: "Em preparação: introdução ao TIA Portal com PLC Siemens S7-1200/1500",
  subtitle: "Este futuro curso introdutório está em preparação. As inscrições ainda não estão abertas.",
  audience: [
    "Técnicos que estão começando no TIA Portal",
    "Estudantes de áreas técnicas",
    "Programadores que vêm do STEP 7 Classic",
    "Profissionais de manutenção",
    "Eletricistas industriais",
  ],
  modules: [
    "Introdução ao TIA Portal",
    "Famílias Siemens S7-1200 e S7-1500",
    "Criação de projeto",
    "Configuração de hardware",
    "Variáveis do PLC",
    "Programação LAD básica",
    "Temporizadores e contadores",
    "Blocos OB, FC, FB e DB",
    "Carga no PLC",
    "Monitoramento online",
    "Diagnóstico básico",
    "Introdução à IHM",
  ],
  learnItems: [
    "Criar um projeto do zero com hardware S7-1200/1500 e uma estrutura básica clara.",
    "Organizar variáveis, blocos e lógica LAD para manter o projeto sustentável.",
    "Carregar no PLC, monitorar online e compreender diagnósticos iniciais.",
    "Relacionar a programação com necessidades reais de manutenção e comissionamento.",
  ],
  benefits: [
    "Compreender a estrutura do TIA Portal.",
    "Programar do zero com organização.",
    "Carregar e monitorar online sem improvisar.",
    "Preparar-se para projetos reais com PLCs modernos.",
    "Construir projetos mais sustentáveis desde a primeira versão.",
  ],
  outcomes: [
    "Criar um projeto do zero e configurar hardware S7-1200/1500.",
    "Programar lógica LAD básica com variáveis, temporizadores, contadores e blocos.",
    "Carregar, monitorar online e realizar um diagnóstico inicial.",
    "Preparar-se para projetos reais com uma base organizada.",
  ],
  avoidMistakes: [
    "Criar variáveis sem um critério de nomes.",
    "Programar tudo em um único bloco sem estrutura.",
    "Carregar no PLC sem revisar hardware ou comunicação.",
    "Confundir monitoramento online com diagnóstico completo.",
    "Avançar no projeto sem documentar sinais ou arquitetura.",
  ],
  difference: [
    "Apresenta o TIA Portal com organização técnica, sem depender da memorização de telas.",
    "Relaciona hardware, variáveis, blocos e monitoramento com situações reais de planta.",
    "Constrói uma base sólida para programar, diagnosticar e comunicar-se melhor com a manutenção.",
  ],
};

export const portugueseProjects = [
  {
    sourceIndex: 0,
    title: "Engenharia, cabeamento de campo e comissionamento BT40",
    sector: "Energia / Geração",
    role: "Engenharia e comissionamento",
    technologies: ["Engenharia detalhada", "Painéis de potência e controle", "Cabeamento de campo", "Comissionamento", "SAT"],
    description: "Engenharia detalhada, painéis de controle e potência, cabeamento de campo, validação de sinais e atividades de SAT para um projeto de geração de 42 MW.",
    problem: "Um sistema de alta criticidade exigia integração elétrica coordenada, documentação e testes antes da operação.",
    intervention: "A engenharia, o cabeamento de campo, a verificação de sinais e o comissionamento foram coordenados com as condições da planta.",
    result: "Um processo de partida rastreável, com testes estruturados e melhor suporte para operação e manutenção.",
  },
  {
    sourceIndex: 1,
    title: "Sistema de proteção contra incêndio com Siemens S7-1500",
    sector: "Indústria / Sistemas auxiliares",
    role: "Programação e comissionamento",
    technologies: ["Siemens S7-1500", "TIA Portal", "IHM", "Sinais de campo", "Testes funcionais", "Comissionamento"],
    description: "Programação do PLC e comissionamento com verificação de sinais, testes de sequências e validação de respostas.",
    problem: "Um sistema de segurança da planta exigia lógica confiável e verificação funcional clara.",
    intervention: "Sequências de controle, entradas, saídas e respostas operacionais foram testadas em campo.",
    result: "O sistema automatizado foi entregue com comportamento validado e critérios operacionais sustentáveis.",
  },
  {
    sourceIndex: 5,
    title: "Migração de Siemens S5-95U para S7-1500",
    sector: "Petróleo e gás / Utilidades",
    role: "Migração de PLC e comissionamento",
    technologies: ["Siemens S5-95U", "Siemens S7-1500", "Migração de PLC", "Levantamento de sinais", "TIA Portal", "Comissionamento"],
    description: "Modernização da plataforma de controle de uma planta de água, preservando a continuidade operacional.",
    problem: "A plataforma antiga gerava riscos relacionados à obsolescência, peças de reposição e suporte técnico.",
    intervention: "Hardware e sinais foram levantados, a lógica foi migrada e a nova arquitetura foi validada durante a partida.",
    result: "A planta passou para uma plataforma sustentável, com melhor suporte e capacidade de diagnóstico.",
  },
];
