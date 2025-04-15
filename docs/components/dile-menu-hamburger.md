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
- **direction**: Defines de animation and direction to open the menú. String property one of "top" or "left". Default is "top".
- **hamburgerAlwaysVisible**: Boolean property. If true, makes the hamburger icon allways visible, by seting it's z-index property.

## Methods

The component also provides a set of useful methods to controls the component state programmatically.

- **open()**: Opens the menu.
- **close()**: Closes the menu.
- **toggle()**: Changes the state, from open to close or close to open.

## Events

- **dile-menu-hamburger-opened**: dispatched when the menu opens.
- **dile-menu-hamburger-closed**: dispatched when the menu closes.

## Hide the menu before initialization

If you want to hide the menu before the component's initialization it is possible to use this CSS in your global styles file:

```css
[dile-cloak] {
  display: none !important;
}
```

And then use the ```dile-cloak``` attribute in the menu layer to hide it. On the component`s initialization this attribute will be removed.

## Customization

You can customize the icons using this CSS Custom properties defined on this components:

- [@dile/dile-app-drawer](/components/dile-app-drawer/)
- [@dile/dile-hamburger](/components/dile-hamburger/)

Additionally, the dile-menu-hamburger component defines the following CSS Custom Properties:

Custom property | Description | Default
----------------|-------------|---------
--dile-hamburger-always-visible-zindex | z-index hamburger icon on "always visible" state | 100



## dile-app-drawer demos

> **Tip:** You can also use the top hamburger menu on this site to see this component in action.

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
