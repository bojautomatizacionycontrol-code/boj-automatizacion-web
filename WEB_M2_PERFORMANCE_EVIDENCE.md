# WEB-M2 — evidencia de rendimiento, imágenes y recursos públicos

Fecha de medición: 2026-08-31 (America/Buenos_Aires).

Estas mediciones son de laboratorio local. No representan Core Web Vitals de campo.

## Baseline físico y método

- Commit: `f1dd76c039b6ad2fe0efc2433205f30ed0119560`.
- Tree: `1d7f5b727dd58c3cb9a4a6fe873919d54b62d667`.
- Build base reproducido en un worktree detached descartable: 52 archivos en `dist/assets`, `9.504.373 B`.
- Entradas base: JS `519.044 B` (`142.547 B` gzip) y CSS `388.074 B` (`66.158 B` gzip).
- Perfiles: `/`, `/app` y `/cursos/s7-300-400`; 390×844 y 1440×900; frío y caliente.
- Tres muestras por perfil y mediana. Analytics se bloqueó en la capa de red del navegador durante las muestras.
- Los tiempos FCP/LCP y CLS se obtuvieron con Performance APIs del navegador. Los bytes son `transferSize` de recursos físicos.

## Inventario de recursos

El inventario previo al cambio encontró 133 imágenes físicas (`35.008.351 B`): 45 seleccionadas por UI/head (`7.746.029 B`), 6 alcanzables por el grafo sin uso visual y 82 sin referencia. No había `<picture>`, `srcset`, `sizes`, `width`, `height`, `decoding` ni `fetchPriority`; 15 plantillas de imagen eran eager implícitas y 37 lazy.

| Grupo | Fuente preservada | Derivados finales | Dimensiones | Uso y prioridad |
| --- | ---: | ---: | --- | --- |
| 9 heroes BOJ | 9 JPEG, `1.738.636 B` | 54: AVIF/WebP a 640, 960 y 1672 px | fuente 1672×941 | Hero de cada familia ES/EN/PT; eager, async y única prioridad `high`; `sizes=100vw` |
| 2 covers de cursos | 2 JPEG, `322.723 B` | 12: AVIF/WebP a 640, 960 y 1280 px | fuente 2172×724 | listados de cursos ES/EN/PT; lazy, async; `sizes=(max-width: 760px) 100vw, 35vw` |
| Logo BOJ | PNG `94.928 B` | WebP 240 (`17.658 B`) y 480 (`45.224 B`) | fuente 730×232 | header/footer en todas las rutas; eager, prioridad automática |
| Favicon | PNG fuente 512×512, `279.194 B` | SVG, PNG 16/32/48 y Apple 180 | 16–180 px | head; ninguno supera 50 KB |
| OG social | JPEG anterior 1792×592 preservado | 6 JPEG deterministas | 1200×630 | institucional, servicios, App, curso, recursos y contacto; sólo crawlers sociales |
| Avatar Walter | JPEG `124.479 B` | sin recomprimir | 1086×1448 declarado | curso/App, lazy y async |
| Captura de App | JPEG `160.834 B` | sin recomprimir | 1474×588 declarado | portada/App/curso; evidencia protegida |
| Manual 01–08 | 8 JPEG, `1.366.516 B` | sin recomprimir | 1100×1556 | curso; portada declarada y resto lazy |
| Capturas Siemens | PNG/JPEG/JFIF protegidos | sin recomprimir | dimensiones originales | recursos técnicos; lazy |
| Proyectos/clientes | 14 imágenes activas, `2.701.340 B` | sin recomprimir | dimensiones originales | home/obras; lazy; bytes intactos |

Catálogo final M2: 68 archivos en `src/assets/m2` (`3.487.818 B`: 33 AVIF y 35 WebP), todos referenciados; 11 recursos públicos nuevos (`626.153 B`: 5 iconos y 6 OG). No se borró ningún original. El build final contiene 119 assets fingerprinted (`12.722.626 B`): el catálogo multiformato aumenta el artefacto almacenado, pero el navegador descarga sólo el candidato adecuado.

### Hashes de las fuentes transformadas

| Archivo | SHA-256 |
| --- | --- |
| `hero-inicio.jpg` | `7b4e04519c090a9d205cd4554c4f0b81fbf8ae5656c03cbe9efe3a0ad81dfea8` |
| `hero-servicios.jpg` | `a81b162d9523b78a0ffce4a444ce2c54c3dc443cc6f99e4e6b6ad100f7cb700d` |
| `hero-cursos.jpg` | `665588074ef45641223caffa9b4bcc1df60ef5309d23c03b770bf2a0ca50fad2` |
| `hero-curso-s7.jpg` | `bf16aaf1961ce85734b2d04145021241aab9dcfa439e45e7338b68a6ebb1bc2b` |
| `hero-curso-tia.jpg` | `3fc7365da3723ec33724a0e28752ef0ac987720142464108f757e3a3f1d0933a` |
| `hero-app.jpg` | `b985c4c7cdd28e5d8bfe0701cc1f5ca6717a78072fa03d530ffc4de67f4e05d4` |
| `hero-obras.jpg` | `dee354628c83460914c72cc7d9be0523568b0e8e2f3cc9cd18cdc39c587954fa` |
| `hero-recursos.jpg` | `95517873b983d35675352a9019041cb10d636ed52185c3e55b756d6013fed8b6` |
| `hero-contacto.jpg` | `41ca7a0cb893f696a8b1ac0eebd9371a5856348a7cf1ce3e9e2af673c2771e58` |
| `course-s7-400.jpg` | `03d69156e7a93cd29aa4c3685b3043ffc124316ba00692c0323c2d339bfd6f3f` |
| `course-tia-portal.jpg` | `7f933c05bdf5b26e7965c03bcd69188a970564fcbda2c21733584c945bc502d2` |
| `boj-logo-real-cropped.png` | `c07e214f651bd93e2c7b316836d4a843d50eee81e310c63e643681cef9ab36e1` |
| `boj-favicon.png` | `8bd9caad436f885ee853bd8434aa6b9e6d96b5759809f2b34c3327b94d24952c` |

### Favicons

| Archivo | Bytes | Reducción frente a 279.194 B |
| --- | ---: | ---: |
| `favicon-16x16.png` | 542 | 99,81 % |
| `favicon-32x32.png` | 912 | 99,67 % |
| `favicon-48x48.png` | 1.413 | 99,49 % |
| `apple-touch-icon-180x180.png` | 7.898 | 97,17 % |
| `favicon.svg` | 6.893 | 97,53 % |

## Medianas antes/después

### Caché fría

| Ruta | Viewport | Requests | Bytes propios | Imágenes | FCP ms | LCP ms | CLS |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Home | móvil | 8 → 7 | 942.035 → 254.369 (-73,00 %) | 731.026 → 40.462 (-94,47 %) | 588 → 580 | 592 → 584 | 0 → 0 |
| Home | desktop | 9 → 8 | 1.103.169 → 472.453 (-57,17 %) | 892.160 → 258.546 (-71,02 %) | 588 → 572 | 604 → 572 | 0,00178 → 0,00178 |
| App | móvil | 8 → 8 | 964.888 → 418.427 (-56,63 %) | 754.107 → 204.732 (-72,85 %) | 600 → 608 | 616 → 612 | 0 → 0 |
| App | desktop | 8 → 8 | 964.888 → 493.408 (-48,86 %) | 754.107 → 279.713 (-62,91 %) | 612 → 616 | 628 → 616 | 0,00111 → 0,00111 |
| Curso | móvil | 8 → 8 | 944.898 → 417.798 (-55,78 %) | 734.060 → 204.041 (-72,20 %) | 620 → 612 | 620 → 628 | 0 → 0 |
| Curso | desktop | 8 → 8 | 944.898 → 484.070 (-48,77 %) | 734.060 → 270.313 (-63,18 %) | 636 → 624 | 636 → 628 | 0,00416 → 0,00416 |

JS frío: `142.847 → 145.675 B` transferidos (`+1,98 %`). CSS frío: `66.458 → 66.466 B` (`+0,01 %`). Build final exacto: JS `528.659 B`, gzip `145.375 B`; CSS `388.088 B`, gzip `66.166 B`.

### Caché caliente local

| Ruta | Viewport | Bytes propios | Imágenes | FCP/LCP ms | CLS |
| --- | --- | ---: | ---: | ---: | ---: |
| Home | móvil | 884.394 → 1.058.381 | 882.090 → 1.056.015 | 72/72 → 72/72 | 0 |
| Home | desktop | 723.560 → 897.547 | 721.256 → 895.181 | 76/76 → 64/64 | 0 |
| App | móvil | 127.755 → 127.833 | 125.679 → 125.679 | 84/84 → 64/64 | 0 |
| App | desktop | 127.755 → 127.833 | 125.679 → 125.679 | 100/100 → 96/96 | 0 |
| Curso | móvil | 288.946 → 289.029 | 286.813 → 286.813 | 84/84 → 68/68 | 0 |
| Curso | desktop | 288.946 → 289.029 | 286.813 → 286.813 | 100/100 → 84/84 | 0 |

La transferencia caliente de Home local no es una regresión de recursos críticos: el nuevo `loading=lazy` evita descargar `plantVisual` en la primera visita fría, por lo que el servidor local revalidable lo descarga recién durante la segunda navegación; en el baseline ya estaba en caché porque se cargaba eager en frío. En el par frío+caliente Home móvil, el total propio baja de `1.826.429 B` a `1.312.750 B` (-28,13 %). La política `immutable` sólo puede comprobarse físicamente en Vercel Preview.

## Fuentes

- Source/head final solicita sólo Geist 400/500/600/700/800/900.
- Coverage DOM registró y cargó únicamente FontFace `Geist`; no existe FontFace ni request de Inter.
- Los pesos efectivos encontrados van de 400 a 950 y se resuelven sobre los seis pesos publicados; se conservaron.
- Geist continúa como familia efectiva. Inter fue retirado de la petición y de los stacks CSS.

## Caché, metadata y hardening

- Sólo `/assets/*-<hash de 8 o más caracteres>.<ext>` recibe `public, max-age=31536000, immutable`.
- HTML, rutas, 404, sitemap, robots, OG y favicons públicos reciben `public, max-age=0, must-revalidate`; `/api` queda excluido.
- Un gate de build rechaza cualquier archivo físico de `dist/assets` que no tenga fingerprint.
- CSP enforce y sus 34 hashes JSON-LD permanecen deterministas.
- Se añadieron únicamente `nosniff`, `strict-origin-when-cross-origin` y una Permissions-Policy mínima.
- Las 35 rutas y 404 emiten una sola imagen OG/Twitter, tipo JPEG, 1200×630 y alt localizado.

## Enlaces, crawl y consola

- Crawl renderizado: 35/35 rutas con 200 local, H1/main únicos y cero imágenes rotas; 99 destinos internos, ninguno desconocido.
- `404.html`: `noindex, follow`, sin canonical ni JSON-LD.
- Checker externo por 17 destinos únicos: 16 OK; LinkedIn respondió 999, clasificado como protección anti-bot, no como enlace roto. Cero 404/410.
- El enlace WinCC retirado era un 404 permanente. Reemplazo: `https://www.siemens.com/en-us/products/simatic-hmi/wincc-unified-engineering/`, Siemens oficial, 200, WinCC/TIA Portal/HMI/SCADA.
- Consola final: cero entradas inesperadas. Las únicas 49 entradas corresponden al bloqueo deliberado de Vercel Analytics en el harness local.
- Red final: cero imágenes rotas y selección 640/960/1672 correcta en 320/390/768/1440.

## Ciclos internos

1. Implementación inicial: focales y build PASS; JS transferido `+2,42 %`, fuera del presupuesto.
2. Se retiraron variantes runtime redundantes y la optimización no crítica del avatar; build `+1,98 %`, suite y navegador PASS.
3. Se eliminaron sólo derivados nuevos sin referencias; catálogo final 68/68 usado. Focales y build permanecieron PASS.

## Revisión y severidades locales

- P0: 0.
- P1: 0.
- P2: 0.
- P3: el catálogo responsive aumenta `dist/assets` en `3.218.253 B`; es el costo almacenado de servir formatos/tamaños alternativos y no aumenta el payload elegido por navegación. Las 5 alertas de `npm audit` (1 baja, 1 moderada, 3 altas) ya existían en el lock y no se modificaron dependencias.

## Sistemas protegidos

Los tests de invariantes conservan hashes/bloques de `/api/contact`, fiscal/SAS, precios, Hotmart, garantía, reembolsos, Analytics y sus 19 eventos, legal, navegación/accesibilidad WEB-M1 y estado futuro de TIA. El único cambio permitido dentro de `technicalResources` es el href oficial WinCC.
