---
title: Floating Menu
package: '@dile/ui'
element: '&lt;dile-floating-menu&gt;'
status: stable
summary: Fixed floating button that opens an accessible overlay with navigation links or any content. The button content can be replaced through a slot.
tags: menu
---

# dile-floating-menu

Button fixed to a corner of the window that shows and hides an overlay. The overlay mainly displays navigation links, using the complementary `dile-floating-menu-item`, but it accepts any content.

The content of the button can also be replaced, which makes this component useful to draw the user's attention to an important matter and explain in the overlay how to solve it.

The overlay is placed with the [DileOverlay mixin](/mixins/dile-overlay-mixin/), so it stays inside the viewport.

## Installation

```bash
npm install @dile/ui
```

## Usage

Import the component.

```javascript
import "@dile/ui/components/floating-menu/floating-menu.js"
import "@dile/ui/components/floating-menu/floating-menu-item.js"
```

Use the component.

```html
<dile-floating-menu label="Main menu">
    <div role="list">
        <dile-floating-menu-item href="/">Home</dile-floating-menu-item>
    </div>
</dile-floating-menu>
```

## Properties

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `opened` | `Boolean` | `false` | Opened state of the menu. Reflected as an attribute. |
| `top` | `Boolean` | `false` | Locates the menu at the top of the window. This is the default position. |
| `bottom` | `Boolean` | `false` | Locates the menu at the bottom of the window. The overlay opens above the button. |
| `left` | `Boolean` | `false` | Locates the menu at the left side of the window. This is the default position. |
| `right` | `Boolean` | `false` | Locates the menu at the right side of the window. The overlay is aligned to the right edge of the button. |
| `label` | `String` | `"Menu"` | Accessible name of the button. It replaces the text of the `icon` slot for screen readers, so include in it any relevant information. |
| `closeOnClick` | `Boolean` | `false` | Closes the menu when any link or button inside it is clicked. Exposed via `close-on-click`. |

## Methods

- **open()**: Opens the menu.
- **close()**: Closes the menu. If the focus was inside the component, it returns to the button.
- **toggle()**: Opens the menu if it is closed, and closes it otherwise.

## Events

- **overlay-opened**: Dispatched when the menu opens. No `detail`.
- **overlay-closed**: Dispatched when the menu closes. No `detail`.

## Slots

- **icon slot**: Content of the floating button. It replaces the default hamburger icon and accepts anything except interactive elements, because it is rendered inside a `<button>`.
- **main slot** (unnamed slot): Content of the overlay.
- **content-top slot**: Content displayed before the main slot.
- **content-bottom slot**: Content displayed after the main slot.

## Custom content

`dile-floating-menu-item` is optional and only needs to be imported if you use it. The overlay accepts any content in its main slot, such as text, forms or other components:

```html
<dile-floating-menu label="Help">
    <p>Do you need help with your order?</p>
    <a class="help-link" href="/support">Contact support</a>
    <button data-close>Close</button>
</dile-floating-menu>
```

The overlay text color applies to your content, but elements with their own browser styles keep them. Native links, for example, need a color that contrasts with the overlay background:

```css
.help-link {
    color: aliceblue;
}
```

You can also change the overlay colors with `--dile-floating-menu-overlay-background-color` and `--dile-floating-menu-overlay-color`.

## Closing the menu

The menu closes when the user:

- Clicks the floating button again.
- Clicks outside the component, including the button of another `dile-floating-menu`.
- Presses the Escape key.
- Moves the focus out of the component.
- Clicks an element with the `data-close` attribute inside the overlay.
- Clicks any link or button inside the overlay, if the component has the `close-on-click` attribute.

## CSS Custom Properties

Custom property | Description | Default
----------------|-------------|---------
--dile-floating-menu-margin | Equal distance between any window borders and button | 1.5rem
--dile-floating-menu-margin-top | Distance between window top border and button | --dile-floating-menu-margin
--dile-floating-menu-margin-bottom | Distance between window bottom border and button | --dile-floating-menu-margin
--dile-floating-menu-margin-right | Distance between window right border and button | --dile-floating-menu-margin
--dile-floating-menu-margin-left | Distance between window left border and button | --dile-floating-menu-margin
--dile-floating-menu-zindex | Z-index layer for the floating menu | 2
--dile-floating-menu-background-color | Background color for the floating button | navy
--dile-floating-menu-background-color-hover | Hover background color for the floating button | mediumblue
--dile-floating-menu-icon-background-color | Color of the default icon and of the content of the `icon` slot | aliceblue
--dile-floating-menu-button-size | Minimum width and height of the floating button | 48px
--dile-floating-menu-button-padding | Padding of the floating button, useful for wider contents | 0
--dile-floating-menu-button-border-radius | Border radius of the floating button | 999px
--dile-floating-menu-overlay-background-color | Overlay background color | --dile-floating-menu-background-color or navy
--dile-floating-menu-overlay-color | Overlay text color | aliceblue
--dile-floating-menu-overlay-width | Overlay width | max-content
--dile-floating-menu-overlay-max-width | Overlay maximum width | calc(100vw - 25px)
--dile-floating-menu-overlay-max-height | Overlay maximum height. Taller contents get a scroll | calc(100vh - 100px)
--dile-floating-menu-overlay-padding | Overlay padding | 24px
--dile-floating-menu-overlay-border-radius | Overlay border radius | 4px
--dile-floating-menu-overlay-box-shadow | Overlay box shadow | 0 0 20px rgba(0, 0, 0, 0.3)

## Accessibility

The component follows the disclosure pattern:

- The floating button is a native `<button>` named by the `label` property, with `aria-expanded` and `aria-controls` attributes. Set a `label` that describes the purpose of the menu, especially when you use the `icon` slot with a graphic.
- The focus stays on the button when the menu opens, and the Tab key moves it to the overlay content. The content is not focusable while the menu is closed.
- The Escape key closes the menu and returns the focus to the button.
- Animations are disabled with `prefers-reduced-motion`.

> **Note:** Wrap the `dile-floating-menu-item` elements in a container with `role="list"`, since they have the `listitem` role.

> **Note:** Don't apply `transform` or `filter` to the component or its ancestors. They change the reference of `position: fixed`, so the button and the overlay would be misplaced.

## dile-floating-menu demos

### Navigation links

Use the complementary component `dile-floating-menu-item`, wrapped in a `div` with `role="list"`. With `close-on-click` the menu closes after the navigation.

```html:preview
<script type="module">
    import "@dile/ui/components/floating-menu/floating-menu.js"
    import "@dile/ui/components/floating-menu/floating-menu-item.js"
</script>
<dile-floating-menu bottom left label="Main menu" close-on-click>
    <div role="list">
        <dile-floating-menu-item href="#">Nav Item One</dile-floating-menu-item>
        <dile-floating-menu-item href="#">Nav Item Two</dile-floating-menu-item>
    </div>
</dile-floating-menu>
```

### Customizing the button to require attention

Use the `icon` slot to display anything in the button, and the overlay to explain the issue and how to solve it. Elements with `data-close` close the menu.

```html:preview
<style>
    .attention-menu {
        --dile-floating-menu-background-color: #b3261e;
        --dile-floating-menu-background-color-hover: #8c1d18;
        --dile-floating-menu-icon-background-color: #fff;
        --dile-floating-menu-overlay-background-color: #fff;
        --dile-floating-menu-overlay-color: #303030;
        --dile-floating-menu-overlay-width: 280px;
        --dile-floating-menu-button-padding: 0.5rem 1rem;
    }
</style>
<dile-floating-menu class="attention-menu" bottom right label="Important: your payment is pending">
    <span slot="icon">⚠ Pending payment</span>
    <p><b>Your payment is pending</b></p>
    <p>Update your card details to keep your subscription active.</p>
    <button data-close>Got it</button>
</dile-floating-menu>
```

### Adding content before and after the main slot

```html
<dile-floating-menu>
    <p slot="content-top">Title:</p>
    <div role="list">
        <dile-floating-menu-item href="#">Nav Item One</dile-floating-menu-item>
        <dile-floating-menu-item href="#">Nav Item Two</dile-floating-menu-item>
    </div>
    <p slot="content-bottom">Footer</p>
</dile-floating-menu>
```

### Locating the menu

```html
<dile-floating-menu top right>
    <p>Hello World</p>
</dile-floating-menu>
```
