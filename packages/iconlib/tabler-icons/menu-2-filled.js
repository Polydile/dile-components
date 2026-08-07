import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibMenu2Filled extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"> <path d="M21 6a1 1 0 0 1 -1 1h-16a1 1 0 1 1 0 -2h16a1 1 0 0 1 1 1" /> <path d="M21 12a1 1 0 0 1 -1 1h-16a1 1 0 0 1 0 -2h16a1 1 0 0 1 1 1" /> <path d="M21 18a1 1 0 0 1 -1 1h-16a1 1 0 0 1 0 -2h16a1 1 0 0 1 1 1" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-menu-2-filled')) {
  customElements.define('dile-tabler-icon-menu-2-filled', DileIconlibMenu2Filled);
}
