import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowDownRight extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M200,88V192a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h84.69L58.34,69.66A8,8,0,0,1,69.66,58.34L184,172.69V88a8,8,0,0,1,16,0Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-arrow-down-right')) {
  customElements.define('dile-phosphor-icon-arrow-down-right', DileIconlibArrowDownRight);
}
