import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibPintGlassBold extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M209,24a12,12,0,0,0-9-4H56A12,12,0,0,0,44.09,33.43l23.15,193A20,20,0,0,0,87.1,244h81.8a20,20,0,0,0,19.86-17.62L211.91,33.43A12,12,0,0,0,209,24ZM186.47,44l-1.92,16H71.45L69.53,44ZM165.35,220H90.65L74.33,84H181.67Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-pint-glass-bold')) {
  customElements.define('dile-phosphor-icon-pint-glass-bold', DileIconlibPintGlassBold);
}
