import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibChevronsUpRight extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M9 7h8v8" /> <path d="M5 11h8v8" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-chevrons-up-right', DileIconlibChevronsUpRight);
