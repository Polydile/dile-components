import { DileImageUploader } from './src/DileImageUploader.js';
if (!customElements.get('dile-image-uploader')) {
  customElements.define('dile-image-uploader', DileImageUploader);
}
