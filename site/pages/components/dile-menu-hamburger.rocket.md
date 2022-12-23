```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'components/dile-menu-hamburger.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = 'dile-menu-hamburger';
```

```js script
import { html, css, LitElement } from 'lit'; 
import '@mdjs/mdjs-story/define';
import '@mdjs/mdjs-preview/define';
import '../../../packages/dile-menu-hamburger/dile-menu-hamburger.js'
```

# dile-menu-hamburger

Full hamburger menu. It combines the [dile-hamburger](/components/dile-hamburger) and the [dile-app-drawer](/components/dile-app-drawer) components to make a customized menu.

When the user clicks in the hamburger icon the app drawer menu opens.

## Installation

```bash
npm i @dile/dile-menu-hamburger
```

## Usage

Import the component.

```javascript
import '@dile/dile-menu-hamburger/dile-menu-hamburger.js';
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

- [@dile/dile-app-drawer](https://github.com/Polydile/dile-components/tree/master/packages/dile-app-drawer)
- [@dile/dile-hamburger](https://github.com/Polydile/dile-components/tree/master/packages/dile-hamburger)


## dile-app-drawer demos

> **Tip:** You can also use the top hamburger menu on this site to see this component in action.

## Menu open top

```html preview-story
<dile-menu-hamburger id="menu">
  <div class="menu-content" slot="menu">
    <h2>Menu</h2>
    <p><a href="#">Link 1</a></p>
    <p><a href="#">Another link</a></p>
    <p><a href="#">More information</a></p>
    <p><a href="#">Contact us</a></p>
  </div>
</dile-menu-hamburger>
```

## Menu open left

```html preview-story
<style>
  #menu {
    --dile-app-drawer-background-color: #ffc;
    --dile-app-drawer-box-shadow: 1px 0 18px rgba(100, 100, 10, 0.3);
    --dile-app-drawer-modal-background-color: rgba(250, 250, 250, 0.7);
  }
  #menu div {
    min-width: 260px;
  }
</style>
<dile-menu-hamburger id="menu" direction="left">
  <div class="menu-content" slot="menu">
    <h2>Menu</h2>
    <p><a href="#">Link 1</a></p>
    <p><a href="#">Another link</a></p>
    <p><a href="#">More information</a></p>
    <p><a href="#">Contact us</a></p>
  </div>
</dile-menu-hamburger>
```
