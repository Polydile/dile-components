import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibIntersectionBold extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M212,120v80a12,12,0,0,1-24,0V120a60,60,0,0,0-120,0v80a12,12,0,0,1-24,0V120a84,84,0,0,1,168,0Z"/></svg>`;
  }
}

customElements.define('dile-phosphor-icon-intersection-bold', DileIconlibIntersectionBold);
