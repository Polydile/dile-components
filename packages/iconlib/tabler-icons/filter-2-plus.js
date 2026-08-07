import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibFilter2Plus extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M4 6h16" /> <path d="M6 12h10" /> <path d="M9 18h3" /> <path d="M19 15v6" /> <path d="M16 18h6" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-filter-2-plus')) {
  customElements.define('dile-tabler-icon-filter-2-plus', DileIconlibFilter2Plus);
}
