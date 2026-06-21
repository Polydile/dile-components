---
title: Ajax Select Change
tags: 'Crud extras'
---

# dile-select-ajax-change

The `dile-select-ajax-change` component is a tool to update resource properties by selecting values from a select dropdown and automatically sending AJAX requests.

## Installation

```bash
npm i @dile/crud
```

## Usage

Import the `dile-select-ajax-change` component.

```javascript
import '@dile/crud/components/ajax-select-change/ajax-select-change.js';
import '@dile/ui/components/select/select.js';
```

Use the component with a `dile-select` element in the `select` slot.

```html
<dile-select-ajax-change 
  endpoint="https://timer.escuelait.com/api/board-games/1"
  method="patch"
  dataFieldName="status"
>
  <dile-select name="status" slot="select" label="Status">
    <select slot="select">
      <option value="">Select...</option>
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
      <option value="pending">Pending</option>
      <option value="archived">Archived</option>
    </select>
  </dile-select>
</dile-select-ajax-change>
```

> This component is implemented with the `dile-ajax` component, so refer to the [dile-ajax documentation](/crud/ajax/) for more information on configuration requirements.

### Properties

- **method**: String, the HTTP method of the connection. It must be one of the following values: "get", "post", "put", "delete", "patch". Default is "patch".
- **value**: String, the current value of the select.
- **endpoint**: String, the URL where the AJAX request will be sent.
- **dataFieldName**: String, the name of the field in the request data object. Default is "value".
- **loading**: Boolean, indicates whether an AJAX request is currently in progress.
- **requestApiAdapter**: Object, to adapt the request body object.

### Custom Events

This component does not dispatch any custom events on its own, but you can listen to the `ajax-response` custom event from [`dile-ajax`](/crud/ajax/) and also the custom events from [dile-select events](/components/dile-select/).

### dile-select-ajax-change example

```html:preview
<script type="module">
  import '@dile/crud/components/ajax-select-change/ajax-select-change.js';
  import '@dile/ui/components/select/select.js';
</script>
<dile-select-ajax-change 
  endpoint="https://timer.escuelait.com/api/board-games/1"
  method="patch"
  dataFieldName="status"
>
  <dile-select name="status" slot="select" label="Status">
    <select slot="select">
      <option value="">Select...</option>
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
      <option value="pending">Pending</option>
      <option value="archived">Archived</option>
    </select>
  </dile-select>
</dile-select-ajax-change>
```
