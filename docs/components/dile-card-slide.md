---
title: Card Slide
---

# dile-card-slide

Web Component to create a collapsible Card with a slide-down/slide-up animation. It extends `dile-card` and adds toggle behaviour via a clickable title with a chevron icon.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the component

```javascript
import '@dile/ui/components/card/card-slide.js';
```

Use the component

```html
<dile-card-slide title="Click to expand" shadow-md>
  <div>This content slides in and out when the title is clicked.</div>
  <div slot="footer">
    <a href="#">Footer action</a>
  </div>
</dile-card-slide>
```

## Slots

This component has two slots, inherited from `dile-card`.

- **main slot** (unnamed slot): card main content.
- **footer slot**: card footer (also collapses with the main content).

## Properties

- **title**: Card title, string. The title acts as the toggle trigger and is required for the chevron to appear.
- **opened**: Boolean. Controls whether the card is expanded. Default: `false`.
- **icon**: Object. The icon displayed as the toggle indicator. Accepts any icon from `@dile/icons`. Default: `arrowDropDownIcon`.

## Methods

- **open()**: Expands the card.
- **close()**: Collapses the card.
- **toggle()**: Switches between expanded and collapsed states.

## Shadow attributes

Inherited from `dile-card`.

- **shadow-sm**: Small shadow.
- **shadow-md**: Medium shadow.
- **shadow-lg**: Large shadow.
- **shadow-xl**: Extra large shadow.
- **shadow-2xl**: Extra Extra large shadow.
- **shadow-none**: Without shadow.

## CSS Custom Properties

Inherits all custom properties from `dile-card`, plus the following:

Custom property | Description | Default
----------------|-------------|---------
--dile-card-slide-icon-color | Chevron icon color | --dile-primary-color or #303030
--dile-card-slide-title-padding-bottom | Padding below the title when collapsed | --dile-card-padding-y or 1rem
--dile-card-slide-main-padding-top | Padding top of the main content area | --dile-card-padding-y or 1rem

All `--dile-card-*` custom properties from `dile-card` are also available.

## dile-card-slide demos

### Basic slide card

```html:preview
<style>
  dile-card-slide {
    margin: 1.2rem;
  }
</style>
<dile-card-slide title="Click me to expand">
  This is the card body. It slides in and out smoothly when the title is clicked.
</dile-card-slide>
```

### Opened by default

```html:preview
<style>
  dile-card-slide {
    margin: 1.2rem;
  }
</style>
<dile-card-slide title="I start opened" opened>
  This card starts in the expanded state. Click the title to collapse it.
</dile-card-slide>
```

### Slide card with footer

```html:preview
<style>
  dile-card-slide {
    margin: 1.2rem;
  }
</style>
<dile-card-slide title="Card with footer" shadow-md>
  Main content of the card with a footer section below.
  <div slot="footer">
    <a href="#">Footer action</a>
  </div>
</dile-card-slide>
```

### Styled slide card

```html:preview
<style>
  dile-card-slide {
    margin: 1.2rem;
  }
  .styled-slide {
    --dile-card-border: 2px solid #add;
    --dile-card-border-radius: 20px;
    --dile-card-background-color: #f4f4f4;
    --dile-card-title-font-weight: 700;
    --dile-card-title-color: rgb(106, 34, 148);
    --dile-card-footer-border-separator: 2px solid #add;
    --dile-card-footer-background-color: #eff;
    --dile-card-slide-icon-color: rgb(106, 34, 148);
  }
</style>
<dile-card-slide title="Styled collapsible card" class="styled-slide">
  Customized appearance using CSS custom properties.
  <span slot="footer">Footer content</span>
</dile-card-slide>
```

### Custom icon

```html:preview
<style>
  dile-card-slide {
    margin: 1.2rem;
  }
</style>
<script type="module">
  import { arrowRightIcon } from '@dile/icons';
  document.querySelector('#custom-icon-demo').icon = arrowRightIcon;
</script>
<dile-card-slide id="custom-icon-demo" title="Card with a custom icon">
  This card uses a custom icon from <code>@dile/icons</code> instead of the default chevron.
</dile-card-slide>
```

### Programmatic control

```html:preview
<style>
  dile-card-slide {
    margin: 1.2rem;
  }
  .controls {
    display: flex;
    gap: 0.5rem;
    margin: 1rem 1.2rem;
  }
</style>
<div class="controls">
  <button onclick="document.getElementById('prog-card').open()">Open</button>
  <button onclick="document.getElementById('prog-card').close()">Close</button>
</div>
<dile-card-slide id="prog-card" title="Programmatically controlled card" shadow-lg>
  This card is controlled by the buttons above via <code>open()</code> and <code>close()</code> methods.
</dile-card-slide>
```
