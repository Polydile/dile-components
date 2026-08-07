import { DileInputPercentage } from './src/DileInputPercentage.js';

if (!customElements.get('dile-input-percentage')) {
  window.customElements.define('dile-input-percentage', DileInputPercentage);
}