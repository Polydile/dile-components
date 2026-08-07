import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibInnerShadowTopRight extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0 -18" /> <path d="M18 12a6 6 0 0 0 -6 -6" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-inner-shadow-top-right')) {
  customElements.define('dile-tabler-icon-inner-shadow-top-right', DileIconlibInnerShadowTopRight);
}
