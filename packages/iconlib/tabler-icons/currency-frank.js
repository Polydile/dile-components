import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCurrencyFrank extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M17 5h-6a2 2 0 0 0 -2 2v12" /> <path d="M7 15h4" /> <path d="M9 11h7" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-currency-frank')) {
  customElements.define('dile-tabler-icon-currency-frank', DileIconlibCurrencyFrank);
}
