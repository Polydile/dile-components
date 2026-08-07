import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibRadiusTopRight extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M5 5h6a8 8 0 0 1 8 8v6" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-radius-top-right')) {
  customElements.define('dile-tabler-icon-radius-top-right', DileIconlibRadiusTopRight);
}
