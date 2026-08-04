import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibAnchor extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 9v12m-8 -8a8 8 0 0 0 16 0m1 0h-2m-14 0h-2" /> <path d="M9 6a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-anchor', DileIconlibAnchor);
