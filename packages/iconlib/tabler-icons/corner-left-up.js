import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCornerLeftUp extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M18 18h-6a3 3 0 0 1 -3 -3v-10l-4 4m8 0l-4 -4" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-corner-left-up')) {
  customElements.define('dile-tabler-icon-corner-left-up', DileIconlibCornerLeftUp);
}
