import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibFolder3Fill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M22 8V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V7H21C21.5523 7 22 7.44772 22 8ZM12.4142 5H2V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5Z"/></svg>`;
  }
}

if (!customElements.get('dile-remixicon-icon-folder-3-fill')) {
  customElements.define('dile-remixicon-icon-folder-3-fill', DileIconlibFolder3Fill);
}
