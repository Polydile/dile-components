import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibPray extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M11 5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /> <path d="M7 20h8l-4 -4v-7l4 3l2 -2" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-pray', DileIconlibPray);
