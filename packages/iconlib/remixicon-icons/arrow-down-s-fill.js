import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowDownSFill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 16L6 10H18L12 16Z"/></svg>`;
  }
}

customElements.define('dile-remixicon-icon-arrow-down-s-fill', DileIconlibArrowDownSFill);
