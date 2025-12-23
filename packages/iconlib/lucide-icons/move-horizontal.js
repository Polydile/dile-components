import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibMoveHorizontal extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="m18 8 4 4-4 4" /> <path d="M2 12h20" /> <path d="m6 8-4 4 4 4" /></svg>`;
  }
}

customElements.define('dile-lucide-icon-move-horizontal', DileIconlibMoveHorizontal);
