import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibSlash extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M17 5l-10 14" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-slash')) {
  customElements.define('dile-tabler-icon-slash', DileIconlibSlash);
}
