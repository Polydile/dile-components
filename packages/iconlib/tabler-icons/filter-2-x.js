import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibFilter2X extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M4 6h16" /> <path d="M6 12h12" /> <path d="M9 18h4" /> <path d="M22 22l-5 -5m0 5l5 -5" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-filter-2-x', DileIconlibFilter2X);
