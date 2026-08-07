import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBoxAlignRight extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M13.998 20.003v-16h5a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-5" /> <path d="M8.998 20.003h.01" /> <path d="M3.997 20.003h.011" /> <path d="M3.997 15.002h.011" /> <path d="M3.997 9.002h.011" /> <path d="M3.997 4.002h.011" /> <path d="M8.998 4.002h.01" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-box-align-right')) {
  customElements.define('dile-tabler-icon-box-align-right', DileIconlibBoxAlignRight);
}
