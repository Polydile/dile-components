import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBrandNextcloud extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M7 12a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" /> <path d="M2 12.5a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0" /> <path d="M17 12.5a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-brand-nextcloud', DileIconlibBrandNextcloud);
