---
title: Scanner
package: '@dile/scanner'
element: '&lt;dile-scanner&gt;'
status: experimental
summary: Document scanner that runs in the browser. Detects the document edges, corrects the perspective and returns a multipage PDF or JPEG images.
tags: utils, pdf
---

# dile-scanner

Web Component to scan documents in the browser, with no backend. The user takes photos or chooses images, the component detects the edges of the document, lets the user adjust the corners with a touch-friendly editor, straightens the perspective and compresses each page to JPEG. With `multipage` the user can also rotate, reorder, adjust again and remove pages.

When the user saves, the component returns a PDF (built in the browser with jsPDF) or the JPEG images through an event. **It does not upload anything**: sending the files is up to your application.

Edge detection and perspective correction are powered by [scanic](https://www.npmjs.com/package/scanic) (Canny in Rust/WASM, with an optional neural detector).

## Installation

```bash
npm i @dile/scanner
```

It is a separate package so `@dile/ui` users don't install scanic or jsPDF. Both are loaded with dynamic `import()`, so bundlers like Vite put them in separate chunks (scanic ~43 KB gzip, jsPDF ~129 KB gzip) that are only downloaded when the scanner is opened or the PDF is built.

> **Note:** The [ML detector](#ml-detector) is optional and off by default. The package also installs its files (`scanic-ml`, 3.5 MB in `node_modules`) so you can serve your own copy if you enable it, but they never reach your users unless you use `ml-detector`: they are not part of your JavaScript bundle and the browser does not download them.

## Usage

Import the component.

```javascript
import '@dile/scanner/scanner.js';
```

Use the component and open it from your code.

```html
<dile-scanner
  multipage
  max-bytes="5242880"
></dile-scanner>
```

```javascript
const scanner = document.querySelector('dile-scanner');
scanner.addEventListener('dile-document-scanned', (e) => upload(e.detail.file));
scanner.open();
```

### Workflow

1. **Capture**: the user chooses one or more images (several at once with `multipage`). On touch devices (`pointer: coarse`) there is also a "Take photo" button that opens the rear camera. Selected images are processed in a queue: each one goes through the adjustment before the next one.
2. **Adjust**: the user drags the corners to the edges of the document. "Reset" restores the detected corners and "Use full image" keeps the whole photo.
3. **Pages**: the user reviews the pages and saves. Without `multipage`, a new image replaces the current page.

Photos are reduced to 3000 px on their longest side when read (iOS limits the area of a canvas and current phone cameras go well beyond it) and the EXIF orientation is applied. HEIC images work in browsers that can decode them (Safari).

## Properties

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `multipage` | `Boolean` | `false` | Allows several pages in the same document. Without it, a new image replaces the current page. |
| `output` | `String` | `"pdf"` | `"pdf"`: a single PDF with every page (also with one page). `"images"`: one JPEG per page, always as an array. The format never depends on the number of pages. |
| `maxBytes` | `Number` | `0` | Maximum size in bytes of the result; `0` means no limit. Exposed via `max-bytes`. |
| `maxSide` | `Number` | `2000` | Longest side in pixels of each scanned page. Exposed via `max-side`. |
| `quality` | `Number` | `0.8` | JPEG quality of each page, from `0` to `1`. |
| `filename` | `String` | `""` | File name without extension. Empty: `labels.filenamePrefix` plus date and time (`scan-2026-10-19-1530.pdf`). |
| `labels` | `Object` | `{}` | Partial object merged with the default texts (see [Labels](#labels)). Property only, no attribute. |
| `mlDetector` | `Boolean` | `false` | Detects the edges with scanic's neural detector (see [ML detector](#ml-detector)). Exposed via `ml-detector`. |
| `mlAssetsUrl` | `String` | `""` | Base URL of a self-hosted copy of the `scanic-ml` files. Empty: they are downloaded from jsDelivr. Exposed via `ml-assets-url`. |

### Size limit

When `max-bytes` is set, the pages step shows the current size ("1.2 MB of 5 MB") and, with `multipage`, the add buttons are disabled once the limit is reached. If the result exceeds the limit when saving, the pages are encoded again in up to three smaller steps (1600 px / 0.7, 1400 px / 0.6 and 1200 px / 0.5) before showing an error. Lowering only the quality is not enough in Safari, so each step also reduces the size.

### PDF output

Each PDF page takes the proportions of its image at 170 ppi: a full-width A4 scanned at 2000 px prints at roughly A4 size, while a receipt stays narrow. jsPDF embeds the JPEG files as they are (DCTDecode), without compressing them again, so the PDF weighs about the same as the sum of its pages.

## Methods

- **open()**: Opens the scanner with an empty document.
- **close()**: Closes the scanner discarding the pages. Dispatches `dile-document-scan-cancelled`.

## Events

Both events bubble and are composed.

- **dile-document-scanned**: Dispatched when the user saves. The scanner closes afterwards.
  - With `output="pdf"`: `detail` is `{ file, pages }`, where `file` is the PDF (`File`).
  - With `output="images"`: `detail` is `{ files, pages }`, where `files` is a `File[]` with one JPEG per page.
  - In both cases `pages` contains the JPEG of each page (`File[]`).
- **dile-document-scan-cancelled**: Dispatched when the scanner is closed without saving (Cancel button, Esc key or `close()`). No `detail`.

The internal `dile-modal-closed` event of the modal is stopped inside the component.

```javascript
scanner.addEventListener('dile-document-scanned', async (e) => {
  const body = new FormData();
  body.append('document', e.detail.file);
  await fetch('/api/documents', { method: 'POST', body });
});
```

## Labels {#labels}

The component has more than 30 texts, so instead of a property per text there is a single `labels` object. Pass only the texts you want to change; the rest keep their English defaults.

```javascript
scanner.labels = {
  title: 'Escanear documento',
  chooseImage: 'Elegir imagen',
  confirm: 'Guardar documento',
};
```

The default texts are exported as `DEFAULT_LABELS`, which is useful as a reference to translate them all:

```javascript
import { DEFAULT_LABELS } from '@dile/scanner';
```

Available keys: `title`, `captureHint`, `takePhoto`, `chooseImage`, `addPhoto`, `addImage`, `retakePhoto`, `replaceImage`, `adjustHint`, `notDetected`, `reset`, `useFullImage`, `accept`, `cancel`, `confirm`, `page`, `rotate`, `adjust`, `moveBefore`, `moveAfter`, `remove`, `processing`, `readError`, `processError`, `sizeLimitReached`, `tooBig`, `sizeOf`, `filenamePrefix`, `topLeftCorner`, `topRightCorner`, `bottomRightCorner`, `bottomLeftCorner`.

The corner labels are used as the `aria-label` of the editor handles.

## ML detector {#ml-detector}

With `ml-detector`, the edges are detected first with scanic's neural detector and, when it finds nothing or fails (no network, missing files), with the classical one. It goes first, not as a retry, because on hard photos (cluttered or light backgrounds, low contrast, strong perspective) the classical detector does not always fail: it can return a wrong shape, like a line of text, as if it were the document.

The ML detector is **optional and off by default**. Its weight depends on whether you use it:

- **Without `ml-detector`** (default): your users download nothing of the ML detector. Its code is in separate chunks of scanic that are never requested.
- **With `ml-detector`**: the browser downloads about 2.2 MB the first time a photo is processed (not when the scanner opens).
- **In `node_modules`**: 3.5 MB always, because `@dile/scanner` installs `scanic-ml` as a dependency so you can self-host the files. It is only disk space in your project.
- **In your build**: nothing, unless you add the [Vite plugin](#self-hosting-the-ml-files-with-vite), which copies the 3.5 MB of files to the output folder (not to your JavaScript bundle).

The files take 3.5 MB uncompressed and about 2.2 MB to download when the server compresses them with gzip (jsDelivr does):

File | Content | Size | Gzip
-----|---------|------|-----
`doccornernet_lean.ort` | Model (it barely compresses) | 1.93 MB | 1.67 MB
`ort-wasm-simd-threaded.wasm` | ONNX runtime | 1.52 MB | 0.54 MB
`ort-wasm-simd-threaded.mjs` | Runtime loader | 20 KB | 8 KB
Total | | 3.47 MB | 2.22 MB

By default they come from jsDelivr (`scanic-ml@0.2.0`, the version scanic 1.7.1 expects). `@dile/scanner` also installs that exact version of `scanic-ml` as a dependency, so you can serve your own copy, always compatible with the scanic version of the component. That avoids depending on the CDN: intranets, privacy, Content Security Policy or availability.

### Self-hosting the ML files with Vite {#self-hosting-the-ml-files-with-vite}

Add the `scannerMlAssets()` plugin. It serves the files in the dev server and copies them to the build, with their original names, in the `dile-scanner-ml/` folder:

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import { scannerMlAssets } from '@dile/scanner/vite-plugin.js';

export default defineConfig({
  plugins: [scannerMlAssets()],
});
```

Then point the component to that folder:

```html
<dile-scanner ml-detector ml-assets-url="/dile-scanner-ml/"></dile-scanner>
```

The folder can be changed with `scannerMlAssets({ path: 'assets/ml' })`. The plugin adds the files (3.5 MB uncompressed) to the build output, but browsers only download them when the ML detector is used. Only add the plugin if you use `ml-detector`.

### Self-hosting the ML files without Vite

Copy the three files from the `scanic-ml` package installed with `@dile/scanner` to a public folder of your site, keeping their names, and use that folder as `ml-assets-url`:

```bash
cp node_modules/scanic-ml/dist/* public/dile-scanner-ml/
```

If npm installed it nested, the files are in `node_modules/@dile/scanner/node_modules/scanic-ml/dist/`.

The server must send the `.mjs` file with a JavaScript content type (`text/javascript`); `application/wasm` for the `.wasm` file is recommended.

> **Note:** Whatever the way you serve them, enable gzip or brotli compression for these files (many servers don't compress `.wasm` or unknown extensions like `.ort` by default). Without it, the first use of the ML detector downloads 3.5 MB instead of about 2.2 MB.

> **Note:** When building with Vite you will see the warning `new URL("ort.wasm.min.mjs", import.meta.url) doesn't exist at build time`. It is harmless: it comes from scanic's ML loader, which resolves that path at runtime.

## CSS Custom Properties

Custom property | Description | Default
----------------|-------------|---------
--dile-scanner-accent-color | Color of the corner handles and the document edges | --dile-primary-color or #6366f1
--dile-scanner-mask-color | Mask over the area outside the document in the editor | rgba(15, 23, 42, 0.45)
--dile-scanner-editor-height | Height of the corner editor | min(62dvh, 640px)
--dile-scanner-editor-background-color | Background of the corner editor | #1e1e1e
--dile-scanner-modal-width | Width of the modal | min(96vw, 900px)
--dile-scanner-modal-max-height | Maximum height of the modal | 92dvh
--dile-scanner-modal-border-radius | Border radius of the modal | 15px
--dile-scanner-secondary-button-color | Color of the secondary buttons (Cancel, Reset...) | #888

On screens up to 600 px wide the modal takes the whole screen. The buttons are [dile-button](/components/dile-button/) elements, so they also follow its custom properties.

## Tips

- **Testing on a phone**: don't use Vite's dev server. When the camera opens, the browser goes to the background, Vite's websocket is cut and Vite reloads the page in the middle of the scan. Use a build instead (`vite build` + `vite preview --host`) and, for HTTPS, a tunnel.

## dile-scanner demos

### Basic usage

A single page document returned as a PDF.

```html:preview
<script type="module">
  import { LitElement, html } from 'lit';
  import '@dile/scanner/scanner.js';

  class ScannerDemo extends LitElement {
    static properties = {
      multipage: { type: Boolean },
      output: { type: String },
      maxBytes: { type: Number, attribute: 'max-bytes' },
      mlDetector: { type: Boolean, attribute: 'ml-detector' },
      mlAssetsUrl: { type: String, attribute: 'ml-assets-url' },
      result: { type: Array, state: true },
      cancelled: { type: Boolean, state: true },
    };

    constructor() {
      super();
      this.multipage = false;
      this.output = 'pdf';
      this.maxBytes = 0;
      this.mlDetector = false;
      this.mlAssetsUrl = '';
      this.result = [];
      this.cancelled = false;
    }

    render() {
      return html`
        <dile-button @click=${this.open}>Scan document</dile-button>
        <dile-scanner
          ?multipage=${this.multipage}
          output=${this.output}
          max-bytes=${this.maxBytes}
          ?ml-detector=${this.mlDetector}
          ml-assets-url=${this.mlAssetsUrl}
          @dile-document-scanned=${this.scanned}
          @dile-document-scan-cancelled=${() => (this.cancelled = true)}
        ></dile-scanner>
        ${this.cancelled ? html`<p>Scan cancelled.</p>` : ''}
        <ul>
          ${this.result.map((file) => html`
            <li><a href=${URL.createObjectURL(file)} target="_blank">${file.name}</a> (${Math.round(file.size / 1024)} KB)</li>
          `)}
        </ul>
      `;
    }

    open() {
      this.cancelled = false;
      this.shadowRoot.querySelector('dile-scanner').open();
    }

    scanned(e) {
      this.result = e.detail.file ? [e.detail.file] : e.detail.files;
    }
  }
  customElements.define('scanner-demo', ScannerDemo);
</script>
<scanner-demo></scanner-demo>
```

### Multipage with size limit

Add several pages, rotate, reorder, adjust and remove them. The result can't exceed 2 MB.

```html:preview
<scanner-demo multipage max-bytes="2097152"></scanner-demo>
```

### JPEG images output

Returns one JPEG file per page instead of a PDF.

```html:preview
<scanner-demo multipage output="images"></scanner-demo>
```

### ML detector

Detects the edges with the neural detector. The ML files are served from this site with the `scannerMlAssets()` Vite plugin and are only downloaded when the first photo is processed.

```html:preview
<scanner-demo ml-detector ml-assets-url="/dile-scanner-ml/"></scanner-demo>
```

### Custom labels

```html:preview
<dile-button id="openScannerEs">Escanear documento</dile-button>
<dile-scanner id="scannerEs"></dile-scanner>
<script type="module">
  const scanner = document.getElementById('scannerEs');
  scanner.labels = {
    title: 'Escanear documento',
    captureHint: 'Haz una foto del documento o elige una imagen. Podrás ajustar los bordes antes de guardarlo.',
    takePhoto: 'Hacer foto',
    chooseImage: 'Elegir imagen',
    retakePhoto: 'Repetir foto',
    replaceImage: 'Elegir otra imagen',
    adjustHint: 'Arrastra las esquinas hasta los bordes del documento.',
    notDetected: 'No se han detectado los bordes. Arrastra las esquinas hasta los bordes del documento.',
    reset: 'Restablecer',
    useFullImage: 'Usar la imagen completa',
    accept: 'Aceptar',
    cancel: 'Cancelar',
    confirm: 'Guardar documento',
    processing: 'Procesando…',
    filenamePrefix: 'escaneo',
  };
  document.getElementById('openScannerEs').addEventListener('click', () => scanner.open());
</script>
```

### Styled

```html:preview
<style>
  .styled-scanner {
    --dile-scanner-accent-color: #e67e22;
    --dile-scanner-mask-color: rgba(230, 126, 34, 0.25);
    --dile-scanner-editor-background-color: #2c3e50;
    --dile-scanner-modal-width: min(96vw, 700px);
    --dile-scanner-modal-border-radius: 4px;
    --dile-scanner-secondary-button-color: #7f8c8d;
  }
</style>
<dile-button id="openStyledScanner">Scan document</dile-button>
<dile-scanner id="styledScanner" class="styled-scanner"></dile-scanner>
<script type="module">
  document.getElementById('openStyledScanner')
    .addEventListener('click', () => document.getElementById('styledScanner').open());
</script>
```
