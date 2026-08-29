# Alineación comercial con BOJ S7-PLC v8.17.23

**BORRADOR PENDIENTE DE REVISIÓN JURÍDICA PROFESIONAL**

Documento interno de control. No debe publicarse como página para clientes ni interpretarse como asesoramiento jurídico.

## Identidad y alcance verificados

- Dominio comercial: `https://www.bojautomatizacion.com`.
- Proyecto Vercel: `boj-automatizacion-web` (`prj_RbQbJondWmnxTIcbObmRxMB6smO2`).
- Repositorio Git vinculado: `bojautomatizacionycontrol-code/boj-automatizacion-web`.
- Baseline de producción: commit `b91a69b3a3e36b8c3fc50f9cdceceb51344580d0`, deployment `dpl_6x3nWqPaBgAHZT3D6ihKyqQEFhiY`.
- Rama de preparación: `agent/commercial-web-alignment-v8-17-23`, creada desde el baseline anterior en un worktree aislado.
- La app BOJ S7-PLC v8.17.23, su motor, datasets, licenciamiento, backend y Supabase están fuera de alcance y no se modificaron.
- En Hotmart se aplicó una única excepción autorizada: editar sólo la descripción del producto interno `8271939`, checkout `B107066308U`, oferta `l23qsbj9`. No se completaron compras ni se modificó ninguna otra configuración.

## Contrato factual observado

| Oferta publicada | Precio | Modalidad y duración | Dispositivos | Curso | Sin conexión | Garantía pública |
| --- | ---: | --- | ---: | --- | --- | --- |
| Suscripción Mensual BOJ S7-PLC PRO | 49 USD | Suscripción mensual con renovación automática hasta cancelación | 1 | No | Hasta 2 días | 7 días para la transacción inicial de adhesión |
| Licencia Mensual BOJ S7-PLC PRO | 59 USD | Pago único por 1 mes calendario, sin renovación automática | 1 | No | Hasta 2 días | 7 días |
| Licencia Profesional BOJ S7-PLC PRO + Curso | 249 USD | Pago único por 6 meses | Hasta 2 | Sí, acceso permanente | Hasta 2 días | 7 días |
| Licencia Empresarial BOJ S7-PLC PRO + Curso | 549 USD | Pago único por 6 meses | Hasta 10 | Sí, acceso permanente | Hasta 7 días | 7 días |

La prueba gratuita dura 48 horas, funciona sólo en línea y tiene funciones limitadas.

Para la suscripción, la cancelación desde la cuenta de comprador de Hotmart evita cobros futuros. La licencia vigente continúa hasta el final del período ya pagado. Cancelar una suscripción no equivale a solicitar un reembolso.

## Fuentes contrastadas

- Landing pública `/app`, `/en/app` y `/pt/app`, incluidas las cuatro URLs de checkout.
- Datos públicos renderizados por cada checkout de Hotmart: nombre, precio, tipo de pago, descripción y `warrantyDays`.
- Código desplegado y contrato técnico read-only de BOJ S7-PLC v8.17.23: webhook de Hotmart, función SQL de otorgamiento, Trial, idiomas, alcance técnico, períodos, dispositivos, validación sin conexión, cancelación y revocación por reembolso o contracargo.
- Consulta read-only a la base de producción para verificar zona horaria, función vigente y resultados de los casos límite, sin escribir datos.
- Ayuda oficial de Hotmart sobre cancelación de suscripciones y solicitud de reembolsos.
- Páginas vigentes `/terminos`, `/licencias`, `/reembolsos` y `/privacidad` del baseline de producción.

## Cambios preparados

- Se reemplaza cualquier promesa de orden probabilístico por las tres frases aprobadas sobre evidencia y peso relativo.
- Se retiran del render todas las capturas históricas que mostraban porcentajes, “causas más probables” o un ranking. La web conserva únicamente una captura real de subflujo guiado sin esas expresiones; los archivos históricos no se modifican y dejan de formar parte del build activo.
- Se agrega, antes de los planes, la divulgación visible y exacta de idiomas en español, inglés y portugués.
- Se centraliza una matriz factual de las cuatro ofertas para Términos, Licencias y Reembolsos.
- Se documentan Trial, duración, regla exacta del mes calendario, dispositivos, renovación, cancelación, vigencia después de cancelar, relación operativa con Hotmart, garantía, soporte, alcance técnico e idioma del contenido especializado y legal.
- La Política de privacidad conserva su contenido y fecha previos.

## Regla de mes calendario demostrada

La implementación desplegada de BOJ S7-PLC v8.17.23 establece una licencia PRO de `months: 1`. El webhook lee la fecha de compra, pero la función de otorgamiento no la usa para calcular el vencimiento:

- Para una licencia nueva o vencida, la función toma el instante de procesamiento en base de datos (`now()`) y suma `make_interval(months => 1)`.
- Para una licencia todavía vigente, suma ese mes calendario al vencimiento actual.
- La base de producción opera en UTC. PostgreSQL conserva la fecha y hora equivalente del mes siguiente y, cuando el día no existe, ajusta al último día de ese mes.
- La activación posterior en un dispositivo sólo valida o registra el dispositivo: no modifica `starts_at` ni `expires_at`, por lo que no reinicia ni extiende el plazo.

La descripción contractual alineada es:

> Vigencia: un mes calendario. En una licencia nueva o vencida, comienza cuando BOJ procesa la confirmación de pago de Hotmart y activa la licencia; si ya existe una licencia vigente, el mes se suma a su vencimiento actual. Finaliza en la fecha y hora UTC equivalente del mes siguiente; si ese día no existe, finaliza el último día de ese mes a la misma hora UTC. La activación posterior en un dispositivo no reinicia ni extiende el plazo. Es un pago único, no se renueva automáticamente y una nueva vigencia requiere una nueva compra.

### Casos límite comprobados en UTC

| Instante inicial | Vencimiento | Duración física resultante |
| --- | --- | ---: |
| 2025-01-15 14:30:45 | 2025-02-15 14:30:45 | 31 días |
| 2023-01-31 14:30:45 | 2023-02-28 14:30:45 | 28 días |
| 2024-01-31 14:30:45 | 2024-02-29 14:30:45 | 29 días |
| 2024-02-29 14:30:45 | 2024-03-29 14:30:45 | 29 días |
| 2025-11-30 14:30:45 | 2025-12-30 14:30:45 | 30 días |
| 2025-12-31 14:30:45 | 2026-01-31 14:30:45 | 31 días |

## Hotmart antes y después

- Estado anterior observado el `2026-08-29T18:06:07.832Z`: la descripción exacta era `Licencia de uso por 30 días para BOJ S7-PLC PRO, destinada al diagnóstico técnico de sistemas Siemens S7-300 y S7-400. Incluye habilitación de la App PRO para un dispositivo. No incluye el curso de diagnóstico, renovación automática ni acceso permanente. La activación se realiza con el mismo email utilizado en la compra.`; producto interno `8271939`, checkout `B107066308U`, oferta `l23qsbj9`, precio de oferta `59,00 USD`, pago al contado, oferta activa y garantía de 7 días.
- Escritura autorizada: se reemplazó únicamente la descripción y se pulsó **Guardar** una sola vez. No se editó otro control ni se realizó una segunda escritura.
- Estado posterior observado el `2026-08-29T18:12:25.491Z`: la descripción coincide exactamente con la regla anterior, contiene `un mes calendario` y ya no contiene una referencia activa a `30 días`.
- Permanecieron iguales producto `8271939`, nombre, checkout `B107066308U`, URL con `off=l23qsbj9`, offer ID `l23qsbj9`, precio de oferta `59,00 USD`, moneda USD, pago único/al contado, garantía de 7 días, ausencia de renovación, estado activo y resto de la configuración. El precio base visible de `70 USD` y las dos filas de ofertas también permanecieron intactos.
- El checkout público posterior conserva el producto y la oferta correctos y muestra `Pago único`; no se realizó ninguna compra.

## Revisión jurídica requerida

Una revisión profesional debe validar, como mínimo:

1. La identificación completa del proveedor y la ley o jurisdicción aplicable, si corresponde publicarlas.
2. El texto sobre garantía de 7 días, especialmente su aplicación a la adhesión inicial de la suscripción.
3. La distinción entre cancelación, vencimiento, reembolso y contracargo.
4. La licencia personal, límites de dispositivos y efectos de la revocación.
5. La suficiencia de la divulgación de idioma antes de la compra.

La discrepancia entre `30 días` y mes calendario quedó resuelta en Hotmart y en la web preparada. La revisión jurídica profesional continúa siendo obligatoria antes de marcar el Draft PR como Ready, hacer merge o publicar estos cambios en producción.
