```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'mixins/dile-close-on-esc-pressed-mixin.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = "DileCloseOnEscPressedMixin";

```

```js script
import { html, css, LitElement } from 'lit'; 
import "@dile/dile-menu-hamburger/dile-menu-hamburger.js";
import "@dile/dile-selector/dile-selector.js";
import "@dile/dile-selector/dile-selector-item.js";
```

# DileCloseOnEscPressedMixin

Mixin function to create components that close themselves pressing the Esc key

Extending it the component creates keyboard listeners to react when the user press the Esc key. When that key is detected, the component closes by call a close() method on this component.

## Requirements

To properly close the element, the component which extends from this mixin needs to have a close() method, to implement it's closing behaviour.

## Installation

```bash
npm install @dile/dile-close-on-esc-pressed-mixin
```

## Usage

Use the mixin.

```javascript
import { LitElement, html, css } from 'lit';
import { DileCloseOnEscPressed } from '@dile/dile-close-on-esc-pressed-mixin';

class NewComponent  extends DileCloseOnEscPressed(LitElement) {

}
```



