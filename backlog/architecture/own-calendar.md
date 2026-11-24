# Calendario propio para sustituir a LionCalendar

## Idea

Reescribir `dile-calendar` (`packages/utils/components/datepicker/src/DileCalendar.js`) como un componente propio basado en Lit e `Intl`, en lugar de extender `LionCalendar` de `@lion/ui`. El nuevo calendario debe admitir desde el principio **selección de una fecha y de un rango**, y pasar a ser la base de `dile-datepicker`, `dile-datetimepicker` y del futuro `dile-date-range-picker` (ver `backlog/component-ideas/date-range-picker.md`).

**Este trabajo debe hacerse antes que el selector de rangos.**

## Por qué

- **Dependencia de partes privadas de Lion.** `DileCalendar` sobrescribe o llama métodos con prefijo `__`, que Lion no considera API pública (su propio código tiene comentarios `TODO: rename ... in v1`):
  - Sobrescribe `render()` y `__renderNavigation()`.
  - Llama a `__renderData()`, `__renderPreviousButton()`, `__renderNextButton()`, `__getLocale()` e `__isEnabledDate()`.
  - Depende de que `LionCalendar.requestUpdate()` regenere los días (`__createData()`) en el mismo momento en que cambian `centralDate`, `minDate`, `maxDate`, `selectedDate` o `disableDates`, antes de `willUpdate`.
- **Lion se queda corto para rangos:**
  - Solo existe un `selectedDate`.
  - La plantilla de cada día (`dayTemplate`) y la de la cuadrícula (`dataTemplate`) **no están exportadas**: `@lion/ui/calendar.js` solo exporta `LionCalendar` e `isSameDate`, y el `package.json` de `@lion/ui` solo publica `./exports/*`.
  - `dayPreprocessor` puede modificar los datos de cada día, pero la plantilla solo pinta atributos fijos (`selected`, `today`, `past`, `future`, `previous-month`, `current-month`, `next-month`, `aria-disabled`, `aria-pressed`, `aria-current`), así que no sirve para marcar `range-start`, `range-end` o `in-range`.
  - Varios meses a la vez solo está a medias: `createMultipleMonth` acepta `pastMonths` / `futureMonths` y `dataTemplate` pinta varias tablas, pero la cabecera solo muestra un mes.
- **Peso y alcance de la dependencia.** `@lion/ui` (`^0.27.0` en `packages/utils/package.json`) solo se usa en el datepicker de todo el monorepo. El calendario de Lion son unas 1460 líneas con sus utilidades, y arrastra `LocalizeMixin` y su sistema de traducciones (`msgLit`, un archivo por idioma cargado dinámicamente). Quitarlo aligera `@dile/utils`.
- **Fork o copia: descartados.** Un fork del monorepo de Lion para un solo componente es mantener muchísimo código ajeno. Copiar el código (licencia MIT, se puede conservando el aviso) heredaría su diseño y su sistema de traducciones. Es mejor escribirlo desde cero con `Intl`.

## Errores y particularidades de Lion detectados (no reproducirlos)

- **Años 0–99.** `normalizeDateTime(date)` hace `new Date(date.getFullYear(), date.getMonth(), date.getDate())`, y ese constructor interpreta los años 0–99 como 1900–1999. Con `minDate` en el año 1, el mínimo efectivo era el 1/1/1901 y todos los días anteriores salían deshabilitados. Hoy se evita poniendo el `minDate` por defecto en el año 100 (`EARLIEST_DATE` en `DileCalendar.js`). En el calendario propio, crear siempre las fechas con `setFullYear(año, mes, día)` y comparar días con una clave numérica (`año * 10000 + mes * 100 + día`, como `dayKey` en `DileDatepicker.js`). `__modifyDate` de Lion tiene el mismo problema al calcular los días del mes.
- **`parseDate`** (de `@lion/ui/localize.js`) corta el texto en posiciones fijas según el orden día/mes/año del idioma, y convierte los años menores de 50 en 2000 + año. Es lo que usa hoy `valueToDate` en `DileDatepicker.js`.
- **`formatDate`** usa `Intl.DateTimeFormat` con día y mes de 2 dígitos, más los "postprocessors" del gestor de idioma de Lion.
- **Teclado en los días:** Lion escucha `keyup` (no `keydown`) sobre `#js-content-wrapper`, con un único día con `tabindex="0"` (foco itinerante). Las flechas mueven ±1 día / ±7 días, Re Pág / Av Pág cambian de mes y, con Alt, de año, y Enter / Espacio seleccionan. No gestiona Inicio / Fin. Los tests actuales simulan `keyup`.
- **`centralDate`** solo se ajusta a una fecha habilitada en `firstUpdated` (`__calculateInitialCentralDate`). Si los límites cambian después, no lo hace; `DileCalendar.willUpdate` lo corrige ahora con `findNearestEnabledDate`.
- **`disableDates` indefinido** rompe Lion (`this.disableDates is not a function`) porque se llama al regenerar los días. `DileCalendar.requestUpdate` sustituye los valores vacíos o no válidos de `minDate`, `maxDate` y `disableDates` por los valores por defecto.
- **Traducciones de Lion** para el calendario: `nextMonth`, `previousMonth`, `nextFullYear`, `previousFullYear`, `defaultDisabledDate`, `beforeDisabledDate` y `afterDisabledDate`, en bg, cs, de, en, es, fr, hu, it, nl, pl, ro, ru, sk, tr, uk y zh (no hay catalán). Son las etiquetas de las flechas y el texto oculto de los días no disponibles.

## Qué debe conservar el calendario propio

Todo lo que hoy ofrecen `dile-calendar`, `dile-datepicker` y `dile-datetimepicker`, para que el cambio sea transparente:

### API pública de `dile-calendar`

- Propiedades: `selectedDate`, `centralDate`, `minDate`, `maxDate`, `disableDates`, `firstDayOfWeek`, `weekdayHeaderNotation` (`long` / `short` / `narrow`), `locale`, `minYear`, `maxYear`, `monthYearAcceptLabel`.
- Métodos: `goToNextMonth()`, `goToPreviousMonth()`, `goToNextYear()`, `goToPreviousYear()`, `focusDate(date)`, `focusCentralDate()`, `focusSelectedDate()`, `initCentralDate()`, `findNearestEnabledDate(date)`, `goToDate(date)`, `openMonthYearPicker(column)`, `closeMonthYearPicker()` y el getter `monthYearPickerOpened`.
- Evento `user-selected-date-changed` con `detail.selectedDate`, solo cuando elige el usuario.

### Comportamiento

- Cabecera con mes a la izquierda y año a la derecha, cada uno con flechas anterior/siguiente deshabilitadas en los límites. El mes y el año son botones (`.calendar__navigation-toggle--month` / `--year`, con `aria-expanded`) que abren la capa de selección.
- Capa de mes y año sobre la cuadrícula (sin cambiar el tamaño del overlay), con dos `dile-wheel-picker`. Los meses fuera de los límites aparecen deshabilitados, y los años van de `minYear`/`maxYear` (por defecto ±100 años respecto al actual), recortados por `minDate`/`maxDate` y siempre incluyendo el año mostrado. Los cambios se aplican en vivo, conservando el día si cabe en el nuevo mes (31 de enero → 29 de febrero en bisiesto). Se cierra con el botón de check, volviendo a pulsar la cabecera, Enter o Escape. Escape solo cierra la capa (`preventDefault` + `stopPropagation`; `dile-menu-overlay` respeta `preventDefault`). Los eventos de los wheel pickers no salen del calendario.
- Días: semántica `role="grid"` / `gridcell`, un solo día con `tabindex="0"`, texto oculto con la fecha completa, y atributos `selected`, `today`, `previous-month`, `next-month` y `aria-disabled`. Los clics en días deshabilitados se ignoran.
- Las fechas de antes de 1901 (y desde el año 100) deben poder elegirse.

### Integración con el datepicker

Lo hace `DileDatepicker.js` y debería seguir funcionando igual:

- `minDate` / `maxDate` como `Date` o `"YYYY-MM-DD"` (`toCalendarDate`), y `disableDates`.
- Al abrir: `syncCalendarWithValue()` pasa el valor del input a `selectedDate` (`valueToDate`: ISO o formato del idioma) y muestra su mes. Con el overlay visible (`overlay-ready`), el foco va al día. Al cerrar con el foco dentro, este vuelve a donde estaba o al botón del icono.
- `validateDate`, `validationMessages`, `validate()`, `getDateValidation()`, y la reescritura de fechas válidas al formato del idioma.
- `locale` afecta al calendario y al formato del texto. El datetimepicker usa `YYYY-MM-DD HH:mm:ss`.

### Custom properties de estilo

`--dile-calendar-day-background-color`, `--dile-calendar-day-border-radius`, `--dile-calendar-day-size`, `--dile-calendar-day-text-color`, `--dile-calendar-today-background-color`, `--dile-calendar-out-day-text-color`, `--dile-calendar-nav-buttons-color`, `--dile-calendar-navigation-justify-content`, `--dile-calendar-navigation-text-size`, `--dile-calendar-wheel-item-height`, `--dile-calendar-wheel-font-size`, `--dile-calendar-wheel-text-color`, `--dile-calendar-wheel-selected-text-color`, `--dile-calendar-wheel-band-background-color`, `--dile-calendar-month-year-accept-color` y `--dile-calendar-month-year-accept-border-color`. Además, la hoja de estilos base de Lion (`calendarStyle.js`), cuyo aspecto conviene igualar.

## Qué debe añadir

- **Modo rango** (por ejemplo `selection="single" | "range"`), con `rangeStart` / `rangeEnd`:
  - El primer clic fija el inicio y el segundo el fin; si el segundo es anterior, se intercambian. Un tercer clic empieza un rango nuevo.
  - Vista previa del rango al pasar el ratón o al moverse con el teclado.
  - Atributos `range-start`, `range-end` e `in-range` en los días, pintados con custom properties y sin depender solo del color (inicio y fin con forma distinta).
  - Anunciar inicio, fin e intervalo a los lectores de pantalla, por ejemplo con una región `aria-live`: «Del 3 al 10 de marzo».
  - Un evento con `{ start, end }`.
- **Varios meses opcionales** (`visibleMonths`), con cabecera y navegación por teclado coherentes entre meses. Puede quedar para una segunda fase.
- **Inicio / Fin** en el teclado de los días (primer y último día de la semana), si se considera útil.
- **Plantilla de día extensible**: un método protegido para pintar cada día, de modo que los componentes hijos puedan añadir marcas como festivos o eventos.

## Piezas que hay que reimplementar

| Hoy (Lion) | Calendario propio |
|---|---|
| Nombres de meses y días (`getMonthNames`, `getWeekdayNames`) | `Intl.DateTimeFormat(locale, { month: 'long' })` / `{ weekday }` |
| Cuadrícula (`createMultipleMonth`, `createMonth`, `createWeek`, `createDay`) | Función propia: 6 semanas × 7 días según `firstDayOfWeek` |
| `dataTemplate` / `dayTemplate` | Plantillas Lit propias y extensibles |
| Teclado y foco itinerante (`__keyboardNavigationEvent`, `__modifyDate`) | Implementación propia, con cuidado con los años < 100 |
| `findNearestEnabledDate` / `__findBestEnabledDateFor` | Búsqueda propia hacia delante y hacia atrás, con tope |
| Traducciones (`LocalizeMixin`, `msgLit`) | Textos propios por idioma con posibilidad de sobrescribirlos, como `validationMessages` del datepicker; añadir catalán |
| `parseDate` / `formatDate` de `@lion/ui/localize.js` | Utilidades propias con `Intl.DateTimeFormat#formatToParts` para el orden día/mes/año; mantener la regla de los años de 2 dígitos o documentar el cambio |

Al terminar, quitar `@lion/ui` de `packages/utils/package.json` si ya no se usa (no subir versiones internas de `@dile/*` a mano; lo hace Lerna al publicar).

## Archivos implicados

- `packages/utils/components/datepicker/src/DileCalendar.js`: se reescribe.
- `packages/utils/components/datepicker/src/DileDatepicker.js` y `DileDatetimepicker.js`: dejan de importar de `@lion/ui/localize.js`.
- `packages/utils/components/datepicker/calendar.js` e `index.js`: registro y exportación de `dile-calendar` (mismo nombre de etiqueta).
- Tests: `calendar.spec.js`, `datepicker.spec.js` y `datetimepicker.spec.js`.
- Documentación: `docs/components/dile-datepicker.md` y `dile-datetimepicker.md`. Valorar una página propia para `dile-calendar`, que hoy no tiene.
- Demos: `demos/utils/dile-datepicker.html` y `dile-datetimepicker.html`. También usan el datepicker `demos/ui/dile-modal.html`, `demos/ui/form-data.html` y `docs/assets/js/index.js`.

## Plan sugerido

1. Escribir primero las utilidades puras (cuadrícula, comparación de días, búsqueda de fecha habilitada, formateo y parseo con `Intl`) con tests de Node (`node:test`), como `packages/ui/lib/otp/*.test.js`.
2. Reescribir `DileCalendar` sin Lion, manteniendo la API y las clases/atributos que usan los tests actuales. Los tests de `calendar.spec.js`, `datepicker.spec.js` y `datetimepicker.spec.js` (45 tests a fecha de este análisis) son la red de seguridad: deben seguir pasando, salvo los que simulan `keyup`, que se adaptarán si el teclado pasa a `keydown`.
3. Pasar `DileDatepicker` a las utilidades propias de formateo y parseo.
4. Añadir el modo rango al calendario, con sus tests.
5. Quitar `@lion/ui`.
6. Después, abordar `dile-date-range-picker` sobre este calendario.

## Verificación

- `npm run test:components` completo, no solo el datepicker: `dile-menu-overlay` y otros componentes comparten el comportamiento de Escape y del foco.
- Revisión en el navegador integrado y en móvil (por la red local, con el servidor de Vite y `--host`): navegación, capa de mes/año, límites, tema "styled", `locale="es-ES"`, `weekdayHeaderNotation="narrow"` y validación.
- Prueba con lector de pantalla de la cuadrícula y, cuando exista, del rango.
