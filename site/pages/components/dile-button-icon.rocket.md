```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'components/dile-button-icon.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = "dile-button-icon";

```

```js script
import { html, css, LitElement } from 'lit'; 
import '@mdjs/mdjs-story/define';
import '@mdjs/mdjs-preview/define';
import '../../../packages/dile-button-icon/dile-button-icon.js'
import "../../../packages/dile-menu-hamburger/dile-menu-hamburger.js";
```

# dile-button-icon

Web Component to create a customized button with an icon.

## Installation

```bash
npm i @dile/dile-button-icon
```

This component extends [dile-button](/components/dile-button), so you can use the component in a similar way. The main diference is that the componente can display an icon. 

## Usage

Import the component.

```html
<script type="module">
  import '@dile/dile-button-icon/dile-button-icon.js';
</script>
```

The icon is assigned via ```icon``` property.

```javascript
html`<dile-button-icon .icon="${someIconHtmlTemplate}">Button Label</dile-button-icon>`
```

> Usualy the provided icon will be a lit-html template, so, when you use it on a lit component is necesary to bind the property value using a dot in the component attribute.

### Using a custom icon

You can customize the icon of the button using a template with your own svg. To do that its is posible to declare a lit-html template:

```javascript
const appsIcon = html`<svg class="dile-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"/></svg>`;
```

Then, you can use the template created:

```javascript
html`<dile-button-icon .icon="${appsIcon}">Button Label</dile-button-icon>`
```

### Using a icons library

> There are some icons in the [@dile/icons package](https://github.com/Polydile/dile-components/tree/master/packages/icons). So, you can use them easily in your components.

```javascript
import { closeIcon } from '@dile/icons';

// Late, in render() method of the component
html`<dile-button-icon .icon="${closeIcon}">Button Label</dile-button-icon>`
```

### Using an image

It is also possible to use any image or SVG you have binding a template with a ```<img>``` tag.

```javascript
let imageIcon = html`<img src="./images/loto.png">`;
html`<dile-button-icon .icon=${imageIcon}>Yoga practice</dile-button-icon>`
```

## Properties

Same as dile-button, but also:

- **icon**: Lit-html template with the content to display the icon

## CSS Custom Properties

You can customize it using the same dile-button CSS Custom Properties but also:

Custom property | Description | Default
----------------|-------------|---------
--dile-button-icon-separation | Space between the icon and the button text | 0.3rem
--dile-icon-size | Icon size | 24px
--dile-icon-color | Icon color | #888
--dile-button-icon-hover-color | Icon hover color | #888

## dile-button-icon demos

### Button icon demo

```js preview-story
import { appsIcon } from "../../../packages/icons/index.js";

class MyComponent extends LitElement {
  static get styles() {
    return css`
      :host {
        --dile-icon-color: #fff;
      }
    `
  }

  render() {
    return html`
      <dile-button-icon .icon=${this.appsIcon}>Control Panel</dile-button-icon>
    `
  }

  firstUpdated() {
    // This should not be necessary but the component to show the demo does not work well with interpoplation of strings
    this.shadowRoot.querySelector('dile-button-icon').icon = appsIcon;
  }

  get icon() {
    return html`
    <svg class="dile-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"/></svg>
    `
  }
}
customElements.define('my-component', MyComponent);
export const JsStory = () => html`<my-component></my-component>`;
```

### Styled button icon

```js preview-story
class OtherComponent extends LitElement {
  static get styles() {
    return css`
      .styled {
        --dile-button-border-color: #0f010f; 
        --dile-button-background-color: #ffffdd;
        --dile-button-hover-background-color: #f3d6e3;
        --dile-button-text-color:  #396; 
        --dile-button-hover-text-color:  #000; 
        --dile-button-font-weight: bold;
        --dile-button-font-size: 1.4rem;
        --dile-button-ring-color: #cc5099;
        --dile-button-ring-offset-width: 2px;
        --dile-button-border-radius: 3px;
        --dile-button-text-transform: uppercase;
        --dile-icon-color: #fff;
        --dile-icon-size: 32px;
      }
    `
  }

  render() {
    return html`
      <dile-button-icon class="styled" .icon=${this.icon}>Polydile</dile-button-icon>
    `
  }

  firstUpdated() {
    // This should not be necessary but the component to show the demo does not work well with interpoplation of strings
    this.shadowRoot.querySelector('dile-button-icon').icon = this.icon;
  }

  get icon() {
    return html`
    <img src="/images/logo-polydile.png" style="width: 40px;">
    `
  }
}
customElements.define('other-component', OtherComponent);
export const Js2Story = () => html`<other-component></other-component>`;
```
