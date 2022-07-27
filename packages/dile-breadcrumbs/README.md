# @dile/dile-breadcrumbs

Web Component to create a customized breadcrumbs.

## Installation
```bash
npm i @dile/dile-breadcrumbs
```

## Usage

Import the component.

```html
<script type="module">
  import '@dile/dile-breadcrumbs/dile-breadcrumbs.js';
</script>
```

You can use the component in two ways:

1. Use it with providing a items array

```html
<dile-breadcrumbs items='[{"text": "Home", "href": "index.html"},{"text": "News", "href": "news.html"}]'></dile-breadcrumbs>
```

2. Use it providing simple HTML markdown

```html
<dile-breadcrumbs>
  <dile-breadcrumbs-item href="/">Home</dile-breadcrumbs-item>
  <dile-breadcrumbs-item href="/news">News</dile-breadcrumbs-item>
  <dile-breadcrumbs-item>Lit course launched</dile-breadcrumbs-item>
</dile-breadcrumbs>
```

## Properties

### dile-breadcrumbs

- **separator**: The character or string that separate each item
- **items**: object array, where each item define the 'href' and the 'text' if you are using the ```items``` array, then the markup of the component with ```<dile-breadcrumbs-item>``` is ignored.

### dile-breadcrumbs-item

- **href**: Optional href for the links
- **name**: Optional name for the item. When the name property is used, the item dispays as a link, then, instead of navigate to the href location, the element dispatchs the custom event `dile-breadcrumbs-click`.

### Events

- **dile-breadcrumbs-click**: Custom event dispatched when the user click on a breadcrumb item that has a defined `name` property. You would use this event when you want to handle the click event on the breadcrumb item to do a custom navigation procedure, diferent to a regular link item.

## CSS Custom Properties

You can customize it using CSS Custom Properties.

Custom property | Description | Default
----------------|-------------|---------
--dile-breadcrumbs-separator-width | Space between the separator and the text |  0.5rem 
--dile-breadcrumbs-text-decoration | Text decoration for the links | none
--dile-breadcrumbs-text-color | Text color for the separator and items that hasn't got links |  #303030
--dile-breadcrumbs-font-size | Checked color for check control | 1rem
--dile-breadcrumbs-link-color | Color for the links | #39c