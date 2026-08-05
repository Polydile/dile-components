import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowUpSFill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 8L18 14H6L12 8Z"/></svg>`;
  }
}

customElements.define('dile-remixicon-icon-arrow-up-s-fill', DileIconlibArrowUpSFill);
