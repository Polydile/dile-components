import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBleach extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M5 19h14a2 2 0 0 0 1.84 -2.75l-7.1 -12.25a2 2 0 0 0 -3.5 0l-7.1 12.25a2 2 0 0 0 1.75 2.75" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-bleach')) {
  customElements.define('dile-tabler-icon-bleach', DileIconlibBleach);
}
