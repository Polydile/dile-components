import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibIntersectionLight extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M206,120v80a6,6,0,0,1-12,0V120a66,66,0,0,0-132,0v80a6,6,0,0,1-12,0V120a78,78,0,0,1,156,0Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-intersection-light')) {
  customElements.define('dile-phosphor-icon-intersection-light', DileIconlibIntersectionLight);
}
