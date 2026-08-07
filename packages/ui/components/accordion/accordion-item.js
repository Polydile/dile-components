import { DileAccordionItem } from './src/DileAccordionItem.js';

if (!customElements.get('dile-accordion-item')) {
  window.customElements.define('dile-accordion-item', DileAccordionItem);
}
