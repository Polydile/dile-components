import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowDownRight extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M7 7l10 10" /> <path d="M17 8l0 9l-9 0" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-arrow-down-right')) {
  customElements.define('dile-tabler-icon-arrow-down-right', DileIconlibArrowDownRight);
}
