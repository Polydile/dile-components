import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBrandSafari extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M8 16l2 -6l6 -2l-2 6l-6 2" /> <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-brand-safari')) {
  customElements.define('dile-tabler-icon-brand-safari', DileIconlibBrandSafari);
}
