```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'components/dile-icon-switch-group.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */
```

```js server


export const title = 'dile-icon-switch-group';
```

```js script
import { html, css, LitElement } from 'lit'; 
import '@mdjs/mdjs-story/define';
import '@mdjs/mdjs-preview/define';
import '@dile/dile-icon-switch/dile-icon-switch-group.js'
import "@dile/dile-menu-hamburger/dile-menu-hamburger.js";
import "@dile/dile-selector/dile-selector.js";
import "@dile/dile-selector/dile-selector-item.js";
```

# dile-icon-switch-group

Web Component to create a group of switchs based on dile-icon-switch.

## Installation

```bash
npm i @dile/dile-icon-switch
```

## Usage

Import the component.

```javascript
import '@dile/dile-icon-switch/dile-icon-switch-group.js';
```

```html
<dile-icon-switch-group>
  <dile-icon-switch .icon=${appsIcon} name="apps"></dile-icon-switch>
  <dile-icon-switch .icon=${favoriteIcon} name="fav" active></dile-icon-switch>
  <dile-icon-switch .icon=${doubleArrowRightIcon} name="arrow"></dile-icon-switch>
</dile-icon-switch-group>
```

## dile-icon-switch-group demos


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
      <dile-icon-switch-group>
        <dile-icon-switch .icon=${appsIcon} name="apps"></dile-icon-switch>
        <dile-icon-switch .icon=${descriptionIcon} name="desc" active></dile-icon-switch>
        <dile-icon-switch .icon=${starIcon} name="star"></dile-icon-switch>
      </dile-icon-switch-group>
    `
  }

  firstUpdated() {
    // This should not be necessary but the component to show the demo does not work well with interpoplation of strings
    this.shadowRoot.querySelector('dile-icon-switch[name="apps"]').icon = appsIcon;
    this.shadowRoot.querySelector('dile-icon-switch[name="desc"]').icon = descriptionIcon;
    this.shadowRoot.querySelector('dile-icon-switch[name="star"]').icon = starIcon;
  }
}
customElements.define('my-component', MyComponent);
export const JsStory = () => html`<my-component></my-component>`;
```


