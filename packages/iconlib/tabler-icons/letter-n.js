import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibLetterN extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M7 20v-16l10 16v-16" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-letter-n')) {
  customElements.define('dile-tabler-icon-letter-n', DileIconlibLetterN);
}
