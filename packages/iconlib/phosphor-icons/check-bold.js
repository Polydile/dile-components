import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCheckBold extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z"/></svg>`;
  }
}

customElements.define('dile-phosphor-icon-check-bold', DileIconlibCheckBold);
