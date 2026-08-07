import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibSofa extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M4 11a2 2 0 0 1 2 2v1h12v-1a2 2 0 1 1 4 0v5a1 1 0 0 1 -1 1h-18a1 1 0 0 1 -1 -1v-5a2 2 0 0 1 2 -2" /> <path d="M4 11v-3a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v3" /> <path d="M12 5v9" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-sofa')) {
  customElements.define('dile-tabler-icon-sofa', DileIconlibSofa);
}
