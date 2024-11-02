---
title: Form Separator
tags: forms
---

# dile-form-separator

Web Component to create a customizable separator in forms, allowing for an optional label and style adjustments.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the `dile-form-separator` component.

```javascript
import '@dile/ui/components/form-separator/form-separator.js';
```

Use the component.

```html
<dile-form-separator label="Section Title"></dile-form-separator>
```

### Properties

- **label**: String, the text label displayed above the separator line. If not provided, no label is shown.

### Attributes

- **removeline**: When set, removes the separator line.

### CSS Custom Properties

You can customize it using CSS Custom Properties.

Custom property | Description | Default
----------------|-------------|---------
--dile-secondary-dark-color | Color of the separator line and label text | none

## dile-form-separator demos

### Default separator

```html:preview
<script type="module">
  import '@dile/ui/components/form-separator/form-separator.js';
</script>
<dile-form-separator label="Personal Information"></dile-form-separator>
```

### Separator without label

```html:preview
<dile-form-separator></dile-form-separator>
```

### Separator without line

```html:preview
<dile-form-separator label="No Line" removeline></dile-form-separator>
```

### Styled separator

```html:preview
<style>
  .styled {
    --dile-secondary-dark-color: #8b0000;
  }
</style>
<dile-form-separator class="styled" label="Styled Separator"></dile-form-separator>
```