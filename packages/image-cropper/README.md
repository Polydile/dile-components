# @dile/image-cropper

Web Component to crop images in the browser, powered by [Cropper.js v2](https://fengyuanchen.github.io/cropperjs/).

Cropper.js is lazy loaded: it is only downloaded the first time a `dile-image-cropper` has an image to display.

## Installation

```bash
npm i @dile/image-cropper
```

## Usage

```javascript
import '@dile/image-cropper/image-cropper.js';
```

```html
<dile-image-cropper src="photo.jpg" aspectRatio="1" outputWidth="256" outputHeight="256" round></dile-image-cropper>
```

```javascript
const file = await document.querySelector('dile-image-cropper').getFile();
```

Full documentation at [dile-components.com](https://dile-components.com/components/dile-image-cropper/).
