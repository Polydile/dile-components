import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBandage extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M14 12l0 .01" /> <path d="M10 12l0 .01" /> <path d="M12 10l0 .01" /> <path d="M12 14l0 .01" /> <path d="M4.5 12.5l8 -8a4.94 4.94 0 0 1 7 7l-8 8a4.94 4.94 0 0 1 -7 -7" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-bandage')) {
  customElements.define('dile-tabler-icon-bandage', DileIconlibBandage);
}
