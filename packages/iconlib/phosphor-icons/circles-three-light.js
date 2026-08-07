import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCirclesThreeLight extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M170,76a42,42,0,1,0-42,42A42,42,0,0,0,170,76Zm-42,30a30,30,0,1,1,30-30A30,30,0,0,1,128,106Zm60,24a42,42,0,1,0,42,42A42,42,0,0,0,188,130Zm0,72a30,30,0,1,1,30-30A30,30,0,0,1,188,202ZM68,130a42,42,0,1,0,42,42A42,42,0,0,0,68,130Zm0,72a30,30,0,1,1,30-30A30,30,0,0,1,68,202Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-circles-three-light')) {
  customElements.define('dile-phosphor-icon-circles-three-light', DileIconlibCirclesThreeLight);
}
