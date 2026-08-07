import { DileInput } from './src/DileInput.js';

if (!customElements.get('dile-input')) {
  window.customElements.define('dile-input', DileInput);
}