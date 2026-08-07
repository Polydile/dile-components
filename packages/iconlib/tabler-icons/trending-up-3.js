import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibTrendingUp3 extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M18 5l3 3l-3 3" /> <path d="M3 18h2.397a5 5 0 0 0 4.096 -2.133l4.014 -5.734a5 5 0 0 1 4.096 -2.133h3.397" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-trending-up-3')) {
  customElements.define('dile-tabler-icon-trending-up-3', DileIconlibTrendingUp3);
}
