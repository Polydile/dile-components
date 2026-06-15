This property contains the HTML `id` attribute values that are used to identify form elements in the DOM. The CRUD system uses these identifiers to locate and interact with the form components.

**Type:** `Object`

**Default Value:**

```javascript
formIds: {
  insertForm: 'insertform',
  updateForm: 'updateform',
}
```

## Properties

### `insertForm`
The HTML `id` attribute value of the form component used for creating new items.

**Default Value:** `'insertform'`

**Type:** `String`

### `updateForm`
The HTML `id` attribute value of the form component used for editing existing items.

**Default Value:** `'updateform'`

**Type:** `String`

## How Form IDs Work

When you define your templates, the form elements must have an `id` attribute that matches the corresponding value in `formIds`. The CRUD components (`dile-crud-insert`, `dile-crud-update`) use these IDs to locate the form elements and manage their data.

```javascript
templates: {
  insertForm: () => html`
    <demo-country-form id="insertform"></demo-country-form>
  `,
  updateForm: () => html`
    <demo-country-form id="updateform"></demo-country-form>
  `,
}
```

The `id` attribute (`insertform`, `updateform`) must match the values specified in `formIds`.

## Implementing Form Components

Form components used in the CRUD system must implement the [`DileForm` mixin](/mixins/dile-form-mixin/) from `@dile/ui/mixins/form`. This mixin provides essential form methods and functionality required by the CRUD system:

```javascript
import { LitElement, html, css } from 'lit';
import { DileForm } from '@dile/ui/mixins/form';

export class DemoCountryForm extends DileForm(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  render() {
    return html`
      <dile-input label="Name" name="name" id="name" hideErrorOnInput></dile-input>
      <dile-input label="Slug" name="slug" id="slug" hideErrorOnInput></dile-input>
      <dile-select name="continent" id="continent" label="Continent" hideErrorOnInput>
        <select slot="select">
          <option value="">Select...</option>
          <option value="Europe">Europe</option>
          <option value="Asia">Asia</option>
        </select>
      </dile-select>
    `;
  }
}

customElements.define('demo-country-form', DemoCountryForm);
```

The `DileForm` mixin provides methods like:
- `getData()` - Retrieve form data as an object
- `setData(data)` - Set form values from an object
- `clearErrors()` - Clear validation error messages
- `resetData()` - Reset form to initial state

## Customizing Form IDs

You can customize the form identifiers if you prefer different names:

```javascript
export const countryConfig = new CrudConfigBuilder('https://example.com/api/countries', {
  formIds: {
    insertForm: 'country-add-form',
    updateForm: 'country-edit-form',
  },
  templates: {
    insertForm: () => html`
      <demo-country-form id="country-add-form"></demo-country-form>
    `,
    updateForm: () => html`
      <demo-country-form id="country-edit-form"></demo-country-form>
    `,
  },
});
```

**Important:** The `id` attribute values in your templates must exactly match the values defined in `formIds`.
