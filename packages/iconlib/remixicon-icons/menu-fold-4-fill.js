import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibMenuFold4Fill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M21 4H7V6H21V4ZM21 11H11V13H21V11ZM21 18H7V20H21V18ZM3 17V7L8 11.9996L3 17Z"/></svg>`;
  }
}

if (!customElements.get('dile-remixicon-icon-menu-fold-4-fill')) {
  customElements.define('dile-remixicon-icon-menu-fold-4-fill', DileIconlibMenuFold4Fill);
}
