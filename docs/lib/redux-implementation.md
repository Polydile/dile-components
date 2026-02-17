---
layout: layout.html
title: Redux implementation to use Lib Components
---

# Implementación de Redux en @dile/lib

El package @dile/lib requiere el uso de Redux y Redux Toolkit para ofrecer todo su potencial, ya que los componentes usan esta librería para propagar el estado de elementos como:

- Cajas de diálogo para feedbak al usuario
- Almacenamiento del usuario logueado en la aplicación

> A veces se dice que Redux es complicado para lo que ofrece, pero desde la aparición de Redux Toolkit las cosas se han simplificado mucho, por lo que no consideramos que sea una librería problemática y apreciamos las ventajas que nos ofrece.

## Redux slices

Para facilitar la integración de Redux en las aplicaciones ahora tenemos [Redux Toolkit](https://redux-toolkit.js.org/), que elimina la mayor parte del código boilerplate.

Para facilitar todavía más las cosas @dile/lib ofrece algunas utilidades que permitirán crear los slices de Redux para la gestión del componentes de diálogo y gestión del usuario.

### feedbackSlice

Este slice de Redux Toolkit nos ofrece numerosas utilidades para gestión de componentes de diálogo.

Podemos importarlo así:

```javascript
import { feedbackSlice } from '@dile/lib';
```

Para interactuar con las acciones de feedback en los componentes de tu aplicación puedes implementar el [DileFeedback mixin](/lib/feedback-mixin/), que te ofrece toda una serie de métodos para conseguir gestionar diversos tipos de cajas de diálogo y estados de carga.

### userSlice

Este slice nos permite implementar el estado típico necesario para almacenar el usuario de la aplicación.

Se puede importar así:

```javascript
import { userSlice } from '@dile/lib';
```

## Implementación del store

Para usar esos slices y las acciones que nos ofrecen simplemente tenemos que crear un store en nuestro proyecto, que podremos alojar en el archivo que consideremos necesario, típicamente en la ruta `src/js/redux/store.js`.

El código para configurar el store, usando Redux Toolkit y los slices de @dile/lib sería el siguiente:

```javascript
import { configureStore } from '@reduxjs/toolkit';
import { feedbackSlice } from '@dile/lib';
import { userSlice } from '@dile/lib';

export const store = configureStore({
  reducer: {
    feedback: feedbackSlice.reducer,
    user: userSlice.reducer,
  }
});
```

Por supuesto, tú puedes agregar cualquier otro slice que juzgues oportuno para gestionar el estado global de tu aplicación.
