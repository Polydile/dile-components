import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibFontMono extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M6 4H19V6H8V12H18V14H8V21H6V4Z"/></svg>`;
  }
}

customElements.define('dile-remixicon-icon-font-mono', DileIconlibFontMono);
