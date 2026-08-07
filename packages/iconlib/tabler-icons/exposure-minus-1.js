import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibExposureMinus1 extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 12h6" /> <path d="M18 19v-14l-4 4" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-exposure-minus-1')) {
  customElements.define('dile-tabler-icon-exposure-minus-1', DileIconlibExposureMinus1);
}
