---
title: Copy Markdown URL
tags: utils
---

# dile-copy-markdown-url

Web Component that fetches content from a URL and provides a clickable link to copy the content to the clipboard with visual feedback. Built on top of `dile-copy-text`.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the component

```javascript
import '@dile/ui/components/copy-markdown-url/copy-markdown-url.js';
```

Use the component

```html
<dile-copy-markdown-url url="https://example.com/file.md">
  Click to copy content
</dile-copy-markdown-url>
```

## Slots

This component has one slot.

- **main slot** (unnamed slot): for the clickable text content.

## Properties

- **url**: URL of the content to fetch and copy, string (required).
- **feedbackText**: Text shown in the feedback message, string. Default: `'Copied!'`.
- **copiedDuration**: Duration of the feedback message in milliseconds, number. Default: `1000`.
- **hideIcon**: Hide the icon in the feedback message even if one is defined, boolean. Default: `false`.

## Events

- **dile-text-copied**: Custom event dispatched when text is successfully copied. Inherited from `dile-copy-text`. Contains the copied text in `event.detail.text`.

```javascript
element.addEventListener('dile-text-copied', (e) => {
  console.log('Copied:', e.detail.text);
});
```

- **dile-copy-markdown-url-error**: Custom event dispatched when there is an error fetching the content from the URL.

```javascript
element.addEventListener('dile-copy-markdown-url-error', (e) => {
  console.error('Error:', e.detail.message);
});
```

### CSS Custom Properties

Inherits all CSS custom properties from `dile-copy-text`.

Custom property | Description | Default
----------------|-------------|---------
--dile-copy-text-color | Link text color | inherit
--dile-copy-text-text-decoration | Link text decoration | none
--dile-copy-text-hover-color | Link color on hover | #0066cc
--dile-copy-text-hover-text-decoration | Link text decoration on hover | underline
--dile-copy-text-focus-outline | Link focus outline | 2px solid #0066cc
--dile-copy-text-transition-duration | Animation duration | 0.3s

## dile-copy-markdown-url demos

### Basic usage

```html:preview
<script type="module">
  import '@dile/ui/components/copy-markdown-url/copy-markdown-url.js';
</script>
<dile-copy-markdown-url url="/md/components/dile-copy-text.md">
  Copy README from GitHub
</dile-copy-markdown-url>
```

### With custom feedback text

```html:preview
<dile-copy-markdown-url url="/md/components/dile-copy-text.md" feedbackText="Content copied to clipboard!">
  <dile-button>
  Copy with custom feedback
  </dile-button>
</dile-copy-markdown-url>
```

### Styled variant

```html:preview
<style>
  .styled-copy-markdown {
    --dile-copy-text-color: #28a745;
    --dile-copy-text-hover-color: #1e7e34;
    --dile-copy-text-hover-text-decoration: none;
    --dile-copy-text-transition-duration: 0.15s;
    font-weight: 500;
  }
</style>
<dile-copy-markdown-url url="/md/components/dile-copy-text.md" class="styled-copy-markdown">
  🎯 Copy styled
</dile-copy-markdown-url>
```
