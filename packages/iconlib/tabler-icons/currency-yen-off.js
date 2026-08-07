import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCurrencyYenOff extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 19v-7m5 -7l-3.328 4.66" /> <path d="M8 17h8" /> <path d="M8 13h5" /> <path d="M3 3l18 18" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-currency-yen-off')) {
  customElements.define('dile-tabler-icon-currency-yen-off', DileIconlibCurrencyYenOff);
}
