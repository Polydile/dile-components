import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibLetterQ extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M18 9a5 5 0 0 0 -5 -5h-2a5 5 0 0 0 -5 5v6a5 5 0 0 0 5 5h2a5 5 0 0 0 5 -5v-6" /> <path d="M13 15l5 5" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-letter-q')) {
  customElements.define('dile-tabler-icon-letter-q', DileIconlibLetterQ);
}
