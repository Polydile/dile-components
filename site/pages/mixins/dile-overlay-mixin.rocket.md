```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'mixins/dile-overlay-mixin.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = 'DileOverlayMixin';
```

```js script
import { html, css, LitElement } from 'lit'; 
import "../../../packages/dile-menu-hamburger/dile-menu-hamburger.js";
import "../../../packages/dile-selector/dile-selector.js";
import "../../../packages/dile-selector/dile-selector-item.js";
```

# DileOverlayMixin

Mixin to create overlay elements. It has the functionality to position custom elements in various ways, and open or close the elements with a smooth animation.

## Requirements

This mixin need two elements in the web component to make its work:
- Overlay layer, to show / hide some content
- Trigger element, to click and toggle the overlay state

Both elements should be in the shadow DOM of the custom element and need to have this ids:
- #overlay for the overlay layer content
- #trigger for the element to asign the close / hide functions

Also is necessary to asign some styles to the overlay element:

```css
#overlay {
  display: none;
  position: absolute;
  opacity: 0;
}
```

Usually you may also prefer to asign some additional styles, to make a transition between hide / show states:

```css
#overlay {
  display: none;
  position: absolute;
  opacity: 0;
  transition: ease 0.5s;
  transition-property: transform, opacity;
  transform: translateY(-10px);
}
```

To create the smooth animation there is also necessary to create a "opened" CSS class, to asing styles to the open state of the overlay layer.

```css
#overlay.opened {
  opacity: 1;
  transform: translateY(0);
}
```

Of course, you can customize your own styles to create your preferred animations.

## Installation

```bash
npm install @dile/dile-overlay-mixin
```

## Usage

Use the mixin

```javascript
import { LitElement, html, css } from 'lit';
import { DileOverlayMixin } from '@dile/dile-overlay-mixin';

class NewComponent  extends DileOverlayMixin(LitElement) {

}
```

## Properties

The mixin offers several properties to customize the the way it shows the overlay.

- **horizontalAlign**: String property to set the horizontal position of the menu. Valid values are "under_left", "under_right", "left", "right" or "center". Default to "under_left".
- **verticalAlign**: String property to set the vertical position of the menu. Valid values are "bottom", "center" or "top". Default to "bottom".
- **moveTop**: Number of pixels to modify the default vertical position of the overlay. Accepts positive (move down) an negative (move up) values. Default 0.
- **moveLeft**: Number of pixels to modify the default horizontal position of the overlay. Accepts positive (move right) an negative (move left) values. Default 0.

## Overlay state

This mixin also includes a "state" property called "_overlayClass". In order to have the opened/closed state in the overlay layer you should assign the property into the class attribute.

```html
<div id="overlay" class="${this._overlayClass}">
  I am the overlay layer
</div>
```

## Methods

- **open()**: Use it to open the menu overlay box
- **close()**: Use it to close the menu overlay box
- **toggle()**: Toggles the menu-overlay box

**Important note**: the trigger does not opens the menu by itself. You must call the ```open()``` or ```toggle()``` method to open the menu when you need. The trigger by default is used only for positioning the menu overlay.

For example, you can use the the ```toogle()``` method as a click handler on the trigger.

```html
<span id="trigger" @click=${this.toggle}>This is the trigger</span>
```

## Custom events

- **overlay-opened**: dispatched when the overlay opens.
- **overlay-closed**: dispatched when the overlay closes.

## Implementations of DileOverlayMixin

There are some components that implements DileOverlayMixin.

- [dile-persistent-toast](/components/dile-persistent-toast)
- [dile-menu-overlay](/components/dile-menu-overlay)

