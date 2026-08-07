import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCaretLineRight extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M149.66,122.34a8,8,0,0,1,0,11.32l-80,80a8,8,0,0,1-11.32-11.32L132.69,128,58.34,53.66A8,8,0,0,1,69.66,42.34ZM184,40a8,8,0,0,0-8,8V208a8,8,0,0,0,16,0V48A8,8,0,0,0,184,40Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-caret-line-right')) {
  customElements.define('dile-phosphor-icon-caret-line-right', DileIconlibCaretLineRight);
}
