import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibNumber9 extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M16 8a4 4 0 1 0 -8 0v1a4 4 0 1 0 8 0" /> <path d="M8 16a4 4 0 1 0 8 0v-8" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-number-9', DileIconlibNumber9);
