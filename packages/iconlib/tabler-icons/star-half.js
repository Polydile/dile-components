import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibStarHalf extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l.007 15.748" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-star-half')) {
  customElements.define('dile-tabler-icon-star-half', DileIconlibStarHalf);
}
