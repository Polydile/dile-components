import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowDropRightFill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M14 12L10 16V8L14 12Z"/></svg>`;
  }
}

if (!customElements.get('dile-remixicon-icon-arrow-drop-right-fill')) {
  customElements.define('dile-remixicon-icon-arrow-drop-right-fill', DileIconlibArrowDropRightFill);
}
