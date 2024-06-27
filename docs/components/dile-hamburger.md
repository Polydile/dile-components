---
title: Hamburger
tags: menu
---

# dile-hamburger

A component to show the typical **hamburger menu icon** with an smooth animation between two states, open and closed. 

The component states, opended and closed, defines how the icon is displayed. There is a boolean property ```active``` to define it's state. 

> **This component do not responds to any user interaction by itself**. It is suposed that  ```dile-hamburger``` will be used inside other componets who should have the responsability to change the state according to their requirements, **binding his state to the ```active``` property**, or **changing it programaticaly**.

The main hability of this hamburger icon component is his smooth CSS animation when changes it's state. 

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the component.

```javascript
import '@dile/ui/components/hamburger/hamburger.js';
```

Use the component.

```html
<dile-hamburger></dile-hamburger>
```

## Properties

- **active**: Boolean property to set the state of the hamburger icon.

## Customization

You can customize the icons using this CSS Custom properties;

Custom property | Description | Default
----------------|-------------|---------
--dile-hamburger-color | Icon color | #000
--dile-hamburger-padding-x | Horizontal icon box padding  | 15px
--dile-hamburger-padding-y | Vertical icon box padding  | 15px
--dile-hamburger-active-color | Icon color | #000
--dile-hamburger-line-size | Width of the icon lines | 3px
--dile-hamburger-width | Width of the entire icon | 24px
--dile-hamburger-height | Height of the entire icon | 24px
--dile-hamburger-line-separation | Separation between lines, only in inactive state icon | -6px

## dile-hamburger demos

### Default hamburger icon

```html:preview
<script type="module">
import { LitElement, html } from 'lit';

class MyComponent extends LitElement {
  render() {
    return html`
      <dile-hamburger id="icon"></dile-hamburger>
      <br>
      <button id="toggle" @click=${this.toggle}>Toggle active</button>
    `
  }
  toggle() {
    let hamburgerIcon = this.shadowRoot.getElementById('icon')
    hamburgerIcon.active = ! hamburgerIcon.active;
  }
}
customElements.define('my-component', MyComponent);
</script>
<my-component></my-component>
```

### styled hamburger icon

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';

class OtherComponent extends LitElement {
  static get styles() {
    return css`
     dile-hamburger {
      --dile-foreground-color: #4cc;
      --dile-hamburger-active-color: rgb(238, 30, 151);
      --dile-hamburger-line-size: 6px;
      --dile-hamburger-width: 48px;
      --dile-hamburger-height: 36px;
      --dile-hamburger-line-separation: 14px; 
    }
    `
  }

  render() {
    return html`
      <dile-hamburger id="icon"></dile-hamburger>
      <br>
      <button id="toggle" @click=${this.toggle}>Toggle active</button>
    `
  }
  toggle() {
    let hamburgerIcon = this.shadowRoot.getElementById('icon')
    hamburgerIcon.active = ! hamburgerIcon.active;
  }
}
customElements.define('other-component', OtherComponent);
</script>
<other-component></other-component>
```