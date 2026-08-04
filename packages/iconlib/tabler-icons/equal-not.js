import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibEqualNot extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M5 10h14" /> <path d="M5 14h14" /> <path d="M5 19l14 -14" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-equal-not', DileIconlibEqualNot);
