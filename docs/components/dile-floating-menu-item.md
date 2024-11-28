---
title: Floating Menu Item
tags: menu
---

# dile-floating-menu-item

Complementary UI component to easily build declarative navigation links list inside `dile-floating-menu`.

## Install

```bash
npm install @dile/ui
```

## Usage

### Import

```javascript
import "@dile/ui/components/floating-menu/floating-menu-item.js"
```

## Properties

- **href**: String, navigation url.
- **target**: Array, navigation target, like anchors.

## Styling

You can customize the component using CSS Custom Properties.

Custom property | Description | Default
----------------|-------------|---------
--dile-floating-menu-item-color | Link color | aliceblue
--dile-floating-menu-item-color-hover | Link hover color | lightblue
--dile-floating-menu-item-margin | Links margins inside floating-menu pop-up | 0.5rem 0

## Demos

### Integration in dile-floating-menu:

```html
<dile-floating-menu top left>
    <div role="list">
        <dile-floating-menu-item href="#" target="">Nav Item One</dile-floating-menu-item>
        <dile-floating-menu-item href="#" target="">Nav Item Two</dile-floating-menu-item>
    </div>
</dile-floating-menu>
```