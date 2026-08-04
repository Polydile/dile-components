import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibTextSpellcheck extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M5 15v-7.5a3.5 3.5 0 0 1 7 0v7.5" /> <path d="M5 10h7" /> <path d="M10 18l3 3l7 -7" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-text-spellcheck', DileIconlibTextSpellcheck);
