import { DileInputMessage } from './src/DileInputMessage.js';

if (!customElements.get('dile-input-message')) {
  window.customElements.define('dile-input-message', DileInputMessage);
}