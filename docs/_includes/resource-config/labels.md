This property is an object that contains custom labels for various UI elements in the CRUD interface. Labels are used for buttons, window titles, and other user-facing text throughout the components.

Each label is optional. If not provided, the system will fall back to translated values (if translations are available) or default English text.

**Type:** `Object`

**Default Value:**

```javascript
labels: {
  // All properties are optional
}
```

## Available Labels

### `insertAction`
Label for the button that opens the insert/create form.

**Default fallback:** `translations.insert_label` → `'Insert'`

### `insertWindowTitle`
Title shown in the modal window when creating a new item.

**Default fallback:** `translations.insert_label` → `'Insert'`

### `updateAction`
Label for the save/update button in the edit form.

**Default fallback:** `translations.update_label` → `'Save'`

### `updateWindowTitle`
Title shown in the modal window when editing an existing item.

**Default fallback:** `translations.update_label` → `'Save'`

### `startUpdateAction`
Label for the button that opens the edit form for an existing item.

**Default fallback:** `translations.start_update_label` → `'Edit'`

### `helpTitle`
Title for the help section/modal.

**Default fallback:** `translations.help_label` → `'Help'`

### `helpButtonLabel`
Label for the help button.

**Default fallback:** `translations.help_label` → `'Help'`

## How Labels Are Computed

The CRUD system uses a fallback chain when rendering labels. For each label, it checks:

1. **Custom label value** - If a value is provided in `config.labels`, it will be used
2. **Translation** - If no custom label is provided, the system looks for a translated value (e.g., `translations.insert_label`)
3. **Default text** - If neither a custom label nor translation is found, a default English value is used

This allows you to:
- Customize labels for specific needs while keeping translations as a fallback
- Support multiple languages through translations
- Provide sensible English defaults when neither customization nor translations are available

## Example

```javascript
import { html } from 'lit';
import { CrudConfigBuilder } from '@dile/crud/lib/CrudConfigBuilder';

export const countryConfig = new CrudConfigBuilder('https://example.com/api/countries', {
  labels: {
    helpTitle: 'Countries Help',
    insertAction: 'Add Country',
    insertWindowTitle: 'Create New Country',
    updateAction: 'Save Changes',
    updateWindowTitle: 'Edit Country',
    startUpdateAction: 'Edit',
    helpButtonLabel: 'Show Help',
  },
});
```

In this example, all the custom labels will be used throughout the CRUD interface instead of the default values or translations.

## Minimal Example

You only need to define the labels you want to customize:

```javascript
export const countryConfig = new CrudConfigBuilder('https://example.com/api/countries', {
  labels: {
    helpTitle: 'Country help',
  },
});
```

In this case, only `helpTitle` will be customized, and all other labels will use the translation fallback or default English values.
