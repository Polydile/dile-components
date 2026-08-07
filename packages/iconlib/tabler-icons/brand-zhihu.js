import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBrandZhihu extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M14 6h6v12h-2l-2 2l-1 -2h-1l0 -12" /> <path d="M4 12h6.5" /> <path d="M10.5 6h-5" /> <path d="M6 4c-.5 2.5 -1.5 3.5 -2.5 4.5" /> <path d="M8 6v7c0 4.5 -2 5.5 -4 7" /> <path d="M11 18l-3 -5" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-brand-zhihu')) {
  customElements.define('dile-tabler-icon-brand-zhihu', DileIconlibBrandZhihu);
}
