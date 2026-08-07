import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowElbowRight extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M21 14v-6h-6" /> <path d="M21 8l-9 9l-9 -9" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-arrow-elbow-right')) {
  customElements.define('dile-tabler-icon-arrow-elbow-right', DileIconlibArrowElbowRight);
}
