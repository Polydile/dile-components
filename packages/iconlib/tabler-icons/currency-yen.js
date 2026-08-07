import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCurrencyYen extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 19v-7l-5 -7m10 0l-5 7" /> <path d="M8 17l8 0" /> <path d="M8 13l8 0" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-currency-yen')) {
  customElements.define('dile-tabler-icon-currency-yen', DileIconlibCurrencyYen);
}
