---
title: Chip Tooltip
tags: feedback
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
- **position**: This property sets the orientation where the tooltiptext will be displayed, we have 4 values: top, left, right, bottom. By default is bottom. if you set a position that doesn't exist the position will be top.
- **label**: Label for the chip.
- **icon**: Icon object from [@dile/icons](/icons/material-icons/). By default is `infoIcon`.
- **arrow**: Boolean property that adds an arrow design to the tooltip. By default is false.
- **fadeIn**: Boolean property that adds a fade in animation to the tooltip. By default is true.

## Styling

This component uses [dile-tooltip](/components/dile-tooltip/) for the tooltip styles and defines some additional custom properties:

### CSS Custom Properties

You can customize the component using CSS Custom Properties.

Custom property | Description | Default
----------------|-------------|---------
--dile-chip-tooltip-width | Tooltip width | 165px (responsive: 190px at 350px+, 240px at 490px+)
--dile-chip-tooltip-font-size | Chip text font size | 0.9rem
--dile-chip-tooltip-padding | Chip padding | 0.2rem 0.7rem
--dile-chip-tooltip-icon-color | Icon color | #fff
--dile-chip-tooltip-icon-size | Icon size | 22px
--dile-chip-tooltip-hover-background-color | Chip background color on hover | --dile-primary-dark-color or #14644f
--dile-primary-color | Chip background color | #7BB93D
--dile-on-primary-color | Chip text color | #fff
--dile-primary-dark-color | Dark primary color fallback | #14644f
--dile-tooltip-focus-outline-width | Focus indicator outline width | 2px
--dile-tooltip-focus-outline-color | Focus indicator outline color | #12c9e9
--dile-tooltip-focus-outline-offset | Focus indicator outline offset | 2px


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
      --dile-chip-tooltip-icon-color: rgb(37, 115, 59);
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
      --dile-chip-tooltip-hover-background-color:rgb(91, 24, 89);
    }
</style>
<dile-chip-tooltip class="styled" label="Styled!" message="I am an styled tooltip"></dile-chip-tooltip>
```