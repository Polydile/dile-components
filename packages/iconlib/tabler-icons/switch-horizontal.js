import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibSwitchHorizontal extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M16 3l4 4l-4 4" /> <path d="M10 7l10 0" /> <path d="M8 13l-4 4l4 4" /> <path d="M4 17l9 0" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-switch-horizontal', DileIconlibSwitchHorizontal);
