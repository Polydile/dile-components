# @dile/dile-menu-hamburger>

Full hamburger menú. It combines the hamburger icon and the app drawer components to make a customized menú.

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

## Customization

You can customize the icons using this CSS Custom properties defined on this components:

- [@dile/dile-app-drawer](https://github.com/Polydile/dile-components/tree/master/packages/dile-app-drawer)
- [@dile/dile-hamburger](https://github.com/Polydile/dile-components/tree/master/packages/dile-hamburger)