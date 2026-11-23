import assert from "node:assert/strict";
import test from "node:test";
import {
  closeWorksSsrRuntime,
  getActualWorkProjects,
  renderActualLedesmaCase,
} from "./helpers/works-ssr.mjs";

test.after(closeWorksSsrRuntime);

test("Ledesma renderiza las fotos originales y adicionales con botones de popup localizados y sin abrir un diálogo durante SSR", async () => {
  const popupLabels = {
    es: "Abrir fotografía en una ventana emergente:",
    en: "Open photograph in a popup:",
    pt: "Abrir fotografia em uma janela sobreposta:",
  };

  for (const [language, popupLabel] of Object.entries(popupLabels)) {
    const project = (await getActualWorkProjects(language))[0];
    const html = await renderActualLedesmaCase(language, project);
    const expectedPhotos = 4 + project.photos.length;
    assert.equal(project.photos.length, 3, `${language}: registros de participación y fotografía del equipo añadidos a la intervención`);
    assert.equal((html.match(/<img\b/g) || []).length, expectedPhotos, `${language}: cuatro fotografías originales más las adicionales`);
    assert.equal((html.match(/<button\b[^>]*type="button"/g) || []).length, expectedPhotos, `${language}: cada fotografía tiene un disparador nativo`);
    assert.equal(html.split(popupLabel).length - 1, expectedPhotos, `${language}: cada disparador anuncia la apertura en la página`);
    assert.ok(!/<a\b|target="_blank"|role="dialog"/.test(html), `${language}: sin pestañas nuevas ni diálogos abiertos en el HTML inicial`);
    assert.equal((html.match(/width="1156" height="534"/g) || []).length, 3, `${language}: dimensiones originales de las tres fotos de apoyo`);
    assert.ok(html.includes('width="1280" height="589"'), `${language}: dimensiones originales de la fotografía principal`);
    for (const photo of project.photos) {
      assert.ok(html.includes(photo.src), `${language}: foto adicional visible`);
      assert.ok(html.includes(photo.caption), `${language}: pie localizado de la foto adicional`);
    }
  }
});
