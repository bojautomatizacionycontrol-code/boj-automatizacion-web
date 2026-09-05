Fotos de obras usadas por Inicio y Obras (orden de `projectWorkImageFiles` en src/routes/shared.jsx):

- obra-generador-weg-bt40.jpg
- obra-sistema-contra-incendios.jpg
- obra-evaporador-calsa.jpg
- obra-generadores-tg3-tg4.jpg
- obra-motocompresores-tgn.jpg
- obra-planta-de-agua.jpg
- obra-envolvedora-papel.jpg
- obra-envasadora.jpg

Cada foto tiene variantes AVIF y WebP en src/assets/m2 (480, 768 y 1280 px) generadas con sharp-cli:
`npx sharp-cli -i <foto>.jpg -o m2/<stem>-<ancho>.avif -f avif -q 55 resize <ancho>`.
Los demás archivos de esta carpeta no se usan en el sitio.
