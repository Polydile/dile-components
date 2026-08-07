import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibLayoutAlignCenterFilled extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"> <path d="M12 3a1 1 0 0 1 1 1v4h3a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-3v4a1 1 0 0 1 -2 0v-4h-3a3 3 0 0 1 -3 -3v-2a3 3 0 0 1 3 -3h3v-4a1 1 0 0 1 1 -1" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-layout-align-center-filled')) {
  customElements.define('dile-tabler-icon-layout-align-center-filled', DileIconlibLayoutAlignCenterFilled);
}
