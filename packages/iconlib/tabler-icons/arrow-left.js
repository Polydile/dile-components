import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowLeft extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M5 12l14 0" /> <path d="M5 12l6 6" /> <path d="M5 12l6 -6" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-arrow-left')) {
  customElements.define('dile-tabler-icon-arrow-left', DileIconlibArrowLeft);
}
