```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'components/dile-select.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = 'dile-select';
```

```js script
import { html, css, LitElement } from 'lit'; 
import '@mdjs/mdjs-story/define';
import '@mdjs/mdjs-preview/define';
import '@dile/dile-select/dile-select.js'
import "@dile/dile-menu-hamburger/dile-menu-hamburger.js";
import "@dile/dile-selector/dile-selector.js";
import "@dile/dile-selector/dile-selector-item.js";
```

# dile-select

This component uses the native ```<select>``` element to create a dropdown select interface.

The diferences between the native ```<select>``` are:

- Accept a binding on value property
- Dispatch a "change" event on changes witch has "bubbles" and "compose" configuration
- Has some styles and can be styled with custom properties
- It is possible to create a label

## Installation

```bash
npm i @dile/dile-select
```

## dile-select Usage

Import the component.

```javascript
import '@dile/dile-select/dile-select.js';
```

Use the component.

```html
<dile-select id="select1">
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

## CSS custom properties

You can customize the selector using the CSS custom properties bellow.

Custom property | Description | Default
----------------|-------------|---------
--dile-select-font-size | Select element font size | 0.875em
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

When ```--dile-input-background-color``` is configured to a dark color the component has the posibility to put a "dark" class in the ```<select>``` tag to create a drop icon with suficient contrast. You need to put this clas by yourself.

```html
<dile-select label="Select one option" class="styled">
  <select slot="select" class="dark">
    <option value="1">Option 1</option>
    <option value="2" disabled>Option 2</option>
    <option value="3">Option 3</option>
  </select>
</dile-select>
```

## dile-select demos

### Default dile-select

```js preview-story
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
export const JsStory = () => html`<my-component></my-component>`;
```

### Disabled

```html preview-story
<dile-select disabled value="c">
  <select slot="select">
    <option value="a">Option a</option>
    <option value="b">Option b</option>
    <option value="c">Option c</option>
  </select>
</dile-select>
```

### Styled with label

```html preview-story
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

```html preview-story
<dile-select errored message="One message..." hideErrorOnInput>
  <select slot="select">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
  </select>
</dile-select>
```
