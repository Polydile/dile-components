import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCurrencyTenge extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M6 5h12" /> <path d="M6 9h12" /> <path d="M12 9v10" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-currency-tenge', DileIconlibCurrencyTenge);
