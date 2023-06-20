```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'components/dile-order-switch.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = 'dile-order-switch';
```

```js script
import { html, css, LitElement } from 'lit'; 
import '@mdjs/mdjs-story/define';
import '@mdjs/mdjs-preview/define';
import '@dile/dile-order-switch/dile-order-switch.js'
import "@dile/dile-menu-hamburger/dile-menu-hamburger.js";
import "@dile/dile-selector/dile-selector.js";
import "@dile/dile-selector/dile-selector-item.js";
```

# dile-order-switch

Web Component to create a interface useful to create "order filter".

## Installation

```bash
npm i @dile/dile-order-switch
```

## Usage

Import the component.

```javascript
import '@dile/dile-order-switch/dile-order-switch.js';
```

Use the component.

```html
<dile-order-switch name="name" label="Name"></dile-order-switch>
```

This component does not to order anything bi itself. Yo can use to create a switch order from ascendent to descendent useful to search result listings.

## Properties

- **name**: for identification pourposes, like "name" on the form input elements.
- **value**: the value (will be "asc" or "desc")
- **label**: the label

## Methods

- **toggle()**: change the order value

## Custom Events

This component implements the DileEmmitChangeMixin mixin, so it dispached a custom event:

- **element-changed**: this custom event is dispatched when the order value changes. On the event object detail you will find an object with the name of the order interface and its current value.

```javascript
{
  name: "order_name_element",
  value "asc"
}
```

### CSS Custom Properties

You can customize the icon color and size using [dile-icon](https://github.com/Polydile/dile-components/tree/master/packages/dile-icon) CSS Custom Properties.

## dile-order-switch demos

### Default order switch

```js preview-story
class MyComponent extends LitElement {
  
  render() {
    return html`
      <dile-order-switch id="order" name="name" label="Name"></dile-order-switch>
      <p>To change the order do a click on the component. Also you can change from outside with the toggle method, using this <button id="change">Change button</button>.
      <p>
        The order is <span id="ordervalue">asc</span>
      </p>
    `
  }
  firstUpdated() {
    this.shadowRoot.getElementById('change').addEventListener('click', () => {
      this.shadowRoot.getElementById('order').toggle();
    });
    this.shadowRoot.getElementById('order').addEventListener('element-changed', (e) => {
      this.shadowRoot.getElementById('ordervalue').innerText = e.detail.value;
    });
  }
}
customElements.define('my-component', MyComponent);
export const JsStory = () => html`<my-component></my-component>`;
```

### Styled order switch

```html preview-story
<style>
  dile-order-switch {
    color: blue;
    font-size: 1.5rem;
    font-weight: bold;
    --dile-icon-size: 2rem;
    --dile-icon-color: blue;
  }
</style>
<dile-order-switch id="order" name="stock" label="Stock units" value="desc"></dile-order-switch>
```

