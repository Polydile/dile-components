import { DileInputNumberMask } from './src/DileInputNumberMask.js';

if (!customElements.get('dile-input-number-mask')) {
  window.customElements.define('dile-input-number-mask', DileInputNumberMask);
}
