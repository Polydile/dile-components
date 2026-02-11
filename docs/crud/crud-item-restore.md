---
title: Item restore
tags: operations
---

# dile-crud-item-restore

The `dile-crud-item-restore` component is used to restore an item via an API, which can be useful when resources implement soft-delete.

It works very similarly to [dile-crud-item-delete](/crud/crud-item-delete/) and is, in fact, a specialization of that component, with only some base property values changed.

Its behavior includes opening a confirmation dialog to verify the restore action. If the user confirms, the component sends a request to a configurable endpoint.



## Installation

```bash
npm i @dile/crud
```

## Usage

Import the dile-crud-item-restore component.

```javascript
import '@dile/crud/components/item-restore/crud-item-restore.js';
```
Use the component.

```html
<dile-crud-item-restore
  endpoint="api/countries"
  urlSufix="restore"
  method="post"
></dile-crud-item-restore>
<script>
  document.querySelector('dile-crud-item-restore').restore(1);
</script>
```

### properties

This component inherits the properties from `dile-crud-item-delete`. Additionally, it introduces the following properties.

- **urlSufix**: String, to be added as a suffix to the endpoint for restoring the resource item. It will be used to compose the URL in the following format: `${endpoint}/${relatedId}/${this.urlSufix}`.

### Methods

- **restore(itemId)**: Performs the restore operation, first displaying a confirmation dialog to the user.

### Events

- **restore-success**: This event is dispatched when a restore operation is successfully completed. This event does not send any details.
- **restore-error**: This event is dispatched when a restore operation results in a server error. The event detail includes an error message and the previous detail provided by the `dile-ajax` component.


## Integration with dile-crud

This component is natively integrated with `dile-crud`, allowing restore operations on items in listings. For the restore component to appear, the following conditions must be met:

- The item's data object must have a property `is_deleted` set to `true`.
- The [resource's configuration object](http://localhost:8080/crud/resource-config/) must have the property `customization.disableRestore` set to `false` (which is the default value).


## More information and demos

You can find demos and additional information on the [dile-crud-item-delete](/crud/crud-item-delete/) component page.
