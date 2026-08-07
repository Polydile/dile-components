import { DileThemePaletteBar } from './DileThemePaletteBar.js';

if (!customElements.get('dile-theme-palette-bar')) {
  window.customElements.define('dile-theme-palette-bar', DileThemePaletteBar);
}
