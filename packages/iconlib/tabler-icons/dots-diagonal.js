import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibDotsDiagonal extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M6 17a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /> <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /> <path d="M16 7a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-dots-diagonal')) {
  customElements.define('dile-tabler-icon-dots-diagonal', DileIconlibDotsDiagonal);
}
