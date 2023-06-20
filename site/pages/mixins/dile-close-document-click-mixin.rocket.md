```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'mixins/dile-close-document-click-mixin.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = "DileCloseDocumentClickMixin";

```

```js script
import { html, css, LitElement } from 'lit'; 
import "@dile/dile-menu-hamburger/dile-menu-hamburger.js";
import "@dile/dile-selector/dile-selector.js";
import "@dile/dile-selector/dile-selector-item.js";
```

# DileCloseDocumentClickMixin

Mixin to close custom elements when user do a click in any area of the document.

This mixin, that you may apply to any Custom Element, offers a way to close elements when the user clicks in any area of the document.

## Installation

```bash
npm i @dile/dile-close-document-click-mixin
```

## Usage

Import and extend your class.

To use it you only need to extend your custom element class with the mixin.

```javascript
import { DileCloseDocumentClickMixin } from '@dile/dile-close-document-click-mixin';

class MyElement extends DileCloseDocumentClickMixin(HTMLElement) {
  // your custom element code...
}
```

### Requirements

To do it's work, the mixin depends on a close() method created in your custom element class.

You need to implement the close() method on your own custom element to do the specific work to close your element.

## Available methods

The mixin also provides two utility methods implemented in your custom elements:

- **closeAll()**: Close all the elements of this type
- **closeOthers()**: Close the other items of this type (distinct to this)

## Implementatios of DileCloseDocumentClickMixin

Some components that implements DileCloseDocumentClickMixin:

- [dile-menu-overlay](/components/dile-menu-overlay)