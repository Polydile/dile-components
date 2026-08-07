import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibAddLine extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"/></svg>`;
  }
}

if (!customElements.get('dile-remixicon-icon-add-line')) {
  customElements.define('dile-remixicon-icon-add-line', DileIconlibAddLine);
}
