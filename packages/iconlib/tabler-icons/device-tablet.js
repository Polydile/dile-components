import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibDeviceTablet extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M5 4a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v16a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1v-16" /> <path d="M11 17a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-device-tablet')) {
  customElements.define('dile-tabler-icon-device-tablet', DileIconlibDeviceTablet);
}
