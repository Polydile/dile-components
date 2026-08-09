---
title: Select
tags: forms
---

# dile-select

This component uses the native ```<select>``` element to create a dropdown select interface.

The diferences between the native ```<select>``` are:

- Accept a binding on value property
- Dispatch a "change" event on changes witch has "bubbles" and "compose" configuration
- Has some styles and can be styled with custom properties
- It is possible to create a label

## Alternative: dile-select-overlay

If you want full control over how the options list looks and behaves — instead of the browser's own native dropdown — consider using [dile-select-overlay](/components/dile-select-overlay/). It covers the exact same properties, methods and events as `dile-select`, but shows the options in a custom, accessible overlay panel built by the component itself.

## Installation

```bash
npm i @dile/ui
```

## dile-select Usage

Import the component.

```javascript
import '@dile/ui/components/select/select.js';
```

Use the component.

```html
<dile-select name="select1" label="Selector">
  <select slot="select">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
  </select>
</dile-select>
```

## Properties

- **disabled**: To disable the select element
- **errored**: to mark the select element with a error border color
- **label**: A label
- **name**: the name of the element.
- **value**: the value of the option selected
- **message**: Place a message under the select element
- **hideErrorOnInput**: Hide the error message when the user changes the value of the select element
- **quietOnStart**: Do not emmit element-changed event on component start.

## Methods

- **quietChange(value)**: Set the value of the select element without emmiting a `element-changed` event.
- **clear()**: Set the value of the select element to `undefined`.

## Events

- **element-changed**: This event is dispatched when the value property changes. In the detail object the event emmits the name of the element an its value.

## Accessibility

The `dile-select` component is designed to be fully accessible and compliant with **WCAG 2.1 Level AA** standards.

### Screen Reader Support

The component automatically manages accessibility attributes to ensure screen readers announce all important information:

- **Label Association**: When you provide a `label` attribute, it is automatically associated with the select element using proper `<label for>` binding
- **Error Announcements**: Error messages are linked to the select via `aria-describedby`, allowing screen readers to announce them along with form validation status
- **Invalid State**: When `errored` property is `true`, the select element receives `aria-invalid="true"` to communicate validation errors
- **Status Updates**: Error messages use `role="status"` and `aria-live="polite"` to announce changes dynamically

### Keyboard Navigation

All functionality is fully accessible via keyboard:

- **Tab/Shift+Tab**: Navigate to and away from the select element
- **Space/Enter**: Open the native select dropdown menu
- **Arrow Keys**: Navigate through available options
- **Focus Visible**: A clear focus indicator is always visible when the select is focused

### High Contrast Mode Support

The component respects system high-contrast settings and forced-colors mode:

- Focus outlines remain clearly visible and do not rely on color alone
- The arrow icon adapts to high-contrast display settings
- All interactive states are perceivable without color dependency

### Best Practices for Accessible Usage

#### 1. Always Provide a Label

```html
<dile-select label="Choose a country">
  <select slot="select" name="country">
    <option value="">Select an option</option>
    <option value="es">Spain</option>
    <option value="en">United Kingdom</option>
  </select>
</dile-select>
```

#### 2. Display Error Messages with Context

When validating, combine the `errored` and `message` properties to provide clear feedback:

```html
<dile-select 
  label="Select a category"
  ?errored=${this.hasError}
  message=${this.hasError ? "Please select a valid category" : ""}
  hideErrorOnInput
>
  <select slot="select" name="category">
    <option value="">Select...</option>
    <option value="a">Category A</option>
    <option value="b">Category B</option>
  </select>
</dile-select>
```

Error messages are automatically announced by screen readers and linked to the select via `aria-describedby`.

#### 3. Disable States

When disabling the select, the component properly communicates the disabled state:

```html
<dile-select 
  label="Disabled option"
  ?disabled=${true}
>
  <select slot="select">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
  </select>
</dile-select>
```

The `aria-disabled` attribute is automatically managed and the disabled state is visually distinguishable.

#### 4. Provide Help Text (Optional)

For complex selections, provide context before the select:

```html
<div>
  <p id="category-help">Choose the category that best describes your request. This helps us route it to the right team.</p>
  <dile-select 
    label="Request Category"
    aria-describedby="category-help"
  >
    <select slot="select" name="category">
      <option value="billing">Billing</option>
      <option value="support">Support</option>
      <option value="other">Other</option>
    </select>
  </dile-select>
</div>
```

### Accessibility Verification Checklist

- ✅ Label is always associated with the select element
- ✅ Error messages are announced by screen readers
- ✅ All functionality works with keyboard alone
- ✅ Focus indicator is always visible
- ✅ Component works in high-contrast/forced-colors mode
- ✅ Disabled state is clearly communicated
- ✅ The component works with NVDA, JAWS, and VoiceOver
- ✅ WCAG 2.1 Level AA conformance for form controls

## CSS custom properties

You can customize the selector using the CSS custom properties bellow.

Custom property | Description | Default
----------------|-------------|---------
--dile-select-font-size | Select element font size | 0.875em
--dile-select-arrow-color | Arrow icon color | #303030
--dile-input-label-font-size | Font size for the label | 1em
--dile-input-label-color | Color for the label text | #59e
--dile-input-label-font-weight | Label text font weight | normal
--dile-input-label-margin-bottom | Label marging bottom | 4px
--dile-input-width | Select element width | 100%
--dile-input-border-width | Select element border width | 1px
--dile-input-border-color | Select element border color | #888
--dile-input-border-radius | Select element border radius | 5px
--dile-input-padding | Padding for the select | 5px
--dile-input-color | Input text color | #303030
--dile-input-background-color | Color for the background select element | #fff
--dile-input-focus-border-color | Input element border on focus | #6af
--dile-input-error-border-color | Input element border on errored property = true | #c00
--dile-input-disabled-border-color | Input element border when disabled | #eee
--dile-input-message-padding-top | Space from input to message | 4px
--dile-input-message-font-size | Message font size | 0.875em
--dile-input-message-color | Message text color | #888
--dile-input-message-error-color | Message text color on errored state | #c00

When ```--dile-input-background-color``` is configured to a dark color you can customize the arrow icon color using the `--dile-select-arrow-color` CSS custom property to ensure proper contrast:

```html
<style>
  dile-select.dark-bg {
    --dile-input-background-color: #2a2a2a;
    --dile-input-color: #fff;
    --dile-select-arrow-color: #fff;
  }
</style>
<dile-select label="Select one option" class="dark-bg">
  <select slot="select">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
  </select>
</dile-select>
```

## dile-select demos

### Default dile-select

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';
import '@dile/ui/components/select/select.js';

class MyComponent extends LitElement {

  render() {
    return html`
      <dile-select id="select1" value="3">
        <select slot="select">
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </select>
      </dile-select>
      <p id="msg1"></p>
    `
  }
  firstUpdated() {
    this.shadowRoot.getElementById('select1').addEventListener('element-changed', (e) => {
      let textElement = this.shadowRoot.getElementById('msg1');
      textElement.innerText = "The value selected is: " + e.detail.value;
    });
  }
}
customElements.define('my-component', MyComponent);
</script>
<my-component></my-component>
```

### Disabled

```html:preview
<dile-select disabled value="c">
  <select slot="select">
    <option value="a">Option a</option>
    <option value="b">Option b</option>
    <option value="c">Option c</option>
  </select>
</dile-select>
```

### Styled with label

```html:preview
<style>
  dile-select.styled {
    --dile-input-background-color: red;
    --dile-input-color: #fff;
  }
</style>
<dile-select label="Select one option" class="styled">
  <select slot="select" class="dark">
    <option value="1">Option 1</option>
    <option value="2" disabled>Option 2</option>
    <option value="3">Option 3</option>
  </select>
</dile-select>
```

### Errored

```html:preview
<dile-select errored message="One message..." hideErrorOnInput>
  <select slot="select">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
  </select>
</dile-select>
```

### With dark background and custom arrow color

```html:preview
<style>
  dile-select.dark-bg {
    --dile-input-background-color: #2a2a2a;
    --dile-input-color: #fff;
    --dile-select-arrow-color: #fff;
  }
</style>
<dile-select label="Dark select with white arrow" class="dark-bg">
  <select slot="select">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
  </select>
</dile-select>
```

### Custom arrow color

```html:preview
<style>
  dile-select.custom-arrow {
    --dile-select-arrow-color: #00cc00;
  }
</style>
<dile-select label="Select with custom arrow color" class="custom-arrow">
  <select slot="select">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
  </select>
</dile-select>
```

### Accessible Form with Validation

This example demonstrates accessible form patterns with error handling and keyboard navigation:

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';
import '@dile/ui/components/select/select.js';

class AccessibleFormDemo extends LitElement {
  static get properties() {
    return {
      country: { type: String },
      category: { type: String },
      countryError: { type: Boolean },
      categoryError: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.country = '';
    this.category = '';
    this.countryError = false;
    this.categoryError = false;
  }

  render() {
    return html`
      <form @submit=${this.handleSubmit}>
        <dile-select 
          label="Select your country"
          value=${this.country}
          ?errored=${this.countryError}
          message=${this.countryError ? 'Country is required' : ''}
          hideErrorOnInput
          @element-changed=${this.handleCountryChange}
        >
          <select slot="select" name="country">
            <option value="">-- Choose a country --</option>
            <option value="es">Spain</option>
            <option value="fr">France</option>
            <option value="uk">United Kingdom</option>
          </select>
        </dile-select>

        <dile-select 
          label="Select a category"
          value=${this.category}
          ?errored=${this.categoryError}
          message=${this.categoryError ? 'Category is required' : ''}
          hideErrorOnInput
          @element-changed=${this.handleCategoryChange}
        >
          <select slot="select" name="category">
            <option value="">-- Choose a category --</option>
            <option value="billing">Billing</option>
            <option value="support">Support</option>
            <option value="feedback">Feedback</option>
          </select>
        </dile-select>

        <button type="submit">Submit</button>
      </form>
    `;
  }

  handleCountryChange(e) {
    this.country = e.detail.value;
    if (this.country) {
      this.countryError = false;
    }
  }

  handleCategoryChange(e) {
    this.category = e.detail.value;
    if (this.category) {
      this.categoryError = false;
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    
    this.countryError = !this.country;
    this.categoryError = !this.category;

    if (!this.countryError && !this.categoryError) {
      alert(`Form submitted:\nCountry: ${this.country}\nCategory: ${this.category}`);
    }
  }

  static get styles() {
    return css`
      :host {
        display: block;
        max-width: 400px;
      }
      form {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      button {
        padding: 10px 20px;
        background-color: #6af;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1em;
      }
      button:focus-visible {
        outline: 3px solid #00f;
        outline-offset: 2px;
      }
      button:hover {
        background-color: #5ae;
      }
    `;
  }
}
customElements.define('accessible-form-demo', AccessibleFormDemo);
</script>
<accessible-form-demo></accessible-form-demo>
```

This example showcases:
- Proper label association for screen readers
- Error message announcement when validation fails
- Keyboard navigation support
- Auto-clearing errors when user selects a value with `hideErrorOnInput`
- Full WCAG 2.1 AA accessibility
