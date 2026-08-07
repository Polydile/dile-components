import { DileTooltip } from './src/DileTooltip.js';

if (!customElements.get('dile-tooltip')) {
  window.customElements.define('dile-tooltip', DileTooltip);
}
