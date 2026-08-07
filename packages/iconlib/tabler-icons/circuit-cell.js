import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCircuitCell extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M2 12h8" /> <path d="M14 12h8" /> <path d="M10 5v14" /> <path d="M14 9v6" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-circuit-cell')) {
  customElements.define('dile-tabler-icon-circuit-cell', DileIconlibCircuitCell);
}
