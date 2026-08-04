import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCurrencyFlorin extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M8 12h8" /> <path d="M7 19c1.213 0 2.31 -.723 2.788 -1.838l4.424 -10.324a3.033 3.033 0 0 1 2.788 -1.838" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-currency-florin', DileIconlibCurrencyFlorin);
