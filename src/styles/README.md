# Arquitectura CSS WEB-M3

`../styles.css` es el único punto de entrada del CSS histórico. Sus `@import`
son también el contrato de cascada: deben mantenerse en el orden declarado.
`audit.css` y `m1-accessibility.css` continúan cargándose después desde
`main.jsx`, por lo que conservan su prioridad final de WEB-M1/WEB-M2.

La primera modularización es intencionalmente incremental. Cada archivo es un
tramo contiguo del `styles.css` previo; no se reagruparon selectores ni media
queries fuera de su posición original. Así se obtienen fronteras de
mantenimiento sin introducir una reescritura visual.

| Área | Módulos | Responsabilidad |
| --- | --- | --- |
| `foundation/` | `00`, `20` | Tokens, defaults del documento, header y navegación base. |
| `layout/` | `70`, `180`, `210` | Footer, contacto flotante y shells estructurales compartidos. |
| `components/` | `30`, `40`, `140`, `170`, `190`, `250` | Controles, héroes, cards, conversión compartida y paridad ES/EN/PT. |
| `responsive/` | `80` | Pase responsive histórico de la fundación y rutas base. |
| `pages/` | `10`, `50`-`60`, `90`-`130`, `150`-`160`, `200`, `220`-`240`, `260`-`270` | Home y familias de ruta; App/curso agrupan sus funcionalidades visuales pesadas. |

Reglas de evolución:

1. Agregar una regla al módulo semántico más estrecho posible.
2. Mantener junto a cada componente sus breakpoints específicos; usar
   `responsive/` sólo para pases realmente transversales.
3. No mover imports ni trasladar overrides históricos sin una comparación
   visual y de estilos computados específica.
4. Ejecutar `node --test test/web-m3-css-modularity.test.mjs` después de tocar
   el manifiesto o una frontera. Desde septiembre de 2026 la prueba verifica
   estructura y presupuesto, no un hash: el build exige menos de 400 KB sin
   comprimir y cada regla debe apuntar a una clase, id o atributo presente en
   `src/` o en el HTML prerenderizado. Las reglas huérfanas se purgaron en la
   tanda 4 (1331 reglas, 32 % del código fuente); no reintroducir CSS sin uso.
