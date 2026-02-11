---
title: App Drawer
tags: menu
---


# dile-app-drawer

Web component to create a simple animated menu, useful as app global menu, with a look & feel similar to the material design navigation drawer component.

> **Tip:** Check the [dile-menu-hamburger](/components/dile-menu-hamburger) component to implement an app drawer menu in an easier way.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the component.

```javascript
import '@dile/ui/components/app-drawer/app-drawer.js';
```

Use the component.

```html
<dile-app-drawer>
  <p><a href="#">Link 1</a></p>
  <p><a href="#">Another link</a></p>
  <p><a href="#">More information</a></p>
  <p><a href="#">Contact us</a></p>
</dile-app-drawer>
```

## Properties

This component has three properties:

- **opened**: Boolean. When true, the drawer is open. Reflected as an attribute.
- **direction**: String. Defines the animation/direction to open the menu; one of "top" or "left". Default: "top".
- **noModal**: Boolean. When true, disables the modal overlay and keeps the drawer fixed when opened. Can be used as the `no-modal` attribute in HTML.

Note: Pressing Escape closes the drawer (component extends `DileCloseOnEscPressed`).

## Methods

The component also provides a set of useful methods to control the component state programmatically.

- **open()**: Opens the menu.
- **close()**: Closes the menu.
- **toggle()**: Toggles the component state (open ↔ closed).

## Events

-- **dile-app-drawer-closed**: Dispatched when the drawer is closed.
-- **dile-app-drawer-click-outside**: Dispatched when the drawer is closed because the user clicked outside the menu layer.

## CSS customization

There are some CSS custom properties to customize the style and the animation of this drawer component.

Custom property | Description | Default
----------------|-------------|---------
--dile-app-drawer-content-height | Height of the menu | auto (or 100vh on "left" direction)
--dile-app-drawer-content-width | Width of the menu | 100vw (or auto on "left" direction)
--dile-primary-light-color | Background color of the menu layer | #ddd
--dile-app-drawer-z-index | z-index of the menu layer | 99
--dile-app-drawer-closed-top | Drawer content top position in closed state | -100vh (or 0 on "left" direction)
--dile-app-drawer-closed-left | Drawer content left position in closed state | 0 (or -100vw on "left" direction)
--dile-app-drawer-box-shadow | Menu shadow | 0 1px 8px #000 (or 1px 0 8px #000 on "left" direction)
--dile-app-drawer-modal-background-color | Menu modal layer background color | rgba(20, 20, 20, 0.7)
--dile-app-drawer-modal-z-index | Menu modal layer z-index | 98

## dile-app-drawer demos

> **Tip:** You can use the hamburger menu on this site to see this component in action.

```html:preview
<style>
  html.dark-theme #menudemo {
    color: #fff;
  }
  html.dark-theme #menudemo a {
    color: #ffd;
  }
  #menudemo .menu-content {
    padding: 1rem;
  }
  #menudemo .menu-content h2 {
    margin-top: 0.5rem;
  }
  #menudemo .menu-content p {
    margin: 0 0 0.5rem 0;
  }
</style>
<dile-app-drawer id="menudemo">
  <div class="menu-content">
    <h2>Menu <span>(Click outside to close)</span></h2>
    <p><a href="#">Link 1</a></p>
    <p><a href="#">Another link</a></p>
    <p><a href="#">More information</a></p>
    <p><a href="#">Contact us</a></p>
  </div>
</dile-app-drawer>
<button id="open">Show app drawer</button>
<script>
document.getElementById('open').addEventListener('click', () => {
  document.getElementById('menudemo').open();
});
</script>
```