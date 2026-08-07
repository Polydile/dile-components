import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowDropDownFill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 14L8 10H16L12 14Z"/></svg>`;
  }
}

if (!customElements.get('dile-remixicon-icon-arrow-drop-down-fill')) {
  customElements.define('dile-remixicon-icon-arrow-drop-down-fill', DileIconlibArrowDropDownFill);
}
