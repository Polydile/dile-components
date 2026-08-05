import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowLeftSFill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M8 12L14 6V18L8 12Z"/></svg>`;
  }
}

customElements.define('dile-remixicon-icon-arrow-left-s-fill', DileIconlibArrowLeftSFill);
