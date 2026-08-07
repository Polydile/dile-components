import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibFilter3Line extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M10 18H14V16H10V18ZM3 6V8H21V6H3ZM6 13H18V11H6V13Z"/></svg>`;
  }
}

if (!customElements.get('dile-remixicon-icon-filter-3-line')) {
  customElements.define('dile-remixicon-icon-filter-3-line', DileIconlibFilter3Line);
}
