import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibShoppingCart extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M4 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /> <path d="M15 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /> <path d="M17 17h-11v-14h-2" /> <path d="M6 5l14 1l-1 7h-13" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-shopping-cart')) {
  customElements.define('dile-tabler-icon-shopping-cart', DileIconlibShoppingCart);
}
