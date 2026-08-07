import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowBarUp extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 4l0 10" /> <path d="M12 4l4 4" /> <path d="M12 4l-4 4" /> <path d="M4 20l16 0" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-arrow-bar-up')) {
  customElements.define('dile-tabler-icon-arrow-bar-up', DileIconlibArrowBarUp);
}
