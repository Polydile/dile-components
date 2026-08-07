import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCurrencyPound extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M17 18.5a6 6 0 0 1 -5 0a6 6 0 0 0 -5 .5a3 3 0 0 0 2 -2.5v-7.5a4 4 0 0 1 7.45 -2m-2.55 6h-7" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-currency-pound')) {
  customElements.define('dile-tabler-icon-currency-pound', DileIconlibCurrencyPound);
}
