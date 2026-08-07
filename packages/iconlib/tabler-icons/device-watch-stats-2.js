import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibDeviceWatchStats2 extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M6 9a3 3 0 0 1 3 -3h6a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-6a3 3 0 0 1 -3 -3l0 -6" /> <path d="M9 18v3h6v-3" /> <path d="M9 6v-3h6v3" /> <path d="M12 10a2 2 0 1 0 2 2" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-device-watch-stats-2')) {
  customElements.define('dile-tabler-icon-device-watch-stats-2', DileIconlibDeviceWatchStats2);
}
