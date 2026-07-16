---
title: Button
tags: forms
---

# dile-button

Web Component to create a customizable button.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the dile-button component.

```javascript
import '@dile/ui/components/button/button.js';
```

Use the component.

```html
<dile-button>Button Label</dile-button>
```

### Properties

- **disabled**: Boolean, mark button as disabled.
- **loading**: Boolean, shows a loading spinner and prevents interaction while loading.
- **name**: The name of the button
- **type**: Use this attribute to create a submit or reset buttom, ie: `type="submit"`

### CSS Custom Properties

You can customize it using CSS Custom Properties.

The component accepts both the older --dile-button-* aliases and the more generic --dile-primary-* variables. Alias variables take precedence; when not provided the component falls back to the generic variables and then to the built-in defaults.

Custom property | Description | Default
----------------|-------------|---------
--dile-button-padding-y | Vertical padding | 0.5rem
--dile-button-padding-x | Horizontal padding | 0.8rem
--dile-button-border-radius | Button border radius | 2rem
--dile-button-border-width | Button border width | 3px
--dile-button-border-color | Button border color (alias) |  --dile-primary-dark-color or #12354d
--dile-primary-dark-color | Button border color (legacy) | #12354d
--dile-button-background-color | Background color (alias) |  --dile-primary-color or #7BB93D
--dile-primary-color | Background color (legacy) | #7BB93D
--dile-button-text-color | Text color (alias) |  --dile-on-primary-color or #fff
--dile-on-primary-color | Text color (legacy) | #fff
--dile-button-font-size | Font size | 1rem
--dile-button-font-weight | Font weight | bold
--dile-button-text-transform | Text transform | none
--dile-button-letter-spacing | Text letter spacing | 0
--dile-button-box-shadow | Box shadow | none
--dile-button-hover-background-color | Hover background color | --dile-button-hover-background-color, then --dile-button-background-color, then --dile-primary-light-color or #f3f3ae
--dile-primary-light-color | Hover background color fallback | #f3f3ae
--dile-button-hover-text-color | Hover text color | --dile-button-hover-text-color, then --dile-button-text-color, then --dile-on-primary-light-color or #303030
--dile-on-primary-light-color | Hover text color fallback | #303030
--dile-button-hover-border-color | Hover border color | --dile-button-hover-border-color, then --dile-button-border-color, then --dile-primary-color or #666666
--dile-button-ring-color | Ring color on focus state | #12c9e9
--dile-button-ring-offset-width | Ring width on focus state | 3px
--dile-button-disabled-background-color | Disabled background color |  --dile-button-background-color or #ccc
--dile-button-disabled-border-color | Disabled border color |  --dile-button-border-color or #bbb
--dile-button-disabled-text-color | Disabled text color |  --dile-button-text-color or #999
--dile-button-spinner-gap | Gap between spinner and text | 0.5rem
--dile-button-spinner-size | Spinner icon size | 0.8 * --dile-button-font-size

## dile-button demos

### Regular button

```html:preview
<dile-button>Click here!</dile-button>
```

### Styled button

```html:preview
<style>
  .styled {
    --dile-button-border-color: #666;
    --dile-button-hover-border-color: #ff910f;
    --dile-button-background-color: #491449;
    --dile-button-hover-background-color: #f3c6f3;
    --dile-button-text-color:  #fff; 
    --dile-button-hover-text-color:  #000; 
    --dile-button-font-weight: bold;
    --dile-button-ring-color: #cc5099;
    --dile-button-ring-offset-width: 2px;
    --dile-button-border-radius: 4px;
    --dile-button-text-transform: uppercase;
  }
</style>
<dile-button class="styled">Click here!</dile-button>
```

### Disabled button

```html:preview
  <dile-button name="disabeldbutton" disabled id="disabeldbutton">Disabled button</dile-button>
```

### Loading button

```html:preview
  <dile-button name="loadingbutton" loading id="loadingbutton">Loading...</dile-button>
```