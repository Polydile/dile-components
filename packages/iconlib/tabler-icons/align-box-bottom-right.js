import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibAlignBoxBottomRight extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14" /> <path d="M11 15v2" /> <path d="M14 11v6" /> <path d="M17 13v4" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-align-box-bottom-right')) {
  customElements.define('dile-tabler-icon-align-box-bottom-right', DileIconlibAlignBoxBottomRight);
}
