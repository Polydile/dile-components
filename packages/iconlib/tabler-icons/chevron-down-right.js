import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibChevronDownRight extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M16 8v8h-8" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-chevron-down-right', DileIconlibChevronDownRight);
