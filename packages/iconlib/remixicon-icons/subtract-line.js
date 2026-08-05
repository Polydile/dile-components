import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibSubtractLine extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5 11V13H19V11H5Z"/></svg>`;
  }
}

customElements.define('dile-remixicon-icon-subtract-line', DileIconlibSubtractLine);
