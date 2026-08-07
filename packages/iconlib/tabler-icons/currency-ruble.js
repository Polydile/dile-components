import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCurrencyRuble extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M8 19v-14h6a3 3 0 0 1 0 6h-8" /> <path d="M14 15h-8" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-currency-ruble')) {
  customElements.define('dile-tabler-icon-currency-ruble', DileIconlibCurrencyRuble);
}
