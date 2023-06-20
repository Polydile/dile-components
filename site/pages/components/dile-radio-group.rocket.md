```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'components/dile-radio-group.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = 'dile-radio-group';
```

```js script
import { html, css, LitElement } from 'lit'; 
import '@mdjs/mdjs-story/define';
import '@mdjs/mdjs-preview/define';
import '@dile/dile-radio-group/dile-radio-group.js'
import '@dile/dile-radio-group/dile-radio.js'
import "@dile/dile-menu-hamburger/dile-menu-hamburger.js";
import "@dile/dile-selector/dile-selector.js";
import "@dile/dile-selector/dile-selector-item.js";
```

# dile-radio-group

Web Components to create a customizable radio buttons interface. 

There are two components in this package:

- ```dile-radio-group```: allows to create a group of radio buttons. In a group only is possible to select one radio button at same time.
- ```dile-radio```: to create each radio button on the group

## Installation

```bash
npm i @dile/dile-radio-group
```

## Usage

Import the components.

```javascript
import '@dile/dile-radio-group/dile-radio-group.js';
import '@dile/dile-radio-group/dile-radio.js';
```

Use the components.

```html
<dile-radio-group name="interested" label="Are you interested in this subject?">
  <dile-radio label="Yes" value="yes"></dile-radio>
  <dile-radio label="Some interested" value="some"></dile-radio>
  <dile-radio label="Not at all" value="not"></dile-radio>
</dile-radio-group>
```

## Properties

### For dile-radio-group component

- **disabled**: The radio buttons are disabled.
- **name**: element name
- **label**: Text label for the group
- **value**: The selected radio value

### For dile-radio component

- **selected**: Boolean, true if its selected
- **label**: label for the radio element
- **value**: value for this radio element

## Custom events

### dile-radio-group custom events 

- **element-changed**: The ```element-changed``` event is dispatched when value on the input changes. In the event detail will emmit the element ```name``` and ```value```properties.
- **dile-radio-group-changed**: Is dispatched when the value changes. In the event detail will emmit the element ```name``` and ```value```properties.

### dile-radio custom events 

- **dile-radio-selected**: New radio button selected. In this event the detail object only contains ```value``` property.

## CSS Custom Properties

Custom property | Description | Default
----------------|-------------|---------
--dile-input-label-font-size | Font size for the label | 1em
--dile-input-label-color | Color for the label text | #59e
--dile-input-label-font-weight | Label text font weight | normal
--dile-input-label-margin-bottom | Label marging bottom | 4px
--dile-radio-disabled-icon-color | Color for the icon when it is disabled | #ccc
--dile-radio-space-between-label-and-icon | Separation label on radios | 0.4rem
--dile-radio-icon-size | Radio icon size | 1.2rem
--dile-radio-icon-color | Radio icon color | #303030
--dile-radio-label-font-size | Radio label text size | 1rem
--dile-radio-label-color | Radio label text color | #303030
--dile-radio-selected-icon-color | Radio icon color | --dile-radio-icon-color or #303030
--dile-radio-selected-label-color | Radio label selected text color | --dile-radio-label-color or #303030

## dile-radio-group demos

### Default dile-radio-group

```js preview-story
class MyComponent extends LitElement {

  render() {
    return html`
      <dile-radio-group id="group" name="interested" label="Are you interested in this subject?">
        <dile-radio label="Yes" value="yes"></dile-radio>
        <dile-radio label="Some interested" value="some"></dile-radio>
        <dile-radio label="Not at all" value="not"></dile-radio>
      </dile-radio-group>
      <p id="message">Select one value</p>
    `
  }
  firstUpdated() {
    this.shadowRoot.getElementById('group').addEventListener('dile-radio-group-changed', (e) => {
      this.shadowRoot.getElementById('message').innerText = 'Element ' + e.detail.name + ' has value: ' + e.detail.value;
    });
  }
}
customElements.define('my-component', MyComponent);
export const JsStory = () => html`<my-component></my-component>`;
```

### Value initialized

```html preview-story
<dile-radio-group value="red" name="favorite-color" label="Select your favorite color">
  <dile-radio label="Yellow" value="yellow"></dile-radio>
  <dile-radio label="Red" value="red"></dile-radio>
  <dile-radio label="Green" value="Green"></dile-radio>
</dile-radio-group>
```

### Disabled radio buttons

```html preview-story
<dile-radio-group name="transport" label="Prefered transport" disabled>
  <dile-radio label="Car" value="car"></dile-radio>
  <dile-radio label="Bus" value="bus"></dile-radio>
</dile-radio-group>
```

### Styled radio buttons

```html preview-story
<style>
.styled {
  --dile-input-label-color: #114611;
  --dile-input-label-font-weight: bold;
  --dile-radio-icon-color: #20e073; 
  --dile-radio-selected-icon-color: #0c758c; 
  --dile-radio-label-font-size: 1.2rem;
  --dile-radio-icon-size: 28px;
  --dile-radio-label-color: #288ea5;
  --dile-radio-selected-label-color: #184a2e;
}
.styled dile-radio {
  margin: 0.4rem 0;
}
</style>
<dile-radio-group name="transport" label="Prefered transport" class="styled">
  <dile-radio label="Car" value="car"></dile-radio>
  <dile-radio label="Bus" value="bus"></dile-radio>
  <dile-radio label="Train" value="train"></dile-radio>
</dile-radio-group>
```
