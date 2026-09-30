import {
  ArrowRight,
  BookOpenText,
  CheckCircle2,
  CircleHelp,
  Cuboid,
  DraftingCompass,
  FileText,
  GraduationCap,
  Layers3,
  Mail,
  PencilRuler,
} from "lucide-react";
import { contact } from "../content.js";
import courseCover from "../assets/solidworks-course-cover.webp";
import cadBracket from "../assets/solidworks-cad-bracket-illustration.png";

const copyByLanguage = {
  es: {
    eyebrow: "Formación CAD · Nivel principiante",
    title: "Diseño en SolidWorks, desde el primer boceto hasta el plano técnico.",
    lead: "Una introducción progresiva al modelado paramétrico para aprender a construir piezas, ensamblajes sencillos y documentación básica con un método de trabajo ordenado.",
    author: "Sabrina Daniela Chaile",
    authorRole: "Diseñadora Industrial · Autora del curso",
    programAction: "Explorar el programa",
    inquiryAction: "Consultar por el curso",
    inquirySubject: "Consulta sobre el curso de SolidWorks - nivel principiante",
    coverAlt: "Portada preliminar del material Diseño en SolidWorks: nivel principiante, de Sabrina Daniela Chaile",
    coverCaption: "Portada del material de presentación del curso.",
    statusEyebrow: "Estado del curso",
    statusTitle: "Programa en desarrollo. Inscripción aún no habilitada.",
    statusText: "El temario ya está definido. Publicaremos aquí la modalidad, los requisitos, la fecha de apertura y el precio cuando estén confirmados.",
    approachEyebrow: "Aprender con una secuencia clara",
    approachTitle: "Comprender el modelo antes de repetir comandos.",
    approachText: "El recorrido comienza por el entorno de trabajo y los bocetos. Después incorpora operaciones 3D, edición, ensamblajes y planos. Cada etapa se apoya en la anterior para que puedas entender cómo se construye y modifica un modelo.",
    facts: ["Desde cero", "Modelado paramétrico", "De la pieza al plano"],
    partAlt: "Ilustración de un soporte mecánico modelado en 3D, con orificios de montaje y refuerzos triangulares",
    partCaption: "Ejemplo ilustrativo de una pieza CAD; no es una captura del curso.",
    audienceEyebrow: "A quién está dirigido",
    audienceTitle: "Una base útil para distintos puntos de partida.",
    audiences: [
      { title: "Estudiantes y principiantes", text: "Para dar los primeros pasos en CAD y comprender la lógica del modelado 3D." },
      { title: "Técnicos y proyectistas", text: "Para representar piezas, realizar cambios sencillos y preparar documentación técnica." },
      { title: "Diseñadores y emprendedores", text: "Para desarrollar conceptos y piezas en 3D destinados a proyectos, fabricación o presentación." },
    ],
    audienceNote: "No se requiere experiencia avanzada. Ayuda contar con nociones básicas de dibujo técnico y manejo de computadora.",
    programEyebrow: "Temario técnico",
    programTitle: "Seis módulos, en un orden que construye criterio.",
    programIntro: "Este es el temario previsto en el material de presentación. Abre cada módulo para ver sus contenidos principales.",
    moduleToggle: "Ver contenidos",
    modules: [
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
    outcomesEyebrow: "Qué se busca lograr",
    outcomesTitle: "Una base para trabajar con modelos simples y seguir aprendiendo.",
    outcomes: ["Crear y administrar archivos de SolidWorks.", "Construir bocetos definidos y piezas con operaciones básicas.", "Editar modelos y analizar errores iniciales.", "Armar ensamblajes sencillos.", "Preparar planos básicos y exportar archivos."],
    materialNote: "El programa prevé material teórico, ejercicios guiados y cuestionarios en archivos separados. El contenido y la modalidad de entrega se confirmarán antes de abrir la inscripción.",
    closeEyebrow: "Próxima formación BOJ",
    closeTitle: "Conoce el programa. Consulta antes de inscribirte.",
    closeText: "Si te interesa este nivel, escríbenos para consultar su estado. No hay compra ni inscripción activa en esta página.",
    allCourses: "Ver todos los cursos",
    allCoursesPath: "/cursos",
    independentNote: "Formación independiente. SOLIDWORKS es una marca de sus respectivos titulares; este curso no está afiliado ni avalado por Dassault Systèmes o SOLIDWORKS Corporation.",
  },
  en: {
    eyebrow: "CAD training · Beginner level",
    title: "SolidWorks design, from your first sketch to a technical drawing.",
    lead: "A progressive introduction to parametric modeling: learn to build parts, simple assemblies and basic documentation through a structured workflow.",
    author: "Sabrina Daniela Chaile",
    authorRole: "Industrial Designer · Course author",
    programAction: "Explore the syllabus",
    inquiryAction: "Ask about the course",
    inquirySubject: "Inquiry about the beginner SolidWorks course",
    coverAlt: "Preliminary cover of Design in SolidWorks: beginner level, by Sabrina Daniela Chaile",
    coverCaption: "Cover of the course overview material.",
    statusEyebrow: "Course status",
    statusTitle: "Program in development. Enrollment is not open yet.",
    statusText: "The syllabus has been outlined. We will publish the format, requirements, opening date and price here once confirmed.",
    approachEyebrow: "Learn in a clear sequence",
    approachTitle: "Understand the model before repeating commands.",
    approachText: "The learning path starts with the workspace and sketches. It then introduces 3D features, editing, assemblies and drawings. Each stage builds on the previous one so you can understand how a model is created and changed.",
    facts: ["Start from scratch", "Parametric modeling", "From part to drawing"],
    partAlt: "Illustration of a 3D mechanical mounting bracket with bolt holes and triangular gussets",
    partCaption: "Illustrative CAD part; not a screenshot from the course.",
    audienceEyebrow: "Who it is for",
    audienceTitle: "A useful foundation for different starting points.",
    audiences: [
      { title: "Students and CAD beginners", text: "For a first step into CAD and the logic of 3D modeling." },
      { title: "Technicians and drafters", text: "For representing parts, making simple changes and preparing technical documents." },
      { title: "Designers and entrepreneurs", text: "For developing 3D concepts and parts for projects, manufacturing or presentations." },
    ],
    audienceNote: "Advanced experience is not required. Basic technical drawing and computer skills are helpful.",
    programEyebrow: "Technical syllabus",
    programTitle: "Six modules in a sequence designed to build sound practice.",
    programIntro: "This is the syllabus planned in the course overview. Open each module to see its main topics.",
    moduleToggle: "View topics",
    modules: [
      { title: "Introduction to SolidWorks", summary: "Explore the interface, document types and first decisions before creating a part.", topics: ["CAD design and document types", "Interface and unit setup", "Creating part files", "3D navigation and rebuilding", "Good working practices"] },
      { title: "Sketches and geometric definition", summary: "Draw, constrain and dimension sketches to control their geometry.", topics: ["Starting sketches and basic entities", "Geometric relations", "Smart Dimension", "Degrees of freedom and sketch status", "Additional tools and good practices"] },
      { title: "Basic features and 3D modeling", summary: "Turn sketches into parts and understand how features are connected.", topics: ["Extrudes, cuts and revolves", "Hole Wizard", "Fillets, chamfers and shells", "Reference planes and axes", "Mirrors, linear and circular patterns", "Materials, measurements and mass properties"] },
      { title: "Editing and troubleshooting", summary: "Modify models while tracking dependencies and interpreting warnings.", topics: ["Editing sketches and features", "Feature tree and dependencies", "Suppressing, restoring and reordering", "Model errors and warnings", "Robust references and design intent"] },
      { title: "Basic assemblies", summary: "Bring components together and control their position and motion.", topics: ["Creating and inserting components", "Fixed and floating components; degrees of freedom", "Assembly mates", "Interference detection", "Exploded views", "File references and Pack and Go"] },
      { title: "Drawings and technical documentation", summary: "Communicate a part or assembly using views, dimensions and technical data.", topics: ["Templates, sheet formats and title blocks", "Projections, views, sections and details", "Scales, dimensions and basic tolerances", "Assembly drawings, bills of materials and balloons", "Saving, exporting and delivering files"] },
    ],
    outcomesEyebrow: "Learning goals",
    outcomesTitle: "A foundation for simple models and continued learning.",
    outcomes: ["Create and manage SolidWorks files.", "Build defined sketches and parts with basic features.", "Edit models and investigate introductory errors.", "Create simple assemblies.", "Prepare basic drawings and export files."],
    materialNote: "The plan includes theory, guided exercises and questionnaires in separate files. Content and delivery format will be confirmed before enrollment opens.",
    closeEyebrow: "Upcoming BOJ training",
    closeTitle: "Explore the syllabus. Ask before enrolling.",
    closeText: "If this level interests you, write to us for an update. There is no active purchase or enrollment on this page.",
    allCourses: "View all courses",
    allCoursesPath: "/en/courses",
    independentNote: "Independent training. SOLIDWORKS is a trademark of its respective owners; this course is not affiliated with or endorsed by Dassault Systèmes or SOLIDWORKS Corporation.",
  },
  pt: {
    eyebrow: "Formação CAD · Nível iniciante",
    title: "Projeto em SolidWorks, do primeiro esboço ao desenho técnico.",
    lead: "Uma introdução progressiva à modelagem paramétrica para aprender a criar peças, montagens simples e documentação básica com um método de trabalho organizado.",
    author: "Sabrina Daniela Chaile",
    authorRole: "Designer Industrial · Autora do curso",
    programAction: "Explorar o programa",
    inquiryAction: "Consultar sobre o curso",
    inquirySubject: "Consulta sobre o curso de SolidWorks - nível iniciante",
    coverAlt: "Capa preliminar do material Projeto em SolidWorks: nível iniciante, de Sabrina Daniela Chaile",
    coverCaption: "Capa do material de apresentação do curso.",
    statusEyebrow: "Status do curso",
    statusTitle: "Programa em desenvolvimento. Inscrições ainda não abertas.",
    statusText: "O programa já foi estruturado. Publicaremos aqui o formato, os requisitos, a data de abertura e o preço quando estiverem confirmados.",
    approachEyebrow: "Aprender em uma sequência clara",
    approachTitle: "Entenda o modelo antes de repetir comandos.",
    approachText: "O percurso começa pelo ambiente de trabalho e pelos esboços. Depois incorpora recursos 3D, edição, montagens e desenhos. Cada etapa se apoia na anterior para que você entenda como um modelo é criado e modificado.",
    facts: ["Desde o início", "Modelagem paramétrica", "Da peça ao desenho"],
    partAlt: "Ilustração de um suporte mecânico modelado em 3D, com furos de fixação e reforços triangulares",
    partCaption: "Exemplo ilustrativo de uma peça CAD; não é uma captura do curso.",
    audienceEyebrow: "Para quem é",
    audienceTitle: "Uma base útil para diferentes pontos de partida.",
    audiences: [
      { title: "Estudantes e iniciantes em CAD", text: "Para os primeiros passos em CAD e na lógica da modelagem 3D." },
      { title: "Técnicos e projetistas", text: "Para representar peças, fazer alterações simples e preparar documentação técnica." },
      { title: "Designers e empreendedores", text: "Para desenvolver conceitos e peças em 3D para projetos, fabricação ou apresentação." },
    ],
    audienceNote: "Não é necessária experiência avançada. Noções básicas de desenho técnico e informática ajudam.",
    programEyebrow: "Programa técnico",
    programTitle: "Seis módulos em uma sequência que constrói critério.",
    programIntro: "Este é o programa previsto no material de apresentação. Abra cada módulo para ver os temas principais.",
    moduleToggle: "Ver temas",
    modules: [
      { title: "Introdução ao SolidWorks", summary: "Conheça a interface, os documentos e as primeiras decisões antes de criar uma peça.", topics: ["Projeto CAD e tipos de documento", "Interface e configuração de unidades", "Criação de arquivos de peça", "Navegação 3D e reconstrução", "Boas práticas de trabalho"] },
      { title: "Esboços e definição geométrica", summary: "Desenhe, relacione e dimensione esboços para controlar a geometria.", topics: ["Início de esboços e entidades básicas", "Relações geométricas", "Cota inteligente", "Graus de liberdade e estado do esboço", "Ferramentas adicionais e boas práticas"] },
      { title: "Recursos básicos e modelo 3D", summary: "Transforme esboços em peças e compreenda como os recursos se relacionam.", topics: ["Extrusões, cortes e revoluções", "Assistente de perfuração", "Arredondamentos, chanfros e cascas", "Planos e eixos de referência", "Espelhamentos e padrões lineares ou circulares", "Materiais, medição e propriedades de massa"] },
      { title: "Edição e resolução de erros", summary: "Modifique modelos acompanhando suas dependências e interpretando avisos.", topics: ["Edição de esboços e recursos", "Árvore de recursos e dependências", "Supressão, ativação e reordenação", "Erros e avisos do modelo", "Referências robustas e intenção de projeto"] },
      { title: "Montagens básicas", summary: "Reúna componentes e controle sua posição e movimento.", topics: ["Criação e inserção de componentes", "Componentes fixos e flutuantes; graus de liberdade", "Relações de posicionamento", "Detecção de interferências", "Vistas explodidas", "Referências de arquivos e Pack and Go"] },
      { title: "Desenhos e documentação técnica", summary: "Comunique uma peça ou montagem por meio de vistas, cotas e dados técnicos.", topics: ["Modelos, formato da folha e carimbo", "Projeções, vistas, cortes e detalhes", "Escalas, cotas e tolerâncias básicas", "Desenhos de montagem, listas de materiais e balões", "Salvamento, exportação e entrega de arquivos"] },
    ],
    outcomesEyebrow: "Objetivos de aprendizagem",
    outcomesTitle: "Uma base para modelos simples e para continuar aprendendo.",
    outcomes: ["Criar e administrar arquivos do SolidWorks.", "Construir esboços definidos e peças com recursos básicos.", "Editar modelos e analisar erros iniciais.", "Criar montagens simples.", "Preparar desenhos básicos e exportar arquivos."],
    materialNote: "O programa prevê teoria, exercícios guiados e questionários em arquivos separados. O conteúdo e o formato de entrega serão confirmados antes da abertura das inscrições.",
    closeEyebrow: "Próxima formação BOJ",
    closeTitle: "Conheça o programa. Consulte antes de se inscrever.",
    closeText: "Se este nível interessa a você, escreva para consultar o andamento. Esta página não oferece compra ou inscrição ativa.",
    allCourses: "Ver todos os cursos",
    allCoursesPath: "/pt/cursos",
    independentNote: "Formação independente. SOLIDWORKS é uma marca de seus respectivos titulares; este curso não é afiliado nem endossado pela Dassault Systèmes ou pela SOLIDWORKS Corporation.",
  },
};

const moduleIcons = [BookOpenText, PencilRuler, Cuboid, Layers3, DraftingCompass, FileText];

function SolidWorksCoursePage({ route = "/cursos/solidworks" }) {
  const language = route.startsWith("/en/") ? "en" : route.startsWith("/pt/") ? "pt" : "es";
  const copy = copyByLanguage[language];
  const inquiryHref = `mailto:${contact.email}?subject=${encodeURIComponent(copy.inquirySubject)}`;

  return (
    <div className="solidworks-course-page">
      <section className="solidworks-hero" aria-labelledby="solidworks-title">
        <div className="section-container solidworks-hero-grid">
          <div className="solidworks-hero-copy">
            <span className="solidworks-eyebrow"><GraduationCap size={18} aria-hidden="true" />{copy.eyebrow}</span>
            <h1 id="solidworks-title">{copy.title}</h1>
            <p className="solidworks-hero-lead">{copy.lead}</p>
            <div className="solidworks-author">
              <span className="solidworks-author-monogram" aria-hidden="true">SC</span>
              <span><strong>{copy.author}</strong><small>{copy.authorRole}</small></span>
            </div>
            <div className="solidworks-hero-actions">
              <a className="mock-btn mock-btn-primary" href="#programa">{copy.programAction}<ArrowRight size={18} aria-hidden="true" /></a>
              <a className="mock-btn mock-btn-outline" href={inquiryHref}>{copy.inquiryAction}<Mail size={18} aria-hidden="true" /></a>
            </div>
          </div>
          <figure className="solidworks-cover">
            <div className="solidworks-cover-frame"><img src={courseCover} alt={copy.coverAlt} width="760" height="1074" fetchPriority="high" /></div>
            <figcaption>{copy.coverCaption}</figcaption>
          </figure>
        </div>
      </section>

      <section className="solidworks-status" aria-label={copy.statusEyebrow}>
        <div className="section-container solidworks-status-inner">
          <span className="solidworks-status-mark" aria-hidden="true" />
          <div><span className="solidworks-kicker">{copy.statusEyebrow}</span><h2>{copy.statusTitle}</h2><p>{copy.statusText}</p></div>
        </div>
      </section>

      <section className="solidworks-intro">
        <div className="section-container solidworks-intro-grid">
          <div className="solidworks-intro-copy">
            <span className="solidworks-kicker">{copy.approachEyebrow}</span>
            <h2>{copy.approachTitle}</h2>
            <p>{copy.approachText}</p>
            <ul className="solidworks-facts">{copy.facts.map((fact) => <li key={fact}><CheckCircle2 size={18} aria-hidden="true" />{fact}</li>)}</ul>
          </div>
          <figure className="solidworks-part-figure">
            <div className="solidworks-part-stage"><img src={cadBracket} alt={copy.partAlt} width="1536" height="1024" loading="lazy" decoding="async" /></div>
            <figcaption>{copy.partCaption}</figcaption>
          </figure>
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
            {copy.modules.map((module, index) => {
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
          <div className="solidworks-hero-actions"><a className="mock-btn mock-btn-primary" href={inquiryHref}>{copy.inquiryAction}<Mail size={18} aria-hidden="true" /></a><a className="mock-btn mock-btn-outline" href={copy.allCoursesPath}>{copy.allCourses}<ArrowRight size={18} aria-hidden="true" /></a></div>
          <small>{copy.independentNote}</small>
        </div>
      </section>
    </div>
  );
}

export default SolidWorksCoursePage;
