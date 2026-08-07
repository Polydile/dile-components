import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibInnerShadowLeft extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M5.636 5.636a9 9 0 1 1 12.728 12.728a9 9 0 0 1 -12.728 -12.728" /> <path d="M7.757 16.243a6 6 0 0 1 0 -8.486" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-inner-shadow-left')) {
  customElements.define('dile-tabler-icon-inner-shadow-left', DileIconlibInnerShadowLeft);
}
