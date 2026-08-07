import { DileInputMoney } from './src/DileInputMoney.js';

if (!customElements.get('dile-input-money')) {
  window.customElements.define('dile-input-money', DileInputMoney);
}