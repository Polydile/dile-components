```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'components/dile-chip-tooltip.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = 'dile-chip-tooltip';
```

```js script
import { html, css, LitElement } from 'lit'; 
import '@mdjs/mdjs-story/define';
import '@mdjs/mdjs-preview/define';
import '@dile/dile-tooltip/dile-chip-tooltip.js'
import "@dile/dile-menu-hamburger/dile-menu-hamburger.js";
import "@dile/dile-selector/dile-selector.js";
import "@dile/dile-selector/dile-selector-item.js";
```

# dile-chip-tooltip

Web component to display a configurable chip that opens a tooltip.

## Installation

```bash
npm install @dile/dile-tooltip
```

## Usage

Import the component.

```javascript
import '@dile/dile-tooltip/dile-chip-tooltip';
```

Use the component.

```html
<dile-chip-tooltip message="I am a message" label="Tooltip"></dile-chip-tooltip>
```

## Properties

- **message**: Tooltip message.
- **position**: This property sets the orientation where the tooltiptext will be displayed, we have 4 values: top, left, right, bottom. By default is top. if you set
a position that doesnt exist the position will be top.
- **label**: Label for the chip.

## Styling

Use the [dile-tooltip](https://dile-components.polydile.com/components/dile-tooltip/) styles and some additional styles. Not documented yet...

## dile-tooltip demos

### Default tooltips

```html preview-story
<dile-chip-tooltip message="I am a message" label="Tooltip"></dile-chip-tooltip>
```

### Only icon

```html preview-story
<style>
  .onlyicon {
      --dile-chip-tooltip-padding: 0.25rem;
    }
</style>
<dile-chip-tooltip message="Hi my friend!!" class="onlyicon" position="right"></dile-chip-tooltip>
```

### Styled chip tooltip

```html preview-story
<style>
  .styled {
      --dile-chip-tooltip-background-color: #7d187b; 
      --dile-chip-tooltip-text-color: #ffc;
      --dile-chip-tooltip-icon-color:  rgb(239, 161, 238) 
    }
</style>
<dile-chip-tooltip class="styled" label="Styled!" message="I am an styled tooltip"></dile-chip-tooltip>
```