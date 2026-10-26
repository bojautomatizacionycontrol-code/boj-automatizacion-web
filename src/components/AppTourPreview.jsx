import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import panelCapture from "../assets/app-tour/app-panel-leds-v8-17-24.jpg";
import guidedQuestionCapture from "../assets/app-tour/app-pregunta-guiada-v8-17-24.jpg";
import hypothesisCapture from "../assets/app-tour/app-hipotesis-evidencia-v8-17-24.jpg";
import prioritizedResultCapture from "../assets/app-tour/app-resultado-priorizado-v8-17-24.jpg";
import reportCapture from "../assets/app-tour/app-informe-tecnico-v8-17-24.jpg";
import symptomCapture from "../assets/app-seleccion-sintoma-v8-17-24.jpg";
import verificationCapture from "../assets/app-verificacion-guiada-v8-17-24.jpg";
import interventionCapture from "../assets/app-registro-intervencion-v8-17-24.jpg";

const frames = [
  panelCapture,
  symptomCapture,
  interventionCapture,
  guidedQuestionCapture,
  verificationCapture,
  hypothesisCapture,
  prioritizedResultCapture,
  reportCapture,
];

const copy = {
  es: {
    region: "Recorrido visual de BOJ S7-PLC PRO con capturas reales",
    screen: "Pantalla",
    of: "de",
    previous: "Ver pantalla anterior",
    next: "Ver pantalla siguiente",
    pause: "Pausar recorrido",
    play: "Reanudar recorrido",
    chooseScreen: "Elegir una pantalla del recorrido",
    steps: [
      ["Configura la CPU y sus LEDs", "Selecciona el modelo y registra el estado observado en el frente del PLC."],
      ["Selecciona un síntoma", "Parte de la falla que observas en campo."],
      ["Prepara la intervención", "Documenta el equipo, el contexto y la criticidad antes de diagnosticar."],
      ["Responde preguntas guiadas", "La app explica por qué pregunta y qué comprobación debes realizar."],
      ["Registra la evidencia", "Cada respuesta conserva lo observado y orienta el siguiente chequeo."],
      ["Compara las hipótesis", "Revisa su posición, la evidencia y la próxima medición recomendada."],
      ["Obtén un resultado priorizado", "Resume la evidencia, el nivel de confianza y la siguiente acción técnica."],
      ["Genera el informe técnico", "Conserva el contexto, el diagnóstico y los datos de la intervención."],
    ],
  },
  en: {
    region: "Visual tour of BOJ S7-PLC PRO using real screenshots",
    screen: "Screen",
    of: "of",
    previous: "Previous screen",
    next: "Next screen",
    pause: "Pause tour",
    play: "Resume tour",
    chooseScreen: "Choose a screen from the tour",
    steps: [
      ["Set up the CPU and LEDs", "Select the model and record the status observed on the PLC front panel."],
      ["Choose a symptom", "Start with the fault observed in the field."],
      ["Prepare the intervention", "Document the equipment, context and criticality before diagnosing."],
      ["Answer guided questions", "The app explains why it asks and which check you should perform."],
      ["Record the evidence", "Each answer preserves your observation and guides the next check."],
      ["Compare hypotheses", "Review their ranking, the evidence and the next recommended measurement."],
      ["Get a prioritized result", "Summarize the evidence, confidence level and next technical action."],
      ["Generate the technical report", "Keep the context, diagnosis and intervention details together."],
    ],
  },
  pt: {
    region: "Passeio visual pelo BOJ S7-PLC PRO com imagens reais",
    screen: "Tela",
    of: "de",
    previous: "Ver tela anterior",
    next: "Ver próxima tela",
    pause: "Pausar apresentação",
    play: "Retomar apresentação",
    chooseScreen: "Escolher uma tela do passeio",
    steps: [
      ["Configure a CPU e os LEDs", "Selecione o modelo e registre o estado observado no painel frontal do PLC."],
      ["Selecione um sintoma", "Comece pela falha observada em campo."],
      ["Prepare a intervenção", "Documente o equipamento, o contexto e a criticidade antes do diagnóstico."],
      ["Responda às perguntas guiadas", "O app explica por que pergunta e qual verificação deve ser realizada."],
      ["Registre as evidências", "Cada resposta preserva o observado e orienta a próxima verificação."],
      ["Compare as hipóteses", "Revise a posição, as evidências e a próxima medição recomendada."],
      ["Obtenha um resultado priorizado", "Resuma as evidências, o nível de confiança e a próxima ação técnica."],
      ["Gere o relatório técnico", "Mantenha juntos o contexto, o diagnóstico e os dados da intervenção."],
    ],
  },
};

export default function AppTourPreview({ language = "es" }) {
  const labels = copy[language] || copy.es;
  const stageRef = useRef(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const respectMotionPreference = () => {
      if (media.matches) setPlaying(false);
    };
    respectMotionPreference();
    media.addEventListener("change", respectMotionPreference);
    return () => media.removeEventListener("change", respectMotionPreference);
  }, []);

  useEffect(() => {
    if (!stageRef.current) return undefined;
    if (!window.IntersectionObserver) {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.3,
    });
    observer.observe(stageRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || !inView || hovered || focused) return undefined;
    const timer = window.setInterval(() => setActive((index) => (index + 1) % frames.length), 4700);
    return () => window.clearInterval(timer);
  }, [active, playing, inView, hovered, focused]);

  const move = (direction) => {
    setPlaying(false);
    setActive((index) => (index + direction + frames.length) % frames.length);
  };

  const select = (index) => {
    setPlaying(false);
    setActive(index);
  };

  return (
    <div
      className="app-tour"
      ref={stageRef}
      role="region"
      aria-label={labels.region}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <div className="app-tour-screen">
        {frames.map((image, index) => (
          <img
            className={`app-tour-image${index === active ? " is-active" : ""}`}
            key={image}
            src={image}
            alt={index === active ? labels.steps[index][0] : ""}
            aria-hidden={index !== active}
            width="1600"
            height="900"
            loading="lazy"
            decoding="async"
          />
        ))}
        <span className="app-tour-screen-count">
          {labels.screen} {active + 1} {labels.of} {frames.length}
        </span>
      </div>
      <div className="app-tour-bottom">
        <div className="app-tour-caption" aria-live={playing ? "off" : "polite"}>
          <strong>{labels.steps[active][0]}</strong>
          <span>{labels.steps[active][1]}</span>
        </div>
        <div className="app-tour-controls">
          <button type="button" onClick={() => move(-1)} aria-label={labels.previous}>
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => setPlaying((value) => !value)} aria-label={playing ? labels.pause : labels.play}>
            {playing ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}
          </button>
          <button type="button" onClick={() => move(1)} aria-label={labels.next}>
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="app-tour-progress" aria-hidden="true">
        {frames.map((image, index) => <span className={index === active ? "is-active" : ""} key={image} />)}
      </div>
      <div className="app-tour-thumbnails" role="group" aria-label={labels.chooseScreen}>
        {frames.map((image, index) => (
          <button
            type="button"
            className={index === active ? "is-active" : ""}
            aria-label={`${labels.screen} ${index + 1}: ${labels.steps[index][0]}`}
            aria-pressed={index === active}
            onClick={() => select(index)}
            key={image}
          >
            <img
              src={image}
              alt=""
              aria-hidden="true"
              width="1600"
              height="900"
              loading="lazy"
              decoding="async"
            />
            <span>{String(index + 1).padStart(2, "0")}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
