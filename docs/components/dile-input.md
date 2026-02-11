---
title: Input
tags: forms
---

# dile-input

Input text field Web Component, with customizable design.

```html
<dile-input label="The label" placeholder="Write something..."></dile-input>
```

## Derived components

There are some components in this package based on the dile-input functionality with different behaviours.

- [dile-input-integer](/components/dile-input-integer): make transformations to the input in order to ensure the value is an integer
- [dile-input-money](/components/dile-input-money): to use on money input (always float values with two decimals)
- [dile-input-percentage](/components/dile-input-percentage): to place a "%" character besides the input and ensure the values are float

## Install

```bash
npm install @dile/ui
```

## Usage

Import the component.

```javascript
import '@dile/ui/components/input/input.js';
```

Use the component

```html
<dile-input
  name="input_name"
  label="Text to the label"
  value="Text to the input"
  placeholder="Some text"
  disabled
  errored
></dile-input>
```

## Properties

- **name**: the name of the input element. This helps identify which input triggered an event.
- **label**: the element label
- **type**: the input type
- **value**: defines the text inside the input element
- **placeholder**: Defines the text displayed in the input element when empty
- **disabled**: when true, the element is disabled
- **readonly**: when true, is not editable
- **errored**: when true, the element is marked as error
- **disableAutocomplete**: when true, the input autocomplete HTML featured is disabled
- **selectOnFocus**: always select the content of the input on focus
- **message**: optionally, the input can display a message
- **labelRight**: text placed on the right side of the input
- **hideErrorOnInput**: when true, the errored state turns off when the user changes the input element and the message is cleared
- **focusOnStart**: when true, set application focus to this input component after initialization

## Form Integration

This component is a form-associated element, meaning it integrates seamlessly with native HTML forms. The input value is automatically synchronized with the form state.

## Useful Methods

- **focus()**: focus the input element
- **clearError()**: removes the errored state and clears the error message

## Events

- **input**: This is a native input element. You can listen to the native `input` event.

```javascript
inputField.addEventListener('input', (e) => {
  console.log('input event named ', e.target.name, ' has value: ', e.target.value);
});
```

- **enter-pressed**: The `enter-pressed` event is dispatched when the user press enter on it.

```javascript
inputField.addEventListener('enter-pressed', (e) => {
  console.log('enter-pressed event, value: ', e.target.value);
});
```

- **element-changed**:  The ```element-changed``` event is dispatched when value on the input changes. In the event detail will emmit the element ```name``` and ```value```properties.

## Styling

Custom property | Description | Default
----------------|-------------|---------
--dile-input-width | Input element width | 100%
--dile-input-border-width | Input element border width | 1px
--dile-input-border-color | Input element border color | #888
--dile-input-border-radius | Input element border radius | 5px
--dile-input-error-border-color | Input element border on errored property = true | #c00
--dile-input-focus-border-color | Input element border on focus | #6af
--dile-input-disabled-border-color | Input element border when disabled | #eee
--dile-input-font-size | Input element font size | 1em
--dile-input-line-height | Input element line height | 1.5em
--dile-input-label-font-size | Font size for the label | 1em
--dile-input-label-color | Color for the label text | #59e
--dile-input-label-font-weight | Label text font weight | normal
--dile-input-label-margin-bottom | Label marging bottom | 4px
--dile-input-background-color | Color for the background input element | #fff
--dile-input-error-background-color | Color for the background on a errored input element | --dile-input-background-color or #fff
--dile-input-padding | Padding for the input text | 5px
--dile-input-color | Input text color | #303030
--dile-input-placeholder-color | Placeholder color | #ccc
--dile-input-text-align | Input text align | left
--dile-input-message-padding-top | Space from input to message | 4px
--dile-input-message-font-size | Message font size | 0.875rem
--dile-input-message-color | Message text color | #888
--dile-input-message-error-color | Message text color on errored state | #c00
--dile-input-label-right-margin-left | Separation betweeen input and text placed on its right side | 10px
--dile-input-label-right-font-size | Text placed on the right side size | 1.2em

## dile-input demos

### Default input

```html:preview
<dile-input 
  name="name" 
  label="Name" 
  placeholder="Write your name"
></dile-input>
```

### Focus functionality

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';

class MyComponent extends LitElement {
  
  render() {
    return html`
      <dile-input 
        id="address" 
        name="address" 
        label="Address" 
        disableAutocomplete 
        labelRight="..."
        message="This input has other properties..."
      ></dile-input>
      <button id="focus">Set focus on input</button>
    `
  }
  firstUpdated() {
    this.shadowRoot.getElementById('focus').addEventListener('click', () => {
      this.shadowRoot.getElementById('address').focus();
    });
  }
}
customElements.define('my-component', MyComponent);
</script>
<my-component></my-component>
```

### Errored input

```html:preview
<dile-input 
  name="name" 
  label="Name" 
  errored
  message="Errored message"
></dile-input>
```

### Styled input
```html:preview
<style>
.styled {
  --dile-input-label-color: #6d3d6c;
  --dile-input-label-font-weight: bold;
  --dile-input-border-radius: 0;
  --dile-input-border-color: #6d3d6c;
  --dile-input-border-width: 3px;
  --dile-input-label-margin-bottom: 0.5rem;
  --dile-input-line-height: 2.5rem;
}
html.dark-theme .styled {
  --dile-input-border-color:rgb(168, 81, 166);
  --dile-input-background-color: #ffe;
  --dile-input-label-color: rgb(184, 116, 183);;

}
</style>
<dile-input class="styled" name="name" label="Name" placeholder="Write your name" disableAutocomplete></dile-input>
```