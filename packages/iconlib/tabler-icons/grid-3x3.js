import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibGrid3x3 extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 8h18" /> <path d="M3 16h18" /> <path d="M8 3v18" /> <path d="M16 3v18" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-grid-3x3')) {
  customElements.define('dile-tabler-icon-grid-3x3', DileIconlibGrid3x3);
}
