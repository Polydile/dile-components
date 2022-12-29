```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'components/dile-input-percentage.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = 'dile-input-percentage';
```

```js script
import { html, css, LitElement } from 'lit'; 
import '@mdjs/mdjs-story/define';
import '@mdjs/mdjs-preview/define';
import '../../../packages/dile-input/dile-input-percentage.js'
import "../../../packages/dile-menu-hamburger/dile-menu-hamburger.js";
import "../../../packages/dile-selector/dile-selector.js";
import "../../../packages/dile-selector/dile-selector-item.js";
```

# dile-input-percentage

This component extends from [dile-input](/components/dile-input).

This component is customized to allow only to introduce integer or float percentage values. When the user introduces a value it is validated to suit this requirement. Also the component add a label to the right with a percentage symbol.

## Install

```bash
npm install @dile/dile-input
```

## Usage

Import the component.

```javascript
import '@dile/dile-input/dile-input-percentage';
```

Use the component

```html
<dile-input-percentage
  name="discount"
  label="Discount"
></dile-input-percentage>
```

## Properties

The same as [dile-input](/components/dile-input) and:

- **decimalSeparator**: introduces the decimal separator character. Default ".".

## dile-input-percentage demos

### Regular input

```html preview-story
<dile-input-percentage name="tax_withholding" label="Tax withholding" placeholder="Tax withholding"></dile-input-percentage>
```

### Decimal separator ","

```html preview-story
<dile-input-percentage decimalSeparator="," name="discount" label="Discount" placeholder="Discount"></dile-input-percentage>
```
