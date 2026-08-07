import { DileNumberPickerElement } from './src/DileNumberPickerElement.js';

if (!customElements.get('dile-number-picker-element')) {
  window.customElements.define('dile-number-picker-element', DileNumberPickerElement);
}
