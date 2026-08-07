import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibSlice extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 19l15 -15l3 3l-6 6l2 2a14 14 0 0 1 -14 4" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-slice')) {
  customElements.define('dile-tabler-icon-slice', DileIconlibSlice);
}
