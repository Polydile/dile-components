import { DileInputSuggestions } from './src/DileInputSuggestions.js';

if (!customElements.get('dile-input-suggestions')) {
  customElements.define('dile-input-suggestions', DileInputSuggestions);
}
