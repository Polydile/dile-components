---
title: Color Picker
package: '@dile/ui'
element: '&lt;dile-color-picker&gt;'
status: stable
summary: Color picker component with saturation/brightness square, hue slider, and hex input field. Form-integrated with validation support.
---

# dile-color-picker

Color picker Web Component. Shows a swatch button that opens a panel with a saturation/brightness square, a hue slider and a hex text field, and behaves like any other `dile-*` form field.

```html
<dile-color-picker label="Pick a color" name="color"></dile-color-picker>
```

## Install

```bash
npm install @dile/ui
```

## Usage

Import the component.

```javascript
import '@dile/ui/components/color-picker/color-picker.js';
```

Use the component

```html
<dile-color-picker
  name="color"
  label="Favorite color"
  value="#3366ff"
></dile-color-picker>
```

## Properties

- **name**: the name of the field. This helps identify which element triggered an event, and is the field name used on form submission.
- **label**: the element label
- **value**: the current color, as a 6-digit hex string (e.g. `#3366ff`). Defaults to `#000000`. A 3-digit shorthand (e.g. `#36f`) is accepted and automatically normalized to its 6-digit form.
- **disabled**: when true, the element is disabled
- **readonly**: when true, is not editable
- **errored**: when true, the element is marked as error
- **message**: optionally, the element can display a message
- **hideErrorOnInput**: when true, the errored state turns off when the user changes the value and the message is cleared
- **focusOnStart**: when true, set application focus to this component after initialization

## Form Integration

This component is a form-associated element, meaning it integrates seamlessly with native HTML forms. The value is automatically synchronized with the form state, so it can be read from a submitted `FormData` using the `name` property, exactly like `dile-input`.

## Useful Methods

- **focus()**: focus the trigger swatch button
- **clearError()**: removes the errored state and clears the error message
- **open()**: opens the color picker panel
- **close()**: closes the color picker panel
- **toggle()**: opens or closes the color picker panel depending on its current state

## Events

- **element-changed**: dispatched when the value changes. The event detail carries the element `name` and `value` properties.

```javascript
colorField.addEventListener('element-changed', (e) => {
  console.log('element-changed event, value: ', e.detail.value);
});
```

- **overlay-opened** / **overlay-closed**: dispatched when the color picker panel opens or closes.

## Styling

Custom property | Description | Default
----------------|-------------|---------
--dile-color-picker-swatch-size | Trigger and hex preview swatch size | 2em
--dile-color-picker-swatch-border-width | Swatch border width | 1px
--dile-color-picker-swatch-border-color | Swatch border color | #888
--dile-color-picker-swatch-border-radius | Swatch border radius | 5px
--dile-color-picker-swatch-focus-border-width | Trigger swatch border width when focused | 3px
--dile-color-picker-error-border-color | Swatch/hex input border color on errored property = true | #c00
--dile-color-picker-panel-width | Popup panel width | 220px
--dile-color-picker-panel-background-color | Popup panel background color | #fff
--dile-color-picker-panel-border-radius | Popup panel border radius | 5px
--dile-color-picker-panel-box-shadow | Popup panel box shadow | 0 0 20px rgba(102, 102, 102, 0.5)
--dile-color-picker-panel-padding | Popup panel padding | 1rem
--dile-color-picker-panel-z-index | Popup panel stacking order | 999
--dile-color-picker-panel-transition | Popup panel open/close transition | ease 0.2s
--dile-color-picker-sv-square-size | Saturation/brightness square height | 160px
--dile-color-picker-sv-square-border-radius | Saturation/brightness square border radius | 4px
--dile-color-picker-sv-thumb-size | Saturation/brightness thumb diameter | 14px
--dile-color-picker-sv-thumb-border-width | Saturation/brightness thumb ring width | 2px
--dile-color-picker-sv-thumb-border-color | Saturation/brightness thumb ring color | #fff
--dile-color-picker-hue-track-height | Hue slider track height | 12px
--dile-color-picker-hue-track-border-radius | Hue slider track border radius | 6px
--dile-color-picker-hue-thumb-size | Hue slider thumb diameter | 18px
--dile-color-picker-hue-thumb-border-width | Hue slider thumb ring width | 2px
--dile-color-picker-hue-thumb-border-color | Hue slider thumb ring color | #888
--dile-color-picker-hex-input-border-color | Hex input border color | #888
--dile-color-picker-hex-input-border-radius | Hex input border radius | 4px
--dile-color-picker-hex-input-background-color | Hex input background color | #fff
--dile-color-picker-hex-input-color | Hex input text color | #303030
--dile-color-picker-hex-input-font-size | Hex input font size | 0.875rem
--dile-input-label-font-size | Font size for the label | 1em
--dile-input-label-color | Color for the label text | #59e
--dile-input-label-font-weight | Label text font weight | normal
--dile-input-label-margin-bottom | Label margin bottom | 4px
--dile-input-message-padding-top | Space from panel to message | 4px
--dile-input-message-font-size | Message font size | 0.875rem
--dile-input-message-color | Message text color | #888
--dile-input-message-error-color | Message text color on errored state | #c00

## dile-color-picker demos

### Default

```html:preview
<script type="module">
import '@dile/ui/components/color-picker/color-picker.js';
</script>
<dile-color-picker
  name="color"
  label="Favorite color"
  value="#3366ff"
></dile-color-picker>
```

### Inside a form

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';

class MyComponent extends LitElement {
  static get properties() {
    return { result: { type: String } };
  }
  constructor() {
    super();
    this.result = '';
  }
  render() {
    return html`
      <form @submit="${this._onSubmit}">
        <dile-color-picker name="color" label="Brand color" value="#7bb93d"></dile-color-picker>
        <button type="submit">Save</button>
      </form>
      <p>${this.result}</p>
    `;
  }
  _onSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    this.result = 'Submitted color: ' + data.get('color');
  }
}
customElements.define('my-component', MyComponent);
</script>
<my-component></my-component>
```

### Errored

```html:preview
<dile-color-picker
  name="color"
  label="Favorite color"
  value="#ff0000"
  errored
  message="Please choose a different color"
></dile-color-picker>
```

### Disabled

```html:preview
<dile-color-picker
  name="color"
  label="Favorite color"
  value="#888888"
  disabled
></dile-color-picker>
```

### Read only

```html:preview
<dile-color-picker
  name="color"
  label="Favorite color"
  value="#7bb93d"
  readonly
></dile-color-picker>
```

### Styled

```html:preview
<style>
.styled {
  --dile-input-label-color: #6d3d6c;
  --dile-input-label-font-weight: bold;
  --dile-color-picker-swatch-border-radius: 50%;
  --dile-color-picker-swatch-size: 2.5em;
  --dile-color-picker-panel-border-radius: 12px;
}
</style>
<dile-color-picker class="styled" name="color" label="Styled" value="#c2185b"></dile-color-picker>
```
