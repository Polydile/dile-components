import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibChevronDownLeft extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M8 8v8h8" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-chevron-down-left')) {
  customElements.define('dile-tabler-icon-chevron-down-left', DileIconlibChevronDownLeft);
}
