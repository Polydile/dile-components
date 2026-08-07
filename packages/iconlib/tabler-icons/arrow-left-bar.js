import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowLeftBar extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M21 12h-18" /> <path d="M6 9l-3 3l3 3" /> <path d="M21 9v6" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-arrow-left-bar')) {
  customElements.define('dile-tabler-icon-arrow-left-bar', DileIconlibArrowLeftBar);
}
