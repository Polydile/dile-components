import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibAsterisk extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 12l8 -4.5" /> <path d="M12 12v9" /> <path d="M12 12l-8 -4.5" /> <path d="M12 12l8 4.5" /> <path d="M12 3v9" /> <path d="M12 12l-8 4.5" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-asterisk')) {
  customElements.define('dile-tabler-icon-asterisk', DileIconlibAsterisk);
}
