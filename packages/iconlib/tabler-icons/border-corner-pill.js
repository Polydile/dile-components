import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBorderCornerPill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M4 20v-5c0 -6.075 4.925 -11 11 -11h5" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-border-corner-pill')) {
  customElements.define('dile-tabler-icon-border-corner-pill', DileIconlibBorderCornerPill);
}
