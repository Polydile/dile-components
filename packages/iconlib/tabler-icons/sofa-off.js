import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibSofaOff extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M18 14v-1a2 2 0 1 1 4 0v5m-3 1h-16a1 1 0 0 1 -1 -1v-5a2 2 0 1 1 4 0v1h8" /> <path d="M4 11v-3c0 -1.082 .573 -2.03 1.432 -2.558m3.568 -.442h8a3 3 0 0 1 3 3v3" /> <path d="M12 5v3m0 4v2" /> <path d="M3 3l18 18" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-sofa-off')) {
  customElements.define('dile-tabler-icon-sofa-off', DileIconlibSofaOff);
}
