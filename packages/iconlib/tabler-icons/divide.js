import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibDivide extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M11 6a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" fill="currentColor" /> <path d="M11 18a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" fill="currentColor" /> <path d="M5 12l14 0" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-divide', DileIconlibDivide);
