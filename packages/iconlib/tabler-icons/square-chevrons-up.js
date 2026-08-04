import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibSquareChevronsUp extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M9 16l3 -3l3 3" /> <path d="M9 11l3 -3l3 3" /> <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-square-chevrons-up', DileIconlibSquareChevronsUp);
