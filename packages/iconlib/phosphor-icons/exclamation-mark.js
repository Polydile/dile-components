import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibExclamationMark extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M144,200a16,16,0,1,1-16-16A16,16,0,0,1,144,200Zm-16-40a8,8,0,0,0,8-8V48a8,8,0,0,0-16,0V152A8,8,0,0,0,128,160Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-exclamation-mark')) {
  customElements.define('dile-phosphor-icon-exclamation-mark', DileIconlibExclamationMark);
}
