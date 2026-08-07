import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBrandGumroad extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M21 12a9 9 0 1 1 -18 0a9 9 0 0 1 18 0" /> <path d="M13.5 13h2.5v3" /> <path d="M15.024 9.382a4 4 0 1 0 -3.024 6.618c1.862 0 2.554 -1.278 3 -3" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-brand-gumroad')) {
  customElements.define('dile-tabler-icon-brand-gumroad', DileIconlibBrandGumroad);
}
