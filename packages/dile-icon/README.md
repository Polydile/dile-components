# @dile/dile-icon

Web Component to create a container to display an icon

## Installation
```bash
npm i @dile/dile-icon
```

## Usage

Import the component.

```html
<script type="module">
  import '@dile/dile-icon/dile-icon.js';
</script>
```

You need to provide the icon in a ``ìcon``` property.

```html
<dile-icon .icon="${appsIcon}">Button Label</dile-icon>
```

Usualy the provided icon will be a lit-html template.

```javascript
const appsIcon = html`<svg class="dile-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"/></svg>`;
```

There are some icons in the [```@dile/icons``` package](https://github.com/Polydile/dile-components/tree/master/packages/icons). So, you can use them easily in your components.

´´´javascript
import { closeIcon } from '@dile/icons';

// Late, in render method
html`<dile-icon .icon="${closeIcon}"></dile-icon>`
´´´
Also is possible to use any image or SVG you have.

´´´javascript
html`<dile-icon .icon=${html`<img src="./images/loto.png">`}></dile-icon>`
´´´

### Properties

- **icon**: The icon

### CSS Custom Properties

You can customize it using CSS Custom Properties.

Custom property | Description | Default
----------------|-------------|---------
--dile-icon-size | Icon size | 24px
--dile-icon-color | Icon color | #888
