---
title: Ajax Switch
tags: 'Crud extras'
---

# dile-ajax-switch

The `dile-ajax-switch` component is a tool to set boolean properties in a resource.

## Installation

```bash
npm i @dile/crud
```

## Usage

Import the `dile-ajax-switch` component.

```javascript
import '@dile/crud/components/ajax-switch/ajax-switch.js';
```

Use the component.

```html
<dile-ajax-switch 
  endpoint="https://timer.escuelait.com/api/board-games/1/change-essential"
  method="patch"
  checkedLabel="Essential" 
  uncheckedLabel="Not essential"
></dile-ajax-switch>
```

> This component is implemented with the `dile-ajax` component, so refer to the [dile-ajax documentation](/crud/ajax/) for more information on configuration requirements.

### Properties

- **method**: String, the HTTP method of the connection. It must be one of the following values: "get", "post", "put", "delete", "patch".
- **value**: Boolean, the value of the switch.
- **endpoint**: String, the URL for switch the action on the resource.
- **checkedLabel**:  String, label for checked state.
- **uncheckedLabel**:  String, label for unchecked state.
- **loading**: Boolean, read-only. Indicates whether a request is in progress. Shows a spinner icon next to the switch when true.
- **requestApiAdapter**: Object, to adapt the request body object.

### Custom Events

The component dispatches the following custom events:

- **dile-ajax-switch-success**: Fired when the AJAX request succeeds. The event detail contains the same information as the `ajax-success` event from [dile-ajax](/crud/ajax/).
- **dile-ajax-switch-error**: Fired when the AJAX request fails. The event detail contains the same information as the `ajax-error` event from [dile-ajax](/crud/ajax/).

You can also listen to the custom events from [dile-switch events](/components/dile-switch/).

#### Example listening to success/error events:

```javascript
const switchElement = document.querySelector('dile-ajax-switch');

switchElement.addEventListener('dile-ajax-switch-success', (e) => {
  console.log('Switch updated successfully', e.detail);
});

switchElement.addEventListener('dile-ajax-switch-error', (e) => {
  console.log('Error updating switch', e.detail);
});
```


### dile-ajax-switch example

```html:preview
<script type="module">
  import '@dile/crud/components/ajax-switch/ajax-switch.js';
</script>
<dile-ajax-switch 
  endpoint="https://timer.escuelait.com/api/board-games/1/change-essential"
  method="patch"
  checkedLabel="Essential" 
  uncheckedLabel="Not essential"
></dile-ajax-switch>
```
