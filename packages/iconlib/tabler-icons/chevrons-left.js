import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibChevronsLeft extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M11 7l-5 5l5 5" /> <path d="M17 7l-5 5l5 5" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-chevrons-left')) {
  customElements.define('dile-tabler-icon-chevrons-left', DileIconlibChevronsLeft);
}
