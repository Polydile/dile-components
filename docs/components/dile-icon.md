---
title: Icon
tags: icons
---

# dile-icon

Web Component to create a container to display an icon.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the component.

```javascript
import '@dile/ui/components/icon/icon.js';
```

You need to provide the icon in a ```icon``` property.

```html
<dile-icon .icon="${appsIcon}"></dile-icon>
```

Usualy the provided icon will be a lit-html template.

```javascript
const appsIcon = html`<svg class="dile-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"/></svg>`;
```

There are some icons in the [@dile/icons package](/). So, you can use them easily in your components.

```javascript
import { closeIcon } from '@dile/icons';

// Late, in render method
html`<dile-icon .icon="${closeIcon}"></dile-icon>`
```
Also is possible to use any image or SVG you have.

```javascript
html`<dile-icon .icon=${html`<img src="./images/loto.png">`}></dile-icon>`
```

### Properties

- **icon**: The icon
- **rounded**: Create a icon background rounded

### CSS Custom Properties

You can customize it using CSS Custom Properties.

Custom property | Description | Default
----------------|-------------|---------
--dile-icon-size | Icon size | 24px
--dile-icon-color | Icon color | #888
--dile-icon-rounded-background-color | Background color when rounded | #eee

## dile-icon demos

### Icons demo

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';
import { appsIcon, descriptionIcon, starIcon } from "@dile/icons/index.js";

class MyComponent extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        align-items: center;
      }
    `
  }

  render() {
    return html`
      <dile-icon class="apps" .icon=${appsIcon}></dile-icon>
      <dile-icon class="description" .icon=${descriptionIcon}></dile-icon>
      <dile-icon class="star" .icon=${starIcon}></dile-icon>
    `
  }
}
customElements.define('my-component', MyComponent);
</script>
<my-component></my-component>
```

### Styled icons

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';
import { homeIcon, helpIcon, receiptIcon } from "@dile/icons/index.js";

class OtherComponent extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        align-items: center;
        column-gap: 0.5rem;
      }
      .styled {
        --dile-icon-color: red;
        --dile-icon-size: 32px;
      }
      .styled2 {
        --dile-icon-color: #990099;
        --dile-icon-size: 18px;
      }
      .styled3 {
        --dile-icon-color: blue;
        --dile-icon-size: 40px;
      }
    `
  }

  render() {
    return html`
      <dile-icon id="icon1" .icon=${homeIcon} class="styled">Polydile</dile-icon>
      <dile-icon id="icon2" .icon=${helpIcon} class="styled2">Polydile</dile-icon>
      <dile-icon id="icon3" .icon=${receiptIcon} class="styled3">Polydile</dile-icon>
    `
  }

}
customElements.define('other-component', OtherComponent);
</script>
<other-component></other-component>
```

