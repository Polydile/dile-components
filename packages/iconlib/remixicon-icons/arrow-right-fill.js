import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowRightFill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 13H4V11H12V4L20 12L12 20V13Z"/></svg>`;
  }
}

customElements.define('dile-remixicon-icon-arrow-right-fill', DileIconlibArrowRightFill);
