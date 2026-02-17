---
layout: layout.html
title: Feedback Mixin
---

# Feedback Mixin

Este mixin está diseñado para que cualquier componente de la aplicación pueda realizar mensajes de feedback de una manera cómoda. Implementando el mixin en cualquier componente se podrán incoporar métodos que permiten mostrar mensajes en componentes de toast, cajas modales o crear estados de carga.

## Usage

Para usar este mixin es necesario haber instalado @dile/lib como se indica en la [página inicial de @dile/lib](/lib/).

Además funciona mediante Redux, por lo que es necesario implementar el store de Redux y el feedback slice que aporta @dile/lib, tal como se indica en la página de [implementación de Redux](/lib/redix-implementation).

Una vez tenemos el store en nuestra aplicación, tenemos que importarlo en el componente donde queramos implementar FeedbackMixin y aplicar el mixin proporcionando el store de la aplicación.

Se puede ver a continuación un código de ejemplo:

```javascript
import { store } from '../redux/store.js';
import { DileFeedback } from '@dile/lib';

export class DileApp extends DileFeedback(store)(LitElement) {
   // Código del componente
}
```

## Métodos disponibles

El mixin `DileFeedback` añade al componente una serie de métodos que despachan acciones al store de Redux proporcionado. A continuación se presentan los métodos, su firma, descripción, parámetros y un ejemplo de uso.

### positiveFeedback(message)

- Descripción: Muestra un mensaje de feedback positivo (estado "success").
- Parámetros:
   - `message` (String): Texto del mensaje a mostrar.
- Ejemplo:

```javascript
this.positiveFeedback('Operation completed successfully');
```

### negativeFeedback(message)

- Descripción: Muestra un mensaje de feedback negativo (estado "error").
- Parámetros:
   - `message` (String): Texto del mensaje a mostrar.
- Ejemplo:

```javascript
this.negativeFeedback('There was an error processing the request');
```

### neutralFeedback(message)

- Descripción: Muestra un mensaje neutral o informativo.
- Parámetros:
   - `message` (String): Texto del mensaje a mostrar.
- Ejemplo:

```javascript
this.neutralFeedback('This is an informational message');
```

### startLoading()

- Descripción: Indica el inicio de una operación asíncrona o de cargado (por ejemplo, para mostrar un spinner global).
- Parámetros: ninguno.
- Ejemplo:

```javascript
this.startLoading();
```

### stopLoading()

- Descripción: Indica el fin de la operación de carga iniciada con `startLoading()`.
- Parámetros: ninguno.
- Ejemplo:

```javascript
this.stopLoading();
```

### modalFeedback(message, label = "Close", icon = null)

- Descripción: Abre un modal de feedback con el mensaje proporcionado. Permite opcionalmente indicar la etiqueta del botón de cierre y un icono predefinido.
- Parámetros:
   - `message` (String): Texto a mostrar en el modal.
   - `label` (String, opcional): Texto del botón de cierre. Valor por defecto: `"Close"`.
   - `icon` (String, opcional): Nombre del icono a mostrar. Los iconos disponibles son: `'info'`, `'warning'`, `'success'`, `'error'`. Si se proporciona un nombre válido, el modal mostrará el icono correspondiente.
- Ejemplo:

```javascript
// Modal con icono de éxito y etiqueta personalizada
this.modalFeedback('Saved successfully', 'OK', 'success');
```

### closeModalFeedback()

- Descripción: Cierra el modal de feedback abierto.
- Parámetros: ninguno.
- Ejemplo:

```javascript
this.closeModalFeedback();
```

## Componentes necesarios para el funcionamiento del mixin

Como hemos dicho, estos métodos despachan las acciones definidas en `redux/feedback-slice` proporcinado por @dile/lib y requieren que el `store` y el `feedback-slice` estén correctamente [integrados en la aplicación](/lib/redix-implementation).

Además, para recibir los cambios de estado y mostrar los mensajes de feedback es necesario tener en la aplicación, usualmente en el componente raíz o antes del `</body>` en los sitios web, es necesario tener un componente correctamente asociado al store.

Los componentes que se necesitan están incluidos dentro de @dile/lib y sus páginas de documentación se pueden ver a continuación:

- [Componente de toast](/lib/app-toast-component/)
- [Componente modal](/lib/app-modal-component/)
- [Componente de spiner global](/lib/app-loading-component/)
