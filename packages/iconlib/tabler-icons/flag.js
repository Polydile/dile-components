import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibFlag extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M5 5a5 5 0 0 1 7 0a5 5 0 0 0 7 0v9a5 5 0 0 1 -7 0a5 5 0 0 0 -7 0v-9" /> <path d="M5 21v-7" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-flag', DileIconlibFlag);
