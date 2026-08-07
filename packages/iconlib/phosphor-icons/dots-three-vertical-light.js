import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibDotsThreeVerticalLight extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M118,60a10,10,0,1,1,10,10A10,10,0,0,1,118,60Zm10,58a10,10,0,1,0,10,10A10,10,0,0,0,128,118Zm0,68a10,10,0,1,0,10,10A10,10,0,0,0,128,186Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-dots-three-vertical-light')) {
  customElements.define('dile-phosphor-icon-dots-three-vertical-light', DileIconlibDotsThreeVerticalLight);
}
