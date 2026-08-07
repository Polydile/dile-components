import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibExclamationMarkThin extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M140,200a12,12,0,1,1-12-12A12,12,0,0,1,140,200Zm-12-44a4,4,0,0,0,4-4V48a4,4,0,0,0-8,0V152A4,4,0,0,0,128,156Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-exclamation-mark-thin')) {
  customElements.define('dile-phosphor-icon-exclamation-mark-thin', DileIconlibExclamationMarkThin);
}
