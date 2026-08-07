import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowsExchange2 extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M17 10h-14l4 -4" /> <path d="M7 14h14l-4 4" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-arrows-exchange-2')) {
  customElements.define('dile-tabler-icon-arrows-exchange-2', DileIconlibArrowsExchange2);
}
