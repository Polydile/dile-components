---
title: Input Icon
tags: forms
---

# dile-input-icon

Input form field with a configurable icon button. The icon can be customized using any icon from the `dile-iconlib` library, and the icon button action can be controlled via a callback function or by listening to custom events.

This component inherits all properties, events, and styles from the [dile-input](/components/dile-input) component.

## Install

```bash
npm install @dile/ui
```

## Usage

### Basic usage

Import the component.

```javascript
import '@dile/ui/components/input/input-icon.js';
```

Import the icon you want to use.

```javascript
import '@dile/iconlib/lucide-icons/trash-2.js';
```

Use the component.

```html
<dile-input-icon
  name="input_name"
  label="Input Label"
  placeholder="Type something..."
  icon="lucide.trash-2"
></dile-input-icon>
```

## Properties

All properties from [dile-input](/components/dile-input) are available, plus:

- **icon** (String): Icon to display in the button, using `"family.name"` format (e.g., `"lucide.trash-2"`, `"material.delete"`, `"fontawesome.trash"`). If not set, no icon button is rendered. For a complete list of available icons and their exact names, refer to the [dile-iconlib documentation](/icons/dile-iconlib/).
- **onIconClick** (Function): Optional callback function that receives the component instance when the icon button is clicked. This allows you to access and modify component properties like `value`.
- **tooltip** (String): Optional tooltip text to display on icon hover. If not set, no tooltip is shown.
- **tooltipPosition** (String): Tooltip position relative to the icon button. Options: `"top"` (default), `"bottom"`, `"left"`, `"right"`.
- **tooltipFadeIn** (Boolean): Enable fade-in animation for the tooltip. Defaults to `false`.
- **tooltipArrow** (Boolean): Show an arrow pointing from the tooltip to the icon button. Defaults to `false`.

## Icon Families

The icon format follows the `dile-iconlib` standard as documented in [dile-iconlib](/icons/dile-iconlib/): `"family.name"`

Supported icon families:
- `lucide` — Lucide Icons
- `material` — Material Design Icons
- `fontawesome` — Font Awesome
- `phosphor` — Phosphor Icons
- `tabler` — Tabler Icons
- `remixicon` — Remix Icon


## Using with Callbacks

You can define a callback function to handle icon button clicks. The callback receives the component instance, giving you access to all its properties and methods.

```javascript
const input = document.querySelector('dile-input-icon');

input.onIconClick = (component) => {
  console.log('Icon clicked!');
  console.log('Current value:', component.value);
  // Modify the component as needed
  component.value = '';
};
```

### Example: Toggle password visibility

```javascript
import '@dile/ui/components/input/input-icon.js';
import '@dile/iconlib/lucide-icons/eye.js';
import '@dile/iconlib/lucide-icons/eye-off.js';

const input = document.querySelector('dile-input-icon');
let isVisible = false;

input.onIconClick = (component) => {
  isVisible = !isVisible;
  component.icon = isVisible ? 'lucide.eye-off' : 'lucide.eye';
  component.type = isVisible ? 'text' : 'password';
};

input.type = 'password';
input.icon = 'lucide.eye';
```

### Example: Clear input value

```javascript
const input = document.querySelector('dile-input-icon');
input.icon = 'lucide.trash-2';

input.onIconClick = (component) => {
  component.value = '';
};
```

## Custom Events

- **dile-input-icon-clicked**: Dispatched when the icon button is clicked. 

The event detail contains:
```javascript
{
  icon: "lucide.trash-2",  // The icon that was clicked
  value: "current input value"
}
```

### Example: Listening to events

```javascript
const input = document.querySelector('dile-input-icon');

input.addEventListener('dile-input-icon-clicked', (e) => {
  console.log('Icon clicked!');
  console.log('Icon:', e.detail.icon);
  console.log('Value:', e.detail.value);
});
```

## CSS Custom Properties

The icon button can be customized using CSS custom properties:

| Property | Description | Default |
|----------|-------------|---------|
| `--dile-input-icon-padding` | Button padding | Inherits from `--dile-input-padding` |
| `--dile-input-icon-margin` | Button margin | 0 5px |
| `--dile-input-icon-color` | Icon color | Inherits from `--dile-input-color` |
| `--dile-input-icon-background-color` | Button background color | transparent |
| `--dile-input-icon-width` | Button width | auto (min 32px) |
| `--dile-input-icon-height` | Button height | auto (min 32px) |
| `--dile-input-icon-border-radius` | Button border radius | Inherits from `--dile-input-border-radius` |
| `--dile-input-icon-transition` | Button transition | background-color 0.2s |
| `--dile-input-icon-hover-bg` | Hover background color | rgba(0, 0, 0, 0.05) |
| `--dile-input-icon-active-bg` | Active background color | rgba(0, 0, 0, 0.1) |
| `--dile-input-icon-size` | Icon size | 20px |

Plus all CSS custom properties from [dile-input](/components/dile-input).

## Examples

### Clear on icon click

```html:preview
<script type="module">
import '@dile/iconlib/lucide-icons/trash-2.js';
import '@dile/ui/components/input/input-icon.js';
import { LitElement, html, css } from 'lit';

class ClearExample extends LitElement {
  static get styles() {
    return css`
      :host {
        --dile-input-icon-color: #06f;
      }
    `;
  }
    
  render() {
    return html`
      <dile-input-icon 
        id="clear-input"
        name="text" 
        label="Clear on click" 
        placeholder="Type something..."
        icon="lucide.trash-2">
      </dile-input-icon>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    setTimeout(() => {
      const input = this.shadowRoot.querySelector('dile-input-icon');
      input.onIconClick = (component) => {
        component.value = '';
      };
    }, 0);
  }
}
customElements.define('clear-example', ClearExample);
</script>
<clear-example></clear-example>
```

### Icon with different styles

```html:preview
<script type="module">
import '@dile/ui/components/input/input-icon.js';
import '@dile/iconlib/lucide-icons/plus.js';
</script>
<style>
  .styled-icon {
    --dile-input-icon-size: 28px;
    --dile-input-icon-color: #0066cc;
    --dile-input-icon-hover-bg: #e6f2ff;
    --dile-input-icon-active-bg: #cce5ff;
  }
</style>
<dile-input-icon 
  class="styled-icon"
  name="styled" 
  label="Styled icon button" 
  placeholder="Type something..."
  icon="lucide.plus">
</dile-input-icon>
```

### Multiple icon families

```html:preview
<script type="module">
import '@dile/ui/components/input/input-icon.js';
import '@dile/iconlib/lucide-icons/heart.js';
import '@dile/iconlib/material-icons/favorite.js';
import '@dile/iconlib/fontawesome-icons/heart.js';
</script>

<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
  <dile-input-icon 
    name="lucide" 
    label="Lucide" 
    placeholder="lucide.heart"
    icon="lucide.heart"
    style="flex: 1; min-width: 200px;">
  </dile-input-icon>
  
  <dile-input-icon 
    name="material" 
    label="Material" 
    placeholder="material.favorite"
    icon="material.favorite"
    style="flex: 1; min-width: 200px;">
  </dile-input-icon>
  
  <dile-input-icon 
    name="fontawesome" 
    label="Font Awesome" 
    placeholder="fontawesome.heart"
    icon="fontawesome.heart"
    style="flex: 1; min-width: 200px;">
  </dile-input-icon>
</div>
```

### Icon with tooltip

```html:preview
<script type="module">
import '@dile/ui/components/input/input-icon.js';
import '@dile/iconlib/lucide-icons/trash-2.js';
</script>

<dile-input-icon 
  name="with-tooltip" 
  label="Clear input" 
  placeholder="Hover over the icon"
  icon="lucide.trash-2"
  tooltip="Click to clear the input"
  tooltipFadeIn
  tooltipArrow>
</dile-input-icon>
```

### Tooltip with different positions

```html:preview
<script type="module">
import '@dile/ui/components/input/input-icon.js';
import '@dile/iconlib/lucide-icons/info.js';
</script>

<div style="display: flex; gap: 2rem; flex-wrap: wrap; padding: 2rem;">
  <dile-input-icon 
    name="top" 
    label="Top tooltip" 
    placeholder="Hover the icon"
    icon="lucide.info"
    tooltip="Top position"
    tooltipPosition="top"
    tooltipFadeIn
    tooltipArrow
    style="flex: 1; min-width: 200px;">
  </dile-input-icon>
  
  <dile-input-icon 
    name="bottom" 
    label="Bottom tooltip" 
    placeholder="Hover the icon"
    icon="lucide.info"
    tooltip="Bottom position"
    tooltipPosition="bottom"
    tooltipFadeIn
    tooltipArrow
    style="flex: 1; min-width: 200px;">
  </dile-input-icon>
  
  <dile-input-icon 
    name="left" 
    label="Left tooltip" 
    placeholder="Hover the icon"
    icon="lucide.info"
    tooltip="Left position"
    tooltipPosition="left"
    tooltipFadeIn
    tooltipArrow
    style="flex: 1; min-width: 200px;">
  </dile-input-icon>
  
  <dile-input-icon 
    name="right" 
    label="Right tooltip" 
    placeholder="Hover the icon"
    icon="lucide.info"
    tooltip="Right position"
    tooltipPosition="right"
    tooltipFadeIn
    tooltipArrow
    style="flex: 1; min-width: 200px;">
  </dile-input-icon>
</div>
```

### Tooltip without arrow

```html:preview
<script type="module">
import '@dile/ui/components/input/input-icon.js';
import '@dile/iconlib/lucide-icons/info.js';
</script>

<dile-input-icon 
  name="tooltip-no-arrow" 
  label="No arrow" 
  placeholder="Hover the icon"
  icon="lucide.info"
  tooltip="This tooltip has no arrow"
  tooltipFadeIn>
</dile-input-icon>
```

### Tooltip with callback and dynamic changes

```html:preview
<script type="module">
import '@dile/ui/components/input/input-icon.js';
import '@dile/iconlib/lucide-icons/info.js';

setTimeout(() => {
  const input = document.getElementById('tooltip-callback-input');
  let clickCount = 0;
  
  input.onIconClick = (component) => {
    clickCount++;
    component.tooltip = `You clicked ${clickCount} time${clickCount !== 1 ? 's' : ''}!`;
  };
}, 100);
</script>

<dile-input-icon 
  id="tooltip-callback-input"
  name="tooltip-callback" 
  label="Dynamic tooltip" 
  placeholder="Click the icon"
  icon="lucide.info"
  tooltip="Click me!"
  tooltipFadeIn
  tooltipArrow>
</dile-input-icon>
```
