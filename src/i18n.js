export const languageRoutePairs = [
  { es: "/", en: "/en" },
  { es: "/inicio", en: "/en" },
  { es: "/servicios", en: "/en/services" },
  { es: "/cursos", en: "/en/courses" },
  { es: "/cursos/s7-300-400", en: "/en/courses/s7-300-400" },
  { es: "/cursos/tia-portal", en: "/en/courses/tia-portal" },
  { es: "/app", en: "/en/app" },
  { es: "/obras", en: "/en/projects" },
  { es: "/contacto", en: "/en/contact" },
];

export const englishNavItems = [
  { label: "Home", path: "/en" },
  { label: "Services", path: "/en/services" },
  {
    label: "Training",
    path: "/en/courses",
    children: [
      { label: "S7-300/400 diagnostics", path: "/en/courses/s7-300-400" },
      { label: "TIA Portal S7-1200/1500", path: "/en/courses/tia-portal" },
    ],
  },
  { label: "App", path: "/en/app" },
  { label: "Projects", path: "/en/projects" },
  { label: "Contact", path: "/en/contact" },
];

export const englishHome = {
  navigator: [
    {
      icon: "TriangleAlert",
      title: "Solve a plant fault",
      text: "Diagnostics and technical support to restore operation.",
      href: "/en/services",
    },
    {
      icon: "GraduationCap",
      title: "Train your team",
      text: "Applied training based on real industrial problems.",
      href: "/en/courses",
    },
    {
      icon: "MonitorCog",
      title: "Try BOJ S7-PLC",
      text: "A digital guide for symptoms and technical hypotheses.",
      href: "/en/app",
    },
  ],
  workLines: [
    {
      icon: "ScanSearch",
      title: "Industrial diagnostics",
      text: "Structured troubleshooting for PLCs, HMIs, networks, signals and field equipment.",
      cta: "View services",
      href: "/en/services",
    },
    {
      icon: "GraduationCap",
      title: "Technical training",
      text: "Practical Siemens PLC training for maintenance technicians and engineering teams.",
      cta: "View training",
      href: "/en/courses",
    },
    {
      icon: "Smartphone",
      title: "BOJ S7-PLC app",
      text: "Guided first-line diagnostics for Siemens S7-300/400 systems.",
      cta: "Explore the app",
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
    { icon: "ClipboardCheck", title: "Prioritized technical hypotheses", text: "Possible causes arranged by relevance and evidence." },
    { icon: "ShieldCheck", title: "Step-by-step verification", text: "Clear checks to perform safely in the field." },
    { icon: "Cpu", title: "Focused on S7-300/400", text: "Technical guidance for classic Siemens CPUs and modules." },
    { icon: "MonitorCog", title: "Installable web interface", text: "Browser access with installation on compatible devices." },
    { icon: "Settings", title: "Support for teams", text: "A shared method that reduces improvisation during diagnostics." },
  ],
  views: [
    { title: "Main diagnostics panel", text: "Symptoms, LEDs and active results in a single working view." },
    { title: "Guided result and suggested actions", text: "Main hypothesis, supporting evidence and recommended checks." },
    { title: "Diagnostics by stages", text: "Guided subflows for modules, interfaces, racks and communication." },
    { title: "Prioritized technical hypotheses", text: "Possible causes ordered by the evidence entered by the user." },
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
      meta: "One-time payment · 1 month · No automatic renewal · 1 device",
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
