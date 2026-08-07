import { DileMessage } from './src/DileMessage.js';

if (!customElements.get('dile-message')) {
  window.customElements.define('dile-message', DileMessage);
}
