import { DileFilePreview } from "./src/DileFilePreview.js";
if (!customElements.get('dile-file-preview')) {
  customElements.define('dile-file-preview', DileFilePreview);
}
