import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibLetterPSmall extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M10 12h2a2 2 0 1 0 0 -4h-2v8" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-letter-p-small', DileIconlibLetterPSmall);
