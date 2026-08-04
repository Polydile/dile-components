import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibSwipeRight extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M4 12a4 4 0 1 1 8 0a4 4 0 0 1 -8 0" /> <path d="M12 12h8" /> <path d="M17 15l3 -3l-3 -3" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-swipe-right', DileIconlibSwipeRight);
