```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'mixins/dile-selector-mixin.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = 'DileSelectorMixin';
```

```js script
import { html, css, LitElement } from 'lit'; 
import "../../../packages/dile-menu-hamburger/dile-menu-hamburger.js";
import "../../../packages/dile-selector/dile-selector.js";
import "../../../packages/dile-selector/dile-selector-item.js";
```

# DileSelectorMixin

Mixin to select one item from a list.

This mixin declares two properties to make a selection component and listen dile-item-selected event to change the selected item of the list.

## Installation

```bash
npm i @dile/dile-selector-mixin
```

## Usage

To use it you only need to extend your custom element class with the mixin.

```javascript
import { DileSelectorMixin } from '@dile/dile-selector-mixin';

class MyElement extends DileSelectorMixin(HTMLElement) {
  // your custom element code...
}
```

## Requirements

To do it's work, the list of components that should be selected must be in the light DOM of the component. 

```html
<selector-component>
  <selector-item>Item 1</selector-item>
  <selector-item selected>Item 2</selector-item>
  <selector-item>Item 3</selector-item>
</selector-component>
```

The items should dispatch a ```dile-item-selected``` event to inform that this component is selected now. The selected component itself must be detailed inside the event.

```javascript
this.dispatchEvent(new CustomEvent('dile-item-selected', {
  bubbles: true,
  composed: true,
  detail: this
}));
```

## Properties

- **selected**: to set the selected item. The value could be a numeric index (starting on 0) or a string.
- **attrForSelected**: if its set, this property declares the attribute in the selected items to match the ```selected``` property. 
- **selectorId** (optional): A property to link this component to a [dile-pages](https://github.com/Polydile/dile-components/tree/master/packages/dile-pages) component and change automaticaly the page when this component updates. The dile-pages component also needs to have a selectorId attribute with the same value.

## Implementations of DileSelectorMixin

There are some components that implements DileSelectorMixin.

- [dile-tabs](/components/dile-tabs)
- [dile-selector](/components/dile-selector)
