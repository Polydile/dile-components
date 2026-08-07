import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibIceCream2 extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M17.657 11a6 6 0 1 0 -11.315 0" /> <path d="M6.342 11l5.658 11l5.657 -11l-11.315 0" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-ice-cream-2')) {
  customElements.define('dile-tabler-icon-ice-cream-2', DileIconlibIceCream2);
}
