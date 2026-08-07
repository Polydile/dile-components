import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowsDoubleNeSw extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 14l11 -11" /> <path d="M10 3h4v4" /> <path d="M10 17v4h4" /> <path d="M21 10l-11 11" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-arrows-double-ne-sw')) {
  customElements.define('dile-tabler-icon-arrows-double-ne-sw', DileIconlibArrowsDoubleNeSw);
}
