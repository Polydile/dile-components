import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCaretLineLeftFill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M200,48V208a8,8,0,0,1-13.66,5.66l-80-80a8,8,0,0,1,0-11.32l80-80A8,8,0,0,1,200,48ZM72,40a8,8,0,0,0-8,8V208a8,8,0,0,0,16,0V48A8,8,0,0,0,72,40Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-caret-line-left-fill')) {
  customElements.define('dile-phosphor-icon-caret-line-left-fill', DileIconlibCaretLineLeftFill);
}
