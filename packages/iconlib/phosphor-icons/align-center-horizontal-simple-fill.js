import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibAlignCenterHorizontalSimpleFill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M224,96v64a16,16,0,0,1-16,16H136v32a8,8,0,0,1-16,0V176H48a16,16,0,0,1-16-16V96A16,16,0,0,1,48,80h72V48a8,8,0,0,1,16,0V80h72A16,16,0,0,1,224,96Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-align-center-horizontal-simple-fill')) {
  customElements.define('dile-phosphor-icon-align-center-horizontal-simple-fill', DileIconlibAlignCenterHorizontalSimpleFill);
}
