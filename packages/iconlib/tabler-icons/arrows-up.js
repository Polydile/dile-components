import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowsUp extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M17 3l0 18" /> <path d="M4 6l3 -3l3 3" /> <path d="M20 6l-3 -3l-3 3" /> <path d="M7 3l0 18" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-arrows-up')) {
  customElements.define('dile-tabler-icon-arrows-up', DileIconlibArrowsUp);
}
