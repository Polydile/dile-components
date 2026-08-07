import { DileColorPicker } from './src/DileColorPicker.js';

if (!customElements.get('dile-color-picker')) {
  window.customElements.define('dile-color-picker', DileColorPicker);
}
