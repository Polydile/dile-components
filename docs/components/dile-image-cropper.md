---
title: Image Cropper
package: '@dile/image-cropper'
element: '&lt;dile-image-cropper&gt;'
status: experimental
summary: Image cropping component powered by Cropper.js v2, lazy loaded on demand, with aspect ratio, round avatar mask and File/Blob/canvas export.
tags: media
---

# dile-image-cropper

Web Component to crop images in the browser, built on top of [Cropper.js v2](https://fengyuanchen.github.io/cropperjs/). It works on its own, without any upload logic: you give it an image, the user selects an area, and you export the result as a canvas, a `Blob` or a `File`.

Cropper.js is **lazy loaded**: importing the component only registers `dile-image-cropper`. The Cropper.js code is downloaded the first time a cropper has an image to display.

## Installation

```bash
npm i @dile/image-cropper
```

## Usage

Import the component:

```javascript
import '@dile/image-cropper/image-cropper.js';
```

Use the component, with an image URL or a `File` object:

```html
<dile-image-cropper src="/images/photo.jpg" aspectRatio="1"></dile-image-cropper>
```

```javascript
const cropper = document.querySelector('dile-image-cropper');
cropper.file = inputFile.files[0];
// later...
const croppedFile = await cropper.getFile();
```

The image stays fixed inside the crop area. The user moves and resizes the selection, which is always kept within the bounds of the image.

## Properties

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `src` | `String` | `""` | URL of the image to crop. |
| `file` | `File` | `null` | Image file to crop, an alternative to `src`. The component creates an object URL and revokes it when the file changes or the element is removed. Property only, no attribute. |
| `alt` | `String` | `""` | Alternative text for the image. |
| `aspectRatio` | `Number` | `undefined` | Fixed aspect ratio of the selection, e.g. `1` for a square avatar or `1.7778` for 16:9. If not set, the selection is free. |
| `initialCoverage` | `Number` | `0.8` | Initial size of the selection relative to the image, between `0` and `1`. |
| `outputWidth` | `Number` | `undefined` | Width in pixels of the exported image. |
| `outputHeight` | `Number` | `undefined` | Height in pixels of the exported image. If neither `outputWidth` nor `outputHeight` are set, the crop is exported at the natural resolution of the source image. |
| `outputType` | `String` | `""` | MIME type of the exported image (`image/png`, `image/jpeg`, `image/webp`). By default, the type of `file` if it is one of these, otherwise `image/png`. |
| `outputQuality` | `Number` | `0.92` | Quality used for lossy output types (`image/jpeg`, `image/webp`), between `0` and `1`. |
| `round` | `Boolean` | `false` | Shows a circular mask, useful for avatars. It is only visual: the exported image is still rectangular, so you can round it with CSS where it is displayed. |

> **Note:** When the output type is `image/jpeg`, the exported image gets a white background, since JPEG does not support transparency.

## Methods

- **getCanvas()**: Returns a promise that resolves to an `HTMLCanvasElement` with the cropped area.
- **getBlob()**: Returns a promise that resolves to a `Blob` with the cropped image, using `outputType` and `outputQuality`.
- **getFile(fileName)**: Returns a promise that resolves to a `File` with the cropped image. The name is `fileName` or the name of the `file` property, with the extension that matches the output type (e.g. `photo.png` exported as JPEG becomes `photo.jpg`).
- **reset()**: Restores the initial selection.

The export methods reject if there is no image loaded.

## Events

- **dile-image-cropper-ready**: Dispatched when the image is loaded and the initial selection is set. `detail` contains the selection: `{ x, y, width, height }`, in pixels relative to the crop area.
- **dile-image-cropper-change**: Dispatched every time the selection changes. `detail` contains `{ x, y, width, height }`.
- **dile-image-cropper-error**: Dispatched when the image cannot be loaded. `detail` contains `{ error }`.

```javascript
cropper.addEventListener('dile-image-cropper-change', async () => {
  preview.src = URL.createObjectURL(await cropper.getBlob());
});
```

## CSS Custom Properties

Custom property | Description | Default
----------------|-------------|---------
--dile-image-cropper-height | Height of the crop area | 300px
--dile-image-cropper-shade-color | Color outside the circle when `round` is set | rgba(0, 0, 0, 0.55)

## Use with dile-image-uploader

The [dile-image-uploader](/crud/image-uploader/) component of `@dile/crud` can use this component to crop images before uploading them, through its `crop` property.

## dile-image-cropper demos

### Free crop

```html:preview
<script type="module">
  import '@dile/image-cropper/image-cropper.js';
</script>
<dile-image-cropper src="/images/random-user.jpg"></dile-image-cropper>
```

### Avatar with export

```html:preview
<script type="module">
  import { LitElement, html, css } from 'lit';

  class AvatarCropperDemo extends LitElement {
    static styles = css`
      .result {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-top: 1rem;
      }
      img {
        width: 96px;
        height: 96px;
        border-radius: 50%;
      }
    `;
    static properties = { preview: { state: true } };

    render() {
      return html`
        <input type="file" accept="image/*" @change=${this.selectFile}>
        <dile-image-cropper
          id="cropper"
          aspectRatio="1"
          outputWidth="256"
          outputHeight="256"
          round
        ></dile-image-cropper>
        <div class="result">
          <button @click=${this.crop}>Crop</button>
          ${this.preview ? html`<img src="${this.preview}" alt="Cropped avatar">` : ''}
        </div>
      `;
    }

    get cropper() {
      return this.shadowRoot.getElementById('cropper');
    }

    selectFile(e) {
      this.cropper.file = e.target.files[0] || null;
    }

    async crop() {
      const blob = await this.cropper.getBlob();
      this.preview = URL.createObjectURL(blob);
    }
  }
  customElements.define('avatar-cropper-demo', AvatarCropperDemo);
</script>
<avatar-cropper-demo></avatar-cropper-demo>
```
