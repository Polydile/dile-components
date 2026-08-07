import { DilePassword } from './src/DilePassword.js';

if (!customElements.get('dile-password')) {
  window.customElements.define('dile-password', DilePassword);
}
