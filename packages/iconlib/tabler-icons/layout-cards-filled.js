import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibLayoutCardsFilled extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"> <path d="M8 3a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-2a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3z" /> <path d="M18 3a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-2a3 3 0 0 1 -3 -3v-6a3 3 0 0 1 3 -3z" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-layout-cards-filled')) {
  customElements.define('dile-tabler-icon-layout-cards-filled', DileIconlibLayoutCardsFilled);
}
