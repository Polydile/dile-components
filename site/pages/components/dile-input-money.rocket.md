```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'components/dile-input-money.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = 'dile-input-money';
```

```js script
import { html, css, LitElement } from 'lit'; 
import '@mdjs/mdjs-story/define';
import '@mdjs/mdjs-preview/define';
import '../../../packages/dile-input/dile-input-money.js'
import "../../../packages/dile-menu-hamburger/dile-menu-hamburger.js";
```

# dile-input-money

This component extends from [dile-input](/components/dile-input).

This component is customized to allow only to introduce money values, with cents. So, when the user introduces a value it is validated and formated.

## Install

```bash
npm install @dile/dile-input
```

## Usage

Import the component.

```javascript
import '@dile/dile-input/dile-input-money';
```

Use the component

```html
<dile-input-money
  name="Price"
  label="Price"
></dile-input-money>
```

## Properties

The same as [dile-input](/components/dile-input) and:

- **decimalSeparator**: introduces the decimal separator character. Default ".".

## Custom style

By default, this input component aligns the input text to the right. if you want to align to the left you may use ```--dile-input-text-align``` CSS custom property.

## dile-input-money demos

### Regular input

```html preview-story
<dile-input-money name="price" label="Price" placeholder="Price"></dile-input-money>
```

### Decimal separator ","

```html preview-story
<dile-input-money decimalSeparator="," name="price" label="Importe" placeholder="Introduce el importe" disableAutocomplete></dile-input-money>
```