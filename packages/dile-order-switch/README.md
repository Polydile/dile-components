# @dile/dile-order-switch

Web Component to create a customized button.

## Installation
```bash
npm i @dile/dile-order-switch
```

## Usage
```html
<script type="module">
  import '@dile/dile-order-switch/dile-order-switch.js';
</script>

<dile-order-switch>Button Label</dile-order-switch>
```

### Properties

- **disabled**: Boolean, mark button as disabled.
- **name**: The name of the button

### CSS Custom Properties

You can customize it using CSS Custom Properties.

Custom property | Description | Default
----------------|-------------|---------
--dile-order-switch-padding-y | Vertical padding | 0.5rem
--dile-order-switch-padding-x | Horizontal padding | 0.8rem
--dile-order-switch-border-radius | Button border radius | 2px
--dile-order-switch-border-width | Button border width | 1px
--dile-order-switch-border-color | Button border color | #666666
--dile-order-switch-background-color | Background color | #f5f5ff
--dile-order-switch-text-color | Text color | #303030
--dile-order-switch-font-size | Font size | 1rem
--dile-order-switch-font-weight | Font weight | normal
--dile-order-switch-hover-background-color | Hover background color | #b1ecf7
--dile-order-switch-hover-text-color | Hover text color | #303030
--dile-order-switch-ring-color | Ring color on focus state | #12c9e9
--dile-order-switch-ring-offset-width | Ring width on focus state | 3px
--dile-order-switch-disabled-background-color | Disabled background color | #b1ecf7
--dile-order-switch-disabled-text-color | Disabled text color | #303030
