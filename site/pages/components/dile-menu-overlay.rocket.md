```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'components/dile-menu-overlay.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = 'dile-menu-overlay';
```

```js script
import { html, css, LitElement } from 'lit'; 
import '@mdjs/mdjs-story/define';
import '@mdjs/mdjs-preview/define';
import '@dile/dile-menu-overlay/dile-menu-overlay.js'
import "@dile/dile-menu-hamburger/dile-menu-hamburger.js";
import "@dile/dile-selector/dile-selector.js";
import "@dile/dile-selector/dile-selector-item.js";
```

# dile-menu-overlay

Web Component to implement a menu user interface, displayed in a overlay layer with a smooth show / hide animation.

- When the user opens the menu, the component close other menus previously opened in the page. 
- The menu closes when the user do click in other parts of the document.

## Install

```bash
npm install @dile/dile-menu-overlay
```

## Usage

Import the component.

```javascript
import '@dile/dile-menu-overlay/dile-menu-overlay';
```

Use the component.

This component needs a special markup to create the menú, defined as slots:

- The **trigger** element: the element that the user need to clik on to open the menu.
- The **content** element: the menu content

To define this elements, you need to use the slot attribute, like in this code:

```html
<dile-menu-overlay>
  <span slot="trigger">Click to open</span>
  <div slot="content">
    <p>Select one:</p>
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
  </div>
</dile-menu-overlay>
```

That's all!!

## Properties

The component offers several properties to configure the way it works.

- **closeOnClickInside**: Bolean property. When is set to true, the menu interface closes when user click inside it.
- **horizontalAlign**: String property to set the horizontal position of the menu. Valid values are "left", "right" or "center". Default to "left".
- **verticalAlign**: String property to set the vertical position of the menu. Valid values are "bottom", "center" or "top". Default to "bottom".
- **moveTop**: Number of pixels to modify the default vertical position of the overlay. Accepts positive (move down) an negative (move up) values. Default 0.
- **moveLeft**: Number of pixels to modify the default horizontal position of the overlay. Accepts positive (move right) an negative (move left) values. Default 0.


## Methods

- **open()**: Use it to open the menu overlay box
- **close()**: Use it to close the menu overlay box
- **toggle()**: Toggles the menu-overlay box
- **closeAll()**: Close all the elements of this type
- **closeOthers()**: Close the other items of this type (distinct to this)

## Custom events

- **overlay-opened**: dispatched when the overlay opens.
- **overlay-closed**: dispatched when the overlay closes.

## Style customization

You can customize the menu box interface by using the CSS custom properties bellow.

Custom property | Description | Default
----------------|-------------|---------
--dile-menu-overlay-background-color | menu overlay layer background color | #fff
--dile-menu-overlay-color | Overlay text color | #303030
--dile-menu-overlay-z-index | menu overlay layer z-index | 999
--dile-menu-overlay-width | Menu overlay layer width | 280px
--dile-menu-overlay-max-width | Menu overlay layer max width | 300px
--dile-menu-overlay-border-radius | Menu overlay layer border radius | 5px
--dile-menu-overlay-box-shadow | Menu overlay box shadow | 0 0 20px rgba(102, 102, 102, 0.5)
--dile-menu-overlay-padding | Menu layer padding | 1px
--dile-menu-overlay-transition | Open / Close transition coniguration | ease 0.5s

## dile-menu-overlay demos

### Default menu overlay

```html preview-story
<dile-menu-overlay horizontalAlign="under">
  <span slot="trigger" class="trigger">Open under</span>
  <div slot="content" class="content">
    <p>Select one:</p>
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
  </div>
</dile-menu-overlay>
```

### Vertical align to center and horizontalAlign to left 

```html preview-story
<div style="display: flex; justify-content: flex-end;">
  <dile-menu-overlay horizontalAlign="left" verticalAlign="center" moveLeft="10">
    <span slot="trigger" class="trigger">Open Left</span>
    <div slot="content" class="content">
      <p>Select one:</p>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </div>
  </dile-menu-overlay>
</div>
```

### Styled menu

This menu is configured to close the interface when user clicks inside the menu.

```html preview-story
<style>
.styled {
  --dile-menu-overlay-color: #69f;
  --dile-menu-overlay-border-radius: 0;
  --dile-menu-overlay-background-color: #303030;
  --dile-menu-overlay-width: 200px;
  --dile-menu-overlay-box-shadow: 2px 2px 16px rgb(77, 22, 77);
  --dile-menu-overlay-transition: ease 1s;
}
</style>
<dile-menu-overlay closeOnClickInside class="styled" verticalAlign="top">
  <span slot="trigger" class="trigger">Click to open styled</span>
  <div slot="content" class="content">
    <p>Select one:</p>
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
  </div>
</dile-menu-overlay>
```
