import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowBack extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-arrow-back')) {
  customElements.define('dile-tabler-icon-arrow-back', DileIconlibArrowBack);
}
