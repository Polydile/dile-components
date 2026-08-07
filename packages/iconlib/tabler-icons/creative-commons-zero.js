import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCreativeCommonsZero extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /> <path d="M9 12a3 4 0 1 0 6 0a3 4 0 1 0 -6 0" /> <path d="M14 9l-4 6" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-creative-commons-zero')) {
  customElements.define('dile-tabler-icon-creative-commons-zero', DileIconlibCreativeCommonsZero);
}
