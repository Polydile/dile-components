import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibHexagons extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M4 18v-5l4 -2l4 2v5l-4 2l-4 -2" /> <path d="M8 11v-5l4 -2l4 2v5" /> <path d="M12 13l4 -2l4 2v5l-4 2l-4 -2" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-hexagons')) {
  customElements.define('dile-tabler-icon-hexagons', DileIconlibHexagons);
}
