import { DileInputNumber } from './src/DileInputNumber.js';

if (!customElements.get('dile-input-number')) {
  window.customElements.define('dile-input-number', DileInputNumber);
}