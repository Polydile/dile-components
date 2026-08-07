import { DileThemeModeSwitch } from './DileThemeModeSwitch.js';

if (!customElements.get('dile-theme-mode-switch')) {
  window.customElements.define('dile-theme-mode-switch', DileThemeModeSwitch);
}
