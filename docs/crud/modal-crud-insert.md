---
title: Modal Crud Insert
tags: 'Crud extras'
---

# dile-modal-crud-insert

The `dile-modal-crud-insert` component provides a modal interface for creating new records in a CRUD system. It extends the functionality of `dile-crud-insert` and incorporates `dile-modal` for displaying the form within a modal.

## Installation

```bash
npm i @dile/crud
```

## Usage

Import the `dile-modal-crud-insert` component.

```javascript
import '@dile/crud/components/insert/modal-crud-insert.js';
```

Use the component.

```html
<dile-modal-crud-insert
  title="Insert a country"
  endpoint="${this.config.endpoint}"
  .formTemplate=${this.config.templates.insertForm}
  .openModalIcon="${draftIcon}"
  closeOnSucess
></dile-modal-crud-insert>
```

### Properties

This component extends properties from the `dile-crud-insert` component. Please refer to [dile-crud-insert documentation](/crud/crud-insert/) for inherited properties. Additionally, it introduces the following:

- **openModalLabel**: String, the label displayed on the button that opens the modal. Default is `"Open"`.
- **openModalIcon**: Object, the icon template used for the modal open button. If defined, it replaces the label.
- **closeOnSuccess**: Boolean, if set to `true`, the modal will close automatically when the form is successfully submitted.

### Methods

This component extends methods from the `dile-crud-insert` component. Please refer to its documentation for inherited methods.

- **openModal()**: Opens the modal by calling the `open()` method on the `dile-modal` element.

### Custom Events

Please refer to [dile-crud-insert documentation](/crud/crud-insert/) for inherited custom events.

## CSS Custom Properties

This component inherits styles from `dile-crud-insert`, `dile-modal`, `dile-button` and `dile-button-icon`.
