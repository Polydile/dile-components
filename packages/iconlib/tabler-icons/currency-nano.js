import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCurrencyNano extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M7 20l10 -16" /> <path d="M7 12h10" /> <path d="M7 16h10" /> <path d="M17 20l-10 -16" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-currency-nano')) {
  customElements.define('dile-tabler-icon-currency-nano', DileIconlibCurrencyNano);
}
