import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibNumberOneLight extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M142,48V208a6,6,0,0,1-12,0V58.6L99.09,77.14a6,6,0,0,1-6.18-10.29l40-24A6,6,0,0,1,142,48Z"/></svg>`;
  }
}

customElements.define('dile-phosphor-icon-number-one-light', DileIconlibNumberOneLight);
