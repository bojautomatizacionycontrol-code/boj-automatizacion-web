import { m2ImageSpecs, registerM2Images } from "../app/shared-eager.jsx";

// Fotos de obras vigentes. Los originales viven en src/assets/services-works y sus
// variantes AVIF/WebP en src/assets/m2/obra-*.
const serviceWorkImageModules = import.meta.glob([
  "../assets/services-works/*.{png,jpg,jpeg,webp}",
  "!../assets/services-works/panel app.png",
  "!../assets/services-works/panel app 2.png",
], {
  eager: true,
  import: "default",
});

registerM2Images(import.meta.glob("../assets/m2/obra-*.{avif,webp}", { eager: true, import: "default" }));

const getServiceWorkImage = (fileNames) => {
  const candidates = Array.isArray(fileNames) ? fileNames : [fileNames];

  for (const fileName of candidates) {
    const image = serviceWorkImageModules[`../assets/services-works/${fileName}`];
    if (image) return image;
  }

  return "";
};

const projectWorkImageFiles = [
  "obra-generador-weg-bt40.jpg",
  "obra-sistema-contra-incendios.jpg",
  "obra-evaporador-calsa.jpg",
  "obra-generadores-tg3-tg4.jpg",
  "obra-motocompresores-tgn.jpg",
  "obra-planta-de-agua.jpg",
  "obra-envolvedora-papel.jpg",
  "obra-envasadora.jpg",
];

const projectM2Spec = (stem) => ({
  stem,
  width: 1280,
  height: 960,
  widths: [480, 768, 1280],
  formats: ["avif", "webp"],
  sizes: "(max-width: 760px) 100vw, 34vw",
});

for (const fileName of projectWorkImageFiles) {
  const image = serviceWorkImageModules[`../assets/services-works/${fileName}`];
  if (image) m2ImageSpecs.set(image, projectM2Spec(fileName.replace(/\.[a-z]+$/i, "")));
}

export { getServiceWorkImage, projectWorkImageFiles, serviceWorkImageModules };
