---
title: Icon Switch
tags: icons
---

# dile-icon-switch

Web Component to create a switch based on an icon.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the component.

```javascript
import '@dile/ui/components/icon-switch/icon-switch.js';
```

You need to provide the icon in a ```icon``` property.

```html
<dile-icon-switch .icon="${appsIcon}"></dile-icon-switch>
```

Usualy the provided icon will be a lit-html template. How to include the icon is explained at the [dile-icon](./dile-icon) documentation.

### Properties

- **name**: name of the switch element
- **icon**: The icon (object property)
- **active**: Boolean property with the switch state 

### Events

- **dile-icon-switch-changed**: fired on switch changes. The detail property has the values of the name and the active property values:

```javascript
{
  nane: 'element-name-value'
  active: true
}
```

### CSS Custom Properties

You can customize it using CSS Custom Properties.

Custom property | Description | Default
----------------|-------------|---------
--dile-icon-size | Icon size | 24px
--dile-icon-switch-active-color | Icon color on active state | #7BB93D
--dile-icon-switch-inactive-color | Icon color on inactive state | #303030

## dile-icon-switch demos

### Icons demo

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';
import '@dile/ui/components/icon-switch/icon-switch.js';
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
      <dile-icon-switch class="apps" name="switch1" .icon=${appsIcon}></dile-icon-switch>
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
import '@dile/ui/components/icon-switch/icon-switch.js';
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
        --dile-icon-switch-active-color: red;
        --dile-icon-switch-inactive-color: pink;
        --dile-icon-size: 32px;
      }
      .styled2 {
        --dile-icon-switch-active-color: #990099;
        --dile-icon-switch-inactive-color: #ddd;
        --dile-icon-size: 18px;
      }
      .styled3 {
        --dile-icon-switch-active-color: blue;
        --dile-icon-switch-inactive-color: #9bd;
        --dile-icon-size: 40px;
      }
    `
  }

  render() {
    return html`
      <dile-icon-switch .icon="${homeIcon}" id="icon1" class="styled">Polydile</dile-icon-switch>
      <dile-icon-switch .icon="${helpIcon}" id="icon2" class="styled2">Polydile</dile-icon-switch>
      <dile-icon-switch .icon="${receiptIcon}" id="icon3" class="styled3">Polydile</dile-icon-switch>
    `
  }

}
customElements.define('other-component', OtherComponent);
</script>
<other-component></other-component>
```

