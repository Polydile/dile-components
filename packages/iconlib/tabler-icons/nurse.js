import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibNurse extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 5c2.941 0 6.685 1.537 9 3l-2 11h-14l-2 -11c2.394 -1.513 6.168 -3.005 9 -3" /> <path d="M10 12h4" /> <path d="M12 10v4" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-nurse')) {
  customElements.define('dile-tabler-icon-nurse', DileIconlibNurse);
}
