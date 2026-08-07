import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowBadgeDown extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M17 13v-6l-5 4l-5 -4v6l5 4l5 -4" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-arrow-badge-down')) {
  customElements.define('dile-tabler-icon-arrow-badge-down', DileIconlibArrowBadgeDown);
}
