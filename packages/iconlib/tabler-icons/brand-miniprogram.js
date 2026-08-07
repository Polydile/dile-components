import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBrandMiniprogram extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M21 12a9 9 0 1 1 -18 0a9 9 0 0 1 18 0" /> <path d="M8 11.503a2.5 2.5 0 1 0 4 2v-3a2.5 2.5 0 1 1 4 2" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-brand-miniprogram')) {
  customElements.define('dile-tabler-icon-brand-miniprogram', DileIconlibBrandMiniprogram);
}
