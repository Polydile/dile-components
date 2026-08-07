import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibMenu extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M4 8l16 0" /> <path d="M4 16l16 0" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-menu')) {
  customElements.define('dile-tabler-icon-menu', DileIconlibMenu);
}
