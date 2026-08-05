import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowDropLeftFill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M9 12L13 8V16L9 12Z"/></svg>`;
  }
}

customElements.define('dile-remixicon-icon-arrow-drop-left-fill', DileIconlibArrowDropLeftFill);
