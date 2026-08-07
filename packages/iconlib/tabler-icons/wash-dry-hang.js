import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibWashDryHang extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12" /> <path d="M4 4.01c5.333 5.323 10.667 5.32 16 -.01" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-wash-dry-hang')) {
  customElements.define('dile-tabler-icon-wash-dry-hang', DileIconlibWashDryHang);
}
