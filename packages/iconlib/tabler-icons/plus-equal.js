import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibPlusEqual extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M4 7h6" /> <path d="M7 4v6" /> <path d="M20 16h-6" /> <path d="M20 19h-6" /> <path d="M5 19l14 -14" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-plus-equal', DileIconlibPlusEqual);
