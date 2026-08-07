import { DileThemeBuilder } from './DileThemeBuilder.js';

if (!customElements.get('dile-theme-builder')) {
  window.customElements.define('dile-theme-builder', DileThemeBuilder);
}
