import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibList extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M9 6l11 0" /> <path d="M9 12l11 0" /> <path d="M9 18l11 0" /> <path d="M5 6l0 .01" /> <path d="M5 12l0 .01" /> <path d="M5 18l0 .01" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-list')) {
  customElements.define('dile-tabler-icon-list', DileIconlibList);
}
