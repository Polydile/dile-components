import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibMenu4Fill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M16 18V20H5V18H16ZM21 11V13H3V11H21ZM19 4V6H8V4H19Z"/></svg>`;
  }
}

if (!customElements.get('dile-remixicon-icon-menu-4-fill')) {
  customElements.define('dile-remixicon-icon-menu-4-fill', DileIconlibMenu4Fill);
}
