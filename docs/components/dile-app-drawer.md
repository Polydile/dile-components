---
title: App Drawer
package: '@dile/ui'
element: '&lt;dile-app-drawer&gt;'
status: stable
summary: Animated drawer menu component with Material Design appearance. Provides smooth slide animations from top or left viewport sides.
tags: menu
---


# dile-app-drawer

Web component to create a simple animated drawer menu, useful as a global app menu with a look and feel similar to Material Design's navigation drawer component.

> **Tip:** Check the [dile-hamburger](/components/dile-hamburger) component to implement an app drawer menu more easily.

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

The component has the following properties:

- **opened**: Boolean. When true, the drawer is open. Reflected as an attribute.
- **direction**: String. Defines the animation direction when opening the menu; one of `"top"` or `"left"`. Default: `"top"`.
- **noModal**: Boolean. When true, disables the modal overlay and keeps the drawer fixed when opened. Can be used as the `no-modal` attribute in HTML.

Note: Pressing Escape closes the drawer (the component extends `DileCloseOnEscPressed`).

## Methods

The component also provides a set of useful methods to control the component state programmatically.

- **open()**: Opens the menu.
- **close()**: Closes the menu.
- **toggle()**: Toggles the component state (open ↔ closed).

## Events

- **dile-app-drawer-closed**: Dispatched when the drawer is closed.
- **dile-app-drawer-click-outside**: Dispatched when the drawer is closed because the user clicked outside the menu layer.

## Accessibility

This component is designed with accessibility in mind and follows WCAG 2.1/2.2 guidelines:

- **ARIA attributes**: The drawer includes proper semantic roles (`role="dialog"`), state management (`aria-modal`), and descriptive labels (`aria-label`, `aria-description`) for assistive technologies.
- **Keyboard navigation**: 
  - Press **Escape** to close the drawer
  - Press **Tab** to navigate within the open drawer; focus cycles within the drawer content
  - When the drawer is closed, its contents are removed from the keyboard tab order using the `inert` attribute, ensuring a logical focus sequence
- **Focus management**: When you open the drawer, focus automatically moves into it. When you close it, focus is restored to the element that opened it.
- **Motion preferences**: The drawer respects the `prefers-reduced-motion` CSS media query; animations are disabled for users who have enabled this preference.
- **Screen reader support**: Users of assistive technologies receive clear information about how to interact with the drawer (e.g., "Press Escape to close. You can also click outside the menu.").

## CSS customization

There are some CSS custom properties to customize the style and the animation of this drawer component.

Custom property | Description | Default
----------------|-------------|---------
--dile-app-drawer-content-height | Height of the menu | `auto` (or `100vh` on "left" direction)
--dile-app-drawer-content-width | Width of the menu | `100vw` (or `auto` on "left" direction)
--dile-app-drawer-background-color | Background color of the menu layer | --dile-primary-light-color or `#ddd`
--dile-app-drawer-z-index | z-index of the menu layer | `99`
--dile-app-drawer-modal-z-index | z-index of the modal overlay | `98`
--dile-app-drawer-closed-top | Drawer content top position in closed state (direction="top") | `-100vh` (ignored on "left" direction)
--dile-app-drawer-closed-left | Drawer content left position in closed state (direction="top") | `0` (ignored on "left" direction, which uses `transform`)
--dile-app-drawer-box-shadow | Menu shadow | `0 1px 8px #000` (or `1px 0 8px #000` on "left" direction)
--dile-app-drawer-modal-background-color | Background color of the modal overlay | `rgba(20, 20, 20, 0.7)`

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
    <h2>Menu <span>(click outside to close)</span></h2>
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