import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCircles extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M8 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /> <path d="M2.5 17a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /> <path d="M13.5 17a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-circles')) {
  customElements.define('dile-tabler-icon-circles', DileIconlibCircles);
}
