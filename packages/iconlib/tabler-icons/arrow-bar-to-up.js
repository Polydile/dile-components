import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowBarToUp extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 10l0 10" /> <path d="M12 10l4 4" /> <path d="M12 10l-4 4" /> <path d="M4 4l16 0" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-arrow-bar-to-up')) {
  customElements.define('dile-tabler-icon-arrow-bar-to-up', DileIconlibArrowBarToUp);
}
