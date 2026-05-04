---
title: Copy Text
tags: utils
---

# dile-copy-text

Web Component that provides a clickable link to copy text to the clipboard with visual feedback.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the component

```javascript
import '@dile/ui/components/copy-text/copy-text.js';
```

Use the component

```html
<dile-copy-text copy="Text to copy">
  Click to copy
</dile-copy-text>
```

## Slots

This component has one slot.

- **main slot** (unnamed slot): for the clickable text content.

## Properties

- **copy**: Text to copy to clipboard, string (required).
- **feedbackText**: Text shown in the feedback message, string. Default: `'Copied!'`.
- **copiedDuration**: Duration of the feedback message in milliseconds, number. Default: `1000`.
- **hideIcon**: Hide the icon in the feedback message even if one is defined, boolean. Default: `false`.

## Events

- **dile-text-copied**: Custom event dispatched when text is successfully copied. Contains the copied text in `event.detail.text`.

```javascript
element.addEventListener('dile-text-copied', (e) => {
  console.log('Copied:', e.detail.text);
});
```

### CSS Custom Properties

You can customize it using CSS Custom Properties.

Custom property | Description | Default
----------------|-------------|---------
--dile-copy-text-color | Link text color | inherit
--dile-copy-text-text-decoration | Link text decoration | none
--dile-copy-text-hover-color | Link color on hover | #0066cc
--dile-copy-text-hover-text-decoration | Link text decoration on hover | underline
--dile-copy-text-focus-outline | Link focus outline | 2px solid #0066cc
--dile-copy-text-transition-duration | Animation duration | 0.3s

## dile-copy-text demos

### Basic usage

```html:preview
<script type="module">
  import '@dile/ui/components/copy-text/copy-text.js';
</script>
<dile-copy-text copy="Hello, World!">
  Click to copy
</dile-copy-text>
```

### Copy email address

```html:preview
<style>
  dile-copy-text {
    --dile-copy-text-color: #0066cc;
    --dile-copy-text-hover-color: #004499;
  }
</style>
<dile-copy-text copy="contact@example.com">
  <dile-button>Copy contact@example.com</dile-button>
</dile-copy-text>
```

### With custom feedback text

```html:preview
<dile-copy-text copy="Custom text" feedbackText="✅ Copied to clipboard!">
  Copy this
</dile-copy-text>
```

### Without icon feedback

```html:preview
<dile-copy-text copy="No icon feedback" hideIcon>
  Copy without icon
</dile-copy-text>
```

### Styled variant

```html:preview
<style>
  .styled-copy {
    --dile-copy-text-color: #28a745;
    --dile-copy-text-hover-color: #1e7e34;
    --dile-copy-text-hover-text-decoration: none;
    --dile-copy-text-transition-duration: 0.15s;
    font-weight: 500;
  }
</style>
<dile-copy-text copy="Copy this styled text" class="styled-copy">
  🎯 Copy styled
</dile-copy-text>
```
