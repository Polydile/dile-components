import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowBarLeft extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M4 12l10 0" /> <path d="M4 12l4 4" /> <path d="M4 12l4 -4" /> <path d="M20 4l0 16" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-arrow-bar-left')) {
  customElements.define('dile-tabler-icon-arrow-bar-left', DileIconlibArrowBarLeft);
}
