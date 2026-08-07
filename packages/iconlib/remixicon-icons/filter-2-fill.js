import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibFilter2Fill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M10 14L4 5V3H20V5L14 14V20L10 22V14Z"/></svg>`;
  }
}

if (!customElements.get('dile-remixicon-icon-filter-2-fill')) {
  customElements.define('dile-remixicon-icon-filter-2-fill', DileIconlibFilter2Fill);
}
