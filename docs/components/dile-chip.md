---
title: Chip
package: '@dile/ui'
element: '&lt;dile-chip&gt;'
status: stable
summary: Small chip component with customizable icon. Dispatches events on icon click and supports flexible CSS styling properties.
tags: feedback
---

# dile-chip

This is a web component to create a chip interface with a customizable icon.

## Installation
```bash
npm i @dile/ui
```

## Usage

Import the component:

```javascript
import '@dile/ui/components/chip/chip.js';
```

Use the component:

```html
<dile-chip name="mychip">My Chip</dile-chip>
```

## Properties

- **name**: Name of the chip. This name does not appear in the chip interface. It is useful to identify the chip on a `dile-chip-icon-click` event.
- **icon**: optional icon for this chip.
- **iconLabel** (attribute `icon-label`): text describing the icon action, used for its accessible name. Defaults to `"Remove"`. The button is announced as the label followed by the chip text (e.g. "Remove My Chip").

## Methods

- **focus()**: moves the focus to the chip action button.

## Custom Events

- **dile-chip-icon-click**: this custom event is dispatched when the user activates the chip icon, by click or keyboard. The event `detail` is `{ name }`.

## Accessibility

- The icon is rendered inside a native `<button type="button">`, so it is reachable with <kbd>Tab</kbd> and activated with <kbd>Enter</kbd> or <kbd>Space</kbd>. <kbd>Delete</kbd> and <kbd>Backspace</kbd> also activate it, as is common in chip inputs.
- The SVG icon is hidden from assistive technologies; the button name comes from `iconLabel` plus the chip text. Set `icon-label` when using a custom icon or another language: `<dile-chip icon-label="Quitar">Etiqueta</dile-chip>`.
- The button shows a visible focus outline and has a 24×24px minimum target size.

## CSS Custom Properties

You can customize the chip using these CSS Custom Properties.

Custom property | Description | Default
----------------|-------------|---------
--dile-chip-padding-x | Horizontal padding to the chip | 0.5rem
--dile-chip-padding-y | Vertical padding to the chip | 0.3rem
--dile-chip-background-color | background color for the chip | #e5e5e5
--dile-chip-border-radius | Chip border radius | 0
--dile-chip-text-color | Color for the text | #303030
--dile-chip-icon-color | Color for the icon | #303030
--dile-chip-icon-size | Chip icon size | 16px
--dile-chip-icon-hover-color | Icon color on hover and keyboard focus state | #d06060
--dile-chip-focus-outline-color | Outline color of the focused icon button | var(--dile-primary-color, #1a73e8)
--dile-chip-font-size | Chip font size | 1rem
--dile-chip-font-weight | Chip font weight | bold

## dile-chip demos

### Default chips 

```html:preview
<script type="module">
  import '@dile/ui/components/chip/chip.js';
</script>
<dile-chip name="Dile">Dile</dile-chip>
<dile-chip name="Lit">Lit</dile-chip>
```

### Custom icon label

```html:preview
<dile-chip name="es" icon-label="Quitar">Español</dile-chip>
```

### Styled chips

```html:preview
<style>
  .styled {
      --dile-chip-background-color: rgb(10, 130, 177);
      --dile-chip-text-color: #ff6;
      --dile-chip-padding-x: 1rem;
      --dile-chip-padding-y: 0.5rem;
      --dile-chip-border-radius: 0.6rem;
      --dile-chip-icon-color: #fff;
      --dile-chip-icon-size: 30px;
      --dile-chip-font-size: 1.4rem;
      --dile-chip-font-weight: 400;
      --dile-chip-icon-hover-color:  #ffa;
      font-family: impact, arial, sans-serif;
      letter-spacing: 0.1rem;

    }
</style>
<dile-chip name="Jonh" class="styled">Jhon</dile-chip> 
<dile-chip name="Maria" class="styled">Maria</dile-chip>
<dile-chip name="Lucas" class="styled">Lucas</dile-chip>
```

### Customize chip icon

```html:preview
<script type="module">
  import { LitElement, html, css } from 'lit';
  import { deleteIcon } from '@dile/icons';

  export class CustomizeDileChip extends LitElement {
    static styles = [
      css`
        :host {
          display: block;
          --dile-chip-icon-size: 20px;
          --dile-chip-background-color: #fcc;
        }
      `
    ];
  
    render() {
      return html`<dile-chip .icon="${deleteIcon}" name="foo">Foo</dile-chip>`;
    }
  }
  customElements.define('customize-dile-chip', CustomizeDileChip);
  
</script>
<customize-dile-chip></customize-dile-chip>
```