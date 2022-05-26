# @dile/dile-icon

Web Component to create a customized button.

## Installation
```bash
npm i @dile/dile-icon
```

## Usage
```html
<script type="module">
  import '@dile/dile-icon/dile-icon.js';
</script>

<dile-icon>Button Label</dile-icon>
```

### Properties

- **disabled**: Boolean, mark button as disabled.
- **name**: The name of the button

### CSS Custom Properties

You can customize it using CSS Custom Properties.

Custom property | Description | Default
----------------|-------------|---------
--dile-icon-padding-y | Vertical padding | 0.5rem
--dile-icon-padding-x | Horizontal padding | 0.8rem
--dile-icon-border-radius | Button border radius | 2px
--dile-icon-border-width | Button border width | 1px
--dile-icon-border-color | Button border color | #666666
--dile-icon-background-color | Background color | #f5f5ff
--dile-icon-text-color | Text color | #303030
--dile-icon-font-size | Font size | 1rem
--dile-icon-font-weight | Font weight | normal
--dile-icon-hover-background-color | Hover background color | #b1ecf7
--dile-icon-hover-text-color | Hover text color | #303030
--dile-icon-ring-color | Ring color on focus state | #12c9e9
--dile-icon-ring-offset-width | Ring width on focus state | 3px
--dile-icon-disabled-background-color | Disabled background color | #b1ecf7
--dile-icon-disabled-text-color | Disabled text color | #303030
