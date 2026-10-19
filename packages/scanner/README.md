# @dile/scanner

Web Component to scan documents in the browser: edge detection, perspective correction and multipage PDF or JPEG output, powered by [scanic](https://www.npmjs.com/package/scanic) and [jsPDF](https://www.npmjs.com/package/jspdf).

Everything runs on the client: no backend needed. The component does not upload anything; it dispatches an event with the resulting files.

```html
<dile-scanner multipage max-bytes="5242880"></dile-scanner>
```

```javascript
import '@dile/scanner/scanner.js';

const scanner = document.querySelector('dile-scanner');
scanner.addEventListener('dile-document-scanned', (e) => upload(e.detail.file));
scanner.open();
```

## Docs and demos

Read the docs and find demos on the [dile-components site](https://dile-components.com/components/dile-scanner/)

## ML detector files

The ML detector is optional and off by default. Without `ml-detector` your users download nothing of it. With `ml-detector` the component uses scanic's neural detector, and the browser downloads its files (3.5 MB, about 2.2 MB with gzip) the first time a photo is processed.

By default the files come from jsDelivr. The package installs the matching `scanic-ml` version (3.5 MB in `node_modules`, only disk space in your project), so you can serve your own copy with the included Vite plugin:

```javascript
// vite.config.js
import { scannerMlAssets } from '@dile/scanner/vite-plugin.js';

export default { plugins: [scannerMlAssets()] };
```

```html
<dile-scanner ml-detector ml-assets-url="/dile-scanner-ml/"></dile-scanner>
```

## Maintenance note

`scanic` is pinned to an exact version because `src/corner-editor-styles.js` copies the styles of its corner editor (scanic injects them into `document.head`, which does not reach the shadow root). When updating scanic, review that copy against `node_modules/scanic/dist/scanic.js` (search `.scanic-corner-editor`) and update `scanic-ml` (also pinned) to the version that scanic expects (see the jsDelivr URL in `node_modules/scanic/dist/scanic-mlDetector.js`).
