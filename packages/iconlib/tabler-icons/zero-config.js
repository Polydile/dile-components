import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibZeroConfig extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M4 12a8 8 0 1 0 16 0a8 8 0 1 0 -16 0" /> <path d="M3 21l18 -18" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-zero-config')) {
  customElements.define('dile-tabler-icon-zero-config', DileIconlibZeroConfig);
}
