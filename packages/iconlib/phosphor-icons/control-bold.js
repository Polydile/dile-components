import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibControlBold extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M208.49,128.49a12,12,0,0,1-17,0L128,65,64.49,128.49a12,12,0,0,1-17-17l72-72a12,12,0,0,1,17,0l72,72A12,12,0,0,1,208.49,128.49Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-control-bold')) {
  customElements.define('dile-phosphor-icon-control-bold', DileIconlibControlBold);
}
