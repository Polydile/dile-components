import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibLineDashed extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M5 12h2" /> <path d="M17 12h2" /> <path d="M11 12h2" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-line-dashed')) {
  customElements.define('dile-tabler-icon-line-dashed', DileIconlibLineDashed);
}
