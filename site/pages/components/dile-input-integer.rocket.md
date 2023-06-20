```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'components/dile-input-integer.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = 'dile-input-integer';
```

```js script
import { html, css, LitElement } from 'lit'; 
import '@mdjs/mdjs-story/define';
import '@mdjs/mdjs-preview/define';
import '@dile/dile-input/dile-input-integer.js'
import "@dile/dile-menu-hamburger/dile-menu-hamburger.js";
import "@dile/dile-selector/dile-selector.js";
import "@dile/dile-selector/dile-selector-item.js";
```

# dile-input-integer

This component extends from [dile-input](/components/dile-input).

The main diference is that the ```dile-input-integer``` only allow to introduce integer values. So, when the user put the focus out the input, there is performed a validation and eventually the input changes it's contents to ensure has an integer value.

## Install

```bash
npm install @dile/dile-input
```

## Usage

Import the component.

```javascript
import '@dile/dile-input/dile-input-integer';
```

Use the component

```html
<dile-input-integer
  name="units"
  label="Units"
></dile-input-integer>
```

## Custom style

By default, this input component aligns the input text to the right. if you want to align to the left you may use ```--dile-input-text-align``` CSS custom property.

## Further informations

All the properties, events, methods, custom properties, are the same. Please check [dile-input](/components/dile-input) for more information.

## dile-input-integer demo

### Regular integer input

```html preview-story
<dile-input-integer name="quantity" label="Quantity" placeholder="Quantity"></dile-input-integer>
```

### Text align to the left

```html preview-story
<style>
.alignleft {
  --dile-input-text-align: left;
}
</style>

<dile-input-integer class="alignleft" name="quantity" label="Quantity" placeholder="Quantity"></dile-input-integer>
```