import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibRecordMail extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M4 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /> <path d="M14 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /> <path d="M7 15l10 0" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-record-mail', DileIconlibRecordMail);
