```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'components/dile-hamburger.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = 'dile-hamburger';
```

```js script
import { html, css, LitElement } from 'lit'; 
import '@mdjs/mdjs-story/define';
import '@mdjs/mdjs-preview/define';
import '@dile/dile-hamburger/dile-hamburger.js'
import "@dile/dile-menu-hamburger/dile-menu-hamburger.js";
import "@dile/dile-selector/dile-selector.js";
import "@dile/dile-selector/dile-selector-item.js";
```

# dile-hamburger

A component to show the typical **hamburger menu icon** with an smooth animation between two states, open and closed. 

The component states, opended and closed, defines how the icon is displayed. There is a boolean property ```active``` to define it's state. 

**This component do not responds to any user interaction by itself**. It is suposed that  ```dile-hamburger``` will be used inside other componets who should have the responsability to change the state according to their requirements, **binding his state to the ```active``` property**, or **changing it programaticaly**.

The main hability of this hamburger icon component is his smooth CSS animation when changes it's state. 

## Installation

```bash
npm i @dile/dile-hamburger
```

## Usage

Import the component.

```javascript
import '@dile/dile-hamburger/dile-hamburger.js';
```

Use the component.

```html
<dile-hamburger></dile-hamburger>
```

## Properties

- **active**: Boolean property to set the state of the hamburger icon.

## Customization

You can customize the icons using this CSS Custom properties;

Custom property | Description | Default
----------------|-------------|---------
--dile-hamburger-color | Icon color | #000
--dile-hamburger-padding-x | Horizontal icon box padding  | 15px
--dile-hamburger-padding-y | Vertical icon box padding  | 15px
--dile-hamburger-active-color | Icon color | #000
--dile-hamburger-line-size | Width of the icon lines | 3px
--dile-hamburger-width | Width of the entire icon | 24px
--dile-hamburger-height | Height of the entire icon | 24px
--dile-hamburger-line-separation | Separation between lines, only in inactive state icon | -6px

## dile-hamburger demos

### Default hamburger icon

```js preview-story
class MyComponent extends LitElement {
  static get styles() {
    return css`
     
    `
  }

  render() {
    return html`
      <dile-hamburger id="icon"></dile-hamburger>
      <button id="toggle">Toggle active</button>
    `
  }
  firstUpdated() {
    this.shadowRoot.getElementById('toggle').addEventListener('click', () => {
      this.shadowRoot.getElementById('icon').active = ! this.shadowRoot.getElementById('icon').active;
    });
  }
}
customElements.define('my-component', MyComponent);
export const JsStory = () => html`<my-component></my-component>`;
```

### styled hamburger icon

```js preview-story
class OtherComponent extends LitElement {
  static get styles() {
    return css`
     dile-hamburger {
      --dile-hamburger-color: #4cc;
      --dile-hamburger-active-color: rgb(238, 30, 151);
      --dile-hamburger-line-size: 6px;
      --dile-hamburger-width: 48px;
      --dile-hamburger-height: 36px;
      --dile-hamburger-line-separation: 14px; 
    }
    `
  }

  render() {
    return html`
      <dile-hamburger id="icon"></dile-hamburger>
      <button id="toggle">Toggle active</button>
    `
  }
  firstUpdated() {
    this.shadowRoot.getElementById('toggle').addEventListener('click', () => {
      this.shadowRoot.getElementById('icon').active = ! this.shadowRoot.getElementById('icon').active;
    });
  }
}
customElements.define('other-component', OtherComponent);
export const JsStory2 = () => html`<other-component></other-component>`;
```