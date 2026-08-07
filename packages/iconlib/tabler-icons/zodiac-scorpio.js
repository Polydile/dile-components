import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibZodiacScorpio extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 4a2 2 0 0 1 2 2v9" /> <path d="M5 6a2 2 0 0 1 4 0v9" /> <path d="M9 6a2 2 0 0 1 4 0v10a3 3 0 0 0 3 3h5l-3 -3m0 6l3 -3" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-zodiac-scorpio')) {
  customElements.define('dile-tabler-icon-zodiac-scorpio', DileIconlibZodiacScorpio);
}
