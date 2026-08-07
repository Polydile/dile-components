import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibDevice3dLens extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M18.005 14.64a3.98 3.98 0 0 0 .995 -2.64" /> <path d="M12 4v16" /> <path d="M15 5v14a7 7 0 0 0 0 -14" /> <path d="M9 5v14a7 7 0 0 1 0 -14" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-device-3d-lens')) {
  customElements.define('dile-tabler-icon-device-3d-lens', DileIconlibDevice3dLens);
}
