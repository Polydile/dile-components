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
- **requestApiAdapter**: Object, to adapt the request body object.

### Custom Events

This component does not dispatch any custom events on its own, but you can listen to the `ajax-response` custom event from [`dile-ajax`](/crud/ajax/) and also the custom events from [dile-switch events](/components/dile-switch/).


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
