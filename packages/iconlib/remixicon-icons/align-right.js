import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibAlignRight extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3 4H21V6H3V4ZM7 19H21V21H7V19ZM3 14H21V16H3V14ZM7 9H21V11H7V9Z"/></svg>`;
  }
}

customElements.define('dile-remixicon-icon-align-right', DileIconlibAlignRight);
