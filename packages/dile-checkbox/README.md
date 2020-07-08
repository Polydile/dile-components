# @dile/dile-checkbox

Web Component to create a customized checkbox input interface, based on LitElement.

## Installation
```bash
npm i @dile/dile-checkbox
```

## Usage
```html
<script type="module">
  import '@dile/dile-checkbox/dile-checkbox.js';
</script>

<dile-checkbox>Label for the checkbox element</dile-checkbox>
```

### Properties

- **checked**: Boolean, defines the checkbox state.
- **disabled**: Boolean, mark checkbox as disabled.

### Custom events

- **dile-checkbox-changed**: Every time the checkbox changes emits a dile-checkbox-changed event. The checkbox current state is received in the handler usign the event object "detail" property.

### CSS Custom Properties

You can customize it using CSS Custom Properties.

Custom property | Description | Default
----------------|-------------|---------
--dile-checkbox-checked-color | Checked color for check control | #30a030
--dile-checkbox-unchecked-color | Unchecked color for check control | #ccc
--dile-checkbox-fill-color | Fill color for the check control | #fff
--dile-checkbox-unchecked-fill-color | Checked color for check control when is in unchecked status| #fff
--dile-checkbox-label-color | label regular color | #303030
--dile-checkbox-label-disabled-color | Label color for disabled status | #303030
--dile-checkbox-font-weight | Font weight for te label | normal
--dile-checkbox-size | Checkbox size | 20px
```
<style>
.customized {
  --dile-checkbox-checked-color: #006;
  --dile-checkbox-unchecked-color: #f66;
  --dile-checkbox-fill-color: #fcc;
  --dile-checkbox-unchecked-fill-color: #666;
  --dile-checkbox-label-color: #c57;
  --dile-checkbox-font-weight: bold;
  --dile-checkbox-label-disabled-color: #ddd;
}
</style>

<dile-checkbox checked class="customized">Mark as urgent</dile-checkbox>
```

