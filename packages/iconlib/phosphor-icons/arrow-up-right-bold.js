import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowUpRightBold extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M204,64V168a12,12,0,0,1-24,0V93L72.49,200.49a12,12,0,0,1-17-17L163,76H88a12,12,0,0,1,0-24H192A12,12,0,0,1,204,64Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-arrow-up-right-bold')) {
  customElements.define('dile-phosphor-icon-arrow-up-right-bold', DileIconlibArrowUpRightBold);
}
