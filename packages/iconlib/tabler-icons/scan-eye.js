import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibScanEye extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M7 12q 5 -7 10 0" /> <path d="M7 12q 5 7 10 0" /> <path d="M12 12h-.01" /> <path d="M3 7v-2a2 2 0 0 1 2 -2h2" /> <path d="M3 17v2a2 2 0 0 0 2 2h2" /> <path d="M17 3h2a2 2 0 0 1 2 2v2" /> <path d="M17 21h2a2 2 0 0 0 2 -2v-2" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-scan-eye')) {
  customElements.define('dile-tabler-icon-scan-eye', DileIconlibScanEye);
}
