import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibDeviceDesktopExclamation extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M15 16h-11a1 1 0 0 1 -1 -1v-10a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v7" /> <path d="M7 20h8" /> <path d="M9 16v4" /> <path d="M15 16v4" /> <path d="M19 16v3" /> <path d="M19 22v.01" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-device-desktop-exclamation')) {
  customElements.define('dile-tabler-icon-device-desktop-exclamation', DileIconlibDeviceDesktopExclamation);
}
