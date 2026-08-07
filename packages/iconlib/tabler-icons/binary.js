import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBinary extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M11 10v-5h-1m8 14v-5h-1" /> <path d="M15 5.5a.5 .5 0 0 1 .5 -.5h2a.5 .5 0 0 1 .5 .5v4a.5 .5 0 0 1 -.5 .5h-2a.5 .5 0 0 1 -.5 -.5l0 -4" /> <path d="M10 14.5a.5 .5 0 0 1 .5 -.5h2a.5 .5 0 0 1 .5 .5v4a.5 .5 0 0 1 -.5 .5h-2a.5 .5 0 0 1 -.5 -.5l0 -4" /> <path d="M6 10h.01m-.01 9h.01" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-binary')) {
  customElements.define('dile-tabler-icon-binary', DileIconlibBinary);
}
