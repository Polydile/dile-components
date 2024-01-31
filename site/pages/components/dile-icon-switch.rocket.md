```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'components/dile-icon-switch.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */
```

```js server


export const title = 'dile-icon-switch';
```

```js script
import { html, css, LitElement } from 'lit'; 
import '@mdjs/mdjs-story/define';
import '@mdjs/mdjs-preview/define';
import '@dile/dile-icon-switch/dile-icon-switch.js'
import "@dile/dile-menu-hamburger/dile-menu-hamburger.js";
import "@dile/dile-selector/dile-selector.js";
import "@dile/dile-selector/dile-selector-item.js";
```

# dile-icon-switch

Web Component to create a switch based on an icon.

## Installation

```bash
npm i @dile/dile-icon-switch
```

## Usage

Import the component.

```javascript
import '@dile/dile-icon-switch/dile-icon-switch.js';
```

You need to provide the icon in a ```icon``` property.

```html
<dile-icon-switch .icon="${appsIcon}"></dile-icon-switch>
```

Usualy the provided icon will be a lit-html template. How to include the icon is explained at the [dile-icon](./dile-icon) documentation.

### Properties

- **name**: name of the switch element
- **icon**: The icon (object property)
- **active**: Boolean property with the switch state 

### Events

- **dile-icon-switch-changed**: fired on switch changes. The detail property has the values of the name and the active property values:

```javascript
{
  nane: 'element-name-value'
  active: true
}
```

### CSS Custom Properties

You can customize it using CSS Custom Properties.

Custom property | Description | Default
----------------|-------------|---------
--dile-icon-size | Icon size | 24px
--dile-icon-switch-active-color | Icon color on active state | #7BB93D
--dile-icon-switch-inactive-color | Icon color on inactive state | #303030

## dile-icon-switch demos

### Icons demo

```js preview-story
import { appsIcon } from "../../../packages/icons/index.js";
import { descriptionIcon } from "../../../packages/icons/index.js";
import { starIcon } from "../../../packages/icons/index.js";

class MyComponent extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        align-items: center;
      }
    `
  }

  render() {
    return html`
      <dile-icon-switch class="apps" name="switch1" .icon=${this.appsIcon}></dile-icon-switch>
    `
  }

  firstUpdated() {
    // This should not be necessary but the component to show the demo does not work well with interpoplation of strings
    this.shadowRoot.querySelector('dile-icon-switch.apps').icon = appsIcon;
  }
}
customElements.define('my-component', MyComponent);
export const JsStory = () => html`<my-component></my-component>`;
```

### Styled icons

```js preview-story
import { homeIcon } from "../../../packages/icons/index.js";
import { helpIcon } from "../../../packages/icons/index.js";
import { receiptIcon } from "../../../packages/icons/index.js";

class OtherComponent extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        align-items: center;
        column-gap: 0.5rem;
      }
      .styled {
        --dile-icon-switch-active-color: red;
        --dile-icon-switch-inactive-color: pink;
        --dile-icon-size: 32px;
      }
      .styled2 {
        --dile-icon-switch-active-color: #990099;
        --dile-icon-switch-inactive-color: #ddd;
        --dile-icon-size: 18px;
      }
      .styled3 {
        --dile-icon-switch-active-color: blue;
        --dile-icon-switch-inactive-color: #9bd;
        --dile-icon-size: 40px;
      }
    `
  }

  render() {
    return html`
      <dile-icon-switch id="icon1" class="styled">Polydile</dile-icon-switch>
      <dile-icon-switch id="icon2" class="styled2">Polydile</dile-icon-switch>
      <dile-icon-switch id="icon3" class="styled3">Polydile</dile-icon-switch>
    `
  }

  firstUpdated() {
    // This should not be necessary but the component to show the demo does not work well with interpoplation of strings
    this.shadowRoot.querySelector('#icon1').icon = homeIcon;
    this.shadowRoot.querySelector('#icon2').icon = helpIcon;
    this.shadowRoot.querySelector('#icon3').icon = receiptIcon;
  }
}
customElements.define('other-component', OtherComponent);
export const Js2Story = () => html`<other-component></other-component>`;
```

