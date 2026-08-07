import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibPauseFill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M6 5H8V19H6V5ZM16 5H18V19H16V5Z"/></svg>`;
  }
}

if (!customElements.get('dile-remixicon-icon-pause-fill')) {
  customElements.define('dile-remixicon-icon-pause-fill', DileIconlibPauseFill);
}
