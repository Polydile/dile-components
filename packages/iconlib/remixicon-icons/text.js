import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibText extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M13 6V21H11V6H5V4H19V6H13Z"/></svg>`;
  }
}

if (!customElements.get('dile-remixicon-icon-text')) {
  customElements.define('dile-remixicon-icon-text', DileIconlibText);
}
