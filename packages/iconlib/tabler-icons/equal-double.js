import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibEqualDouble extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 10h7" /> <path d="M3 14h7" /> <path d="M14 10h7" /> <path d="M14 14h7" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-equal-double')) {
  customElements.define('dile-tabler-icon-equal-double', DileIconlibEqualDouble);
}
