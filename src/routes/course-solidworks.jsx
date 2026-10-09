import {
  ArrowRight,
  BookOpenText,
  CheckCircle2,
  CircleHelp,
  Clock,
  Cuboid,
  Download,
  DraftingCompass,
  FileText,
  FolderOpen,
  GraduationCap,
  Languages,
  Layers3,
  Mail,
  PencilRuler,
  ShieldCheck,
  ShoppingCart,
  XCircle,
} from "lucide-react";

import DeferredManualFlipbook from "../components/DeferredManualFlipbook.jsx";
import { contact } from "../content.js";
import courseCover from "../assets/solidworks-manual-preview/cover.webp";
import manualAssemblies from "../assets/solidworks-manual-preview/assemblies.webp";
import manualGuidedPractice from "../assets/solidworks-manual-preview/guided-practice.webp";
import manualObjectives from "../assets/solidworks-manual-preview/objectives.webp";
import manualTechnicalDrawings from "../assets/solidworks-manual-preview/technical-drawings.webp";

const manualPreviewImages = [manualObjectives, manualGuidedPractice, manualAssemblies, manualTechnicalDrawings];

const modulesByLanguage = {
  es: [
    {
      title: "Introducción a SolidWorks",
      summary: "Conoce la interfaz, los documentos y las decisiones iniciales antes de crear una pieza.",
      topics: ["Diseño CAD y tipos de documentos", "Interfaz y configuración de unidades", "Creación de archivos de pieza", "Manipulación del entorno 3D y reconstrucción", "Buenas prácticas de trabajo"],
    },
    {
      title: "Bocetos y definición geométrica",
      summary: "Aprende a dibujar, relacionar y acotar bocetos para controlar su geometría.",
      topics: ["Inicio de bocetos y entidades básicas", "Relaciones geométricas", "Cota inteligente", "Grados de libertad y estado del boceto", "Herramientas adicionales y buenas prácticas"],
    },
    {
      title: "Operaciones básicas y modelo 3D",
      summary: "Transforma bocetos en piezas y comprende cómo se encadenan las operaciones.",
      topics: ["Extrusiones, cortes y revoluciones", "Asistente para taladro", "Redondeos, chaflanes y vaciados", "Planos y ejes de referencia", "Simetrías y patrones lineales o circulares", "Materiales, medición y propiedades de masa"],
    },
    {
      title: "Edición y resolución de errores",
      summary: "Modifica modelos sin perder de vista sus dependencias y aprende a interpretar advertencias.",
      topics: ["Edición de bocetos y operaciones", "Árbol de operaciones y dependencias", "Supresión, activación y reordenamiento", "Errores y advertencias del modelo", "Referencias robustas e intención de diseño"],
    },
    {
      title: "Ensamblajes básicos",
      summary: "Reúne componentes y controla su posición y movimiento.",
      topics: ["Creación e inserción de componentes", "Componentes fijos, flotantes y grados de libertad", "Relaciones de posición", "Detección de interferencias", "Vistas explosionadas", "Referencias de archivos y Pack and Go"],
    },
    {
      title: "Planos y documentación técnica",
      summary: "Comunica una pieza o ensamblaje mediante vistas, cotas y datos técnicos.",
      topics: ["Plantillas, formato de hoja y cajetín", "Proyecciones, vistas, secciones y detalles", "Escalas, cotas y tolerancias básicas", "Planos de ensamblaje, lista de materiales y globos", "Guardado, exportación y entrega de archivos"],
    },
  ],
  en: [
    { title: "Introduction to SolidWorks", summary: "Explore the interface, document types and first decisions before creating a part.", topics: ["CAD design and document types", "Interface and unit setup", "Creating part files", "3D navigation and rebuilding", "Good working practices"] },
    { title: "Sketches and geometric definition", summary: "Draw, constrain and dimension sketches to control their geometry.", topics: ["Starting sketches and basic entities", "Geometric relations", "Smart Dimension", "Degrees of freedom and sketch status", "Additional tools and good practices"] },
    { title: "Basic features and 3D modeling", summary: "Turn sketches into parts and understand how features are connected.", topics: ["Extrudes, cuts and revolves", "Hole Wizard", "Fillets, chamfers and shells", "Reference planes and axes", "Mirrors, linear and circular patterns", "Materials, measurements and mass properties"] },
    { title: "Editing and troubleshooting", summary: "Modify models while tracking dependencies and interpreting warnings.", topics: ["Editing sketches and features", "Feature tree and dependencies", "Suppressing, restoring and reordering", "Model errors and warnings", "Robust references and design intent"] },
    { title: "Basic assemblies", summary: "Bring components together and control their position and motion.", topics: ["Creating and inserting components", "Fixed and floating components; degrees of freedom", "Assembly mates", "Interference detection", "Exploded views", "File references and Pack and Go"] },
    { title: "Drawings and technical documentation", summary: "Communicate a part or assembly using views, dimensions and technical data.", topics: ["Templates, sheet formats and title blocks", "Projections, views, sections and details", "Scales, dimensions and basic tolerances", "Assembly drawings, bills of materials and balloons", "Saving, exporting and delivering files"] },
  ],
  pt: [
    { title: "Introdução ao SolidWorks", summary: "Conheça a interface, os documentos e as primeiras decisões antes de criar uma peça.", topics: ["Projeto CAD e tipos de documento", "Interface e configuração de unidades", "Criação de arquivos de peça", "Navegação 3D e reconstrução", "Boas práticas de trabalho"] },
    { title: "Esboços e definição geométrica", summary: "Desenhe, relacione e dimensione esboços para controlar a geometria.", topics: ["Início de esboços e entidades básicas", "Relações geométricas", "Cota inteligente", "Graus de liberdade e estado do esboço", "Ferramentas adicionais e boas práticas"] },
    { title: "Recursos básicos e modelo 3D", summary: "Transforme esboços em peças e compreenda como os recursos se relacionam.", topics: ["Extrusões, cortes e revoluções", "Assistente de perfuração", "Arredondamentos, chanfros e cascas", "Planos e eixos de referência", "Espelhamentos e padrões lineares ou circulares", "Materiais, medição e propriedades de massa"] },
    { title: "Edição e resolução de erros", summary: "Modifique modelos acompanhando suas dependências e interpretando avisos.", topics: ["Edição de esboços e recursos", "Árvore de recursos e dependências", "Supressão, ativação e reordenação", "Erros e avisos do modelo", "Referências robustas e intenção de projeto"] },
    { title: "Montagens básicas", summary: "Reúna componentes e controle sua posição e movimento.", topics: ["Criação e inserção de componentes", "Componentes fixos e flutuantes; graus de liberdade", "Relações de posicionamento", "Detecção de interferências", "Vistas explodidas", "Referências de arquivos e Pack and Go"] },
    { title: "Desenhos e documentação técnica", summary: "Comunique uma peça ou montagem por meio de vistas, cotas e dados técnicos.", topics: ["Modelos, formato da folha e carimbo", "Projeções, vistas, cortes e detalhes", "Escalas, cotas e tolerâncias básicas", "Desenhos de montagem, listas de materiais e balões", "Salvamento, exportação e entrega de arquivos"] },
  ],
};

const copyByLanguage = {
  es: {
    eyebrow: "Manual CAD · Nivel principiante",
    title: "Diseño en SolidWorks: Nivel Principiante",
    productFormat: "Manual teórico-práctico + ejercicios y cuestionarios",
    lead: "Aprende desde cero a construir piezas, ensamblajes sencillos y planos técnicos con una secuencia clara, ejemplos reales de la interfaz y práctica descargable.",
    author: "Sabrina Daniela Chaile",
    authorRole: "Diseñadora Industrial · Autora del manual",
    heroFacts: ["222 páginas", "6 módulos", "Contenido en español"],
    materialAction: "Ver el material real",
    inquiryAction: "Consultar antes de comprar",
    inquirySubject: "Consulta sobre el manual de SolidWorks - nivel principiante",
    coverAlt: "Portada final del manual Diseño en SolidWorks: Nivel Principiante, de Sabrina Daniela Chaile",
    coverCaption: "Portada final del manual teórico-práctico.",
    statusEyebrow: "Estado del producto",
    statusTitle: "Material finalizado. Checkout de Hotmart en preparación.",
    statusText: "El manual, los ejercicios y los cuestionarios ya están terminados. La compra se habilitará aquí cuando esté conectado el enlace definitivo de Hotmart.",
    previewEyebrow: "Capturas reales del contenido",
    previewTitle: "Mira cómo está trabajado antes de decidir.",
    previewText: "No es una maqueta ni una imagen ilustrativa: estas páginas pertenecen al material terminado y muestran la progresión desde los fundamentos hasta la práctica, los ensamblajes y los planos.",
    previewAlt: "Vista previa real del manual de SolidWorks",
    previewPages: [{ label: "Objetivos del nivel" }, { label: "Práctica guiada paso a paso" }, { label: "Ensamblajes y relaciones de posición" }, { label: "Planos y documentación técnica" }],
    previewFacts: [
      { icon: "pages", label: "Extensión", value: "222 páginas" },
      { icon: "modules", label: "Recorrido", value: "6 módulos progresivos" },
      { icon: "language", label: "Idioma", value: "Español" },
      { icon: "version", label: "Versión utilizada", value: "SOLIDWORKS 2024 SP3.1" },
    ],
    offerEyebrow: "Qué recibes",
    offerTitle: "Un paquete de aprendizaje para estudiar y practicar a tu ritmo.",
    offerIntro: "El manual es el eje principal y se entrega acompañado por los archivos prácticos que utiliza durante el recorrido.",
    includes: [
      { title: "Manual completo en PDF", text: "222 páginas de teoría aplicada, procedimientos, ejemplos y criterios de trabajo." },
      { title: "Ejercicios y cuestionarios", text: "Carpeta Ejercicios_NivelPrincipiante con archivos separados para reforzar cada etapa." },
      { title: "Entrega mediante Hotmart", text: "Acceso digital después de la confirmación de la compra en la plataforma." },
      { title: "Soporte durante 30 días", text: "Consultas por correo electrónico, con respuesta dentro de 2 días hábiles." },
    ],
    priceLabel: "Precio del paquete",
    price: "USD 29",
    priceMeta: "Pago único · Entrega digital",
    purchasePending: "Compra en Hotmart · enlace próximamente",
    purchaseNote: "El botón de compra se activará cuando esté disponible el enlace definitivo.",
    supportLabel: "Soporte incluido:",
    refundNote: "Política de reembolso gestionada por Hotmart; las condiciones aplicables se mostrarán en el checkout.",
    notIncludedTitle: "Información importante antes de comprar",
    notIncluded: ["No incluye certificado.", "No incluye el software SolidWorks ni su licencia."],
    audienceEyebrow: "A quién está dirigido",
    audienceTitle: "Una base útil para distintos puntos de partida.",
    audiences: [
      { title: "Estudiantes y principiantes", text: "Para dar los primeros pasos en CAD y comprender la lógica del modelado 3D." },
      { title: "Técnicos y proyectistas", text: "Para representar piezas, realizar cambios sencillos y preparar documentación técnica." },
      { title: "Diseñadores y emprendedores", text: "Para desarrollar conceptos y piezas en 3D destinados a proyectos, fabricación o presentación." },
    ],
    audienceNote: "No se requiere experiencia previa en CAD. Ayuda contar con nociones básicas de dibujo técnico y manejo general de computadora.",
    programEyebrow: "Contenido del manual",
    programTitle: "Seis módulos, en un orden que construye criterio.",
    programIntro: "El material avanza desde el entorno de trabajo y los bocetos hasta el modelado, la edición, los ensamblajes y la documentación técnica.",
    moduleToggle: "Ver contenidos",
    outcomesEyebrow: "Qué podrás realizar",
    outcomesTitle: "Una base concreta para modelar y documentar proyectos simples.",
    outcomes: ["Crear y administrar archivos de SolidWorks.", "Construir bocetos definidos y piezas con operaciones básicas.", "Editar modelos y analizar errores iniciales.", "Armar ensamblajes sencillos.", "Preparar planos básicos y exportar archivos."],
    materialNote: "Los ejercicios prácticos y cuestionarios se entregan en la carpeta separada Ejercicios_NivelPrincipiante, tal como se indica dentro del manual.",
    closeEyebrow: "Material finalizado",
    closeTitle: "Todo preparado para empezar; falta habilitar la compra.",
    closeText: "Puedes revisar ahora el contenido y escribirnos si tienes una consulta. El enlace de Hotmart se incorporará en esta misma página.",
    allCourses: "Ver todos los cursos",
    allCoursesPath: "/cursos",
    independentNote: "Material independiente. SOLIDWORKS es una marca de sus respectivos titulares; este manual no está afiliado ni avalado por Dassault Systèmes o SOLIDWORKS Corporation.",
  },
  en: {
    eyebrow: "CAD manual · Beginner level",
    title: "SolidWorks Design: Beginner Level",
    productFormat: "Theory-and-practice manual + exercises and questionnaires",
    lead: "Learn from scratch how to build parts, simple assemblies and technical drawings through a clear sequence, real interface examples and downloadable practice material.",
    author: "Sabrina Daniela Chaile",
    authorRole: "Industrial Designer · Manual author",
    heroFacts: ["222 pages", "6 modules", "Content in Spanish"],
    materialAction: "See the real material",
    inquiryAction: "Ask before buying",
    inquirySubject: "Inquiry about the beginner SolidWorks manual",
    coverAlt: "Final cover of the Spanish manual SolidWorks Design: Beginner Level, by Sabrina Daniela Chaile",
    coverCaption: "Final cover of the theory-and-practice manual.",
    statusEyebrow: "Product status",
    statusTitle: "Material completed. Hotmart checkout is being prepared.",
    statusText: "The manual, exercises and questionnaires are finished. Purchasing will be enabled here when the final Hotmart link is connected.",
    previewEyebrow: "Real content previews",
    previewTitle: "See how the material is built before deciding.",
    previewText: "These are not mockups or illustrative images. They are real pages from the finished Spanish-language material, showing the progression from fundamentals to practice, assemblies and drawings.",
    previewAlt: "Real preview of the Spanish SolidWorks manual",
    previewPages: [{ label: "Level goals" }, { label: "Step-by-step guided practice" }, { label: "Assemblies and mates" }, { label: "Drawings and technical documentation" }],
    previewFacts: [
      { icon: "pages", label: "Length", value: "222 pages" },
      { icon: "modules", label: "Learning path", value: "6 progressive modules" },
      { icon: "language", label: "Material language", value: "Spanish" },
      { icon: "version", label: "Version used", value: "SOLIDWORKS 2024 SP3.1" },
    ],
    offerEyebrow: "What you receive",
    offerTitle: "A self-study package designed for learning and practice.",
    offerIntro: "The manual is the core resource and is delivered with the practical files used throughout the learning path.",
    includes: [
      { title: "Complete PDF manual", text: "222 pages of applied theory, procedures, examples and working criteria." },
      { title: "Exercises and questionnaires", text: "A separate Ejercicios_NivelPrincipiante folder to reinforce each stage." },
      { title: "Delivery through Hotmart", text: "Digital access after payment confirmation on the platform." },
      { title: "30 days of support", text: "Questions by email, with a reply within 2 business days." },
    ],
    priceLabel: "Package price",
    price: "USD 29",
    priceMeta: "One-time payment · Digital delivery",
    purchasePending: "Buy on Hotmart · link coming soon",
    purchaseNote: "The purchase button will be enabled when the final checkout link is available.",
    supportLabel: "Support included:",
    refundNote: "Refund policy managed through Hotmart; applicable terms will be shown at checkout.",
    notIncludedTitle: "Important information before buying",
    notIncluded: ["No certificate is included.", "SolidWorks software and its license are not included."],
    audienceEyebrow: "Who it is for",
    audienceTitle: "A useful foundation for different starting points.",
    audiences: [
      { title: "Students and CAD beginners", text: "For a first step into CAD and the logic of 3D modeling." },
      { title: "Technicians and drafters", text: "For representing parts, making simple changes and preparing technical documents." },
      { title: "Designers and entrepreneurs", text: "For developing 3D concepts and parts for projects, manufacturing or presentations." },
    ],
    audienceNote: "No previous CAD experience is required. Basic technical drawing and general computer skills are helpful.",
    programEyebrow: "Manual content",
    programTitle: "Six modules in a sequence designed to build sound practice.",
    programIntro: "The Spanish-language material progresses from the workspace and sketches to modeling, editing, assemblies and technical documentation.",
    moduleToggle: "View topics",
    outcomesEyebrow: "What you will be able to do",
    outcomesTitle: "A practical foundation for simple models and technical documents.",
    outcomes: ["Create and manage SolidWorks files.", "Build defined sketches and parts with basic features.", "Edit models and investigate introductory errors.", "Create simple assemblies.", "Prepare basic drawings and export files."],
    materialNote: "Practical exercises and questionnaires are delivered in the separate Ejercicios_NivelPrincipiante folder, as indicated in the manual.",
    closeEyebrow: "Completed material",
    closeTitle: "Everything is ready to begin; checkout activation is the remaining step.",
    closeText: "You can review the content now and contact us with questions. The Hotmart link will be added to this page.",
    allCourses: "View all courses",
    allCoursesPath: "/en/courses",
    independentNote: "Independent material. SOLIDWORKS is a trademark of its respective owners; this manual is not affiliated with or endorsed by Dassault Systèmes or SOLIDWORKS Corporation.",
  },
  pt: {
    eyebrow: "Manual CAD · Nível iniciante",
    title: "Design em SolidWorks: Nível Iniciante",
    productFormat: "Manual teórico-prático + exercícios e questionários",
    lead: "Aprenda desde o início a criar peças, montagens simples e desenhos técnicos com uma sequência clara, exemplos reais da interface e material prático para download.",
    author: "Sabrina Daniela Chaile",
    authorRole: "Designer Industrial · Autora do manual",
    heroFacts: ["222 páginas", "6 módulos", "Conteúdo em espanhol"],
    materialAction: "Ver o material real",
    inquiryAction: "Consultar antes de comprar",
    inquirySubject: "Consulta sobre o manual de SolidWorks - nível iniciante",
    coverAlt: "Capa final do manual em espanhol Design em SolidWorks: Nível Iniciante, de Sabrina Daniela Chaile",
    coverCaption: "Capa final do manual teórico-prático.",
    statusEyebrow: "Status do produto",
    statusTitle: "Material finalizado. Checkout da Hotmart em preparação.",
    statusText: "O manual, os exercícios e os questionários já estão concluídos. A compra será habilitada aqui quando o link definitivo da Hotmart estiver conectado.",
    previewEyebrow: "Prévia real do conteúdo",
    previewTitle: "Veja como o material foi elaborado antes de decidir.",
    previewText: "Não são mockups nem imagens ilustrativas. São páginas reais do material finalizado em espanhol, mostrando a progressão dos fundamentos à prática, às montagens e aos desenhos.",
    previewAlt: "Prévia real do manual de SolidWorks em espanhol",
    previewPages: [{ label: "Objetivos do nível" }, { label: "Prática guiada passo a passo" }, { label: "Montagens e relações de posição" }, { label: "Desenhos e documentação técnica" }],
    previewFacts: [
      { icon: "pages", label: "Extensão", value: "222 páginas" },
      { icon: "modules", label: "Percurso", value: "6 módulos progressivos" },
      { icon: "language", label: "Idioma do material", value: "Espanhol" },
      { icon: "version", label: "Versão utilizada", value: "SOLIDWORKS 2024 SP3.1" },
    ],
    offerEyebrow: "O que você recebe",
    offerTitle: "Um pacote de aprendizagem para estudar e praticar no seu ritmo.",
    offerIntro: "O manual é o recurso principal e é entregue com os arquivos práticos utilizados durante o percurso.",
    includes: [
      { title: "Manual completo em PDF", text: "222 páginas de teoria aplicada, procedimentos, exemplos e critérios de trabalho." },
      { title: "Exercícios e questionários", text: "Pasta separada Ejercicios_NivelPrincipiante para reforçar cada etapa." },
      { title: "Entrega pela Hotmart", text: "Acesso digital após a confirmação do pagamento na plataforma." },
      { title: "Suporte por 30 dias", text: "Dúvidas por e-mail, com resposta em até 2 dias úteis." },
    ],
    priceLabel: "Preço do pacote",
    price: "USD 29",
    priceMeta: "Pagamento único · Entrega digital",
    purchasePending: "Comprar na Hotmart · link em breve",
    purchaseNote: "O botão de compra será habilitado quando o link definitivo estiver disponível.",
    supportLabel: "Suporte incluído:",
    refundNote: "Política de reembolso gerenciada pela Hotmart; as condições aplicáveis serão exibidas no checkout.",
    notIncludedTitle: "Informações importantes antes da compra",
    notIncluded: ["Não inclui certificado.", "Não inclui o software SolidWorks nem sua licença."],
    audienceEyebrow: "Para quem é",
    audienceTitle: "Uma base útil para diferentes pontos de partida.",
    audiences: [
      { title: "Estudantes e iniciantes em CAD", text: "Para os primeiros passos em CAD e na lógica da modelagem 3D." },
      { title: "Técnicos e projetistas", text: "Para representar peças, fazer alterações simples e preparar documentação técnica." },
      { title: "Designers e empreendedores", text: "Para desenvolver conceitos e peças em 3D para projetos, fabricação ou apresentação." },
    ],
    audienceNote: "Não é necessária experiência prévia em CAD. Noções básicas de desenho técnico e informática ajudam.",
    programEyebrow: "Conteúdo do manual",
    programTitle: "Seis módulos em uma sequência que constrói critério.",
    programIntro: "O material em espanhol avança do ambiente de trabalho e dos esboços à modelagem, edição, montagens e documentação técnica.",
    moduleToggle: "Ver temas",
    outcomesEyebrow: "O que você poderá fazer",
    outcomesTitle: "Uma base concreta para modelos simples e documentos técnicos.",
    outcomes: ["Criar e administrar arquivos do SolidWorks.", "Construir esboços definidos e peças com recursos básicos.", "Editar modelos e analisar erros iniciais.", "Criar montagens simples.", "Preparar desenhos básicos e exportar arquivos."],
    materialNote: "Os exercícios práticos e questionários são entregues na pasta separada Ejercicios_NivelPrincipiante, conforme indicado no manual.",
    closeEyebrow: "Material finalizado",
    closeTitle: "Tudo preparado para começar; falta habilitar a compra.",
    closeText: "Você já pode revisar o conteúdo e entrar em contato se tiver dúvidas. O link da Hotmart será adicionado nesta página.",
    allCourses: "Ver todos os cursos",
    allCoursesPath: "/pt/cursos",
    independentNote: "Material independente. SOLIDWORKS é uma marca de seus respectivos titulares; este manual não é afiliado nem endossado pela Dassault Systèmes ou pela SOLIDWORKS Corporation.",
  },
};

const moduleIcons = [BookOpenText, PencilRuler, Cuboid, Layers3, DraftingCompass, FileText];
const offerIcons = [BookOpenText, FolderOpen, Download, Clock];
const previewIcons = { pages: BookOpenText, modules: Layers3, language: Languages, version: ShieldCheck };

function SolidWorksCoursePage({ route = "/cursos/solidworks" }) {
  const language = route.startsWith("/en/") ? "en" : route.startsWith("/pt/") ? "pt" : "es";
  const copy = copyByLanguage[language];
  const modules = modulesByLanguage[language];
  const inquiryHref = `mailto:${contact.email}?subject=${encodeURIComponent(copy.inquirySubject)}`;

  return (
    <div className="solidworks-course-page">
      <section className="solidworks-hero" aria-labelledby="solidworks-title">
        <div className="section-container solidworks-hero-grid">
          <div className="solidworks-hero-copy">
            <span className="solidworks-eyebrow"><GraduationCap size={18} aria-hidden="true" />{copy.eyebrow}</span>
            <h1 id="solidworks-title">{copy.title}</h1>
            <p className="solidworks-product-format">{copy.productFormat}</p>
            <p className="solidworks-hero-lead">{copy.lead}</p>
            <ul className="solidworks-hero-facts" aria-label={copy.productFormat}>
              {copy.heroFacts.map((fact) => <li key={fact}><CheckCircle2 size={16} aria-hidden="true" />{fact}</li>)}
            </ul>
            <div className="solidworks-author">
              <span className="solidworks-author-monogram" aria-hidden="true">SC</span>
              <span><strong>{copy.author}</strong><small>{copy.authorRole}</small></span>
            </div>
            <div className="solidworks-hero-actions">
              <a className="mock-btn mock-btn-primary" href="#material">{copy.materialAction}<ArrowRight size={18} aria-hidden="true" /></a>
              <a className="mock-btn mock-btn-outline" href={inquiryHref}>{copy.inquiryAction}<Mail size={18} aria-hidden="true" /></a>
            </div>
          </div>
          <figure className="solidworks-cover">
            <div className="solidworks-cover-frame"><img src={courseCover} alt={copy.coverAlt} width="1101" height="1556" loading="eager" decoding="async" /></div>
            <figcaption>{copy.coverCaption}</figcaption>
          </figure>
        </div>
      </section>

      <section className="solidworks-status" aria-label={copy.statusEyebrow}>
        <div className="section-container solidworks-status-inner">
          <span className="solidworks-status-mark" aria-hidden="true" />
          <div className="solidworks-status-copy"><span className="solidworks-kicker">{copy.statusEyebrow}</span><h2>{copy.statusTitle}</h2><p>{copy.statusText}</p></div>
          <div className="solidworks-status-price"><span>{copy.priceLabel}</span><strong>{copy.price}</strong></div>
        </div>
      </section>

      <section className="solidworks-preview" id="material">
        <div className="section-container solidworks-preview-grid">
          <div className="solidworks-preview-copy">
            <span className="solidworks-kicker">{copy.previewEyebrow}</span>
            <h2>{copy.previewTitle}</h2>
            <p>{copy.previewText}</p>
            <dl className="solidworks-preview-facts">
              {copy.previewFacts.map((fact) => {
                const FactIcon = previewIcons[fact.icon];
                return <div key={fact.label}><FactIcon size={20} aria-hidden="true" /><dt>{fact.label}</dt><dd>{fact.value}</dd></div>;
              })}
            </dl>
          </div>
          <div className="solidworks-preview-viewer">
            <DeferredManualFlipbook images={manualPreviewImages} pages={copy.previewPages} variant="full" altPrefix={copy.previewAlt} language={language} />
          </div>
        </div>
      </section>

      <section className="solidworks-offer" id="incluye">
        <div className="section-container">
          <div className="solidworks-section-heading"><span className="solidworks-kicker">{copy.offerEyebrow}</span><h2>{copy.offerTitle}</h2><p>{copy.offerIntro}</p></div>
          <div className="solidworks-offer-grid">
            <div className="solidworks-includes-list">
              {copy.includes.map((item, index) => {
                const OfferIcon = offerIcons[index];
                return <article className="solidworks-include-card" key={item.title}><span><OfferIcon size={22} aria-hidden="true" /></span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>;
              })}
            </div>
            <aside className="solidworks-price-card" aria-label={`${copy.priceLabel}: ${copy.price}`}>
              <span className="solidworks-price-label">{copy.priceLabel}</span>
              <strong className="solidworks-price">{copy.price}</strong>
              <span className="solidworks-price-meta">{copy.priceMeta}</span>
              <button type="button" className="mock-btn mock-btn-primary solidworks-purchase-pending" disabled>{copy.purchasePending}<ShoppingCart size={18} aria-hidden="true" /></button>
              <p className="solidworks-purchase-note">{copy.purchaseNote}</p>
              <a className="solidworks-support-link" href={`mailto:${contact.email}`}><Mail size={17} aria-hidden="true" /><span><strong>{copy.supportLabel}</strong>{contact.email}</span></a>
              <p className="solidworks-refund-note"><ShieldCheck size={17} aria-hidden="true" />{copy.refundNote}</p>
            </aside>
          </div>
          <div className="solidworks-not-included">
            <h3>{copy.notIncludedTitle}</h3>
            <ul>{copy.notIncluded.map((item) => <li key={item}><XCircle size={18} aria-hidden="true" />{item}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="solidworks-audience">
        <div className="section-container">
          <div className="solidworks-section-heading"><span className="solidworks-kicker">{copy.audienceEyebrow}</span><h2>{copy.audienceTitle}</h2></div>
          <div className="solidworks-audience-grid">
            {copy.audiences.map((audience, index) => <article className="solidworks-audience-card" key={audience.title}><span>0{index + 1}</span><h3>{audience.title}</h3><p>{audience.text}</p></article>)}
          </div>
          <p className="solidworks-audience-note"><CircleHelp size={18} aria-hidden="true" />{copy.audienceNote}</p>
        </div>
      </section>

      <section className="solidworks-program" id="programa">
        <div className="section-container">
          <div className="solidworks-section-heading"><span className="solidworks-kicker">{copy.programEyebrow}</span><h2>{copy.programTitle}</h2><p>{copy.programIntro}</p></div>
          <div className="solidworks-module-list">
            {modules.map((module, index) => {
              const ModuleIcon = moduleIcons[index];
              return <details className="solidworks-module" key={module.title} open={index === 0}>
                <summary><span className="solidworks-module-number">0{index + 1}</span><span className="solidworks-module-icon"><ModuleIcon size={22} aria-hidden="true" /></span><span className="solidworks-module-heading"><strong>{module.title}</strong><small>{module.summary}</small></span><span className="solidworks-module-toggle">{copy.moduleToggle}<span aria-hidden="true">+</span></span></summary>
                <ul>{module.topics.map((topic) => <li key={topic}><CheckCircle2 size={16} aria-hidden="true" />{topic}</li>)}</ul>
              </details>;
            })}
          </div>
        </div>
      </section>

      <section className="solidworks-outcomes">
        <div className="section-container solidworks-outcomes-grid">
          <div><span className="solidworks-kicker">{copy.outcomesEyebrow}</span><h2>{copy.outcomesTitle}</h2></div>
          <div><ul>{copy.outcomes.map((outcome) => <li key={outcome}><CheckCircle2 size={20} aria-hidden="true" />{outcome}</li>)}</ul><p>{copy.materialNote}</p></div>
        </div>
      </section>

      <section className="solidworks-close">
        <div className="section-container solidworks-close-inner">
          <span className="solidworks-kicker">{copy.closeEyebrow}</span>
          <h2>{copy.closeTitle}</h2>
          <p>{copy.closeText}</p>
          <div className="solidworks-hero-actions">
            <button type="button" className="mock-btn mock-btn-primary solidworks-purchase-pending" disabled>{copy.purchasePending}<ShoppingCart size={18} aria-hidden="true" /></button>
            <a className="mock-btn mock-btn-outline" href={inquiryHref}>{copy.inquiryAction}<Mail size={18} aria-hidden="true" /></a>
            <a className="mock-btn mock-btn-outline" href={copy.allCoursesPath}>{copy.allCourses}<ArrowRight size={18} aria-hidden="true" /></a>
          </div>
          <small>{copy.independentNote}</small>
        </div>
      </section>
    </div>
  );
}

export default SolidWorksCoursePage;
