import { DileInputTags } from './src/DileInputTags.js';

if (!customElements.get('dile-input-tags')) {
  customElements.define('dile-input-tags', DileInputTags);
}
