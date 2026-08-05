import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowDownFill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M13 12H20L12 20L4 12H11V4H13V12Z"/></svg>`;
  }
}

customElements.define('dile-remixicon-icon-arrow-down-fill', DileIconlibArrowDownFill);
