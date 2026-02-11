---
title: Detail
tags: operations
---

# dile-crud-detail

The `dile-crud-detail` component is used to display the details of a specific item from a resource in a REST API.

It is a simple component that should be populated using a template, which defines how the resource element details will be displayed.

## Installation

```bash
npm i @dile/crud
```

## Usage

Import the dile-crud-detail component.

```javascript
import '@dile/crud/components/detail/crud-detail.js';
```

Use the component.

```html
<dile-crud-detail
  endpoint="https://timer.escuelait.com/api/countries/7"
  .itemDetailTemplate=${(country) => html`<demo-country-detail .country="${country}"></demo-country-detail>`}
></dile-crud-detail>
```

### Properties

- **endpoint**: String, the API endpoint from which the detailed information of the item will be fetched.
- **element**: Object, the item object whose details are to be displayed by the component.
- **itemDetailTemplate**: Object (function), the template used to define how the item’s details are displayed.
- **responseAdapter**: Object, optional. This is the configuration object that customizes how the API data is processed (see the [response adapter page](/crud/response-adapter/))

### Methods

- **refresh()**: Refresh the detail content making a new ajax request.

### Events

- **item-edit**: This event is dispatched when a request is made to edit the item. It sends a detail with a property called `itemId`, which contains the identifier of the item to be edited.
- **item-delete**: This event is dispatched when a request to delete the item is made. The event detail includes a property called `itemId` with the identifier of the item to be deleted.
- **crud-item-detail-loaded**: This event is dispatched when the item details have been successfully loaded from the API. The event detail includes the loaded data.
- **crud-item-detail-load-error**: This event is dispatched when there is an error loading the item details from the API. The event detail includes the error encountered message and data of the server response.


## Generating detail components with the CLI

You have the `g-detail` command from Dile Components CLI available to generate detail components.

```bash
dile g-detail user-detail
```

You can find complete help for this command with `--help`:

```bash
dile g-detail --help
```

## Configuration

For this component to function properly, it is necessary to apply the configurations mentioned on the [CRUD system documentation page](/crud/).

## Examples

### Detail template component

Technically, it's not necessary to build a component to define the details of the item you want to display, as a simple template would be enough. However, to keep things organized and reusable, you would typically use a component dedicated to displaying the details, which also allows you to include additional functionality if needed.

{% include "componentes-crud/country-detail.md" %}

### Crud Detail 

In this example, you can enter any identifier in the text field. When you click the "Show" button, the country with that ID will be loaded and displayed in the `dile-crud-detail` component.

```html:preview
<script type="module">
import '@dile/crud/components/detail/crud-detail.js';
import { LitElement, html, css } from 'lit';

class CrudCountryDetailDemo extends LitElement {
    static styles = [
      css`
        :host {
          display: block;
        }
        dile-crud-detail {
          margin-top: 1rem;
        }
        .hide {
          display: none;
        }
        .message {
          margin-top: 1rem;
          font-size: 0.875rem;  
        }
      `
    ];

    static get properties() {
      return {
        message: { type: String },
        error: { type: Boolean },
      };
    }

    constructor() {
      super();
      this.resource = 'https://timer.escuelait.com/api/countries/';
    }


    render() {
      return html`
        <dile-input label="Country Id" name="countryId" value="7"></dile-input>
        <dile-button @click=${this.showCountry}>Show</dile-button>
        <dile-crud-detail
          class="${this.error ? 'hide' : ''}"
          endpoint="https://timer.escuelait.com/api/countries/7"
          .itemDetailTemplate=${(country) => html`<demo-country-detail .country="${country}"></demo-country-detail>`}
          @crud-item-detail-loaded=${this.detailLoaded}
          @crud-item-detail-load-error=${this.detailLoadError}
        ></dile-crud-detail>
        <p class="message">${this.message}</p>
      `;
    }

    showCountry() {
      const elementId = this.shadowRoot.querySelector('dile-input').value;
      const detailElement = this.shadowRoot.querySelector('dile-crud-detail');
      detailElement.endpoint = this.resource + elementId;

    }

    detailLoaded() {
      this.error = false;
      this.message = 'Element loaded';
    }

    detailLoadError() {
      this.error = true;
      this.message = 'This country does not exists';
    }
  }
  customElements.define('crud-country-detail-demo', CrudCountryDetailDemo);

</script>
<crud-country-detail-demo></crud-country-detail-demo>
```