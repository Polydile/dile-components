import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibDeviceLaptop extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 19l18 0" /> <path d="M5 7a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1l0 -8" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-device-laptop')) {
  customElements.define('dile-tabler-icon-device-laptop', DileIconlibDeviceLaptop);
}
