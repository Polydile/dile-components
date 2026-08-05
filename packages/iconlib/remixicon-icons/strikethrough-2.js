import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibStrikethrough2 extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M13 9H11V6H5V4H19V6H13V9ZM13 15V20H11V15H13ZM3 11H21V13H3V11Z"/></svg>`;
  }
}

customElements.define('dile-remixicon-icon-strikethrough-2', DileIconlibStrikethrough2);
