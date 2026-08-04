import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibWaveSquare extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 12h5v8h4v-16h4v8h5" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-wave-square', DileIconlibWaveSquare);
