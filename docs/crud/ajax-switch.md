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

Import the dile-ajax component.

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


> This component is implemented with dile-ajax component. So, read the [dile-ajax docs](/crud/ajax/) to get more information on configuration options.

### Properties

- **method**: String, the HTTP method of the connection. It must be one of the following values: "get", "post", "put", "delete", "patch".
- **value**: Boolean, the value of the switch.
- **endpoint**: String, the URL for switch the action on the resource.
- **checkedLabel**:  String, label for checked state.
- **uncheckedLabel**:  String, label for unchecked state.
- **requestApiAdapter**: Object, to adapt the request body object.

### Custom Events

You can listen for [dile-ajax events](/crud/ajax/) and [dile-switch events](/components/dile-switch/)


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
