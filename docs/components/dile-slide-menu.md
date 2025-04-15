---
title: Slide Menu
tags: menu
---

# dile-slide-menu

This component is designed to show or hide a menu, or any other type of content, with a smooth slide-down and slide-up animation.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the component.

```javascript
import '@dile/ui/components/slide-menu/slide-menu.js';
```

Use the component.

```html
<dile-slide-menu label="Options">
  <ul>
    <li><a href="opt1">Option 1</a></li>
    <li><a href="opt2">Option 2</a></li>
    <li><a href="opt3">Option 3</a></li>
  </ul>
</dile-slide-menu>
```

## Properties

- **label**: Menu label.
- **opened**: Boolean state of the menú (opened / closed).
- **icon**: Optional html template to the icon.

## Methods

- **open()**: open the element
- **close()**: close the element
- **toggle()**: toggle the element

### CSS custom properties

You can customize the component styles using this CSS custom properties.

Custom property | Description | Default
----------------|-------------|---------
--dile-slide-menu-font-size | Font size for the open or close labels | 1em
--dile-slide-menu-color | Label text color | #303030
--dile-slide-menu-font-weight | Label font weight | bold
--dile-slide-menu-text-decoration | Label text decoration | none
--dile-slide-menu-control-margin | Margin to the controler label | 0 0 0 0.25rem
--dile-slide-menu-closed-transform | Transformation to the icon on closed state | rotate(-90deg)
--dile-slide-menu-opened-transform | Transformation to the icon on opened state | rotate(0deg)
--dile-slide-menu-icon-margin | Icon Margin | 0 0.25rem 0 0
--dile-slide-menu-icon-color | Icon color | --dile-primary-color or #303030

## dile-slide-menu demos

### Regular demo

```html:preview
<style>
  ul.menulist {
    margin: 0 0.5rem;
    font-size: 0.9rem;
  }
  dile-slide-menu {
    --dile-slide-menu-icon-color: var(--dile-secondary-color, #999);
  }
</style>
<dile-slide-menu>
  <ul class="menulist">
    <li><a href="#">Option 1</a></li>
    <li><a href="#">Option 2</a></li>
    <li><a href="#">Option 3</a></li>
  </ul>
</dile-slide-menu>
```

### Opened initial state

```html:preview
<style>
  p.nomargin {
    margin: 0;
  }
</style>
<dile-slide-menu opened>
  <p class="nomargin">
  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque, accusantium, nulla vel neque labore odio beatae perferendis modi possimus temporibus necessitatibus, exercitationem ea veritatis asperiores animi soluta officiis illum magnam.
  </p>
</dile-slide-menu>
```


### Styled menu

```html:preview
<style>
  .styled {
    --dile-on-primary-color: purple;
    --dile-slide-menu-font-size: 0.875rem;
    --dile-slide-menu-font-weight: 300;
  }
  .styled p {
    font-size: 0.875rem;
    padding: 1rem 1.5rem;
    border-radius: 1rem;
    background-color: blueviolet;
    color: #fff;
    width: 360px;
  }
</style>
<dile-slide-menu class="styled">
  <p>
  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque, accusantium, nulla vel neque labore odio beatae perferendis modi possimus temporibus necessitatibus, exercitationem ea veritatis asperiores animi soluta officiis illum magnam.
  </p>
</dile-slide-menu>
```

### Change icon

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';
import { addIcon } from "@dile/icons/index.js";

class MyComponent extends LitElement {
  static get styles() {
    return css`
      :host {
        --dile-slide-menu-icon-color: #f45;
      }
      
      ul {
        margin: 0;
        padding: 0;
      }
      li {
        padding: 0;
        margin: 0 0 0.5rem 0.5rem;
        list-style: none;
      }
      a {
        color: #69c;
      }
    `
  }

  render() {
    return html`
      <dile-slide-menu .icon=${addIcon}>
        <ul>
          <li><a href="#">Option 1</a></li>
          <li><a href="#">Option 2</a></li>
          <li><a href="#">Option 3</a></li>
        </ul>
      </dile-slide-menu>
    `
  }

}
customElements.define('my-component', MyComponent);
</script>
<my-component></my-component>
```

