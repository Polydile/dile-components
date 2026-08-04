import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibQuotes extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M4 12c-1.333 -1.854 -1.333 -4.146 0 -6" /> <path d="M8 12c-1.333 -1.854 -1.333 -4.146 0 -6" /> <path d="M16 18c1.333 -1.854 1.333 -4.146 0 -6" /> <path d="M20 18c1.333 -1.854 1.333 -4.146 0 -6" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-quotes', DileIconlibQuotes);
