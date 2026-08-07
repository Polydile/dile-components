import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowDownWideFill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 15.6315L20.9679 10.8838L20.0321 9.11619L12 13.3685L3.9679 9.11619L3.03212 10.8838L12 15.6315Z"/></svg>`;
  }
}

if (!customElements.get('dile-remixicon-icon-arrow-down-wide-fill')) {
  customElements.define('dile-remixicon-icon-arrow-down-wide-fill', DileIconlibArrowDownWideFill);
}
