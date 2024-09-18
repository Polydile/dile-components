---
title: Insert
tags: operations
---

# dile-crud-insert

The `dile-crud-insert` component is essentially a wrapper around [dile-ajax-form](/crud/ajax-form/), configured to perform the operation of inserting records into a REST API more conveniently and with less verbosity.

Additionally, instead of using slots to inject the insertion form for the resource, the component uses a template function assigned via an attribute. This approach offers greater versatility in declaring the insertion form.

## Installation

```bash
npm i @dile/crud
```

## Usage

Import the dile-crud-insert component.

```javascript
import '@dile/crud/components/insert/crud-insert.js';
```
Use the component.

```html
<dile-crud-insert
  title="Insert a country"
  endpoint="api/countries"
  .formTemplate=${ () => html`<demo-country-form id="insertform"></demo-country-form>` }
></dile-crud-insert>
```

### Properties

- **title**: String, optionally you can specify a title to head the form.
- **endpoint**: String, the endpoint of the resource where we want to insert records.
- **actionLabel**: String, the text of the form submission button.
- **belongsTo**: String, specifies the parent resource this record belongs to (See belongsTo explanations below).
- **relationId**: String, the identifier of the parent resource (See belongsTo explanations below).
- **formTemplate**: Object, a function that returns a template. That template should be the component that acts as the form for the record to be inserted. The component must have an identifier (id attribute), typically "insertform".
- **buttonSmall**: Boolean, indicates whether a small button is desired for the form submission button.
- **responseAdapter**: Object, optional. API adapter object. See the [responseAdapter page](/crud/response-adapter/)).
- **formIdentifier**: String, the identifier of the component that acts as the insertion form. If no value is provided for this property, "insertform" is used as the default.
- **language**: String, the feedback messages language. Available 'en', 'es'. Falllback to 'en'.

### Methods

- **setData(data)**: This method sets the data passed as an argument into the corresponding form fields.
- **clearFeedback()**: This method is used to clear the feedback component integrated into the form (it calls `clearFeedback()` on the `dile-ajax-form` component integrated into `dile-crud-insert`).

### Events

- **crud-update-success**: Dispatched when an update operation is successfully completed. It sends the same detail that is received from the `dile-ajax-form` component.

> Since this component is based on `dile-ajax-form`, the events dispatched by it can also be listened to in `dile-crud-update`.

## Configuration

For this component to function properly, it is necessary to apply the configurations mentioned on the [CRUD system documentation page](/crud/)  and on the [dile-ajax-form component page](/crud/ajax-form/).

## BelongsTo and relationId configuration

The configuration of the `belongsTo` and `relationId` properties is used to customize certain form fields when creating records, so that these records are related to another entity.

For example, a country may belong to a continent, and when you create a country, you may want the continent to already be set, such as Europe. Similarly, an invoice belongs to a customer, and when you create an invoice, you want a specific customer to be pre-selected in the form.

To achieve this, the `dile-insert-form` component should be configured with the `belongsTo` and `relationId` attributes. However, the `dile-insert-form` component does not apply this customization to the form directly; it simply passes these configurations to the form template component, which applies them to the required fields.

### Receiving belongsTo data in the Form Component

If you need to work with `belongsTo` and `relationId`, there are two steps to receive these values in the form component.

**Step 1:** The function provided as the form template must accept `belongsTo` and `relationId` as parameters and pass them to the form component.

```javascript
(belongsTo, relationId) => html`<demo-board-game-form id="insertform" belongsTo="${belongsTo}" relationId="${relationId}"></demo-board-game-form>`
```

**Step 2:** The form component should declare both properties and use them to set the necessary form fields.

Typically, this would be done in the `firstUpdated()` method when initializing the form.

```javascript
static get properties() {
  return {
    belongsTo: { type: String },
    relationId: { type: String },
  };
}

firstUpdated() {
  if(this.belongsTo == "country" && this.relationId) {
    this.shadowRoot.getElementById('countryselect').value = this.relationId;
  }
}
```

You will find a complete demo in the examples section.

## Examples

### From component

To implement the insertion component, you will need a component that acts as a form. This component should be developed as outlined in the `dile-ajax-form` documentation.

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
  
    render() {
      return html`
        <dile-crud-insert
          title="Insert a country"
          endpoint="https://timer.escuelait.com/api/countries"
          .formTemplate=${() => html`<demo-country-form id="insertform"></demo-country-form>`}
        ></dile-crud-insert>
      `;
    }
  }
  customElements.define('crud-insert-demo', CrudInsertDemo);
</script>
<crud-insert-demo></crud-insert-demo>
```

## BelongsTo Example

Here you can see an example of the functionality that can be incorporated using the `belongsTo` and `relationId` properties of `dile-crud-insert`.

### From component

Just like in the previous example, you need a component to function as the form. Additionally, this component must also declare the `belongsTo` and `relationId` properties in order to work with them and set the related field accordingly.

{% include "componentes-crud/board-game-form.md" %}

### Insert example

As you can see in the following example, when using the `dile-crud-insert` component, we are sending certain values in the `belongsTo` and `relatedId` properties. These properties are then received in the template function and passed on to the component that serves as the form.

```html:preview
<script type="module">
  import '@dile/crud/components/insert/crud-insert.js'
  import { LitElement, html, css } from 'lit';

  class CrudInsertBoardGameDemo extends LitElement {
    static styles = [
      css`
        :host {
          display: block;
        }
      `
    ];
  
    render() {
      return html`
        <dile-crud-insert
          title="Insert a board game"
          endpoint="https://timer.escuelait.com/api/board-games"
          belongsTo="country"
          relationId="1"
          .formTemplate=${(belongsTo, relationId) => html`<demo-board-game-form belongsTo="${belongsTo}" relationId="${relationId}" id="insertform"></demo-board-game-form>`}
        ></dile-crud-insert>
      `;
    }
  }
  customElements.define('crud-insert-board-game-demo', CrudInsertBoardGameDemo);
</script>
<crud-insert-board-game-demo></crud-insert-board-game-demo>
```