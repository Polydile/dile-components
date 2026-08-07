import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowsVerticalFill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M167.39,196.94a8,8,0,0,1-1.73,8.72l-32,32a8,8,0,0,1-11.32,0l-32-32A8,8,0,0,1,96,192h24V64H96a8,8,0,0,1-5.66-13.66l32-32a8,8,0,0,1,11.32,0l32,32A8,8,0,0,1,160,64H136V192h24A8,8,0,0,1,167.39,196.94Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-arrows-vertical-fill')) {
  customElements.define('dile-phosphor-icon-arrows-vertical-fill', DileIconlibArrowsVerticalFill);
}
