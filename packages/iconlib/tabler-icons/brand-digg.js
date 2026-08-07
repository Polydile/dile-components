import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBrandDigg extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M6 15h-3v-4h3" /> <path d="M15 15h-3v-4h3" /> <path d="M9 15v-4" /> <path d="M15 11v7h-3" /> <path d="M6 7v8" /> <path d="M21 15h-3v-4h3" /> <path d="M21 11v7h-3" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-brand-digg')) {
  customElements.define('dile-tabler-icon-brand-digg', DileIconlibBrandDigg);
}
