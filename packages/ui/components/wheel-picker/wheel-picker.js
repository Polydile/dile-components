import { DileWheelPicker } from './src/DileWheelPicker.js';

if (!customElements.get('dile-wheel-picker')) {
  customElements.define('dile-wheel-picker', DileWheelPicker);
}
