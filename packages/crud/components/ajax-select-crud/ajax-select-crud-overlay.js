import { DileAjaxSelectCrudOverlay } from './src/DileAjaxSelectCrudOverlay.js';

if (!customElements.get('dile-ajax-select-crud-overlay')) {
  customElements.define('dile-ajax-select-crud-overlay', DileAjaxSelectCrudOverlay);
}
