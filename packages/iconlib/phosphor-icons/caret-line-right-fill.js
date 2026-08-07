import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCaretLineRightFill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M149.66,122.34a8,8,0,0,1,0,11.32l-80,80A8,8,0,0,1,56,208V48a8,8,0,0,1,13.66-5.66ZM184,40a8,8,0,0,0-8,8V208a8,8,0,0,0,16,0V48A8,8,0,0,0,184,40Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-caret-line-right-fill')) {
  customElements.define('dile-phosphor-icon-caret-line-right-fill', DileIconlibCaretLineRightFill);
}
