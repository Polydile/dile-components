import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBrightness extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /> <path d="M12 3l0 18" /> <path d="M12 9l4.65 -4.65" /> <path d="M12 14.3l7.37 -7.37" /> <path d="M12 19.6l8.85 -8.85" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-brightness')) {
  customElements.define('dile-tabler-icon-brightness', DileIconlibBrightness);
}
