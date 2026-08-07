import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCoinYuan extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /> <path d="M9 13h6" /> <path d="M9 8l3 4.5" /> <path d="M15 8l-3 4.5v4.5" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-coin-yuan')) {
  customElements.define('dile-tabler-icon-coin-yuan', DileIconlibCoinYuan);
}
