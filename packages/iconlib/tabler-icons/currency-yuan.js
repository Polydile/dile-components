import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCurrencyYuan extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 19v-7l-5 -7" /> <path d="M17 5l-5 7" /> <path d="M8 13h8" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-currency-yuan')) {
  customElements.define('dile-tabler-icon-currency-yuan', DileIconlibCurrencyYuan);
}
