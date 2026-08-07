import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibInnerShadowTop extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M5.636 5.636a9 9 0 1 0 12.728 12.728a9 9 0 0 0 -12.728 -12.728" /> <path d="M16.243 7.757a6 6 0 0 0 -8.486 0" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-inner-shadow-top')) {
  customElements.define('dile-tabler-icon-inner-shadow-top', DileIconlibInnerShadowTop);
}
