import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibChevronCompactRight extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M11 4l3 8l-3 8" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-chevron-compact-right', DileIconlibChevronCompactRight);
