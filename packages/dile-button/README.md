# @dile/dile-button

Web Component to create a customized button.

## Installation
```bash
npm i @dile/dile-button
```

## Usage
```html
<script type="module">
  import '@dile/dile-button/dile-button.js';
</script>

<dile-button>Button Label</dile-button>
```

### Properties

- **disabled**: Boolean, mark button as disabled.
- **name**: The name of the button

### CSS Custom Properties

You can customize it using CSS Custom Properties.

Custom property | Description | Default
----------------|-------------|---------
--dile-button-padding-y | Vertical padding | 0.5rem
--dile-button-padding-x | Horizontal padding | 0.8rem
--dile-button-border-radius | Button border radius | 2px
--dile-button-border-width | Button border width | 1px
--dile-button-border-color | Button border color | #666666
--dile-button-background-color | Background color | #f5f5ff
--dile-button-text-color | Text color | #303030
--dile-button-font-size | Font size | 1rem
--dile-button-font-weight | Font weight | normal
--dile-button-hover-background-color | Hover background color | #b1ecf7
--dile-button-hover-text-color | Hover text color | #303030
--dile-button-ring-color | Ring color on focus state | #12c9e9
--dile-button-ring-offset-width | Ring width on focus state | 3px
--dile-button-disabled-background-color | Disabled background color | #b1ecf7
--dile-button-disabled-text-color | Disabled text color | #303030
