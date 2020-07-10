# @dile/dile-app-drawer

Web component to create a simple animated menu, useful as app global menu and similar to the material design navigation drawer component.

## Installation

```bash
npm i @dile/dile-app-drawer
```

## Usage

Import the component.

```javascript
import '@dile/dile-app-drawer/dile-app-drawer.js';
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

This componen only has one property to set the state of the component between opened and closed.

- **opened**: Boolean property.

## Methods

The component also provides a set of useful methods to controls the component state programmatically.

- **open()**: Opens the menu.
- **close()**: Closes the menu.
- **toggle()**: Changes the state, from open to close or close to open.

## Events

- **dile-app-drawer-click-outside**: This custom event is dispatched when the drawer panel is closed because a user click outside the menu layer.

## CSS customization

There are some CSS custom properties to customize the style and the animation.

Custom property | Description | Default
----------------|-------------|---------
--dile-app-drawer-content-height | Height of the menu | auto
--dile-app-drawer-background-color | Background color menu layer | #ddd
--dile-app-drawer-z-index | z-index menu layer | 10000
--dile-app-drawer-closed-top | Drawer content top position in closed state | 40vh 
--dile-app-drawer-closed-left | Drawer content left position in closed state | 0 