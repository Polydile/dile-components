import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibLetterYSmall extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M10 8l2 5l2 -5" /> <path d="M12 16v-3" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-letter-y-small')) {
  customElements.define('dile-tabler-icon-letter-y-small', DileIconlibLetterYSmall);
}
