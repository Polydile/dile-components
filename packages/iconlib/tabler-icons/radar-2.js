import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibRadar2 extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /> <path d="M15.51 15.56a5 5 0 1 0 -3.51 1.44" /> <path d="M18.832 17.86a9 9 0 1 0 -6.832 3.14" /> <path d="M12 12v9" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-radar-2')) {
  customElements.define('dile-tabler-icon-radar-2', DileIconlibRadar2);
}
