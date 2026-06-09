---
title: Web visor
---

# dile-web-visor

Web Component to create an iframe with zoom in, zoom out and full screen.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the dile-button component.

```javascript
import '@dile/ui/components/web-visor/web-visor.js';
```

Use the component.

```html
<dile-web-visor
    title="Example"
    url="www.example.com"
></dile-web-visor>
```

### Properties

- **title**: The title of the iframe
- **url**: Url of website to render`

### CSS Custom Properties

You can customize it using CSS Custom Properties.

Custom property | Description | Default
----------------|-------------|---------
--dile-icon-color | Color of the toolbar icons | #000000
--dile-primary-color | Background color of toolbar buttons | #7BB93D
--dile-on-primary-color | Text/icon color inside buttons | #fff
--dile-primary-dark-color | Border color of toolbar buttons | #12354d
--dile-button-border-radius | Border radius of toolbar buttons | 2rem
--dile-button-padding-y | Vertical padding of toolbar buttons | 0.5rem
--dile-button-padding-x | Horizontal padding of toolbar buttons | 0.8rem

## dile-web-visor demos

### Web visor

```html:preview
<script type="module">
  import '@dile/ui/components/web-visor/web-visor.js';
</script>
<dile-web-visor
    title="Example"
    url="https://www.wikipedia.org"
></dile-web-visor>
```
