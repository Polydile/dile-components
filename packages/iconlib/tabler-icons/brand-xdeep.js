import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBrandXdeep extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M14.401 8.398l1.599 -2.398h5l-4 6l4 6h-5l-8 -12h-5l4 6l-4 6h5l1.596 -2.393" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-brand-xdeep')) {
  customElements.define('dile-tabler-icon-brand-xdeep', DileIconlibBrandXdeep);
}
