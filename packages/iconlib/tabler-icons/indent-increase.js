import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibIndentIncrease extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M20 6l-11 0" /> <path d="M20 12l-7 0" /> <path d="M20 18l-11 0" /> <path d="M4 8l4 4l-4 4" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-indent-increase', DileIconlibIndentIncrease);
