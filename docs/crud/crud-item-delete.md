---
title: Item delete
tags: operations
---

# dile-crud-item-delete

The `crud-item-delete` component is designed to delete a specific record from any resource in a REST API.

This component does not provide any functionality for selecting the record to be deleted; instead, its `delete(itemId)` method must be invoked to trigger the deletion process for the item whose identifier is provided as an argument.

To prevent accidental deletions, a dialog box is displayed to the user before making the Ajax request to delete the record. The user must confirm the deletion request to proceed.


## Installation

```bash
npm i @dile/crud
```

## Usage

Import the dile-crud-item-delete component.

```javascript
import '@dile/crud/components/item-delete/crud-item-delete.js';
```
Use the component.

```html
<dile-crud-item-delete
  endpoint="api/countries"
></dile-crud-item-delete>
<script>
  document.querySelector('dile-crud-item-delete').delete(1);
</script>
```

### properties

- **endpoint**: String, the endpoint of the API resource from which the record will be deleted (without the id)
- **relatedId**: String, the identifier of the specific record to be deleted.
- **apiConfig**: Object, the configuration object for the API, used to retrieve a delete operation error message.
- **confirmMessage**: String, the message displayed in the confirmation dialog before the deletion is processed.
- **cancelLabel**: String, the label for the cancel button in the confirmation dialog.
- **acceptLabel**: String, the label for the accept button in the confirmation dialog.

### Methods

- **delete(itemId)**: Performs the delete operation, first displaying a confirmation dialog to the user.

### Events

- **delete-success**: This event is dispatched when a delete operation is successfully completed. This event does not send any details.
- **delete-error**: This event is dispatched when a delete operation results in a server error. The event detail includes an error message and the previous detail provided by the `dile-ajax` component.

## Configuration

To properly implement this component, we recommend familiarizing yourself with the configuration processes described in the [CRUD library documentation](/crud/).

## Examples

### Full selection and deletion example

This is a complete example of selecting an item in a select field and deleting it. The data is retrieved using a `dile-ajax` component and displayed via a basic `dile-select`.

The example demonstrates the entire flow of selecting the item in order to then use the `dile-crud-item-delete` component. It illustrates that the process of selecting the item is actually much more labor-intensive than the deletion itself.

```html:preview
<script type="module">
import '@dile/crud/components/item-delete/crud-item-delete'
import '@dile/crud/components/ajax/ajax';
import '@dile/ui/components/select/select';
import '@dile/ui/components/button/button';
import { LitElement, html, css } from 'lit';

class DemoDelete extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  static get properties() {
    return {
      countries: { type: Array },
    };
  }

  constructor() {
    super();
    this.countries = [];
  }

  firstUpdated() {
    this.elselect = this.shadowRoot.querySelector('dile-select')
    this.elajax = this.shadowRoot.getElementById('elajax');
    this.elajax.generateRequest();
  }

  render() {
    return html`
      <dile-crud-item-delete
        endpoint="https://timer.escuelait.com/api/countries"
        @delete-success="${this.deleteSuccess}"
      ></dile-crud-item-delete>
      <dile-ajax
        id="elajax"
        url="https://timer.escuelait.com/api/countries"
        method="get"
        @ajax-success=${this.ajaxSuccess}
      ></dile-ajax>
      <dile-select label="Country to delete">
        <select slot="select">
          <option value="0">Select a country</option>
          ${this.countries.map(country => html`<option value="${country.id}">${country.name}</option>`)}
        </select>
      </dile-select>
      <dile-button @click="${this.delete}">Delete</dile-button>
    `;
  }

  ajaxSuccess(e) {
    this.countries = e.detail.data;
  }

  delete() {
    let id = this.elselect.value;
    if(id != 0) {
      this.shadowRoot.querySelector('dile-crud-item-delete').delete(id);
    }
  }

  deleteSuccess() {
    this.elajax.generateRequest();
    this.elselect.value = 0;
  }
}
customElements.define('demo-delete', DemoDelete);
</script>
<demo-delete></demo-delete>
```
