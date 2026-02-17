---
layout: layout.html
title: App Toast Component
---

# App Toast Component

En @dile/lib se encuentra un componente de toast que se enlaza de manera cómoda al store de Redux, permitiendo recibir las solicitudes de mensajes de feedback emitidas por [FeedbackMixin](/lib/feedback-mixin/).

## Usage

Para poder usar este componente necesitamos:

- Haber instalado @dile/lib
- Haber configurado el store, con las indicaciones de [implementación de Redux](/lib/redux-implementation/).

### Factoría de componentes

En realidad App Toast Component es una función factoría de componentes, no un componente en sí. Por tanto, hay que invocar la factoría para poder crear la clase del componente.

A la factoría le tenemos que enviar el store con el que deseamos que el componente se enlace.

El código de ejemplo se puede ver a continuación:

```javascript
import { DileAppFeedback } from "@dile/lib";
import { store } from "../../redux/store.js";

customElements.define('dile-app-toast', DileAppFeedback(store));
```

- DileAppFeedback es la factoría de componentes.
- El import del store debe obtener el store implementado en tu propia aplicación
- El customElements.define() realiza el registro del componente.
  - El primer parámetro 'dile-app-toast' indica el nombre del componente que estás creando. Puedes personalizarlo a tu gusto, ya que este código debe residir en tu propia aplicación.
  - El segundo parámetro DileAppFeedback(store) ejecuta la factoría del componente, enviando el store de tu aplicación.

### Implementar tu propio componente registrado

Una vez registrado el componente simplemente lo debes de incluir en tu aplicación, lo que generalmente se hará en el componente raíz.

Primero tendrás que importar tu componente, de la ruta donde lo hayas definido.

```javascript
import './feedback/dile-app-toast.js';
```

Luego tendrás que usar el componente mediante la etiqueta que has usado al registrarlo, en este caso 'dile-app-toast'.

```html
<dile-app-toast></dile-app-toast>
```

Eso es todo! el componente estará activo esperando la aparición de mensajes de feedback.

> Dado que el componente está enlazado con el store de Redux no es necesario hacer ningún tipo de binding para recibir datos de otros componentes de la aplicación, simplemente lo activaremos con los métodos proporcionados en [Feedback Mixin](/lib/feedback-mixin/).
