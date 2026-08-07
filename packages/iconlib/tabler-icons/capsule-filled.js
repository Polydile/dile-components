import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCapsuleFilled extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"> <path d="M12 2l-.243 .004a7.004 7.004 0 0 0 -6.757 6.996v6a7 7 0 0 0 7 7l.243 -.004a7.004 7.004 0 0 0 6.757 -6.996v-6a7 7 0 0 0 -7 -7z" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-capsule-filled')) {
  customElements.define('dile-tabler-icon-capsule-filled', DileIconlibCapsuleFilled);
}
