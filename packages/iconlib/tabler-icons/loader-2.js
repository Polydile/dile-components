import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibLoader2 extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 3a9 9 0 1 0 9 9" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-loader-2', DileIconlibLoader2);
