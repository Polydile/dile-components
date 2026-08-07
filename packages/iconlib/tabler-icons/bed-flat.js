import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBedFlat extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 11a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /> <path d="M10 13h11v-2a3 3 0 0 0 -3 -3h-8v5" /> <path d="M3 16h18" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-bed-flat')) {
  customElements.define('dile-tabler-icon-bed-flat', DileIconlibBedFlat);
}
