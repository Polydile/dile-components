import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCircuitDiode extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M22 12h-6" /> <path d="M2 12h6" /> <path d="M8 7l8 5l-8 5l0 -10" /> <path d="M16 7v10" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-circuit-diode')) {
  customElements.define('dile-tabler-icon-circuit-diode', DileIconlibCircuitDiode);
}
