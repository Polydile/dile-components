import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibRipple extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 7c3 -2 6 -2 9 0s6 2 9 0" /> <path d="M3 17c3 -2 6 -2 9 0s6 2 9 0" /> <path d="M3 12c3 -2 6 -2 9 0s6 2 9 0" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-ripple')) {
  customElements.define('dile-tabler-icon-ripple', DileIconlibRipple);
}
