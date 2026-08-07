import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCut extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M4 17a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /> <path d="M14 17a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /> <path d="M9.15 14.85l8.85 -10.85" /> <path d="M6 4l8.85 10.85" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-cut')) {
  customElements.define('dile-tabler-icon-cut', DileIconlibCut);
}
