import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibRating14Plus extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /> <path d="M7 15v-6" /> <path d="M15.5 12h3" /> <path d="M17 10.5v3" /> <path d="M12.5 15v-6m-2.5 0v4h3" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-rating-14-plus')) {
  customElements.define('dile-tabler-icon-rating-14-plus', DileIconlibRating14Plus);
}
