import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibMenuFill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"/></svg>`;
  }
}

if (!customElements.get('dile-remixicon-icon-menu-fill')) {
  customElements.define('dile-remixicon-icon-menu-fill', DileIconlibMenuFill);
}
