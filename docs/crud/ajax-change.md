---
title: Ajax Change
tags: 'Crud extras'
---

# dile-ajax-change

The `dile-ajax-change` component is a generic wrapper that automatically sends AJAX requests when any wrapped component's value changes. Although commonly used with form inputs like `dile-select`, it can wrap any component that emits change events with the appropriate interface.

## Installation

```bash
npm i @dile/crud
```

## Usage

Import the `dile-ajax-change` component.

```javascript
import '@dile/crud/components/ajax-change/ajax-change.js';
```

### Basic Usage with dile-select

```html
<dile-ajax-change 
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
</dile-ajax-change>
```

> This component is implemented with the `dile-ajax` component, so refer to the [dile-ajax documentation](/crud/ajax/) for more information on configuration requirements.

### Properties

- **method**: String, the HTTP method of the connection. It must be one of the following values: "get", "post", "put", "delete", "patch". Default is "patch".
- **value**: String, the current value of the wrapped component.
- **endpoint**: String, the URL where the AJAX request will be sent.
- **dataFieldName**: String, the name of the field in the request data object. Default is "value".
- **loading**: Boolean, indicates whether an AJAX request is currently in progress.
- **requestApiAdapter**: Object, to adapt the request body object.

### Custom Events

This component dispatches the following custom events:

- **ajax-change-success**: Fired when the AJAX request succeeds. Includes response data in `e.detail`. This event is dispatched by the wrapper after the internal `dile-ajax` component fires its `ajax-success` event.
- **ajax-change-error**: Fired when the AJAX request fails. Includes error data in `e.detail`. This event is dispatched by the wrapper after the internal `dile-ajax` component fires its `ajax-error` event.

Both events are dispatched with `bubbles: true` and `composed: true`, allowing them to propagate through the shadow DOM boundary.

Example of listening to events:

```javascript
const wrapper = document.querySelector('dile-ajax-change');
wrapper.addEventListener('ajax-change-success', (e) => {
  console.log('Request succeeded:', e.detail);
});
wrapper.addEventListener('ajax-change-error', (e) => {
  console.log('Request failed:', e.detail);
});
```

## Wrapped Component Requirements

The `dile-ajax-change` component is highly flexible and can wrap **any element** that meets these requirements. This makes it useful for form inputs, color pickers, toggles, or any component that changes values.

### Required Features

1. **Change Event**: The wrapped element must dispatch a `change` event with `bubbles: true` and `composed: true` when its value changes. This ensures the event propagates through the shadow DOM boundary.

   ```javascript
   // Example from a custom element
   element.dispatchEvent(new CustomEvent('change', {
     bubbles: true,
     composed: true,
   }));
   ```

2. **Value Property**: The wrapped element must have a readable `value` property that contains the current value. This can be:
   - A native HTML property (like in native `<select>`)
   - A JavaScript property getter/setter in a custom element
   - Any accessible property that can be read synchronously

3. **Slot Placement**: The wrapped element must be placed in the named slot `"select"` of the wrapper.

### Event Detection

The wrapper uses the `slotchange` event to dynamically detect when components are assigned to the slot. It automatically listens to `change` events on the first element detected in the slot.

## Usage Examples

### Example 1: With dile-select

```html
<dile-ajax-change 
  endpoint="https://api.example.com/resource/1"
  method="patch"
  dataFieldName="status"
>
  <dile-select name="status" slot="select" label="Status">
    <select slot="select">
      <option value="">Select...</option>
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </select>
  </dile-select>
</dile-ajax-change>
```

### Example 2: With native HTML select

```html
<dile-ajax-change
  endpoint="https://api.example.com/resource/1"
  method="patch"
  dataFieldName="category"
>
  <select slot="select">
    <option value="">Select...</option>
    <option value="cat1">Category 1</option>
    <option value="cat2">Category 2</option>
  </select>
</dile-ajax-change>
```

### Example 3: With a custom element (like fct-color-picker)

```html
<dile-ajax-change
  endpoint="https://api.example.com/user/1"
  method="patch"
  dataFieldName="theme_color"
>
  <fct-color-picker slot="select"></fct-color-picker>
</dile-ajax-change>
```

For this to work, `fct-color-picker` must:
- Have a readable `value` property containing the current color
- Dispatch a `change` event with `bubbles: true` and `composed: true` when the color is selected

## Live Demo

```html:preview
<script type="module">
  import '@dile/crud/components/ajax-change/ajax-change.js';
  import '@dile/ui/components/select/select.js';
</script>
<dile-ajax-change 
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
</dile-ajax-change>
```
