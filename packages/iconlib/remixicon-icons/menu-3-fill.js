import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibMenu3Fill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3 4H21V6H3V4ZM9 11H21V13H9V11ZM3 18H21V20H3V18Z"/></svg>`;
  }
}

if (!customElements.get('dile-remixicon-icon-menu-3-fill')) {
  customElements.define('dile-remixicon-icon-menu-3-fill', DileIconlibMenu3Fill);
}
