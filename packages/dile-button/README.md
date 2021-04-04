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
--dile-button-checked-color | Checked color for check control | #30a030
--dile-button-unchecked-color | Unchecked color for check control | #ccc
--dile-button-fill-color | Fill color for the check control | #fff
--dile-button-unchecked-fill-color | Checked color for check control when is in unchecked status| #fff
--dile-button-label-color | label regular color | #303030
--dile-button-label-disabled-color | Label color for disabled status | #303030
--dile-button-font-weight | Font weight for te label | normal
--dile-button-size | Checkbox size | 20px
