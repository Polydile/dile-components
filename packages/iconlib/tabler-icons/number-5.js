import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibNumber5 extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M8 20h4a4 4 0 1 0 0 -8h-4v-8h8" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-number-5')) {
  customElements.define('dile-tabler-icon-number-5', DileIconlibNumber5);
}
