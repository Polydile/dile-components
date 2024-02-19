```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'components/dile-tooltip.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = 'dile-tooltip';
```

```js script
import { html, css, LitElement } from 'lit'; 
import '@mdjs/mdjs-story/define';
import '@mdjs/mdjs-preview/define';
import '@dile/dile-tooltip/dile-tooltip.js'
import "@dile/dile-menu-hamburger/dile-menu-hamburger.js";
import "@dile/dile-selector/dile-selector.js";
import "@dile/dile-selector/dile-selector-item.js";
```

# dile-tooltip

Web component to display a configurable tooltip.


## Installation

```bash
npm install @dile/dile-tooltip
```

> In this package you also will find [dile-chip-tooltip](/components/dile-chip-tooltip/) component.

## Usage

Import the component.

```javascript
import '@dile/dile-tooltip/dile-tooltip';
```

Use the component.

```html
<dile-tooltip tooltip="tooltip text" position="top" arrow fadeIn > Text </dile-tooltip>
```

## Properties

The component has the properties bellow:

- **tooltip**: This property sets the text that will be displayed when the mouse hover the element.
- **position**: This property sets the orientation where the tooltiptext will be displayed, we have 4 values: top, left, right, bottom. By default is top. if you set
a position that doesnt exist the position will be top.
- **fadeIn**: This is a boolean property and establishes if the tooltip will be displayed with an arrow. By default is false.
- **arrow**: This is a boolean property and establishes if the tooltiptext will be displayed with an animation. By default is false.

## Styling

Custom property | Description | Default
----------------|-------------|---------
--dile-tooltip-background-color | The background color of the tooltip | #e74c3c
--dile-tooltip-width | The width of the tooltip | 120px
--dile-tooltip-border-radius | The border radius of the tooltip | 6px
--dile-tooltip-padding | The padding of the tooltip text | 5px
--dile-tooltip-time-transition | The time of transition of the animation if fadeIn sets true | 1s
--dile-tooltip-font-size | The font size of the tooltip | 16px
--dile-tooltip-color | The text color of the tooltip | #fff
--dile-tooltip-text-align | Text align for the tooltip | center

## dile-tooltip demos

### Default tooltips

```html preview-story
<style>
  dile-tooltip {
    color: #777;
  }
</style>
<dile-tooltip tooltip="tooltip text" position="top" fadeIn>I have a top tooltip</dile-tooltip> | 
<dile-tooltip tooltip="tooltip text" position="right" fadeIn>I have a right tooltip</dile-tooltip> | 
<dile-tooltip tooltip="tooltip text" position="left" fadeIn>I have a left tooltip</dile-tooltip> | 
<dile-tooltip tooltip="tooltip text" position="bottom" fadeIn>I have a bottom tooltip</dile-tooltip> 
```

### Arrow tooltips

```html preview-story
<dile-tooltip tooltip="tooltip text" position="top" fadeIn arrow>I have a top tooltip</dile-tooltip> | 
<dile-tooltip tooltip="tooltip text" position="right" fadeIn arrow>I have a right tooltip</dile-tooltip> | 
<dile-tooltip tooltip="tooltip text" position="left" fadeIn arrow>I have a left tooltip</dile-tooltip> | 
<dile-tooltip tooltip="tooltip text" position="bottom" fadeIn arrow>I have a bottom tooltip</dile-tooltip> 
```

### Styled tooltips

```html preview-story
<style>
.styled {
  --dile-tooltip-background-color: #cef;
  --dile-tooltip-color: #303030;
  --dile-tooltip-padding: 8px;
  --dile-tooltip-font-size: 1.1rem;
}
</style>
<dile-tooltip class="styled" tooltip="tooltip text" position="top" fadeIn arrow>I have a top tooltip</dile-tooltip> | 
<dile-tooltip class="styled" tooltip="tooltip text" position="right" fadeIn arrow>I have a right tooltip</dile-tooltip> | 
<dile-tooltip class="styled" tooltip="tooltip text" position="left" fadeIn arrow>I have a left tooltip</dile-tooltip> | 
<dile-tooltip class="styled" tooltip="tooltip text" position="bottom" fadeIn arrow>I have a bottom tooltip</dile-tooltip> 
```