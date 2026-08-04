import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibRating21Plus extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /> <path d="M13 15v-6" /> <path d="M15.5 12h3" /> <path d="M17 10.5v3" /> <path d="M7 10.5a1.5 1.5 0 0 1 3 0c0 .443 -.313 .989 -.612 1.393l-2.388 3.107h3" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-rating-21-plus', DileIconlibRating21Plus);
