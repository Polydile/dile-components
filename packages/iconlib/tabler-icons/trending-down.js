import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibTrendingDown extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 7l6 6l4 -4l8 8" /> <path d="M21 10l0 7l-7 0" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-trending-down')) {
  customElements.define('dile-tabler-icon-trending-down', DileIconlibTrendingDown);
}
