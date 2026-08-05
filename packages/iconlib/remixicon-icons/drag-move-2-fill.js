import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibDragMove2Fill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M18 11V8L22 12L18 16V13H13V18H16L12 22L8 18H11V13H6V16L2 12L6 8V11H11V6H8L12 2L16 6H13V11H18Z"/></svg>`;
  }
}

customElements.define('dile-remixicon-icon-drag-move-2-fill', DileIconlibDragMove2Fill);
