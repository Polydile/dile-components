import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibChevronUpLeft extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M8 16v-8h8" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-chevron-up-left')) {
  customElements.define('dile-tabler-icon-chevron-up-left', DileIconlibChevronUpLeft);
}
