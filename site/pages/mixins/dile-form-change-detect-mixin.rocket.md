```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'mixins/dile-form-change-detect-mixin.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = 'DileFormChangeDetectMixin';
```

```js script
import { html, css, LitElement } from 'lit'; 
import "../../../packages/dile-menu-hamburger/dile-menu-hamburger.js";
import "../../../packages/dile-selector/dile-selector.js";
import "../../../packages/dile-selector/dile-selector-item.js";
```

# DileFormChangeDetectMixin

This mixin detects changes in a form and emmit a ```dile-form-changed``` event when it occurs.

To detect changes the form elements should emmit a ```element-changed``` event. for this reason, this mixins only works with custom elements that have this custom event implemented.

> You could use the [DileEmmitChangeMixin](/mixins/dile-emmit-change-mixin) to send the ```element-changed``` custom event easily.

Also, for this mixin do its work depends on the [DileFormMixin](/mixins/dile-form-mixin), so you need to implement both mixins.

## Installation

```bash
npm i @dile/dile-form-mixin
```

## Usage

```javascript
import { DileFormChangeDetectMixin, DileFormMixin } from '@dile/dile-form-mixin';

export class FctCrudFilters extends 
  DileFormChangeDetectMixin(DileFormMixin(LitElement)) {

    // Code of your component...
    
}
```