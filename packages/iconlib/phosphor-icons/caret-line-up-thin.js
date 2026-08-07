import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCaretLineUpThin extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M210.83,194.83a4,4,0,0,1-5.66,0L128,117.66,50.83,194.83a4,4,0,0,1-5.66-5.66l80-80a4,4,0,0,1,5.66,0l80,80A4,4,0,0,1,210.83,194.83ZM48,76H208a4,4,0,0,0,0-8H48a4,4,0,0,0,0,8Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-caret-line-up-thin')) {
  customElements.define('dile-phosphor-icon-caret-line-up-thin', DileIconlibCaretLineUpThin);
}
