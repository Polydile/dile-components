---
title: Crud component
tags: main
---

# dile-crud

The `dile-crud` component is the primary tool for building the CRUD system, combining various components from this library to implement the full functionality of a create, read, update, and delete (CRUD) system.

Additionally, `dile-crud` also offers batch operation management through the definition of action components.

## Installation

```bash
npm i @dile/crud
```

## Usage

Import the dile-crud component.

```javascript
import '@dile/crud/components/crud/crud.js';
```
Use the component.

```html
<dile-crud
  .config=${this.config}
></dile-crud>
```

### Properties

Aquí tienes la descripción de las propiedades:

- **config**: Object, the configuration object that customizes the behavior and functionality of the CRUD system.
- **actionIds**: Array, the list of IDs for the items selected for batch operations.
- **keyword**: String, the search keyword used to filter the items in the CRUD system.

### Methods

- **openInsert()**: Opens the form or interface for inserting a new item into the CRUD system.
- **editItem(id)**: Opens the form or interface to edit the item with the specified `id`.
- **setKeyword(keyword)**: Sets the search keyword used to filter the items within the list system based on the provided `keyword`.
- **attachActionId(id)**: Adds the specified `id` to the list of IDs selected for batch actions.
- **detachActionId(id)**: Removes the specified `id` from the list of IDs selected for batch actions.
- **removeActionItems(idsArray)**: Removes the items with the specified IDs in `idsArray` from the CRUD system.
- **refresh()**: Refreshes the data or content of the CRUD system, reloading the items from the server.

### Events

Este componente está basado en elementos como `dile-crud-list`, `dile-crud-insert`, `dile-crud-update`, `dile-crud-item-delete`, y muchos otros. Por lo tanto, todos los eventos documentados en esos componentes se pueden escuchar en `dile-crud`. Por favor, consulte los componentes mencionados para encontrar información sobre esos eventos.

**Eventos específicos de `dile-crud`:**

- **crud-item-insert**: Dispatched when the system shows the insert form.

## Configuration

Please refer to the [general documentation on the CRUD library](/crud/) to find the established mechanisms for configuring the `dile-crud` component.

## Unpaginated Crud Example

For the correct functioning of the `dile-crud` component, a configuration object is required. Depending on the functionalities requested through the configuration object, various additional components from the CRUD library may also be needed.

### Configuration object

Find the guides for creating the configuration object on the [resource configuration page](/crud/resource-config/).

{% include "componentes-crud/country-config.md" %}

### Item component

The item component serves as a template to display each of the elements in the list.

{% include "componentes-crud/country-item.md" %}

### Resource form component

The resource form provides the necessary fields for adding new elements to the resource. In this case, the same form is used for both insertions and edits, but it is possible to have a different form for each operation.

Instructions on how to create these forms can be found in the `dile-crud-insert` component documentation.

{% include "componentes-crud/country-form.md" %}

### Crud component

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';
import '@dile/crud/components/crud/crud';

export class DemoCountryCrud extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  static get properties() {
    return {
      config: { type: Object },
    };
  }

  constructor() {
    super();
    this.config = window.countryConfig.getConfig();
  }

  render() {
    return html`
      <dile-crud
        .config="${this.config}"
      ></dile-crud>
    `;
  }
}
customElements.define('demo-country-crud', DemoCountryCrud);
</script>
<demo-country-crud></demo-country-crud>
```