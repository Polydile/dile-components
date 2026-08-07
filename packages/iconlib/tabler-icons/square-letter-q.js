import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibSquareLetterQ extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14" /> <path d="M12 8a2 2 0 0 1 2 2v4a2 2 0 1 1 -4 0v-4a2 2 0 0 1 2 -2" /> <path d="M13 15l1 1" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-square-letter-q')) {
  customElements.define('dile-tabler-icon-square-letter-q', DileIconlibSquareLetterQ);
}
