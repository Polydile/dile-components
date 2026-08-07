import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowsDoubleSeNw extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 10l11 11" /> <path d="M14 17v4h-4" /> <path d="M14 3h-4v4" /> <path d="M21 14l-11 -11" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-arrows-double-se-nw')) {
  customElements.define('dile-tabler-icon-arrows-double-se-nw', DileIconlibArrowsDoubleSeNw);
}
