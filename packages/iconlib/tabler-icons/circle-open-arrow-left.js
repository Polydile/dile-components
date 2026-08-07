import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCircleOpenArrowLeft extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M20.066 8.002a9 9 0 1 0 .934 3.998h-13" /> <path d="M12 8l-4 4l4 4" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-circle-open-arrow-left')) {
  customElements.define('dile-tabler-icon-circle-open-arrow-left', DileIconlibCircleOpenArrowLeft);
}
