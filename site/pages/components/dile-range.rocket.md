```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'components/dile-range.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = "dile-range";

```

```js script
import { html, css, LitElement } from 'lit'; 
import '@mdjs/mdjs-story/define';
import '@mdjs/mdjs-preview/define';
import '@dile/dile-range/dile-range.js'
import "@dile/dile-menu-hamburger/dile-menu-hamburger.js";
import "@dile/dile-selector/dile-selector.js";
import "@dile/dile-selector/dile-selector-item.js";
```

# dile-range

Web Component to create a customized range input.

## Installation

```bash
npm i @dile/dile-range
```

## Usage

Import the dile-range component.

Work in progress, not documented...

```javascript
import '@dile/dile-range/dile-range.js';
```

Use the component.

```html
<dile-range></dile-range>
```

### Properties

- **max**
- **min**
- **value**
- **step**
- **name**: The name of the range

### CSS Custom Properties

You can customize it using CSS Custom Properties.

Custom property | Description | Default
----------------|-------------|---------
To do documentation | |

## Events

- **input**: This element is base on a native input element. So, you can listen the native `input` event.

```javascript
rangeField.addEventListener('input', (e) => {
  console.log('input event named ', e.target.name, ' has value: ', e.target.value);
});
```

- **element-changed**: As other input elements in dile-components, dile-range emmits ```element-changed``` event is when value on the input changes. In the event detail will provide the element ```name``` and ```value```properties.

## dile-range demos

### Regular range

```html preview-story
<dile-range></dile-range>
```

### Styled range

```html preview-story
<style>
  .styled {
    --dile-range-thumb-color: rgb(243, 133, 55);
    --dile-range-thumb-height: 3rem;
    --dile-range-line-height: 1.5rem;
    --dile-range-thumb-width: 1rem;
    --dile-range-thumb-border-radius: 0.5rem;
    --dile-range-line-color: rgb(157, 122, 151);
    --dile-range-thumb-margin-top: -12px;
  }
</style>
<dile-range class="styled"></dile-range>
```
