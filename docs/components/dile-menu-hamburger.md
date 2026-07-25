---
title: Menu Hamburger
tags: menu
---

# dile-menu-hamburger

Full hamburger menu. It combines the [dile-hamburger](/components/dile-hamburger) and the [dile-app-drawer](/components/dile-app-drawer) components to make a customized menu.

When the user clicks in the hamburger icon the app drawer menu opens.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the component.

```javascript
import '@dile/ui/components/menu-hamburger/menu-hamburger.js';
```

Use the component.

```html
<dile-menu-hamburger>
  <nav slot="menu">
    <p><a href="one.html">Link one</a></p>
    <p><a href="two.html">Link two</a></p>
  </nav>
</dile-menu-hamburger>
```

## Properties

- **opened**: Boolean property. Defines the state of the component between opened and closed. 
- **direction**: Defines the animation and direction to open the menu. String property one of `"top"` or `"left"`. Default is `"top"`.
- **hamburgerAlwaysVisible**: Boolean property. If true, makes the hamburger icon always visible by setting its z-index property.

## Methods

The component also provides a set of useful methods to controls the component state programmatically.

- **open()**: Opens the menu.
- **close()**: Closes the menu.
- **toggle()**: Toggles the state between open and closed.

## Events

- **dile-menu-hamburger-opened**: Dispatched when the menu opens.
- **dile-menu-hamburger-closed**: Dispatched when the menu closes.

## Hide the menu before initialization

If you want to hide the menu before the component's initialization it is possible to use this CSS in your global styles file:

```css
[dile-cloak] {
  display: none !important;
}
```

And then use the `dile-cloak` attribute in the menu layer to hide it. On the component's initialization, this attribute will be removed.

## Accessibility

This component combines accessible patterns from both `dile-hamburger` and `dile-app-drawer` components:

- **ARIA attributes**: The hamburger button includes semantic labels (`aria-label`, `aria-expanded`, `aria-controls`, `aria-haspopup="dialog"`) for assistive technologies.
- **Keyboard navigation**:
  - Press **Space** or **Enter** to toggle the menu
  - Press **Escape** to close the menu
  - Press **Tab** to navigate within the menu; focus cycles within the menu content
  - When closed, the menu is removed from the keyboard tab order using the `inert` attribute
- **Focus management**: When you open the menu, focus automatically moves into it. When you close it, focus returns to the hamburger button.
- **Motion preferences**: The hamburger animation and drawer transitions respect the `prefers-reduced-motion` CSS media query.
- **Screen reader support**: Users of assistive technologies receive clear information about the menu's state and how to interact with it.

## Customization

You can customize the appearance using CSS Custom properties defined in the composed components:

- [dile-app-drawer](/components/dile-app-drawer/)
- [dile-hamburger](/components/dile-hamburger/)

Additionally, the dile-menu-hamburger component defines the following CSS Custom Properties:

Custom property | Description | Default
----------------|-------------|---------
--dile-hamburger-always-visible-zindex | z-index hamburger icon on "always visible" state | 100



## dile-menu-hamburger demos

> **Tip:** You can also use the hamburger menu on this site to see this component in action.

## Menu open top

```html:preview
<style>
  .menu1-content {
    padding: 1rem 1.5rem;
  }
  html.dark-theme #menu1 {
    color: #fff;
  }
  html.dark-theme #menu1 a {
    color: #ffd;
  }
  #menu1 .menu1-content {
    padding: 1rem;
  }
  #menu1 .menu1-content h2 {
    margin-top: 0.5rem;
  }
  #menu1 .menu1-content p {
    margin: 0 0 0.5rem 0;
  }
</style>
<dile-menu-hamburger id="menu1">
  <div class="menu1-content" slot="menu">
    <h2>Menu</h2>
    <p><a href="#">Link 1</a></p>
    <p><a href="#">Another link</a></p>
    <p><a href="#">More information</a></p>
    <p><a href="#">Contact us</a></p>
  </div>
</dile-menu-hamburger>
```

## Menu open left

```html:preview
<style>
  #menu2 {
    --dile-app-drawer-background-color: #ffc;
    --dile-app-drawer-box-shadow: 1px 0 18px rgba(100, 100, 10, 0.3);
    --dile-app-drawer-modal-background-color: rgba(250, 250, 250, 0.7);
  }
  #menu2 div {
    min-width: 260px;
  }
  .menu2-content {
    padding: 1.5rem;
  }

  html.dark-theme #menu2 {
    color: #fff;
  }
  html.dark-theme #menu2 a {
    color: #ffd;
  }
  .menu1-content h2 {
    margin-top: 0.5rem;
  }
  .menu1-content p {
    margin: 0 0 0.5rem 0;
  }

</style>
<dile-menu-hamburger id="menu2" direction="left">
  <div class="menu2-content" slot="menu">
    <h2>Menu</h2>
    <p><a href="#">Link 1</a></p>
    <p><a href="#">Another link</a></p>
    <p><a href="#">More information</a></p>
    <p><a href="#">Contact us</a></p>
  </div>
</dile-menu-hamburger>
```
