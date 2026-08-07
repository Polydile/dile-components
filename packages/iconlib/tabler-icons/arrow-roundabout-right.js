import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowRoundaboutRight extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M21 9h-8a5 5 0 1 0 -5 5v7" /> <path d="M17 5l4 4l-4 4" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-arrow-roundabout-right')) {
  customElements.define('dile-tabler-icon-arrow-roundabout-right', DileIconlibArrowRoundaboutRight);
}
