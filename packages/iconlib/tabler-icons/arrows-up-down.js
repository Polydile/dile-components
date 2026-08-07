import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowsUpDown extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M7 3l0 18" /> <path d="M10 6l-3 -3l-3 3" /> <path d="M20 18l-3 3l-3 -3" /> <path d="M17 21l0 -18" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-arrows-up-down')) {
  customElements.define('dile-tabler-icon-arrows-up-down', DileIconlibArrowsUpDown);
}
