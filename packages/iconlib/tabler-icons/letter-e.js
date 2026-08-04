import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibLetterE extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M17 4h-10v16h10" /> <path d="M7 12l8 0" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-letter-e', DileIconlibLetterE);
