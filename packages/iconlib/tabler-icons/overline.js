import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibOverline extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M7 9v5a5 5 0 0 0 10 0v-5" /> <path d="M5 5h14" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-overline', DileIconlibOverline);
