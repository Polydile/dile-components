import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibExpandDiagonalSLine extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.5858 7H12V5H19V12H17V8.41421L8.41421 17H12V19H5V12H7V15.5858L15.5858 7Z"/></svg>`;
  }
}

if (!customElements.get('dile-remixicon-icon-expand-diagonal-s-line')) {
  customElements.define('dile-remixicon-icon-expand-diagonal-s-line', DileIconlibExpandDiagonalSLine);
}
