import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibMars extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M5 14a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" /> <path d="M19 5l-5.4 5.4" /> <path d="M19 5l-5 0" /> <path d="M19 5l0 5" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-mars', DileIconlibMars);
