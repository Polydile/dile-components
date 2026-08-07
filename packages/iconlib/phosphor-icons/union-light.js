import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibUnionLight extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M206,64v80a78,78,0,0,1-156,0V64a6,6,0,0,1,12,0v80a66,66,0,0,0,132,0V64a6,6,0,0,1,12,0Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-union-light')) {
  customElements.define('dile-phosphor-icon-union-light', DileIconlibUnionLight);
}
