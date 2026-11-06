import { DileImageCropper } from './src/DileImageCropper.js';

if (!customElements.get('dile-image-cropper')) {
  window.customElements.define('dile-image-cropper', DileImageCropper);
}
