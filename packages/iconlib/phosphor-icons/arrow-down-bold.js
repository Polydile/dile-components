import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowDownBold extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M208.49,152.49l-72,72a12,12,0,0,1-17,0l-72-72a12,12,0,0,1,17-17L116,187V40a12,12,0,0,1,24,0V187l51.51-51.52a12,12,0,0,1,17,17Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-arrow-down-bold')) {
  customElements.define('dile-phosphor-icon-arrow-down-bold', DileIconlibArrowDownBold);
}
