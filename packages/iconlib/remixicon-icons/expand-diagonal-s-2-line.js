import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibExpandDiagonalS2Line extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M7 8.41421V12L5 12L5 5L12 5V7L8.41421 7L17 15.5858V12L19 12L19 19H12V17H15.5858L7 8.41421Z"/></svg>`;
  }
}

if (!customElements.get('dile-remixicon-icon-expand-diagonal-s-2-line')) {
  customElements.define('dile-remixicon-icon-expand-diagonal-s-2-line', DileIconlibExpandDiagonalS2Line);
}
