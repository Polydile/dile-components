import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowForwardUpDouble extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M11 14l4 -4l-4 -4" /> <path d="M16 14l4 -4l-4 -4" /> <path d="M15 10h-7a4 4 0 1 0 0 8h1" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-arrow-forward-up-double', DileIconlibArrowForwardUpDouble);
