import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibMenu5Fill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M18 18V20H6V18H18ZM21 11V13H3V11H21ZM18 4V6H6V4H18Z"/></svg>`;
  }
}

customElements.define('dile-remixicon-icon-menu-5-fill', DileIconlibMenu5Fill);
