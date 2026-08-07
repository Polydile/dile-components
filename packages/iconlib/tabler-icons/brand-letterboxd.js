import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBrandLetterboxd extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /> <path d="M6 12a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /> <path d="M10 12a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /> <path d="M14 12a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-brand-letterboxd')) {
  customElements.define('dile-tabler-icon-brand-letterboxd', DileIconlibBrandLetterboxd);
}
