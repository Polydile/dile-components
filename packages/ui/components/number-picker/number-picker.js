import { DileNumberPicker } from './src/DileNumberPicker.js';

if (!customElements.get('dile-number-picker')) {
  customElements.define('dile-number-picker', DileNumberPicker);
}