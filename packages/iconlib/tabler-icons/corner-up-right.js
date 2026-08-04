import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCornerUpRight extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M6 18v-6a3 3 0 0 1 3 -3h10l-4 -4m0 8l4 -4" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-corner-up-right', DileIconlibCornerUpRight);
