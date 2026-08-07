import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBadge extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M17 17v-13l-5 3l-5 -3v13l5 3l5 -3" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-badge')) {
  customElements.define('dile-tabler-icon-badge', DileIconlibBadge);
}
