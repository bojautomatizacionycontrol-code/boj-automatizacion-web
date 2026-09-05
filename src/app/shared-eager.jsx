import { track as trackVercelEvent } from "@vercel/analytics";
import { contact } from "../content.js";
import bojLogo from "../assets/boj-logo-real-cropped.png";
import appProHeroLaptopVisual from "../assets/hero-app.jpg";
import heroInicio from "../assets/hero-inicio.jpg";
import heroServicios from "../assets/hero-servicios.jpg";
import heroCursos from "../assets/hero-cursos.jpg";
import heroCursoS7 from "../assets/hero-curso-s7.jpg";
import heroCursoTia from "../assets/hero-curso-tia.jpg";
import heroObras from "../assets/hero-obras.jpg";
import heroRecursos from "../assets/hero-recursos.jpg";
import heroContacto from "../assets/hero-contacto.jpg";
import courseS7400Visual from "../assets/course-s7-400.jpg";
import courseTiaPortalVisual from "../assets/course-tia-portal.jpg";

// Inventario responsive del entrypoint: heros, portadas de cursos y logo. Las familias
// que usa una sola ruta (obras, capturas de la app, retrato) se registran desde su módulo
// con registerM2Images para no engordar el chunk de entrada.
const m2ImageModules = {
  ...import.meta.glob(
    [
      "../assets/m2/*.{avif,webp}",
      "!../assets/m2/obra-*",
      "!../assets/m2/app-estado-cpu-*",
      "!../assets/m2/walter-boj-avatar-field-*",
    ],
    { eager: true, import: "default" }
  ),
};

function registerM2Images(modules) {
  Object.assign(m2ImageModules, modules);
}

const heroM2Spec = (stem) => ({
  stem,
  width: 1672,
  height: 941,
  widths: [640, 960, 1672],
  formats: ["avif", "webp"],
  sizes: "100vw",
});

const m2ImageSpecs = new Map([
  [heroInicio, heroM2Spec("hero-inicio")],
  [heroServicios, heroM2Spec("hero-servicios")],
  [heroCursos, heroM2Spec("hero-cursos")],
  [heroCursoS7, heroM2Spec("hero-curso-s7")],
  [heroCursoTia, heroM2Spec("hero-curso-tia")],
  [appProHeroLaptopVisual, heroM2Spec("hero-app")],
  [heroObras, heroM2Spec("hero-obras")],
  [heroRecursos, heroM2Spec("hero-recursos")],
  [heroContacto, heroM2Spec("hero-contacto")],
  [courseS7400Visual, { stem: "course-s7-400", width: 2172, height: 724, widths: [640, 960, 1280], formats: ["avif", "webp"], sizes: "(max-width: 760px) 100vw, 35vw" }],
  [courseTiaPortalVisual, { stem: "course-tia-portal", width: 2172, height: 724, widths: [640, 960, 1280], formats: ["avif", "webp"], sizes: "(max-width: 760px) 100vw, 35vw" }],
  [bojLogo, { stem: "boj-logo-real-cropped", width: 730, height: 232, widths: [240, 480], formats: ["webp"], sizes: "232px" }],
]);

function getM2SourceSet(spec, format) {
  return spec.widths
    .map((width) => `${m2ImageModules[`../assets/m2/${spec.stem}-${width}.${format}`]} ${width}w`)
    .join(", ");
}

function M2Picture({ src, alt, className, sizes, loading = "lazy", decoding = "async", fetchPriority, ...imageProps }) {
  const spec = m2ImageSpecs.get(src);
  if (!spec) {
    return <img src={src} alt={alt} className={className} loading={loading} decoding={decoding} {...imageProps} />;
  }
  const resolvedSizes = sizes || spec.sizes;
  return (
    <picture className="m2-picture">
      {spec.formats.map((format) => (
        <source
          key={format}
          type={`image/${format}`}
          srcSet={getM2SourceSet(spec, format)}
          sizes={resolvedSizes}
        />
      ))}
      <img
        src={src}
        alt={alt}
        className={className}
        width={spec.width}
        height={spec.height}
        sizes={resolvedSizes}
        loading={loading}
        decoding={decoding}
        fetchpriority={fetchPriority}
        {...imageProps}
      />
    </picture>
  );
}

function track(event, params = {}) {
  if (typeof window === "undefined") return;
  try {
    trackVercelEvent(event, params);
    if (typeof window.gtag === "function") window.gtag("event", event, params);
    if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event, ...params });
    if (typeof window.fbq === "function") window.fbq("trackCustom", event, params);
  } catch (_) {
    /* el tracking nunca debe romper la UI */
  }
}

function whatsappUrl(message = "Hola, escribo desde la web de BOJ Automatización y Control para realizar una consulta técnica.") {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

async function sendContactRequest(payload) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || "No se pudo enviar la solicitud.");
  return result;
}

export { M2Picture, getM2SourceSet, heroM2Spec, m2ImageModules, m2ImageSpecs, registerM2Images, sendContactRequest, track, whatsappUrl };
