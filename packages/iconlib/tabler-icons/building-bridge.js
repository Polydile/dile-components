import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBuildingBridge extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M6 5l0 14" /> <path d="M18 5l0 14" /> <path d="M2 15l20 0" /> <path d="M3 8a7.5 7.5 0 0 0 3 -2a6.5 6.5 0 0 0 12 0a7.5 7.5 0 0 0 3 2" /> <path d="M12 10l0 5" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-building-bridge')) {
  customElements.define('dile-tabler-icon-building-bridge', DileIconlibBuildingBridge);
}
