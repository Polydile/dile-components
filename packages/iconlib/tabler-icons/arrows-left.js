import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowsLeft extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 7l18 0" /> <path d="M6 20l-3 -3l3 -3" /> <path d="M6 4l-3 3l3 3" /> <path d="M3 17l18 0" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-arrows-left')) {
  customElements.define('dile-tabler-icon-arrows-left', DileIconlibArrowsLeft);
}
