import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibNumber1 extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M13 20v-16l-5 5" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-number-1', DileIconlibNumber1);
