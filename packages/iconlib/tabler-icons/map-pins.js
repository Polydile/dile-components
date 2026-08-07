import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibMapPins extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M10.828 9.828a4 4 0 1 0 -5.656 0l2.828 2.829l2.828 -2.829" /> <path d="M8 7l0 .01" /> <path d="M18.828 17.828a4 4 0 1 0 -5.656 0l2.828 2.829l2.828 -2.829" /> <path d="M16 15l0 .01" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-map-pins')) {
  customElements.define('dile-tabler-icon-map-pins', DileIconlibMapPins);
}
