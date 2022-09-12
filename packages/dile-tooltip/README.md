# @dile/dile-tooltip

Web component to display a configurable tooltip.

```
<dile-tooltip tooltip="tooltip text" position="top|left|right|bottom" arrow fadeIn > Text </dile-tooltip>
```

## Install

```
npm install @dile/dile-tooltip
```
## Usage

Import the component.

```javascript
import '@dile/dile-tooltip/dile-tooltip';
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
