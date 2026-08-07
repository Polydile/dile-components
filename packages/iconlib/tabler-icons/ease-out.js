import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibEaseOut extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 20s10 -16 18 -16" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-ease-out')) {
  customElements.define('dile-tabler-icon-ease-out', DileIconlibEaseOut);
}
