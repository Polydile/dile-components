import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibTrendingUp extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 17l6 -6l4 4l8 -8" /> <path d="M14 7l7 0l0 7" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-trending-up', DileIconlibTrendingUp);
