import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibFrameOff extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M4 7h3m4 0h9" /> <path d="M4 17h13" /> <path d="M7 7v13" /> <path d="M17 4v9m0 4v3" /> <path d="M3 3l18 18" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-frame-off')) {
  customElements.define('dile-tabler-icon-frame-off', DileIconlibFrameOff);
}
