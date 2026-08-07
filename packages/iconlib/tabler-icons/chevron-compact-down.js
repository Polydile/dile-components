import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibChevronCompactDown extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M4 11l8 3l8 -3" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-chevron-compact-down')) {
  customElements.define('dile-tabler-icon-chevron-compact-down', DileIconlibChevronCompactDown);
}
