import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowBadgeRight extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M13 7h-6l4 5l-4 5h6l4 -5l-4 -5" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-arrow-badge-right', DileIconlibArrowBadgeRight);
