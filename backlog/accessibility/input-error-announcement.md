# Anunciar los errores de validación en dile-input

## Problema

`dile-input` (y todos los componentes que heredan de él, como `dile-input-icon`, `dile-datepicker` o `dile-datetimepicker`) marca visualmente el error con la propiedad `errored` y muestra el texto de `message`, pero el `<input>` interno:

- No pone `aria-invalid="true"` cuando `errored` está activo.
- No enlaza el mensaje con `aria-describedby`; el `<div class="message">` de `DileFieldMessage` ni siquiera tiene `id`.

Un lector de pantalla no anuncia que el campo es incorrecto ni lee el mensaje de error o de ayuda al enfocar el campo.

Se detectó al añadir `validateDate` a `dile-datepicker`: la validación funciona y marca el campo como no válido para los formularios nativos (`ElementInternals.setValidity`), pero el error solo se comunica de forma visual.

## Alcance

El cambio debería hacerse en la base para que lo hereden todos los inputs:

- `packages/ui/mixins/form/src/DileFieldMessage.js`: dar un `id` estable al contenedor del mensaje.
- `packages/ui/components/input/src/DileInput.js` y `DileInputIcon.js`: añadir `aria-invalid` según `errored` y `aria-describedby` apuntando al mensaje cuando exista.
- Revisar el resto de componentes que usan `messageTemplate` (`dile-otp-input`, `dile-time-picker`, `dile-number-picker`, `dile-color-picker`, `dile-drop-file`, `dile-select-ajax`, `dile-input-phone`…) para ver si heredan el arreglo o necesitan el suyo.

## Referencias en el propio repositorio

Algunos componentes ya lo resuelven y sirven de modelo:

- `dile-input-search`: `aria-invalid` y `aria-describedby` en su `<input>`.
- `dile-checkbox`: `aria-describedby` con un id derivado (`${this._id}-message`).
- `dile-select`: `aria-invalid`, mensaje con `role="status"` y `aria-live="polite"`, y uso de `aria-description` cuando la referencia por id tendría que cruzar el shadow DOM.

Conviene unificar el criterio (por ejemplo, si el mensaje debe ser una región `aria-live`) para que todos los campos se comporten igual.

## Verificación

- Tests de componentes que comprueben `aria-invalid` y `aria-describedby` al activar y desactivar `errored` y `message`.
- Prueba manual con VoiceOver o NVDA: al enfocar un campo con error se anuncia que no es válido y se lee el mensaje.
