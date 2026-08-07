import { DileTextarea } from './src/DileTextarea.js';

if (!customElements.get('dile-textarea')) {
  window.customElements.define('dile-textarea', DileTextarea);
}