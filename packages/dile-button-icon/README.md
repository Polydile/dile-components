# @dile/dile-button-icon

Web Component to create a customized button with an icon.

## Installation
```bash
npm i @dile/dile-button-icon
```

This component extends [dile-button](https://github.com/Polydile/dile-components/tree/master/packages/dile-button), so you can use the component in a similar way. The main diference is that the componente can display an icon. 

## Usage

Import the component.

```html
<script type="module">
  import '@dile/dile-button-icon/dile-button-icon.js';
</script>

The icon is assigned via ```icon``` property:

```html
html`<dile-button-icon .icon="${appsIcon}">Button Label</dile-button-icon>`
```

Usualy the provided icon will be a lit-html template.

```javascript
const appsIcon = html`<svg class="dile-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"/></svg>`;
```

There are some icons in the [```@dile/icons``` package](https://github.com/Polydile/dile-components/tree/master/packages/icons). So, you can use them easily in your components.

´´´javascript
import { closeIcon } from '@dile/icons';

// Late, in render method
html`<dile-button-icon .icon="${closeIcon}">Button Label</dile-button-icon>`
´´´

Also is possible to use any image or SVG you have.

´´´javascript
html`<dile-button-icon .icon=${html`<img src="./images/loto.png">`}>Yoga practice</dile-button-icon>`
´´´

### Properties

Same as dile-button, but also:

- **icon**: Lit-html template with the content to display the icon

### CSS Custom Properties

You can customize it using the same dile-button CSS Custom Properties but also:

Custom property | Description | Default
----------------|-------------|---------
--dile-button-icon-separation | Space between the icon and the button text | 0.3rem
--dile-icon-size | Icon size | 24px
--dile-icon-color | Icon color | #888
--dile-button-icon-hover-color | Icon hover color | #888
