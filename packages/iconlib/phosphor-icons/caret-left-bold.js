import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCaretLeftBold extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M168.49,199.51a12,12,0,0,1-17,17l-80-80a12,12,0,0,1,0-17l80-80a12,12,0,0,1,17,17L97,128Z"/></svg>`;
  }
}

customElements.define('dile-phosphor-icon-caret-left-bold', DileIconlibCaretLeftBold);
