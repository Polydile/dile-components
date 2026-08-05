import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibSubtractFill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M19 11H5V13H19V11Z"/></svg>`;
  }
}

customElements.define('dile-remixicon-icon-subtract-fill', DileIconlibSubtractFill);
