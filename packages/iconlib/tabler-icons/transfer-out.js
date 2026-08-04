import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibTransferOut extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M4 19v2h16v-14l-8 -4l-8 4v2" /> <path d="M13 14h-9" /> <path d="M7 11l-3 3l3 3" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-transfer-out', DileIconlibTransferOut);
