import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibLetterBSmall extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M10 16h2a2 2 0 1 0 0 -4h-2h2a2 2 0 1 0 0 -4h-2v8" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-letter-b-small')) {
  customElements.define('dile-tabler-icon-letter-b-small', DileIconlibLetterBSmall);
}
