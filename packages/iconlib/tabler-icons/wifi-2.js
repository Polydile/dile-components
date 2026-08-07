import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibWifi2 extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 18l.01 0" /> <path d="M9.172 15.172a4 4 0 0 1 5.656 0" /> <path d="M6.343 12.343a8 8 0 0 1 11.314 0" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-wifi-2')) {
  customElements.define('dile-tabler-icon-wifi-2', DileIconlibWifi2);
}
