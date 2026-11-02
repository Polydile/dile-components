---
title: Menu Overlay
package: '@dile/ui'
element: '&lt;dile-menu-overlay&gt;'
status: stable
summary: Overlay menu component with trigger and content slots. Closes on outside clicks and manages multiple menus on same page.
tags: menu
---

# dile-menu-overlay

Web Component to implement a menu user interface, displayed in a overlay layer with a smooth show / hide animation.

- When the user opens the menu, the component close other menus previously opened in the page. 
- The menu closes when the user do click in other parts of the document, or presses the Escape key.

## Install

```bash
npm install @dile/ui
```

## Usage

Import the component.

```javascript
import '@dile/ui/components/menu-overlay/menu-overlay.js';
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
- **horizontalAlign**: String property to set the horizontal position of the menu. Valid values are "left", "right" or "center", "under_left", "under_right". Default to "under_left".
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
- **overlay-ready**: dispatched when the opening delay has finished and the content can receive the focus. Use it to move the focus into the menu, instead of `overlay-opened`, which is dispatched before the content is displayed.

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

## Accessibility

- **Escape** closes the opened menu, wherever the focus is. If the focus is inside the menu, it returns to the element that had it before opening. Inside a modal or a drawer, the first Escape only closes the menu.
- While the menu is closed, its content is `inert`, so it is out of the tab sequence, also during the closing animation.
- The component doesn't add semantics to your trigger. To be able to open the menu with the keyboard, use a focusable element, like a `<button>`, and add the `aria-haspopup` and `aria-expanded` attributes you need.

## dile-menu-overlay demos

### Default menu overlay

```html:preview
<style>
  dile-menu-overlay .content {
    background-color: #f5f5f5;
    color: #303030;
    padding: 1rem;
  }
  .trigger {
    cursor: pointer;
  }
</style>
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

### Keyboard accessible trigger

With a `<button>` as the trigger, you can open the menu with the keyboard, move through its links with Tab and close it with Escape.

```html:preview
<dile-menu-overlay>
  <button slot="trigger" type="button">Open with the keyboard</button>
  <div slot="content" class="content">
    <ul>
      <li><a href="#keyboard-accessible-trigger">Item 1</a></li>
      <li><a href="#keyboard-accessible-trigger">Item 2</a></li>
    </ul>
  </div>
</dile-menu-overlay>
```

### Vertical align to center and horizontalAlign to left 

```html:preview
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

```html:preview
<style>
.styled {
  --dile-menu-overlay-color: #69f;
  --dile-menu-overlay-border-radius: 0;
  --dile-menu-overlay-background-color: #303030;
  --dile-menu-overlay-width: 200px;
  --dile-menu-overlay-box-shadow: 2px 2px 16px rgb(77, 22, 77);
  --dile-menu-overlay-transition: ease 1s;
}
dile-menu-overlay .content2 {
    background-color: #303030;
    color: #fff;
    padding: 1rem;
  }
</style>
<dile-menu-overlay closeOnClickInside class="styled" verticalAlign="top">
  <span slot="trigger" class="trigger">Click to open styled</span>
  <div slot="content" class="content2">
    <p>Select one:</p>
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
  </div>
</dile-menu-overlay>
```
