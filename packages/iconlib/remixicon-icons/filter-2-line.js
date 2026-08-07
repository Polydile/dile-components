import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibFilter2Line extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M14 14V20L10 22V14L4 5V3H20V5L14 14ZM6.4037 5L12 13.3944L17.5963 5H6.4037Z"/></svg>`;
  }
}

if (!customElements.get('dile-remixicon-icon-filter-2-line')) {
  customElements.define('dile-remixicon-icon-filter-2-line', DileIconlibFilter2Line);
}
