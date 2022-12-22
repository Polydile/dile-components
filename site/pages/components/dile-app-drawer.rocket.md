```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'components/dile-app-drawer.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = 'dile-app-drawer';
```

```js script
import { html } from 'lit'; 
import '@mdjs/mdjs-story/define';
import '@mdjs/mdjs-preview/define';
import '../../../packages/dile-app-drawer/dile-app-drawer.js'
import "../../../packages/dile-menu-hamburger/dile-menu-hamburger.js";
```

# dile-app-drawer

Web component to create a simple animated menu, useful as app global menu, with a look & feel similar to the material design navigation drawer component.

> **Tip:** Check the [dile-menu-hamburger](/components/dile-menu-hamburger) component to implement a app drawer menu in a easier way.

## Installation

```bash
npm i @dile/dile-app-drawer
```

## Usage

Import the component.

```javascript
import '@dile/dile-app-drawer/dile-app-drawer.js';
```

Use the component.

```html
<dile-app-drawer>
  <p><a href="#">Link 1</a></p>
  <p><a href="#">Another link</a></p>
  <p><a href="#">More information</a></p>
  <p><a href="#">Contact us</a></p>
</dile-app-drawer>
```

## Properties

This componen has two properties:

- **opened**: Set the state of the component between opened and closed. Boolean property.
- **direction**: Defines de animation and direction to open the menú. String property one of "top" or "left". Default is "top".

## Methods

The component also provides a set of useful methods to controls the component state programmatically.

- **open()**: Opens the menu.
- **close()**: Closes the menu.
- **toggle()**: Changes the state, from open to close or close to open.

## Events

- **dile-app-drawer-closed**: Dispatched when the interface closes by any reason.
- **dile-app-drawer-click-outside**: This custom event is dispatched when the drawer panel is closed because a user click outside the menu layer.

## CSS customization

There are some CSS custom properties to customize the style and the animation of this drawer component.

Custom property | Description | Default
----------------|-------------|---------
--dile-app-drawer-content-height | Height of the menu | auto (or 100vh on "letf" direction)
--dile-app-drawer-content-width | Width of the menu | 100vw (or auto on "left" direction)
--dile-app-drawer-background-color | Background color menu layer | #ddd
--dile-app-drawer-z-index | z-index menu layer | 10001
--dile-app-drawer-closed-top | Drawer content top position in closed state | -100vh (or 0 on "left" direction) 
--dile-app-drawer-closed-left | Drawer content left position in closed state | 0 (or -100vw on "left" direction) 
--dile-app-drawer-box-shadow | Menu shadow | 0 1px 8px #000 (or 1px 0 8px #000 on "left" direction)
--dile-app-drawer-modal-background-color | Menu modal layer background color | rgba(20, 20, 20, 0.7)
--dile-app-drawer-modal-z-index | Menu modal layer z-index | 10000

## dile-app-drawer demos

> **Tip:** You can use the hamburger menu on this site to see this component in action.

```js preview-story
import { LitElement, css } from 'lit';
class MyComponent extends LitElement {
  static get styles() {
    return css`
      .menu-content {
        padding: 1rem;
      }
      h2 {
        margin: 0 0 10px 0;
      }
      h2 span {
        font-size: 0.9rem;
      }
      p {
        margin-top: 0;
      }
    `
  }

  render() {
    return html`
      <dile-app-drawer id="menu">
        <div class="menu-content">
          <h2>Menu <span>(Click outside to close)</span></h2>
          <p><a href="#">Link 1</a></p>
          <p><a href="#">Another link</a></p>
          <p><a href="#">More information</a></p>
          <p><a href="#">Contact us</a></p>
        </div>
      </dile-app-drawer>
      <button id="open">Show app drawer</button>
    `
  }
  firstUpdated() {
    this.shadowRoot.getElementById('open').addEventListener('click', () => {
      this.shadowRoot.getElementById('menu').open();
    });
  }
}
customElements.define('my-component', MyComponent);
export const JsStory = () => html`<my-component></my-component>`;
```