import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibMapPinSimpleLine extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M216,208H136V135.42a56,56,0,1,0-16,0V208H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16ZM88,80a40,40,0,1,1,40,40A40,40,0,0,1,88,80Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-map-pin-simple-line')) {
  customElements.define('dile-phosphor-icon-map-pin-simple-line', DileIconlibMapPinSimpleLine);
}
