import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCurrencyZloty extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 18h-7l7 -7h-7" /> <path d="M17 18v-13" /> <path d="M14 14.5l6 -3.5" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-currency-zloty')) {
  customElements.define('dile-tabler-icon-currency-zloty', DileIconlibCurrencyZloty);
}
