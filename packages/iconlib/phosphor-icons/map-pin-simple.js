import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibMapPinSimple extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M184,72a56,56,0,1,0-64,55.42V232a8,8,0,0,0,16,0V127.42A56.09,56.09,0,0,0,184,72Zm-56,40a40,40,0,1,1,40-40A40,40,0,0,1,128,112Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-map-pin-simple')) {
  customElements.define('dile-phosphor-icon-map-pin-simple', DileIconlibMapPinSimple);
}
