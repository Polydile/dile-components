import { DileInputMask } from './src/DileInputMask.js';

if (!customElements.get('dile-input-mask')) {
  window.customElements.define('dile-input-mask', DileInputMask);
}
