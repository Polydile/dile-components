import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBuildingBridge2Filled extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"> <path d="M18 6a3 3 0 0 1 3 3v9a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2v-2a3 3 0 0 0 -6 0v2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2v-9a3 3 0 0 1 3 -3z" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-building-bridge-2-filled')) {
  customElements.define('dile-tabler-icon-building-bridge-2-filled', DileIconlibBuildingBridge2Filled);
}
