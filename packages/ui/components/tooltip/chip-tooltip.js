import { DileChipTooltip } from './src/DileChipTooltip.js';

if (!customElements.get('dile-chip-tooltip')) {
  window.customElements.define('dile-chip-tooltip', DileChipTooltip);
}
