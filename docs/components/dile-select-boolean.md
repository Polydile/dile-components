---
title: Select Boolean
tags: forms
---

# dile-select-boolean

This component wraps `dile-select` to handle boolean form fields. It solves the problem that occurs when `DileForm` sets a boolean value (`true`/`false`) on a select field: `dile-select` declares its `value` as a String and cannot match the option correctly.

`dile-select-boolean` exposes a boolean `value` property and renders two fixed options internally. The display text for each option is configurable via properties.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the component.

```javascript
import '@dile/ui/components/select/select-boolean.js';
```

Use the component.

```html
<dile-select-boolean
  name="active"
  label="Active"
  trueOption="Yes"
  falseOption="No"
></dile-select-boolean>
```

## Properties

- **label**: String, the label text for the select field.
- **value**: Boolean, the current value of the field. Accepts and returns `true` or `false`.
- **name**: String, the name attribute used in form submissions and `element-changed` events.
- **disabled**: Boolean, disables the select field when set to `true`.
- **errored**: Boolean, marks the field with an error state.
- **message**: String, a message displayed below the select field.
- **hideErrorOnInput**: Boolean, clears the error state and message when the user changes the value.
- **quietOnStart**: Boolean, suppresses the `element-changed` event on component initialization.
- **trueOption**: String, the display text for the `true` option. Defaults to `Yes`.
- **falseOption**: String, the display text for the `false` option. Defaults to `No`.

## Methods

- **clear()**: Sets the value to `undefined`.
- **clearError()**: Clears the `errored` state and the `message`.

## Events

- **element-changed**: This component implements [DileEmmitChangeMixin](https://dile-components.com/mixins/dile-emmit-change-mixin/), so `element-changed` is fired when the value changes. The event detail includes `name` and `value` (a boolean).

## DileForm integration

`dile-select-boolean` is designed to work with `DileForm`:

- `DileForm.setData({ active: true })` selects the `trueOption`.
- `DileForm.setData({ active: false })` selects the `falseOption`.
- `DileForm.getData()` returns the field value as a native boolean (`true` or `false`).

## Native form behavior

When used inside a native HTML `<form>`, the component behaves like a checkbox:

- `value === true`: the field is submitted with value `on`.
- `value === false` or `undefined`: the field is not included in the form submission.

## CSS custom properties

The component delegates all rendering to the inner `dile-select`. See the [dile-select documentation](/components/dile-select/) for the full list of available CSS custom properties.

## dile-select-boolean demos

### Default (Yes / No)

```html:preview
<script type="module">
import { LitElement, html } from 'lit';
import '@dile/ui/components/select/select-boolean.js';

class MyComponent extends LitElement {
  render() {
    return html`
      <dile-select-boolean id="sb1" name="active" label="Active"></dile-select-boolean>
      <p id="msg1">Select a value</p>
    `;
  }
  firstUpdated() {
    this.shadowRoot.getElementById('sb1').addEventListener('element-changed', (e) => {
      const msg = this.shadowRoot.getElementById('msg1');
      msg.innerText = 'Value: ' + e.detail.value + ' (type: ' + typeof e.detail.value + ')';
    });
  }
}
customElements.define('my-component', MyComponent);
</script>
<my-component></my-component>
```

### Custom option labels

```html:preview
<script type="module">
import '@dile/ui/components/select/select-boolean.js';
</script>
<dile-select-boolean
  name="published"
  label="Status"
  trueOption="Published"
  falseOption="Draft"
></dile-select-boolean>
```

### Set boolean value programmatically

```html:preview
<script type="module">
import { LitElement, html } from 'lit';
import '@dile/ui/components/select/select-boolean.js';

class MyComponent2 extends LitElement {
  render() {
    return html`
      <dile-select-boolean id="sb3" name="enabled" label="Enabled"></dile-select-boolean>
      <p>
        <button @click="${() => this.shadowRoot.getElementById('sb3').value = true}">Set true</button>
        <button @click="${() => this.shadowRoot.getElementById('sb3').value = false}">Set false</button>
      </p>
    `;
  }
}
customElements.define('my-component-2', MyComponent2);
</script>
<my-component-2></my-component-2>
```

### Errored state

```html:preview
<script type="module">
import '@dile/ui/components/select/select-boolean.js';
</script>
<dile-select-boolean
  name="confirm"
  label="Confirm"
  errored
  hideErrorOnInput
  message="This field is required"
></dile-select-boolean>
```

### Disabled

```html:preview
<script type="module">
import '@dile/ui/components/select/select-boolean.js';
</script>
<dile-select-boolean name="status" label="Status" disabled></dile-select-boolean>
```
