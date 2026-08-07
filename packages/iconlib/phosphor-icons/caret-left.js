import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCaretLeft extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-caret-left')) {
  customElements.define('dile-phosphor-icon-caret-left', DileIconlibCaretLeft);
}
