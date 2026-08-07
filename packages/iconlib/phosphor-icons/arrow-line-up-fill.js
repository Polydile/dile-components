import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowLineUpFill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M205.66,138.34A8,8,0,0,1,200,152H136v72a8,8,0,0,1-16,0V152H56a8,8,0,0,1-5.66-13.66l72-72a8,8,0,0,1,11.32,0ZM216,32H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-arrow-line-up-fill')) {
  customElements.define('dile-phosphor-icon-arrow-line-up-fill', DileIconlibArrowLineUpFill);
}
