---
title: Select Ajax Simple
tags: 'Crud extras'
---

# dile-select-ajax-simple

The `dile-select-ajax-simple` component is a lightweight select element that loads its options from an API endpoint via a single AJAX request. Unlike `dile-ajax-select-crud`, this component has **no search functionality** — it simply fetches all available options once when the component is connected to the DOM.

This makes it ideal for scenarios where:
- The list of options is relatively small
- Users should select from a predefined set of values
- No keyword-based filtering is needed
- You want a simpler, more lightweight component

## Installation

```bash
npm i @dile/crud
```

## Usage

Import the dile-select-ajax-simple component.

```javascript
import '@dile/crud/components/select-ajax-simple/select-ajax-simple.js';
```

Use the component.

```html
<dile-select-ajax-simple
    name="category_id"
    label="Select a category"
    endpoint="https://api.example.com/categories"
    displayProperty="name"
    idProperty="id"
    selectDefaultPlaceholder="Choose a category..."
></dile-select-ajax-simple>
```

## Properties

- **name**: String, the name attribute for form integration.
- **label**: String, the label displayed above the select element.
- **endpoint**: String (required), the URL to fetch options from.
- **displayProperty**: String (default: "name"), the property name used to display option text.
- **idProperty**: String (default: "id"), the property name used as the option value.
- **value**: String, the currently selected value.
- **disabled**: Boolean, disables the select element.
- **errored**: Boolean, applies error visual styling to indicate a validation error.
- **message**: String, a help or error message displayed below the select.
- **selectDefaultPlaceholder**: String (default: "Select an option..."), the text for the empty option.
- **emptyMessage**: String (default: "No data available"), message shown when the API returns no results.
- **ajaxErrorMessage**: String (default: "Error loading data"), message shown when the API request fails.
- **resultDataProperty**: String (default: "data"), the property path in the API response containing the data array.
- **getSelectResultList**: Function, a custom function to extract the data array from the API response. Takes priority over `resultDataProperty`.
- **maxResults**: Number, limit the number of results (passed as a query parameter if `pageParamName` is set).
- **pageParamName**: String, the name of the query parameter used for pagination/result limits.
- **additionalQueryString**: Object, additional query parameters to include in the request.

## Methods

The component provides the following useful methods for form integration and field management:

### clear()

Clears the select value and resets it to an empty string. This method is automatically called by `DileForm.clearData()` when clearing an entire form.

**Usage:**
```javascript
const selectEl = document.querySelector('dile-select-ajax-simple');
selectEl.clear();  // Resets value to ''
```

**When used with DileForm:**
```javascript
class MyForm extends DileForm(LitElement) {
  render() {
    return html`
      <dile-select-ajax-simple name="category" ...></dile-select-ajax-simple>
      <button @click=${() => this.clearData()}>Clear Form</button>
    `;
  }
}
// Calling clearData() will automatically call clear() on the select
```

### clearError()

Clears the error state and error message from the field. Useful when you want to remove validation error indicators after user interaction.

**Usage:**
```javascript
const selectEl = document.querySelector('dile-select-ajax-simple');
selectEl.clearError();  // Removes errored state and message
```

**When used with forms:**
```javascript
// Automatically clears errors when user starts selecting
selectEl.addEventListener('element-changed', (e) => {
  selectEl.clearError();  // Clear error on selection change
});
```

**Related methods:**
- Use `DileForm.clearErrors()` to clear errors on all form fields at once
- Use `DileForm.showError(name, message)` to display validation errors

## Events

The component emits the following events:

- **element-changed**: Fired when the user selects a value. Detail includes:
  - `name`: The name of the field
  - `value`: The selected value

```javascript
const selectEl = document.querySelector('dile-select-ajax-simple');
selectEl.addEventListener('element-changed', (e) => {
  console.log(`Selected: ${e.detail.name} = ${e.detail.value}`);
});
```

## Adapting API Responses

The component can work with different API response formats:

### Custom Response Parser (getSelectResultList)

Provides the most flexibility. Assign a function that extracts the data array from any response structure:

```html
<dile-select-ajax-simple
    endpoint="/api/data"
    .getSelectResultList=${(response) => response.data.items}
></dile-select-ajax-simple>
```

### Using resultDataProperty

For simpler responses, specify the property path as a string:

```html
<dile-select-ajax-simple
    endpoint="/api/categories"
    resultDataProperty="data"
></dile-select-ajax-simple>
```

Works with a response like:
```json
{
  "data": [
    { "id": 1, "name": "Option 1" }
  ]
}
```

### Direct Array Response

If the API returns the array directly, omit both properties:

```html
<dile-select-ajax-simple
    endpoint="/api/items"
></dile-select-ajax-simple>
```

Works with:
```json
[
  { "id": 1, "name": "Option 1" }
]
```

## Configuring Axios

Since `dile-select-ajax-simple` uses Axios internally, you can configure the Axios instance to suit your project's needs. Refer to the [Axios Configuration guide](/crud/axios-configuration/) for details on authentication, headers, interceptors, and other advanced configurations.

## Form Integration

This component is fully compatible with the `DileForm` mixin and integrates seamlessly with form components. When used inside a form with `DileForm`, the component participates in all form operations:

**Supported form operations:**
- `getData()` - Returns the selected value
- `setData(data)` - Sets the value programmatically
- `clearData()` - Clears the value (calls the `clear()` method)
- `resetData()` - Resets to the initial value
- `resetField(name)` - Resets a specific field
- `showError(name, message)` - Displays validation errors
- `clearErrors()` - Clears all error messages

**Example with DileForm:**
```javascript
import { DileForm } from '@dile/ui/mixins/form';
import { LitElement, html } from 'lit';

class MyForm extends DileForm(LitElement) {
  render() {
    return html`
      <form>
        <dile-select-ajax-simple
          name="category"
          label="Select Category"
          endpoint="/api/categories"
        ></dile-select-ajax-simple>
        <button @click=${() => this.getData()}>Get Form Data</button>
        <button @click=${() => this.clearData()}>Clear Form</button>
      </form>
    `;
  }
}
```

## Using in CRUD Filters

The component integrates seamlessly with the `dile-crud-filters-form` for dynamic filtering:

```javascript
const filters = [
  {
    name: 'category',
    label: 'Category',
    endpoint: 'https://api.example.com/categories',
    optionLabelField: 'name',
    optionValueField: 'id',
    type: 'select_ajax',
    resultDataProperty: 'data' // optional
  }
];
```

## Example

```html:preview
<script type="module">
    import { LitElement, html, css } from 'lit';
    import '@dile/crud/components/select-ajax-simple/select-ajax-simple.js';

    export class SelectAjaxSimpleExample extends LitElement {
        static styles = [
            css`
                :host {
                    display: block;
                    font-family: sans-serif;
                }
                .demo {
                    padding: 2rem;
                    max-width: 400px;
                }
                .result {
                    margin-top: 2rem;
                    padding: 1rem;
                    background-color: #f0f0f0;
                    color: #369;
                    border-radius: 4px;
                    display: none;
                }
                .result.show {
                    display: block;
                }
            `
        ];

        constructor() {
            super();
            this.selectedValue = '';
        }

        connectedCallback() {
            super.connectedCallback();
            this.addEventListener('element-changed', (e) => {
                if (e.detail.name === 'tag') {
                    this.selectedValue = e.detail.value;
                    this.requestUpdate();
                }
            });
        }

        render() {
            return html`
                <div class="demo">
                    <dile-select-ajax-simple
                        name="tag"
                        label="Select a tag"
                        endpoint="https://timer.escuelait.com/api/tags"
                        displayProperty="name"
                        idProperty="id"
                    ></dile-select-ajax-simple>

                    <div class="result ${this.selectedValue ? 'show' : ''}">
                        <strong>Selected value:</strong> ${this.selectedValue}
                    </div>
                </div>
            `;
        }
    }

    customElements.define('select-ajax-simple-example', SelectAjaxSimpleExample);
</script>

<select-ajax-simple-example></select-ajax-simple-example>
```

## Comparison with dile-ajax-select-crud

| Feature | dile-select-ajax-simple | dile-ajax-select-crud |
|---------|------------------------|-----------------------|
| Search functionality | ✗ No | ✓ Yes |
| Load on connect | ✓ Single load | ✗ No (searches only) |
| Bundle size | ✓ Lighter | - Heavier |
| Use case | Fixed option lists | Searchable large datasets |

Choose `dile-select-ajax-simple` when you have a small, fixed set of options. Use `dile-ajax-select-crud` when users need to search through a large dataset.
