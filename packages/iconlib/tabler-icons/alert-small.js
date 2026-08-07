import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibAlertSmall extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 8v4" /> <path d="M12 16h.01" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-alert-small')) {
  customElements.define('dile-tabler-icon-alert-small', DileIconlibAlertSmall);
}
