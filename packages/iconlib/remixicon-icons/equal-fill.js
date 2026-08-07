import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibEqualFill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M19 8H5V10H19V8ZM19 14H5V16H19V14Z"/></svg>`;
  }
}

if (!customElements.get('dile-remixicon-icon-equal-fill')) {
  customElements.define('dile-remixicon-icon-equal-fill', DileIconlibEqualFill);
}
