# @dile/dile-info-box

Web Component to create a customized button.

## Installation
```bash
npm i @dile/dile-info-box
```

## Usage
```html
<script type="module">
  import '@dile/dile-info-box/dile-info-box.js';
</script>

<dile-info-box showCloseButton>Information message...</dile-info-box>
```

### Properties

- **opened**: Boolean. Default is true.
- **showCloseButton**: Boolean. When it is true the box will display a close icon.

### CSS Custom Properties

You can customize it using CSS Custom Properties.

Custom property | Description | Default
----------------|-------------|---------
--dile-info-box-background-color | Background color | #ddd
--dile-info-box-border-radius | Box border radius | 0.8rem
--dile-info-box-padding | Box padding | 1rem
--dile-info-box-text-color | Text color | #303030
--dile-icon-color | Info icon color | #888
--dile-info-box-close-icon-color | Close icon color | #f33
--dile-info-box-title-margin-bottom | Title margin bottom | 0.5rem
--dile-info-box-title-font-size | Title font size | 1.3rem
--dile-info-box-title-font-weight | Title font weight | bold
--dile-info-box-title-text-color | Title text color | inherit
