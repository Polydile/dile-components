import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibUniteFill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M240,164a76,76,0,0,1-151.9,3.9,76,76,0,1,1,79.8-79.8A76.1,76.1,0,0,1,240,164Z"/></svg>`;
  }
}

customElements.define('dile-phosphor-icon-unite-fill', DileIconlibUniteFill);
