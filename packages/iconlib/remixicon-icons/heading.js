import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibHeading extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17 11V4H19V21H17V13H7V21H5V4H7V11H17Z"/></svg>`;
  }
}

if (!customElements.get('dile-remixicon-icon-heading')) {
  customElements.define('dile-remixicon-icon-heading', DileIconlibHeading);
}
