---
title: Ajax Select Change
tags: 'Crud extras'
---

# dile-select-ajax-change

The `dile-select-ajax-change` component is a wrapper that automatically sends AJAX requests when the wrapped component's value changes. Although designed to work with `dile-select`, it can wrap any component that emits the appropriate events and has a compatible interface.

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

### Wrapped Component Specifications

The `dile-select-ajax-change` component works by detecting any `<select>` element within its light DOM (slots) and listening to change events on it. However, it can theoretically work with any component that meets the following specifications:

#### Required Features:

1. **Change Event Emission**: The wrapped element must emit a native or custom `change` event when its value changes.

2. **Value Property**: The wrapped element must have a readable `value` property (or attribute) that contains the current selected value. This can be:
   - A native HTML property (like in native `<select>`)
   - A getter/setter in a custom element
   - An accessible DOM attribute

3. **Slot Placement**: The wrapped element must be placed within the component (typically through a named slot, though any light DOM placement works).

#### Current Selector Strategy:

Currently, `dile-select-ajax-change` specifically queries for the first native `<select>` element using `querySelector("select")`. For maximum compatibility:

- If wrapping a native `<select>`, it will work out of the box
- If wrapping a custom element that contains a `<select>`, ensure the `<select>` is accessible from the light DOM
- If wrapping a different type of element, you may need to customize the component's `elselect` getter

#### Example with dile-select:

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

#### Example with native select:

```html
<dile-select-ajax-change 
  endpoint="https://api.example.com/resource/1"
  method="patch"
  dataFieldName="status"
>
  <select>
    <option value="">Select...</option>
    <option value="active">Active</option>
    <option value="inactive">Inactive</option>
    <option value="pending">Pending</option>
  </select>
</dile-select-ajax-change>
```

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
