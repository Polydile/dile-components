import { DileAccordion } from './src/DileAccordion.js';

if (!customElements.get('dile-accordion')) {
  window.customElements.define('dile-accordion', DileAccordion);
}
