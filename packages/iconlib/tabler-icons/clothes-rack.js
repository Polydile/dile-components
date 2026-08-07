import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibClothesRack extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M10 5a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /> <path d="M12 7v14" /> <path d="M9 21h6" /> <path d="M7.757 9.243a6 6 0 0 0 8.486 0" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-clothes-rack')) {
  customElements.define('dile-tabler-icon-clothes-rack', DileIconlibClothesRack);
}
