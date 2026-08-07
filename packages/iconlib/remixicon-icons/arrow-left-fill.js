import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowLeftFill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 13V20L4 12L12 4V11H20V13H12Z"/></svg>`;
  }
}

if (!customElements.get('dile-remixicon-icon-arrow-left-fill')) {
  customElements.define('dile-remixicon-icon-arrow-left-fill', DileIconlibArrowLeftFill);
}
