import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowDropUpFill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 10L16 14H8L12 10Z"/></svg>`;
  }
}

customElements.define('dile-remixicon-icon-arrow-drop-up-fill', DileIconlibArrowDropUpFill);
