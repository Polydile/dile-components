---
title: Crud Insert
tags: crud
---

# dile-crud-insert

The `dile-crud-insert` component is essentially a wrapper around [dile-ajax-form](/crud/ajax-form/), configured to perform the operation of inserting records into a REST API more conveniently and with less verbosity.

Additionally, instead of using slots to inject the insertion form for the resource, the component uses a template function assigned via an attribute. This approach offers greater versatility in declaring the insertion form.

## Installation

```bash
npm i @dile/crud
```

## Usage

Import the dile-ajax component.

```javascript
import '@dile/crud/components/crud-insert/crud-insert.js';
```
Use the component.

```html
<dile-crud-insert
  title="Insert a country"
  endpoint="api/countries"
  .apiConfig=${this.apiConfig}
  .formTemplate=${html`<demo-countries-form id="form"></demo-countries-form>`}
></dile-crud-insert>
```

### Properties

- **title**: String, optionally you can specify a title to head the form.
- **endpoint**: String, the endpoint of the resource where we want to insert records.
- **actionLabel**: String, the text of the form submission button.
- **belongsTo**: String, specifies the parent resource this record belongs to.
- **relationId**: String, the identifier of the parent resource.
- **formTemplate**: Object, the template with the component that acts as the form for the record to be inserted. The component must have an identifier (id attribute), typically "insertform".
- **buttonSmall**: Boolean, indicates whether a small button is desired for the form submission button.
- **apiConfig**: Object, an API configuration object (see examples below).
- **formIdentifier**: String, the identifier of the component that acts as the insertion form. If no value is provided for this property, "insertform" is used as the default.

**Methods**

- **setData(data)**: This method sets the data passed as an argument into the corresponding form fields.
- **clearFeedback()**: This method is used to clear the feedback component integrated into the form (it calls `clearFeedback()` on the `dile-ajax-form` component integrated into `dile-crud-insert`).

**Events**

- **crud-insert-success**: Dispatched when an insertion operation is successfully completed. It sends the same detail that is received from the `dile-ajax-form` component.

## Configuration

For this component to function properly, it is necessary to apply the configurations mentioned on the [CRUD system documentation page](/crud/)  and on the [dile-ajax-form component page](/crud/ajax-form/).

## Examples

### From component

To implement the insertion component, we will need a component that acts as a form. This component should be developed as outlined in the `dile-ajax-form` documentation.

{% include "componentes-crud/country-form.md" %}

### Insert example

```html:preview
<script type="module">
  import '@dile/crud/components/insert/crud-insert.js'
  import { LitElement, html, css } from 'lit';

  class CrudInsertDemo extends LitElement {
    static styles = [
      css`
        :host {
          display: block;
        }
      `
    ];

    constructor() {
      super();
      this.apiConfig = {
        responseDataGetter: response => response.data,
        responseMessageGetter: response => response.message,
        validationErrorsGetter: response => response.errors,
      }
    }
  
    render() {
      return html`
        <dile-crud-insert
          title="Insert a country"
          endpoint="https://timer.escuelait.com/api/countries"
          .apiConfig=${this.apiConfig}
          .formTemplate=${html`<demo-countries-form id="insertform"></demo-countries-form>`}
        ></dile-crud-insert>
      `;
    }
  }
  customElements.define('crud-insert-demo', CrudInsertDemo);
</script>
<crud-insert-demo></crud-insert-demo>
```