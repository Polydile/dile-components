---
title: Modal Crud Update
tags: 'Crud extras'
---

# dile-modal-crud-update

The `dile-modal-crud-update` component provides a modal interface for creating new records in a CRUD system. It extends the functionality of `dile-crud-update` and incorporates `dile-modal` for displaying the form within a modal.

## Installation

```bash
npm i @dile/crud
```

## Usage

Import the `dile-modal-crud-update` component.

```javascript
import '@dile/crud/components/insert/modal-crud-insert.js';
```

Use the component.

```html
<dile-modal-crud-update
  title="update a country"
  endpoint="${this.config.endpoint}"
  loadOnInit
  relatedId="${this.relatedId}"
  .formTemplate=${this.config.templates.updateForm}
  closeOnSuccess
  openModalLabel="Edit country"
></dile-modal-crud-update>
```

### Properties

This component extends properties from the `dile-crud-update` component. Please refer to [dile-crud-update documentation](/crud/crud-insert/) for inherited properties. Additionally, it introduces the following:

- **openModalLabel**: String, the label displayed on the button that opens the modal. Default is `"Open"`.
- **openModalIcon**: Object, the icon template used for the modal open button. If defined, it replaces the label.
- **closeOnSuccess**: Boolean, if set to `true`, the modal will close automatically when the form is successfully submitted.

### Methods

This component extends methods from the `dile-crud-update` component. Please refer to its documentation for inherited methods.

- **openModal()**: Opens the modal by calling the `open()` method on the `dile-modal` element.

### Custom Events

Please refer to [dile-crud-update documentation](/crud/crud-insert/) for inherited custom events.

## CSS Custom Properties

This component inherits styles from `dile-crud-update`, `dile-modal`, `dile-button` and `dile-button-icon`.

Custom property | Description | Default
----------------|-------------|---------
--dile-modal-crud-extra-padding | Padding for the form container | 3px
