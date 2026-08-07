import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibTexture extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M6 3l-3 3" /> <path d="M21 18l-3 3" /> <path d="M11 3l-8 8" /> <path d="M16 3l-13 13" /> <path d="M21 3l-18 18" /> <path d="M21 8l-13 13" /> <path d="M21 13l-8 8" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-texture')) {
  customElements.define('dile-tabler-icon-texture', DileIconlibTexture);
}
