---
title: Confirmed Ajax Form
tags: ajax
---

# dile-confirmed-ajax-form

The `dile-confirmed-ajax-form` component extends `dile-ajax-form` to add a confirmation dialog before form submission. Users must confirm their action through a modal dialog before the form data is sent to the server.

## Installation

```bash
npm i @dile/crud
```

## Usage

Import the dile-confirmed-ajax-form component.

```javascript
import '@dile/crud/components/ajax-form/confirmed-ajax-form.js';
```

Use the component.

```html
<dile-confirmed-ajax-form
  operation="insert"
  endpoint="api/countries"
  actionLabel="Save"
  confirmText="Are you sure you want to create this country?"
>
  <demo-country-form id="form"></demo-country-form>
</dile-confirmed-ajax-form>
```

## Inheritance from dile-ajax-form

`dile-confirmed-ajax-form` is a subclass of `dile-ajax-form` and inherits all of its properties, methods, and custom events. 

Please refer to the [dile-ajax-form documentation](/crud/ajax-form/) for complete information about:

- All inherited properties (operation, endpoint, actionLabel, relatedId, etc.)
- All inherited methods (loadData(), doAction(), clearErrors(), clearForm(), etc.)
- All inherited custom events (save-success, save-error, form-canceled, etc.)
- Response configuration and adapters
- CSS Custom Properties styling

## What's New in dile-confirmed-ajax-form

The only difference from `dile-ajax-form` is that this component requires user confirmation before submitting the form.

### New Properties

- **confirmText**: String, the text message displayed in the confirmation dialog. If not provided, it defaults to a translated message from the language pack (English: "Are you sure you want to submit this form?").
- **acceptLabel**: String, the text for the confirm button in the dialog. Defaults to the translated "Accept" label from the language pack.
- **cancelLabel**: String, the text for the cancel button in the dialog. Defaults to the translated "Cancel" label from the language pack.

### Behavior Changes

When the user clicks the submit button:

1. Instead of immediately sending the form data, a confirmation dialog opens.
2. If the user clicks the accept button, the form proceeds with submission (same behavior as `dile-ajax-form`).
3. If the user clicks the cancel button or closes the dialog, nothing happens (silent cancellation).

The confirmation dialog is modal and blocking, preventing accidental form submission.

### Styling the Confirmation Dialog

The confirmation dialog is powered by the `dile-confirm` component. You can customize its appearance using the CSS custom properties documented in the [dile-confirm component documentation](https://dile-components.com/md/components/dile-confirm.md).

Example:

```html
<style>
  dile-confirmed-ajax-form {
    --dile-confirm-accept-button-color: #28a745;
    --dile-confirm-cancel-button-color: #dc3545;
    --dile-modal-width: 500px;
  }
</style>

<dile-confirmed-ajax-form
  operation="insert"
  endpoint="api/countries"
  actionLabel="Save"
>
  <demo-country-form id="form"></demo-country-form>
</dile-confirmed-ajax-form>
```

## Examples

### Insert with Default Confirmation

Uses the default translated confirmation text and button labels from the language pack.

```html:preview
<script type="module">
    import '@dile/crud/components/ajax-form/confirmed-ajax-form.js';
</script>
<dile-confirmed-ajax-form
  id="confirmedInsert"
  operation="insert"
  endpoint="https://timer.escuelait.com/api/countries"
  actionLabel="Save"
>
  <demo-country-form id="form"></demo-country-form>
</dile-confirmed-ajax-form>
```

### Insert with Custom Confirmation Text

Customizes the confirmation dialog with specific text and button labels.

```html:preview
<dile-confirmed-ajax-form
  id="confirmedCustom"
  operation="insert"
  endpoint="https://timer.escuelait.com/api/countries"
  actionLabel="Create"
  confirmText="Please verify all the data is correct. This action cannot be undone."
  acceptLabel="Yes, create the country"
  cancelLabel="No, go back"
>
  <demo-country-form id="form"></demo-country-form>
</dile-confirmed-ajax-form>
```

### Update with Confirmation

Updates an existing record with confirmation dialog.

```html:preview
<dile-confirmed-ajax-form
  id="confirmedUpdate"
  operation="update"
  relatedId="1"
  loadOnInit
  endpoint="https://timer.escuelait.com/api/countries"
  actionLabel="Update"
  confirmText="Are you sure you want to update this country?"
  acceptLabel="Confirm update"
>
  <demo-country-form id="form"></demo-country-form>
</dile-confirmed-ajax-form>
```
