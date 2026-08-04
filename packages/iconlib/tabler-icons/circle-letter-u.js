import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCircleLetterU extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /> <path d="M10 8v6a2 2 0 1 0 4 0v-6" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-circle-letter-u', DileIconlibCircleLetterU);
