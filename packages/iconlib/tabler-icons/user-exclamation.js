import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibUserExclamation extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /> <path d="M6 21v-2a4 4 0 0 1 4 -4h4c.348 0 .686 .045 1.008 .128" /> <path d="M19 16v3" /> <path d="M19 22v.01" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-user-exclamation')) {
  customElements.define('dile-tabler-icon-user-exclamation', DileIconlibUserExclamation);
}
