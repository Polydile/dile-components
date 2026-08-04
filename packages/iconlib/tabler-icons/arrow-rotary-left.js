import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowRotaryLeft extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M16 10a3 3 0 1 1 0 -6a3 3 0 0 1 0 6" /> <path d="M16 10v10" /> <path d="M13 7h-10" /> <path d="M7 11l-4 -4l4 -4" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-arrow-rotary-left', DileIconlibArrowRotaryLeft);
