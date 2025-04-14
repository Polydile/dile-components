---
title: Light Mode Switch
tags: utils
---

# dile-light-mode-switch

Web Component to toggle between light and dark themes using a switch and an icon. It allows dynamically changing the theme by toggling a class on the `<html>` element.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the component.

```javascript
import '@dile/ui/components/light-mode-switch/light-mode-switch.js';
```

Use the component.

```html
<dile-light-mode-switch></dile-light-mode-switch>
```

### Properties

- **darkMode**: Boolean. Indicates whether the dark mode is active. When `true`, the `darkModeClass` is added to the root HTML element.
- **darkModeClass**: String. The class name to be toggled on `document.documentElement`. Default: `"dark-theme"`.

> At the time of component initialization, it will look for the class defined by the `darkModeClass` property to set the value of the boolean property `darkMode`. If it finds the class on the `<html>` tag, it will initialize `darkMode` as `true`; if it does not find it, then `darkMode` will be initialized as `false`.


## Methods

The component also provides a method to controls the component state programmatically.

- **toggle()**: Toggles the mode.

### CSS Custom Properties

Custom property | Description | Default
----------------|-------------|---------
--dile-light-mode-switch-light-state-color | Switch knob color in light mode | #303030
--dile-light-mode-switch-dark-state-color | Switch knob color in dark mode | #e5e5e5
--dile-light-mode-switch-light-state-bar-color | Switch bar color in light mode | #dddddd
--dile-light-mode-switch-dark-state-bar-color | Switch bar color in dark mode | #0e0e0e
--dile-light-mode-switch-light-state-icon-color | Icon color in light mode | #303030
--dile-light-mode-switch-dark-state-icon-color | Icon color in dark mode | #e5e5e5
--dile-light-mode-switch-light-state-focus-color | Border color when the element has the focus in light mode | #3d91e5
--dile-light-mode-switch-dark-state-focus-color | Border color when the element has the focus in light mode | #ff9

## dile-light-mode-switch demos

### Default usage

```html:preview
<script type="module">
  import '@dile/ui/components/light-mode-switch/light-mode-switch.js';
</script>

<dile-light-mode-switch></dile-light-mode-switch>
```


### Styled switch

```html:preview
<style>
  .styled {
    --dile-light-mode-switch-light-state-color: #555;
    --dile-light-mode-switch-dark-state-color: #fff;
    --dile-light-mode-switch-light-state-bar-color: #bbb;
    --dile-light-mode-switch-dark-state-bar-color: #333;
    --dile-light-mode-switch-light-state-icon-color: #666;
    --dile-light-mode-switch-dark-state-icon-color: #eee;
  }
</style>

<dile-light-mode-switch class="styled"></dile-light-mode-switch>
```
