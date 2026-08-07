import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBlur extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 21a9.01 9.01 0 0 0 2.32 -.302a9 9 0 0 0 1.74 -16.733a9 9 0 1 0 -4.06 17.035" /> <path d="M12 3v17" /> <path d="M12 12h9" /> <path d="M12 9h8" /> <path d="M12 6h6" /> <path d="M12 18h6" /> <path d="M12 15h8" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-blur')) {
  customElements.define('dile-tabler-icon-blur', DileIconlibBlur);
}
