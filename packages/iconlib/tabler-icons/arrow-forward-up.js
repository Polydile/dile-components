import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowForwardUp extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M15 14l4 -4l-4 -4" /> <path d="M19 10h-11a4 4 0 1 0 0 8h1" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-arrow-forward-up')) {
  customElements.define('dile-tabler-icon-arrow-forward-up', DileIconlibArrowForwardUp);
}
