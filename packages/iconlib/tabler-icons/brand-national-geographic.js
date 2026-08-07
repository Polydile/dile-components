import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBrandNationalGeographic extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M7 3h10v18h-10l0 -18" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-brand-national-geographic')) {
  customElements.define('dile-tabler-icon-brand-national-geographic', DileIconlibBrandNationalGeographic);
}
