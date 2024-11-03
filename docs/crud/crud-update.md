---
title: Update
tags: operations
---

# dile-crud-update

The `dile-crud-update` component functions as a wrapper around `dile-ajax-form`, already configured to perform update operations on a record in a REST API.

Its operation is very similar to `dile-crud-insert`, offering nearly the same properties and methods. Additionally, this component is also capable of automatically retrieving the data of the record to be updated directly through the resource configured in its `endpoint` property.

## Installation

```bash
npm i @dile/crud
```

## Usage

Import the dile-crud-update component.

```javascript
import '@dile/crud/components/update/crud-update.js';
```
Use the component.

```html
<dile-crud-update
  title="Update a country"
  endpoint="api/countries"
  relatedId="4"
  .formTemplate=${() => html`<demo-country-form id="updateform"></demo-country-form>`}
></dile-crud-update>
```

### Properties

- **title**: String, optionally you can specify a title to head the form.
- **endpoint**: String, the endpoint of the related resource (without its id).
- **relatedId**: String, the id of the record you want to edit in the resource.
- **actionLabel**: String, the text of the form submission button.
- **loadOnInit**: Boolean, if true the record data is loaded into the form on the component initialization.
- **formTemplate**: Object, a function that returns a template. That template usually has the component that acts as the form for the record to be updated. The component must have an identifier (id attribute), typically "updateform".
- **buttonSmall**: Boolean, indicates whether a small button is desired for the form submission button.
- **responseAdapter**: Object, optional. An API configuration object (see the [response adapter page](/crud/response-adapter/)).
- **formIdentifier**: String, the identifier of the component that acts as the update form. If no value is provided for this property, "updateform" is used as the default.
- **language**: String, the feedback messages language. Available 'en', 'es'. Falllback to 'en'.
- **sendDataAsFormData**: Boolean, default false. If sendDataAsFormData property is set to true, the `dile-ajax-form` component will send a formData object to the server instead of a JSON object.
- **showCancelButton**: Boolean, default false. If true, this component renders a cancel button.
- **setDataOnInit**: Boolean, default is `false`. If `true`, this component initializes the form element values using the `data` object property.
- **data**: Object, used only when `setDataOnInit` is `true`, to populate the form element values with its data.

### Methods

- **edit(id)**: This method causes the update form to load the record with the identifier passed as an argument.
- **clearFeedback()**: his method is used to clear the feedback component integrated into the update form (it calls `clearFeedback()` on the `dile-ajax-form` component integrated into `dile-crud-update`).

### Events

- **crud-update-success**: Dispatched when an update operation is successfully completed. It sends the same detail that is received from the `dile-ajax-form` component.

> Since this component is based on `dile-ajax-form`, the events dispatched by it can also be listened to in `dile-crud-update`.

### CSS custom properties

See the `dile-ajax-form` documentation to find the available custom CSS properties.


## Configuration

To properly implement this component, we recommend familiarizing yourself with the configuration processes defined in the [CRUD library documentation](/crud/) and also [dile-ajax-form component page](/crud/ajax-form/).

## Examples

### Form component

To implement the update component, we will need a component that acts as a form. This component should be developed as described in the `dile-ajax-form` documentation.

{% include "componentes-crud/country-form.md" %}

### Update example

```html:preview
<script type="module">
  import '@dile/crud/components/update/crud-update.js'
  import { LitElement, html, css } from 'lit';

  class CrudUpdateDemo extends LitElement {
    static styles = [
      css`
        :host {
          display: block;
        }
      `
    ];

    static get properties() {
      return {
        relatedId: { type: String },
      };
    }

    constructor() {
      super();
      this.relatedId = '1';
    }
  
    render() {
      return html`
        <dile-crud-update
          title="Update a country"
          endpoint="https://timer.escuelait.com/api/countries"
          loadOnInit
          relatedId="${this.relatedId}"
          .formTemplate=${() => html`<demo-country-form id="updateform"></demo-country-form>`}
        ></dile-crud-update>
      `;
    }
  }
  customElements.define('crud-update-demo', CrudUpdateDemo);
</script>
<p>
  This component attempts to load the country with `id=1` in the form. This country may not exist if someone has deleted it. (All database records are restored daily).
</p>
<crud-update-demo></crud-update-demo>
```

### Implement a id select that sends the id to the update component

```html:preview
<script type="module">
  import { LitElement, html, css } from 'lit';

  class CrudUpdateDemoSelector extends LitElement {
    static styles = [
      css`
        :host {
          display: block;
        }
        dile-select {
          margin-bottom: 1.5rem;
        }
      `
    ];

    static get properties() {
      return {
        relatedId: { type: String },
      };
    }

    constructor() {
      super();
      this.relatedId = '1';
    }
  
    render() {
      return html`
        <dile-select
          label="Select a country to edit"
          value="${this.relatedId}"
          @element-changed="${this.changeId}"
        >
          <select slot="select">
            <option value="1">Argentina (id 1)</option>
            <option value="2">Australia (id 2)</option>
            <option value="3">Belgium (id 3)</option>
          </select>
        </dile-select>

        <dile-crud-update
          title="Update a country"
          endpoint="https://timer.escuelait.com/api/countries"
          loadOnInit
          relatedId="${this.relatedId}"
          .formTemplate=${() => html`<demo-country-form id="updateform"></demo-country-form>`}
        ></dile-crud-update>
      `;
    }

    changeId(e) {
      this.relatedId = e.detail.value;
    }
  }
  customElements.define('crud-update-demo-selector', CrudUpdateDemoSelector);
</script>
<crud-update-demo-selector></crud-update-demo-selector>
```