import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBrandDcos extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 18l18 -12h-18l9 14l9 -14v10l-18 -10l0 12" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-brand-dcos')) {
  customElements.define('dile-tabler-icon-brand-dcos', DileIconlibBrandDcos);
}
