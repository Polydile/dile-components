import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibDeviceIpadOff extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M6 2h12a2 2 0 0 1 2 2v12m0 4a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-16" /> <path d="M9 19h6" /> <path d="M3 3l18 18" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-device-ipad-off')) {
  customElements.define('dile-tabler-icon-device-ipad-off', DileIconlibDeviceIpadOff);
}
