import { DileAjaxInputSuggestions } from './src/DileAjaxInputSuggestions.js';

if (!customElements.get('dile-ajax-input-suggestions')) {
  customElements.define('dile-ajax-input-suggestions', DileAjaxInputSuggestions);
}
