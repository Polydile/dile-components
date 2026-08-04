import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowZigZag extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M6 20v-10l10 6v-12" /> <path d="M13 7l3 -3l3 3" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-arrow-zig-zag', DileIconlibArrowZigZag);
