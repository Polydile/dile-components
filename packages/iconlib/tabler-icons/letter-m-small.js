import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibLetterMSmall extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M9 16v-8l3 5l3 -5v8" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-letter-m-small', DileIconlibLetterMSmall);
