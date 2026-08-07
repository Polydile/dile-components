import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCurrencyRiyal extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M15 9v2a2 2 0 1 1 -4 0v-1v1a2 2 0 1 1 -4 0v-1v4a2 2 0 1 1 -4 0v-2" /> <path d="M18 12.01v-.01" /> <path d="M22 10v1a5 5 0 0 1 -5 5" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-currency-riyal')) {
  customElements.define('dile-tabler-icon-currency-riyal', DileIconlibCurrencyRiyal);
}
