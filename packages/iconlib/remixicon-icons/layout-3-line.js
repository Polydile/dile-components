import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibLayout3Line extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M4 21C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4ZM8 10H5V19H8V10ZM19 10H10V19H19V10ZM19 5H5V8H19V5Z"/></svg>`;
  }
}

if (!customElements.get('dile-remixicon-icon-layout-3-line')) {
  customElements.define('dile-remixicon-icon-layout-3-line', DileIconlibLayout3Line);
}
