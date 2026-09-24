import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import symptomCapture from "../assets/app-seleccion-sintoma-v8-17-24.jpg";
import verificationCapture from "../assets/app-verificacion-guiada-v8-17-24.jpg";
import interventionCapture from "../assets/app-registro-intervencion-v8-17-24.jpg";

const frames = [symptomCapture, verificationCapture, interventionCapture];

const copy = {
  es: {
    region: "Recorrido visual de BOJ S7-PLC PRO con capturas reales",
    screen: "Pantalla",
    of: "de",
    previous: "Ver pantalla anterior",
    next: "Ver pantalla siguiente",
    pause: "Pausar recorrido",
    play: "Reanudar recorrido",
    steps: [
      ["Selecciona un síntoma", "Parte de la falla que observas en campo."],
      ["Sigue la verificación", "Registra la evidencia y avanza por las preguntas."],
      ["Registra la intervención", "Deja identificados el equipo y el trabajo realizado."],
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
    steps: [
      ["Choose a symptom", "Start with the fault observed in the field."],
      ["Follow the checks", "Record evidence as you work through the questions."],
      ["Record the intervention", "Identify the equipment and the work completed."],
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
    steps: [
      ["Selecione um sintoma", "Comece pela falha observada em campo."],
      ["Siga a verificação", "Registre as evidências ao responder às perguntas."],
      ["Registre a intervenção", "Identifique o equipamento e o trabalho realizado."],
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
    const timer = window.setInterval(() => setActive((index) => (index + 1) % frames.length), 3600);
    return () => window.clearInterval(timer);
  }, [active, playing, inView, hovered, focused]);

  const move = (direction) => {
    setPlaying(false);
    setActive((index) => (index + direction + frames.length) % frames.length);
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
            width="1460"
            height="852"
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
    </div>
  );
}
