```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'components/dile-input.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = 'dile-input';
```

```js script
import { html, css, LitElement } from 'lit'; 
import '@mdjs/mdjs-story/define';
import '@mdjs/mdjs-preview/define';
import '@dile/dile-input/dile-input.js'
import "@dile/dile-menu-hamburger/dile-menu-hamburger.js";
import "@dile/dile-selector/dile-selector.js";
import "@dile/dile-selector/dile-selector-item.js";
```

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
npm install @dile/dile-input
```

## Usage

Import the component.

```javascript
import '@dile/dile-input/dile-input';
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

- **name**: the name of the input element. This is usefull to distinguish the related element in an input event listener.
- **label**: the element label
- **type**: the input type
- **value**: defines the text inside the input element
- **placeholder**: Defines the texts present in the input element when is empty
- **disabled**: on true, the element is disabled
- **readonly**: on true, is not editable
- **errored**: on true, the element is marked as error
- **disableAutocomplete**: on true, the input autocomplete HTML featured is disabled
- **selectOnFocus**: allways select the content of the input on focus
- **message**: optionaly, the input can display a message
- **labelRight**: text placed on the right side of the input
- **hideErrorOnInput**: on true, the errored state truns off when the user changes the input element and the message is cleared

## Useful Methods

- **focus()**: focus the input element

## Events

- **input**: This element acts as an native input element. So, you can listen the native `input` event.

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

```html preview-story
<dile-input 
  name="name" 
  label="Name" 
  placeholder="Write your name"
></dile-input>
```

### Focus functionality

```js preview-story
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
export const JsStory = () => html`<my-component></my-component>`;
```

### Errored input

```html preview-story
<dile-input 
  name="name" 
  label="Name" 
  errored
  message="Errored message"
></dile-input>
```

### Styled input
```html preview-story
<style>
.styled {
  --dile-input-label-color: #6d3d6c;
  --dile-input-label-font-weight: bold;
  --dile-input-border-radius: 0;
  --dile-input-border-color: #6d3d6c;
  --dile-input-border-width: 2px;
  --dile-input-label-margin-bottom: 0.5rem;
  --dile-input-line-height: 2.5rem;
}
</style>
<dile-input class="styled" name="name" label="Name" placeholder="Write your name" disableAutocomplete></dile-input>
```