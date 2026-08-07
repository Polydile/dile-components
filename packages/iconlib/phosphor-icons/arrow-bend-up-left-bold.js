import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowBendUpLeftBold extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M236,200a12,12,0,0,1-24,0,84.09,84.09,0,0,0-84-84H61l27.52,27.51a12,12,0,0,1-17,17l-48-48a12,12,0,0,1,0-17l48-48a12,12,0,0,1,17,17L61,92h67A108.12,108.12,0,0,1,236,200Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-arrow-bend-up-left-bold')) {
  customElements.define('dile-phosphor-icon-arrow-bend-up-left-bold', DileIconlibArrowBendUpLeftBold);
}
