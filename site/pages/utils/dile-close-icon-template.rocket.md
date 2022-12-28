```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'utils/dile-close-icon-template.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = 'DileCloseIconTemplate';
```

```js script
import { html, css, LitElement } from 'lit'; 
import '@mdjs/mdjs-story/define';
import '@mdjs/mdjs-preview/define';
import "../../../packages/dile-menu-hamburger/dile-menu-hamburger.js";
import "../../../packages/dile-selector/dile-selector.js";
import "../../../packages/dile-selector/dile-selector-item.js";
```

# DileCloseIconTemplate

This package only contains two files to implement a simple close icon, to use in other web components: One SVG icon and a Lit Template to implement a that icon.

> Now is better to use [dile-icon](/components/icon) together with [icons](/utils/icons) because you will have more versatility, with more style customizations and many diferent icons to use in your components.

## Installation 

```bash
npm install @dile/dile-close-icon-template
```

## Usage

```javascript
import { closeIcon } from '@dile/dile-close-icon-template';
```

Yo may use this icon in a Lit template:

```javascript
render() {
  return html`
    // Your component template
    ${ closeIcon }
  `;
}
```

To easy style the icon you may use the CSS declaration provided in this package.

```javascript
import { closeIcon, closeIconCss } from '@dile/dile-close-icon-template';
```

You may use this style declaration like this:

```javascript
static get styles() {
  return [closeIconCss, css`
    :host {
        --dile-close-icon-template-color: #fce;
      }
  `];
}
```

As you may note, there is a custom CSS property named ```--dile-close-icon-template-color```. Use it to set the color of the icon.