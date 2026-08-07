import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowRightFromArc extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M15 12h-12" /> <path d="M7 8l-4 4l4 4" /> <path d="M12 21a9 9 0 0 0 0 -18" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-arrow-right-from-arc')) {
  customElements.define('dile-tabler-icon-arrow-right-from-arc', DileIconlibArrowRightFromArc);
}
