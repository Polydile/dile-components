import { DileHtmlTransform } from './src/DileHtmlTransform.js';

if (!customElements.get('dile-html-transform')) {
  window.customElements.define('dile-html-transform', DileHtmlTransform);
}
