---
title: Order Switch
package: '@dile/ui'
element: '&lt;dile-order-switch&gt;'
status: stable
summary: Order filter component toggling between ascending and descending. Useful for search result listings with order switching.
tags: utils
---

# dile-order-switch

Web Component to create a interface useful to create "order filter".

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the component.

```javascript
import '@dile/ui/components/order-switch/order-switch.js';
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
- **selected**: Boolean, default `false`. Marks this switch as the one currently in effect, e.g. inside a group where only one order option applies at a time (like `dile-crud-sort-form`). When `false`, clicking the label just re-announces the current `value` (useful to switch which option is active without changing its direction). When `true`, clicking the label toggles the order, same as clicking the icon — otherwise a click on an already-active label would look like it does nothing.

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

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';
import '@dile/ui/components/order-switch/order-switch.js';

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
</script>
<my-component></my-component>
```

### Styled order switch

```html:preview
<style>
  dile-order-switch {
    color: var(--dile-link-color, blue);
    font-size: 1.5rem;
    font-weight: bold;
    --dile-icon-size: 2rem;
    --dile-icon-color: var(--dile-link-color, blue);
  }
</style>
<dile-order-switch id="order" name="stock" label="Stock units" value="desc"></dile-order-switch>
```

