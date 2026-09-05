// Guías de diagnóstico de BOJ: contenido propio de /recursos-tecnicos. Vive fuera de
// content.js para que el chunk de entrada no cargue este texto en todas las rutas.
export const diagnosticGuides = [
  {
    id: "cpu-s7-300-en-stop",
    kind: "guide",
    path: "/recursos-tecnicos/cpu-s7-300-en-stop",
    title: "CPU S7-300 en STOP: qué revisar antes de tocar nada",
    subtitle:
      "Guía de diagnóstico para una CPU Siemens S7-300 que queda detenida: LEDs, Diagnostic Buffer, causas ordenadas y verificación en campo.",
    description:
      "Cuando la CPU pasa a STOP, el reflejo es mover el selector o cargar el programa. Antes de eso, la CPU ya registró evidencia que ordena la búsqueda y evita repetir la parada.",
    status: "Guía de diagnóstico",
    visualKey: "cpuStop",
    visualLabel: "Captura de BOJ S7-PLC",
    visualAlt: "Pantalla de diagnóstico por estado de CPU en BOJ S7-PLC, con los LEDs RUN, STOP, SF y BF",
    meta: ["S7-300", "LED STOP", "Diagnostic Buffer", "OB de error"],
    sections: [
      {
        title: "Qué estás viendo",
        text:
          "El LED STOP amarillo fijo indica que la CPU no ejecuta el programa cíclico. RUN está apagado y, según la causa, SF o BF pueden estar encendidos. Si STOP parpadea lento, la CPU está pidiendo un borrado total; ese caso tiene un tratamiento distinto y no conviene forzarlo sin respaldo del proyecto.",
        items: [
          "STOP fijo con SF apagado: suele ser una parada manual, un corte de alimentación o un arranque incompleto.",
          "STOP fijo con SF encendido: un evento de error llevó la CPU a STOP y quedó registrado en el Diagnostic Buffer.",
          "STOP fijo con BF encendido: la parada llegó desde la red PROFIBUS, por ejemplo una estación caída sin el OB 86 cargado.",
          "STOP parpadeando: la CPU solicita borrado total. Antes de hacerlo, confirma que existe una copia verificada del proyecto.",
        ],
      },
      {
        title: "Antes de tocar nada",
        text: "Dos minutos de registro evitan horas de prueba y error. Anota lo que la CPU muestra ahora, porque al mover el selector parte de esa evidencia desaparece.",
        note: {
          title: "Registra esto en dos minutos",
          items: [
            "Estado exacto de cada LED: SF, BF, DC5V, FRCE, RUN y STOP.",
            "Posición del selector de modo y si alguien lo movió.",
            "Qué pasó justo antes: corte de energía, carga de programa, cambio de módulo, trabajos eléctricos.",
            "Si otras CPU o estaciones de la misma red también fallaron.",
            "Hora aproximada de la parada, para cruzarla con el Diagnostic Buffer.",
          ],
        },
      },
      {
        title: "Causas probables, en orden",
        text: "Este es el orden en que conviene descartar: de lo más frecuente y simple a lo más costoso.",
        steps: [
          "Selector en STOP o cambio de modo manual, incluido un STOP enviado desde STEP 7.",
          "Evento de error sin OB de tratamiento cargado: acceso a periferia (OB 122), error de programación (OB 121), fallo de estación (OB 86) o de módulo (OB 82). Sin el OB, la CPU pasa a STOP; con el OB cargado, sigue en RUN y avisa con SF.",
          "Diferencia entre el hardware configurado y el instalado: módulo faltante, distinto o mal enclavado, rack de expansión sin alimentación.",
          "Alimentación: DC5V apagado o parpadeando apunta a la fuente o a un consumo excesivo en el rack.",
          "Pérdida del programa tras un corte en CPU antiguas con batería agotada: la CPU arranca vacía y pide borrado total.",
          "Tiempo de ciclo excedido (OB 80) por bucles, comunicación lenta o bloques nuevos.",
        ],
      },
      {
        title: "Verificación paso a paso",
        text: "Con el registro hecho, la secuencia es siempre la misma: leer lo que la CPU guardó, comparar con lo configurado y resolver la causa antes de arrancar.",
        steps: [
          "Conecta STEP 7 y abre Estado del módulo → Búfer de diagnóstico. Anota el evento que llevó a STOP y los tres o cuatro anteriores, con hora y OB.",
          "Compara HW Config online con lo configurado: módulos en rojo, direcciones y estaciones DP en fallo.",
          "Revisa alimentación y fusibles del rack y de los módulos señalados.",
          "Si la causa es de campo, de red o de hardware, resuélvela primero. Poner la CPU en RUN sin eso solo repite la parada.",
          "Recién entonces pasa el selector de STOP a RUN o usa el arranque desde STEP 7, y verifica que SF y BF queden apagados.",
          "Documenta causa, evidencia y acción. Esa nota sirve para la próxima parada y para el OB que falta cargar.",
        ],
      },
      {
        title: "Qué no hacer",
        text: "Tres atajos que agrandan el problema.",
        items: [
          "Borrado total (MRES) sin una copia verificada del proyecto.",
          "Cambiar módulos por descarte antes de leer el Diagnostic Buffer.",
          "Cargar un proyecto sin saber qué versión estaba en la CPU.",
        ],
      },
      {
        title: "Cuándo conviene pedir ayuda",
        text:
          "Si el búfer muestra errores de hardware repetidos, si la CPU vuelve a STOP después de arrancar o si no existe respaldo del proyecto, conviene una intervención con criterio antes de seguir probando.",
      },
    ],
    officialLinks: [
      {
        label: "Siemens Industry Online Support",
        href: "https://support.industry.siemens.com/",
        text: "Manuales de CPU S7-300, listas de eventos del Diagnostic Buffer y notas técnicas oficiales.",
      },
      {
        label: "Siemens STEP 7 / TIA Portal",
        href: "https://www.siemens.com/en-us/products/tia-portal/step7/",
        text: "Información oficial sobre STEP 7, la herramienta con la que se lee el Diagnostic Buffer y el estado de los módulos.",
      },
    ],
  },
  {
    id: "bf-profibus-dp",
    kind: "guide",
    path: "/recursos-tecnicos/bf-profibus-dp",
    title: "BF en PROFIBUS DP: fijo, intermitente y cómo aislar la falla",
    subtitle:
      "Guía de diagnóstico del LED BF en CPU y estaciones Siemens S7-300/400: qué significa cada estado, causas ordenadas y verificación por tramos.",
    description:
      "El LED BF avisa que la CPU perdió comunicación con la red DP. Antes de abrir conectores, conviene saber si falla el bus completo o una sola estación, y en qué tramo.",
    status: "Guía de diagnóstico",
    visualKey: "bfProfibus",
    visualLabel: "Captura de BOJ S7-PLC",
    visualAlt: "Lista de síntomas de BOJ S7-PLC con las entradas BF titilando, ET200 caída y PROFINET",
    meta: ["PROFIBUS DP", "LED BF", "ET200", "Terminación"],
    sections: [
      {
        title: "Qué estás viendo",
        text: "En una CPU S7-300 con interfaz DP integrada, el LED BF rojo tiene dos comportamientos con significado distinto.",
        items: [
          "BF parpadeando: al menos una estación configurada no responde. La red funciona, pero falta un esclavo o no acepta sus parámetros.",
          "BF fijo: error de bus. La CPU no logra comunicar con la red: terminación, velocidad, cortocircuito entre A y B, cable interrumpido cerca del maestro o dirección duplicada.",
          "BF junto con SF: el evento quedó además como alarma de diagnóstico; el Diagnostic Buffer indica la estación.",
          "BF junto con STOP: la caída de estación llevó la CPU a STOP porque el OB 86 no está cargado.",
        ],
      },
      {
        title: "Antes de tocar nada",
        text: "En PROFIBUS, la mitad del diagnóstico es saber qué cayó y qué siguió funcionando.",
        note: {
          title: "Registra esto antes de abrir un conector",
          items: [
            "Si BF es fijo o intermitente, y desde cuándo.",
            "Cuántas estaciones caen: una, un grupo o todas a partir de un punto.",
            "LEDs de los esclavos afectados: SF y BF en el módulo de interfaz de cada ET200.",
            "Si coincide con arranque de motores, soldadura o trabajos eléctricos: pista de interferencia o de cable dañado.",
            "Si hubo cambios recientes de cableado, conectores o direcciones.",
          ],
        },
      },
      {
        title: "Causas probables, en orden",
        text: "Las fallas de PROFIBUS tienen lógica de tramo: en una topología lineal, un problema corta todo lo que está después de él.",
        steps: [
          "Esclavo sin alimentación o con tensión de carga caída: BF parpadea y una sola estación aparece en rojo.",
          "Conector con la terminación activada en una posición intermedia: corta el resto del segmento y todo lo que sigue cae junto.",
          "Terminación ausente en los extremos, o terminación doble en un tramo: BF fijo o intermitente en toda la red.",
          "Extremo terminado sin alimentación: la terminación activa necesita los 5 V del equipo; con el equipo apagado, el bus queda mal terminado.",
          "Cable dañado, pinzado o con longitud excesiva para la velocidad configurada.",
          "Dirección DP duplicada o distinta a la configurada en HW Config, típico tras un reemplazo.",
          "Repetidor sin alimentación o módulo de interfaz con falla.",
        ],
      },
      {
        title: "Verificación paso a paso",
        text: "La secuencia va de la vista general en STEP 7 al tramo físico, no al revés.",
        steps: [
          "En STEP 7, abre HW Config online: las estaciones en fallo aparecen en rojo. Distingue una estación, un grupo o toda la red.",
          "Si cae todo a partir de un punto, ubica el conector o el cable de ese punto: ahí suele estar la terminación mal puesta o el corte.",
          "Revisa cada conector: terminación en ON solo en los dos extremos físicos, OFF en todos los intermedios, y el cable entrante conectado en A1/B1 en los extremos.",
          "Con la red sin tensión, mide entre A y B: con las dos terminaciones correctas la lectura ronda los 110 Ω. Un valor muy alto indica que falta una terminación; uno muy bajo, un cortocircuito.",
          "Confirma las direcciones DP y compáralas con HW Config, sobre todo en estaciones reemplazadas.",
          "Corregido el tramo, verifica que BF se apague y que el OB 86 esté cargado para que una caída futura no detenga la CPU.",
        ],
      },
      {
        title: "Qué no hacer",
        text: "Tres pruebas que parecen rápidas y suelen empeorar la red.",
        items: [
          "Reemplazar módulos de interfaz o la CPU sin haber verificado terminaciones y conectores.",
          "Activar terminaciones en conectores intermedios para probar.",
          "Cambiar la velocidad del bus sin revisar la longitud del cable y los repetidores.",
        ],
      },
      {
        title: "Cuándo conviene pedir ayuda",
        text:
          "Un BF intermitente sin patrón, que aparece con máquinas en marcha o con humedad, suele necesitar medición con analizador de bus y revisión del tendido. Es el tipo de falla donde un diagnóstico ordenado ahorra días de prueba y error.",
      },
    ],
    officialLinks: [
      {
        label: "Siemens Industry Online Support",
        href: "https://support.industry.siemens.com/",
        text: "Manuales de red PROFIBUS, conectores, repetidores y diagnóstico de estaciones ET 200.",
      },
      {
        label: "Siemens STEP 7 / TIA Portal",
        href: "https://www.siemens.com/en-us/products/tia-portal/step7/",
        text: "Información oficial sobre STEP 7, desde donde se lee el estado de cada estación DP en HW Config online.",
      },
    ],
  },
  {
    id: "sf-con-cpu-en-run",
    kind: "guide",
    path: "/recursos-tecnicos/sf-con-cpu-en-run",
    title: "SF encendido con la CPU en RUN: módulos, periferia y señales",
    subtitle:
      "Guía de diagnóstico del LED SF en Siemens S7-300/400 cuando el programa sigue ejecutando: alarmas de módulo, tensión de carga, rotura de hilo y estaciones remotas.",
    description:
      "SF con RUN significa que la CPU registró un error y lo está tolerando. La línea puede seguir produciendo con una señal falsa; conviene encontrar el origen antes de que se convierta en parada.",
    status: "Guía de diagnóstico",
    visualKey: "sfRun",
    visualLabel: "Captura de BOJ S7-PLC",
    visualAlt: "Pantalla de diagnóstico por estado de CPU en BOJ S7-PLC con el LED SF encendido y la CPU en RUN",
    meta: ["LED SF", "OB 82", "Tensión de carga", "Rotura de hilo"],
    sections: [
      {
        title: "Qué estás viendo",
        text:
          "El LED SF, fallo de sistema, se enciende cuando la CPU registra un error de hardware o de programa. Si el OB correspondiente está cargado, la CPU sigue en RUN y el error queda en el Diagnostic Buffer.",
        items: [
          "Alarma de diagnóstico de un módulo (OB 82): rotura de hilo, cortocircuito, falta de tensión de carga o módulo defectuoso.",
          "Fallo de estación o de rack (OB 86) tolerado: una ET200 se cayó y el programa siguió.",
          "Error de programación (OB 121) o de acceso a periferia (OB 122) esporádico: direcciones inexistentes, DB borrado, cambios recientes.",
          "SF en un módulo de señales: el propio módulo indica el canal o el grupo afectado.",
        ],
      },
      {
        title: "Antes de tocar nada",
        text: "Con la CPU en RUN hay tiempo para registrar. Aprovéchalo antes de que alguien reinicie el rack.",
        note: {
          title: "Registra esto en dos minutos",
          items: [
            "Qué módulos tienen SF encendido y en qué rack o estación.",
            "Qué señal o actuador se comporta raro y desde cuándo.",
            "Si falta tensión de carga L+ en algún grupo de salidas: LED del módulo o del borne.",
            "Si hubo trabajos en cableado, sensores, tableros o en el programa.",
          ],
        },
      },
      {
        title: "Causas probables, en orden",
        text: "Del más frecuente y barato de comprobar al que requiere repuesto.",
        steps: [
          "Falta de tensión de carga L+ en módulos de salida: fusible, borne o fuente de 24 V.",
          "Rotura de hilo o cortocircuito en un canal con diagnóstico habilitado: sensor desconectado, cable cortado, lazo de 4-20 mA abierto.",
          "Módulo mal enclavado o con contactos sucios en el bus del rack.",
          "Estación ET200 con un módulo faltante, distinto o sin tensión.",
          "Módulo dañado: SF permanece con el canal desconectado y sin carga.",
          "Error de programa esporádico tras cambios: acceso a un DB o a una dirección de periferia que no existe.",
        ],
      },
      {
        title: "Verificación paso a paso",
        text: "El Diagnostic Buffer y el estado del módulo dicen dónde mirar; el campo confirma.",
        steps: [
          "Abre el Diagnostic Buffer y ubica el evento: el texto indica rack, slot o estación DP, y a veces el canal.",
          "En HW Config online, entra en el módulo señalado: Estado del módulo → Diagnóstico muestra el canal y el tipo de fallo.",
          "Verifica la tensión de carga L+ y los fusibles del módulo indicado antes de tocar el campo.",
          "Si el diagnóstico apunta a un canal, mide el lazo o el sensor: continuidad, alimentación del sensor, corriente de 4-20 mA.",
          "Si con el canal desconectado y sin carga el módulo sigue en SF, corresponde reemplazarlo con la misma referencia y la configuración original.",
          "Confirma que SF se apague y registra la causa.",
        ],
      },
      {
        title: "Qué no hacer",
        text: "Tres decisiones que esconden la falla en lugar de resolverla.",
        items: [
          "Desactivar la alarma de diagnóstico del módulo para que SF se apague.",
          "Cambiar el módulo antes de revisar L+ y el cableado del canal.",
          "Ignorar un SF porque la línea sigue produciendo: una señal falsa puede estar activa.",
        ],
      },
      {
        title: "Cuándo conviene pedir ayuda",
        text:
          "Si el evento aparece y desaparece sin cambios en campo, si hay varios módulos afectados a la vez o si el problema sigue tras reemplazar el módulo, el origen puede estar en alimentación, ruido o bus de rack y conviene un diagnóstico ordenado.",
      },
    ],
    officialLinks: [
      {
        label: "Siemens Industry Online Support",
        href: "https://support.industry.siemens.com/",
        text: "Manuales de módulos de señales S7-300, diagnóstico de canal y estaciones ET 200.",
      },
      {
        label: "Siemens STEP 7 / TIA Portal",
        href: "https://www.siemens.com/en-us/products/tia-portal/step7/",
        text: "Información oficial sobre STEP 7, desde donde se consulta el diagnóstico de cada módulo.",
      },
    ],
  },
];
