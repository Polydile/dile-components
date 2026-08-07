import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibNumber11 extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M8 20v-16l-5 5" /> <path d="M18 20v-16l-5 5" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-number-11')) {
  customElements.define('dile-tabler-icon-number-11', DileIconlibNumber11);
}
