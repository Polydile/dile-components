import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowUpLeft extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M7 7l10 10" /> <path d="M16 7l-9 0l0 9" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-arrow-up-left')) {
  customElements.define('dile-tabler-icon-arrow-up-left', DileIconlibArrowUpLeft);
}
