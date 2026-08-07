import { DileConfirmText } from './src/DileConfirmText.js';

if (!customElements.get('dile-confirm-text')) {
  window.customElements.define('dile-confirm-text', DileConfirmText);
}
