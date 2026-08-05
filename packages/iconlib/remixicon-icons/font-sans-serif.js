import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibFontSansSerif extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M7 4H19V6H10V12H18V14H10V21H7V4Z"/></svg>`;
  }
}

customElements.define('dile-remixicon-icon-font-sans-serif', DileIconlibFontSansSerif);
