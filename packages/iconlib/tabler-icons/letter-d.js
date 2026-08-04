import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibLetterD extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M7 4h6a5 5 0 0 1 5 5v6a5 5 0 0 1 -5 5h-6v-16" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-letter-d', DileIconlibLetterD);
