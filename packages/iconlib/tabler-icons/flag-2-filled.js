import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibFlag2Filled extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"> <path d="M19 4a1 1 0 0 1 .993 .883l.007 .117v9a1 1 0 0 1 -.883 .993l-.117 .007h-13v6a1 1 0 0 1 -.883 .993l-.117 .007a1 1 0 0 1 -.993 -.883l-.007 -.117v-16a1 1 0 0 1 .883 -.993l.117 -.007h14z" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-flag-2-filled')) {
  customElements.define('dile-tabler-icon-flag-2-filled', DileIconlibFlag2Filled);
}
