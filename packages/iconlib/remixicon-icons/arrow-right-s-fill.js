import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowRightSFill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M16 12L10 18V6L16 12Z"/></svg>`;
  }
}

if (!customElements.get('dile-remixicon-icon-arrow-right-s-fill')) {
  customElements.define('dile-remixicon-icon-arrow-right-s-fill', DileIconlibArrowRightSFill);
}
