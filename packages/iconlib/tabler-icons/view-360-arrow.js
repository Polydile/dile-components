import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibView360Arrow extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M17 15.328c2.414 -.718 4 -1.94 4 -3.328c0 -2.21 -4.03 -4 -9 -4s-9 1.79 -9 4s4.03 4 9 4" /> <path d="M9 13l3 3l-3 3" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-view-360-arrow')) {
  customElements.define('dile-tabler-icon-view-360-arrow', DileIconlibView360Arrow);
}
