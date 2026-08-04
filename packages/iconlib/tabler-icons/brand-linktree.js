import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBrandLinktree extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M4 10h16" /> <path d="M6.5 4.5l11 11" /> <path d="M6.5 15.5l11 -11" /> <path d="M12 10v-8" /> <path d="M12 15v7" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-brand-linktree', DileIconlibBrandLinktree);
