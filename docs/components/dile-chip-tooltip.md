---
title: Chip Tooltip
---

# dile-chip-tooltip

Web component to display a configurable chip that opens a tooltip.

## Installation

```bash
npm install @dile/ui
```

## Usage

Import the component.

```javascript
import '@dile/ui/components/tooltip/chip-tooltip';
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

Use the [dile-tooltip](/components/dile-tooltip/) styles and some additional styles. Not documented yet...

## dile-tooltip demos

### Default tooltips

```html:preview
<dile-chip-tooltip message="I am a message" label="Tooltip"></dile-chip-tooltip>
```

### Only icon

```html:preview
<style>
  .onlyicon {
      --dile-chip-tooltip-padding: 0.25rem;
    }
</style>
<dile-chip-tooltip message="Hi my friend!!" class="onlyicon" position="right"></dile-chip-tooltip>
```

### Styled chip tooltip

```html:preview
<style>
  .styled {
      --dile-primary-color: #7d187b; 
      --dile-on-primary-color:  rgb(239, 161, 238);
      --dile-chip-tooltip-icon-color:  rgb(239, 161, 238);
    }
</style>
<dile-chip-tooltip class="styled" label="Styled!" message="I am an styled tooltip"></dile-chip-tooltip>
```