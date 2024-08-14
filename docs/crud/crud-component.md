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

- **title**: String, title for the crud component. Optional.
- **config**: Object, the configuration object that customizes the behavior and functionality of the CRUD system.
- **actionIds**: Array, the list of IDs for the items selected for batch operations.
- **keyword**: String, the search keyword used to filter the items in the CRUD system.
- **belongsTo**: String, indicates the name of the resource to which the records managed by the `dile-crud` component belong in this instance. 
- **relationId**: String, is the identifier that uniquely identifies the specific resource. 

### Methods

- **openInsert()**: Opens the form or interface for inserting a new item into the CRUD system.
- **editItem(id)**: Opens the form or interface to edit the item with the specified `id`.
- **setKeyword(keyword)**: Sets the search keyword used to filter the items within the list system based on the provided `keyword`.
- **attachActionId(id)**: Adds the specified `id` to the list of IDs selected for batch actions.
- **detachActionId(id)**: Removes the specified `id` from the list of IDs selected for batch actions.
- **removeActionItems(idsArray)**: Removes the items with the specified IDs in `idsArray` from the CRUD system.
- **refresh()**: Refreshes the data or content of the CRUD system, reloading the items from the server.

### Events

This component is based on elements such as `dile-crud-list`, `dile-crud-insert`, `dile-crud-update`, `dile-crud-item-delete`, and many others. Therefore, all events documented in those components can be listened to in `dile-crud`. Please refer to the mentioned components for information on those events.

**Eventos específicos de `dile-crud`:**

- **crud-item-insert**: Dispatched when the system shows the insert form.
- **crud-action-success**: Dispached when an action succeed. The detail of this event includes the properties `msg` with a message from the server response, `action` with the name of the action being responded to, and `data` with any additional data that the backend may have sent as a response. Of course, the backend shoul be developed to send all this data.

## Configuration

Please refer to the [general documentation on the CRUD library](/crud/) to find the established mechanisms for configuring the `dile-crud` component.

## belongTo and relationId configuration

These fields facilitate the implementation of a type of filtering on the items that a `dile-crud` component will allow you to manage. For example, if you are trying to view invoices for the customer with `id=10`, `belongsTo` would be set to "customer" and `relationId` would be set to "10."

This is useful, for example, for managing a specific record on an admin page, like those that can be created using the [`dile-crud-single` component](/crud/crud-single/). For instance, when viewing the details of a country, you could use a `dile-crud` component configured with `belongsTo` and `relationId` to manage all the states within that country directly from the `dile-crud-single` component.

> Note that these configurations must be supported by the backend. The listing component will handle sending the necessary query strings to the backend, ensuring that the records delivered for the listings in this `dile-crud` component are properly filtered.


## Unpaginated Crud Example

For the correct functioning of the `dile-crud` component, a configuration object is required. Depending on the functionalities requested through the configuration object, various additional components from the CRUD library may also be needed.

### Configuration object

Find the guides for creating the configuration object on the [resource configuration page](/crud/resource-config/).

{% include "componentes-crud/country-config.md" %}

### Item component

The item component serves as a template to display each of the elements in the list.

{% include "componentes-crud/country-item.md" %}

### Resource form component

The resource form provides the necessary fields for adding new elements to the resource. In this example, the same form is used for both insertions and edits, but it is possible to have a different form for each operation.

Instructions on how to create these forms can be found in the [`dile-crud-insert`](/crud/crud-insert/) and [`dile-ajax-form`](/crud/ajax-form/) component documentation.

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

## Paginated Crud Example

### Configuration object

Find the guides for creating the configuration object on the [resource configuration page](/crud/resource-config/).

{% include "componentes-crud/board-game-config.md" %}

### Item component

The item component serves as a template to display each of the elements in the list.

{% include "componentes-crud/board-game-item.md" %}

### Resource form component

The resource form provides the necessary fields for adding new elements to the resource. In this case, the same form is used for both insertions and edits, but it is possible to have a different form for each operation.

Instructions on how to create these forms can be found in the `dile-crud-insert` component documentation and `dile-ajax-form`.

{% include "componentes-crud/board-game-form.md" %}

### Action component

For the purposes of this CRUD component demo, we will include a custom batch action.

You can find more information about actions in the [actions section of the CRUD documentation](/crud/actions-configuration/).

{% include "componentes-crud/board-game-change-essential-action.md" %}

### Crud component

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';

class DemoBoardGameCrud extends LitElement {
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
    this.config = window.boardGameConfig.getConfig();
    this.config.customization.hideCheckboxSelection = false;
  }

  render() {
    return html`
      <dile-crud
        .config="${this.config}"
      ></dile-crud>
    `;
  }
}
customElements.define('demo-board-game-crud', DemoBoardGameCrud);
</script>
<demo-board-game-crud></demo-board-game-crud>
```