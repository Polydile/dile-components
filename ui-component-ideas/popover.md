# Popover de contenido

## Idea

Un panel de contenido contextual que se abre junto a un elemento disparador y puede contener controles, texto o acciones.

## Problema que resuelve

Un tooltip está pensado principalmente para información breve, mientras que un modal interrumpe el flujo y un menú suele centrarse en una lista de acciones. Un popover cubriría el caso intermedio: contenido más rico, asociado espacialmente a un control y sin ocupar toda la pantalla.

## Comportamiento propuesto

- Asociarse a un disparador y posicionar el panel alrededor de este, ajustándose al espacio disponible.
- Admitir contenido arbitrario, incluidos enlaces, controles de formulario y acciones.
- Definir formas de apertura y cierre configurables: activación, Escape y, cuando proceda, clic fuera.
- Permitir que la aplicación controle su estado y reciba eventos de apertura y cierre.
- Evitar que varios paneles se solapen o queden abiertos accidentalmente cuando la aplicación establece una política de exclusividad.
- Gestionar el foco de acuerdo con el tipo de contenido: no moverlo innecesariamente para contenido informativo y facilitar su entrada y salida cuando contiene controles.

## Casos de uso

- Formularios compactos de edición contextual.
- Detalles adicionales asociados a un botón o elemento.
- Acciones secundarias que no necesitan una ventana modal.

## Límites de alcance

No sustituye al tooltip para descripciones cortas ni al modal para flujos que requieren atención exclusiva. Antes de implementarlo, conviene valorar si el posicionamiento y el comportamiento existentes de `dile-menu-overlay` pueden reutilizarse como base, evitando duplicar infraestructura.

## Accesibilidad

El disparador debe comunicar que abre contenido adicional. El cierre con Escape, el orden del foco y la devolución del foco al disparador deben ser consistentes. El clic fuera no debe ser la única manera de cerrar el panel, y el contenido no debe quedar inaccesible por problemas de posicionamiento.

## Alcance inicial sugerido

Disparador configurable, panel con contenido arbitrario, posicionamiento adaptable, control de estado, cierre con Escape y opción de cierre por clic exterior. Definir explícitamente el comportamiento del foco según el contenido.
