# @dile/dile-button

Web Component to create a customized breadcrumbs.

## Installation
```bash
npm i @dile/dile-breadcrumbs
```

## Usage
```html
<script type="module">
  import '@dile/dile-button/dile-breadcrumbs.js';
</script>

<dile-breadcrumbs items='[{"text": "Home", "url": "index.html"},{"text": "News", "url": "news.html"}]'></dile-breadcrumbs>
```

### Properties

- **items**: object array, where each item define the 'url' and the 'text'.
- **separator**: The character or string that separate each item

### CSS Custom Properties

You can customize it using CSS Custom Properties.

Custom property | Description | Default
----------------|-------------|---------
--dile-breadcrumbs-separator-width | Checked color for check control | 10px; 
--dile-breadcrumbs-separator-before-width | Checked color for check control | 15px;
--dile-breadcrumbs-text-decoration | Checked color for check control | none;
--dile-breadcrumbs-text-color | Checked color for check control |  #000;
--dile-breadcrumbs-font-size | Checked color for check control | 25px;