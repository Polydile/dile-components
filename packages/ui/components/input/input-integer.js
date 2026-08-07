import { DileInputInteger } from './src/DileInputInteger.js';

if (!customElements.get('dile-input-integer')) {
  window.customElements.define('dile-input-integer', DileInputInteger);
}