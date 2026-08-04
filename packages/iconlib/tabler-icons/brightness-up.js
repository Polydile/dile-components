import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBrightnessUp extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M9 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /> <path d="M12 5l0 -2" /> <path d="M17 7l1.4 -1.4" /> <path d="M19 12l2 0" /> <path d="M17 17l1.4 1.4" /> <path d="M12 19l0 2" /> <path d="M7 17l-1.4 1.4" /> <path d="M6 12l-2 0" /> <path d="M7 7l-1.4 -1.4" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-brightness-up', DileIconlibBrightnessUp);
