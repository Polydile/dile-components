import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCurrencyEthereum extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M6 12l6 -9l6 9l-6 9l-6 -9" /> <path d="M6 12l6 -3l6 3l-6 2l-6 -2" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-currency-ethereum')) {
  customElements.define('dile-tabler-icon-currency-ethereum', DileIconlibCurrencyEthereum);
}
