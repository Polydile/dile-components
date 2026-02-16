---
title: Hamburger
tags: menu
---

# dile-hamburger

This component renders the familiar hamburger-menu icon and provides a smooth CSS animation between two states: closed and open.

The visual state is controlled by the boolean property `active`. When `active` is true the icon shows the "X" state; when false it shows the hamburger lines.

This component does not manage user interaction itself. It is intended to be used inside other components or pages that control its state by binding to the `active` property or by changing it programmatically.

The primary feature of this component is the smooth CSS animation that transitions the icon between states.

> If you need a complete website navigation menu that opens from this icon, see the [`dile-menu-hamburger` component](/components/dile-menu-hamburger/). That component provides a full menu implementation and uses this hamburger icon.

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

- **active**: Boolean. Controls the icon state (`true` = active/open, `false` = inactive/closed).

## Customization


## Customization

You can customize the icon using CSS custom properties.

Custom property | Description | Default
----------------|-------------|---------
--dile-on-primary-color | Icon color (used as primary line color) | `--dile-hamburger-color` or `#000`
--dile-hamburger-padding-x | Horizontal padding around the icon box | `15px`
--dile-hamburger-padding-y | Vertical padding around the icon box | `15px`
--dile-hamburger-active-color | Icon color when `active` is true | `#000`
--dile-hamburger-line-size | Thickness of the icon lines | `3px`
--dile-hamburger-width | Width of the icon box | `24px`
--dile-hamburger-height | Height of the icon box | `24px`
--dile-hamburger-line-separation | Separation between lines in the inactive state | `-6px`
--dile-hamburguer-position-top | Vertical offset applied to the button (keeps original variable name) | `0`
--dile-hamburger-focus-outline | Color used for the focus outline shown with `:focus-visible` (2px solid) | `var(--dile-primary-dark-color, #0a66ff)`
--dile-hamburger-focus-color | Color applied to the hamburger lines when the control receives keyboard focus (`:focus-visible`) | `var(--dile-primary-dark-color, #0a66ff)`

Note: The component uses `:focus-visible` to show a visible focus outline for keyboard users and changes the line color using `--dile-hamburger-focus-color`. The focus outline and line color can be customized with the properties above.

--dile-hamburger-focus-outline | Color used for the focus outline (shown as a 2px solid outline via :focus-visible). | var(--dile-primary-dark-color, #0a66ff)
--dile-hamburger-focus-color | Color applied to the hamburger lines when the control receives keyboard focus (via :focus-visible). | var(--dile-primary-dark-color, #0a66ff)


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
      --dile-on-primary-color: #4cc;
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