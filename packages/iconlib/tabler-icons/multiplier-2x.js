import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibMultiplier2x extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M14 16l4 -4" /> <path d="M18 16l-4 -4" /> <path d="M6 10a2 2 0 1 1 4 0c0 .591 -.417 1.318 -.816 1.858l-3.184 4.143l4 0" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-multiplier-2x')) {
  customElements.define('dile-tabler-icon-multiplier-2x', DileIconlibMultiplier2x);
}
