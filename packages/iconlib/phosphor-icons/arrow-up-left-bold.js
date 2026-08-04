import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowUpLeftBold extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M200.49,200.49a12,12,0,0,1-17,0L76,93v75a12,12,0,0,1-24,0V64A12,12,0,0,1,64,52H168a12,12,0,0,1,0,24H93L200.49,183.51A12,12,0,0,1,200.49,200.49Z"/></svg>`;
  }
}

customElements.define('dile-phosphor-icon-arrow-up-left-bold', DileIconlibArrowUpLeftBold);
