import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibFileOff extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 3l18 18" /> <path d="M7 3h7l5 5v7m0 4a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-14" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-file-off', DileIconlibFileOff);
