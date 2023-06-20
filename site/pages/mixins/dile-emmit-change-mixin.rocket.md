```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'mixins/dile-emmit-change-mixin.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = "DileEmmitChangeMixin";

```

```js script
import { html, css, LitElement } from 'lit'; 
import "@dile/dile-menu-hamburger/dile-menu-hamburger.js";
import "@dile/dile-selector/dile-selector.js";
import "@dile/dile-selector/dile-selector-item.js";
```

# DileEmmitChangeMixin

This mixin has a method to emmit a ```element-changed``` custom event.

> The components how implements this mixin must call the method for themselves.

This mixin is useful to create a standard custom event used on form elements that can be integrated to the automatisms that [DileFormMixin](/mixins/dile-form-mixin) provides.

## Installation

```bash
npm i @dile/dile-form-mixin
```

## Usage

```javascript
import { DileEmmitChangeMixin } from '@dile/dile-form-mixin';

class MyElement extends DileEmmitChangeMixin(HTMLElement) {
  // your custom element code...
}
```

## Methods

- **emmitChange()**: this method emmits the ```element-changed``` custom event. The event is configured with a detail object containing the ```name``` and ```value``` properties of the component.

```javascript
detail: {
  name: this.name,
  value: this.value
}
```

## Implementations of DileEmmitChangeMixin

There are many form components that implements this mixin.

- [dile-input](/components/dile-input)
- [dile-radio-group](/components/dile-radio-group)
- [dile-select](/components/dile-select)
- And others...