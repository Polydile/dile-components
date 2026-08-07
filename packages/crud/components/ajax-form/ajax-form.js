import { DileAjaxForm } from './src/DileAjaxForm.js';
if (!customElements.get('dile-ajax-form')) {
  customElements.define('dile-ajax-form', DileAjaxForm);
}