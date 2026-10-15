import { DileInputPhone } from './src/DileInputPhone.js';

if (!customElements.get('dile-input-phone')) {
  customElements.define('dile-input-phone', DileInputPhone);
}

export { DileInputPhone };
