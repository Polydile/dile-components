import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibNorthStar extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 12h18" /> <path d="M12 21v-18" /> <path d="M7.5 7.5l9 9" /> <path d="M7.5 16.5l9 -9" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-north-star', DileIconlibNorthStar);
