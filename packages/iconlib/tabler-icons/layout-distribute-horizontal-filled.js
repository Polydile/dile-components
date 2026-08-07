import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibLayoutDistributeHorizontalFilled extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"> <path d="M20 3a1 1 0 0 1 0 2h-16a1 1 0 1 1 0 -2z" /> <path d="M20 19a1 1 0 0 1 0 2h-16a1 1 0 0 1 0 -2z" /> <path d="M16 8a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-8a3 3 0 0 1 -3 -3v-2a3 3 0 0 1 3 -3z" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-layout-distribute-horizontal-filled')) {
  customElements.define('dile-tabler-icon-layout-distribute-horizontal-filled', DileIconlibLayoutDistributeHorizontalFilled);
}
