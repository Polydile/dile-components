import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibExposureMinus2 extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 9a4 4 0 1 1 8 0c0 1.098 -.564 2.025 -1.159 2.815l-6.841 7.185h8" /> <path d="M3 12h6" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-exposure-minus-2')) {
  customElements.define('dile-tabler-icon-exposure-minus-2', DileIconlibExposureMinus2);
}
