import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibInfoSmall extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 9h.01" /> <path d="M11 12h1v4h1" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-info-small')) {
  customElements.define('dile-tabler-icon-info-small', DileIconlibInfoSmall);
}
