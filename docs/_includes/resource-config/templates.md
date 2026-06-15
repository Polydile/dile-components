This property is an object that contains template functions for rendering different parts of the CRUD interface. Each template function uses Lit's `html` template literal to return the DOM structure for that specific part.

**Type:** `Object`

**Default Value:**

```javascript
templates: {
  item: () => templatePlaceholder('item'),
  insertForm: (belongsTo, relationId) => templatePlaceholder('insertForm'),
  updateForm: () => templatePlaceholder('updateForm'),
  help: () => templatePlaceholder('help'),
  detail: () => templatePlaceholder('detail'),
  formActions: (actionName) => html`
    <dile-pages attrForSelected="action" selected="${actionName}">
      <dile-crud-delete-action  action="DeleteAction"></dile-crud-delete-action>
    </dile-pages>
  `,
  relations: () => '',
  formSingleActions: () => '',
}
```

## Template Functions

### `item`
Renders each individual item in the list view.

**Parameters:**
- `item` (Object): The resource element to render

**Returns:** Lit `html` template result

### `insertForm`
Renders the form for creating new items.

**Parameters:**
- `belongsTo` (Object): Parent resource (if applicable)
- `relationId` (String|Number): Parent resource ID (if applicable)

**Returns:** Lit `html` template result

### `updateForm`
Renders the form for editing existing items.

**Parameters:**
- `item` (Object): The resource element being edited

**Returns:** Lit `html` template result

### `help`
Renders the help content shown to users.

**Parameters:** None

**Returns:** Lit `html` template result

### `detail`
Renders the detail view of a single item.

**Parameters:**
- `item` (Object): The resource element to display

**Returns:** Lit `html` template result

### `formActions`
Renders the action buttons that appear in the item form (edit/delete operations).

**Parameters:**
- `actionName` (String): The name of the action being displayed

**Returns:** Lit `html` template result

### `relations`
Renders related resources or relationships for an item.

**Parameters:**
- `item` (Object): The resource element whose relations are being displayed

**Returns:** Lit `html` template result

### `formSingleActions`
Renders custom action buttons for a specific item (in addition to standard CRUD actions).

**Parameters:**
- `actionName` (String): The name of the action being displayed
- `item` (Object): The resource element

**Returns:** Lit `html` template result

## Example

```javascript
import { html } from 'lit';
import { CrudConfigBuilder } from '@dile/crud/lib/CrudConfigBuilder';

export const countryConfig = new CrudConfigBuilder('https://example.com/api/countries', {
  templates: {
    item: (country) => html`<demo-country-item .country=${country}></demo-country-item>`,
    insertForm: () => html`<demo-country-form id="insertform"></demo-country-form>`,
    updateForm: () => html`<demo-country-form id="updateform"></demo-country-form>`,
    help: () => html`<p>This is the help provided to the countries resource.</p>`,
    detail: (country) => html`<demo-country-detail .country="${country}"></demo-country-detail>`,
    relations: (country) => html`
      <p>${country.name}</p>
      <demo-country-relations .country=${country}></demo-country-relations>
    `,
    formSingleActions: (actionName, country) => html`
      <dile-pages attrForSelected="action" selected="${actionName}">
        <demo-set-europe-as-continent-action action="SetEurope" .country=${country}></demo-set-europe-as-continent-action>
        <demo-set-asia-as-continent-action action="SetAsia" .country=${country}></demo-set-asia-as-continent-action>
      </dile-pages>
    `,
  },
});
```

All template functions must return Lit `html` template results to work properly with the Web Components used by the CRUD system.
