import { DileColorSelect } from './src/DileColorSelect.js';

if (!customElements.get('dile-color-select')) {
  customElements.define('dile-color-select', DileColorSelect);
}
