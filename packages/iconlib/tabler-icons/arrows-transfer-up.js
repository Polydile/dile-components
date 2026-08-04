import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowsTransferUp extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M7 21v-6" /> <path d="M20 6l-3 -3l-3 3" /> <path d="M17 3v18" /> <path d="M10 18l-3 3l-3 -3" /> <path d="M7 3v2" /> <path d="M7 9v2" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-arrows-transfer-up', DileIconlibArrowsTransferUp);
