import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibUmbrellaClosed extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M9 16l3 -13l3 13l-6 0" /> <path d="M12 16v3c0 2.667 4 2.667 4 0" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-umbrella-closed')) {
  customElements.define('dile-tabler-icon-umbrella-closed', DileIconlibUmbrellaClosed);
}
