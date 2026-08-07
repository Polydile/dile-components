import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibDeviceDesktopOff extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M8 4h12a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1m-4 0h-12a1 1 0 0 1 -1 -1v-10a1 1 0 0 1 1 -1" /> <path d="M7 20h10" /> <path d="M9 16v4" /> <path d="M15 16v4" /> <path d="M3 3l18 18" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-device-desktop-off')) {
  customElements.define('dile-tabler-icon-device-desktop-off', DileIconlibDeviceDesktopOff);
}
