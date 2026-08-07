import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBrandUnsplash extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M4 11h5v4h6v-4h5v9h-16v-9" /> <path d="M9 4h6v4h-6l0 -4" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-brand-unsplash')) {
  customElements.define('dile-tabler-icon-brand-unsplash', DileIconlibBrandUnsplash);
}
