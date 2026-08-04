import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibShape2 extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 5a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /> <path d="M17 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /> <path d="M17 5a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /> <path d="M3 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /> <path d="M6.5 17.5l11 -11m-12.5 .5v10m14 -10v10" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-shape-2', DileIconlibShape2);
