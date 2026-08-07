import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibNoteOff extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M13 20l3.505 -3.505m2 -2l1.501 -1.501" /> <path d="M17 13h3v-7a2 2 0 0 0 -2 -2h-10m-3.427 .6c-.355 .36 -.573 .853 -.573 1.4v12a2 2 0 0 0 2 2h7v-6c0 -.272 .109 -.519 .285 -.699" /> <path d="M3 3l18 18" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-note-off')) {
  customElements.define('dile-tabler-icon-note-off', DileIconlibNoteOff);
}
