# Selector de rango de fechas

> **Requisito previo:** antes de implementar este componente hay que sustituir `LionCalendar` por un calendario propio con modo rango. Ver `backlog/architecture/own-calendar.md`, que explica por qué Lion no permite pintar ni anunciar bien un rango y recoge todo el análisis previo.

## Idea

Un componente de formulario para seleccionar una fecha inicial y una fecha final en un calendario, con soporte para rangos predefinidos y validaciones.

## Problema que resuelve

El catálogo ya incluye un selector de fecha individual (`dile-datepicker` en `@dile/utils`), pero no un control especializado para intervalos. Dos campos de fecha separados pueden dejar al usuario sin una vista conjunta del rango y obligan a cada aplicación a implementar las reglas de selección y validación.

## Comportamiento propuesto

- Permitir seleccionar el inicio y el fin del rango desde un calendario.
- Mostrar claramente el rango seleccionado, incluido el intervalo entre ambas fechas.
- Ofrecer rangos rápidos opcionales, como «Hoy», «Últimos 7 días» o «Este mes».
- Admitir límites como fecha mínima y máxima, y estados deshabilitados.
- Permitir configurar el primer día de la semana y localizar los textos de la interfaz.
- Exponer el rango como un valor coherente (inicio y fin), y notificar los cambios mediante un evento.
- Definir qué sucede si el usuario selecciona primero una fecha posterior a la segunda: reiniciar el rango o normalizar el orden de forma consistente.

## Casos de uso

- Filtros de informes y paneles por periodo.
- Reservas y planificación de estancias.
- Búsqueda de movimientos o actividad entre fechas.

## Límites de alcance

Debe centrarse en la selección de intervalos y complementar el selector de fecha individual existente, no reemplazarlo. La selección de fechas múltiples no contiguas y la edición de reglas complejas de recurrencia podrían quedar fuera de una primera versión.

## Accesibilidad

El calendario debe poder recorrerse con teclado, anunciar el inicio, el fin y el intervalo seleccionado, y no depender solo del color para comunicar el rango. Los campos o controles deben tener etiquetas accesibles y los límites deshabilitados deben comunicarse correctamente.

## Alcance inicial sugerido

Un calendario emergente con navegación por meses, selección de inicio y fin, límites mínimo y máximo, localización y un evento con ambas fechas. Los rangos rápidos pueden ser opcionales.
