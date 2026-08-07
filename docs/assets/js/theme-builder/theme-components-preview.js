import { DileThemeComponentsPreview } from './DileThemeComponentsPreview.js';

if (!customElements.get('dile-theme-components-preview')) {
  window.customElements.define('dile-theme-components-preview', DileThemeComponentsPreview);
}
