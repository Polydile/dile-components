---
title: PDF Viewer
tags: utils, pdf
---

# dile-pdf-viewer

Web component for viewing PDF documents with zoom controls, page navigation, and download functionality. Built with PDF.js, it provides an accessible and responsive PDF viewing experience.

## Installation

```bash
npm i @dile/pdf-viewer
```

## Usage

Import the component:

```javascript
import '@dile/pdf-viewer/pdf-viewer.js';
```

Use the component:

```html
<dile-pdf-viewer 
  src="document.pdf"
  filename="document.pdf"
></dile-pdf-viewer>
```

### Properties

- **src**: String, URL to the PDF file to display. Required for the viewer to load.
- **filename**: String, name of the PDF file for download. Default: `"document.pdf"`
- **page**: Number, current page to display. Default: `1`. Must be between 1 and `numPages`.
- **numPages**: Number (read-only), total number of pages in the PDF document.
- **scale**: Number, zoom level. Default: `1.2`. Range: 0.5 to 3. Increments of 0.2.
- **loading**: Boolean (read-only), indicates if the PDF is being loaded.
- **errorMessage**: String (read-only), error message if PDF loading failed.
- **language**: String, interface language. Supported: `"en"` (default), `"es"`.

### Methods

None. Use property bindings to control the viewer.

### Events

- **dile-pdf-viewer-opened**: Fired when PDF is successfully loaded. Detail: `{ numPages: number }`
- **dile-pdf-viewer-error**: Fired when PDF fails to load. Detail: `{ error: Error }`
- **dile-pdf-viewer-page-changed**: Fired when page changes. Detail: `{ page: number, numPages: number }`
- **dile-pdf-viewer-download-requested**: Fired before download begins.
- **dile-pdf-viewer-downloaded**: Fired after download completes.
- **dile-pdf-viewer-scrolled**: Fired when user scrolls the canvas area.

### Keyboard Navigation

- **Arrow Left** or **Page Up**: Go to previous page
- **Arrow Right** or **Page Down**: Go to next page
- Keyboard shortcuts are active only when the component has focus or mouse is over it

### Accessibility Features

- Full keyboard navigation with visible focus indicators
- Live regions announce page changes and zoom level updates
- Proper ARIA roles, labels, and descriptions
- Screen reader support for all controls
- High contrast toolbar and canvas for visibility
- Minimum touch target size (44×44 px) for all buttons

## CSS Custom Properties

You can customize the viewer using these CSS Custom Properties. The component uses a cascade of fallbacks to design system variables.

| Custom property | Description | Fallback chain |
|---|---|---|
| `--dile-pdf-viewer-toolbar-background` | Toolbar background color | `--dile-gray-very-light-color` → `#f4f4f4` |
| `--dile-pdf-viewer-toolbar-border-radius` | Toolbar border radius | `0` |
| `--dile-pdf-viewer-border-color` | Border color for toolbar and canvas | `#ddd` |
| `--dile-pdf-viewer-color` | Page info text color | `--dile-on-gray-very-light-color` → `#303030` |
| `--dile-pdf-viewer-button-color` | Button text/icon color | `#333` |
| `--dile-pdf-viewer-icon-color` | Icon color | `--dile-on-gray-very-light-color` → `#303030` |
| `--dile-pdf-viewer-canvas-background` | PDF canvas background color | `#525659` |

## dile-pdf-viewer demos

### Basic PDF Viewer

```html:preview
<script type="module">
  import '@dile/pdf-viewer/pdf-viewer.js';
</script>
<dile-pdf-viewer 
  src="/pdf/crud-docs.pdf"
  filename="crud-docs.pdf">
</dile-pdf-viewer>
```

### Styled PDF Viewer

```html:preview
<style>
  .custom-styled {
    --dile-pdf-viewer-toolbar-background: #2c3e50;
    --dile-pdf-viewer-toolbar-border-radius: 0.5rem;
    --dile-pdf-viewer-border-color: #34495e;
    --dile-pdf-viewer-color: #ecf0f1;
    --dile-pdf-viewer-button-color: #ecf0f1;
    --dile-pdf-viewer-icon-color: #3498db;
    --dile-pdf-viewer-canvas-background: #1c2833;
  }
</style>
<dile-pdf-viewer 
  class="custom-styled"
  src="/pdf/spinner-icon-docs.pdf"
  filename="spinner-icon-docs.pdf">
</dile-pdf-viewer>
```

### Setting Initial Page

```html:preview
<dile-pdf-viewer 
  src="/pdf/crud-docs.pdf"
  filename="crud-docs.pdf"
  page="2">
</dile-pdf-viewer>
```

### Language Support

```html:preview
<dile-pdf-viewer 
  src="/pdf/spinner-icon-docs.pdf"
  filename="spinner-icon-docs.pdf"
  language="es">
</dile-pdf-viewer>
```

### With Event Listeners

```html:preview
<script type="module">
  import '@dile/pdf-viewer/pdf-viewer.js';
  
  document.addEventListener('DOMContentLoaded', function() {
    const viewer = document.querySelector('#fdf-events');
    
    viewer.addEventListener('dile-pdf-viewer-opened', (e) => {
      console.log(`PDF loaded with ${e.detail.numPages} pages`);
    });
    
    viewer.addEventListener('dile-pdf-viewer-page-changed', (e) => {
      console.log(`Now viewing page ${e.detail.page} of ${e.detail.numPages}`);
    });
    
    viewer.addEventListener('dile-pdf-viewer-error', (e) => {
      console.error('Failed to load PDF:', e.detail.error);
    });
  });
</script>
<dile-pdf-viewer 
  id="fdf-events"
  src="/pdf/crud-docs.pdf"
  filename="crud-docs.pdf">
</dile-pdf-viewer>
```
