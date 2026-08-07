import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibMinusBold extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M228,128a12,12,0,0,1-12,12H40a12,12,0,0,1,0-24H216A12,12,0,0,1,228,128Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-minus-bold')) {
  customElements.define('dile-phosphor-icon-minus-bold', DileIconlibMinusBold);
}
