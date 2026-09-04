---
title: Checkbox
package: '@dile/ui'
element: '&lt;dile-checkbox&gt;'
status: stable
summary: Customizable checkbox input element with disabled and error states. Supports validation messages and form integration with change events.
---

# dile-checkbox

Web Component to create a customizable checkbox input form element.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the component:

```javascript
import '@dile/ui/components/checkbox/checkbox.js';
```

Use the component:

```html
<dile-checkbox>Label for the checkbox element</dile-checkbox>
```

### Properties

- **checked**: Boolean, defines the checkbox state (cheked / unchecked).
- **disabled**: Boolean, defines the checkbox as disabled.
- **name**: The name of the checkbox. It reflects to the ```name``` attribute, so it is sent correctly when submitting a native ```<form>```, even if you set it from JavaScript instead of markup.
- **message**: Text message to display below the checkbox (typically for validation errors)
- **errored**: Boolean property to indicate the checkbox is in error state
- **hideErrorOnInput**: Boolean property to automatically clear the error message when the user toggles the checkbox

There is a special ```value``` property. This is not a actual component property but it mirrors the ```checked``` property, because sometimes forms colud use this property instead of checked to query or change it's state.

### Custom events

- **dile-checkbox-changed**: Every time the checkbox changes emits a ```dile-checkbox-changed``` event. When fired, the custom event sends a detail object, containing two properties: ```checked``` and ```name```.

- **element-changed**: this event is dispatched when the cheked property changes. This event sends a detail object containing this properties: ```name```, ```checked``` and ```value```.

> You may note these are similar events (dile-checkbox-changed and element-changed). The reason is because dile-checkbox extends [DileEmmitChangeMixin](/mixins/dile-emmit-change-mixin) to be compatible with [DileFormMixin](/mixins/dile-form-mixin).

### Accessibility Features

- **Keyboard navigation**: Tab to focus the checkbox, Space to toggle it.
- **ARIA attributes**: `role="checkbox"`, `aria-checked`, `aria-disabled`, `aria-labelledby` (linked to the slotted label), `aria-describedby` (linked to the validation message when present).
- **Focus indicator**: Visible outline on keyboard focus (customizable with `--dile-checkbox-focus-outline`).
- **Disabled state**: Removed from the tab order (`tabindex="-1"`) and marked with `aria-disabled="true"`.

### CSS Custom Properties

You can customize it using CSS Custom Properties.

Custom property | Description | Default
----------------|-------------|---------
--dile-checkbox-checked-color | Checked color for check control | #30a030
--dile-checkbox-unchecked-color | Unchecked color for check control | --dile-on-background-color or #303030
--dile-checkbox-label-color | label regular color | --dile-on-background-color or #303030
--dile-checkbox-label-disabled-color | Label color for disabled status | #888
--dile-checkbox-label-margin-left | Label margin to the input element | 0.25rem
--dile-checkbox-font-weight | Font weight for te label | normal
--dile-checkbox-size | Checkbox size | 20px
--dile-checkbox-focus-outline | Focus outline for the checkbox control | 2px solid #4A90E2

## dile-checkbox demos

### Regular checkbox

```html:preview
<dile-checkbox name="1stcheck" id="check1" >I agree the <a href="#">terms of use</a></dile-checkbox>
```

### Without label

```html:preview
<dile-checkbox name="name"></dile-checkbox>
```

### Disabled checkbox

```html:preview
<dile-checkbox name="name" disabled>Disabled!</dile-checkbox>
```

### Styled checkbox

```html:preview
<style>
.styled {
  --dile-checkbox-checked-color: #006;
  --dile-checkbox-unchecked-color: #f66;
  --dile-checkbox-label-color: #c57;
  --dile-checkbox-font-weight: bold;
  --dile-checkbox-label-disabled-color: #ddd;
  --dile-checkbox-size: 32px;
}
</style>
<dile-checkbox class="styled" checked>Styled!</dile-checkbox>
```

### Checkbox with message and error state

```html:preview
<script type="module">
import '@dile/ui/components/checkbox/checkbox.js';
import { LitElement, html, css } from 'lit';

class MyComponent extends LitElement {
  render() {
    return html`
      <dile-checkbox 
        id="check" 
        name="terms"
        .hideErrorOnInput="${true}">
        I accept the terms and conditions
      </dile-checkbox>
      <button @click="${this.validate}">Validate</button>
    `
  }

  validate() {
    const checkbox = this.shadowRoot.getElementById('check');
    if (!checkbox.checked) {
      checkbox.message = 'You must accept the terms to continue';
      checkbox.errored = true;
    } else {
      checkbox.message = '';
      checkbox.errored = false;
    }
  }
}
customElements.define('my-component', MyComponent);
</script>
<my-component></my-component>
```

