import { DileFileUploader } from './src/DileFileUploader.js';
if (!customElements.get('dile-file-uploader')) {
  customElements.define('dile-file-uploader', DileFileUploader);
}
