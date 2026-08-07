import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBrandPepsi extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /> <path d="M4 16c5.713 -2.973 11 -3.5 13.449 -11.162" /> <path d="M5 17.5c5.118 -2.859 15 0 14 -11" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-brand-pepsi')) {
  customElements.define('dile-tabler-icon-brand-pepsi', DileIconlibBrandPepsi);
}
