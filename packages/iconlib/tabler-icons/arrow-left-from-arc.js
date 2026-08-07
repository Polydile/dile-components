import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowLeftFromArc extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M9 12h12" /> <path d="M17 16l4 -4l-4 -4" /> <path d="M12 3a9 9 0 1 0 0 18" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-arrow-left-from-arc')) {
  customElements.define('dile-tabler-icon-arrow-left-from-arc', DileIconlibArrowLeftFromArc);
}
