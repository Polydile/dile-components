import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCircuitResistor extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M2 12h2l2 -5l3 10l3 -10l3 10l3 -10l1.5 5h2.5" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-circuit-resistor')) {
  customElements.define('dile-tabler-icon-circuit-resistor', DileIconlibCircuitResistor);
}
