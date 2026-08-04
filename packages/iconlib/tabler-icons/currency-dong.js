import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCurrencyDong extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M8 20h8" /> <path d="M15 13a3 3 0 0 1 -3 3a3 3 0 0 1 -3 -3a3 3 0 0 1 3 -3a3 3 0 0 1 3 3" /> <path d="M15 4v12" /> <path d="M13 6h4" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-currency-dong', DileIconlibCurrencyDong);
