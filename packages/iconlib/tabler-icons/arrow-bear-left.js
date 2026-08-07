import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowBearLeft extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M13 3h-5v5" /> <path d="M8 3l7.536 7.536a5 5 0 0 1 1.464 3.534v6.93" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-arrow-bear-left')) {
  customElements.define('dile-tabler-icon-arrow-bear-left', DileIconlibArrowBearLeft);
}
