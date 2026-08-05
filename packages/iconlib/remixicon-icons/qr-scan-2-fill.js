import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibQrScan2Fill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15 3H21V9H15V3ZM9 3V9H3V3H9ZM15 21V15H21V21H15ZM9 21H3V15H9V21ZM3 11H21V13H3V11Z"/></svg>`;
  }
}

customElements.define('dile-remixicon-icon-qr-scan-2-fill', DileIconlibQrScan2Fill);
