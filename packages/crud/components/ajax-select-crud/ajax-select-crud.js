import { DileAjaxSelectCrud } from './src/DileAjaxSelectCrud.js';

if (!customElements.get('dile-ajax-select-crud')) {
  customElements.define('dile-ajax-select-crud', DileAjaxSelectCrud);
}
