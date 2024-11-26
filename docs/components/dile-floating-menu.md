---
title: Floating Menu
tags: menu, navigation
---

# dile-floating-menu

UI button element in absolute position, that shows/hide a floating container that mainly displays navigation links in the default slot.
Use the complementary `dile-floating-menu-item` to declare menu items inside, or use this slot to display custom contents (see examples below).

This component also includes two additional slots to display contents before and after de navigation items.
## Install

```bash
npm install @dile/ui
```

## Usage

### Import

```javascript
import "@dile/ui/components/floating-menu/floating-menu.js"
```

## Properties

- **opened**: String, attribute to manage menu state.
- **linkList**: Array, strings array to feed navigation menu items.
- **top**: String, locate menu at the top of the window.
- **bottom**: String, locate menu at the bottom pf the window.
- **right**: String, locate menu in the right side of the window.
- **left**: String, locate menu in the left side of the window.

## Styling

You can customize the component using CSS Custom Properties.

Custom property | Description | Default
----------------|-------------|---------
--dile-floating-menu-margin | Equal distance between any window borders and button | 1.5rem
--dile-floating-menu-margin-top | Distance between window top border and button | 1.5rem
--dile-floating-menu-margin-bottom | Distance between window bottom border and button | 1.5rem
--dile-floating-menu-margin-right | Distance between window right border and buttom | 1.5rem
--dile-floating-menu-margin-left | Distance between window left border and buttom | 1.5rem
--dile-floating-menu-background-color | Background color for the floating button | navy
--dile-floating-menu-background-color-hover | Hover background color for the floating button | mediumblue
--dile-floating-menu-icon-background-color | Menu icon background color | aliceblue

## Demos

### Displaying navigation links:

Use the complementary component `dile-floating-menu-item` and wrap them in a `div` with `role:"list"`:

```html
<dile-floating-menu>
    <div role="list">
        <dile-floating-menu-item href="#" target="">Nav Item One</dile-floating-menu-item>
        <dile-floating-menu-item href="#" target="">Nav Item Two</dile-floating-menu-item>
    </div>
</dile-floating-menu>
```

### Adding custom content:

```html
<dile-floating-menu>
    <p class="title" slot="content-top">Title:</p>
        <div role="list">
            <dile-floating-menu-item href="#" target="">Nav Item One</dile-floating-menu-item>
            <dile-floating-menu-item href="#" target="">Nav Item Two</dile-floating-menu-item>
        </div>
    <p class="discalimer" slot="content-bottom">Footer</p>
</dile-floating-menu>
```

### Locating menu with custom position:

```html
<dile-floating-menu bottom right>
    <div role="list">
            <dile-floating-menu-item href="#" target="">Nav Item One</dile-floating-menu-item>
            <dile-floating-menu-item href="#" target="">Nav Item Two</dile-floating-menu-item>
     </div>
<dile-floating-menu>
```

### Displaying custom main content:
```html
<dile-floating-menu bottom right>
        <p>Hello World</p>
<dile-floating-menu>
```

