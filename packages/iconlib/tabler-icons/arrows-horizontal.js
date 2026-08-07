import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowsHorizontal extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M7 8l-4 4l4 4" /> <path d="M17 8l4 4l-4 4" /> <path d="M3 12l18 0" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-arrows-horizontal')) {
  customElements.define('dile-tabler-icon-arrows-horizontal', DileIconlibArrowsHorizontal);
}
